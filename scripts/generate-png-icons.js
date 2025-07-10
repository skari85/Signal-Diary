const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const input = path.join(__dirname, '../public/signal-diary-logo.png');
const outputDir = path.join(__dirname, '../public/icons');

const sizes = [16, 32, 72, 96, 128, 144, 152, 192, 384, 512];

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

(async () => {
  for (const size of sizes) {
    const outPath = path.join(outputDir, `icon-${size}x${size}.png`);
    await sharp(input)
      .resize(size, size)
      .png()
      .toFile(outPath);
    console.log(`Generated ${outPath}`);
  }
  console.log('All icons generated!');
})(); 