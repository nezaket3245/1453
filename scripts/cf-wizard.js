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
  
  // Navigate to zone overview
  const page = await browser.newPage();
  const overviewUrl = `https://dash.cloudflare.com/${ACCT_ID}/${DOMAIN}`;
  console.log('Zone overview sayfasina gidiliyor...');
  await page.goto(overviewUrl, { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(5000);
  
  console.log('URL: ' + page.url());
  await ss(page, 'wizard-01-overview');
  
  // Get all text on page
  const bodyText = await page.evaluate(() => document.body.innerText);
  console.log('Sayfa icerigi (ilk 1000 kar):');
  console.log(bodyText.substring(0, 1000));
  
  // Look for any setup wizard, "finish setup", or nameserver-related content
  console.log('\n--- Butonlari listeliyorum ---');
  const buttons = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('button, a[class*="button"], a[role="button"]'))
      .filter(b => b.offsetParent !== null)
      .map(b => ({
        text: b.textContent.trim().substring(0, 80),
        tag: b.tagName,
        href: b.href || '',
        disabled: b.disabled
      }))
      .filter(b => b.text.length > 0 && b.text.length < 100);
  });
  buttons.forEach((b, i) => {
    console.log(`  [${i}] <${b.tag}> "${b.text}" ${b.disabled ? '[DISABLED]' : ''} ${b.href ? `href=${b.href}` : ''}`);
  });
  
  // Look for "Quick Start Guide", "Review settings", "continue", "finish"
  console.log('\n--- Setup wizard aranıyor ---');
  const setupActions = ['finish setup', 'quick start', 'review', 'get started', 'continue setup', 'change nameservers', 'check nameservers'];
  
  for (const action of setupActions) {
    const found = buttons.find(b => b.text.toLowerCase().includes(action));
    if (found) {
      console.log(`  BULUNDU: "${action}" -> "${found.text}"`);
    }
  }
  
  // Check if there's a "Quick Start Guide" dismissal needed
  const quickStart = await page.evaluate(() => {
    const links = document.querySelectorAll('a, button');
    for (const l of links) {
      const t = l.textContent.trim();
      if (t.includes('Finish later') || t.includes('Skip') || t.includes('Get started') || t.includes('Quick Start Guide')) {
        return { text: t.substring(0, 60), tag: l.tagName };
      }
    }
    return null;
  });
  if (quickStart) {
    console.log('  Quick Start / Skip bulundu: ' + quickStart.text);
  }
  
  // Check for the nameserver change prompts
  const nsInfo = bodyText.match(/([a-z]+\.ns\.cloudflare\.com)/g);
  if (nsInfo) {
    const unique = [...new Set(nsInfo)];
    console.log('\n=== NAMESERVERS BULUNDU ===');
    unique.forEach(ns => console.log('  ' + ns));
  }
  
  // Check if there's any element we can interact with to proceed
  console.log('\n--- Links aranıyor ---');
  const links = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('a'))
      .filter(a => a.offsetParent !== null && a.href)
      .map(a => ({ text: a.textContent.trim().substring(0, 60), href: a.href }))
      .filter(a => a.text.length > 0 && a.text.length < 80)
      .slice(0, 30);
  });
  links.forEach((l, i) => {
    console.log(`  [${i}] "${l.text}" -> ${l.href.substring(0, 80)}`);
  });
  
  await ss(page, 'wizard-02-details');
  
  console.log('\nTamamlandi!');
  browser.disconnect();
})().catch(err => {
  console.error('HATA:', err.message);
  process.exit(1);
});
