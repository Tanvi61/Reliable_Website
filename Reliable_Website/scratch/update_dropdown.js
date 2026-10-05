const fs = require('fs');
const path = require('path');

const dir = 'e:/MindAxis_Web/Reliable_Website';

const files = [
  'index.html',
  'about.html',
  'services.html',
  'gallery.html',
  'contact.html',
  'review.html',
  'topographical-survey.html',
  'dgps-gnss-control.html',
  'total-station-survey.html',
  'rtk-drone-mapping.html',
  'lidar-3d-scanning.html',
  'drone-photogrammetry.html',
  'road-highway.html',
  'rail-metro.html',
  'cad-gis-processing.html'
];

const newDropdownHtml = `            <div class="nav-dropdown">
                <a href="services.html" class="nav-dropdown-toggle">
                    Services
                    <svg class="dropdown-arrow" width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 1l4 4 4-4"/></svg>
                </a>
                <div class="nav-dropdown-menu">
                    <a href="topographical-survey.html" class="nav-dropdown-item">Topographical Survey</a>
                    <a href="dgps-gnss-control.html" class="nav-dropdown-item">DGPS / GNSS Control</a>
                    <a href="total-station-survey.html" class="nav-dropdown-item">Total Station Survey</a>
                    <a href="rtk-drone-mapping.html" class="nav-dropdown-item">RTK Drone Mapping</a>
                    <a href="lidar-3d-scanning.html" class="nav-dropdown-item">Drone LiDAR Scanning</a>
                    <a href="drone-photogrammetry.html" class="nav-dropdown-item">Drone Photogrammetry</a>
                    <a href="road-highway.html" class="nav-dropdown-item">Road & Highway Survey</a>
                    <a href="rail-metro.html" class="nav-dropdown-item">Rail & Metro Survey</a>
                    <a href="cad-gis-processing.html" class="nav-dropdown-item">CAD & GIS Processing</a>
                    <div class="dropdown-footer-link">
                        <a href="services.html">All Services &rarr;</a>
                    </div>
                </div>
            </div>`;

const regex = /<div class="nav-dropdown">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/;

files.forEach(file => {
  const filePath = path.join(dir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Find the nav-dropdown block
    const startIdx = content.indexOf('<div class="nav-dropdown">');
    if (startIdx !== -1) {
      // Find the end of this nav-dropdown block
      // The block ends before <a href="gallery.html" or whatever link comes next
      const endMarker = '</div>\n            </div>\n            <a href="gallery.html"';
      const endMarker2 = '</div>\r\n            </div>\r\n            <a href="gallery.html"';
      const endMarker3 = '</div>\n                </div>\n            </div>\n            <a href="gallery.html"';
      
      // Let's use a robust match from <div class="nav-dropdown"> to the start of <a href="gallery.html">
      const galleryIdx = content.indexOf('<a href="gallery.html">', startIdx);
      if (galleryIdx !== -1) {
        const before = content.substring(0, startIdx);
        const after = content.substring(galleryIdx);
        content = before + newDropdownHtml + '\n            ' + after;
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${file}`);
      } else {
        console.log(`Gallery link not found in ${file}`);
      }
    } else {
      console.log(`nav-dropdown not found in ${file}`);
    }
  }
});
