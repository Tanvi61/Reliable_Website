const fs = require('fs');
const files = [
  'index.html', 'about.html', 'services.html', 'gallery.html', 'contact.html',
  'review.html', 'cad-gis-processing.html', 'dgps-gnss-control.html',
  'drone-photogrammetry.html', 'lidar-3d-scanning.html', 'rail-metro.html',
  'road-highway.html', 'rtk-drone-mapping.html', 'topographical-survey.html',
  'total-station-survey.html'
];

files.forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  const lines = c.split('\n');
  lines.forEach((l, i) => {
    if (l.includes('section-label')) {
      console.log(`${f}:${i+1} -> ${l.trim()}`);
    }
  });
});
