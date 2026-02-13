const puppeteer = require('puppeteer-core');

const ACCT_ID = '2f8a9910120689f4f86f06fb6637f9b2';
const ZONE_ID = 'eb9c646f745f401bf12f0722fe86b9bf';
const DOMAIN = 'egepenakcayapi.com';
const PAGES_URL = 'akcapen-yeni.pages.dev';

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

(async () => {
  console.log('Chrome\'a baglaniliyor...');
  const browser = await puppeteer.connect({
    browserURL: 'http://127.0.0.1:9222',
    defaultViewport: null
  });
  
  const page = await browser.newPage();
  
  // Navigate to DNS records page
  const dnsUrl = `https://dash.cloudflare.com/${ACCT_ID}/${DOMAIN}/dns/records`;
  console.log('DNS sayfasina gidiliyor: ' + dnsUrl);
  await page.goto(dnsUrl, { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(5000);
  
  let url = page.url();
  console.log('URL: ' + url);
  
  // Check if we're on the DNS page
  const bodyText = await page.evaluate(() => document.body.innerText);
  console.log('Sayfa icerigi (ilk 300 kar): ' + bodyText.substring(0, 300).replace(/\n/g, ' | '));
  
  // Check if zone needs activation first
  if (bodyText.includes('initializing') || bodyText.includes('Change your nameservers')) {
    console.log('\nZone hala initializing/pending. DNS kayitlari zone aktif olduktan sonra eklenebilir.');
    console.log('Nameserver degisikligi gerekiyor:');
    console.log('  1. jule.ns.cloudflare.com');
    console.log('  2. lamar.ns.cloudflare.com');
  }
  
  // Try to add record via the UI
  console.log('\n--- Add Record butonunu ariyorum ---');
  
  const addBtn = await page.evaluate(() => {
    const btns = document.querySelectorAll('button, a');
    for (const b of btns) {
      const t = b.textContent.trim().toLowerCase();
      if (t.includes('add record') || t.includes('kayit ekle') || t === 'add') {
        b.click();
        return t;
      }
    }
    return null;
  });
  
  if (addBtn) {
    console.log('Add Record tiklandi: ' + addBtn);
    await sleep(2000);
    
    // Select CNAME type
    console.log('CNAME tipi seciliyor...');
    // Click the type dropdown
    const typeDropdown = await page.$('select, [data-testid*="type"], [class*="type"]');
    if (typeDropdown) {
      await typeDropdown.select('CNAME');
      console.log('CNAME secildi');
    }
    await sleep(1000);
    
    // Fill in the name field (@ for root)
    const nameInput = await page.$('input[placeholder*="name"], input[name*="name"]');
    if (nameInput) {
      await nameInput.click({ clickCount: 3 });
      await nameInput.type('@', { delay: 50 });
      console.log('Name: @ yazildi');
    }
    await sleep(500);
    
    // Fill in content/target
    const contentInput = await page.$('input[placeholder*="target"], input[placeholder*="content"], input[name*="content"]');
    if (contentInput) {
      await contentInput.click({ clickCount: 3 });
      await contentInput.type(PAGES_URL, { delay: 30 });
      console.log('Content: ' + PAGES_URL + ' yazildi');
    }
    await sleep(500);
    
    // Click Save
    const saved = await page.evaluate(() => {
      const btns = document.querySelectorAll('button');
      for (const b of btns) {
        const t = b.textContent.trim().toLowerCase();
        if (t.includes('save') || t.includes('kaydet') || t.includes('add')) {
          b.click();
          return t;
        }
      }
      return null;
    });
    console.log('Save: ' + (saved || 'buton bulunamadi'));
  } else {
    console.log('Add Record butonu bulunamadi.');
    console.log('\nAlternatif: Zone aktif olana kadar bekleyin.');
    console.log('Zone aktif oldugunda DNS kayitlari otomatik eklenebilir.');
  }
  
  // Take a final screenshot
  const path = require('path');
  const fs = require('fs');
  const dir = path.join(__dirname, '..', 'screenshots');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  await page.screenshot({ path: path.join(dir, 'dns-page.png'), fullPage: false });
  console.log('\n[screenshot: dns-page.png]');
  
  // Check zone status
  console.log('\n=== Zone Durumu ===');
  const pageContent = await page.evaluate(() => document.body.innerText);
  if (pageContent.includes('Active')) {
    console.log('Zone AKTIF!');
  } else if (pageContent.includes('Pending')) {
    console.log('Zone PENDING - nameserver degisikligi bekleniyor');
  } else if (pageContent.includes('initializing')) {
    console.log('Zone INITIALIZING - biraz daha bekleyin');
  }
  
  browser.disconnect();
  console.log('\nTamamlandi!');
})().catch(err => {
  console.error('HATA:', err.message);
  process.exit(1);
});
