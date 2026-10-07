const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

// 1. Update css/style.css
const styleCssPath = path.join(rootDir, 'css', 'style.css');
let styleCss = fs.readFileSync(styleCssPath, 'utf8');

const strictRule = `.section-label::before,
.section-label:before,
.section-label::after,
.section-label:after {
  display: none !important;
  content: none !important;
  content: "" !important;
  width: 0 !important;
  height: 0 !important;
  margin: 0 !important;
  padding: 0 !important;
  border: none !important;
  opacity: 0 !important;
  visibility: hidden !important;
}`;

// Replace .section-label::before in style.css
styleCss = styleCss.replace(
  /\.section-label::before\s*\{[^}]*\}/g,
  strictRule
);
fs.writeFileSync(styleCssPath, styleCss, 'utf8');
console.log('Updated css/style.css');

// 2. Update css/responsive.css
const respCssPath = path.join(rootDir, 'css', 'responsive.css');
let respCss = fs.readFileSync(respCssPath, 'utf8');
if (!respCss.includes('Strictly remove section-label orange dot in responsive')) {
  respCss += '\n\n/* Strictly remove section-label orange dot in responsive */\n' + strictRule + '\n';
  fs.writeFileSync(respCssPath, respCss, 'utf8');
  console.log('Updated css/responsive.css');
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

const inlineStyle = `
    <!-- Strictly remove section label orange dot sitewide -->
    <style>
        .section-label::before,
        .section-label:before,
        .section-label::after,
        .section-label:after {
            display: none !important;
            content: none !important;
            content: "" !important;
            width: 0 !important;
            height: 0 !important;
            margin: 0 !important;
            padding: 0 !important;
            border: none !important;
            opacity: 0 !important;
            visibility: hidden !important;
        }
    </style>`;

htmlFiles.forEach(file => {
  const filePath = path.join(rootDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Update stylesheet links with cache buster ?v=20261006_5
  content = content.replace(/href="css\/style\.css(\?[^"]*)?"/g, 'href="css/style.css?v=20261006_5"');
  content = content.replace(/href="css\/responsive\.css(\?[^"]*)?"/g, 'href="css/responsive.css?v=20261006_5"');

  // Remove any previous injected inline style to avoid duplicates
  content = content.replace(/\s*<!-- Strictly remove section label orange dot sitewide -->[\s\S]*?<\/style>/g, '');

  // Inject before </head>
  if (content.includes('</head>')) {
    content = content.replace('</head>', inlineStyle + '\n</head>');
  }

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Updated HTML and cache bust in: ${file}`);
});
