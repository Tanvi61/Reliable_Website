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

let totalJsonLd = 0;
let errors = 0;

activeHtmlFiles.forEach(file => {
    const filePath = path.join(dir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    const jsonLdRegex = /<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi;
    let match;

    while ((match = jsonLdRegex.exec(content)) !== null) {
        totalJsonLd++;
        try {
            const parsed = JSON.parse(match[1]);
        } catch (e) {
            console.error(`Invalid JSON-LD in ${file}:`, e.message);
            errors++;
        }
    }
});

console.log(`\n--- JSON-LD VALIDATION ---`);
console.log(`Total JSON-LD blocks: ${totalJsonLd}`);
if (errors === 0) {
    console.log(`SUCCESS: All ${totalJsonLd} JSON-LD blocks are perfectly valid JSON!`);
} else {
    console.error(`Found ${errors} JSON-LD errors.`);
}
