const fs = require('fs');

const files = [
  'src/app/hizmetler/page.tsx',
  'src/app/iletisim/page.tsx'
];

const mojibake = '\u00E2\u201D\u20AC';
const replacement = '\u2500'; // ─ box-drawing horizontal

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  const count = content.split(mojibake).length - 1;
  if (count > 0) {
    content = content.split(mojibake).join(replacement);
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Fixed ${count} box-drawing chars in ${file}`);
  } else {
    console.log(`No matches in ${file}`);
  }
}
