const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const ACCT_ID = '2f8a9910120689f4f86f06fb6637f9b2';
const DOMAIN = 'egepenakcayapi.com';

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function ss(page, name) {
  const dir = path.join(__dirname, '..', 'screenshots');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  try { await page.screenshot({ path: path.join(dir, `${name}.png`) }); } catch (e) {}
}

(async () => {
  console.log('Chrome\'a baglaniliyor...');
  const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222', defaultViewport: null });
  
  const page = await browser.newPage();

  // Go to plan selection page
  console.log('Plan secim sayfasina gidiliyor...');
  await page.goto(`https://dash.cloudflare.com/${ACCT_ID}/${DOMAIN}/select-plan`, {
    waitUntil: 'networkidle2', timeout: 30000
  });
  await sleep(5000);
  console.log('URL: ' + page.url());
  await ss(page, 'plan-01');
  
  // Step 1: Click "Free" button to highlight the Free plan
  console.log('\n1. Free plan seciliyor...');
  const freeClicked = await page.evaluate(() => {
    const btns = document.querySelectorAll('button');
    for (const b of btns) {
      if (b.textContent.trim() === 'Free' && b.offsetParent !== null) {
        b.click();
        return true;
      }
    }
    return false;
  });
  console.log('   Free tiklamasi: ' + freeClicked);
  await sleep(2000);
  
  // Step 2: Scroll down and find "Select plan" button for Free (first one)
  console.log('\n2. "Select plan" butonuna tiklaniyor...');
  await ss(page, 'plan-02-free');
  
  // The first "Select plan" button should be for Free plan
  const selectClicked = await page.evaluate(() => {
    const btns = document.querySelectorAll('button');
    const selectBtns = [];
    for (const b of btns) {
      const t = b.textContent.trim();
      if (t === 'Select plan' && b.offsetParent !== null && !b.disabled) {
        selectBtns.push(b);
      }
    }
    // First "Select plan" = Free, Second = Pro, Third = Business
    if (selectBtns.length > 0) {
      selectBtns[0].scrollIntoView({ block: 'center' });
      selectBtns[0].click();
      return `Clicked first of ${selectBtns.length} buttons`;
    }
    return null;
  });
  console.log('   Select plan: ' + (selectClicked || 'bulunamadi'));
  await sleep(3000);
  await ss(page, 'plan-03-selected');
  
  // Check if we moved to a different page
  let url = page.url();
  console.log('   Yeni URL: ' + url);
  
  // Wait for next page to load
  await sleep(5000);
  url = page.url();
  console.log('   URL: ' + url);
  await ss(page, 'plan-04-next');
  
  // Check what page we're on
  let body = await page.evaluate(() => document.body.innerText.substring(0, 500));
  console.log('   Sayfa: ' + body.replace(/\n/g, ' | ').substring(0, 300));
  
  // If we're on DNS page - click Continue
  if (url.includes('dns') || body.includes('DNS') || body.includes('records')) {
    console.log('\n3. DNS sayfasi - "Continue" tiklaniyor...');
    await sleep(5000);
    
    const dnsContinue = await page.evaluate(() => {
      const btns = document.querySelectorAll('button');
      for (const b of btns) {
        const t = b.textContent.trim();
        if ((t.includes('Continue') || t === 'Continue') && b.offsetParent !== null && !b.disabled) {
          b.scrollIntoView({ block: 'center' });
          b.click();
          return t;
        }
      }
      return null;
    });
    console.log('   DNS Continue: ' + (dnsContinue || 'bulunamadi'));
    await sleep(8000);
    
    url = page.url();
    console.log('   URL: ' + url);
    await ss(page, 'plan-05-afterdns');
  }
  
  // If we're on nameserver page - get nameservers and click check
  body = await page.evaluate(() => document.body.innerText);
  const nsMatch = body.match(/([a-z]+\.ns\.cloudflare\.com)/g);
  if (nsMatch) {
    const unique = [...new Set(nsMatch)];
    console.log('\n╔═══════════════════════════════════════╗');
    console.log('║  CLOUDFLARE NAMESERVERS               ║');
    unique.forEach(ns => console.log(`║  → ${ns.padEnd(34)}║`));
    console.log('╚═══════════════════════════════════════╝');
  }
  
  // Look for "Check nameservers" or "Done, check nameservers" button
  console.log('\n4. Nameserver check butonu aranıyor...');
  const checkClicked = await page.evaluate(() => {
    const btns = document.querySelectorAll('button');
    for (const b of btns) {
      const t = b.textContent.trim().toLowerCase();
      if ((t.includes('check') || t.includes('done') || t.includes('continue') || t.includes('finish')) && b.offsetParent !== null && !b.disabled) {
        b.scrollIntoView({ block: 'center' });
        b.click();
        return b.textContent.trim();
      }
    }
    return null;
  });
  console.log('   Check: ' + (checkClicked || 'bulunamadi'));
  await sleep(5000);
  
  url = page.url();
  console.log('   Final URL: ' + url);
  await ss(page, 'plan-06-final');
  
  // Check zone status
  body = await page.evaluate(() => document.body.innerText);
  if (body.includes('Active')) {
    console.log('\n✅ Zone AKTIF!');
  } else if (body.includes('Pending')) {
    console.log('\n⏳ Zone PENDING - nameserver degisikligi bekleniyor');
  }
  
  // List all visible buttons on final page
  console.log('\n--- Final sayfa butonlari ---');
  const finalBtns = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('button'))
      .filter(b => b.offsetParent !== null)
      .map(b => b.textContent.trim().substring(0, 60))
      .filter(t => t.length > 0 && t.length < 60)
      .slice(0, 15);
  });
  finalBtns.forEach(b => console.log('  ' + b));
  
  console.log('\nTamamlandi!');
  browser.disconnect();
})().catch(err => {
  console.error('HATA:', err.message);
  process.exit(1);
});
