const fs = require('fs');
const path = require('path');

function walkDir(dir) {
  let results = [];
  fs.readdirSync(dir).forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      results = results.concat(walkDir(filePath));
    } else {
      results.push(filePath);
    }
  });
  return results;
}

const publicDir = path.resolve(__dirname, '..', 'public');
const srcDir = path.resolve(__dirname, '..', 'src');

// 1. Get all actual image files on disk
const actualFiles = walkDir(path.join(publicDir, 'images')).map(f =>
  '/' + path.relative(publicDir, f).replace(/\\/g, '/')
);

// 2. Get all referenced image paths from source code
const srcFiles = walkDir(srcDir).filter(f => f.endsWith('.ts') || f.endsWith('.tsx'));
const refSet = new Set();

srcFiles.forEach(f => {
  const content = fs.readFileSync(f, 'utf-8');
  const regex = /["'](\/images\/[^"'>\s)]+)/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    refSet.add(match[1]);
  }
});

const referenced = [...refSet].sort();
const actualSet = new Set(actualFiles);

// 3. Find mismatches
console.log('=== MISSING FILES (referenced in code but NOT on disk) ===');
let missingCount = 0;
referenced.forEach(r => {
  if (!actualSet.has(r)) {
    console.log('  MISSING:', r);
    missingCount++;
  }
});
console.log('Total missing:', missingCount);

console.log('');
console.log('=== UNUSED FILES (on disk but NOT referenced in code) ===');
let unusedCount = 0;
actualFiles.sort().forEach(f => {
  if (!refSet.has(f)) {
    console.log('  UNUSED:', f);
    unusedCount++;
  }
});
console.log('Total unused:', unusedCount);

console.log('');
console.log('=== ALL REFERENCED IMAGE PATHS (' + referenced.length + ' unique) ===');
referenced.forEach(r => {
  const exists = actualSet.has(r);
  console.log('  ' + (exists ? 'OK' : 'XX') + '  ' + r);
});

console.log('');
console.log('=== ALL FILES ON DISK (' + actualFiles.length + ' files) ===');
actualFiles.sort().forEach(f => {
  const used = refSet.has(f);
  console.log('  ' + (used ? 'OK' : '--') + '  ' + f);
});
