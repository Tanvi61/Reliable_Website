const fs = require('fs');
const path = require('path');

const files = [
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

let updatedCount = 0;

files.forEach(fileName => {
  const filePath = path.join(__dirname, '..', fileName);
  if (!fs.existsSync(filePath)) {
    console.error('File not found:', filePath);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');

  // 1. Update stylesheet version
  content = content.replace(/href="css\/style\.css\?v=[^"]+"/g, 'href="css/style.css?v=20261008_1"');

  // 2. Pattern to match the button grid
  const oldButtonsRegex = /<div style="margin-top:\s*24px;\s*display:\s*grid;\s*grid-template-columns:\s*1fr\s*1fr;\s*gap:\s*12px;">\s*<a href="contact\.html"[^>]*>Request Quote\s*(&rarr;|→)?<\/a>\s*<a href="https:\/\/wa\.me\/919604648777"[^>]*>WhatsApp Us<\/a>\s*<\/div>/g;

  const newButtons = `<div class="service-spec-cta-grid" style="margin-top: 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                        <a href="contact.html" class="btn btn-primary btn-spec-quote" style="padding: 15px 18px; font-size: 14.5px; border-radius: 8px; font-weight: 700; text-align: center; display: flex; justify-content: center; align-items: center; gap: 8px;">Request Quote</a>
                        <a href="https://wa.me/919604648777" target="_blank" rel="noopener" class="btn btn-spec-whatsapp" style="background: #25D366; color: #fff; text-decoration: none; padding: 15px 18px; border-radius: 8px; font-weight: 700; font-size: 14.5px; text-align: center; display: flex; justify-content: center; align-items: center; gap: 8px;">WhatsApp Us</a>
                    </div>`;

  if (oldButtonsRegex.test(content)) {
    content = content.replace(oldButtonsRegex, newButtons);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`[UPDATED] ${fileName}`);
    updatedCount++;
  } else {
    // Try a more flexible replacement if formatting differed
    const flexRegex = /<a href="contact\.html"[^>]*class="btn btn-primary"[^>]*>Request Quote\s*(&rarr;|→)?<\/a>\s*<a href="https:\/\/wa\.me\/919604648777"[^>]*>WhatsApp Us<\/a>/g;
    if (flexRegex.test(content)) {
      content = content.replace(flexRegex, `<a href="contact.html" class="btn btn-primary btn-spec-quote" style="padding: 15px 18px; font-size: 14.5px; border-radius: 8px; font-weight: 700; text-align: center; display: flex; justify-content: center; align-items: center; gap: 8px;">Request Quote</a>
                        <a href="https://wa.me/919604648777" target="_blank" rel="noopener" class="btn btn-spec-whatsapp" style="background: #25D366; color: #fff; text-decoration: none; padding: 15px 18px; border-radius: 8px; font-weight: 700; font-size: 14.5px; text-align: center; display: flex; justify-content: center; align-items: center; gap: 8px;">WhatsApp Us</a>`);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`[FLEX UPDATED] ${fileName}`);
      updatedCount++;
    } else {
      console.warn(`[SKIPPED / NO MATCH] ${fileName}`);
    }
  }
});

console.log(`Finished updating ${updatedCount} / ${files.length} service pages.`);
