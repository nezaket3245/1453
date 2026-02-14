async function check(url) {
  try {
    const r = await fetch(url, {redirect:'follow'});
    const t = await r.text();
    const title = t.match(/<title>(.*?)<\/title>/)?.[1] || 'no title';
    const bodyLen = t.length;
    const hasError = t.includes('Application error') || t.includes('Internal Server Error') || t.includes('__next_error');
    const flag = hasError ? ' *** ERROR ***' : '';
    console.log(`${r.status} | ${String(bodyLen).padStart(7)}b | ${url.replace('https://egepenakcayapi.com','')||'/'} | ${title.substring(0,70)}${flag}`);
  } catch(e) { console.log(`ERR | ${url} | ${e.message}`); }
}

async function main() {
  const base = 'https://egepenakcayapi.com';
  const paths = [
    '/','/hakkimizda','/iletisim','/urunler','/hizmetler','/projeler',
    '/blog','/sss','/teklif-al','/pvc-sistemleri','/cam-balkon-sistemleri',
    '/aluminyum-sistemleri','/sineklik-sistemleri','/panjur-kepenk-sistemleri',
    '/dusakabin-sistemleri','/tamir-bakim','/cozumler','/gizlilik-politikasi'
  ];
  console.log('Status | Size     | Path | Title');
  console.log('------|----------|------|------');
  for (const p of paths) {
    await check(base+p);
  }
  
  // Also check a few sub-pages
  console.log('\n--- Sub pages ---');
  const subpaths = [
    '/pvc-sistemleri/pvc-pencere','/cam-balkon-sistemleri/katlanir-cam-balkon',
    '/urunler/pvc-sistemleri','/blog/kislik-pencere-yalitimi',
    '/sineklik-sistemleri/plise-sineklik-dikey','/projeler'
  ];
  for (const p of subpaths) {
    await check(base+p);
  }
}
main();
