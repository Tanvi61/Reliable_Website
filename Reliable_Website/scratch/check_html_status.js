const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
console.log('Found', files.length, 'HTML files');
for (const f of files) {
  const content = fs.readFileSync(f, 'utf8');
  const hasBottom83 = content.includes('bottom: 83px');
  const hasTop55 = content.includes('top: 55%');
  const hasTop60 = content.includes('top: 60%');
  const vMatch = content.match(/style\.css\?v=([^"]+)/);
  console.log(f, { hasBottom83, hasTop55, hasTop60, version: vMatch ? vMatch[1] : null });
}
