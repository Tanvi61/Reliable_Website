const fs = require('fs');
const path = require('path');

const baseDir = 'e:/MindAxis_Web/Reliable_Website';

// 1. Update css/responsive.css
const respCssPath = path.join(baseDir, 'css/responsive.css');
let respCss = fs.readFileSync(respCssPath, 'utf8');

// Replace both occurrences of .floating-actions bottom: 83px with top: 55%
const oldRespFloatBlock1 = /\.floating-actions\s*\{[\s\S]*?right:\s*16px\s*!important;[\s\S]*?bottom:\s*83px\s*!important;[\s\S]*?-webkit-transform:\s*none\s*!important;[\s\S]*?opacity:\s*1\s*!important;\s*\}/g;

const newRespFloatBlock = `.floating-actions {
    position: fixed !important;
    right: 16px !important;
    right: calc(16px + env(safe-area-inset-right, 0px)) !important;
    top: 55% !important;
    bottom: auto !important;
    transform: translateY(-50%) !important;
    -webkit-transform: translateY(-50%) !important;
    z-index: 2147483647 !important;
    display: flex !important;
    flex-direction: column !important;
    gap: 10px !important;
    pointer-events: auto !important;
    visibility: visible !important;
    opacity: 1 !important;
  }`;

respCss = respCss.replace(oldRespFloatBlock1, newRespFloatBlock);
fs.writeFileSync(respCssPath, respCss, 'utf8');
console.log('Updated css/responsive.css');

// 2. Update all HTML files
const htmlFiles = fs.readdirSync(baseDir).filter(f => f.endsWith('.html') && f !== 'hero-test.html');
let updatedCount = 0;

for (const file of htmlFiles) {
  const filePath = path.join(baseDir, file);
  let html = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // In head style block under @media (max-width: 1024px), update .floating-actions
  // Replace:
  //         .floating-actions {
  //           right: 16px !important;
  //           right: calc(16px + env(safe-area-inset-right, 0px)) !important;
  //           bottom: 83px !important;
  //           bottom: calc(83px + env(safe-area-inset-bottom, 0px)) !important;
  //           top: auto !important;
  //           transform: none !important;
  //           -webkit-transform: none !important;
  //           z-index: 2147483647 !important;
  //           gap: 10px !important;
  //         }
  // With:
  //         .floating-actions {
  //           right: 16px !important;
  //           right: calc(16px + env(safe-area-inset-right, 0px)) !important;
  //           top: 55% !important;
  //           bottom: auto !important;
  //           transform: translateY(-50%) !important;
  //           -webkit-transform: translateY(-50%) !important;
  //           z-index: 2147483647 !important;
  //           gap: 10px !important;
  //         }

  const oldHeadFloatRegex = /\.floating-actions\s*\{\s*right:\s*16px\s*!important;\s*right:\s*calc\(16px\s*\+\s*env\(safe-area-inset-right,\s*0px\)\)\s*!important;\s*bottom:\s*83px\s*!important;\s*bottom:\s*calc\(83px\s*\+\s*env\(safe-area-inset-bottom,\s*0px\)\)\s*!important;\s*top:\s*auto\s*!important;\s*transform:\s*none\s*!important;\s*-webkit-transform:\s*none\s*!important;\s*z-index:\s*2147483647\s*!important;\s*gap:\s*10px\s*!important;\s*\}/g;

  const newHeadFloat = `.floating-actions {
          right: 16px !important;
          right: calc(16px + env(safe-area-inset-right, 0px)) !important;
          top: 55% !important;
          bottom: auto !important;
          transform: translateY(-50%) !important;
          -webkit-transform: translateY(-50%) !important;
          z-index: 2147483647 !important;
          gap: 10px !important;
        }`;

  if (oldHeadFloatRegex.test(html)) {
    html = html.replace(oldHeadFloatRegex, newHeadFloat);
    changed = true;
  }

  // Also bump cache query strings ?v=20261007_8 -> ?v=20261007_9
  if (html.includes('?v=20261007_8')) {
    html = html.replace(/\?v=20261007_8/g, '?v=20261007_9');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, html, 'utf8');
    updatedCount++;
    console.log(`Updated HTML: ${file}`);
  } else {
    console.log(`No match for: ${file}`);
  }
}

console.log(`Updated ${updatedCount} HTML files.`);
