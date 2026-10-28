const fs = require('fs');
const path = require('path');

const dir = 'e:/MindAxis_Web/Reliable_Website';

const files = [
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

files.forEach(f => {
    const content = fs.readFileSync(path.join(dir, f), 'utf8');
    const lines = content.split('\n');
    console.log(`\n=================== ${f} ===================`);
    lines.forEach((line, idx) => {
        if (line.includes('<img')) {
            console.log(`Line ${idx + 1}: ${line.trim()}`);
        }
    });
});
