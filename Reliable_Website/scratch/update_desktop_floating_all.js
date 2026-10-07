const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const htmlFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

console.log('Found HTML files:', htmlFiles.length);

htmlFiles.forEach(file => {
  const filePath = path.join(rootDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // Replace desktop top: 50% on .floating-actions with top: 60%
  // Pattern:
  // .floating-actions {
  //   position: fixed !important;
  //   right: 18px !important;
  //   ...
  //   top: 50% !important;
  const desktopFloatRegex = /(\.floating-actions\s*\{[\s\S]*?right:\s*18px\s*!important;[\s\S]*?top:\s*)50%(\s*!important)/g;
  if (desktopFloatRegex.test(content)) {
    content = content.replace(desktopFloatRegex, '$160%$2');
    changed = true;
  }

  // Also bump cache query string from v20261007_3 to v20261007_4
  if (content.includes('responsive.css?v=20261007_3')) {
    content = content.replace(/responsive\.css\?v=20261007_3/g, 'responsive.css?v=20261007_4');
    changed = true;
  }
  if (content.includes('style.css?v=20261007_2')) {
    content = content.replace(/style\.css\?v=20261007_2/g, 'style.css?v=20261007_4');
    changed = true;
  } else if (content.includes('style.css?v=')) {
    content = content.replace(/style\.css\?v=[^"']*/g, 'style.css?v=20261007_4');
    changed = true;
  } else if (content.includes('style.css"')) {
    content = content.replace(/style\.css"/g, 'style.css?v=20261007_4"');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  } else {
    console.log(`No change for ${file}`);
  }
});

console.log('Desktop floating actions updated sitewide.');
