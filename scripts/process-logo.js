const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function processLogo() {
  const srcPath = 'C:/Users/jkhay/.gemini/antigravity/brain/f6474f28-b763-48f4-97c9-45547a1268d9/.user_uploaded/media_1790131223984.jpg';
  const projectRoot = path.resolve(__dirname, '..');
  const outDir = path.join(projectRoot, 'public', 'brand');

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // 1. Copy raw file
  fs.copyFileSync(srcPath, path.join(outDir, 'church-original.jpg'));

  // 2. Read image buffer
  const image = sharp(srcPath);
  const { data, info } = await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  // 3. Flood fill outer white background to create transparency
  const visited = new Uint8Array(width * height);
  const isOuterBg = new Uint8Array(width * height);
  const queue = [];

  // Seed borders
  for (let x = 0; x < width; x++) {
    const topIdx = x;
    const botIdx = (height - 1) * width + x;
    const isTopWhite = data[topIdx * channels] > 230 && data[topIdx * channels + 1] > 230 && data[topIdx * channels + 2] > 230;
    const isBotWhite = data[botIdx * channels] > 230 && data[botIdx * channels + 1] > 230 && data[botIdx * channels + 2] > 230;
    if (isTopWhite && !visited[topIdx]) { visited[topIdx] = 1; queue.push(topIdx); }
    if (isBotWhite && !visited[botIdx]) { visited[botIdx] = 1; queue.push(botIdx); }
  }
  for (let y = 0; y < height; y++) {
    const leftIdx = y * width;
    const rightIdx = y * width + (width - 1);
    const isLeftWhite = data[leftIdx * channels] > 230 && data[leftIdx * channels + 1] > 230 && data[leftIdx * channels + 2] > 230;
    const isRightWhite = data[rightIdx * channels] > 230 && data[rightIdx * channels + 1] > 230 && data[rightIdx * channels + 2] > 230;
    if (isLeftWhite && !visited[leftIdx]) { visited[leftIdx] = 1; queue.push(leftIdx); }
    if (isRightWhite && !visited[rightIdx]) { visited[rightIdx] = 1; queue.push(rightIdx); }
  }

  let head = 0;
  while (head < queue.length) {
    const curr = queue[head++];
    isOuterBg[curr] = 1;
    const cx = curr % width;
    const cy = Math.floor(curr / width);

    const neighbors = [
      cx > 0 ? curr - 1 : -1,
      cx < width - 1 ? curr + 1 : -1,
      cy > 0 ? curr - width : -1,
      cy < height - 1 ? curr + width : -1
    ];

    for (const n of neighbors) {
      if (n !== -1 && !visited[n]) {
        visited[n] = 1;
        const r = data[n * channels];
        const g = data[n * channels + 1];
        const b = data[n * channels + 2];
        if (r > 215 && g > 215 && b > 215) {
          queue.push(n);
        }
      }
    }
  }

  console.log(`Flood filled ${queue.length} background pixels out of ${width * height}`);

  // Create transparent PNG of church silhouette
  const rgbaBuffer = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    rgbaBuffer[i * 4] = data[i * channels];
    rgbaBuffer[i * 4 + 1] = data[i * channels + 1];
    rgbaBuffer[i * 4 + 2] = data[i * channels + 2];
    rgbaBuffer[i * 4 + 3] = isOuterBg[i] ? 0 : 255;
  }

  await sharp(rgbaBuffer, { raw: { width, height, channels: 4 } })
    .png()
    .toFile(path.join(outDir, 'church-logo-transparent.png'));

  // Create circular crest on parchment background with gold trim (512x512)
  const size = 512;
  const resized = await sharp(rgbaBuffer, { raw: { width, height, channels: 4 } })
    .resize(380, 380, { fit: 'inside' })
    .png()
    .toBuffer();

  const circleSvg = Buffer.from(`
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FFFDF7" />
          <stop offset="85%" stop-color="#FAF4E6" />
          <stop offset="100%" stop-color="#EADEC3" />
        </radialGradient>
      </defs>
      <circle cx="${size/2}" cy="${size/2}" r="${size/2 - 4}" fill="url(#bg)" stroke="#D4AF37" stroke-width="8" />
      <circle cx="${size/2}" cy="${size/2}" r="${size/2 - 14}" fill="none" stroke="#8B2500" stroke-width="2" stroke-dasharray="6,4" />
    </svg>
  `);

  await sharp(circleSvg)
    .composite([{ input: resized, gravity: 'center' }])
    .png()
    .toFile(path.join(outDir, 'church-seal-round.png'));

  // Also create circular crest on deep navy background with gold church silhouette (for app icons & header)
  const navyCircleSvg = Buffer.from(`
    <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="navyBg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#0f2b48" />
          <stop offset="100%" stop-color="#051829" />
        </radialGradient>
      </defs>
      <circle cx="${size/2}" cy="${size/2}" r="${size/2 - 4}" fill="url(#navyBg)" stroke="#D4AF37" stroke-width="8" />
      <circle cx="${size/2}" cy="${size/2}" r="${size/2 - 14}" fill="none" stroke="#D4AF37" stroke-width="1.5" opacity="0.6" />
    </svg>
  `);

  // Gold church silhouette on navy
  const goldRgba = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    if (isOuterBg[i]) {
      goldRgba[i * 4 + 3] = 0;
    } else {
      const r = data[i * channels];
      const isDarkChurch = r < 128;
      if (isDarkChurch) {
        goldRgba[i * 4] = 222;     // R
        goldRgba[i * 4 + 1] = 185; // G
        goldRgba[i * 4 + 2] = 70;  // B (Warm radiant Orthodox gold)
        goldRgba[i * 4 + 3] = 255;
      } else {
        // inner details & sky
        goldRgba[i * 4] = 255;
        goldRgba[i * 4 + 1] = 255;
        goldRgba[i * 4 + 2] = 255;
        goldRgba[i * 4 + 3] = 255;
      }
    }
  }

  const resizedGold = await sharp(goldRgba, { raw: { width, height, channels: 4 } })
    .resize(380, 380, { fit: 'inside' })
    .png()
    .toBuffer();

  await sharp(navyCircleSvg)
    .composite([{ input: resizedGold, gravity: 'center' }])
    .png()
    .toFile(path.join(outDir, 'church-app-icon.png'));

  // Save standard app icons in public/
  await sharp(path.join(outDir, 'church-app-icon.png'))
    .resize(192, 192)
    .toFile(path.join(projectRoot, 'public', 'icon-192.png'));

  await sharp(path.join(outDir, 'church-app-icon.png'))
    .resize(512, 512)
    .toFile(path.join(projectRoot, 'public', 'icon-512.png'));

  await sharp(path.join(outDir, 'church-app-icon.png'))
    .resize(180, 180)
    .toFile(path.join(projectRoot, 'public', 'apple-touch-icon.png'));

  await sharp(path.join(outDir, 'church-seal-round.png'))
    .resize(64, 64)
    .toFile(path.join(projectRoot, 'public', 'favicon.png'));

  console.log('Successfully generated all brand assets in public/brand and public/');
}

processLogo().catch(err => {
  console.error('Error generating assets:', err);
  process.exit(1);
});
