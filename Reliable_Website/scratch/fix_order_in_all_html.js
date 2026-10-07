const fs = require('fs');
const path = require('path');

const baseDir = 'e:/MindAxis_Web/Reliable_Website';

const standardStyleBlock = `    <!-- Persistent Floating Actions Styles (Visible from page start across all devices) -->
    <style>
      .floating-actions {
        position: fixed !important;
        right: 18px !important;
        right: calc(18px + env(safe-area-inset-right, 0px)) !important;
        top: 60% !important;
        bottom: auto !important;
        transform: translateY(-50%) !important;
        -webkit-transform: translateY(-50%) !important;
        z-index: 2147483647 !important;
        display: flex !important;
        flex-direction: column !important;
        gap: 12px !important;
        pointer-events: auto !important;
        visibility: visible !important;
        opacity: 1 !important;
      }
      .float-btn.whatsapp,
      .float-btn.call {
        display: flex !important;
        visibility: visible !important;
        opacity: 1 !important;
      }
      .float-btn.scroll-top,
      #scrollTopBtn.scroll-top,
      #scrollTopBtn {
        position: fixed !important;
        bottom: 25px !important;
        bottom: calc(25px + env(safe-area-inset-bottom, 0px)) !important;
        right: 18px !important;
        right: calc(18px + env(safe-area-inset-right, 0px)) !important;
        z-index: 2147483646 !important;
        background-color: var(--dark-navy) !important;
      }
      @media (max-width: 1024px) {
        .float-btn.scroll-top,
        #scrollTopBtn.scroll-top,
        #scrollTopBtn {
          right: 16px !important;
          right: calc(16px + env(safe-area-inset-right, 0px)) !important;
          bottom: 25px !important;
          bottom: calc(25px + env(safe-area-inset-bottom, 0px)) !important;
        }
        .floating-actions {
          right: 16px !important;
          right: calc(16px + env(safe-area-inset-right, 0px)) !important;
          bottom: 83px !important;
          bottom: calc(83px + env(safe-area-inset-bottom, 0px)) !important;
          top: auto !important;
          transform: none !important;
          -webkit-transform: none !important;
          z-index: 2147483647 !important;
          gap: 10px !important;
        }
        .float-btn {
          width: 48px !important;
          height: 48px !important;
        }
      }
    </style>`;

const htmlFiles = fs.readdirSync(baseDir).filter(f => f.endsWith('.html'));

const floatActionsStyleRegex = /\s*<!-- Persistent Floating Actions Styles[\s\S]*?<\/style>/;

let updated = 0;
for (const file of htmlFiles) {
  const filePath = path.join(baseDir, file);
  let html = fs.readFileSync(filePath, 'utf8');

  if (floatActionsStyleRegex.test(html)) {
    html = html.replace(floatActionsStyleRegex, '\n' + standardStyleBlock);
    
    // Bump cache parameter
    html = html.replace(/\?v=20261007_[0-9]+/g, '?v=20261007_8');

    fs.writeFileSync(filePath, html, 'utf8');
    updated++;
    console.log(`Updated style order in: ${file}`);
  }
}

console.log(`Successfully updated ${updated} HTML files.`);
