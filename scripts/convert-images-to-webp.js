/**
 * Image Optimization Script - Convert to WebP
 * 
 * This script converts all JPG/PNG images to WebP format
 * for better performance and smaller file sizes.
 * 
 * Run: node scripts/convert-images-to-webp.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '../public/images');
const QUALITY = 85; // WebP quality (0-100)

// Directories to process
const processDirectory = async (dir) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    
    if (entry.isDirectory()) {
      await processDirectory(fullPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        const webpPath = fullPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
        
        // Skip if WebP already exists and is newer
        if (fs.existsSync(webpPath)) {
          const originalStat = fs.statSync(fullPath);
          const webpStat = fs.statSync(webpPath);
          if (webpStat.mtime >= originalStat.mtime) {
            console.log(`⏭️  Skipping (WebP exists): ${entry.name}`);
            continue;
          }
        }
        
        try {
          const originalSize = fs.statSync(fullPath).size;
          
          await sharp(fullPath)
            .webp({ quality: QUALITY })
            .toFile(webpPath);
          
          const webpSize = fs.statSync(webpPath).size;
          const savings = ((1 - webpSize / originalSize) * 100).toFixed(1);
          
          console.log(`✅ ${entry.name} → WebP (${savings}% smaller)`);
        } catch (error) {
          console.error(`❌ Error converting ${entry.name}:`, error.message);
        }
      }
    }
  }
};

// Summary statistics
const getStats = (dir) => {
  let totalOriginal = 0;
  let totalWebP = 0;
  let count = 0;
  
  const scan = (d) => {
    const entries = fs.readdirSync(d, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(d, entry.name);
      if (entry.isDirectory()) {
        scan(fullPath);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (['.jpg', '.jpeg', '.png'].includes(ext)) {
          totalOriginal += fs.statSync(fullPath).size;
          const webpPath = fullPath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
          if (fs.existsSync(webpPath)) {
            totalWebP += fs.statSync(webpPath).size;
            count++;
          }
        }
      }
    }
  };
  
  scan(dir);
  return { totalOriginal, totalWebP, count };
};

// Main execution
console.log('🖼️  Starting image conversion to WebP...\n');
processDirectory(IMAGES_DIR).then(() => {
  console.log('\n📊 Conversion complete!\n');
  
  const stats = getStats(IMAGES_DIR);
  console.log(`📁 Images converted: ${stats.count}`);
  console.log(`📦 Original total: ${(stats.totalOriginal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`📦 WebP total: ${(stats.totalWebP / 1024 / 1024).toFixed(2)} MB`);
  console.log(`💾 Total savings: ${((1 - stats.totalWebP / stats.totalOriginal) * 100).toFixed(1)}%`);
});
