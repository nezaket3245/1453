const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const DOMAIN = 'egepenakcayapi.com';
const PAGES_URL = 'akcapen-yeni.pages.dev';
const ACCT = '2f8a9910120689f4f86f06fb6637f9b2';

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function ss(page, name) {
  const dir = path.join(__dirname, '..', 'screenshots');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  try { await page.screenshot({ path: path.join(dir, `${name}.png`) }); } catch (e) {}
}

async function addRecord(page, recordName, target) {
  console.log(`\n--- CNAME ${recordName} -> ${target} ---`);
  
  // Click "Add record"
  await page.evaluate(() => {
    const btns = document.querySelectorAll('button');
    for (const b of btns) {
      const t = b.textContent.trim().toLowerCase();
      if (t.includes('add record') || t === 'add') {
        b.scrollIntoView({ block: 'center' });
        b.click();
        return;
      }
    }
  });
  await sleep(2000);
  
  // Change type: click the type DIV showing "A"
  // Find the record type selector in the add form
  // It's a DIV with class containing "select" showing "A"
  const typeClicked = await page.evaluate(() => {
    // The add record form should be at the top. 
    // Look for the first DIV with text "A" that's a select container
    const selects = document.querySelectorAll('[class*="select"]');
    for (const s of selects) {
      // The type selector contains "A" as the selected value
      const singleValue = s.querySelector('[class*="singleValue"], [class*="placeholder"]');
      if (singleValue && singleValue.textContent.trim() === 'A') {
        // Click the container to open dropdown
        s.click();
        return 'select-container';
      }
    }
    // Fallback: find the react-select input for type
    const typeInput = document.querySelector('#react-select-2-input');
    if (typeInput) {
      typeInput.parentElement.click();
      return 'react-select';
    }
    return null;
  });
  console.log('  Type selector: ' + typeClicked);
  await sleep(1000);
  
  // Type "CNAME" to search and select
  const typeInput = await page.$('#react-select-2-input');
  if (typeInput) {
    await typeInput.type('CNAME', { delay: 50 });
    await sleep(500);
    // Press Enter to select first option
    await page.keyboard.press('Enter');
    console.log('  CNAME yazildi ve secildi');
  } else {
    // Try clicking CNAME in dropdown
    await page.evaluate(() => {
      const opts = document.querySelectorAll('[role="option"], [class*="option"]');
      for (const o of opts) {
        if (o.textContent.trim() === 'CNAME') { o.click(); return; }
      }
    });
  }
  await sleep(1000);
  
  // Now fill the NAME field
  // The name field appears as a text input after type is set
  // Look for it — it should be a visible text input that's not "term", "comment", or the type selector
  console.log('  Name alani dolduruluyor...');
  
  // After changing to CNAME, the form fields change
  // For CNAME, we need: name, target
  // The "name" field should be a text input
  const formInputs = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('input[type="text"], input:not([type])'))
      .filter(i => i.offsetParent !== null && !['hidden', 'checkbox', 'radio'].includes(i.type))
      .map(i => ({
        id: i.id, name: i.name, placeholder: i.placeholder, 
        value: i.value, ariaLabel: i.getAttribute('aria-label') || ''
      }));
  });
  console.log('  Form inputs:', JSON.stringify(formInputs.filter(i => i.name !== 'term' && !i.id.includes('react-select')), null, 2));
  
  // The name input usually has name="" and no specific id
  // The target input has name="ipv4_address" (reused for CNAME target) or similar
  // After CNAME selection, it might change to "target" or "cname"
  
  // Strategy: Click on each input and type
  // Name input: second text input (after search "term")
  // But skip react-select inputs
  const targetNames = ['ipv4_address', 'target', 'cname', 'content'];
  const nameInputId = formInputs.find(i => 
    i.name !== 'term' && 
    !targetNames.includes(i.name) &&
    !i.id.includes('react-select') &&
    i.name !== 'comment'
  );
  
  const targetInput = formInputs.find(i => targetNames.includes(i.name));
  
  console.log('  Name input:', nameInputId?.id || nameInputId?.name || 'not found');
  console.log('  Target input:', targetInput?.id || targetInput?.name || 'not found');
  
  // Fill name field by clicking and typing
  if (nameInputId) {
    const selector = nameInputId.id ? `#${nameInputId.id}` : `input[name="${nameInputId.name}"]`;
    const el = await page.$(selector);
    if (el) {
      await el.click({ clickCount: 3 });
      await el.type(recordName, { delay: 30 });
      console.log('  Name yazildi: ' + recordName);
    }
  } else {
    // Try to find name input by its parent label
    console.log('  Name input bulunamadi, label ile araniyor...');
    const nameTyped = await page.evaluate((name) => {
      // Find label containing "Name" and get associated input
      const labels = document.querySelectorAll('label');
      for (const l of labels) {
        if (l.textContent.trim().toLowerCase().includes('name') && 
            !l.textContent.trim().toLowerCase().includes('nameserver')) {
          const input = l.querySelector('input') || l.nextElementSibling?.querySelector('input');
          if (input && input.offsetParent) {
            input.focus();
            input.click();
            // Use native setter
            const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
            setter.call(input, name);
            input.dispatchEvent(new Event('input', { bubbles: true }));
            input.dispatchEvent(new Event('change', { bubbles: true }));
            return true;
          }
        }
      }
      return false;
    }, recordName);
    console.log('  Label ile yazildi: ' + nameTyped);
  }
  
  await sleep(500);
  
  // Fill target
  if (targetInput) {
    const selector = targetInput.id ? `#${targetInput.id}` : `input[name="${targetInput.name}"]`;
    const el = await page.$(selector);
    if (el) {
      await el.click({ clickCount: 3 });
      await el.type(target, { delay: 30 });
      console.log('  Target yazildi: ' + target);
    }
  }
  
  await sleep(1000);
  await ss(page, `dns-${recordName}`);
  
  // Click Save
  const saved = await page.evaluate(() => {
    const btns = document.querySelectorAll('button');
    for (const b of btns) {
      const t = b.textContent.trim().toLowerCase();
      if ((t === 'save' || t === 'save record') && !b.disabled && b.offsetParent) {
        b.click();
        return true;
      }
    }
    return false;
  });
  console.log('  Save: ' + saved);
  await sleep(3000);
  
  // Check for error
  const error = await page.evaluate(() => {
    const alerts = document.querySelectorAll('[role="alert"], [class*="error"], [class*="danger"], [class*="validation"]');
    for (const a of alerts) {
      if (a.offsetParent && a.textContent.trim().length > 0 && a.textContent.trim().length < 200) {
        return a.textContent.trim();
      }
    }
    return null;
  });
  if (error) {
    console.log('  ⚠️ Hata: ' + error);
    return false;
  }
  
  console.log('  ✓ Kaydedildi!');
  return true;
}

(async () => {
  console.log('Chrome\'a baglaniliyor...');
  const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222', defaultViewport: null });
  const page = await browser.newPage();
  
  await page.goto(`https://dash.cloudflare.com/${ACCT}/${DOMAIN}/dns/records`, {
    waitUntil: 'networkidle2', timeout: 30000
  });
  await sleep(5000);
  console.log('URL: ' + page.url());
  
  // First check existing records
  console.log('\n=== Mevcut DNS Kayitlari ===');
  const existingRecords = await page.evaluate(() => {
    const text = document.body.innerText;
    const lines = text.split('\n').filter(l => 
      l.includes('CNAME') || l.includes('pages.dev') || 
      l.match(/^[A-Z]+\s/) || l.includes('Content')
    );
    return lines.map(l => l.trim()).filter(l => l.length > 3 && l.length < 200).slice(0, 20);
  });
  existingRecords.forEach(r => console.log('  ' + r));
  
  await ss(page, 'dns-existing');
  
  // Add CNAME @
  await addRecord(page, '@', PAGES_URL);
  
  await sleep(3000);
  
  // Add CNAME www
  await addRecord(page, 'www', PAGES_URL);
  
  // Final check
  console.log('\n=== Son Durum ===');
  await page.reload({ waitUntil: 'networkidle2' });
  await sleep(3000);
  const body = await page.evaluate(() => document.body.innerText);
  const records = body.split('\n').filter(l => l.includes('CNAME') || l.includes('pages.dev'));
  records.forEach(r => console.log('  ' + r.trim()));
  
  await ss(page, 'dns-final');
  browser.disconnect();
  console.log('\nBitti!');
})().catch(err => console.error('HATA:', err.message));
