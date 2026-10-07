const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'hero-test.html');
for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const pos = content.indexOf('<div class="floating-actions"');
  const bodyPos = content.indexOf('<body>');
  console.log(f, 'pos:', pos, 'bodyPos:', bodyPos, 'diff:', pos - bodyPos);
}
