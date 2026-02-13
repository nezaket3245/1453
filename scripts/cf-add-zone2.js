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
  } catch (e) {}
}

async function clickButton(page, texts, label) {
  for (const text of texts) {
    try {
      const clicked = await page.evaluate((t) => {
        const btns = Array.from(document.querySelectorAll('button, a[role="button"], [role="button"]'));
        for (const b of btns) {
          const txt = b.textContent.trim().toLowerCase();
          if (txt.includes(t.toLowerCase()) && !b.disabled && b.offsetParent !== null) {
            b.scrollIntoView({ block: 'center' });
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
  console.log(`  ✗ [${label}] buton bulunamadi`);
  return false;
}

async function waitForCloudflare(page, timeout = 180000) {
  console.log('   Cloudflare dashboard bekliyor (Google giris tamamlaninca devam eder)...');
  const start = Date.now();
  while (Date.now() - start < timeout) {
    const url = page.url();
    if (url.includes('dash.cloudflare.com') && !url.includes('/login')) {
      return true;
    }
    await sleep(3000);
    // Print status every 15 seconds
    const elapsed = Math.round((Date.now() - start) / 1000);
    if (elapsed % 15 === 0) {
      console.log(`   ... ${elapsed}s bekleniyor (URL: ${url.substring(0, 80)}...)`);
    }
  }
  return false;
}

(async () => {
  console.log('=== Cloudflare Zone Ekleme ===\n');
  
  // Connect to Chrome
  console.log('1. Chrome\'a baglaniliyor...');
  const browser = await puppeteer.connect({
    browserURL: `http://127.0.0.1:${DEBUG_PORT}`,
    defaultViewport: null
  });
  console.log('   ✓ Baglandi!\n');
  
  // Find or create the right tab
  const pages = await browser.pages();
  let page = pages.find(p => p.url().includes('cloudflare') || p.url().includes('google'));
  
  if (!page) {
    page = await browser.newPage();
    console.log('2. Yeni sekme acildi, Cloudflare\'a gidiliyor...');
    await page.goto(`https://dash.cloudflare.com/${ACCT_ID}/add-site`, { 
      waitUntil: 'networkidle2', timeout: 60000 
    });
  }
  
  let url = page.url();
  console.log('   Mevcut URL: ' + url.substring(0, 100));
  
  // Wait for Cloudflare dashboard (user needs to complete Google login)
  if (!url.includes('dash.cloudflare.com') || url.includes('/login')) {
    console.log('\n   ⚠️  GOOGLE GIRIS BEKLENIYOR');
    console.log('   Chrome\'da Google dogrulamasini tamamlayin.');
    console.log('   Otomatik tespit edilecek ve devam edilecek.\n');
    
    const ok = await waitForCloudflare(page, 180000);
    if (!ok) {
      console.log('   ✗ Zaman asimi!');
      browser.disconnect();
      process.exit(1);
    }
    console.log('   ✓ Cloudflare dashboard yuklendi!');
    await sleep(3000);
  }
  
  // Navigate to add-site
  url = page.url();
  if (!url.includes('/add-site')) {
    console.log('\n3. Add-site sayfasina gidiliyor...');
    await page.goto(`https://dash.cloudflare.com/${ACCT_ID}/add-site`, { 
      waitUntil: 'networkidle2', timeout: 30000 
    });
    await sleep(3000);
  }
  
  url = page.url();
  console.log('   URL: ' + url);
  await screenshot(page, '01-addsite');
  
  // Check if the zone already exists (might redirect or show message)
  const bodyText = await page.evaluate(() => document.body.innerText);
  if (bodyText.includes('already exists') || bodyText.includes('zaten var')) {
    console.log('\n   ℹ️  Zone zaten mevcut olabilir!');
    console.log('   ' + bodyText.substring(0, 300));
    browser.disconnect();
    process.exit(0);
  }
  
  // Type domain
  console.log('\n4. Domain yaziliyor: ' + DOMAIN);
  await sleep(2000);
  
  let filled = false;
  const selectors = [
    'input[placeholder*="site"]',
    'input[placeholder*="domain"]',
    'input[placeholder*="example"]',
    'input[type="text"]:not([type="hidden"])',
    'input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"]):not([type="password"]):not([type="email"])'
  ];
  
  for (const sel of selectors) {
    try {
      const inputs = await page.$$(sel);
      for (const input of inputs) {
        const visible = await page.evaluate(el => {
          const r = el.getBoundingClientRect();
          return r.width > 30 && r.height > 10 && el.offsetParent !== null;
        }, input);
        if (visible) {
          await input.click({ clickCount: 3 });
          await sleep(200);
          await input.type(DOMAIN, { delay: 40 });
          console.log(`   ✓ Domain yazildi!`);
          filled = true;
          break;
        }
      }
      if (filled) break;
    } catch (e) {}
  }
  
  if (!filled) {
    console.log('   ✗ Input bulunamadi!');
    await screenshot(page, '02-no-input');
    const text = await page.evaluate(() => document.body.innerText.substring(0, 500));
    console.log('   Sayfa: ' + text.replace(/\n/g, ' | '));
  }
  
  await screenshot(page, '02-domain');
  await sleep(1000);
  
  // Continue
  console.log('\n5. Continue butonuna tiklaniyor...');
  let ok = await clickButton(page, ['Continue', 'Add site', 'Devam'], 'Continue');
  if (!ok) { await page.keyboard.press('Enter'); console.log('   Enter basildi.'); }
  
  await sleep(6000);
  await screenshot(page, '03-plan');
  
  // Plan selection
  console.log('\n6. Free plan seciliyor...');
  url = page.url();
  console.log('   URL: ' + url);
  await sleep(2000);
  
  let planOk = await page.evaluate(() => {
    const els = document.querySelectorAll('label, [role="radio"], div, span, button');
    for (const el of els) {
      const t = (el.textContent || '').trim();
      if (/^Free$/i.test(t) || t === '$0/month' || t === '$0') {
        el.click();
        return true;
      }
    }
    // Try labels with "Free" in text
    for (const el of els) {
      const t = (el.textContent || '').trim();
      if (/\bFree\b/i.test(t) && t.length < 100 && !t.includes('Pro') && !t.includes('Business') && !t.includes('Enterprise')) {
        el.click();
        return true;
      }
    }
    return false;
  });
  console.log(planOk ? '   ✓ Free plan secildi!' : '   ✗ Plan bulunamadi');
  
  await sleep(2000);
  
  // Continue after plan
  console.log('\n7. Plan onay butonuna tiklaniyor...');
  await clickButton(page, ['Continue', 'Devam', 'Confirm', 'Next'], 'PlanConfirm');
  await sleep(8000);
  await screenshot(page, '04-dns');
  
  // DNS page - just continue
  console.log('\n8. DNS sayfasi - devam ediliyor...');
  await sleep(15000); // Wait for DNS scan
  console.log('   DNS taramasi bitti, Continue tiklaniyor...');
  await clickButton(page, ['Continue', 'Devam', 'Next'], 'DNS');
  await sleep(8000);
  await screenshot(page, '05-ns');
  
  // Nameserver page
  console.log('\n9. Nameserver bilgileri aliniyor...');
  try {
    const text = await page.evaluate(() => document.body.innerText);
    const ns = text.match(/([a-z]+\.ns\.cloudflare\.com)/g);
    if (ns && ns.length > 0) {
      const unique = [...new Set(ns)];
      console.log('\n   ╔═══════════════════════════════════════╗');
      console.log('   ║  CLOUDFLARE NAMESERVERS               ║');
      unique.forEach(n => console.log(`   ║  → ${n.padEnd(34)}║`));
      console.log('   ╚═══════════════════════════════════════╝\n');
    } else {
      console.log('   NS bulunamadi.');
      console.log('   Sayfa (500 kar): ' + text.substring(0, 500).replace(/\n/g, ' | '));
    }
  } catch (e) {}
  
  // Final button
  await clickButton(page, ['Done', 'Check', 'check nameservers', 'Continue', 'Finish'], 'Final');
  await sleep(3000);
  await screenshot(page, '06-final');
  
  console.log('\n✅ Islem tamamlandi! Screenshots: screenshots/');
  browser.disconnect();
  process.exit(0);
})().catch(err => {
  console.error('\n✗ HATA:', err.message);
  process.exit(1);
});
