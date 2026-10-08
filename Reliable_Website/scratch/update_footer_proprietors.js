const fs = require('fs');
const path = require('path');

const baseDir = path.resolve(__dirname, '..');
const files = [
  'index.html',
  'about.html',
  'services.html',
  'topographical-survey.html',
  'total-station-survey.html',
  'dgps-gnss-control.html',
  'rtk-drone-mapping.html',
  'lidar-3d-scanning.html',
  'drone-photogrammetry.html',
  'road-highway.html',
  'rail-metro.html',
  'cad-gis-processing.html',
  'gallery.html',
  'contact.html',
  'review.html'
];

let updatedCount = 0;

for (const file of files) {
  const filePath = path.join(baseDir, file);
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${file}`);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // Match pattern:
  // <p style="..."><strong>Proprietors:</strong><br>Mahesh Deshmukh<br>Sharad Pingale</p>
  // followed by phone numbers p tag
  const regex = /<p style="margin:\s*0;\s*line-height:\s*[0-9.]+;[^"]*"><strong>Proprietors:<\/strong><br>Mahesh Deshmukh<br>Sharad Pingale<\/p>\s*<p><a href="tel:\+919604648777"[^>]*>\+91 96046 48777<\/a>\s*(?:\/|<br>)\s*<a href="tel:\+918600044688"[^>]*>\+91 86000 44688<\/a><\/p>/;

  if (!regex.test(content)) {
    console.error(`Pattern NOT matched in ${file}`);
    continue;
  }

  let replacement;
  if (file === 'index.html') {
    replacement = `<p style="margin: 0; line-height: 1.45; color: #000 !important;"><strong>Proprietors:</strong><br>Mahesh Deshmukh<br><a href="tel:+919604648777" style="color: #000 !important;">+91 96046 48777</a><br><span style="display:inline-block; margin-top: 6px;">Sharad Pingale</span><br><a href="tel:+918600044688" style="color: #000 !important;">+91 86000 44688</a></p>`;
  } else {
    replacement = `<p style="margin: 0; line-height: 1.45;"><strong>Proprietors:</strong><br>Mahesh Deshmukh<br><a href="tel:+919604648777">+91 96046 48777</a><br><span style="display:inline-block; margin-top: 6px;">Sharad Pingale</span><br><a href="tel:+918600044688">+91 86000 44688</a></p>`;
  }

  content = content.replace(regex, replacement);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`[UPDATED] ${file}`);
  updatedCount++;
}

console.log(`\nSuccessfully updated ${updatedCount}/${files.length} files.`);
