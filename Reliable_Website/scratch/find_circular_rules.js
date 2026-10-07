const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..');

function walk(dir) {
  let results = [];
  fs.readdirSync(dir).forEach(f => {
    const p = path.join(dir, f);
    if (f === 'node_modules' || f === '.git' || f === 'scratch') return;
    if (fs.statSync(p).isDirectory()) results = results.concat(walk(p));
    else results.push(p);
  });
  return results;
}

const files = walk(rootDir).filter(f => f.endsWith('.html') || f.endsWith('.css'));

files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  // Match any selector with before or after having border-radius: 50%
  const regex = /([^{}]+)\{([^{}]*border-radius\s*:\s*50%[^{}]*)\}/gi;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const selector = match[1].trim();
    const body = match[2];
    if (selector.includes('before') || selector.includes('after') || body.includes('accent-orange') || body.includes('#F47B20') || body.includes('orange')) {
      console.log(`${file}:`);
      console.log(`  Selector: ${selector}`);
      console.log(`  Rule: ${body.trim().replace(/\s+/g, ' ')}\n`);
    }
  }
});
