const fs = require('fs');

// 1. Update css/style.css to include .nav-quick-actions styles
let styleCss = fs.readFileSync('css/style.css', 'utf8');

const navQuickCss = `
/* ==========================================
   NAVBAR QUICK ACTIONS (Top WhatsApp & Call)
========================================== */
.nav-quick-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: auto;
  margin-right: 15px;
}

.nav-quick-btn {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #FFFFFF !important;
  text-decoration: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  flex-shrink: 0;
}

.nav-quick-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
}

.nav-quick-btn.whatsapp {
  background-color: #25D366 !important;
}

.nav-quick-btn.call {
  background-color: var(--accent-orange) !important;
}

.nav-quick-btn.call:hover {
  background-color: #d96814 !important;
}
`;

if (!styleCss.includes('.nav-quick-actions')) {
  styleCss += navQuickCss;
  console.log('Added .nav-quick-actions to css/style.css');
}
fs.writeFileSync('css/style.css', styleCss, 'utf8');

// 2. Update css/responsive.css
let respCss = fs.readFileSync('css/responsive.css', 'utf8');

const navQuickRespCss = `
/* Responsive Nav Quick Actions */
@media (max-width: 1024px) {
  .nav-quick-actions {
    display: flex !important;
    align-items: center !important;
    gap: 8px !important;
    margin-left: auto !important;
    margin-right: 12px !important;
    z-index: 1000001 !important;
  }
  .nav-quick-btn {
    width: 35px !important;
    height: 35px !important;
  }
  .nav-quick-btn svg {
    width: 16px !important;
    height: 16px !important;
  }
}
`;

if (!respCss.includes('.nav-quick-actions')) {
  respCss += navQuickRespCss;
  console.log('Added responsive rules for .nav-quick-actions to css/responsive.css');
}
fs.writeFileSync('css/responsive.css', respCss, 'utf8');

console.log('CSS updated successfully');
