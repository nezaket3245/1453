const https = require('https');
const fs = require('fs');
const path = require('path');

const ZONE_ID = 'c584fe27d80aaa8a9237ca2fb857cd9c';
const ACCT_ID = '1fb4ac9a140c6e18cf7c8d3c5854aaa9';
const PAGES_DOMAIN = 'egepenakcayap--com2.pages.dev';
const DOMAIN = 'egepenakcayapi.com';

function getToken() {
  const cfgPath = path.join(process.env.APPDATA, 'xdg.config', '.wrangler', 'config', 'default.toml');
  const cfg = fs.readFileSync(cfgPath, 'utf-8');
  const m = cfg.match(/oauth_token\s*=\s*"([^"]+)"/);
  if (!m) throw new Error('No token found');
  return m[1];
}

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
  const token = getToken();
  console.log('Token found, length:', token.length);

  // Step 1: List existing DNS records
  console.log('\n--- Checking existing DNS records ---');
  const listRes = await api(token, 'GET', `/zones/${ZONE_ID}/dns_records`);
  console.log('DNS list status:', listRes.status, 'success:', listRes.success);
  
  if (listRes.status === 403) {
    console.log('\n⚠️  Token does not have DNS permissions.');
    console.log('Trying to create API token with DNS edit permissions...');
    
    // Try to create an API token with DNS permissions
    const tokenRes = await api(token, 'GET', '/user/tokens');
    console.log('Token list status:', tokenRes.status);
    
    // Try getting permission groups
    const pgRes = await api(token, 'GET', '/user/tokens/permission_groups');
    console.log('Permission groups status:', pgRes.status);
    
    if (pgRes.status === 200 && pgRes.result) {
      const dnsEdit = pgRes.result.find(p => p.name === 'DNS Write' || p.name === 'Zone DNS' || p.name.includes('DNS'));
      console.log('DNS permission groups found:', pgRes.result.filter(p => p.name.toLowerCase().includes('dns')).map(p => `${p.id}: ${p.name}`).join(', '));
      
      if (dnsEdit || pgRes.result.length > 0) {
        // Find the right permission group for DNS edit
        const dnsGroups = pgRes.result.filter(p => p.name.toLowerCase().includes('dns'));
        console.log('\nAll DNS-related permission groups:');
        dnsGroups.forEach(g => console.log(`  ${g.id}: ${g.name} (${g.scopes || ''})`));
      }
    }
    
    console.log('\n--- Alternative approach: Using Pages project domain verification ---');
    // Check if custom domains auto-create DNS records
    const domainsRes = await api(token, 'GET', `/accounts/${ACCT_ID}/pages/projects/egepenakcayap--com2/domains`);
    console.log('Custom domains:', JSON.stringify(domainsRes.result, null, 2));
    
    return;
  }

  if (listRes.result) {
    console.log('Existing records:');
    listRes.result.forEach(r => console.log(`  ${r.type} ${r.name} -> ${r.content} (proxied: ${r.proxied})`));
  }

  // Step 2: Add CNAME for root domain
  const rootExists = listRes.result && listRes.result.find(r => r.name === DOMAIN && r.type === 'CNAME');
  if (!rootExists) {
    console.log(`\n--- Adding CNAME for ${DOMAIN} ---`);
    const res = await api(token, 'POST', `/zones/${ZONE_ID}/dns_records`, {
      type: 'CNAME', name: '@', content: PAGES_DOMAIN, proxied: true
    });
    console.log('Root CNAME result:', res.status, res.success, res.errors);
  } else {
    console.log(`Root CNAME already exists`);
  }

  // Step 3: Add CNAME for www
  const wwwExists = listRes.result && listRes.result.find(r => r.name === `www.${DOMAIN}` && r.type === 'CNAME');
  if (!wwwExists) {
    console.log(`\n--- Adding CNAME for www.${DOMAIN} ---`);
    const res = await api(token, 'POST', `/zones/${ZONE_ID}/dns_records`, {
      type: 'CNAME', name: 'www', content: PAGES_DOMAIN, proxied: true
    });
    console.log('WWW CNAME result:', res.status, res.success, res.errors);
  } else {
    console.log(`WWW CNAME already exists`);
  }

  // Step 4: Verify custom domains status
  console.log('\n--- Custom domain status ---');
  const domainsRes = await api(token, 'GET', `/accounts/${ACCT_ID}/pages/projects/egepenakcayap--com2/domains`);
  if (domainsRes.result) {
    domainsRes.result.forEach(d => {
      console.log(`  ${d.name}: status=${d.status}, verify=${d.verification_data?.status}, ssl=${d.validation_data?.status}`);
    });
  }

  console.log('\n✅ Done!');
}

main().catch(e => console.error('Error:', e));
