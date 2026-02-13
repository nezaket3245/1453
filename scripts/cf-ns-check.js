const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222', defaultViewport: null });
  
  // Find the nameserver-directions tab
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
  
  // Get full page text
  const text = await page.evaluate(() => document.body.innerText);
  
  // Find the nameserver section
  const lines = text.split('\n').filter(l => l.trim().length > 0);
  console.log('\n=== Sayfa metni (nameserver ile ilgili satirlar) ===');
  for (const line of lines) {
    if (line.toLowerCase().includes('nameserver') || 
        line.toLowerCase().includes('ns.cloudflare') || 
        line.toLowerCase().includes('check') || 
        line.toLowerCase().includes('done') ||
        line.toLowerCase().includes('finish') ||
        line.toLowerCase().includes('continue') ||
        line.toLowerCase().includes('activation') ||
        line.toLowerCase().includes('change') ||
        line.toLowerCase().includes('update') ||
        line.toLowerCase().includes('skip') ||
        line.toLowerCase().includes('later')) {
      console.log('  >> ' + line.substring(0, 100));
    }
  }
  
  // List ALL interactive elements
  console.log('\n=== Tum butonlar ve linkler ===');
  const elements = await page.evaluate(() => {
    const results = [];
    document.querySelectorAll('button, a, [role="button"]').forEach((el, i) => {
      const rect = el.getBoundingClientRect();
      const t = el.textContent.trim();
      if (t.length > 0 && t.length < 100) {
        results.push({
          i,
          tag: el.tagName,
          text: t.substring(0, 80),
          visible: rect.width > 0 && rect.height > 0,
          y: Math.round(rect.y),
          disabled: el.disabled || false
        });
      }
    });
    return results;
  });
  
  elements.forEach(e => {
    if (e.visible) {
      console.log(`  [${e.i}] <${e.tag}> y=${e.y} "${e.text}" ${e.disabled ? '[DISABLED]' : ''}`);
    }
  });
  
  // Scroll down to find buttons below viewport
  console.log('\n=== Sayfa asagi kaydirilıyor ===');
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise(r => setTimeout(r, 2000));
  
  const afterScroll = await page.evaluate(() => {
    const results = [];
    document.querySelectorAll('button, a, [role="button"]').forEach((el, i) => {
      const rect = el.getBoundingClientRect();
      const t = el.textContent.trim();
      if (t.length > 0 && t.length < 100 && rect.width > 0 && rect.height > 0) {
        results.push({
          i, text: t.substring(0, 80), y: Math.round(rect.y), disabled: el.disabled
        });
      }
    });
    return results;
  });
  
  console.log('Scroll sonrasi butonlar:');
  afterScroll.forEach(e => {
    console.log(`  [${e.i}] y=${e.y} "${e.text}" ${e.disabled ? '[DISABLED]' : ''}`);
  });
  
  // Try to click any "Done" / "Check" / "Continue" button
  const clicked = await page.evaluate(() => {
    const btns = document.querySelectorAll('button, a[role="button"]');
    for (const b of btns) {
      const t = b.textContent.trim().toLowerCase();
      if (t.includes('done') || t.includes('check nameserver') || t.includes('continue to') ||
          t.includes('finish') || t.includes('go to overview') || t.includes('dashboard')) {
        b.scrollIntoView({ block: 'center' });
        b.click();
        return b.textContent.trim();
      }
    }
    return null;
  });
  console.log('\nTiklanan: ' + (clicked || 'hicbiri'));
  
  if (clicked) {
    await new Promise(r => setTimeout(r, 5000));
    console.log('Yeni URL: ' + page.url());
  }
  
  browser.disconnect();
  console.log('\nBitti!');
})().catch(err => console.error('HATA:', err.message));
