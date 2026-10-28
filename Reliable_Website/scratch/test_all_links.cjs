const fs = require('fs');
const path = require('path');

const dir = 'e:/MindAxis_Web/Reliable_Website';

const activeHtmlFiles = [
    'index.html',
    'about.html',
    'land-survey-services.html',
    'topographical-survey.html',
    'dgps-gnss-control-survey.html',
    'total-station-survey.html',
    'rtk-drone-mapping-survey.html',
    'lidar-3d-scanning-survey.html',
    'drone-photogrammetry-survey.html',
    'road-highway-survey.html',
    'rail-metro-survey.html',
    'cad-gis-processing-services.html',
    'gallery.html',
    'contact.html',
    'review.html'
];

let totalLinksChecked = 0;
let brokenLinks = [];

activeHtmlFiles.forEach(file => {
    const filePath = path.join(dir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const hrefRegex = /href\s*=\s*["']([^"']+)["']/gi;
    let match;

    while ((match = hrefRegex.exec(content)) !== null) {
        let link = match[1].trim();

        // Skip external, tel, mailto, whatsapp, hash-only
        if (
            link.startsWith('http://') ||
            link.startsWith('https://') ||
            link.startsWith('tel:') ||
            link.startsWith('mailto:') ||
            link.startsWith('javascript:') ||
            link.startsWith('#') ||
            link === ''
        ) {
            continue;
        }

        // Clean link of any query params or hash fragments
        let cleanLink = link.split('?')[0].split('#')[0];
        if (!cleanLink) continue;

        totalLinksChecked++;
        const targetPath = path.join(dir, cleanLink);
        if (!fs.existsSync(targetPath)) {
            brokenLinks.push({ from: file, link: link, resolved: targetPath });
        }
    }
});

console.log(`\n--- LINK VALIDATION REPORT ---`);
console.log(`Total internal links checked: ${totalLinksChecked}`);
if (brokenLinks.length === 0) {
    console.log(`SUCCESS: 0 broken internal links! All links resolve to existing files.`);
} else {
    console.error(`FAIL: Found ${brokenLinks.length} broken links:`);
    console.log(brokenLinks);
}
