const puppeteer = require('puppeteer-core');

const ZONE_ID = 'eb9c646f745f401bf12f0722fe86b9bf';
const ACCOUNT_ID = '2f8a9910120689f4f86f06fb6637f9b2';
const DNS_URL = `https://dash.cloudflare.com/${ACCOUNT_ID}/${ZONE_ID}/dns/records`;
const TARGET = 'akcapen-yeni.pages.dev';

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function screenshot(page, name) {
  await page.screenshot({ path: `screenshots/${name}.png`, fullPage: false });
  console.log(`  📸 screenshots/${name}.png`);
}

async function main() {
  const browser = await puppeteer.connect({
    browserURL: 'http://127.0.0.1:9222',
    defaultViewport: null
  });

  const pages = await browser.pages();
  let page = pages.find(p => p.url().includes('cloudflare.com'));
  if (!page) {
    page = await browser.newPage();
  }

  console.log('=== DNS KAYITLARINI DÜZELTME ===\n');

  // Navigate to DNS records page
  await page.goto(DNS_URL, { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(3000);
  console.log('DNS sayfası yüklendi:', page.url());

  // STEP 1: Find and edit the root A record (egepenakcayapi.com -> 185.216.114.15)
  // We need to delete it and add a CNAME instead
  console.log('\n--- ADIM 1: Root A kaydını silme ---');
  
  // Find all table rows with DNS records
  const rows = await page.$$('tr, [role="row"]');
  console.log(`Toplam satır: ${rows.length}`);
  
  // Find the row that contains the root domain A record
  let rootEditBtn = null;
  for (const row of rows) {
    const text = await row.evaluate(el => el.textContent);
    // Look for the A record with the root domain name
    if (text.includes('185.216.114.15') && text.includes('egepenakcayapi.com') && !text.includes('autoconfig') && !text.includes('autodiscover') && !text.includes('cpanel') && !text.includes('ftp') && !text.includes('webdisk') && !text.includes('webmail') && !text.includes('whm') && !text.includes('cpcontacts') && !text.includes('cpcalendars') && !text.includes('panel')) {
      // Check if this is the root record (name is the domain itself, not a subdomain)
      const name = await row.evaluate(el => {
        const cells = el.querySelectorAll('td, [role="cell"]');
        if (cells.length >= 2) return cells[1]?.textContent?.trim();
        return '';
      });
      console.log(`  Bulunan satır name: "${name}"`);
      if (name === 'egepenakcayapi.com' || name === '@') {
        // Find Edit button in this row
        rootEditBtn = await row.$('button');
        if (rootEditBtn) {
          const btnText = await rootEditBtn.evaluate(el => el.textContent);
          console.log(`  Root A kaydı bulundu! Edit butonu: "${btnText}"`);
        }
        break;
      }
    }
  }

  // Alternative approach: find all Edit buttons and match by position
  if (!rootEditBtn) {
    console.log('  Alternatif yöntem: Edit butonlarını arıyorum...');
    const editBtns = await page.$$('button');
    const editBtnInfos = [];
    for (const btn of editBtns) {
      const text = await btn.evaluate(el => el.textContent?.trim());
      if (text === 'Edit') {
        const rect = await btn.evaluate(el => {
          const r = el.getBoundingClientRect();
          return { x: r.x, y: r.y, w: r.width, h: r.height };
        });
        editBtnInfos.push({ btn, text, ...rect });
      }
    }
    console.log(`  ${editBtnInfos.length} Edit butonu bulundu`);
    
    // The 6th Edit button should be for egepenakcayapi.com (after autoconfig, autodiscover, cpanel, cpcalendars, cpcontacts)
    // Index 0=autoconfig, 1=autodiscover, 2=cpanel, 3=cpcalendars, 4=cpcontacts, 5=egepenakcayapi.com
    if (editBtnInfos.length >= 6) {
      rootEditBtn = editBtnInfos[5].btn;
      console.log(`  6. Edit butonunu kullanıyorum (y=${editBtnInfos[5].y})`);
    }
  }

  if (!rootEditBtn) {
    console.log('  ❌ Root A kaydı için Edit butonu bulunamadı!');
    await screenshot(page, 'fix-dns-no-root-edit');
    
    // Try to just delete via the page - let's first try clicking any Edit to see the form
    console.log('  Tüm butonları listeliyorum...');
    const allBtns = await page.$$('button');
    for (let i = 0; i < Math.min(allBtns.length, 30); i++) {
      const info = await allBtns[i].evaluate(el => ({
        text: el.textContent?.trim().substring(0, 50),
        class: el.className?.substring(0, 50),
        y: el.getBoundingClientRect().y
      }));
      console.log(`    [${i}] "${info.text}" class="${info.class}" y=${Math.round(info.y)}`);
    }
    return;
  }

  // Click the Edit button for the root A record
  await rootEditBtn.click();
  await sleep(2000);
  await screenshot(page, 'fix-dns-root-edit-opened');
  console.log('  Root A kaydı edit formu açıldı');

  // Now we need to delete this record
  // Look for a Delete button in the edit form
  const deleteBtn = await page.evaluateHandle(() => {
    const buttons = document.querySelectorAll('button');
    for (const btn of buttons) {
      if (btn.textContent.trim() === 'Delete' || btn.textContent.trim() === 'Sil') {
        return btn;
      }
    }
    return null;
  });

  if (deleteBtn && deleteBtn.asElement()) {
    console.log('  Delete butonu bulundu, tıklanıyor...');
    await deleteBtn.asElement().click();
    await sleep(2000);
    
    // There might be a confirmation dialog
    const confirmBtn = await page.evaluateHandle(() => {
      const buttons = document.querySelectorAll('button');
      for (const btn of buttons) {
        const text = btn.textContent.trim();
        if (text === 'Delete' || text === 'Confirm' || text === 'Onayla') {
          // Skip the first Delete button (which we already clicked)
          if (btn.getBoundingClientRect().y > 0) return btn;
        }
      }
      return null;
    });
    
    if (confirmBtn && confirmBtn.asElement()) {
      console.log('  Onay butonu tıklanıyor...');
      await confirmBtn.asElement().click();
      await sleep(3000);
    }
    
    await screenshot(page, 'fix-dns-root-deleted');
    console.log('  ✅ Root A kaydı silindi');
  } else {
    console.log('  ⚠️ Delete butonu bulunamadı, form içeriğini kontrol ediyorum...');
    // Maybe we can change the type instead
    const formContent = await page.evaluate(() => {
      const inputs = document.querySelectorAll('input, select, [role="combobox"]');
      return Array.from(inputs).map(el => ({
        tag: el.tagName,
        type: el.type,
        name: el.name,
        id: el.id,
        value: el.value,
        role: el.getAttribute('role'),
        y: Math.round(el.getBoundingClientRect().y)
      }));
    });
    console.log('  Form elemanları:', JSON.stringify(formContent, null, 2));
  }

  // STEP 2: Add CNAME record for root domain
  console.log('\n--- ADIM 2: Root CNAME kaydı ekleme ---');
  await sleep(2000);

  // Click "Add record" button
  const addRecordBtn = await page.evaluateHandle(() => {
    const buttons = document.querySelectorAll('button');
    for (const btn of buttons) {
      if (btn.textContent.trim() === 'Add record') return btn;
    }
    return null;
  });

  if (addRecordBtn && addRecordBtn.asElement()) {
    await addRecordBtn.asElement().click();
    await sleep(2000);
    console.log('  "Add record" tıklandı');
    await screenshot(page, 'fix-dns-add-record');
  } else {
    console.log('  ❌ "Add record" butonu bulunamadı');
    return;
  }

  // The form should now be visible at the top of the records list
  // Change type to CNAME
  // First, find the type selector (it's a react-select)
  const typeCombo = await page.$('[id*="react-select"][role="combobox"]');
  if (typeCombo) {
    await typeCombo.click();
    await sleep(500);
    await typeCombo.type('CNAME');
    await sleep(500);
    await page.keyboard.press('Enter');
    await sleep(1000);
    console.log('  Tip CNAME olarak seçildi');
  } else {
    console.log('  ⚠️ Type combobox bulunamadı, Tab ile deneyecem...');
    // Try clicking the form area and using keyboard
    await page.keyboard.press('Tab');
    await sleep(300);
  }

  await screenshot(page, 'fix-dns-type-selected');

  // Now fill the Name field - press Tab to move to it
  await page.keyboard.press('Tab');
  await sleep(300);
  // Type @ for root domain
  await page.keyboard.type('@');
  await sleep(500);
  console.log('  Name: @ yazıldı');

  // Tab to Target field
  await page.keyboard.press('Tab');
  await sleep(300);
  await page.keyboard.type(TARGET);
  await sleep(500);
  console.log(`  Target: ${TARGET} yazıldı`);

  await screenshot(page, 'fix-dns-root-cname-filled');

  // Tab past TTL to Save button, or find Save button
  await page.keyboard.press('Tab'); // Skip TTL
  await sleep(200);
  await page.keyboard.press('Tab'); // Skip proxy toggle
  await sleep(200);
  
  // Click Save
  const saveBtn = await page.evaluateHandle(() => {
    const buttons = document.querySelectorAll('button');
    for (const btn of buttons) {
      if (btn.textContent.trim() === 'Save') return btn;
    }
    return null;
  });

  if (saveBtn && saveBtn.asElement()) {
    await saveBtn.asElement().click();
    await sleep(3000);
    console.log('  Save tıklandı');
    await screenshot(page, 'fix-dns-root-cname-saved');
  } else {
    console.log('  ⚠️ Save butonu bulunamadı, Enter deneyelim...');
    await page.keyboard.press('Enter');
    await sleep(3000);
    await screenshot(page, 'fix-dns-root-cname-enter');
  }

  // STEP 3: Edit www CNAME record
  console.log('\n--- ADIM 3: www CNAME kaydını düzenleme ---');
  await sleep(2000);

  // Reload page to see fresh records
  await page.reload({ waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(3000);

  // Find the www CNAME Edit button
  const editBtns2 = await page.$$('button');
  let wwwEditBtn = null;
  
  // Find all rows first, then look for www CNAME
  const allRows2 = await page.evaluate(() => {
    const rows = document.querySelectorAll('tr, [role="row"]');
    return Array.from(rows).map((row, i) => ({
      i,
      text: row.textContent?.substring(0, 200)
    }));
  });
  
  let wwwRowIdx = -1;
  for (const row of allRows2) {
    if (row.text.includes('CNAME') && row.text.includes('www')) {
      wwwRowIdx = row.i;
      console.log(`  www CNAME kaydı ${wwwRowIdx}. satırda bulundu`);
      break;
    }
  }

  if (wwwRowIdx >= 0) {
    const rowElements = await page.$$('tr, [role="row"]');
    if (rowElements[wwwRowIdx]) {
      const editBtn = await rowElements[wwwRowIdx].$('button');
      if (editBtn) {
        const btnText = await editBtn.evaluate(el => el.textContent?.trim());
        console.log(`  www Edit butonu: "${btnText}"`);
        await editBtn.click();
        await sleep(2000);
        await screenshot(page, 'fix-dns-www-edit-opened');
        
        // Find the content/target input field and change it
        // In edit mode, there should be an input with the current value egepenakcayapi.com
        const targetInput = await page.evaluateHandle(() => {
          const inputs = document.querySelectorAll('input[type="text"], input:not([type])');
          for (const input of inputs) {
            if (input.value === 'egepenakcayapi.com' || input.name === 'content' || input.name === 'target') {
              return input;
            }
          }
          // Try finding by name attribute
          const namedInput = document.querySelector('input[name="content"], input[name="target"], input[name="ipv4_address"]');
          if (namedInput) return namedInput;
          return null;
        });

        if (targetInput && targetInput.asElement()) {
          // Clear and type new target
          await targetInput.asElement().click({ clickCount: 3 });
          await sleep(200);
          await page.keyboard.type(TARGET);
          await sleep(500);
          console.log(`  www hedefi değiştirildi: ${TARGET}`);
          await screenshot(page, 'fix-dns-www-target-changed');

          // Click Save
          const saveBtn2 = await page.evaluateHandle(() => {
            const buttons = document.querySelectorAll('button');
            for (const btn of buttons) {
              if (btn.textContent.trim() === 'Save') return btn;
            }
            return null;
          });

          if (saveBtn2 && saveBtn2.asElement()) {
            await saveBtn2.asElement().click();
            await sleep(3000);
            console.log('  ✅ www CNAME kaydı güncellendi');
            await screenshot(page, 'fix-dns-www-saved');
          }
        } else {
          console.log('  ⚠️ Target input bulunamadı, formu kontrol edeyim...');
          const fc = await page.evaluate(() => {
            const inputs = document.querySelectorAll('input');
            return Array.from(inputs).map(i => ({
              name: i.name, id: i.id, value: i.value, type: i.type,
              y: Math.round(i.getBoundingClientRect().y)
            }));
          });
          console.log('  Inputs:', JSON.stringify(fc, null, 2));
        }
      }
    }
  } else {
    console.log('  ❌ www CNAME kaydı bulunamadı');
  }

  // Final check
  console.log('\n--- SON KONTROL ---');
  await page.reload({ waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(3000);
  
  const finalRecords = await page.evaluate(() => {
    const text = document.body.innerText;
    const lines = text.split('\n');
    const relevant = lines.filter(l => 
      l.includes('CNAME') || l.includes('pages.dev') || l.includes('egepenakcayapi.com')
    );
    return relevant.join('\n');
  });
  console.log('İlgili kayıtlar:\n', finalRecords);
  await screenshot(page, 'fix-dns-final');

  console.log('\n=== TAMAMLANDI ===');
}

main().catch(err => {
  console.error('HATA:', err.message);
});
