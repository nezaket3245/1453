const https = require('https');
const readline = require('readline');

const ZONE_ID = 'c584fe27d80aaa8a9237ca2fb857cd9c';
const ACCT_ID = '1fb4ac9a140c6e18cf7c8d3c5854aaa9';
const PAGES_DOMAIN = 'egepenakcayap--com2.pages.dev';
const DOMAIN = 'egepenakcayapi.com';

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
        try { resolve({ status: res.statusCode, ...JSON.parse(b) }); } catch { resolve({ status: res.statusCode, raw: b }); }
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

async function main() {
  const token = process.argv[2];
  if (!token) {
    console.log('Kullanim: node cf-dns-token-setup.js <API_TOKEN>');
    console.log('\nToken olusturmak icin: https://dash.cloudflare.com/profile/api-tokens');
    console.log('Template: "Edit zone DNS" secin');
    process.exit(1);
  }

  console.log('Token kontrol ediliyor...');
  
  // Verify token
  const verify = await api(token, 'GET', '/user/tokens/verify');
  if (verify.status !== 200 || !verify.success) {
    console.error('Token gecersiz!', verify);
    process.exit(1);
  }
  console.log('Token gecerli! Status:', verify.result.status);

  // List existing DNS records
  console.log('\nMevcut DNS kayitlari kontrol ediliyor...');
  const records = await api(token, 'GET', `/zones/${ZONE_ID}/dns_records`);
  if (records.status !== 200) {
    console.error('DNS kayitlari alinamadi:', records.status, records.errors);
    process.exit(1);
  }

  console.log(`${records.result.length} kayit bulundu:`);
  records.result.forEach(r => console.log(`  ${r.type}\t${r.name}\t->\t${r.content}\t(proxied: ${r.proxied})`));

  // Check and add root CNAME
  const rootCname = records.result.find(r => r.name === DOMAIN && r.type === 'CNAME');
  if (!rootCname) {
    console.log(`\n@ CNAME ekleniyor -> ${PAGES_DOMAIN}...`);
    const res = await api(token, 'POST', `/zones/${ZONE_ID}/dns_records`, {
      type: 'CNAME', name: '@', content: PAGES_DOMAIN, proxied: true
    });
    if (res.success) {
      console.log('✅ Root CNAME basariyla eklendi!');
    } else {
      console.error('❌ Root CNAME eklenemedi:', res.errors);
    }
  } else {
    console.log('\n✅ Root CNAME zaten mevcut');
    // Update if pointing to wrong target
    if (rootCname.content !== PAGES_DOMAIN) {
      console.log(`  Guncelleniyor: ${rootCname.content} -> ${PAGES_DOMAIN}`);
      const res = await api(token, 'PATCH', `/zones/${ZONE_ID}/dns_records/${rootCname.id}`, {
        type: 'CNAME', name: '@', content: PAGES_DOMAIN, proxied: true
      });
      console.log(res.success ? '  ✅ Guncellendi' : '  ❌ Guncellenemedi');
    }
  }

  // Check and add www CNAME
  const wwwCname = records.result.find(r => r.name === `www.${DOMAIN}` && r.type === 'CNAME');
  if (!wwwCname) {
    console.log(`\nwww CNAME ekleniyor -> ${PAGES_DOMAIN}...`);
    const res = await api(token, 'POST', `/zones/${ZONE_ID}/dns_records`, {
      type: 'CNAME', name: 'www', content: PAGES_DOMAIN, proxied: true
    });
    if (res.success) {
      console.log('✅ WWW CNAME basariyla eklendi!');
    } else {
      console.error('❌ WWW CNAME eklenemedi:', res.errors);
    }
  } else {
    console.log('\n✅ WWW CNAME zaten mevcut');
    if (wwwCname.content !== PAGES_DOMAIN) {
      console.log(`  Guncelleniyor: ${wwwCname.content} -> ${PAGES_DOMAIN}`);
      const res = await api(token, 'PATCH', `/zones/${ZONE_ID}/dns_records/${wwwCname.id}`, {
        type: 'CNAME', name: 'www', content: PAGES_DOMAIN, proxied: true
      });
      console.log(res.success ? '  ✅ Guncellendi' : '  ❌ Guncellenemedi');
    }
  }

  // Verify custom domain status
  console.log('\n--- Custom Domain Durumu ---');
  const domainsRes = await api(token, 'GET', `/accounts/${ACCT_ID}/pages/projects/egepenakcayap--com2/domains`);
  if (domainsRes.result) {
    domainsRes.result.forEach(d => {
      console.log(`  ${d.name}: status=${d.status}, verify=${d.verification_data?.status}, ssl=${d.validation_data?.status}`);
    });
  }

  console.log('\n✅ Islem tamamlandi!');
  console.log('DNS degisiklikleri birkaç dakika icinde aktif olacak.');
  console.log(`Site: https://${DOMAIN}`);
}

main().catch(e => console.error('Hata:', e));
