const http = require('http');
const https = require('https');
const { execSync } = require('child_process');
const crypto = require('crypto');

const PORT = 8976;
const CLIENT_ID = '54d11594-84e4-41aa-b438-e81b8fa78ee7';
const REDIRECT_URI = `http://localhost:${PORT}/oauth/callback`;
const ACCT_ID = '2f8a9910120689f4f86f06fb6637f9b2';
const ZONE_ID = 'eb9c646f745f401bf12f0722fe86b9bf';
const DOMAIN = 'egepenakcayapi.com';
const PAGES_DOMAIN = 'akcapen-yeni.pages.dev';

const codeVerifier = crypto.randomBytes(32).toString('base64url');
const codeChallenge = crypto.createHash('sha256').update(codeVerifier).digest('base64url');
const state = crypto.randomBytes(16).toString('hex');

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
      let b = ''; res.on('data', c => b += c); res.on('end', () => { try { resolve(JSON.parse(b)); } catch { resolve({ raw: b }); } });
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

  console.log('✓ Yetkilendirme alindi! Token aliniyor...');

  try {
    const tokenBody = `grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&client_id=${CLIENT_ID}&code_verifier=${codeVerifier}`;
    const tokenRes = await new Promise((resolve, reject) => {
      const req = https.request({
        hostname: 'dash.cloudflare.com', port: 443, path: '/oauth2/token', method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': Buffer.byteLength(tokenBody) }
      }, res => { let b = ''; res.on('data', c => b += c); res.on('end', () => resolve(JSON.parse(b))); });
      req.on('error', reject); req.write(tokenBody); req.end();
    });

    if (!tokenRes.access_token) {
      console.log('✗ Token alinamadi:', JSON.stringify(tokenRes));
      res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
      res.end('<h2>Token alinamadi</h2>');
      server.close(); setTimeout(() => process.exit(1), 1000); return;
    }

    const token = tokenRes.access_token;
    console.log('✓ Token alindi!\n');

    // Step 1: Check existing DNS records
    console.log('1. Mevcut DNS kayitlari kontrol ediliyor...');
    const allDns = await apiCall('GET', `/client/v4/zones/${ZONE_ID}/dns_records?per_page=50`, token);
    if (allDns.success && allDns.result) {
      console.log(`   ${allDns.result.length} kayit bulundu:`);
      allDns.result.forEach(r => {
        console.log(`   ${r.type.padEnd(6)} ${r.name.padEnd(30)} → ${r.content} (proxied: ${r.proxied})`);
      });
    }
    console.log();

    // Step 2: Add/update root CNAME
    console.log('2. Root CNAME ekleniyor: ' + DOMAIN + ' → ' + PAGES_DOMAIN);
    const existingRoot = allDns.result?.find(r => r.name === DOMAIN && (r.type === 'CNAME' || r.type === 'A'));
    if (existingRoot && existingRoot.content === PAGES_DOMAIN) {
      console.log('   ✓ Root CNAME zaten dogru ayarlanmis');
    } else if (existingRoot) {
      // Update existing record
      console.log('   Mevcut kayit guncelleniyor (ID: ' + existingRoot.id + ')...');
      const upd = await apiCall('PATCH', `/client/v4/zones/${ZONE_ID}/dns_records/${existingRoot.id}`, token, {
        type: 'CNAME', name: '@', content: PAGES_DOMAIN, proxied: true, ttl: 1
      });
      console.log(upd.success ? '   ✓ Root CNAME guncellendi' : '   ✗ ' + JSON.stringify(upd.errors));
    } else {
      // Create new
      const add = await apiCall('POST', `/client/v4/zones/${ZONE_ID}/dns_records`, token, {
        type: 'CNAME', name: '@', content: PAGES_DOMAIN, proxied: true, ttl: 1
      });
      console.log(add.success ? '   ✓ Root CNAME eklendi' : '   ✗ ' + JSON.stringify(add.errors));
    }

    // Step 3: Add/update www CNAME
    console.log('3. www CNAME ekleniyor: www.' + DOMAIN + ' → ' + PAGES_DOMAIN);
    const existingWww = allDns.result?.find(r => r.name === 'www.' + DOMAIN && (r.type === 'CNAME' || r.type === 'A'));
    if (existingWww && existingWww.content === PAGES_DOMAIN) {
      console.log('   ✓ www CNAME zaten dogru ayarlanmis');
    } else if (existingWww) {
      const upd = await apiCall('PATCH', `/client/v4/zones/${ZONE_ID}/dns_records/${existingWww.id}`, token, {
        type: 'CNAME', name: 'www', content: PAGES_DOMAIN, proxied: true, ttl: 1
      });
      console.log(upd.success ? '   ✓ www CNAME guncellendi' : '   ✗ ' + JSON.stringify(upd.errors));
    } else {
      const add = await apiCall('POST', `/client/v4/zones/${ZONE_ID}/dns_records`, token, {
        type: 'CNAME', name: 'www', content: PAGES_DOMAIN, proxied: true, ttl: 1
      });
      console.log(add.success ? '   ✓ www CNAME eklendi' : '   ✗ ' + JSON.stringify(add.errors));
    }
    console.log();

    // Step 4: SSL settings
    console.log('4. SSL/TLS ayarlari...');
    const setSsl = await apiCall('PATCH', `/client/v4/zones/${ZONE_ID}/settings/ssl`, token, { value: 'full' });
    console.log(setSsl.success ? '   ✓ SSL: Full' : '   SSL ayarlanamadi');

    const setHttps = await apiCall('PATCH', `/client/v4/zones/${ZONE_ID}/settings/always_use_https`, token, { value: 'on' });
    console.log(setHttps.success ? '   ✓ Always Use HTTPS: ON' : '   HTTPS ayarlanamadi');

    const setMinTls = await apiCall('PATCH', `/client/v4/zones/${ZONE_ID}/settings/min_tls_version`, token, { value: '1.2' });
    console.log(setMinTls.success ? '   ✓ Min TLS: 1.2' : '   Min TLS ayarlanamadi');
    console.log();

    // Step 5: Verify final DNS state
    console.log('5. Son DNS durumu:');
    const finalDns = await apiCall('GET', `/client/v4/zones/${ZONE_ID}/dns_records?per_page=50`, token);
    if (finalDns.success && finalDns.result) {
      finalDns.result.forEach(r => {
        console.log(`   ${r.type.padEnd(6)} ${r.name.padEnd(30)} → ${r.content} (proxied: ${r.proxied})`);
      });
    }
    console.log();

    // Step 6: Check zone status  
    console.log('6. Zone durumu:');
    const zone = await apiCall('GET', `/client/v4/zones/${ZONE_ID}`, token);
    if (zone.success) {
      console.log('   Status: ' + zone.result.status);
      console.log('   Nameservers: ' + (zone.result.name_servers || []).join(', '));
    }
    console.log();

    // Step 7: Check Pages custom domains
    console.log('7. Pages custom domains:');
    const pd = await apiCall('GET', `/client/v4/accounts/${ACCT_ID}/pages/projects/akcapen-yeni/domains`, token);
    if (pd.success && pd.result) {
      pd.result.forEach(d => console.log(`   ${d.name} → status: ${d.status}`));
    }
    console.log();

    console.log('========================================');
    console.log('TAMAMLANDI!');
    console.log('');
    console.log('Zone status "pending" ise domain registrar\'da');
    console.log('NS kayitlarini degistirmeniz gerek:');
    console.log('  NS1: jule.ns.cloudflare.com');
    console.log('  NS2: lamar.ns.cloudflare.com');
    console.log('========================================');

    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
    res.end('<h2>Basarili! DNS kayitlari eklendi.</h2><p>Bu sayfayi kapatabilirsiniz.</p>');
  } catch (err) {
    console.error('HATA:', err.message);
    res.writeHead(500); res.end('Hata olustu');
  }

  setTimeout(() => { server.close(); process.exit(0); }, 2000);
});

server.listen(PORT, () => {
  console.log('=== Cloudflare DNS Setup ===');
  console.log('Port ' + PORT + ' dinleniyor...');
  console.log('Tarayicida Cloudflare giris sayfasi acilacak.');
  console.log('"Allow" butonuna tiklayin.\n');
  
  // Write URL to temp file and open via PowerShell
  const fs = require('fs');
  const tmpFile = require('path').join(require('os').tmpdir(), 'cf-auth-url.txt');
  fs.writeFileSync(tmpFile, authUrl);
  console.log('URL dosyaya yazildi: ' + tmpFile);
  
  try {
    execSync(`powershell -Command "Start-Process '${authUrl.replace(/'/g, "''")}'"`);
    console.log('Tarayici acildi. Bekliyor...\n');
  } catch (e) {
    console.log('Tarayici acilamadi!');
    console.log('Asagidaki URL\'yi tarayicida acin:\n');
    console.log(authUrl);
    console.log();
  }
});

setTimeout(() => { console.log('Zaman asimi (5 dk)'); server.close(); process.exit(1); }, 300000);
