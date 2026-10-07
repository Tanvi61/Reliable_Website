const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');
const htmlFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

htmlFiles.forEach(file => {
  const filePath = path.join(rootDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  if (content.includes('responsive.css?v=20261007_2')) {
    content = content.replace(/responsive\.css\?v=20261007_2/g, 'responsive.css?v=20261007_3');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Bumped cache query in ${file}`);
  }
});
