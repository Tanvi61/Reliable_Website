const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

// 1. Update css/style.css
const styleCssPath = path.join(rootDir, 'css', 'style.css');
let styleCss = fs.readFileSync(styleCssPath, 'utf8');

// Update .float-btn.call color from navy to accent-orange
styleCss = styleCss.replace(
  /\.float-btn\.call\s*\{[^}]*\}/g,
  `.float-btn.call {\n  background-color: var(--accent-orange) !important;\n}\n\n.float-btn.call:hover {\n  background-color: #d96814 !important;\n}`
);

// Add footer social link styles if not present
if (!styleCss.includes('.footer-social-link')) {
  const socialStyles = `
/* Footer Social Icons */
.footer-social-icons {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 6px;
}

.footer-social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  transition: transform 0.25s ease, background-color 0.25s ease, color 0.25s ease, box-shadow 0.25s ease;
}

.footer-social-link:hover {
  transform: translateY(-3px) scale(1.08);
}

.footer-social-link.instagram {
  color: #E1306C;
  background: rgba(225, 48, 108, 0.1);
}
.footer-social-link.instagram:hover {
  background: #E1306C;
  color: #FFFFFF;
  box-shadow: 0 4px 12px rgba(225, 48, 108, 0.35);
}

.footer-social-link.facebook {
  color: #1877F2;
  background: rgba(24, 119, 242, 0.1);
}
.footer-social-link.facebook:hover {
  background: #1877F2;
  color: #FFFFFF;
  box-shadow: 0 4px 12px rgba(24, 119, 242, 0.35);
}

.footer-social-link.youtube {
  color: #FF0000;
  background: rgba(255, 0, 0, 0.1);
}
.footer-social-link.youtube:hover {
  background: #FF0000;
  color: #FFFFFF;
  box-shadow: 0 4px 12px rgba(255, 0, 0, 0.35);
}
`;
  styleCss += '\n' + socialStyles;
}

fs.writeFileSync(styleCssPath, styleCss, 'utf8');
console.log('Updated css/style.css');

// 2. Update all 15 HTML files
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

const socialIconsHtml = `<div class="footer-social-icons" style="display: flex; align-items: center; gap: 12px; margin-top: 6px;">
                            <a href="https://www.instagram.com/" target="_blank" rel="noopener" class="footer-social-link instagram" aria-label="Instagram" style="color: #E1306C; display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 50%; background: rgba(225, 48, 108, 0.1); transition: all 0.25s ease;">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                </svg>
                            </a>
                            <a href="https://www.facebook.com/" target="_blank" rel="noopener" class="footer-social-link facebook" aria-label="Facebook" style="color: #1877F2; display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 50%; background: rgba(24, 119, 242, 0.1); transition: all 0.25s ease;">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                </svg>
                            </a>
                            <a href="https://www.youtube.com/" target="_blank" rel="noopener" class="footer-social-link youtube" aria-label="YouTube" style="color: #FF0000; display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 50%; background: rgba(255, 0, 0, 0.1); transition: all 0.25s ease;">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                </svg>
                            </a>
                        </div>`;

htmlFiles.forEach(file => {
  const filePath = path.join(rootDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const isCRLF = content.includes('\r\n');
  let normContent = content.replace(/\r\n/g, '\n');

  // 1. Replace the footer WhatsApp link in Column 4 with socialIconsHtml
  const footerStart = normContent.indexOf('<footer');
  const footerEnd = normContent.indexOf('</footer>', footerStart);

  if (footerStart !== -1 && footerEnd !== -1) {
    let footerPart = normContent.substring(footerStart, footerEnd);
    // Replace <a ... wa.me ...> ... </a>
    const waRegex = /<a\b[^>]*href="https:\/\/wa\.me\/919604648777"[^>]*>[\s\S]*?<\/a>/i;
    if (waRegex.test(footerPart)) {
      footerPart = footerPart.replace(waRegex, socialIconsHtml);
      normContent = normContent.substring(0, footerStart) + footerPart + normContent.substring(footerEnd);
    }
  }

  // 2. Update .float-btn.call inline style to orange background
  normContent = normContent.replace(
    /<a href="tel:\+919604648777" class="float-btn call"[^>]*>/g,
    '<a href="tel:+919604648777" class="float-btn call" style="background-color: var(--accent-orange) !important;">'
  );

  // 3. Increment cache buster query string to 20261006_7
  normContent = normContent.replace(/href="css\/style\.css(\?[^"]*)?"/g, 'href="css/style.css?v=20261006_7"');
  normContent = normContent.replace(/href="css\/responsive\.css(\?[^"]*)?"/g, 'href="css/responsive.css?v=20261006_7"');

  fs.writeFileSync(filePath, isCRLF ? normContent.replace(/\n/g, '\r\n') : normContent, 'utf8');
  console.log(`Updated social icons & call button in: ${file}`);
});
