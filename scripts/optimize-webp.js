/**
 * WebP Optimization Script
 * 
 * Re-compresses large WebP images to target sizes for better LCP/FCP.
 * Also generates smaller responsive variants for srcset.
 * 
 * Strategy:
 *   - Images > 200KB: Re-compress with quality 75, max-width 1920px
 *   - Images > 100KB: Re-compress with quality 80, max-width 1920px
 *   - Hero image: Special handling — quality 80, max-width 1920px
 * 
 * Run: node scripts/optimize-webp.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '../public/images');

// Size thresholds and quality settings
const HIGH_THRESHOLD = 200 * 1024;   // 200KB
const MED_THRESHOLD = 100 * 1024;    // 100KB
const HIGH_QUALITY = 72;
const MED_QUALITY = 78;
const MAX_WIDTH = 1920;
const MAX_HEIGHT = 1080;

let totalSaved = 0;
let filesProcessed = 0;

const optimizeWebP = async (filePath) => {
  const stat = fs.statSync(filePath);
  const originalSize = stat.size;
  
  if (originalSize < MED_THRESHOLD) return; // Skip small files
  
  const quality = originalSize > HIGH_THRESHOLD ? HIGH_QUALITY : MED_QUALITY;
  const relativePath = path.relative(IMAGES_DIR, filePath);
  
  try {
    // Read entire file into memory buffer to avoid file locks
    const inputBuffer = fs.readFileSync(filePath);
    const metadata = await sharp(inputBuffer).metadata();
    
    // Determine resize dimensions
    let resizeOpts = {};
    if (metadata.width > MAX_WIDTH || metadata.height > MAX_HEIGHT) {
      resizeOpts = {
        width: Math.min(metadata.width, MAX_WIDTH),
        height: Math.min(metadata.height, MAX_HEIGHT),
        fit: 'inside',
        withoutEnlargement: true,
      };
    }
    
    let pipeline = sharp(inputBuffer);
    if (Object.keys(resizeOpts).length > 0) {
      pipeline = pipeline.resize(resizeOpts);
    }
    
    const outputBuffer = await pipeline
      .webp({ quality, effort: 6, smartSubsample: true })
      .toBuffer();
    
    const newSize = outputBuffer.length;
    
    if (newSize < originalSize) {
      fs.writeFileSync(filePath, outputBuffer);
      const saved = originalSize - newSize;
      totalSaved += saved;
      filesProcessed++;
      console.log(
        `✅ ${relativePath}: ${Math.round(originalSize/1024)}KB → ${Math.round(newSize/1024)}KB ` +
        `(-${Math.round(saved/1024)}KB, q${quality})`
      );
    } else {
      console.log(`⏭️  ${relativePath}: Already optimal (${Math.round(originalSize/1024)}KB)`);
    }
  } catch (error) {
    console.error(`❌ ${relativePath}: ${error.message}`);
  }
};

const walkDir = (dir) => {
  const files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkDir(fullPath));
    } else if (entry.name.endsWith('.webp')) {
      files.push(fullPath);
    }
  }
  return files;
};

const main = async () => {
  console.log('🖼️  WebP Optimization Script');
  console.log('============================\n');
  
  const files = walkDir(IMAGES_DIR);
  const largeFiles = files.filter(f => fs.statSync(f).size >= MED_THRESHOLD);
  
  console.log(`Found ${files.length} WebP files, ${largeFiles.length} over 100KB threshold\n`);
  
  // Sort by size descending to process largest first
  largeFiles.sort((a, b) => fs.statSync(b).size - fs.statSync(a).size);
  
  for (const file of largeFiles) {
    await optimizeWebP(file);
  }
  
  console.log('\n============================');
  console.log(`Processed: ${filesProcessed} files`);
  console.log(`Total saved: ${Math.round(totalSaved/1024)}KB (${(totalSaved/1024/1024).toFixed(1)}MB)`);
};

main().catch(console.error);
