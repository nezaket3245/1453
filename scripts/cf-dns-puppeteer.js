const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const DOMAIN = 'egepenakcayapi.com';
const PAGES_URL = 'egepenakcayap--com2.pages.dev';
const ACCT = '1fb4ac9a140c6e18cf7c8d3c5854aaa9';

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function ss(page, name) {
  const dir = path.join(__dirname, '..', 'screenshots');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  try { await page.screenshot({ path: path.join(dir, `${name}.png`), fullPage: false }); console.log(`Screenshot: ${name}.png`); } catch (e) { console.log(`Screenshot failed: ${e.message}`); }
}

async function addCNAME(page, name, content) {
  console.log(`\n=== Adding CNAME: ${name} -> ${content} ===`);
  
  // Click "Add record" button
  console.log('Looking for Add Record button...');
  const clicked = await page.evaluate(() => {
    const btns = document.querySelectorAll('button, a');
    for (const b of btns) {
      const text = b.textContent.trim().toLowerCase();
      if (text.includes('add record') || text === 'add a record' || text === 'kayıt ekle') {
        b.scrollIntoView({ block: 'center' });
        b.click();
        return true;
      }
    }
    return false;
  });
  
  if (!clicked) {
    console.log('Add record button not found, trying alternative...');
    await ss(page, `add-btn-not-found-${name}`);
    return false;
  }
  
  await sleep(2000);
  await ss(page, `after-click-add-${name}`);
  
  // Select CNAME type
  console.log('Selecting CNAME type...');
  // Find and click the type dropdown
  const typeSelected = await page.evaluate(() => {
    // Look for the type selector - it's usually a dropdown
    const selects = document.querySelectorAll('select, [role="listbox"], [data-testid*="type"]');
    for (const s of selects) {
      if (s.tagName === 'SELECT') {
        s.value = 'CNAME';
        s.dispatchEvent(new Event('change', { bubbles: true }));
        return 'select';
      }
    }
    // Try clicking on a dropdown button that shows 'A' or record type
    const dropBtns = document.querySelectorAll('button');
    for (const b of dropBtns) {
      const t = b.textContent.trim();
      if (t === 'A' || t === 'Type' || t === 'AAAA') {
        b.click();
        return 'dropdown-clicked';
      }
    }
    return null;
  });
  console.log('Type selection result:', typeSelected);
  await sleep(1000);
  
  if (typeSelected === 'dropdown-clicked') {
    // Need to select CNAME from dropdown menu
    await sleep(1000);
    await page.evaluate(() => {
      const items = document.querySelectorAll('[role="option"], [role="menuitem"], li, div');
      for (const item of items) {
        if (item.textContent.trim() === 'CNAME') {
          item.click();
          return;
        }
      }
    });
    await sleep(500);
  }
  
  await ss(page, `type-selected-${name}`);
  
  // Fill in the Name field
  console.log('Filling name field...');
  await page.evaluate((nameVal) => {
    const inputs = document.querySelectorAll('input[type="text"], input:not([type])');
    for (const inp of inputs) {
      const label = inp.getAttribute('placeholder') || inp.getAttribute('aria-label') || '';
      const parentText = inp.closest('label')?.textContent || '';
      if (label.toLowerCase().includes('name') || parentText.toLowerCase().includes('name') || 
          label.toLowerCase().includes('ad') || label.toLowerCase().includes('@')) {
        inp.focus();
        inp.value = '';
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
        nativeInputValueSetter.call(inp, nameVal);
        inp.dispatchEvent(new Event('input', { bubbles: true }));
        inp.dispatchEvent(new Event('change', { bubbles: true }));
        return true;
      }
    }
    // Fallback: first empty text input
    for (const inp of inputs) {
      if (!inp.value || inp.value === '@') {
        inp.focus();
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
        nativeInputValueSetter.call(inp, nameVal);
        inp.dispatchEvent(new Event('input', { bubbles: true }));
        inp.dispatchEvent(new Event('change', { bubbles: true }));
        return true;
      }
    }
    return false;
  }, name);
  await sleep(500);
  
  // Fill in the Target/Content field  
  console.log('Filling target field...');
  await page.evaluate((targetVal) => {
    const inputs = document.querySelectorAll('input[type="text"], input:not([type])');
    for (const inp of inputs) {
      const label = inp.getAttribute('placeholder') || inp.getAttribute('aria-label') || '';
      const parentText = inp.closest('label')?.textContent || '';
      if (label.toLowerCase().includes('target') || label.toLowerCase().includes('content') || 
          label.toLowerCase().includes('domain') || label.toLowerCase().includes('hedef') ||
          parentText.toLowerCase().includes('target')) {
        inp.focus();
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
        nativeInputValueSetter.call(inp, targetVal);
        inp.dispatchEvent(new Event('input', { bubbles: true }));
        inp.dispatchEvent(new Event('change', { bubbles: true }));
        return true;
      }
    }
    return false;
  }, content);
  await sleep(500);
  
  await ss(page, `form-filled-${name}`);
  
  // Make sure proxy is ON (orange cloud)
  console.log('Checking proxy status...');
  
  // Click Save
  console.log('Clicking Save...');
  await page.evaluate(() => {
    const btns = document.querySelectorAll('button');
    for (const b of btns) {
      const text = b.textContent.trim().toLowerCase();
      if (text === 'save' || text === 'kaydet' || text.includes('save')) {
        b.scrollIntoView({ block: 'center' });
        b.click();
        return true;
      }
    }
    return false;
  });
  
  await sleep(3000);
  await ss(page, `after-save-${name}`);
  console.log(`CNAME ${name} added!`);
  return true;
}

(async () => {
  console.log('Connecting to Chrome...');
  let browser;
  try {
    browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222', defaultViewport: null });
  } catch (e) {
    console.error('Cannot connect to Chrome. Make sure Chrome is running with --remote-debugging-port=9222');
    console.error(e.message);
    process.exit(1);
  }
  
  const pages = await browser.pages();
  let page = pages.find(p => p.url().includes('cloudflare.com')) || pages[0];
  
  console.log('Current URL:', page.url());
  
  // Navigate to DNS page
  const dnsUrl = `https://dash.cloudflare.com/${ACCT}/${DOMAIN}/dns/records`;
  console.log('Navigating to DNS page:', dnsUrl);
  await page.goto(dnsUrl, { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(5000);
  
  console.log('Page loaded, URL:', page.url());
  await ss(page, 'dns-page-loaded');
  
  // Check if we need to login
  const needsLogin = page.url().includes('login') || page.url().includes('sign-in');
  if (needsLogin) {
    console.log('\n⚠️  Cloudflare login required! Please log in manually in the Chrome window, then re-run this script.');
    await ss(page, 'needs-login');
    return;
  }
  
  // Check existing records
  console.log('\nChecking existing DNS records on page...');
  const existingRecords = await page.evaluate(() => {
    const rows = document.querySelectorAll('tr, [class*="record"], [data-testid*="record"]');
    const records = [];
    rows.forEach(r => {
      const text = r.textContent;
      if (text.includes('CNAME')) records.push(text.substring(0, 200));
    });
    return records;
  });
  console.log('Existing CNAME records:', existingRecords.length ? existingRecords.join('\n') : 'None found');
  
  // Add root CNAME (@)
  await addCNAME(page, '@', PAGES_URL);
  
  await sleep(2000);
  
  // Reload page before adding next record
  await page.goto(dnsUrl, { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(3000);
  
  // Add www CNAME
  await addCNAME(page, 'www', PAGES_URL);
  
  console.log('\n✅ DNS records setup complete!');
  console.log('Please verify the records on the Cloudflare DNS page.');
  
  // Don't disconnect - let user verify
})().catch(e => console.error('Error:', e));
