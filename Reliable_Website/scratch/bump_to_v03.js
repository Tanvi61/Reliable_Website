const fs = require('fs');

const OLD_VERSION = '20261010_02';
const NEW_VERSION = '20261010_03';

const htmlFiles = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'hero-test.html' && f !== 'ups.html');

console.log(`Bumping asset version from ${OLD_VERSION} to ${NEW_VERSION} in ${htmlFiles.length} files...`);

htmlFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(new RegExp(OLD_VERSION, 'g'), NEW_VERSION);
  fs.writeFileSync(file, content, 'utf8');
  console.log(`Bumped version in ${file}`);
});

console.log('Finished bumping version sitewide.');
