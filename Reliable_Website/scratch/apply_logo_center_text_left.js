const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

// 1. Update css/style.css
const styleCssPath = path.join(rootDir, 'css', 'style.css');
let styleCss = fs.readFileSync(styleCssPath, 'utf8');

const targetStyleCss = `.footer-brand {
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

const newStyleCss = `.footer-brand {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  width: 100%;
}

.footer-brand-inner {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  width: 100%;
}

.footer-brand img,
.footer-brand .footer-logo-img,
.footer-logo-img {
  height: 100px;
  width: auto;
  display: block;
  margin: 0 auto 15px auto !important;
  align-self: center !important;
  object-fit: contain;
}

.footer-brand p {
  color: #000000;
  font-size: 0.92rem;
  line-height: 1.6;
  text-align: left;
}

.footer-brand ul,
.footer-brand .footer-brand-list,
.footer-brand-list {
  list-style: none;
  padding: 0;
  margin: 0;
  color: #000000;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
}

.footer-brand ul li,
.footer-brand .footer-brand-list li,
.footer-brand-list li {
  margin-bottom: 0;
  padding: 0;
  color: #000000;
  font-size: 0.95rem;
  text-align: left;
  display: block;
}`;

const isStyleCRLF = styleCss.includes('\r\n');
const normStyle = styleCss.replace(/\r\n/g, '\n');
const normTargetStyle = targetStyleCss.replace(/\r\n/g, '\n');
const normNewStyle = newStyleCss.replace(/\r\n/g, '\n');

if (normStyle.includes(normTargetStyle)) {
  const updatedStyle = normStyle.replace(normTargetStyle, normNewStyle);
  fs.writeFileSync(styleCssPath, isStyleCRLF ? updatedStyle.replace(/\n/g, '\r\n') : updatedStyle, 'utf8');
  console.log('Updated css/style.css');
} else {
  console.log('Could not find target in style.css');
}

// 2. Update css/responsive.css
const respCssPath = path.join(rootDir, 'css', 'responsive.css');
let respCss = fs.readFileSync(respCssPath, 'utf8');
const isRespCRLF = respCss.includes('\r\n');
let normResp = respCss.replace(/\r\n/g, '\n');

const targetResp = `  /* Centered Footer Brand Across Views */
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
  }`;

const newResp = `  /* Centered Logo with Left-Aligned Text Across Views */
  .footer-brand,
  .footer-brand-inner {
    display: flex !important;
    flex-direction: column !important;
    align-items: flex-start !important;
    text-align: left !important;
    width: 100% !important;
  }

  .footer-brand img,
  .footer-brand .footer-logo-img,
  .footer-logo-img {
    margin: 0 auto 15px auto !important;
    align-self: center !important;
    display: block !important;
  }

  .footer-brand ul,
  .footer-brand .footer-brand-list,
  .footer-brand-list {
    text-align: left !important;
    align-items: flex-start !important;
    justify-content: flex-start !important;
    width: 100% !important;
  }

  .footer-brand ul li,
  .footer-brand .footer-brand-list li,
  .footer-brand-list li {
    text-align: left !important;
  }`;

if (normResp.includes(targetResp)) {
  normResp = normResp.replace(targetResp, newResp);
  fs.writeFileSync(respCssPath, isRespCRLF ? normResp.replace(/\n/g, '\r\n') : normResp, 'utf8');
  console.log('Updated css/responsive.css');
} else {
  console.log('Could not find target in responsive.css');
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

const newHtmlFooterBrand = `<div class="footer-brand">
                    <div class="footer-brand-inner" style="display: flex; flex-direction: column; align-items: flex-start; text-align: left; width: 100%;">
                        <img src="assets/logo/logo-transparent.png" alt="Reliable Land Survey Consultancy" class="footer-logo-img" style="height: 100px; width: auto; margin: 0 auto 15px auto; display: block; align-self: center;">
                        <ul class="footer-brand-list" style="list-style: none; padding: 0; margin: 0; color: #000; text-align: left; display: flex; flex-direction: column; align-items: flex-start; gap: 8px; width: 100%;">
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
  let content = fs.readFileSync(filePath, 'utf8');
  const isCRLF = content.includes('\r\n');
  let normContent = content.replace(/\r\n/g, '\n');

  // Update cache bust query version to 20261006_6
  normContent = normContent.replace(/href="css\/style\.css(\?[^"]*)?"/g, 'href="css/style.css?v=20261006_6"');
  normContent = normContent.replace(/href="css\/responsive\.css(\?[^"]*)?"/g, 'href="css/responsive.css?v=20261006_6"');

  // Replace footer-brand
  const startIdx = normContent.indexOf('<div class="footer-brand">');
  if (startIdx !== -1) {
    const nextColIdx = normContent.indexOf('<div class="footer-col">', startIdx);
    if (nextColIdx !== -1) {
      const block = normContent.substring(startIdx, nextColIdx);
      const hasCol2 = block.includes('<!-- Column 2');
      let replacement = newHtmlFooterBrand;
      if (hasCol2) {
        replacement += '\n\n                <!-- Column 2 -->\n                ';
      } else {
        replacement += '\n                \n                ';
      }
      normContent = normContent.substring(0, startIdx) + replacement + normContent.substring(nextColIdx);
    }
  }

  fs.writeFileSync(filePath, isCRLF ? normContent.replace(/\n/g, '\r\n') : normContent, 'utf8');
  console.log(`Updated ${file}`);
});
