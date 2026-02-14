const https = require('https');
const querystring = require('querystring');
const crypto = require('crypto');

function httpReq(opts, data) {
  return new Promise((resolve, reject) => {
    const req = https.request(opts, res => {
      let body = '';
      res.on('data', c => body += c);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body }));
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

function getCookies(res) {
  if (!res.headers['set-cookie']) return '';
  return res.headers['set-cookie'].map(c => c.split(';')[0]).join('; ');
}

async function main() {
  // Step 1: Get login page
  console.log('=== Step 1: Getting login page ===');
  const loginPage = await httpReq({
    hostname: 'www.ihs.com.tr',
    path: '/edestek/login.html',
    method: 'GET',
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
  });
  
  let cookies = getCookies(loginPage);
  console.log('Session:', cookies);
  
  // Extract sessionId from page source
  const sessionMatch = loginPage.body.match(/sessionId\.value\s*=\s*'([^']+)'/);
  const sessionId = sessionMatch ? sessionMatch[1] : 'unknown';
  console.log('SessionId from page:', sessionId);
  
  // Extract IP from page source
  const ipMatch = loginPage.body.match(/ipAddress\.value\s*=\s*'([^']+)'/);
  const ipAddress = ipMatch ? ipMatch[1] : '0.0.0.0';
  console.log('IP from page:', ipAddress);

  // Step 2: Login with all required fields
  console.log('\n=== Step 2: Logging in with Sait5316., ===');
  const fakeFingerprint = crypto.randomBytes(16).toString('hex');
  
  const loginData = querystring.stringify({
    username: 'egepen.akcayapi@gmail.com',
    password: 'Sait5316.,',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    ipAddress: ipAddress,
    sessionId: sessionId,
    fingerPrint: fakeFingerprint
  });
  
  const loginRes = await httpReq({
    hostname: 'www.ihs.com.tr',
    path: '/edestek/perform_login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(loginData),
      'Cookie': cookies,
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      'Referer': 'https://www.ihs.com.tr/edestek/login.html',
      'Origin': 'https://www.ihs.com.tr'
    }
  }, loginData);
  
  console.log('Login status:', loginRes.status);
  console.log('Location:', loginRes.headers.location);
  const newCookies = getCookies(loginRes);
  if (newCookies) cookies = newCookies;
  
  const loginSuccess = loginRes.headers.location && !loginRes.headers.location.includes('error');
  console.log('Login success:', loginSuccess);
  
  if (!loginSuccess) {
    console.log('\nLogin failed. Trying without extra fields...');
    // Try simple POST
    const simpleData = querystring.stringify({
      username: 'egepen.akcayapi@gmail.com',
      password: 'Sait5316.,'
    });
    
    // Get fresh session
    const freshPage = await httpReq({
      hostname: 'www.ihs.com.tr',
      path: '/edestek/login.html',
      method: 'GET',
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    });
    cookies = getCookies(freshPage);
    
    const simpleRes = await httpReq({
      hostname: 'www.ihs.com.tr',
      path: '/edestek/perform_login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(simpleData),
        'Cookie': cookies,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://www.ihs.com.tr/edestek/login.html'
      }
    }, simpleData);
    console.log('Simple login status:', simpleRes.status);
    console.log('Simple location:', simpleRes.headers.location);
    
    if (simpleRes.headers.location && !simpleRes.headers.location.includes('error')) {
      console.log('>>> SIMPLE LOGIN SUCCEEDED!');
      const nc = getCookies(simpleRes);
      if (nc) cookies = nc;
    } else {
      console.log('Both login attempts failed.');
      return;
    }
  }
  
  // Step 3: Follow redirect to main menu
  const redirectPath = loginRes.headers.location ? loginRes.headers.location.replace('https://www.ihs.com.tr', '') : '/edestek/mainMenu.html';
  console.log('\n=== Step 3: Following redirect to', redirectPath, '===');
  const mainMenu = await httpReq({
    hostname: 'www.ihs.com.tr',
    path: redirectPath.startsWith('/') ? redirectPath : '/edestek/' + redirectPath,
    method: 'GET',
    headers: { 'Cookie': cookies, 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
  });
  const nc = getCookies(mainMenu);
  if (nc) cookies = nc;
  console.log('Main menu status:', mainMenu.status);
  
  // Find domain management links
  const allLinks = mainMenu.body.match(/href="[^"]+"/gi) || [];
  console.log('\n=== ALL MENU LINKS ===');
  allLinks.forEach(l => console.log(l));
  
  // Check if we're still on login page
  if (mainMenu.body.includes('loginForm') || mainMenu.body.includes('perform_login')) {
    console.log('\n>>> Still on login page - authentication failed');
  } else if (mainMenu.body.includes('egepenakcayapi') || mainMenu.body.includes('domain') || mainMenu.body.includes('alan')) {
    console.log('\n>>> Logged in successfully!');
  }
}

main().catch(console.error);
