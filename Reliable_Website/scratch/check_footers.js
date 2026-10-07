const fs = require('fs');
const files = [
  'index.html', 'about.html', 'services.html', 'gallery.html', 'contact.html',
  'review.html', 'cad-gis-processing.html', 'dgps-gnss-control.html',
  'drone-photogrammetry.html', 'lidar-3d-scanning.html', 'rail-metro.html',
  'road-highway.html', 'rtk-drone-mapping.html', 'topographical-survey.html',
  'total-station-survey.html'
];

files.forEach(f => {
  if (!fs.existsSync(f)) return;
  const c = fs.readFileSync(f, 'utf8');
  const start = c.indexOf('footer-brand');
  const end = c.indexOf('Column 2', start);
  console.log('=== ' + f + ' ===');
  console.log(c.substring(start - 12, end !== -1 ? end : start + 300));
});
