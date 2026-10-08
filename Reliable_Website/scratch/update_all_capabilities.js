const fs = require('fs');
const path = require('path');

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

const icons = [
  `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3l4 8 5-5 5 15H2L8 3z"/><path d="M4 18h16"/></svg>`,
  `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>`,
  `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>`,
  `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`
];

let updatedCount = 0;

files.forEach(fileName => {
  const filePath = path.join(__dirname, '..', fileName);
  if (!fs.existsSync(filePath)) return;

  let content = fs.readFileSync(filePath, 'utf8');

  // Match the entire KEY SERVICE CAPABILITIES section
  const sectionRegex = /<!--\s*KEY SERVICE CAPABILITIES\s*-->\s*<section[\s\S]*?<\/section>/;
  const match = content.match(sectionRegex);

  if (!match) {
    console.warn(`[NO MATCH] ${fileName}`);
    return;
  }

  const sectionHtml = match[0];

  // Extract the 4 cards data: title (h3) and description (p)
  // Cards in old format: <div style="background: #ffffff; border-radius: 12px;..."><div ...><h3 ...>(title)</h3></div><p ...>(desc)</p></div>
  const cardRegex = /<h3[^>]*>(.*?)<\/h3>[\s\S]*?<p[^>]*>(.*?)<\/p>/g;
  const cardsData = [];
  let cardMatch;
  while ((cardMatch = cardRegex.exec(sectionHtml)) !== null) {
    cardsData.push({
      title: cardMatch[1].trim(),
      desc: cardMatch[2].trim()
    });
  }

  if (cardsData.length < 4) {
    console.warn(`[NOT 4 CARDS: ${cardsData.length}] in ${fileName}`);
    return;
  }

  let cardsHtml = '';
  cardsData.forEach((cd, idx) => {
    const isNavy = idx % 2 === 1;
    const themeClass = isNavy ? 'capability-card theme-navy' : 'capability-card';
    const iconSvg = icons[idx % icons.length];

    cardsHtml += `                <!-- Card ${idx + 1} -->
                <div class="${themeClass}">
                    <div class="cap-icon-box">
                        ${iconSvg}
                    </div>
                    <h3>${cd.title}</h3>
                    <p>${cd.desc}</p>
                </div>\n`;
  });

  const newSectionHtml = `<!-- KEY SERVICE CAPABILITIES -->
    <section class="section capabilities-theme-section" style="padding: 85px 0;">
        <div class="container" style="position: relative; z-index: 1;">
            <div class="text-center" style="margin-bottom: 50px;">
                <div class="section-label" style="margin-bottom: 8px;">CORE DELIVERABLES</div>
                <h2 class="section-heading" style="font-size: clamp(1.8rem, 3vw, 2.3rem); color: var(--dark-navy); font-weight: 800; font-family: var(--font-heading); margin: 0 0 12px 0;">Key Capabilities & Applications</h2>
                <p style="color: var(--text-muted); max-width: 650px; margin: 0 auto; font-size: 15px; line-height: 1.6;">Designed to provide high accuracy for engineers, architects, developers, and project managers.</p>
            </div>

            <div class="capabilities-grid">
${cardsHtml}            </div>
        </div>
    </section>`;

  content = content.replace(sectionRegex, newSectionHtml);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`[SUCCESS] Updated ${fileName}`);
  updatedCount++;
});

console.log(`Finished updating ${updatedCount} / ${files.length} service sub-pages.`);
