const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(f => {
  const filePath = path.join(dir, f);
  const content = fs.readFileSync(filePath, 'utf8');
  const fontMatches = content.match(/font-family:[^;\"'>]+/gi) || [];
  const googleFont = content.includes('fonts.googleapis.com');
  console.log(`${f} -> Google Fonts in head: ${googleFont}, inline font-families: ${JSON.stringify(fontMatches)}`);
});
