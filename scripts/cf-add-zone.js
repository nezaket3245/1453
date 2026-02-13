const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const ACCT_ID = '2f8a9910120689f4f86f06fb6637f9b2';
const DOMAIN = 'egepenakcayapi.com';
const DEBUG_PORT = 9222;

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function screenshot(page, name) {
  try {
    const dir = path.join(__dirname, '..', 'screenshots');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    await page.screenshot({ path: path.join(dir, `${name}.png`), fullPage: false });
    console.log(`  [screenshot: ${name}.png]`);
  } catch (e) { console.log(`  [screenshot hatasi: ${e.message}]`); }
}

async function clickButton(page, texts, label) {
  for (const text of texts) {
    try {
      const clicked = await page.evaluate((t) => {
        const btns = Array.from(document.querySelectorAll('button, a[role="button"], [role="button"]'));
        for (const b of btns) {
          if (b.textContent.trim().toLowerCase().includes(t.toLowerCase()) && !b.disabled) {
            b.scrollIntoView();
            b.click();
            return b.textContent.trim().substring(0, 60);
          }
        }
        return null;
      }, text);
      if (clicked) {
        console.log(`  ✓ [${label}] tiklandi: "${clicked}"`);
        return true;
      }
    } catch (e) {}
  }
  console.log(`  ✗ [${label}] buton bulunamadi (aranan: ${texts.join(', ')})`);
  return false;
}

(async () => {
  console.log('=== Cloudflare Zone Ekleme Otomasyonu ===\n');
  
  // Connect to Chrome
  console.log('1. Chrome\'a baglaniliyor (port ' + DEBUG_PORT + ')...');
  const browser = await puppeteer.connect({
    browserURL: `http://127.0.0.1:${DEBUG_PORT}`,
    defaultViewport: null
  });
  console.log('   ✓ Baglandi!\n');
  
  // Open add-site page in a new tab
  console.log('2. Add-site sayfasi aciliyor...');
  const page = await browser.newPage();
  await page.goto(`https://dash.cloudflare.com/${ACCT_ID}/add-site`, { 
    waitUntil: 'networkidle2', 
    timeout: 60000 
  });
  
  let url = page.url();
  console.log('   URL: ' + url);
  await screenshot(page, '01-addsite');
  
  // Check if login needed
  if (url.includes('/login') || url.includes('/sign-up')) {
    console.log('\n   ⚠️  GIRIS GEREKIYOR!');
    console.log('   Lutfen Chrome\'da Cloudflare hesabiniza giris yapin.');
    console.log('   120 saniye bekleniyor...\n');
    try {
      await page.waitForFunction(
        () => !window.location.href.includes('/login') && !window.location.href.includes('/sign-up'),
        { timeout: 120000, polling: 2000 }
      );
      console.log('   ✓ Giris basarili!');
      await sleep(3000);
      await page.goto(`https://dash.cloudflare.com/${ACCT_ID}/add-site`, { 
        waitUntil: 'networkidle2', timeout: 30000 
      });
    } catch (e) {
      console.log('   ✗ Giris zaman asimi!');
      browser.disconnect();
      process.exit(1);
    }
  }
  
  url = page.url();
  console.log('   Sayfa: ' + url + '\n');
  await sleep(3000);
  
  // Type domain
  console.log('3. Domain yaziliyor: ' + DOMAIN);
  
  const inputSelectors = [
    'input[placeholder*="site"]',
    'input[placeholder*="domain"]',
    'input[placeholder*="example"]',
    'input[name*="zone"]',
    'input[name*="domain"]',
    'input[name*="site"]',
    'input[data-testid*="zone"]',
    'input[data-testid*="site"]',
    'input[type="text"]',
    'input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="password"]):not([type="email"])'
  ];
  
  let filled = false;
  for (const sel of inputSelectors) {
    try {
      const inputs = await page.$$(sel);
      for (const input of inputs) {
        const visible = await page.evaluate(el => {
          const r = el.getBoundingClientRect();
          const s = window.getComputedStyle(el);
          return r.width > 30 && r.height > 10 && s.display !== 'none' && s.visibility !== 'hidden';
        }, input);
        if (visible) {
          await input.click({ clickCount: 3 });
          await sleep(200);
          await input.type(DOMAIN, { delay: 40 });
          const ph = await page.evaluate(el => el.placeholder || el.name || '', input);
          console.log(`   ✓ Domain yazildi (${sel}, placeholder: "${ph}")`);
          filled = true;
          break;
        }
      }
      if (filled) break;
    } catch (e) {}
  }
  
  if (!filled) {
    console.log('   ✗ Input bulunamadi!');
    const text = await page.evaluate(() => document.body.innerText.substring(0, 800));
    console.log('   Sayfa icerigi:\n   ' + text.replace(/\n/g, '\n   '));
    await screenshot(page, '03-no-input');
  }
  
  await screenshot(page, '02-domain');
  await sleep(1500);
  
  // Click Continue
  console.log('\n4. Continue/Add site butonuna tiklaniyor...');
  let cont = await clickButton(page, ['Continue', 'Add site', 'Add Site', 'Devam'], 'Continue');
  if (!cont) {
    await page.keyboard.press('Enter');
    console.log('   Enter basildi (fallback).');
  }
  
  await sleep(6000);
  await screenshot(page, '03-aftercontinue');
  url = page.url();
  console.log('   URL: ' + url + '\n');
  
  // Plan selection
  console.log('5. Free plan seciliyor...');
  await sleep(3000);
  
  let planOk = false;
  try {
    planOk = await page.evaluate(() => {
      // Try finding Free plan by looking for specific patterns
      const labels = document.querySelectorAll('label, [role="radio"], [data-testid*="plan"]');
      for (const l of labels) {
        if (/\bFree\b/i.test(l.textContent) && l.textContent.length < 200) {
          l.click();
          return true;
        }
      }
      // Broader search
      const divs = document.querySelectorAll('div, span, button');
      for (const d of divs) {
        const t = d.textContent.trim();
        if (t === 'Free' || t === '$0' || /^Free\s*\$0/i.test(t)) {
          d.click();
          return true;
        }
      }
      return false;
    });
  } catch (e) {}
  
  if (planOk) {
    console.log('   ✓ Free plan secildi!');
  } else {
    console.log('   ✗ Free plan bulunamadi');
    const text = await page.evaluate(() => document.body.innerText.substring(0, 800));
    console.log('   Sayfa:\n   ' + text.replace(/\n/g, '\n   '));
  }
  
  await screenshot(page, '04-plan');
  await sleep(2000);
  
  // Continue after plan
  console.log('\n6. Plan Continue butonuna tiklaniyor...');
  await clickButton(page, ['Continue', 'Devam', 'Next', 'Confirm'], 'PlanContinue');
  await sleep(8000);
  await screenshot(page, '05-dns');
  
  // DNS records page
  console.log('\n7. DNS kayitlari sayfasi...');
  url = page.url();
  console.log('   URL: ' + url);
  console.log('   DNS taramasi bekleniyor (15sn)...');
  await sleep(15000);
  
  await clickButton(page, ['Continue', 'Devam', 'Next'], 'DNSContinue');
  await sleep(8000);
  await screenshot(page, '06-ns');
  
  // Nameserver page
  console.log('\n8. Nameserver bilgileri...');
  url = page.url();
  console.log('   URL: ' + url);
  await sleep(3000);
  
  try {
    const bodyText = await page.evaluate(() => document.body.innerText);
    const nsMatch = bodyText.match(/([a-z]+\.ns\.cloudflare\.com)/g);
    if (nsMatch && nsMatch.length > 0) {
      const unique = [...new Set(nsMatch)];
      console.log('\n   ╔═══════════════════════════════════════╗');
      console.log('   ║  CLOUDFLARE NAMESERVERS               ║');
      unique.forEach(ns => {
        console.log(`   ║  → ${ns.padEnd(34)}║`);
      });
      console.log('   ╚═══════════════════════════════════════╝\n');
    } else {
      console.log('   NS bulunamadi. Sayfa icerigi:');
      console.log('   ' + bodyText.substring(0, 1200).replace(/\n/g, '\n   '));
    }
  } catch (e) {}
  
  await screenshot(page, '07-nameservers');
  
  // Final button
  await clickButton(page, ['Done', 'Check', 'check nameservers', 'Continue', 'Finish', 'Tamam'], 'Final');
  await sleep(3000);
  await screenshot(page, '08-final');
  
  console.log('\n✅ Zone ekleme islemi tamamlandi!');
  console.log('Screenshots: screenshots/ klasorunde.\n');
  
  browser.disconnect();
  process.exit(0);
})().catch(err => {
  console.error('\n✗ HATA:', err.message);
  process.exit(1);
});
