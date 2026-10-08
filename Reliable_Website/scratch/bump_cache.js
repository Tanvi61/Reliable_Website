const fs = require('fs');

const files = [
  'topographical-survey.html',
  'dgps-gnss-control.html',
  'total-station-survey.html',
  'rtk-drone-mapping.html',
  'lidar-3d-scanning.html',
  'drone-photogrammetry.html',
  'road-highway.html',
  'rail-metro.html',
  'cad-gis-processing.html',
  'index.html',
  'about.html',
  'services.html',
  'contact.html',
  'gallery.html',
  'review.html'
];

files.forEach(f => {
  if (!fs.existsSync(f)) return;
  let c = fs.readFileSync(f, 'utf8');
  c = c.replace(/href="css\/style\.css\?v=[^"]+"/g, 'href="css/style.css?v=20261008_2"');
  fs.writeFileSync(f, c, 'utf8');
});

console.log('Successfully bumped stylesheet cache version to 20261008_2 across all HTML files.');
