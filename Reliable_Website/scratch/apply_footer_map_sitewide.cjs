const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..');
const pages = [
  'index.html',
  'about.html',
  'services.html',
  'contact.html',
  'gallery.html',
  'review.html',
  'topographical-survey.html',
  'total-station-survey.html',
  'rtk-drone-mapping.html',
  'drone-photogrammetry.html',
  'lidar-3d-scanning.html',
  'dgps-gnss-control.html',
  'road-highway.html',
  'rail-metro.html',
  'cad-gis-processing.html'
];

const mapEmbedHtml = `
                        <div class="footer-map-wrapper" style="width: 100%; max-width: 260px; height: 110px; border-radius: 8px; overflow: hidden; border: 1px solid rgba(8, 43, 76, 0.18); box-shadow: 0 2px 8px rgba(0,0,0,0.06); margin: 8px 0 12px 0;">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d121059.04360431358!2d73.79292675000001!3d18.52461645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1689146522361!5m2!1sen!2sin" width="100%" height="100%" style="border:0; display:block;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Reliable Land Survey Consultancy Headquarters Location"></iframe>
                        </div>`;

pages.forEach(file => {
  const filePath = path.join(dir, file);
  if (!fs.existsSync(filePath)) {
    console.log(`[${file}] Not found`);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('footer-map-wrapper')) {
    console.log(`[${file}] Already has footer map`);
    return;
  }

  // Look for the address paragraph in footer: <p>Pune, Maharashtra, India</p>
  const targetRegex = /(<footer[\s\S]*?<p>Pune, Maharashtra, India<\/p>)/;
  if (targetRegex.test(content)) {
    content = content.replace(targetRegex, `$1${mapEmbedHtml}`);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`[${file}] Added footer map successfully!`);
  } else {
    console.log(`[${file}] Target address paragraph not found in footer`);
  }
});
