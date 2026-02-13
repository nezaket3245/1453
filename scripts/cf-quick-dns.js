const fs = require('fs');
const https = require('https');
const path = require('path');
const { execSync } = require('child_process');

const ZONE_ID = 'eb9c646f745f401bf12f0722fe86b9bf';
const DOMAIN = 'egepenakcayapi.com';
const PAGES_DOMAIN = 'akcapen-yeni.pages.dev';
const LOG_FILE = path.join(__dirname, '..', 'dns-result.log');

const log = [];
function L(msg) { log.push(msg); console.log(msg); }

// Refresh wrangler token first
try { execSync('npx wrangler pages project list', { stdio: 'pipe', timeout: 20000 }); } catch {}

const configPath = path.join(process.env.APPDATA, 'xdg.config', '.wrangler', 'config', 'default.toml');
const config = fs.readFileSync(configPath, 'utf-8');
const tokenMatch = config.match(/oauth_token\s*=\s*"([^"]+)"/);
if (!tokenMatch) { L('ERROR: No token found'); process.exit(1); }
const TOKEN = tokenMatch[1];
L('Token: ' + TOKEN.substring(0, 10) + '...');

function api(method, apiPath, body) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : '';
    const opts = {
      hostname: 'api.cloudflare.com', port: 443,
      path: '/client/v4' + apiPath, method,
      headers: { 'Authorization': 'Bearer ' + TOKEN, 'Content-Type': 'application/json' }
    };
    if (data) opts.headers['Content-Length'] = Buffer.byteLength(data);
    const req = https.request(opts, res => {
      let b = '';
      res.on('data', c => b += c);
      res.on('end', () => {
        try { resolve(JSON.parse(b)); } catch { resolve({ raw: b, statusCode: res.statusCode }); }
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

async function main() {
  // Test token
  console.log('\n=== Step 1: Token verify ===');
  const user = await api('GET', '/user');
  if (user.success) {
    console.log('User: ' + user.result.email);
  } else {
    console.log('Token invalid:', JSON.stringify(user.errors));
    process.exit(1);
  }

  // Check zone
  console.log('\n=== Step 2: Zone check ===');
  const zone = await api('GET', '/zones/' + ZONE_ID);
  if (zone.success) {
    console.log('Zone: ' + zone.result.name + ' | Status: ' + zone.result.status);
    console.log('NS: ' + (zone.result.name_servers || []).join(', '));
  }

  // Try to read DNS
  console.log('\n=== Step 3: DNS records ===');
  const dns = await api('GET', '/zones/' + ZONE_ID + '/dns_records?per_page=50');
  if (dns.success) {
    console.log('DNS records: ' + dns.result.length);
    dns.result.forEach(r => console.log('  ' + r.type + ' ' + r.name + ' -> ' + r.content));
  } else {
    console.log('DNS read error:', JSON.stringify(dns.errors));
  }

  // Try to write DNS - root CNAME
  console.log('\n=== Step 4: Add root CNAME ===');
  const rootExists = dns.success && dns.result.find(r => r.name === DOMAIN && r.content === PAGES_DOMAIN);
  if (rootExists) {
    console.log('Root CNAME already exists');
  } else {
    const addRoot = await api('POST', '/zones/' + ZONE_ID + '/dns_records', {
      type: 'CNAME', name: '@', content: PAGES_DOMAIN, proxied: true, ttl: 1
    });
    if (addRoot.success) {
      console.log('Root CNAME added!');
    } else {
      console.log('Root CNAME error:', JSON.stringify(addRoot.errors));
      console.log('Error codes:', addRoot.errors?.map(e => e.code).join(', '));
    }
  }

  // Try to write DNS - www CNAME
  console.log('\n=== Step 5: Add www CNAME ===');
  const wwwExists = dns.success && dns.result.find(r => r.name === 'www.' + DOMAIN && r.content === PAGES_DOMAIN);
  if (wwwExists) {
    console.log('www CNAME already exists');
  } else {
    const addWww = await api('POST', '/zones/' + ZONE_ID + '/dns_records', {
      type: 'CNAME', name: 'www', content: PAGES_DOMAIN, proxied: true, ttl: 1
    });
    if (addWww.success) {
      console.log('www CNAME added!');
    } else {
      console.log('www CNAME error:', JSON.stringify(addWww.errors));
    }
  }

  // Final DNS check
  console.log('\n=== Step 6: Final DNS ===');
  const finalDns = await api('GET', '/zones/' + ZONE_ID + '/dns_records?per_page=50');
  if (finalDns.success) {
    finalDns.result.forEach(r => console.log('  ' + r.type + ' ' + r.name + ' -> ' + r.content + ' (proxied:' + r.proxied + ')'));
  }

  console.log('\n=== DONE ===');
  
  // Write log file
  fs.writeFileSync(LOG_FILE, log.join('\n'), 'utf-8');
  console.log('Log written to: ' + LOG_FILE);
}

main().catch(e => { console.error('FATAL:', e.message); fs.writeFileSync(LOG_FILE, log.join('\n') + '\nFATAL: ' + e.message, 'utf-8'); });
