const { spawn, execSync } = require('child_process');
const puppeteer = require('puppeteer-core');
const path = require('path');
const fs = require('fs');
const net = require('net');

const DOMAIN = 'egepenakcayapi.com';
const PAGES_URL = 'egepenakcayap--com2.pages.dev';
const ACCT = '1fb4ac9a140c6e18cf7c8d3c5854aaa9';
const ZONE_ID = 'c584fe27d80aaa8a9237ca2fb857cd9c';
const CHROME = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const DEBUG_PORT = 9222;

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function ss(page, name) {
  const dir = path.join(__dirname, '..', 'screenshots');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  try { await page.screenshot({ path: path.join(dir, `${name}.png`) }); console.log(`  [SS] ${name}.png`); } catch (e) { console.log(`  [SS FAIL] ${e.message}`); }
}

function isPortOpen(port) {
  return new Promise((resolve) => {
    const s = new net.Socket();
    s.setTimeout(2000);
    s.on('connect', () => { s.destroy(); resolve(true); });
    s.on('timeout', () => { s.destroy(); resolve(false); });
    s.on('error', () => { s.destroy(); resolve(false); });
    s.connect(port, '127.0.0.1');
  });
}

async function launchChrome() {
  // Get default user data dir
  const userDataDir = path.join(process.env.LOCALAPPDATA, 'Google', 'Chrome', 'User Data');
  const hasProfile = fs.existsSync(userDataDir);
  
  console.log(`User profile: ${hasProfile ? 'found' : 'not found'} at ${userDataDir}`);
  
  const args = [
    `--remote-debugging-port=${DEBUG_PORT}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-background-mode',
    '--disable-extensions-except=',
    '--disable-component-extensions-with-background-pages',
  ];
  
  // If profile exists, use it for session cookies
  if (hasProfile) {
    args.push(`--user-data-dir=${userDataDir}`);
  }
  
  args.push(`https://dash.cloudflare.com/${ACCT}/${DOMAIN}/dns/records`);
  
  console.log('Starting Chrome...');
  console.log(`Command: "${CHROME}" ${args.join(' ')}`);
  
  const proc = spawn(CHROME, args, {
    detached: true,
    stdio: ['ignore', 'pipe', 'pipe'],
    windowsHide: false,
  });
  
  // Log stderr for debugging
  proc.stderr.on('data', d => {
    const str = d.toString().trim();
    if (str && !str.includes('DevTools') && !str.includes('Written to')) {
      console.log('  [Chrome stderr]', str.substring(0, 200));
    }
  });
  
  proc.on('error', e => console.error('Chrome launch error:', e.message));
  proc.unref();
  
  // Wait for port
  console.log('Waiting for debug port...');
  for (let i = 0; i < 30; i++) {
    await sleep(1000);
    const open = await isPortOpen(DEBUG_PORT);
    if (open) {
      console.log(`Debug port ready after ${i+1}s`);
      return true;
    }
    if (i % 5 === 4) console.log(`  Still waiting... (${i+1}s)`);
  }
  
  return false;
}

async function main() {
  // Ensure Chrome is not running
  try { execSync('taskkill /f /im chrome.exe', { stdio: 'pipe' }); } catch {}
  await sleep(4000);
  
  // Verify Chrome is dead
  try {
    const procs = execSync('tasklist /fi "IMAGENAME eq chrome.exe" /nh', { encoding: 'utf-8' });
    if (procs.includes('chrome.exe')) {
      console.log('Warning: Chrome still running, waiting more...');
      await sleep(5000);
      try { execSync('taskkill /f /im chrome.exe', { stdio: 'pipe' }); } catch {}
      await sleep(3000);
    }
  } catch {}
  
  const ready = await launchChrome();
  
  if (!ready) {
    console.error('\n❌ Chrome debug port not available after 30 seconds.');
    console.error('Chrome may be blocked from using debug port.');
    console.error('\nManual DNS records to add at Cloudflare Dashboard:');
    console.error(`  CNAME @ -> ${PAGES_URL} (Proxied)`);
    console.error(`  CNAME www -> ${PAGES_URL} (Proxied)`);
    process.exit(1);
  }
  
  // Connect Puppeteer
  console.log('\nConnecting Puppeteer...');
  const browser = await puppeteer.connect({ browserURL: `http://127.0.0.1:${DEBUG_PORT}`, defaultViewport: null });
  
  const allPages = await browser.pages();
  console.log(`Found ${allPages.length} pages`);
  
  let page = allPages.find(p => p.url().includes('cloudflare')) || allPages[0];
  console.log('Using page:', page.url());
  
  // Wait for page to fully load
  await sleep(8000);
  console.log('Current URL:', page.url());
  await ss(page, '01-initial');
  
  // Check if logged in
  if (page.url().includes('login') || page.url().includes('sign-in')) {
    console.log('\n⚠️  Not logged in to Cloudflare! Please log in manually in the Chrome window...');
    console.log('Waiting up to 120 seconds for login...');
    
    for (let i = 0; i < 60; i++) {
      await sleep(2000);
      if (!page.url().includes('login') && !page.url().includes('sign-in')) {
        console.log('Login detected!');
        break;
      }
      if (i % 10 === 9) console.log(`  Still waiting for login... (${(i+1)*2}s)`);
    }
    
    if (page.url().includes('login')) {
      console.error('Login timeout. Please log in and run the script again.');
      process.exit(1);
    }
    
    // Navigate to DNS page after login
    await page.goto(`https://dash.cloudflare.com/${ACCT}/${DOMAIN}/dns/records`, {
      waitUntil: 'networkidle2', timeout: 30000
    });
    await sleep(5000);
  }
  
  console.log('\nPage loaded:', page.url());
  await ss(page, '02-dns-page');
  
  // Use the page's fetch context (with session cookies) to call CF API directly
  console.log('\n=== Adding DNS Records via Dashboard API ===');
  
  const result = await page.evaluate(async (zoneId, domain, pagesUrl) => {
    const log = [];
    
    try {
      // List existing records
      const listRes = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`, {
        credentials: 'include',
        headers: { 'Accept': 'application/json' }
      });
      const listData = await listRes.json();
      
      if (!listData.success) {
        log.push('ERROR: Cannot list DNS records: ' + JSON.stringify(listData.errors));
        return log;
      }
      
      log.push(`Found ${listData.result.length} existing records`);
      listData.result.forEach(r => log.push(`  ${r.type} ${r.name} -> ${r.content}`));
      
      // Add root CNAME
      const rootExists = listData.result.find(r => r.name === domain && r.type === 'CNAME');
      if (!rootExists) {
        log.push('\nAdding root CNAME...');
        const addRes = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({ type: 'CNAME', name: '@', content: pagesUrl, proxied: true, ttl: 1 })
        });
        const addData = await addRes.json();
        log.push(addData.success ? '✅ Root CNAME added!' : '❌ Failed: ' + JSON.stringify(addData.errors));
      } else {
        log.push('\n✅ Root CNAME already exists: ' + rootExists.content);
      }
      
      // Add www CNAME  
      const wwwExists = listData.result.find(r => r.name === `www.${domain}` && r.type === 'CNAME');
      if (!wwwExists) {
        log.push('\nAdding www CNAME...');
        const addRes = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({ type: 'CNAME', name: 'www', content: pagesUrl, proxied: true, ttl: 1 })
        });
        const addData = await addRes.json();
        log.push(addData.success ? '✅ WWW CNAME added!' : '❌ Failed: ' + JSON.stringify(addData.errors));
      } else {
        log.push('\n✅ WWW CNAME already exists: ' + wwwExists.content);
      }
      
    } catch (e) {
      log.push('ERROR: ' + e.message);
    }
    
    return log;
  }, ZONE_ID, DOMAIN, PAGES_URL);
  
  console.log('\nResults:');
  result.forEach(r => console.log(r));
  
  await ss(page, '03-after-dns');
  
  // Verify
  console.log('\n=== Verification ===');
  const verifyResult = await page.evaluate(async (zoneId) => {
    const res = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`, {
      credentials: 'include',
      headers: { 'Accept': 'application/json' }
    });
    const data = await res.json();
    if (data.success) {
      return data.result.map(r => `${r.type} ${r.name} -> ${r.content} (proxied: ${r.proxied})`);
    }
    return ['Failed to verify'];
  }, ZONE_ID);
  
  verifyResult.forEach(r => console.log('  ' + r));
  
  console.log('\n✅ Done! DNS records should propagate within minutes.');
  console.log(`Check: https://${DOMAIN}`);
  
  await browser.disconnect();
}

main().catch(e => {
  console.error('Fatal:', e.message);
  process.exit(1);
});
