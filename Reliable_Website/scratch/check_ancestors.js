const fs = require('fs');

const html = fs.readFileSync('contact.html', 'utf8');

// Parse tags to find ancestors of .floating-actions
const lines = html.split('\n');
let depth = 0;
let stack = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('class="floating-actions"')) {
    console.log('Floating actions is on line', i + 1);
    console.log('Current open tags stack:', stack);
    break;
  }
  
  // match opening tags
  const openTags = line.matchAll(/<([a-zA-Z0-9]+)(\s+[^>]*?)?(?<!\/)>/g);
  for (const m of openTags) {
    const tag = m[1].toLowerCase();
    if (!['meta', 'link', 'img', 'br', 'hr', 'input', 'path', 'polyline', 'polygon', 'circle', 'line'].includes(tag)) {
      stack.push({ tag, line: i + 1, snippet: m[0].slice(0, 50) });
    }
  }
  
  // match closing tags
  const closeTags = line.matchAll(/<\/([a-zA-Z0-9]+)>/g);
  for (const m of closeTags) {
    const tag = m[1].toLowerCase();
    for (let j = stack.length - 1; j >= 0; j--) {
      if (stack[j].tag === tag) {
        stack.splice(j, 1);
        break;
      }
    }
  }
}
