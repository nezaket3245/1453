/**
 * Fix double-encoded UTF-8 Turkish characters in source files.
 * 
 * The files were corrupted: original UTF-8 bytes were interpreted as
 * Windows-1252 / Latin-1 and re-saved as UTF-8, causing mojibake.
 * 
 * This script reverses the process at the byte level.
 */
const fs = require('fs');
const path = require('path');

const base = path.resolve(__dirname, '..');

const files = [
    'src/app/layout.tsx',
    'src/app/page.tsx',
    'src/app/hakkimizda/page.tsx',
    'src/app/hizmetler/page.tsx',
    'src/app/iletisim/page.tsx',
    'src/app/urunler/page.tsx',
];

// Windows-1252 byte mapping for 0x80-0x9F range
const win1252 = {
    0x80: 0x20AC, 0x82: 0x201A, 0x83: 0x0192, 0x84: 0x201E,
    0x85: 0x2026, 0x86: 0x2020, 0x87: 0x2021, 0x88: 0x02C6,
    0x89: 0x2030, 0x8A: 0x0160, 0x8B: 0x2039, 0x8C: 0x0152,
    0x8E: 0x017D, 0x91: 0x2018, 0x92: 0x2019, 0x93: 0x201C,
    0x94: 0x201D, 0x95: 0x2022, 0x96: 0x2013, 0x97: 0x2014,
    0x98: 0x02DC, 0x99: 0x2122, 0x9A: 0x0161, 0x9B: 0x203A,
    0x9C: 0x0153, 0x9E: 0x017E, 0x9F: 0x0178,
};

function byteToCodePoint(b) {
    return (b >= 0x80 && b <= 0x9F && win1252[b] !== undefined) ? win1252[b] : b;
}

// Characters that may have been double-encoded
const chars = [
    // Turkish characters
    { correct: '\u00E7', utf8: [0xC3, 0xA7] },  // ç
    { correct: '\u00C7', utf8: [0xC3, 0x87] },  // Ç
    { correct: '\u011F', utf8: [0xC4, 0x9F] },  // ğ
    { correct: '\u011E', utf8: [0xC4, 0x9E] },  // Ğ
    { correct: '\u0131', utf8: [0xC4, 0xB1] },  // ı
    { correct: '\u0130', utf8: [0xC4, 0xB0] },  // İ
    { correct: '\u00F6', utf8: [0xC3, 0xB6] },  // ö
    { correct: '\u00D6', utf8: [0xC3, 0x96] },  // Ö
    { correct: '\u015F', utf8: [0xC5, 0x9F] },  // ş
    { correct: '\u015E', utf8: [0xC5, 0x9E] },  // Ş
    { correct: '\u00FC', utf8: [0xC3, 0xBC] },  // ü
    { correct: '\u00DC', utf8: [0xC3, 0x9C] },  // Ü
    // Common special characters
    { correct: '\u2714', utf8: [0xE2, 0x9C, 0x94] },  // ✔
    { correct: '\u2705', utf8: [0xE2, 0x9C, 0x85] },  // ✅
    { correct: '\u260E', utf8: [0xE2, 0x98, 0x8E] },  // ☎
    { correct: '\u20BA', utf8: [0xE2, 0x82, 0xBA] },  // ₺
    { correct: '\u2014', utf8: [0xE2, 0x80, 0x94] },  // —
    { correct: '\u2013', utf8: [0xE2, 0x80, 0x93] },  // –
    { correct: '\u2019', utf8: [0xE2, 0x80, 0x99] },  // '
    { correct: '\u201C', utf8: [0xE2, 0x80, 0x9C] },  // "
    { correct: '\u201D', utf8: [0xE2, 0x80, 0x9D] },  // "
    { correct: '\u2022', utf8: [0xE2, 0x80, 0xA2] },  // •
    { correct: '\u2026', utf8: [0xE2, 0x80, 0xA6] },  // …
];

// Build the replacement map: mojibake string → correct string
const replacements = chars.map(({ correct, utf8 }) => {
    const mojibake = utf8.map(b => String.fromCodePoint(byteToCodePoint(b))).join('');
    return { from: mojibake, to: correct };
});

// Sort by length descending (replace longer mojibake sequences first)
replacements.sort((a, b) => b.from.length - a.from.length);

let totalChanges = 0;

for (const file of files) {
    const filePath = path.join(base, file);
    if (!fs.existsSync(filePath)) {
        console.log(`SKIP (not found): ${file}`);
        continue;
    }

    let content = fs.readFileSync(filePath, 'utf8');
    let changes = 0;

    for (const { from, to } of replacements) {
        const parts = content.split(from);
        if (parts.length > 1) {
            changes += parts.length - 1;
            content = parts.join(to);
        }
    }

    if (changes > 0) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`FIXED: ${file} (${changes} replacements)`);
        totalChanges += changes;
    } else {
        console.log(`OK (no changes): ${file}`);
    }
}

console.log(`\nTotal: ${totalChanges} replacements across ${files.length} files`);
