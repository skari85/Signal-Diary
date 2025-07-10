const fs = require('fs');
const path = require('path');

// Create a simple SVG icon for testing
const createIconSVG = (size) => `
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${size}" height="${size}" fill="#f59e0b"/>
  <circle cx="${size/2}" cy="${size/2}" r="${size/4}" fill="white"/>
  <path d="M${size/3} ${size/2} L${2*size/3} ${size/2} M${size/2} ${size/3} L${size/2} ${2*size/3}" stroke="white" stroke-width="2"/>
</svg>
`;

// Icon sizes needed
const sizes = [16, 32, 72, 96, 128, 144, 152, 192, 384, 512];

// Create icons directory if it doesn't exist
const iconsDir = path.join(__dirname, '../public/icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Generate icons
sizes.forEach(size => {
  const svg = createIconSVG(size);
  const filename = `icon-${size}x${size}.png`;
  const filepath = path.join(iconsDir, filename);
  
  // For now, we'll create a simple text file as placeholder
  // In a real scenario, you'd use a library like sharp to convert SVG to PNG
  fs.writeFileSync(filepath.replace('.png', '.svg'), svg);
  console.log(`Created ${filename.replace('.png', '.svg')}`);
});

console.log('Icon generation complete! Note: These are SVG placeholders. For production, convert to PNG.'); 