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
  // Get login page full source
  const page = await httpReq({
    hostname: 'www.ihs.com.tr',
    path: '/edestek/login.html',
    method: 'GET',
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });

  // Find submitForm function
  const idx = page.body.indexOf('function submitForm');
  if (idx > -1) {
    console.log('=== submitForm FUNCTION ===');
    console.log(page.body.substring(idx, idx + 1500));
  }

  // Find all hidden input references
  const fpIdx = page.body.indexOf('fingerPrintJS');
  if (fpIdx > -1) {
    console.log('\n=== FINGERPRINT CONTEXT ===');
    console.log(page.body.substring(fpIdx - 200, fpIdx + 800));
  }
}

main().catch(console.error);
