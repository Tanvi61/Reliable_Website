const fs = require('fs');
['index.html', 'about.html', 'topographical-survey.html'].forEach(f => {
  const c = fs.readFileSync(f, 'utf8');
  const start = c.indexOf('<div class="footer-brand">');
  const nextCol = c.indexOf('<div class="footer-col">', start);
  console.log('=== ' + f + ' ===');
  console.log(c.substring(start, nextCol));
});
