const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const htmlFiles = [
  'index.html',
  'about.html',
  'services.html',
  'gallery.html',
  'contact.html',
  'review.html',
  'cad-gis-processing.html',
  'dgps-gnss-control.html',
  'drone-photogrammetry.html',
  'lidar-3d-scanning.html',
  'rail-metro.html',
  'road-highway.html',
  'rtk-drone-mapping.html',
  'topographical-survey.html',
  'total-station-survey.html'
];

let allOk = true;

htmlFiles.forEach(file => {
  const filePath = path.join(rootDir, file);
  const content = fs.readFileSync(filePath, 'utf8');

  // Verify footer-brand presence
  if (!content.includes('class="footer-brand"') || !content.includes('class="footer-logo-img"')) {
    console.error(`Missing footer logo class in: ${file}`);
    allOk = false;
  }

  // Strip scripts and comments
  const clean = content
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '');

  const openDivs = (clean.match(/<div\b[^>]*>/gi) || []).length;
  const closeDivs = (clean.match(/<\/div>/gi) || []).length;

  const openSections = (clean.match(/<section\b[^>]*>/gi) || []).length;
  const closeSections = (clean.match(/<\/section>/gi) || []).length;

  const openFooters = (clean.match(/<footer\b[^>]*>/gi) || []).length;
  const closeFooters = (clean.match(/<\/footer>/gi) || []).length;

  if (openDivs !== closeDivs || openSections !== closeSections || openFooters !== closeFooters) {
    console.error(`Tag mismatch in ${file}: divs ${openDivs}/${closeDivs}, sections ${openSections}/${closeSections}, footers ${openFooters}/${closeFooters}`);
    allOk = false;
  } else {
    console.log(`PASS: ${file} (divs: ${openDivs}, sections: ${openSections}, footers: ${openFooters})`);
  }
});

if (allOk) {
  console.log('\n=== ALL 15 FILES VALIDATED SUCCESSFULLY ===');
} else {
  process.exit(1);
}
