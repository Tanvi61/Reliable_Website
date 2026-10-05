const fs = require('fs');
const path = require('path');

const dir = 'e:/MindAxis_Web/Reliable_Website';

const files = [
  'topographical-survey.html',
  'dgps-gnss-control.html',
  'total-station-survey.html',
  'rtk-drone-mapping.html',
  'lidar-3d-scanning.html',
  'drone-photogrammetry.html',
  'road-highway.html',
  'rail-metro.html',
  'cad-gis-processing.html'
];

files.forEach(file => {
  const filePath = path.join(dir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Find the FAQ details items
    // Replace <details ...> ... </details> with <div class="faq-card fade-up"> ... </div>
    const regex = /<details[\s\S]*?class="faq-item fade-up"[\s\S]*?>([\s\S]*?)<\/details>/g;

    let updated = content.replace(regex, (match, inner) => {
      // Extract summary text (question)
      const summaryMatch = inner.match(/<summary[\s\S]*?>([\s\S]*?)<\/summary>/);
      let question = '';
      if (summaryMatch) {
        // remove the svg inside summary
        question = summaryMatch[1].replace(/<svg[\s\S]*?<\/svg>/, '').trim();
      }

      // Extract description text
      let description = '';
      const divMatch = inner.match(/<div[\s\S]*?>([\s\S]*?)<\/div>/);
      if (divMatch) {
        description = divMatch[1].trim();
      }

      return `<div class="faq-card fade-up">
                <div class="faq-card-header">
                    <span class="faq-question">${question}</span>
                    <div class="faq-icon-pill">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                    </div>
                </div>
                <div class="faq-card-body">
                    <div class="faq-card-content">
                        ${description}
                    </div>
                </div>
            </div>`;
    });

    // Also wrap the container in class="faq-list"
    updated = updated.replace(/<div style="max-width: 820px; margin: 0 auto; display: flex; flex-direction: column; gap: 16px;">/g, '<div class="faq-list">');

    if (updated !== content) {
      fs.writeFileSync(filePath, updated, 'utf8');
      console.log(`Successfully updated FAQs in ${file}`);
    } else {
      console.log(`No match in ${file}`);
    }
  }
});
