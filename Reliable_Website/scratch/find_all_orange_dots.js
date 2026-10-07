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

const files = walk(rootDir);

files.forEach(file => {
  if (!file.endsWith('.html') && !file.endsWith('.css') && !file.endsWith('.js')) return;
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    // Check for border-radius: 50% with orange or background
    if ((line.includes('border-radius: 50%') || line.includes('border-radius:50%')) && 
        (line.includes('orange') || line.includes('#F47B20') || line.includes('var(--accent-orange)'))) {
      console.log(`${file}:${idx+1} [border-radius dot]: ${line.trim()}`);
    }
    // Check for • or &bull; or bullet
    if (line.includes('•') || line.includes('&bull;')) {
      console.log(`${file}:${idx+1} [bullet symbol]: ${line.trim()}`);
    }
    // Check for class containing dot
    if (line.includes('dot') && (line.includes('orange') || line.includes('accent'))) {
      console.log(`${file}:${idx+1} [dot class]: ${line.trim()}`);
    }
  });
});
