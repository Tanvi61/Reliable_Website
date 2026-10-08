const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '..');
const files = [
  'topographical-survey.html',
  'total-station-survey.html',
  'dgps-gnss-control.html',
  'rtk-drone-mapping.html',
  'lidar-3d-scanning.html',
  'drone-photogrammetry.html',
  'road-highway.html',
  'rail-metro.html',
  'cad-gis-processing.html'
];

const methodologyRegex = /\r?\n\s*<!-- 4-STEP METHODOLOGY -->[\s\S]*?(?=\r?\n\s*<!-- FAQS SECTION -->)/;

let successCount = 0;

for (const file of files) {
  const filePath = path.join(baseDir, file);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    continue;
  }
  const original = fs.readFileSync(filePath, 'utf8');
  if (!methodologyRegex.test(original)) {
    console.warn(`Methodology section not found in ${file}`);
    continue;
  }
  
  const updated = original.replace(methodologyRegex, '');
  fs.writeFileSync(filePath, updated, 'utf8');
  
  const originalLines = original.split('\n').length;
  const updatedLines = updated.split('\n').length;
  const diffLines = originalLines - updatedLines;
  
  console.log(`[SUCCESS] ${file}: removed ${diffLines} lines (${originalLines} -> ${updatedLines})`);
  successCount++;
}

console.log(`\nCompleted! Successfully processed ${successCount}/${files.length} files.`);
