const https = require('https');

// User's DNS Edit API token
const TOKEN = 'g4IPCRJz66mdQd1EDe6_XJf1OzkFadnAbRi9eNWY';
const ZONE_ID = 'eb9c646f745f401bf12f0722fe86b9bf';
const PAGES_URL = 'akcapen-yeni.pages.dev';

function cfApi(method, endpoint, body) {
  return new Promise((resolve, reject) => {
    const opts = {
      hostname: 'api.cloudflare.com',
      path: '/client/v4' + endpoint,
      method,
      headers: {
        'Authorization': 'Bearer ' + TOKEN,
        'Content-Type': 'application/json'
      }
    };
    const req = https.request(opts, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(data)); } catch (e) { resolve({ raw: data }); }
      });
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function main() {
  // First verify token works
  console.log('Token dogrulaniyor...');
  const verify = await cfApi('GET', '/user/tokens/verify');
  console.log('Token status:', verify.result?.status || JSON.stringify(verify.errors));
  
  // List existing DNS records
  console.log('\n=== Mevcut DNS Kayitlari ===');
  const existing = await cfApi('GET', `/zones/${ZONE_ID}/dns_records`);
  if (existing.success && existing.result) {
    if (existing.result.length === 0) {
      console.log('  Hicbir kayit yok');
    } else {
      existing.result.forEach(r => {
        console.log(`  ${r.type} ${r.name} -> ${r.content} (proxied: ${r.proxied}, id: ${r.id})`);
      });
    }
  } else {
    console.log('  Hata:', JSON.stringify(existing.errors));
  }
  
  // Add CNAME for root domain
  console.log('\n=== CNAME Kayitlari Ekleniyor ===');
  
  console.log('1. CNAME egepenakcayapi.com -> ' + PAGES_URL);
  const r1 = await cfApi('POST', `/zones/${ZONE_ID}/dns_records`, {
    type: 'CNAME',
    name: '@',
    content: PAGES_URL,
    proxied: true,
    ttl: 1
  });
  if (r1.success) {
    console.log('   ✓ EKLENDI! ID:', r1.result.id);
  } else {
    console.log('   ✗ HATA:', JSON.stringify(r1.errors));
  }
  
  // Add CNAME for www
  console.log('\n2. CNAME www.egepenakcayapi.com -> ' + PAGES_URL);
  const r2 = await cfApi('POST', `/zones/${ZONE_ID}/dns_records`, {
    type: 'CNAME',
    name: 'www',
    content: PAGES_URL,
    proxied: true,
    ttl: 1
  });
  if (r2.success) {
    console.log('   ✓ EKLENDI! ID:', r2.result.id);
  } else {
    console.log('   ✗ HATA:', JSON.stringify(r2.errors));
  }
  
  // Verify
  console.log('\n=== Son DNS Kayitlari ===');
  const final = await cfApi('GET', `/zones/${ZONE_ID}/dns_records`);
  if (final.result) {
    final.result.forEach(r => {
      console.log(`  ${r.type} ${r.name} -> ${r.content} (proxied: ${r.proxied})`);
    });
  }
  
  console.log('\n✅ DNS setup tamamlandi!');
}

main().catch(err => console.error('Hata:', err.message));
