const puppeteer = require('puppeteer-core');
const { execSync, spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const http = require('http');

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ACCT_ID = '2f8a9910120689f4f86f06fb6637f9b2';
const DOMAIN = 'egepenakcayapi.com';
const USER_DATA_DIR = path.join(process.env.LOCALAPPDATA, 'Google', 'Chrome', 'User Data');
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

async function clickButtonWithText(page, texts, label) {
  for (const text of texts) {
    try {
      const clicked = await page.evaluate((t) => {
        const buttons = Array.from(document.querySelectorAll('button, a[role="button"], [role="button"]'));
        for (const btn of buttons) {
          if (btn.textContent.trim().toLowerCase().includes(t.toLowerCase()) && !btn.disabled) {
            btn.click();
            return btn.textContent.trim().substring(0, 50);
          }
        }
        return null;
      }, text);
      if (clicked) {
        console.log(`  ✓ "${label || text}" tiklandi: "${clicked}"`);
        return true;
      }
    } catch (e) {}
  }
  return false;
}

function waitForDebugPort(port, timeout = 15000) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const check = () => {
      const req = http.get(`http://127.0.0.1:${port}/json/version`, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            if (Date.now() - start < timeout) setTimeout(check, 500);
            else reject(new Error('Timeout'));
          }
        });
      });
      req.on('error', () => {
        if (Date.now() - start < timeout) setTimeout(check, 500);
        else reject(new Error('Timeout'));
      });
      req.setTimeout(2000, () => { req.destroy(); });
    };
    check();
  });
}

(async () => {
  // Step 1: Kill all Chrome processes
  console.log('=== ADIM 1: Chrome kapatiliyor ===');
  try {
    execSync('taskkill /F /IM chrome.exe /T', { stdio: 'pipe' });
    console.log('  Chrome process\'leri kapatildi.');
  } catch (e) {
    console.log('  Chrome zaten kapali.');
  }
  await sleep(3000);
  
  // Clean up lock files
  try {
    const lockFiles = ['SingletonLock', 'SingletonSocket', 'SingletonCookie'];
    lockFiles.forEach(f => {
      try { fs.unlinkSync(path.join(USER_DATA_DIR, f)); } catch (e) {}
    });
  } catch (e) {}
  
  // Step 2: Launch Chrome with remote debugging port
  console.log('\n=== ADIM 2: Chrome remote debugging ile aciliyor ===');
  
  const chromeProc = spawn(CHROME_PATH, [
    `--remote-debugging-port=${DEBUG_PORT}`,
    '--no-first-run',
    '--start-maximized',
    `--user-data-dir=${USER_DATA_DIR}`,
    `https://dash.cloudflare.com/${ACCT_ID}/add-site`
  ], {
    detached: true,
    stdio: 'ignore'
  });
  chromeProc.unref();
  
  console.log('  Chrome baslatildi (PID: ' + chromeProc.pid + ')');
  console.log('  Debug port: ' + DEBUG_PORT);
  
  // Wait for Chrome to be ready
  console.log('  Chrome\'un hazir olmasini bekliyorum...');
  let debugInfo;
  try {
    debugInfo = await waitForDebugPort(DEBUG_PORT, 20000);
    console.log('  ✓ Chrome hazir! Browser: ' + debugInfo.Browser);
  } catch (e) {
    console.log('  ✗ Chrome baglanti kurulamadi. Hatasi: ' + e.message);
    process.exit(1);
  }
  
  // Step 3: Connect Puppeteer to running Chrome
  console.log('\n=== ADIM 3: Puppeteer baglaniliyor ===');
  
  const browser = await puppeteer.connect({
    browserURL: `http://127.0.0.1:${DEBUG_PORT}`,
    defaultViewport: null
  });
  
  console.log('  ✓ Puppeteer baglandi!');
  
  // Get the active page
  const pages = await browser.pages();
  let page = pages.find(p => p.url().includes('cloudflare')) || pages[pages.length - 1];
  
  if (!page) {
    page = await browser.newPage();
  }
  
  // Wait for page to load
  console.log('  Sayfa yuklenmesi bekleniyor...');
  await sleep(5000);
  
  let url = page.url();
  console.log('  URL: ' + url);
  await screenshot(page, '01-initial');
  
  // Check if we need to login
  if (url.includes('/login') || url.includes('/sign-up')) {
    console.log('\n⚠️  GIRIS GEREKIYOR!');
    console.log('  Lutfen acilan tarayicida Cloudflare hesabiniza giris yapin.');
    console.log('  120 saniye bekleniyor...\n');
    
    try {
      await page.waitForFunction(
        () => !window.location.href.includes('/login') && !window.location.href.includes('/sign-up'),
        { timeout: 120000, polling: 2000 }
      );
      console.log('  ✓ Giris basarili!');
      await sleep(3000);
      
      // After login, navigate to add-site
      await page.goto(`https://dash.cloudflare.com/${ACCT_ID}/add-site`, { 
        waitUntil: 'networkidle2', 
        timeout: 30000 
      });
    } catch (e) {
      console.log('  ✗ Giris zaman asimi! Tarayici acik kalacak, manuel devam edin.');
      await sleep(300000);
      await browser.close();
      process.exit(1);
    }
  } else {
    console.log('  ✓ Zaten giris yapilmis!');
  }
  
  url = page.url();
  console.log('  Sayfa URL: ' + url);
  await screenshot(page, '02-after-login');
  await sleep(3000);
  
  // Step 4: Find and fill domain input
  console.log('\n=== ADIM 4: Domain yaziliyor ===');
  
  // Wait for the page to fully render
  await sleep(2000);
  
  let inputFilled = false;
  
  // Strategy 1: Find input by various selectors
  const inputSelectors = [
    'input[placeholder*="site"]',
    'input[placeholder*="domain"]',
    'input[placeholder*="example"]',
    'input[name*="domain"]',
    'input[name*="site"]',
    'input[data-testid*="zone-name"]',
    'input[data-testid*="site-name"]',
    'input[type="text"]:not([type="hidden"])',
    'input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]):not([type="submit"])'
  ];
  
  for (const sel of inputSelectors) {
    try {
      const inputs = await page.$$(sel);
      for (const input of inputs) {
        const isVisible = await page.evaluate(el => {
          const rect = el.getBoundingClientRect();
          const style = window.getComputedStyle(el);
          return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
        }, input);
        
        if (isVisible) {
          await input.click({ clickCount: 3 });
          await sleep(200);
          await input.type(DOMAIN, { delay: 30 });
          inputFilled = true;
          
          const placeholder = await page.evaluate(el => el.placeholder || '', input);
          console.log(`  ✓ Domain yazildi! (selector: ${sel}, placeholder: "${placeholder}")`);
          break;
        }
      }
      if (inputFilled) break;
    } catch (e) {}
  }
  
  if (!inputFilled) {
    console.log('  ✗ Input bulunamadi! Sayfa icerigini kontrol ediyorum...');
    const bodyText = await page.evaluate(() => document.body.innerText.substring(0, 500));
    console.log('  Sayfa icerigi: ' + bodyText.replace(/\n/g, ' | '));
    await screenshot(page, '04-no-input');
    
    console.log('  Manuel olarak domain girin ve Enter\'a basin.');
    await sleep(60000);
  }
  
  await screenshot(page, '03-domain-typed');
  await sleep(1000);
  
  // Step 5: Click Continue / Add site button
  console.log('\n=== ADIM 5: Continue/Add site butonuna tiklaniyor ===');
  
  let continueClicked = await clickButtonWithText(page, 
    ['Continue', 'Add site', 'Add Site', 'Devam', 'Ekle', 'Submit'], 
    'Continue'
  );
  
  if (!continueClicked) {
    // Try pressing Enter as fallback
    console.log('  Buton bulunamadi, Enter tusu deneniyor...');
    await page.keyboard.press('Enter');
    console.log('  Enter basildi.');
  }
  
  await screenshot(page, '04-after-continue');
  await sleep(5000);
  
  // Step 6: Select Free plan 
  console.log('\n=== ADIM 6: Free plan seciliyor ===');
  url = page.url();
  console.log('  URL: ' + url);
  
  // Wait for plan selection page
  await sleep(3000);
  await screenshot(page, '05-plan-page');
  
  // Try to click on Free plan
  let planSelected = false;
  
  // Strategy: find element containing "Free" text and click it
  try {
    planSelected = await page.evaluate(() => {
      // Look for radio buttons, cards, or clickable elements with "Free"
      const allEls = document.querySelectorAll('label, div[role="radio"], input[type="radio"], [class*="plan"], [data-testid*="plan"], button, div[class*="card"], div[class*="option"]');
      
      for (const el of allEls) {
        const text = el.textContent || '';
        // Match "Free" but not "Free Trial" or similar
        if (/\bFree\b/i.test(text) && text.length < 300) {
          el.click();
          return true;
        }
      }
      
      // Fallback: find any clickable element near "Free" text
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      while (walker.nextNode()) {
        if (/^\s*Free\s*$/i.test(walker.currentNode.textContent)) {
          let parent = walker.currentNode.parentElement;
          for (let i = 0; i < 5 && parent; i++) {
            parent.click();
            parent = parent.parentElement;
          }
          return true;
        }
      }
      return false;
    });
  } catch (e) {}
  
  if (planSelected) {
    console.log('  ✓ Free plan secildi!');
  } else {
    console.log('  ✗ Free plan bulunamadi, sayfa kontrol ediliyor...');
    const bodyText = await page.evaluate(() => document.body.innerText.substring(0, 500));
    console.log('  Sayfa: ' + bodyText.replace(/\n/g, ' | '));
  }
  
  await sleep(2000);
  await screenshot(page, '06-plan-selected');
  
  // Click Continue after plan selection
  await clickButtonWithText(page, ['Continue', 'Devam', 'Next'], 'Plan Continue');
  await sleep(5000);
  
  // Step 7: DNS Records page - just click Continue
  console.log('\n=== ADIM 7: DNS kayitlari sayfasi ===');
  url = page.url();
  console.log('  URL: ' + url);
  await screenshot(page, '07-dns-page');
  
  // Wait for DNS scan to complete
  console.log('  DNS taramasi bekleniyor (15 sn)...');
  await sleep(15000);
  
  await clickButtonWithText(page, ['Continue', 'Devam', 'Next'], 'DNS Continue');
  await sleep(5000);
  await screenshot(page, '08-after-dns');
  
  // Step 8: Nameserver page - capture NS records
  console.log('\n=== ADIM 8: Nameserver bilgileri aliniyor ===');
  url = page.url();
  console.log('  URL: ' + url);
  
  await sleep(3000);
  
  try {
    const pageText = await page.evaluate(() => document.body.innerText);
    const nsMatch = pageText.match(/([a-z]+\.ns\.cloudflare\.com)/g);
    if (nsMatch && nsMatch.length > 0) {
      const unique = [...new Set(nsMatch)];
      console.log('\n  ╔═══════════════════════════════════════════╗');
      console.log('  ║  CLOUDFLARE NAMESERVERS                   ║');
      unique.forEach(ns => {
        console.log(`  ║  → ${ns.padEnd(38)}║`);
      });
      console.log('  ╚═══════════════════════════════════════════╝\n');
    } else {
      console.log('  Nameserver bilgisi bulunamadi sayfada.');
      console.log('  Sayfa icerigi (ilk 1000 karakter):');
      console.log('  ' + pageText.substring(0, 1000).replace(/\n/g, '\n  '));
    }
  } catch (e) {
    console.log('  Nameserver okuma hatasi: ' + e.message);
  }
  
  await screenshot(page, '09-nameservers');
  
  // Click Done / Check nameservers
  await clickButtonWithText(page, 
    ['Done', 'Check', 'check nameservers', 'Tamam', 'Continue', 'Finish'], 
    'Final'
  );
  
  await sleep(3000);
  await screenshot(page, '10-final');
  
  console.log('\n✅ Zone ekleme islemi tamamlandi!');
  console.log('Tarayici acik kalacak. Screenshots klasorune bakin: screenshots/\n');
  
  // Disconnect (don't close the browser)
  browser.disconnect();
  process.exit(0);
})().catch(err => {
  console.error('\n✗ HATA:', err.message);
  console.error(err.stack);
  process.exit(1);
});
