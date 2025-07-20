import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const TARGET_DIRS = [
  'public/IMAGES/Trades Demo',
  'public/IMAGES/Trades Demo/Icons',
  'public/IMAGES/Trades Demo/Our Work',
];

const exts = ['.png', '.jpg', '.jpeg'];

function getAllImages(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllImages(filePath));
    } else if (exts.includes(path.extname(file).toLowerCase())) {
      results.push(filePath);
    }
  });
  return results;
}

async function convertAndReplace(filePath) {
  const outPath = filePath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
  try {
    await sharp(filePath)
      .webp({ quality: 82 })
      .toFile(outPath);
    fs.unlinkSync(filePath); // Delete the original file
    console.log(`Replaced: ${filePath} -> ${outPath}`);
  } catch (err) {
    console.error(`Failed to convert ${filePath}:`, err);
  }
}

(async () => {
  for (const dir of TARGET_DIRS) {
    const absDir = path.resolve(process.cwd(), dir);
    if (!fs.existsSync(absDir)) {
      console.warn(`Directory not found: ${absDir}`);
      continue;
    }
    const images = getAllImages(absDir);
    for (const img of images) {
      await convertAndReplace(img);
    }
  }
  console.log('All done!');
})(); 