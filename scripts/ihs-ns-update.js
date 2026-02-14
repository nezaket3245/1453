const https = require('https');
const querystring = require('querystring');

function httpRequest(options, postData) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body }));
    });
    req.on('error', reject);
    if (postData) req.write(postData);
    req.end();
  });
}

function getCookies(res) {
  if (!res.headers['set-cookie']) return '';
  return res.headers['set-cookie'].map(c => c.split(';')[0]).join('; ');
}

async function main() {
  // Step 1: Get login page and session cookie
  console.log('=== Step 1: Getting login page ===');
  const loginPage = await httpRequest({
    hostname: 'www.ihs.com.tr',
    path: '/edestek/login.html',
    method: 'GET',
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  
  let cookies = getCookies(loginPage);
  console.log('Session:', cookies);
  
  // Step 2: Login
  console.log('\n=== Step 2: Logging in ===');
  const loginData = querystring.stringify({
    username: 'egepen.akcayapi@gmail.com',
    password: 'Sait5216.,'
  });
  
  const loginRes = await httpRequest({
    hostname: 'www.ihs.com.tr',
    path: '/edestek/perform_login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(loginData),
      'Cookie': cookies,
      'User-Agent': 'Mozilla/5.0',
      'Referer': 'https://www.ihs.com.tr/edestek/login.html'
    }
  }, loginData);
  
  console.log('Login status:', loginRes.status);
  console.log('Location:', loginRes.headers.location);
  const newCookies = getCookies(loginRes);
  if (newCookies) cookies = newCookies;
  console.log('Cookies:', cookies);
  
  // Step 3: Follow redirect to main menu
  if (loginRes.status === 302 || loginRes.status === 301) {
    const redirectPath = loginRes.headers.location.replace('https://www.ihs.com.tr', '');
    console.log('\n=== Step 3: Following redirect to', redirectPath, '===');
    const mainMenu = await httpRequest({
      hostname: 'www.ihs.com.tr',
      path: redirectPath,
      method: 'GET',
      headers: { 'Cookie': cookies, 'User-Agent': 'Mozilla/5.0' }
    });
    console.log('Main menu status:', mainMenu.status);
    const nc = getCookies(mainMenu);
    if (nc) cookies = nc;
    
    // Step 4: Navigate to domain list page
    console.log('\n=== Step 4: Looking for domain management links ===');
    const links = mainMenu.body.match(/href="[^"]*[Dd]omain[^"]*"|href="[^"]*[Aa]lan[^"]*"|href="[^"]*[Nn]ame[Ss]erver[^"]*"|href="[^"]*dns[^"]*"|href="[^"]*ns[^"]*"/gi) || [];
    links.forEach(l => console.log('LINK:', l));
    
    // Also look for any href with common domain management patterns
    const allLinks = mainMenu.body.match(/href="[^"]+"/gi) || [];
    allLinks.forEach(l => {
      const lower = l.toLowerCase();
      if (lower.includes('domain') || lower.includes('alan') || lower.includes('nameserver') || lower.includes('dns') || lower.includes('ns')) {
        console.log('DOMAIN_LINK:', l);
      }
    });
    
    // Try common IHS domain management paths
    const domainPaths = [
      '/edestek/domain/domainList.html',
      '/edestek/domainList.html',
      '/edestek/domain/list.html',
      '/edestek/domains.html',
      '/edestek/domain.html'
    ];
    
    for (const path of domainPaths) {
      const res = await httpRequest({
        hostname: 'www.ihs.com.tr',
        path: path,
        method: 'GET',
        headers: { 'Cookie': cookies, 'User-Agent': 'Mozilla/5.0' }
      });
      if (res.status === 200 && res.body.length > 500) {
        console.log('\n>>> FOUND domain page at:', path, '(size:', res.body.length, ')');
        // Look for NS update form or link
        const nsLinks = res.body.match(/href="[^"]*[Nn]ame[Ss]erver[^"]*"|href="[^"]*ns[^"]*update[^"]*"|href="[^"]*nsUpdate[^"]*"/gi) || [];
        nsLinks.forEach(l => console.log('NS_LINK:', l));
        
        // Look for domain egepenakcayapi
        if (res.body.includes('egepenakcayapi')) {
          console.log('>>> Domain egepenakcayapi.com FOUND on this page!');
          // Extract relevant section
          const idx = res.body.indexOf('egepenakcayapi');
          console.log('Context:', res.body.substring(Math.max(0, idx - 200), idx + 500));
        }
        break;
      }
    }
  }
}

main().catch(console.error);
