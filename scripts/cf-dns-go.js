const https = require('https');

const TOKEN = '2AU43Q3CQIyxY_dBaOVKBpRr6JolJeqaxNQVKL_c';
const ZONE_ID = 'c584fe27d80aaa8a9237ca2fb857cd9c';
const ACCT_ID = '1fb4ac9a140c6e18cf7c8d3c5854aaa9';
const DOMAIN = 'egepenakcayapi.com';
const PAGES_DOMAIN = 'egepenakcayap--com2.pages.dev';
const PAGES_PROJECT = 'egepenakcayap--com2';

function api(method, path, body, token) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : '';
    const opts = {
      hostname: 'api.cloudflare.com', port: 443,
      path: '/client/v4' + path, method,
      headers: { 'Authorization': 'Bearer ' + (token || TOKEN), 'Content-Type': 'application/json' }
    };
    if (data) opts.headers['Content-Length'] = Buffer.byteLength(data);
    const req = https.request(opts, res => {
      let b = '';
      res.on('data', c => b += c);
      res.on('end', () => { try { resolve(JSON.parse(b)); } catch { resolve({ raw: b }); } });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

async function main() {
  // 1. Verify token
  console.log('[1/5] Token dogrulaniyor...');
  const v = await api('GET', '/user/tokens/verify');
  if (!v.success) { console.error('Token gecersiz!', v); process.exit(1); }
  console.log('  Token gecerli:', v.result.status);

  // 2. List existing records
  console.log('\n[2/5] Mevcut DNS kayitlari...');
  const recs = await api('GET', `/zones/${ZONE_ID}/dns_records`);
  if (!recs.success) { console.error('DNS okunamadi:', recs.errors); process.exit(1); }
  console.log(`  ${recs.result.length} kayit bulundu:`);
  recs.result.forEach(r => console.log(`    ${r.type}\t${r.name}\t-> ${r.content}`));

  // 3. Add root CNAME
  console.log('\n[3/5] Root CNAME ekleniyor...');
  const rootRec = recs.result.find(r => r.name === DOMAIN && r.type === 'CNAME');
  if (rootRec) {
    if (rootRec.content !== PAGES_DOMAIN) {
      const u = await api('PATCH', `/zones/${ZONE_ID}/dns_records/${rootRec.id}`, { type: 'CNAME', name: '@', content: PAGES_DOMAIN, proxied: true });
      console.log(u.success ? '  Guncellendi!' : '  Hata:', u.errors);
    } else {
      console.log('  Zaten mevcut ve dogru.');
    }
  } else {
    const a = await api('POST', `/zones/${ZONE_ID}/dns_records`, { type: 'CNAME', name: '@', content: PAGES_DOMAIN, proxied: true, ttl: 1 });
    console.log(a.success ? '  Root CNAME eklendi!' : '  Hata:', JSON.stringify(a.errors));
  }

  // 4. Add www CNAME
  console.log('\n[4/5] WWW CNAME ekleniyor...');
  const wwwRec = recs.result.find(r => r.name === `www.${DOMAIN}` && r.type === 'CNAME');
  if (wwwRec) {
    if (wwwRec.content !== PAGES_DOMAIN) {
      const u = await api('PATCH', `/zones/${ZONE_ID}/dns_records/${wwwRec.id}`, { type: 'CNAME', name: 'www', content: PAGES_DOMAIN, proxied: true });
      console.log(u.success ? '  Guncellendi!' : '  Hata:', u.errors);
    } else {
      console.log('  Zaten mevcut ve dogru.');
    }
  } else {
    const a = await api('POST', `/zones/${ZONE_ID}/dns_records`, { type: 'CNAME', name: 'www', content: PAGES_DOMAIN, proxied: true, ttl: 1 });
    console.log(a.success ? '  WWW CNAME eklendi!' : '  Hata:', JSON.stringify(a.errors));
  }

  // 5. Check custom domain status (using wrangler oauth token for pages API)
  console.log('\n[5/5] Custom domain durumu...');
  const fs = require('fs');
  const path = require('path');
  const cfgPath = path.join(process.env.APPDATA, 'xdg.config', '.wrangler', 'config', 'default.toml');
  const cfg = fs.readFileSync(cfgPath, 'utf-8');
  const m = cfg.match(/oauth_token\s*=\s*"([^"]+)"/);
  if (m) {
    const d = await api('GET', `/accounts/${ACCT_ID}/pages/projects/${PAGES_PROJECT}/domains`, null, m[1]);
    if (d.result) {
      d.result.forEach(dd => console.log(`  ${dd.name}: status=${dd.status}, verify=${dd.verification_data?.status}, ssl=${dd.validation_data?.status}`));
    }
  }

  console.log('\n============================================');
  console.log('  ISLEM TAMAMLANDI!');
  console.log('============================================');
  console.log('  DNS birkac dakika icinde yayilacak.');
  console.log(`  Site: https://${DOMAIN}`);
  console.log(`  WWW:  https://www.${DOMAIN}`);
}

main().catch(e => console.error('Hata:', e));
