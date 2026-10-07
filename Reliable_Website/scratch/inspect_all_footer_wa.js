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
  const footerStart = c.indexOf('<footer');
  const footerEnd = c.indexOf('</footer>');
  const footer = c.substring(footerStart, footerEnd);
  const m = footer.match(/<a\b[^>]*wa\.me[^>]*>[\s\S]*?<\/a>/i);
  if (m) {
    console.log(`=== ${f} ===\n${m[0]}\n`);
  } else {
    console.log(`=== ${f} === NO MATCH`);
  }
});
