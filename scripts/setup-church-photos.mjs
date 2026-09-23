import fs from 'fs';
import path from 'path';

const srcDir = path.resolve('church photo');
const destDir = path.resolve('public', 'church-photos');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Special mappings for named photos
const SPECIAL_NAMES = {
  '0IMG_8045天国への扉.jpg': 'royal-doors-iconostasis.jpg',
  '大阪教会全景.jpg': 'osaka-church-panoramic.jpg',
  'Sunset bright edited.JPG': 'church-sunset-bright.jpg',
  'Sunset Edited.JPG': 'church-sunset-evening.jpg',
  'IMG_7462vespers.jpg': 'vespers-candlelight.jpg',
  '_DSC0824light児島正一.jpg': 'church-altar-light.jpg',
};

const files = fs.readdirSync(srcDir);
const photoCatalog = [];

for (const file of files) {
  const ext = path.extname(file).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
    continue;
  }

  let cleanName = SPECIAL_NAMES[file];
  if (!cleanName) {
    cleanName = file
      .replace(/\.[^/.]+$/, '')
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '') + ext;
  }

  const srcPath = path.join(srcDir, file);
  const destPath = path.join(destDir, cleanName);

  fs.copyFileSync(srcPath, destPath);

  const stats = fs.statSync(destPath);
  photoCatalog.push({
    original: file,
    url: `/church-photos/${cleanName}`,
    cleanName,
    sizeKb: Math.round(stats.size / 1024),
  });
}

console.log(`Successfully mapped and copied ${photoCatalog.length} photos!`);

// Save photo catalog JSON
fs.writeFileSync(
  path.resolve('src', 'data', 'churchPhotosCatalog.json'),
  JSON.stringify(photoCatalog, null, 2),
  'utf-8'
);
