const http = require('http');
const https = require('https');
const { execSync } = require('child_process');
const crypto = require('crypto');

const PORT = 8976;
const CLIENT_ID = '54d11594-84e4-41aa-b438-e81b8fa78ee7';
const REDIRECT_URI = `http://localhost:${PORT}/oauth/callback`;
const ACCT_ID = '2f8a9910120689f4f86f06fb6637f9b2';

const codeVerifier = crypto.randomBytes(32).toString('base64url');
const codeChallenge = crypto.createHash('sha256').update(codeVerifier).digest('base64url');
const state = crypto.randomBytes(16).toString('hex');

// Same scopes as wrangler + zone:edit for zone creation
const SCOPES = 'account:read user:read workers:write workers_kv:write workers_routes:write workers_scripts:write workers_tail:read d1:write pages:write zone:read zone:edit ssl_certs:write ai:write queues:write pipelines:write offline_access';

const authUrl = `https://dash.cloudflare.com/oauth2/auth?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES)}&state=${state}&code_challenge=${codeChallenge}&code_challenge_method=S256`;

function apiCall(method, path, token, body) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : '';
    const opts = {
      hostname: 'api.cloudflare.com', port: 443, path, method,
      headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
    };
    if (data) opts.headers['Content-Length'] = Buffer.byteLength(data);
    const req = https.request(opts, res => {
      let b = ''; res.on('data', c => b += c); res.on('end', () => resolve(JSON.parse(b)));
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

const server = http.createServer(async (req, res) => {
  const u = new URL(req.url, `http://localhost:${PORT}`);
  if (u.pathname !== '/oauth/callback') return;
  
  const code = u.searchParams.get('code');
  if (!code) { res.writeHead(400); res.end('No code'); server.close(); return; }
  
  console.log('✓ Authorization received! Exchanging token...');
  
  try {
    const tokenBody = `grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&client_id=${CLIENT_ID}&code_verifier=${codeVerifier}`;
    const tokenRes = await new Promise((resolve, reject) => {
      const req = https.request({ hostname: 'dash.cloudflare.com', port: 443, path: '/oauth2/token', method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': Buffer.byteLength(tokenBody) }
      }, res => { let b = ''; res.on('data', c => b += c); res.on('end', () => resolve(JSON.parse(b))); });
      req.on('error', reject); req.write(tokenBody); req.end();
    });
    
    if (!tokenRes.access_token) {
      console.log('✗ Token exchange failed:', JSON.stringify(tokenRes));
      res.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
      res.end('<h2>Token alinamadi. Sayfayi kapatabilirsiniz.</h2>');
      server.close(); setTimeout(() => process.exit(1), 1000); return;
    }
    
    const token = tokenRes.access_token;
    console.log('✓ Token obtained!');
    
    // Step 1: Create zone
    console.log('\n→ Creating zone egepenakcayapi.com...');
    const zoneResult = await apiCall('POST', '/client/v4/zones', token, {
      name: 'egepenakcayapi.com', account: { id: ACCT_ID }, type: 'full'
    });
    
    if (zoneResult.success) {
      const z = zoneResult.result;
      console.log(`✓ Zone created! ID: ${z.id}`);
      console.log(`  Status: ${z.status}`);
      console.log(`  Nameservers: ${(z.name_servers||[]).join(', ')}`);
      
      // Step 2: Add custom domains to Pages
      console.log('\n→ Adding egepenakcayapi.com to Pages...');
      const d1 = await apiCall('POST', `/client/v4/accounts/${ACCT_ID}/pages/projects/akcapen-yeni/domains`, token, { domain: 'egepenakcayapi.com' });
      console.log(d1.success ? '✓ egepenakcayapi.com added!' : `✗ ${JSON.stringify(d1.errors)}`);
      
      console.log('\n→ Adding www.egepenakcayapi.com to Pages...');
      const d2 = await apiCall('POST', `/client/v4/accounts/${ACCT_ID}/pages/projects/akcapen-yeni/domains`, token, { domain: 'www.egepenakcayapi.com' });
      console.log(d2.success ? '✓ www.egepenakcayapi.com added!' : `✗ ${JSON.stringify(d2.errors)}`);
      
      // Save nameservers info
      console.log(`\n========================================`);
      console.log(`NAMESERVERS (domain kayit firmanizda degistirin):`);
      console.log((z.name_servers||[]).join('\n'));
      console.log(`========================================`);
      
      res.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
      res.end(`<h2>✅ Basarili!</h2><p>Zone ve domain eklendi. Bu sayfayi kapatabilirsiniz.</p><p>Nameservers: ${(z.name_servers||[]).join(', ')}</p>`);
    } else {
      console.log('✗ Zone creation failed:', JSON.stringify(zoneResult.errors));
      res.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
      res.end(`<h2>Zone olusturulamadi</h2><pre>${JSON.stringify(zoneResult.errors, null, 2)}</pre>`);
    }
  } catch (err) {
    console.error('Error:', err.message);
    res.writeHead(500); res.end('Error');
  }
  
  setTimeout(() => { server.close(); process.exit(0); }, 2000);
});

server.listen(PORT, () => {
  console.log(`\n🔵 Tarayicida bir sayfa acilacak.`);
  console.log(`🔵 Sadece "Allow" butonuna tiklayin!\n`);
  console.log(`URL: ${authUrl.substring(0, 100)}...\n`);
  try { execSync(`start "" "${authUrl}"`, { shell: 'cmd.exe' }); } catch(e) { console.log('Tarayici acilamadi, URL\'yi manuel acin.'); }
});

setTimeout(() => { console.log('Zaman asimi'); server.close(); process.exit(1); }, 120000);
