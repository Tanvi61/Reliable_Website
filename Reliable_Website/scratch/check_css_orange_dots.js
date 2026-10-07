const fs = require('fs');
const css = fs.readFileSync('css/style.css', 'utf8');
const lines = css.split('\n');

lines.forEach((l, i) => {
  if (l.includes('border-radius: 50%') || l.includes('border-radius:50%')) {
    console.log(`Line ${i+1}: ${l.trim()}`);
  }
});
