const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html') && f !== 'ups.html' && f !== 'hero-test.html');

files.forEach(f => {
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  // Check for any font-family styles or serif or times or unusual fonts
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    if (line.includes('font-family') || line.includes('serif') || line.includes('Arial') || line.includes('Roboto')) {
      console.log(`${f}:${idx + 1} -> ${line.trim()}`);
    }
  });
});
