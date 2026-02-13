const fs = require('fs');
const https = require('https');
const path = require('path');
const { execSync } = require('child_process');

const ZONE_ID = 'eb9c646f745f401bf12f0722fe86b9bf';
const DOMAIN = 'egepenakcayapi.com';
const PAGES_DOMAIN = 'akcapen-yeni.pages.dev';
const RESULT_FILE = 'C:\\Users\\ibo\\dns-result.txt';

const lines = [];
function L(msg) { lines.push(msg); }

function api(token, method, apiPath, body) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : '';
    const opts = {
      hostname: 'api.cloudflare.com', port: 443,
      path: '/client/v4' + apiPath, method,
      headers: { 'Authorization': 'Bearer ' + token, 'Content-Type': 'application/json' }
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
  // Refresh wrangler token
  try { execSync('npx wrangler pages project list', { stdio: 'pipe', timeout: 20000 }); } catch {}
  
  const cfgPath = path.join(process.env.APPDATA, 'xdg.config', '.wrangler', 'config', 'default.toml');
  const cfg = fs.readFileSync(cfgPath, 'utf-8');
  const m = cfg.match(/oauth_token\s*=\s*"([^"]+)"/);
  if (!m) { L('ERROR: No token'); fs.writeFileSync(RESULT_FILE, lines.join('\n')); process.exit(1); }
  const T = m[1];
  L('Token: ' + T.substring(0, 10) + '...');

  // 1. Verify
  L('\n--- Step 1: Verify token ---');
  const user = await api(T, 'GET', '/user');
  L('User API success: ' + user.success);
  if (user.result) L('Email: ' + user.result.email);
  if (!user.success) { L('Errors: ' + JSON.stringify(user.errors)); }

  // 2. Zone
  L('\n--- Step 2: Zone ---');
  const zone = await api(T, 'GET', '/zones/' + ZONE_ID);
  L('Zone success: ' + zone.success);
  if (zone.result) {
    L('Name: ' + zone.result.name);
    L('Status: ' + zone.result.status);
    L('NS: ' + (zone.result.name_servers || []).join(', '));
  }

  // 3. DNS read
  L('\n--- Step 3: DNS records ---');
  const dns = await api(T, 'GET', '/zones/' + ZONE_ID + '/dns_records?per_page=50');
  L('DNS read success: ' + dns.success);
  if (dns.success) {
    L('Count: ' + dns.result.length);
    dns.result.forEach(r => L('  ' + r.type + '\t' + r.name + '\t-> ' + r.content));
  } else {
    L('DNS errors: ' + JSON.stringify(dns.errors));
  }

  // 4. Add root CNAME
  L('\n--- Step 4: Root CNAME ---');
  const rootOk = dns.success && dns.result.find(r => r.name === DOMAIN && r.content === PAGES_DOMAIN);
  if (rootOk) {
    L('SKIP: Root CNAME already correct');
  } else {
    const addR = await api(T, 'POST', '/zones/' + ZONE_ID + '/dns_records', {
      type: 'CNAME', name: '@', content: PAGES_DOMAIN, proxied: true, ttl: 1
    });
    L('Add root success: ' + addR.success);
    if (!addR.success) L('Errors: ' + JSON.stringify(addR.errors));
  }

  // 5. Add www CNAME
  L('\n--- Step 5: www CNAME ---');
  const wwwOk = dns.success && dns.result.find(r => r.name === 'www.' + DOMAIN && r.content === PAGES_DOMAIN);
  if (wwwOk) {
    L('SKIP: www CNAME already correct');
  } else {
    const addW = await api(T, 'POST', '/zones/' + ZONE_ID + '/dns_records', {
      type: 'CNAME', name: 'www', content: PAGES_DOMAIN, proxied: true, ttl: 1
    });
    L('Add www success: ' + addW.success);
    if (!addW.success) L('Errors: ' + JSON.stringify(addW.errors));
  }

  // 6. Final
  L('\n--- Step 6: Final DNS ---');
  const fin = await api(T, 'GET', '/zones/' + ZONE_ID + '/dns_records?per_page=50');
  if (fin.success) {
    fin.result.forEach(r => L('  ' + r.type + '\t' + r.name + '\t-> ' + r.content + '\tproxied:' + r.proxied));
  }

  L('\n=== DONE ===');
  fs.writeFileSync(RESULT_FILE, lines.join('\n'), 'utf-8');
}

main().catch(e => {
  L('FATAL: ' + e.message);
  fs.writeFileSync(RESULT_FILE, lines.join('\n'), 'utf-8');
});
