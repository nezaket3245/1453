#!/usr/bin/env node
/**
 * Cloudflare Custom Domain Setup Script
 * 
 * Steps:
 * 1. Read wrangler OAuth token (auto-refreshes if needed)
 * 2. Check if egepenakcayapi.com zone exists
 * 3. If not, create the zone
 * 4. Add CNAME DNS record pointing to akcapen-yeni.pages.dev
 * 5. Add custom domain to Pages project
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ACCT_ID = '2f8a9910120689f4f86f06fb6637f9b2';
const DOMAIN = 'egepenakcayapi.com';
const PAGES_PROJECT = 'akcapen-yeni';
const PAGES_DOMAIN = 'akcapen-yeni.pages.dev';

// Read token from wrangler config
function getToken() {
  const configPaths = [
    path.join(process.env.APPDATA || '', 'xdg.config', '.wrangler', 'config', 'default.toml'),
    path.join(process.env.USERPROFILE || '', '.wrangler', 'config', 'default.toml'),
  ];
  for (const p of configPaths) {
    try {
      const content = fs.readFileSync(p, 'utf-8');
      const match = content.match(/oauth_token\s*=\s*"([^"]+)"/);
      if (match) return match[1];
    } catch {}
  }
  // Try refreshing via wrangler first
  try {
    execSync('npx wrangler whoami', { stdio: 'pipe', timeout: 15000 });
    for (const p of configPaths) {
      try {
        const content = fs.readFileSync(p, 'utf-8');
        const match = content.match(/oauth_token\s*=\s*"([^"]+)"/);
        if (match) return match[1];
      } catch {}
    }
  } catch {}
  throw new Error('Could not find Cloudflare OAuth token. Run: npx wrangler login');
}

function api(method, apiPath, token, body) {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : '';
    const opts = {
      hostname: 'api.cloudflare.com',
      port: 443,
      path: `/client/v4${apiPath}`,
      method,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    };
    if (data) opts.headers['Content-Length'] = Buffer.byteLength(data);
    const req = https.request(opts, res => {
      let b = '';
      res.on('data', c => b += c);
      res.on('end', () => {
        try { resolve(JSON.parse(b)); } catch { resolve({ raw: b }); }
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

async function main() {
  console.log('=== Cloudflare Domain Setup: ' + DOMAIN + ' ===\n');

  // Step 0: Get token
  console.log('1. Token okunuyor...');
  let token;
  try {
    token = getToken();
    console.log('   ✓ Token bulundu\n');
  } catch (e) {
    console.error('   ✗ ' + e.message);
    process.exit(1);
  }

  // Step 1: Check if zone exists
  console.log('2. Zone kontrol ediliyor: ' + DOMAIN);
  const zonesRes = await api('GET', `/zones?name=${DOMAIN}&account.id=${ACCT_ID}`, token);
  
  let zoneId;
  if (zonesRes.success && zonesRes.result && zonesRes.result.length > 0) {
    zoneId = zonesRes.result[0].id;
    const status = zonesRes.result[0].status;
    const ns = zonesRes.result[0].name_servers || [];
    console.log('   ✓ Zone zaten var! ID: ' + zoneId);
    console.log('   ✓ Status: ' + status);
    console.log('   ✓ Nameservers: ' + ns.join(', '));
    console.log();
  } else {
    console.log('   Zone bulunamadi, olusturuluyor...');
    const createRes = await api('POST', '/zones', token, {
      name: DOMAIN,
      account: { id: ACCT_ID },
      type: 'full',
      jump_start: true
    });
    if (createRes.success) {
      zoneId = createRes.result.id;
      const ns = createRes.result.name_servers || [];
      console.log('   ✓ Zone olusturuldu! ID: ' + zoneId);
      console.log('   ✓ Nameservers (domain saglayicida bunlari ayarlayin):');
      ns.forEach(n => console.log('     - ' + n));
      console.log();
    } else {
      console.error('   ✗ Zone olusturulamadi:', JSON.stringify(createRes.errors, null, 2));
      // Check if it's a scope issue
      if (JSON.stringify(createRes.errors).includes('zone:edit')) {
        console.log('\n   Token\'da zone:edit yetkisi yok. Yeni login gerekiyor:');
        console.log('   npx wrangler login --scopes "account:read user:read workers:write workers_kv:write workers_routes:write workers_scripts:write workers_tail:read d1:write pages:write zone:read zone:edit dns:edit ssl_certs:write ai:write queues:write pipelines:write offline_access"');
      }
      process.exit(1);
    }
  }

  // Step 2: Check/add DNS records
  console.log('3. DNS kayitlari kontrol ediliyor...');
  const dnsRes = await api('GET', `/zones/${zoneId}/dns_records?type=CNAME&name=${DOMAIN}`, token);
  
  let hasCname = false;
  if (dnsRes.success && dnsRes.result) {
    for (const rec of dnsRes.result) {
      if (rec.name === DOMAIN && rec.content === PAGES_DOMAIN) {
        hasCname = true;
        console.log('   ✓ CNAME kaydi zaten var: ' + DOMAIN + ' → ' + PAGES_DOMAIN);
      }
    }
  }

  if (!hasCname) {
    console.log('   CNAME kaydi ekleniyor: ' + DOMAIN + ' → ' + PAGES_DOMAIN);
    const addDns = await api('POST', `/zones/${zoneId}/dns_records`, token, {
      type: 'CNAME',
      name: '@',
      content: PAGES_DOMAIN,
      proxied: true,
      ttl: 1 // auto
    });
    if (addDns.success) {
      console.log('   ✓ CNAME eklendi');
    } else {
      console.error('   ✗ CNAME eklenemedi:', JSON.stringify(addDns.errors, null, 2));
    }
  }

  // Check www CNAME
  const wwwRes = await api('GET', `/zones/${zoneId}/dns_records?type=CNAME&name=www.${DOMAIN}`, token);
  let hasWww = false;
  if (wwwRes.success && wwwRes.result) {
    for (const rec of wwwRes.result) {
      if (rec.name === 'www.' + DOMAIN) {
        hasWww = true;
        console.log('   ✓ www CNAME zaten var: www.' + DOMAIN + ' → ' + rec.content);
      }
    }
  }
  if (!hasWww) {
    console.log('   www CNAME ekleniyor...');
    const addWww = await api('POST', `/zones/${zoneId}/dns_records`, token, {
      type: 'CNAME',
      name: 'www',
      content: PAGES_DOMAIN,
      proxied: true,
      ttl: 1
    });
    if (addWww.success) {
      console.log('   ✓ www CNAME eklendi');
    } else {
      console.error('   ✗ www CNAME eklenemedi:', JSON.stringify(addWww.errors, null, 2));
    }
  }
  console.log();

  // Step 3: Add custom domain to Pages project
  console.log('4. Custom domain Pages projesine ekleniyor...');
  
  // Check existing custom domains
  const domainsRes = await api('GET', `/accounts/${ACCT_ID}/pages/projects/${PAGES_PROJECT}/domains`, token);
  let domainExists = false;
  if (domainsRes.success && domainsRes.result) {
    for (const d of domainsRes.result) {
      console.log('   Mevcut domain: ' + d.name + ' (status: ' + d.status + ')');
      if (d.name === DOMAIN || d.name === 'www.' + DOMAIN) {
        domainExists = true;
      }
    }
  }

  if (!domainExists) {
    // Add root domain
    const addDomain = await api('POST', `/accounts/${ACCT_ID}/pages/projects/${PAGES_PROJECT}/domains`, token, {
      name: DOMAIN
    });
    if (addDomain.success) {
      console.log('   ✓ ' + DOMAIN + ' eklendi! Status: ' + (addDomain.result?.status || 'pending'));
    } else {
      console.error('   ✗ Domain eklenemedi:', JSON.stringify(addDomain.errors, null, 2));
    }

    // Add www subdomain
    const addWwwDomain = await api('POST', `/accounts/${ACCT_ID}/pages/projects/${PAGES_PROJECT}/domains`, token, {
      name: 'www.' + DOMAIN
    });
    if (addWwwDomain.success) {
      console.log('   ✓ www.' + DOMAIN + ' eklendi! Status: ' + (addWwwDomain.result?.status || 'pending'));
    } else {
      console.error('   ✗ www domain eklenemedi:', JSON.stringify(addWwwDomain.errors, null, 2));
    }
  } else {
    console.log('   ✓ Domain(lar) zaten ekli');
  }
  console.log();

  // Step 4: SSL/TLS settings
  console.log('5. SSL/TLS ayarlari kontrol ediliyor...');
  const sslRes = await api('GET', `/zones/${zoneId}/settings/ssl`, token);
  if (sslRes.success) {
    console.log('   SSL modu: ' + sslRes.result?.value);
    if (sslRes.result?.value !== 'full') {
      console.log('   Full (strict) olarak ayarlaniyor...');
      const setSsl = await api('PATCH', `/zones/${zoneId}/settings/ssl`, token, { value: 'full' });
      if (setSsl.success) {
        console.log('   ✓ SSL: full olarak ayarlandi');
      }
    } else {
      console.log('   ✓ SSL zaten full modunda');
    }
  }
  console.log();

  // Step 5: Always-use-HTTPS
  console.log('6. Always Use HTTPS kontrol ediliyor...');
  const httpsRes = await api('GET', `/zones/${zoneId}/settings/always_use_https`, token);
  if (httpsRes.success) {
    console.log('   Always Use HTTPS: ' + httpsRes.result?.value);
    if (httpsRes.result?.value !== 'on') {
      const setHttps = await api('PATCH', `/zones/${zoneId}/settings/always_use_https`, token, { value: 'on' });
      if (setHttps.success) {
        console.log('   ✓ Always Use HTTPS: acildi');
      }
    } else {
      console.log('   ✓ HTTPS zaten aktif');
    }
  }
  console.log();

  // Summary
  console.log('=== OZET ===');
  console.log('Domain: ' + DOMAIN);
  console.log('Zone ID: ' + zoneId);
  console.log('Pages Project: ' + PAGES_PROJECT);
  console.log('Pages URL: https://' + PAGES_DOMAIN);
  console.log();
  console.log('ONEMLI: Domain saglayicinizda (domain registrar) nameserver\'lari');
  console.log('Cloudflare\'in verdigi NS kayitlarina degistirmeniz gerekiyor.');
  console.log('NS degisikligi yayilmasi 24-48 saat surebilir.');
  console.log();
  
  // Final check - list all DNS records
  console.log('7. Tum DNS kayitlari:');
  const allDns = await api('GET', `/zones/${zoneId}/dns_records?per_page=50`, token);
  if (allDns.success && allDns.result) {
    allDns.result.forEach(r => {
      console.log(`   ${r.type.padEnd(6)} ${r.name.padEnd(30)} → ${r.content} (proxied: ${r.proxied})`);
    });
  }
}

main().catch(err => {
  console.error('HATA:', err.message);
  process.exit(1);
});
