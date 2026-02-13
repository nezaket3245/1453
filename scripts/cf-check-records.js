const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222', defaultViewport: null });
  const page = await browser.newPage();
  
  await page.goto('https://dash.cloudflare.com/2f8a9910120689f4f86f06fb6637f9b2/egepenakcayapi.com/dns/records', {
    waitUntil: 'networkidle2', timeout: 30000
  });
  await new Promise(r => setTimeout(r, 5000));
  
  // Get detailed record info from the table
  const records = await page.evaluate(() => {
    const rows = [];
    // Look for table/list with DNS records
    const cells = document.querySelectorAll('td, [role="cell"], [class*="cell"], [class*="row"]');
    let currentRow = [];
    
    cells.forEach(cell => {
      const text = cell.textContent.trim();
      if (text.length > 0 && text.length < 200) {
        currentRow.push(text);
      }
    });
    
    // Also try getting text from the record table directly
    const tableText = document.querySelector('[class*="records"], [class*="table"], table, [role="table"]');
    if (tableText) {
      return { tableText: tableText.textContent.substring(0, 2000) };
    }
    
    // Fallback: get all text
    const body = document.body.innerText;
    // Extract lines around CNAME or A records
    const lines = body.split('\n');
    const relevant = [];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line === 'CNAME' || line === 'A' || line === 'AAAA' || line === 'MX' || line === 'TXT' || 
          line.includes('pages.dev') || line.includes(DOMAIN) || 
          line.includes('Content') || line.includes('Type') || line.includes('Name')) {
        // Get surrounding lines for context
        const context = lines.slice(Math.max(0, i-2), i+3).map(l => l.trim()).filter(l => l.length > 0);
        relevant.push(context.join(' | '));
      }
    }
    return { relevant };
  });
  
  console.log('=== DNS Kayitlari Detayi ===');
  if (records.tableText) {
    console.log(records.tableText);
  } else if (records.relevant) {
    records.relevant.forEach(r => console.log('  ' + r));
  }
  
  // Get page text and find record details
  console.log('\n=== Tum Sayfa Metni (DNS ile ilgili) ===');
  const fullText = await page.evaluate(() => document.body.innerText);
  const lines = fullText.split('\n');
  let inRecordSection = false;
  for (const line of lines) {
    const t = line.trim();
    if (t.includes('DNS management') || t.includes('record') || t.includes('Content') || t.includes('Type')) {
      inRecordSection = true;
    }
    if (inRecordSection && t.length > 0 && t.length < 150) {
      console.log('  ' + t);
    }
    if (t.includes('Footer') || t.includes('Cloudflare, Inc')) {
      inRecordSection = false;
    }
  }
  
  browser.disconnect();
})().catch(err => console.error('HATA:', err.message));
