const fs = require('fs');
const c = fs.readFileSync('contact.html', 'utf8');
const lines = c.split('\n');
lines.forEach((l, i) => {
  if (l.includes('section-label')) console.log(`${i+1}: ${l.trim()}`);
});
