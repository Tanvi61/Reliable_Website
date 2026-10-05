const fs = require('fs');
const path = require('path');

const dir = 'e:/MindAxis_Web/Reliable_Website';

const files = [
  'index.html',
  'about.html',
  'services.html',
  'gallery.html',
  'contact.html',
  'review.html',
  'topographical-survey.html',
  'dgps-gnss-control.html',
  'total-station-survey.html',
  'rtk-drone-mapping.html',
  'lidar-3d-scanning.html',
  'drone-photogrammetry.html',
  'road-highway.html',
  'rail-metro.html',
  'cad-gis-processing.html'
];

files.forEach(file => {
  const filePath = path.join(dir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace <div class="hamburger-exact" onclick="..."> with <div class="hamburger-exact">
    const updated = content.replace(/<div\s+class="hamburger-exact"[\s\S]*?onclick="[^"]*"[\s\S]*?>/g, '<div class="hamburger-exact">');
    if (updated !== content) {
      fs.writeFileSync(filePath, updated, 'utf8');
      console.log(`Updated hamburger in ${file}`);
    } else {
      console.log(`No inline onclick found in ${file}`);
    }
  }
});
