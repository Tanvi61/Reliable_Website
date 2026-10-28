const fs = require('fs');
const path = require('path');

const dir = 'e:/MindAxis_Web/Reliable_Website';
const htmlFiles = [
    'index.html',
    'about.html',
    'services.html',
    'topographical-survey.html',
    'dgps-gnss-control.html',
    'total-station-survey.html',
    'rtk-drone-mapping.html',
    'lidar-3d-scanning.html',
    'drone-photogrammetry.html',
    'road-highway.html',
    'rail-metro.html',
    'cad-gis-processing.html',
    'gallery.html',
    'contact.html',
    'review.html'
];

htmlFiles.forEach(file => {
    const content = fs.readFileSync(path.join(dir, file), 'utf8');
    const imgRegex = /<img\b([^>]*)>/gi;
    let match;
    console.log(`\n================= ${file} =================`);
    while ((match = imgRegex.exec(content)) !== null) {
        console.log(match[0].trim().replace(/\s+/g, ' '));
    }
});
