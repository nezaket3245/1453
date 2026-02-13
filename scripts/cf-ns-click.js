const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222', defaultViewport: null });
  
  const pages = await browser.pages();
  let page = pages.find(p => p.url().includes('nameserver-directions'));
  
  if (!page) {
    page = await browser.newPage();
    await page.goto('https://dash.cloudflare.com/2f8a9910120689f4f86f06fb6637f9b2/egepenakcayapi.com/nameserver-directions', {
      waitUntil: 'networkidle2', timeout: 30000
    });
    await new Promise(r => setTimeout(r, 5000));
  }
  
  console.log('URL: ' + page.url());
  
  // Scroll down and click "I updated my nameservers"
  console.log('1. "I updated my nameservers" butonuna tiklaniyor...');
  const clicked = await page.evaluate(() => {
    const btns = document.querySelectorAll('button');
    for (const b of btns) {
      if (b.textContent.trim() === 'I updated my nameservers' && !b.disabled) {
        b.scrollIntoView({ block: 'center' });
        b.click();
        return true;
      }
    }
    return false;
  });
  console.log('   Tiklandi: ' + clicked);
  
  await new Promise(r => setTimeout(r, 3000));
  
  // Check for dialog/modal with Confirm button
  console.log('\n2. Dialog/Confirm kontrol ediliyor...');
  const confirmBtn = await page.evaluate(() => {
    const btns = document.querySelectorAll('button');
    for (const b of btns) {
      const t = b.textContent.trim();
      if ((t === 'Confirm' || t.includes('Done') || t.includes('Check')) && !b.disabled) {
        return { text: t, disabled: b.disabled };
      }
    }
    // Also check for disabled confirm
    for (const b of btns) {
      const t = b.textContent.trim();
      if (t === 'Confirm') {
        return { text: t, disabled: b.disabled };
      }
    }
    return null;
  });
  
  if (confirmBtn) {
    console.log('   Confirm butonu: ' + confirmBtn.text + ' (disabled: ' + confirmBtn.disabled + ')');
    
    if (!confirmBtn.disabled) {
      console.log('   Confirm tiklaniyor...');
      await page.evaluate(() => {
        const btns = document.querySelectorAll('button');
        for (const b of btns) {
          if (b.textContent.trim() === 'Confirm' && !b.disabled) {
            b.click();
            return true;
          }
        }
        return false;
      });
    } else {
      console.log('   Confirm disabled. Checkbox var mi kontrol ediliyor...');
      // Check for any checkbox  
      const checkboxes = await page.evaluate(() => {
        const inputs = document.querySelectorAll('input[type="checkbox"], [role="checkbox"]');
        return Array.from(inputs).map(i => ({
          checked: i.checked,
          visible: i.offsetParent !== null,
          id: i.id,
          name: i.name,
          label: i.parentElement?.textContent?.trim().substring(0, 80) || ''
        }));
      });
      console.log('   Checkbox\'lar:', JSON.stringify(checkboxes));
      
      // Click any unchecked checkbox
      if (checkboxes.length > 0) {
        const clickedCb = await page.evaluate(() => {
          const cbs = document.querySelectorAll('input[type="checkbox"], [role="checkbox"]');
          for (const cb of cbs) {
            if (!cb.checked) {
              cb.click();
              return true;
            }
          }
          return false;
        });
        console.log('   Checkbox tiklandi: ' + clickedCb);
        await new Promise(r => setTimeout(r, 1000));
        
        // Now try confirm again
        const confirmNow = await page.evaluate(() => {
          const btns = document.querySelectorAll('button');
          for (const b of btns) {
            if (b.textContent.trim() === 'Confirm' && !b.disabled) {
              b.click();
              return true;
            }
          }
          return false;
        });
        console.log('   Confirm (2nd try): ' + confirmNow);
      }
    }
  } else {
    console.log('   Confirm butonu bulunamadi');
  }
  
  await new Promise(r => setTimeout(r, 5000));
  
  const url = page.url();
  console.log('\n3. Final URL: ' + url);
  
  // Check page state
  const body = await page.evaluate(() => document.body.innerText.substring(0, 500));
  console.log('   Sayfa: ' + body.replace(/\n/g, ' | ').substring(0, 300));
  
  // Screenshot
  const path = require('path');
  const fs = require('fs');
  const dir = path.join(__dirname, '..', 'screenshots');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  await page.screenshot({ path: path.join(dir, 'ns-final.png') });
  
  browser.disconnect();
  console.log('\nBitti!');
})().catch(err => console.error('HATA:', err.message));
