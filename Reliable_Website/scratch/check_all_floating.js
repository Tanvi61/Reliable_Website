const fs = require('fs');

const files = [
  'index.html', 'about.html', 'services.html', 'gallery.html', 'contact.html', 'review.html',
  'topographical-survey.html', 'dgps-gnss-control.html', 'total-station-survey.html',
  'rtk-drone-mapping.html', 'lidar-3d-scanning.html', 'drone-photogrammetry.html',
  'road-highway.html', 'rail-metro.html', 'cad-gis-processing.html'
];

files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const m = content.match(/<div class="floating-actions"[\s\S]*?<\/div>/);
  if (!m) {
    console.log(f + ': NO MATCH');
  } else {
    const hasWA = m[0].includes('whatsapp');
    const hasCall = m[0].includes('call');
    const hasScroll = m[0].includes('scrollTopBtn');
    console.log(`${f}: WA=${hasWA}, Call=${hasCall}, Scroll=${hasScroll}, length=${m[0].length}`);
  }
});
