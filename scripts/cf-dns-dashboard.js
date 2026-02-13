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

(async () => {
  console.log('Chrome\'a baglaniliyor...');
  const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222', defaultViewport: null });
  const page = await browser.newPage();
  
  // Navigate to DNS records page
  console.log('DNS sayfasina gidiliyor...');
  await page.goto(`https://dash.cloudflare.com/${ACCT}/${DOMAIN}/dns/records`, {
    waitUntil: 'networkidle2', timeout: 30000
  });
  await sleep(5000);
  console.log('URL: ' + page.url());
  await ss(page, 'dns-01');
  
  // ===== ADD FIRST RECORD: @ CNAME =====
  console.log('\n=== CNAME @ -> ' + PAGES_URL + ' ===');
  
  // Click "Add record" button
  console.log('1. Add record tiklaniyor...');
  await page.evaluate(() => {
    const btns = document.querySelectorAll('button');
    for (const b of btns) {
      if (b.textContent.trim().toLowerCase().includes('add record')) {
        b.scrollIntoView({ block: 'center' });
        b.click();
        return;
      }
    }
    // fallback: any "Add" button
    for (const b of btns) {
      if (b.textContent.trim() === 'Add') {
        b.scrollIntoView({ block: 'center' });
        b.click();
        return;
      }
    }
  });
  await sleep(3000);
  await ss(page, 'dns-02-addform');
  
  // Find the form area
  // The record type selector is usually a custom dropdown
  // List all visible form elements
  console.log('2. Form elemanlarini araniyor...');
  const formInfo = await page.evaluate(() => {
    const info = { inputs: [], selects: [], buttons: [], dropdowns: [] };
    
    // All visible inputs
    document.querySelectorAll('input').forEach(el => {
      if (el.offsetParent) {
        info.inputs.push({
          type: el.type, name: el.name, placeholder: el.placeholder,
          value: el.value, id: el.id, role: el.getAttribute('role')
        });
      }
    });
    
    // Selects
    document.querySelectorAll('select').forEach(el => {
      if (el.offsetParent) {
        const opts = Array.from(el.options).map(o => o.value + '=' + o.text);
        info.selects.push({ name: el.name, id: el.id, options: opts.join(', ') });
      }
    });
    
    // Look for custom dropdown triggers
    document.querySelectorAll('[role="combobox"], [role="listbox"], [aria-haspopup], [class*="select"], [class*="dropdown"]').forEach(el => {
      if (el.offsetParent) {
        info.dropdowns.push({
          tag: el.tagName, text: el.textContent.trim().substring(0, 50),
          role: el.getAttribute('role'), ariaExpanded: el.getAttribute('aria-expanded')
        });
      }
    });
    
    return info;
  });
  
  console.log('   Inputs:', JSON.stringify(formInfo.inputs, null, 2));
  console.log('   Selects:', JSON.stringify(formInfo.selects, null, 2));
  console.log('   Dropdowns:', JSON.stringify(formInfo.dropdowns, null, 2));
  
  // Try to find and click the type selector (might be labeled "A" by default)
  console.log('\n3. Record type ayarlanıyor...');

  // Strategy: Look for a <select> element with DNS record types
  if (formInfo.selects.length > 0) {
    const typeSelect = formInfo.selects.find(s => s.options.includes('CNAME'));
    if (typeSelect) {
      console.log('   Native select bulundu! CNAME seciliyor...');
      await page.select(`select[name="${typeSelect.name}"]`, 'CNAME');
      await sleep(1000);
    }
  }
  
  // Strategy 2: Look for a custom button-style dropdown showing "A"
  const typeChanged = await page.evaluate(() => {
    // Find button or div that shows current record type "A"
    const els = document.querySelectorAll('button, div, span');
    for (const el of els) {
      const t = el.textContent.trim();
      if (t === 'A' && el.offsetParent && el.getBoundingClientRect().width < 100) {
        el.click();
        return 'clicked-A';
      }
    }
    return null;
  });
  
  if (typeChanged) {
    console.log('   Type dropdown acildi: ' + typeChanged);
    await sleep(1000);
    
    // Now select CNAME from the opened dropdown
    const cnameSelected = await page.evaluate(() => {
      const items = document.querySelectorAll('[role="option"], [role="menuitem"], li, div, span, button');
      for (const item of items) {
        const t = item.textContent.trim();
        if (t === 'CNAME' && item.offsetParent) {
          item.click();
          return true;
        }
      }
      return false;
    });
    console.log('   CNAME secildi: ' + cnameSelected);
    await sleep(1000);
  }
  
  await ss(page, 'dns-03-type');
  
  // Now fill the name and target fields
  console.log('\n4. Name ve Target alanlarini dolduruluyor...');
  
  // Re-enumerate visible inputs after form change
  const visibleInputs = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('input')).filter(i => i.offsetParent !== null && i.type !== 'hidden' && i.type !== 'checkbox' && i.type !== 'radio').map((i, idx) => ({
      idx, type: i.type, name: i.name, placeholder: i.placeholder, value: i.value
    }));
  });
  console.log('   Visible inputs after type change:', JSON.stringify(visibleInputs));
  
  // Fill name (usually first text input in the form)
  // Look for name input by placeholder
  let nameIdx = visibleInputs.findIndex(i => 
    i.placeholder.toLowerCase().includes('name') || 
    i.placeholder.includes('@') ||
    i.name.includes('name')
  );
  
  let targetIdx = visibleInputs.findIndex(i => 
    i.placeholder.toLowerCase().includes('target') || 
    i.placeholder.toLowerCase().includes('content') || 
    i.placeholder.toLowerCase().includes('domain') ||
    i.name.includes('target') || 
    i.name.includes('content')
  );
  
  console.log('   Name input idx:', nameIdx, 'Target input idx:', targetIdx);
  
  // If we can't find by placeholder, use position - name is usually before target
  if (nameIdx === -1 && targetIdx === -1 && visibleInputs.length >= 2) {
    // Skip search inputs (usually have name="term" or similar)
    const formInputs = visibleInputs.filter(i => i.name !== 'term' && !i.placeholder.toLowerCase().includes('search'));
    if (formInputs.length >= 2) {
      nameIdx = visibleInputs.indexOf(formInputs[0]);
      targetIdx = visibleInputs.indexOf(formInputs[1]);
      console.log('   Fallback - Name:', nameIdx, 'Target:', targetIdx);
    }
  }
  
  if (nameIdx >= 0) {
    const sel = `input:nth-of-type(1)`; // We'll use evaluate to type
    await page.evaluate((idx, value) => {
      const inputs = Array.from(document.querySelectorAll('input')).filter(i => i.offsetParent !== null && i.type !== 'hidden' && i.type !== 'checkbox' && i.type !== 'radio');
      if (inputs[idx]) {
        inputs[idx].focus();
        inputs[idx].value = '';
        // Trigger React/Vue input events
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
        nativeInputValueSetter.call(inputs[idx], value);
        inputs[idx].dispatchEvent(new Event('input', { bubbles: true }));
        inputs[idx].dispatchEvent(new Event('change', { bubbles: true }));
      }
    }, nameIdx, '@');
    console.log('   Name "@" yazildi');
  }
  
  if (targetIdx >= 0) {
    await page.evaluate((idx, value) => {
      const inputs = Array.from(document.querySelectorAll('input')).filter(i => i.offsetParent !== null && i.type !== 'hidden' && i.type !== 'checkbox' && i.type !== 'radio');
      if (inputs[idx]) {
        inputs[idx].focus();
        inputs[idx].value = '';
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
        nativeInputValueSetter.call(inputs[idx], value);
        inputs[idx].dispatchEvent(new Event('input', { bubbles: true }));
        inputs[idx].dispatchEvent(new Event('change', { bubbles: true }));
      }
    }, targetIdx, PAGES_URL);
    console.log('   Target "' + PAGES_URL + '" yazildi');
  }
  
  await sleep(1000);
  await ss(page, 'dns-04-filled');
  
  // Click Save
  console.log('\n5. Save tiklaniyor...');
  const saved = await page.evaluate(() => {
    const btns = document.querySelectorAll('button');
    for (const b of btns) {
      const t = b.textContent.trim().toLowerCase();
      if ((t === 'save' || t === 'save record' || t.includes('save')) && !b.disabled && b.offsetParent) {
        b.scrollIntoView({ block: 'center' });
        b.click();
        return b.textContent.trim();
      }
    }
    return null;
  });
  console.log('   Save: ' + (saved || 'bulunamadi'));
  await sleep(3000);
  await ss(page, 'dns-05-saved');
  
  // Check for errors
  const errorText = await page.evaluate(() => {
    const alerts = document.querySelectorAll('[role="alert"], [class*="error"], [class*="danger"]');
    for (const a of alerts) {
      if (a.offsetParent && a.textContent.trim().length > 0) {
        return a.textContent.trim().substring(0, 200);
      }
    }
    return null;
  });
  if (errorText) {
    console.log('   ⚠️ Hata: ' + errorText);
  }
  
  // ===== Now add www CNAME =====
  console.log('\n\n=== CNAME www -> ' + PAGES_URL + ' ===');
  await sleep(2000);
  
  // Click Add record again
  await page.evaluate(() => {
    const btns = document.querySelectorAll('button');
    for (const b of btns) {
      if (b.textContent.trim().toLowerCase().includes('add record') || b.textContent.trim() === 'Add') {
        b.scrollIntoView({ block: 'center' });
        b.click();
        return;
      }
    }
  });
  await sleep(2000);
  
  // Change type to CNAME again
  await page.evaluate(() => {
    const els = document.querySelectorAll('button, div, span');
    for (const el of els) {
      if (el.textContent.trim() === 'A' && el.offsetParent && el.getBoundingClientRect().width < 100) {
        el.click();
        return;
      }
    }
  });
  await sleep(1000);
  
  await page.evaluate(() => {
    const items = document.querySelectorAll('[role="option"], [role="menuitem"], li, div, span, button');
    for (const item of items) {
      if (item.textContent.trim() === 'CNAME' && item.offsetParent) {
        item.click();
        return;
      }
    }
  });
  await sleep(1000);
  
  // Fill www name and target
  const visInputs2 = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('input'))
      .filter(i => i.offsetParent && i.type !== 'hidden' && i.type !== 'checkbox' && i.type !== 'radio')
      .map(i => ({ name: i.name, placeholder: i.placeholder, value: i.value }));
  });
  console.log('   Inputs: ' + JSON.stringify(visInputs2));
  
  // Same approach - find and fill
  const formInputs2 = visInputs2.filter(i => i.name !== 'term');
  if (formInputs2.length >= 2) {
    const nameI = visInputs2.indexOf(formInputs2[0]);
    const targetI = visInputs2.indexOf(formInputs2[1]);
    
    await page.evaluate((ni, ti, name, target) => {
      const inputs = Array.from(document.querySelectorAll('input'))
        .filter(i => i.offsetParent && i.type !== 'hidden' && i.type !== 'checkbox' && i.type !== 'radio');
      const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
      
      if (inputs[ni]) {
        inputs[ni].focus();
        setter.call(inputs[ni], name);
        inputs[ni].dispatchEvent(new Event('input', { bubbles: true }));
        inputs[ni].dispatchEvent(new Event('change', { bubbles: true }));
      }
      if (inputs[ti]) {
        inputs[ti].focus();
        setter.call(inputs[ti], target);
        inputs[ti].dispatchEvent(new Event('input', { bubbles: true }));
        inputs[ti].dispatchEvent(new Event('change', { bubbles: true }));
      }
    }, nameI, targetI, 'www', PAGES_URL);
    console.log('   www ve target yazildi');
  }
  
  await sleep(1000);
  
  // Save
  await page.evaluate(() => {
    const btns = document.querySelectorAll('button');
    for (const b of btns) {
      const t = b.textContent.trim().toLowerCase();
      if ((t === 'save' || t.includes('save')) && !b.disabled && b.offsetParent) {
        b.click();
        return;
      }
    }
  });
  console.log('   Save tiklandi');
  await sleep(3000);
  await ss(page, 'dns-06-www-saved');
  
  // Final check
  console.log('\n=== Son DNS kayitlari ===');
  await page.reload({ waitUntil: 'networkidle2' });
  await sleep(3000);
  const body = await page.evaluate(() => document.body.innerText);
  const cnameLines = body.split('\n').filter(l => l.includes('CNAME') || l.includes('pages.dev'));
  cnameLines.forEach(l => console.log('  ' + l.trim()));
  
  await ss(page, 'dns-07-final');
  browser.disconnect();
  console.log('\nBitti!');
})().catch(err => console.error('HATA:', err.message));
