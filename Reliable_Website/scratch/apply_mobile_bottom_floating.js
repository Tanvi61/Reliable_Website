const fs = require('fs');
const path = require('path');

const baseDir = 'e:/MindAxis_Web/Reliable_Website';

// 1. Update css/responsive.css
const respPath = path.join(baseDir, 'css/responsive.css');
let respCss = fs.readFileSync(respPath, 'utf8');

// Replace both occurrences of .floating-actions in responsive.css
const oldRespBlock1 = /\.floating-actions\s*\{\s*position:\s*fixed\s*!important;\s*right:\s*14px\s*!important;[\s\S]*?opacity:\s*1\s*!important;\s*\}/g;

const newRespBlock = `.floating-actions {
    position: fixed !important;
    right: 16px !important;
    right: calc(16px + env(safe-area-inset-right, 0px)) !important;
    bottom: 85px !important;
    bottom: calc(85px + env(safe-area-inset-bottom, 0px)) !important;
    top: auto !important;
    transform: none !important;
    -webkit-transform: none !important;
    z-index: 2147483647 !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 10px !important;
    pointer-events: auto !important;
    visibility: visible !important;
    opacity: 1 !important;
  }`;

respCss = respCss.replace(oldRespBlock1, newRespBlock);
fs.writeFileSync(respPath, respCss, 'utf8');
console.log('Updated responsive.css');

// 2. Update all HTML files in baseDir
const htmlFiles = fs.readdirSync(baseDir).filter(f => f.endsWith('.html'));

const oldHtmlFloatMediaRegex = /@media\s*\(\s*max-width\s*:\s*1024px\s*\)\s*\{\s*\.floating-actions\s*\{[\s\S]*?gap:\s*10px\s*!important;\s*\}/g;

const newHtmlFloatMedia = `@media (max-width: 1024px) {
        .floating-actions {
          right: 16px !important;
          right: calc(16px + env(safe-area-inset-right, 0px)) !important;
          bottom: 85px !important;
          bottom: calc(85px + env(safe-area-inset-bottom, 0px)) !important;
          top: auto !important;
          transform: none !important;
          -webkit-transform: none !important;
          z-index: 2147483647 !important;
          gap: 10px !important;
        }`;

let updatedCount = 0;
for (const file of htmlFiles) {
  const filePath = path.join(baseDir, file);
  let html = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  if (oldHtmlFloatMediaRegex.test(html)) {
    html = html.replace(oldHtmlFloatMediaRegex, newHtmlFloatMedia);
    changed = true;
  }

  // Also bump cache query params ?v=20261007_5 -> ?v=20261007_6
  if (html.includes('?v=20261007_5')) {
    html = html.replace(/\?v=20261007_5/g, '?v=20261007_6');
    changed = true;
  } else if (html.includes('style.css?v=')) {
    html = html.replace(/style\.css\?v=[a-zA-Z0-9_]+/g, 'style.css?v=20261007_6');
    html = html.replace(/responsive\.css\?v=[a-zA-Z0-9_]+/g, 'responsive.css?v=20261007_6');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, html, 'utf8');
    updatedCount++;
    console.log(`Updated HTML: ${file}`);
  }
}
console.log(`Finished updating ${updatedCount} HTML files.`);
