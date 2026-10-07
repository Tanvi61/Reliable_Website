const fs = require('fs');
const files = [
  'index.html', 'about.html', 'services.html', 'gallery.html', 'contact.html', 'review.html',
  'topographical-survey.html', 'dgps-gnss-control.html', 'total-station-survey.html',
  'rtk-drone-mapping.html', 'lidar-3d-scanning.html', 'drone-photogrammetry.html',
  'road-highway.html', 'rail-metro.html', 'cad-gis-processing.html'
];
files.forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const navQuickCount = (content.match(/nav-quick-actions/g) || []).length;
  const floatCount = (content.match(/class="floating-actions"/g) || []).length;
  const scrollTopCount = (content.match(/id="scrollTopBtn"/g) || []).length;
  console.log(f, { navQuickCount, floatCount, scrollTopCount });
});
