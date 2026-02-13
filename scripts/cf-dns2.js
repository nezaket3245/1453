const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');

const DOMAIN = 'egepenakcayapi.com';
const PAGES_URL = 'akcapen-yeni.pages.dev';

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function ss(page, name) {
  const dir = path.join(__dirname, '..', 'screenshots');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  try {
    await page.screenshot({ path: path.join(dir, `${name}.png`) });
    console.log(`  [ss: ${name}.png]`);
  } catch (e) {}
}

async function addCNAME(page, name, target) {
  console.log(`\n--- CNAME ekleniyor: ${name} -> ${target} ---`);
  
  // Click "Add record" button
  console.log('  Add Record tiklaniyor...');
  const addClicked = await page.evaluate(() => {
    const btns = document.querySelectorAll('button');
    for (const b of btns) {
      const t = b.textContent.trim().toLowerCase();
      if (t === 'add record' || t === 'add') {
        b.click();
        return true;
      }
    }
    return false;
  });
  if (!addClicked) {
    console.log('  Add Record butonu bulunamadi!');
    return false;
  }
  await sleep(2000);
  
  // Change type to CNAME - click on type dropdown (custom component)
  console.log('  Record tipi seciliyor...');
  
  // Click on the type selector (it might show "A" by default)
  const typeClicked = await page.evaluate(() => {
    // Look for dropdown/select that contains record types
    const els = document.querySelectorAll('[class*="select"], [class*="dropdown"], [role="combobox"], [role="listbox"], button');
    for (const el of els) {
      const t = el.textContent.trim();
      // Record type selector usually shows "A" or "Type"
      if (t === 'A' || t === 'Type' || t === 'AAAA' || t === 'CNAME') {
        el.click();
        return t;
      }
    }
    return null;
  });
  console.log('  Type dropdown: ' + (typeClicked || 'bulunamadi'));
  await sleep(1000);
  
  // Select CNAME from dropdown
  if (typeClicked && typeClicked !== 'CNAME') {
    const cnameSelected = await page.evaluate(() => {
      const options = document.querySelectorAll('[role="option"], li, div[class*="option"], span');
      for (const opt of options) {
        const t = opt.textContent.trim();
        if (t === 'CNAME') {
          opt.click();
          return true;
        }
      }
      return false;
    });
    console.log('  CNAME secildi: ' + cnameSelected);
    await sleep(1000);
  }
  
  await ss(page, `dns-type-${name}`);
  
  // Fill name field
  console.log('  Name alani dolduruluyor...');
  const inputs = await page.$$('input[type="text"], input:not([type])');
  let nameInput = null;
  let contentInput = null;
  
  for (const inp of inputs) {
    const placeholder = await page.evaluate(el => (el.placeholder || '').toLowerCase(), inp);
    const visible = await page.evaluate(el => el.offsetParent !== null, inp);
    if (!visible) continue;
    
    if (!nameInput && (placeholder.includes('name') || placeholder.includes('@'))) {
      nameInput = inp;
    } else if (!contentInput && (placeholder.includes('target') || placeholder.includes('content') || placeholder.includes('domain') || placeholder.includes('value'))) {
      contentInput = inp;
    }
  }
  
  // Fallback: use all visible text inputs
  if (!nameInput || !contentInput) {
    const visibleInputs = [];
    for (const inp of inputs) {
      const visible = await page.evaluate(el => {
        const r = el.getBoundingClientRect();
        return r.width > 30 && r.height > 10 && el.offsetParent !== null;
      }, inp);
      if (visible) visibleInputs.push(inp);
    }
    console.log(`  Visible inputs: ${visibleInputs.length}`);
    
    // Print all visible input placeholders
    for (let i = 0; i < visibleInputs.length; i++) {
      const ph = await page.evaluate(el => `placeholder="${el.placeholder}" name="${el.name}" value="${el.value}" type="${el.type}"`, visibleInputs[i]);
      console.log(`    Input ${i}: ${ph}`);
    }
    
    if (visibleInputs.length >= 2 && !nameInput) {
      nameInput = visibleInputs[0];
      contentInput = visibleInputs[1];
    }
  }
  
  if (nameInput) {
    await nameInput.click({ clickCount: 3 });
    await nameInput.type(name, { delay: 30 });
    console.log(`  Name: "${name}" yazildi`);
  } else {
    console.log('  Name input bulunamadi!');
  }
  
  await sleep(500);
  
  if (contentInput) {
    await contentInput.click({ clickCount: 3 });
    await contentInput.type(target, { delay: 30 });
    console.log(`  Target: "${target}" yazildi`);
  } else {
    console.log('  Content/Target input bulunamadi!');
  }
  
  await sleep(1000);
  await ss(page, `dns-filled-${name}`);
  
  // Click Save
  console.log('  Save tiklaniyor...');
  const saved = await page.evaluate(() => {
    const btns = document.querySelectorAll('button');
    for (const b of btns) {
      const t = b.textContent.trim().toLowerCase();
      if (t === 'save' || t === 'kaydet' || t.includes('save record')) {
        b.click();
        return t;
      }
    }
    return null;
  });
  console.log('  Save: ' + (saved || 'bulunamadi'));
  
  await sleep(3000);
  await ss(page, `dns-saved-${name}`);
  return true;
}

(async () => {
  console.log('=== Cloudflare DNS CNAME Ekleme ===\n');
  
  const browser = await puppeteer.connect({
    browserURL: 'http://127.0.0.1:9222',
    defaultViewport: null
  });
  
  const page = await browser.newPage();
  const ACCT = '2f8a9910120689f4f86f06fb6637f9b2';
  
  await page.goto(`https://dash.cloudflare.com/${ACCT}/${DOMAIN}/dns/records`, {
    waitUntil: 'networkidle2',
    timeout: 30000
  });
  
  await sleep(5000);
  console.log('URL: ' + page.url());
  await ss(page, 'dns-0-start');
  
  // Check page content
  const body = await page.evaluate(() => document.body.innerText.substring(0, 500));
  console.log('Sayfa: ' + body.replace(/\n/g, ' | ').substring(0, 300));
  
  // Add root CNAME
  await addCNAME(page, '@', PAGES_URL);
  
  // Wait and reload
  await sleep(3000);
  await page.reload({ waitUntil: 'networkidle2' });
  await sleep(3000);
  
  // Add www CNAME
  await addCNAME(page, 'www', PAGES_URL);
  
  // Verify
  await sleep(3000);
  await page.reload({ waitUntil: 'networkidle2' });
  await sleep(3000);
  
  const finalBody = await page.evaluate(() => document.body.innerText);
  const cnames = finalBody.match(/CNAME.*?pages\.dev/g);
  if (cnames) {
    console.log('\n=== Eklenen CNAME kayitlari ===');
    cnames.forEach(c => console.log('  ' + c));
  }
  
  console.log('\n✅ DNS ekleme tamamlandi!');
  browser.disconnect();
})().catch(err => {
  console.error('HATA:', err.message);
  process.exit(1);
});
