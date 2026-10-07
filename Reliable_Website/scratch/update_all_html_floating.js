const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const htmlFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

console.log('Found HTML files:', htmlFiles.length);

htmlFiles.forEach(file => {
  const filePath = path.join(rootDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // 1. In <head> style block, update top: 50% under max-width: 1024px to top: 40%
  // Specifically:
  // @media (max-width: 1024px) {
  //   .floating-actions {
  //     ...
  //     top: 50% !important;
  const mediaFloatRegex = /(@media\s*\(\s*max-width\s*:\s*1024px\s*\)\s*\{[\s\S]*?\.floating-actions\s*\{[\s\S]*?top:\s*)50%(\s*!important)/g;
  if (mediaFloatRegex.test(content)) {
    content = content.replace(mediaFloatRegex, '$140%$2');
    changed = true;
  }

  // 2. Remove the inline top: 50% !important on <div class="floating-actions" ...>
  // so that the responsive media query can take effect on mobile/tab!
  const inlineFloatRegex = /<div class=["']floating-actions["']\s+style=["'][^"']*["']>/g;
  if (inlineFloatRegex.test(content)) {
    content = content.replace(inlineFloatRegex, '<div class="floating-actions">');
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  } else {
    console.log(`No change needed for ${file}`);
  }
});

console.log('All files updated successfully.');
