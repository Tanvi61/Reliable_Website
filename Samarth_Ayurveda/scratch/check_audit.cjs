const fs = require('fs');
const data = JSON.parse(fs.readFileSync("C:/Users/HP/.gemini/antigravity-ide/brain/e419adda-178e-4737-97b0-cf828728f817/responsive_audit.json"));

for (const dev in data) {
  console.log(`Device: ${data[dev].device} (${data[dev].resolution}) [${dev}]`);
  for (const page in data[dev].pages) {
    const p = data[dev].pages[page];
    console.log(`  Page: ${page.padEnd(10)} | winWidth: ${p.winWidth} | docWidth: ${p.docWidth} | bodyWidth: ${p.bodyWidth} | hasHorizontalScroll: ${p.hasHorizontalScroll}`);
  }
}
