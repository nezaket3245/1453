const fs = require('fs');
const https = require('https');
const path = require('path');

// Read OAuth token from wrangler config
const configPath = path.join(process.env.APPDATA, 'xdg.config', '.wrangler', 'config', 'default.toml');
const config = fs.readFileSync(configPath, 'utf-8');
const tokenMatch = config.match(/oauth_token\s*=\s*"([^"]+)"/);
if (!tokenMatch) { console.log('Token not found!'); process.exit(1); }
const TOKEN = tokenMatch[1];

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
  // List all zones
  console.log('=== Tüm Zone\'lar ===');
  const zones = await cfApi('GET', '/zones?per_page=50');
  if (zones.result) {
    zones.result.forEach(z => {
      console.log(`  ${z.name} | status: ${z.status} | ID: ${z.id}`);
      console.log(`    NS: ${(z.name_servers || []).join(', ')}`);
    });
  }
  
  // Delete typo zone
  const typo = zones.result?.find(z => z.name === 'egepemakcayapi.com');
  if (typo) {
    console.log('\n=== Typo zone siliniyor: egepemakcayapi.com ===');
    const del = await cfApi('DELETE', `/zones/${typo.id}`);
    console.log('  Sonuc:', del.success ? 'SILINDI' : JSON.stringify(del.errors));
  }
  
  // Get correct zone details
  const correct = zones.result?.find(z => z.name === 'egepenakcayapi.com');
  if (correct) {
    console.log('\n=== egepenakcayapi.com Zone Detaylari ===');
    console.log('  ID:', correct.id);
    console.log('  Status:', correct.status);
    console.log('  NS:', (correct.name_servers || []).join(', '));
    
    // Try to add Pages custom domain
    const ACCT_ID = '2f8a9910120689f4f86f06fb6637f9b2';
    
    // List Pages projects first
    console.log('\n=== Pages Projeleri ===');
    const projects = await cfApi('GET', `/accounts/${ACCT_ID}/pages/projects`);
    if (projects.result) {
      projects.result.forEach(p => {
        console.log(`  ${p.name} | ${p.subdomain} | domains: ${JSON.stringify(p.domains)}`);
      });
    }
    
    // Find the right project
    const project = projects.result?.find(p => p.name === 'akcapen-yeni') || projects.result?.[0];
    if (project) {
      console.log(`\n=== Custom Domain Ekleniyor: ${project.name} ===`);
      
      // Add egepenakcayapi.com
      console.log('\n  Adding egepenakcayapi.com...');
      const add1 = await cfApi('POST', `/accounts/${ACCT_ID}/pages/projects/${project.name}/domains`, {
        name: 'egepenakcayapi.com'
      });
      console.log('  Sonuc:', add1.success ? 'EKLENDI' : JSON.stringify(add1.errors));
      
      // Add www.egepenakcayapi.com
      console.log('\n  Adding www.egepenakcayapi.com...');
      const add2 = await cfApi('POST', `/accounts/${ACCT_ID}/pages/projects/${project.name}/domains`, {
        name: 'www.egepenakcayapi.com'
      });
      console.log('  Sonuc:', add2.success ? 'EKLENDI' : JSON.stringify(add2.errors));
    }
    
    // Add DNS CNAME records
    console.log('\n=== DNS CNAME Kayitlari ===');
    
    // Add CNAME for @ (root)
    console.log('  Adding CNAME @ -> akcapen-yeni.pages.dev...');
    const cname1 = await cfApi('POST', `/zones/${correct.id}/dns_records`, {
      type: 'CNAME',
      name: 'egepenakcayapi.com',
      content: 'akcapen-yeni.pages.dev',
      proxied: true
    });
    console.log('  Sonuc:', cname1.success ? 'EKLENDI' : JSON.stringify(cname1.errors));
    
    // Add CNAME for www
    console.log('  Adding CNAME www -> akcapen-yeni.pages.dev...');
    const cname2 = await cfApi('POST', `/zones/${correct.id}/dns_records`, {
      type: 'CNAME',
      name: 'www',
      content: 'akcapen-yeni.pages.dev',
      proxied: true
    });
    console.log('  Sonuc:', cname2.success ? 'EKLENDI' : JSON.stringify(cname2.errors));
    
    // List DNS records
    console.log('\n=== DNS Kayitlari ===');
    const dns = await cfApi('GET', `/zones/${correct.id}/dns_records`);
    if (dns.result) {
      dns.result.forEach(r => {
        console.log(`  ${r.type} ${r.name} -> ${r.content} (proxied: ${r.proxied})`);
      });
    }
    
    console.log('\n=== NAMESERVER BILGILERI ===');
    console.log('Domain firmanizda bu nameserver\'lari ayarlayin:');
    console.log('  1. jule.ns.cloudflare.com');
    console.log('  2. lamar.ns.cloudflare.com');
  } else {
    console.log('\n✗ egepenakcayapi.com zone bulunamadi!');
  }
}

main().catch(err => console.error('Hata:', err.message));
