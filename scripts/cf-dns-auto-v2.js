const puppeteer = require('puppeteer-core');
const { execSync, spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const DOMAIN = 'egepenakcayapi.com';
const PAGES_URL = 'egepenakcayap--com2.pages.dev';
const ACCT = '1fb4ac9a140c6e18cf7c8d3c5854aaa9';

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function ss(page, name) {
  const dir = path.join(__dirname, '..', 'screenshots');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  try { await page.screenshot({ path: path.join(dir, `${name}.png`) }); } catch {}
}

async function main() {
  // Find Chrome
  const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
  if (!fs.existsSync(chromePath)) {
    console.error('Chrome not found at:', chromePath);
    process.exit(1);
  }

  // Kill existing Chrome
  try { execSync('taskkill /f /im chrome.exe', { stdio: 'pipe' }); } catch {}
  await sleep(3000);

  // Launch Chrome with debug port
  console.log('Launching Chrome with debug port...');
  const chromeProc = spawn(chromePath, [
    '--remote-debugging-port=9222',
    '--no-first-run',
    '--no-default-browser-check',
    'about:blank'
  ], { detached: true, stdio: 'ignore' });
  chromeProc.unref();

  // Wait for Chrome to start
  let connected = false;
  for (let i = 0; i < 15; i++) {
    await sleep(1000);
    try {
      const resp = await fetch('http://127.0.0.1:9222/json/version');
      if (resp.ok) { connected = true; break; }
    } catch {}
  }

  if (!connected) {
    console.error('Could not connect to Chrome debug port after 15 seconds');
    process.exit(1);
  }
  console.log('Chrome debug port is active!');

  // Connect with Puppeteer
  const browser = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222', defaultViewport: null });
  const pages = await browser.pages();
  const page = pages[0] || await browser.newPage();

  // Navigate to Cloudflare login
  console.log('Navigating to Cloudflare...');
  await page.goto('https://dash.cloudflare.com/login', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(3000);

  const currentUrl = page.url();
  console.log('Current URL:', currentUrl);

  if (currentUrl.includes('login') || currentUrl.includes('sign-in')) {
    console.log('\nCloudflare login required. Opening with default Chrome profile instead...');
    
    // Close this instance and try with default profile
    await browser.disconnect();
    try { execSync('taskkill /f /im chrome.exe', { stdio: 'pipe' }); } catch {}
    await sleep(3000);

    // Relaunch with the user's default profile
    const defaultProfile = path.join(process.env.LOCALAPPDATA, 'Google', 'Chrome', 'User Data');
    console.log('Using profile:', defaultProfile);
    
    const chromeProc2 = spawn(chromePath, [
      '--remote-debugging-port=9222',
      `--user-data-dir=${defaultProfile}`,
      '--no-first-run',
      '--no-default-browser-check',
      `https://dash.cloudflare.com/${ACCT}/${DOMAIN}/dns/records`
    ], { detached: true, stdio: 'ignore' });
    chromeProc2.unref();

    // Wait for Chrome to start
    let connected2 = false;
    for (let i = 0; i < 20; i++) {
      await sleep(1000);
      try {
        const resp = await fetch('http://127.0.0.1:9222/json/version');
        if (resp.ok) { connected2 = true; break; }
      } catch {}
    }

    if (!connected2) {
      console.log('Cannot connect with default profile. Trying alternative approach...');
      // Try without --user-data-dir and with profile-directory instead
      try { execSync('taskkill /f /im chrome.exe', { stdio: 'pipe' }); } catch {}
      await sleep(3000);
      
      const chromeProc3 = spawn(chromePath, [
        '--remote-debugging-port=9222',
        `https://dash.cloudflare.com/${ACCT}/${DOMAIN}/dns/records`
      ], { detached: true, stdio: 'ignore' });
      chromeProc3.unref();

      for (let i = 0; i < 20; i++) {
        await sleep(1000);
        try {
          const resp = await fetch('http://127.0.0.1:9222/json/version');
          if (resp.ok) { connected2 = true; break; }
        } catch {}
      }
      
      if (!connected2) {
        console.error('Still cannot connect to Chrome.');
        console.log('\n=== MANUAL STEPS REQUIRED ===');
        console.log('Please add these DNS records in Cloudflare Dashboard:');
        console.log('1. CNAME @ -> ' + PAGES_URL + ' (Proxied)');
        console.log('2. CNAME www -> ' + PAGES_URL + ' (Proxied)');
        process.exit(1);
      }
    }

    const browser2 = await puppeteer.connect({ browserURL: 'http://127.0.0.1:9222', defaultViewport: null });
    const pages2 = await browser2.pages();
    const page2 = pages2.find(p => p.url().includes('cloudflare')) || pages2[0];
    
    // Wait for page to load fully
    console.log('Waiting for page to load...');
    await sleep(8000);
    console.log('Current URL:', page2.url());
    await ss(page2, 'dns-page');
    
    if (page2.url().includes('dns')) {
      await addDNSRecords(page2);
    } else {
      console.log('Not on DNS page. Navigating...');
      await page2.goto(`https://dash.cloudflare.com/${ACCT}/${DOMAIN}/dns/records`, {
        waitUntil: 'networkidle2', timeout: 30000
      });
      await sleep(5000);
      await ss(page2, 'dns-page-2');
      await addDNSRecords(page2);
    }
    
    await browser2.disconnect();
  } else {
    // Already logged in
    await page.goto(`https://dash.cloudflare.com/${ACCT}/${DOMAIN}/dns/records`, {
      waitUntil: 'networkidle2', timeout: 30000
    });
    await sleep(5000);
    await addDNSRecords(page);
    await browser.disconnect();
  }

  console.log('\nDone! Chrome is still open for verification.');
}

async function addDNSRecords(page) {
  console.log('\n=== Adding DNS Records ===');
  await ss(page, 'before-add');

  // Use Cloudflare Dashboard API directly through the page context
  // This is more reliable than clicking UI elements
  const result = await page.evaluate(async (domain, pagesUrl) => {
    const results = [];
    
    // Get CSRF token and session cookies (already available in the page context)
    try {
      // First, check existing records
      const listRes = await fetch(`/api/v4/zones?name=${domain}`, {
        credentials: 'include'
      });
      const listData = await listRes.json();
      
      if (!listData.success || !listData.result || listData.result.length === 0) {
        results.push('Zone not found');
        return results;
      }
      
      const zoneId = listData.result[0].id;
      results.push('Zone ID: ' + zoneId);
      
      // List existing DNS records
      const recordsRes = await fetch(`/api/v4/zones/${zoneId}/dns_records`, {
        credentials: 'include'
      });
      const recordsData = await recordsRes.json();
      
      if (recordsData.success) {
        results.push('Existing records: ' + recordsData.result.length);
        for (const r of recordsData.result) {
          results.push(`  ${r.type} ${r.name} -> ${r.content}`);
        }
      }
      
      // Check if root CNAME exists
      const rootExists = recordsData.result?.find(r => r.name === domain && r.type === 'CNAME');
      const wwwExists = recordsData.result?.find(r => r.name === 'www.' + domain && r.type === 'CNAME');
      
      // Add root CNAME if not exists
      if (!rootExists) {
        const addRoot = await fetch(`/api/v4/zones/${zoneId}/dns_records`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ type: 'CNAME', name: '@', content: pagesUrl, proxied: true })
        });
        const rootResult = await addRoot.json();
        results.push('Root CNAME: ' + (rootResult.success ? 'SUCCESS' : 'FAILED: ' + JSON.stringify(rootResult.errors)));
      } else {
        results.push('Root CNAME already exists');
      }
      
      // Add www CNAME if not exists
      if (!wwwExists) {
        const addWww = await fetch(`/api/v4/zones/${zoneId}/dns_records`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ type: 'CNAME', name: 'www', content: pagesUrl, proxied: true })
        });
        const wwwResult = await addWww.json();
        results.push('WWW CNAME: ' + (wwwResult.success ? 'SUCCESS' : 'FAILED: ' + JSON.stringify(wwwResult.errors)));
      } else {
        results.push('WWW CNAME already exists');
      }
      
    } catch (e) {
      results.push('Error: ' + e.message);
    }
    
    return results;
  }, DOMAIN, PAGES_URL);

  console.log('Results:');
  result.forEach(r => console.log('  ' + r));
  
  await ss(page, 'after-add');
}

main().catch(e => {
  console.error('Fatal error:', e);
  process.exit(1);
});
