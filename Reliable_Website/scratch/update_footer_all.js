const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

// 1. Update css/style.css
const styleCssPath = path.join(rootDir, 'css', 'style.css');
let styleCss = fs.readFileSync(styleCssPath, 'utf8');

const targetStyleCss = `.footer-brand img {
  height: 100px;
  display: block;
  margin: 0 auto 20px auto;
}

.footer-brand p {
  color: #000000;
  font-size: 0.92rem;
  line-height: 1.6;
}`;

const replacementStyleCss = `.footer-brand {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
}

.footer-brand-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  margin: 0 auto;
}

.footer-brand img,
.footer-brand .footer-logo-img,
.footer-logo-img {
  height: 100px;
  width: auto;
  display: block;
  margin: 0 auto 15px auto;
  object-fit: contain;
}

.footer-brand p {
  color: #000000;
  font-size: 0.92rem;
  line-height: 1.6;
  text-align: center;
}

.footer-brand ul,
.footer-brand .footer-brand-list,
.footer-brand-list {
  list-style: none;
  padding: 0;
  margin: 0;
  color: #000000;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.footer-brand ul li,
.footer-brand .footer-brand-list li,
.footer-brand-list li {
  margin-bottom: 0;
  padding: 0;
  color: #000000;
  font-size: 0.95rem;
  text-align: center;
  display: block;
}`;

// Normalize CRLF / LF for matching
const normStyleCss = styleCss.replace(/\r\n/g, '\n');
const normTarget = targetStyleCss.replace(/\r\n/g, '\n');

if (normStyleCss.includes(normTarget)) {
  const isCRLF = styleCss.includes('\r\n');
  const finalReplacement = isCRLF ? replacementStyleCss.replace(/\n/g, '\r\n') : replacementStyleCss;
  styleCss = isCRLF 
    ? styleCss.replace(targetStyleCss.replace(/\n/g, '\r\n'), finalReplacement)
    : styleCss.replace(normTarget, finalReplacement);
  fs.writeFileSync(styleCssPath, styleCss, 'utf8');
  console.log('Successfully updated css/style.css');
} else {
  console.log('Could not find target block in css/style.css');
}

// 2. Update css/responsive.css
const respCssPath = path.join(rootDir, 'css', 'responsive.css');
let respCss = fs.readFileSync(respCssPath, 'utf8');
const isRespCRLF = respCss.includes('\r\n');
const normResp = respCss.replace(/\r\n/g, '\n');

const respAddition = `
  /* Centered Footer Brand Across Views */
  .footer-brand,
  .footer-brand-inner {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    text-align: center !important;
    width: 100% !important;
    margin: 0 auto !important;
  }

  .footer-brand img,
  .footer-brand .footer-logo-img,
  .footer-logo-img {
    margin: 0 auto 15px auto !important;
    display: block !important;
  }

  .footer-brand ul,
  .footer-brand .footer-brand-list,
  .footer-brand-list {
    text-align: center !important;
    align-items: center !important;
    justify-content: center !important;
  }

  .footer-brand ul li,
  .footer-brand .footer-brand-list li,
  .footer-brand-list li {
    text-align: center !important;
  }
`;

// Add centering in responsive.css if not already added
if (!normResp.includes('Centered Footer Brand Across Views')) {
  // Append to 991px, 767px, and 480px media blocks or at the end of responsive.css
  const finalRespAddition = isRespCRLF ? respAddition.replace(/\n/g, '\r\n') : respAddition;
  respCss = respCss + (isRespCRLF ? '\r\n' : '\n') + finalRespAddition;
  fs.writeFileSync(respCssPath, respCss, 'utf8');
  console.log('Successfully appended centered footer rules to css/responsive.css');
}

// 3. Update all 15 HTML files
const htmlFiles = [
  'index.html',
  'about.html',
  'services.html',
  'gallery.html',
  'contact.html',
  'review.html',
  'cad-gis-processing.html',
  'dgps-gnss-control.html',
  'drone-photogrammetry.html',
  'lidar-3d-scanning.html',
  'rail-metro.html',
  'road-highway.html',
  'rtk-drone-mapping.html',
  'topographical-survey.html',
  'total-station-survey.html'
];

const newFooterBrand = `<div class="footer-brand">
                    <div class="footer-brand-inner">
                        <img src="assets/logo/logo-transparent.png" alt="Reliable Land Survey Consultancy" class="footer-logo-img">
                        <ul class="footer-brand-list">
                            <li>Professional Surveying</li>
                            <li>Geospatial</li>
                            <li>LiDAR</li>
                            <li>Drone Mapping</li>
                            <li>Infrastructure</li>
                        </ul>
                    </div>
                </div>`;

htmlFiles.forEach(file => {
  const filePath = path.join(rootDir, file);
  if (!fs.existsSync(filePath)) {
    console.log('File does not exist:', file);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  const isCRLF = content.includes('\r\n');
  const normContent = content.replace(/\r\n/g, '\n');

  // Find <div class="footer-brand"> ... closing </div>\s*</div> before next column
  // We locate <div class="footer-brand"> and the following <div class="footer-col">
  const startIdx = normContent.indexOf('<div class="footer-brand">');
  if (startIdx === -1) {
    console.log('No footer-brand found in:', file);
    return;
  }

  const nextColIdx = normContent.indexOf('<div class="footer-col">', startIdx);
  if (nextColIdx === -1) {
    console.log('No next footer-col found in:', file);
    return;
  }

  // Check if there was a comment like <!-- Column 2 -->
  const blockBeforeNextCol = normContent.substring(startIdx, nextColIdx);
  const hasCol2Comment = blockBeforeNextCol.includes('<!-- Column 2');

  let replacement = newFooterBrand;
  if (hasCol2Comment) {
    replacement += '\n\n                <!-- Column 2 -->\n                ';
  } else {
    replacement += '\n                \n                ';
  }

  const updatedNorm = normContent.substring(0, startIdx) + replacement + normContent.substring(nextColIdx);
  const finalContent = isCRLF ? updatedNorm.replace(/\n/g, '\r\n') : updatedNorm;

  fs.writeFileSync(filePath, finalContent, 'utf8');
  console.log(`Updated ${file}`);
});
