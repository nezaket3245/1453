// Cloudflare OAuth with zone:edit scope - one-time use script
const http = require('http');
const https = require('https');
const { execSync } = require('child_process');
const crypto = require('crypto');
const url = require('url');

const PORT = 8976;
const CLIENT_ID = '54d11594-84e4-41aa-b438-e81b8fa78ee7';
const REDIRECT_URI = `http://localhost:${PORT}/oauth/callback`;

// Generate PKCE
const codeVerifier = crypto.randomBytes(32).toString('base64url');
const codeChallenge = crypto.createHash('sha256').update(codeVerifier).digest('base64url');
const state = crypto.randomBytes(16).toString('hex');

// Add zone:edit to the scopes (wrangler default only has zone:read)
const SCOPES = [
  'account:read', 'user:read', 'workers:write', 'workers_kv:write',
  'workers_routes:write', 'workers_scripts:write', 'workers_tail:read',
  'd1:write', 'pages:write', 'zone:read', 'zone:edit',
  'ssl_certs:write', 'ai:write', 'queues:write', 'pipelines:write',
  'secrets_store:write', 'offline_access'
].join(' ');

const authUrl = `https://dash.cloudflare.com/oauth2/auth?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES)}&state=${state}&code_challenge=${codeChallenge}&code_challenge_method=S256`;

function httpsPost(hostname, path, body) {
  return new Promise((resolve, reject) => {
    const data = typeof body === 'string' ? body : JSON.stringify(body);
    const isForm = typeof body === 'string';
    const options = {
      hostname, port: 443, path, method: 'POST',
      headers: {
        'Content-Type': isForm ? 'application/x-www-form-urlencoded' : 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };
    const req = https.request(options, (res) => {
      let responseBody = '';
      res.on('data', chunk => responseBody += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: responseBody }));
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

const server = http.createServer(async (req, res) => {
  const parsed = url.parse(req.url, true);
  
  if (parsed.pathname === '/oauth/callback') {
    const code = parsed.query.code;
    if (!code) {
      res.writeHead(400);
      res.end('No code received');
      return;
    }

    console.log('Authorization code received, exchanging for token...');

    try {
      // Exchange code for token
      const tokenBody = `grant_type=authorization_code&code=${code}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&client_id=${CLIENT_ID}&code_verifier=${codeVerifier}`;
      const tokenRes = await httpsPost('dash.cloudflare.com', '/oauth2/token', tokenBody);
      const tokenData = JSON.parse(tokenRes.body);
      
      if (!tokenData.access_token) {
        console.error('Token exchange failed:', tokenRes.body);
        res.writeHead(500);
        res.end('Token exchange failed');
        server.close();
        return;
      }

      console.log('Token obtained with zone:edit scope!');
      
      // Create the zone
      const zoneBody = JSON.stringify({
        name: 'egepenakcayapi.com',
        account: { id: '2f8a9910120689f4f86f06fb6637f9b2' },
        type: 'full'
      });

      const zoneOptions = {
        hostname: 'api.cloudflare.com',
        port: 443,
        path: '/client/v4/zones',
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${tokenData.access_token}`,
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(zoneBody)
        }
      };

      const zoneRes = await new Promise((resolve, reject) => {
        const req = https.request(zoneOptions, (res) => {
          let body = '';
          res.on('data', chunk => body += chunk);
          res.on('end', () => resolve({ status: res.statusCode, body }));
        });
        req.on('error', reject);
        req.write(zoneBody);
        req.end();
      });

      const zoneData = JSON.parse(zoneRes.body);
      
      if (zoneData.success) {
        const zone = zoneData.result;
        console.log('\n✅ Zone created successfully!');
        console.log(`Zone ID: ${zone.id}`);
        console.log(`Domain: ${zone.name}`);
        console.log(`Status: ${zone.status}`);
        console.log(`Nameservers: ${(zone.name_servers || []).join(', ')}`);
        
        // Save token for further API calls
        console.log(`\nTOKEN=${tokenData.access_token}`);
        
        // Now add Pages custom domains
        const addDomain = async (domain) => {
          const domainBody = JSON.stringify({ domain });
          const domainOptions = {
            hostname: 'api.cloudflare.com',
            port: 443,
            path: '/client/v4/accounts/2f8a9910120689f4f86f06fb6637f9b2/pages/projects/akcapen-yeni/domains',
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${tokenData.access_token}`,
              'Content-Type': 'application/json',
              'Content-Length': Buffer.byteLength(domainBody)
            }
          };
          return new Promise((resolve, reject) => {
            const req = https.request(domainOptions, (res) => {
              let body = '';
              res.on('data', chunk => body += chunk);
              res.on('end', () => resolve({ status: res.statusCode, body }));
            });
            req.on('error', reject);
            req.write(domainBody);
            req.end();
          });
        };

        // Add egepenakcayapi.com
        console.log('\nAdding egepenakcayapi.com to Pages...');
        const d1 = await addDomain('egepenakcayapi.com');
        console.log('Result:', d1.body);

        // Add www.egepenakcayapi.com
        console.log('\nAdding www.egepenakcayapi.com to Pages...');
        const d2 = await addDomain('www.egepenakcayapi.com');
        console.log('Result:', d2.body);

        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end('<h1>✅ Başarılı!</h1><p>Zone oluşturuldu ve domain eklendi. Bu sayfayı kapatabilirsiniz.</p>');
      } else {
        console.error('Zone creation failed:', zoneRes.body);
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(`<h1>❌ Zone oluşturulamadı</h1><pre>${JSON.stringify(zoneData, null, 2)}</pre>`);
      }

    } catch (err) {
      console.error('Error:', err.message);
      res.writeHead(500);
      res.end('Error: ' + err.message);
    }

    setTimeout(() => { server.close(); process.exit(0); }, 2000);
  }
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
  console.log('Opening browser for authorization...');
  
  // Open browser
  try {
    execSync(`start "" "${authUrl}"`, { shell: 'cmd.exe' });
  } catch (e) {
    console.log('\nPlease open this URL manually:');
    console.log(authUrl);
  }
});

// Timeout after 2 minutes
setTimeout(() => {
  console.log('Timeout - no authorization received');
  server.close();
  process.exit(1);
}, 120000);
