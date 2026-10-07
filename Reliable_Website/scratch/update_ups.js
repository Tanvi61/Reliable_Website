const fs = require('fs');

let content = fs.readFileSync('ups.html', 'utf8');

const headStyle = `    <!-- Persistent Floating Actions Styles -->
    <style>
      .floating-actions {
        position: fixed !important;
        right: 18px !important;
        right: calc(18px + env(safe-area-inset-right, 0px)) !important;
        top: 50% !important;
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
      @media (max-width: 1024px) {
        .floating-actions {
          right: 14px !important;
          right: calc(14px + env(safe-area-inset-right, 0px)) !important;
          top: 50% !important;
          bottom: auto !important;
          transform: translateY(-50%) !important;
          -webkit-transform: translateY(-50%) !important;
          z-index: 2147483647 !important;
          gap: 10px !important;
        }
        .float-btn {
          width: 48px !important;
          height: 48px !important;
        }
      }
      .float-btn.float-wa,
      .float-btn.float-call {
        display: flex !important;
        visibility: visible !important;
        opacity: 1 !important;
      }
      .float-btn.back-to-top {
        position: fixed !important;
        bottom: 25px !important;
        bottom: calc(25px + env(safe-area-inset-bottom, 0px)) !important;
        right: 20px !important;
        right: calc(20px + env(safe-area-inset-right, 0px)) !important;
        z-index: 2147483646 !important;
      }
    </style>
`;

const bodyFloating = `
    <!-- Floating Quick Actions (Persistent on right side from top to bottom) -->
    <div class="floating-actions" style="position: fixed !important; right: 18px !important; top: 50% !important; bottom: auto !important; transform: translateY(-50%) !important; -webkit-transform: translateY(-50%) !important; z-index: 2147483647 !important; display: flex !important; flex-direction: column !important; gap: 12px !important; pointer-events: auto !important;">
        <a href="tel:+919372228042" class="float-btn float-call" aria-label="Call Now" style="display: flex !important; visibility: visible !important; opacity: 1 !important;">
            <i class="fa-solid fa-phone"></i>
            <span class="float-tooltip">Call Now</span>
        </a>
        <a href="https://wa.me/919372228042?text=Hello%20Unique%20Power%20Solutions" target="_blank" rel="noopener noreferrer" class="float-btn float-wa" id="waFloatBtn" aria-label="WhatsApp Chat" style="display: flex !important; visibility: visible !important; opacity: 1 !important;">
            <i class="fa-brands fa-whatsapp"></i>
            <span class="float-tooltip">WhatsApp Chat</span>
        </a>
    </div>

    <!-- Standalone Scroll to Top Button (Bottom right) -->
    <button class="float-btn back-to-top" id="backToTop" aria-label="Scroll to top" style="position: fixed !important; bottom: 25px !important; right: 20px !important; z-index: 2147483646 !important; display: none !important;">
        <i class="fa-solid fa-arrow-up"></i>
        <span class="float-tooltip">Scroll to Top</span>
    </button>
`;

// Remove from bottom
content = content.replace(
  /\s*<!-- SECTION 13: Floating Action Buttons[\s\S]*?<div class="floating-actions">[\s\S]*?<\/div>/,
  ''
);

// Add to head if not present
if (!content.includes('Persistent Floating Actions Styles')) {
  content = content.replace('</head>', headStyle + '</head>');
}

// Add after body
content = content.replace('<body>', '<body>' + bodyFloating);

fs.writeFileSync('ups.html', content, 'utf8');
console.log('Updated ups.html');
