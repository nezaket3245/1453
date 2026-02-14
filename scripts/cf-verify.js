const https = require('https');
const fs = require('fs');
const path = require('path');

const TOKEN = '2AU43Q3CQIyxY_dBaOVKBpRr6JolJeqaxNQVKL_c';
const ZONE = 'c584fe27d80aaa8a9237ca2fb857cd9c';
const ACCT = '1fb4ac9a140c6e18cf7c8d3c5854aaa9';

function api(m,p,b,t){return new Promise((ok,no)=>{const d=b?JSON.stringify(b):'';const o={hostname:'api.cloudflare.com',port:443,path:'/client/v4'+p,method:m,headers:{'Authorization':'Bearer '+(t||TOKEN),'Content-Type':'application/json'}};if(d)o.headers['Content-Length']=Buffer.byteLength(d);const r=https.request(o,res=>{let s='';res.on('data',c=>s+=c);res.on('end',()=>{try{ok(JSON.parse(s))}catch{ok({raw:s})}})});r.on('error',no);if(d)r.write(d);r.end()})}

async function main(){
  console.log('=== DNS KAYITLARI ===');
  const recs = await api('GET','/zones/'+ZONE+'/dns_records');
  recs.result.filter(r=>r.name==='egepenakcayapi.com'||r.name==='www.egepenakcayapi.com').forEach(r=>{
    console.log('  '+r.type+' '+r.name+' -> '+r.content+' (proxied:'+r.proxied+')');
  });

  console.log('\n=== CUSTOM DOMAIN DURUMU ===');
  const cfgPath = path.join(process.env.APPDATA,'xdg.config','.wrangler','config','default.toml');
  const cfg = fs.readFileSync(cfgPath,'utf-8');
  const m = cfg.match(/oauth_token\s*=\s*"([^"]+)"/);
  const d = await api('GET','/accounts/'+ACCT+'/pages/projects/egepenakcayap--com2/domains',null,m[1]);
  d.result.forEach(dd=>console.log('  '+dd.name+': status='+dd.status+', verify='+(dd.verification_data||{}).status+', ssl='+(dd.validation_data||{}).status));
}
main().catch(e=>console.error(e));
