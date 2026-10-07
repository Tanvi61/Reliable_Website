const fs = require('fs');
fs.readdirSync('.').filter(f => f.endsWith('.html')).forEach(f => {
  const content = fs.readFileSync(f, 'utf8');
  const lines = content.split('\n');
  lines.forEach((l, idx) => {
    if (l.includes('class="floating-actions"') || l.includes("class='floating-actions'")) {
      console.log(`${f} line ${idx + 1} (total ${lines.length}): ${l.slice(0, 70)}...`);
    }
  });
});
