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
  ['•', '&bull;', '&#8226;', 'dot'].forEach(term => {
    let pos = 0;
    while ((pos = c.indexOf(term, pos)) !== -1) {
      const snippet = c.substring(Math.max(0, pos - 40), Math.min(c.length, pos + 40)).replace(/\s+/g, ' ');
      console.log(`${f} [${term}]: ${snippet}`);
      pos += term.length;
    }
  });
});
