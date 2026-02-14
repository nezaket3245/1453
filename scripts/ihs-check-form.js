const https = require('https');

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

async function main() {
  const page = await httpReq({
    hostname: 'www.ihs.com.tr',
    path: '/edestek/login.html',
    method: 'GET',
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });

  // Find the login form
  const formStart = page.body.indexOf('id="loginForm"');
  if (formStart > -1) {
    const sectionStart = page.body.lastIndexOf('<form', formStart);
    const sectionEnd = page.body.indexOf('</form>', formStart);
    const formHtml = page.body.substring(sectionStart, sectionEnd + 7);
    console.log('=== LOGIN FORM ===');
    console.log(formHtml);
  }

  // Find any hidden inputs
  const hiddenInputs = page.body.match(/<input[^>]*type\s*=\s*["']hidden["'][^>]*>/gi) || [];
  console.log('\n=== HIDDEN INPUTS ===');
  hiddenInputs.forEach(i => console.log(i));

  // Find any CSRF tokens
  if (page.body.includes('_csrf') || page.body.includes('csrf') || page.body.includes('token')) {
    console.log('\n>>> CSRF/Token pattern found in page');
  }

  // Check Angular controller for login
  const ngControllers = page.body.match(/controller\s*\(\s*['"][^'"]+['"]/gi) || [];
  console.log('\n=== NG CONTROLLERS ===');
  ngControllers.forEach(c => console.log(c));

  // Find all script blocks related to login
  const scriptBlocks = page.body.match(/<script[^>]*>[^<]*login[^<]*<\/script>/gi) || [];
  console.log('\n=== LOGIN SCRIPTS ===');
  scriptBlocks.forEach(s => console.log(s.substring(0, 500)));
}

main().catch(console.error);
