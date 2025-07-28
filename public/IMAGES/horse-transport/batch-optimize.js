const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const images = [
  'Trusted by Champions.jpg',
  'International.jpg',
  'Hero truck horse transport.jpg',
  'Australia wide.jpg',
  'About Us Image.jpg',
  'Magic Millions Logo.jpg',
  'Inglis Logo.png',
  'IRT Logo.png',
  'Truck Logo.png',
];

const sizes = [320, 640, 960, 1200];
const badgeSizes = [64, 128, 256];
const truckLogoSizes = [110, 220, 250];

const optimizedDir = path.join(__dirname, 'optimized');
if (!fs.existsSync(optimizedDir)) {
  fs.mkdirSync(optimizedDir);
}

async function processImage(img, sizeArr, quality = 70) {
  const ext = path.extname(img).toLowerCase();
  const basename = path.basename(img, ext).replace(/\s+/g, '');
  for (const size of sizeArr) {
    const input = path.join(__dirname, img);
    const output = path.join(optimizedDir, `${basename}-${size}w.webp`);
    try {
      await sharp(input)
        .resize({ width: size })
        .webp({ quality })
        .toFile(output);
      console.log(`Optimized ${img} to ${output}`);
    } catch (e) {
      console.error(`Failed on ${img} (${size}w):`, e.message);
    }
  }
}

(async () => {
  for (const img of images) {
    if (img.endsWith('.png') && img !== 'Truck Logo.png') {
      await processImage(img, badgeSizes, 72);
    } else if (img === 'Truck Logo.png') {
      await processImage(img, truckLogoSizes, 75);
    } else {
      await processImage(img, sizes, 68);
    }
  }
  console.log('All conversions complete. WebP images are in ./optimized/');
})();
