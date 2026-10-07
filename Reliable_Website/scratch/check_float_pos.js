const fs = require('fs');
const files = [
  'index.html', 'about.html', 'services.html', 'gallery.html', 'contact.html', 'review.html',
  'topographical-survey.html', 'dgps-gnss-control.html', 'total-station-survey.html',
  'rtk-drone-mapping.html', 'lidar-3d-scanning.html', 'drone-photogrammetry.html',
  'road-highway.html', 'rail-metro.html', 'cad-gis-processing.html'
];
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const bodyIdx = content.indexOf('<body>');
  const floatIdx = content.indexOf('class="floating-actions"');
  console.log(f, 'float relative to body:', floatIdx - bodyIdx);
});
