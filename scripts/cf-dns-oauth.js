const fs = require('fs');
const https = require('https');
const path = require('path');

// Read OAuth token  
const configPath = path.join(process.env.APPDATA, 'xdg.config', '.wrangler', 'config', 'default.toml');
const config = fs.readFileSync(configPath, 'utf-8');
const tokenMatch = config.match(/oauth_token\s*=\s*"([^"]+)"/);
const TOKEN = tokenMatch[1];

const ZONE_ID = 'eb9c646f745f401bf12f0722fe86b9bf';
const PAGES_URL = 'akcapen-yeni.pages.dev';

function cfApi(method, endpoint, body) {
  return new Promise((resolve, reject) => {
    const opts = {
      hostname: 'api.cloudflare.com',
      path: '/client/v4' + endpoint,
      method,
      headers: { 'Authorization': 'Bearer ' + TOKEN, 'Content-Type': 'application/json' }
    };
    const req = https.request(opts, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => { try { resolve(JSON.parse(data)); } catch (e) { resolve({ raw: data }); } });
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function main() {
  // List DNS records
  console.log('=== Mevcut DNS Kayitlari (OAuth) ===');
  const existing = await cfApi('GET', `/zones/${ZONE_ID}/dns_records`);
  if (existing.success) {
    console.log('Kayit sayisi: ' + existing.result.length);
    existing.result.forEach(r => {
      console.log(`  ${r.type} ${r.name} -> ${r.content} (proxied: ${r.proxied})`);
    });
  } else {
    console.log('HATA:', JSON.stringify(existing.errors));
  }
  
  // Try adding CNAME records
  console.log('\n=== CNAME @ -> ' + PAGES_URL + ' ===');
  const r1 = await cfApi('POST', `/zones/${ZONE_ID}/dns_records`, {
    type: 'CNAME', name: '@', content: PAGES_URL, proxied: true, ttl: 1
  });
  console.log(r1.success ? '✓ EKLENDI: ' + r1.result.id : '✗ HATA: ' + JSON.stringify(r1.errors));
  
  console.log('\n=== CNAME www -> ' + PAGES_URL + ' ===');
  const r2 = await cfApi('POST', `/zones/${ZONE_ID}/dns_records`, {
    type: 'CNAME', name: 'www', content: PAGES_URL, proxied: true, ttl: 1
  });
  console.log(r2.success ? '✓ EKLENDI: ' + r2.result.id : '✗ HATA: ' + JSON.stringify(r2.errors));
  
  // Verify
  console.log('\n=== Son Durum ===');
  const final = await cfApi('GET', `/zones/${ZONE_ID}/dns_records`);
  if (final.success) {
    final.result.forEach(r => {
      console.log(`  ${r.type} ${r.name} -> ${r.content}`);
    });
  }
}

main().catch(err => console.error(err.message));
