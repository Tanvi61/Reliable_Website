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

let totalAssets = 0;
let brokenAssets = [];

activeHtmlFiles.forEach(file => {
    const filePath = path.join(dir, file);
    const content = fs.readFileSync(filePath, 'utf8');

    const regex = /(?:src|href)\s*=\s*["']([^"']+)["']/gi;
    let match;
    while ((match = regex.exec(content)) !== null) {
        let asset = match[1].trim();
        if (
            asset.startsWith('http://') ||
            asset.startsWith('https://') ||
            asset.startsWith('tel:') ||
            asset.startsWith('mailto:') ||
            asset.startsWith('javascript:') ||
            asset.startsWith('#') ||
            asset.endsWith('.html') ||
            asset === ''
        ) {
            continue;
        }

        const clean = asset.split('?')[0].split('#')[0];
        if (!clean) continue;

        totalAssets++;
        const targetPath = path.join(dir, clean);
        if (!fs.existsSync(targetPath)) {
            brokenAssets.push({ file, asset, targetPath });
        }
    }
});

console.log(`\n--- ASSET INTEGRITY REPORT ---`);
console.log(`Total assets checked: ${totalAssets}`);
if (brokenAssets.length === 0) {
    console.log(`SUCCESS: All ${totalAssets} assets exist on disk! 0 broken asset links.`);
} else {
    console.error(`FAIL: Found ${brokenAssets.length} broken assets:`, brokenAssets);
}
