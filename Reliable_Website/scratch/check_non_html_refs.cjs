const fs = require('fs');
const path = require('path');

const dir = 'e:/MindAxis_Web/Reliable_Website';
const targetUrls = [
    'road-highway.html',
    'rail-metro.html',
    'dgps-gnss-control.html',
    'drone-photogrammetry.html',
    'rtk-drone-mapping.html',
    'lidar-3d-scanning.html',
    'cad-gis-processing.html',
    'services.html'
];

function scanDir(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(currentDir, entry.name);
        if (entry.isDirectory()) {
            if (entry.name !== 'node_modules' && entry.name !== '.git' && entry.name !== 'scratch') {
                scanDir(fullPath);
            }
        } else if (entry.isFile() && (entry.name.endsWith('.js') || entry.name.endsWith('.css') || entry.name.endsWith('.xml') || entry.name.endsWith('.txt'))) {
            const content = fs.readFileSync(fullPath, 'utf8');
            targetUrls.forEach(u => {
                if (content.includes(u)) {
                    console.log(`Found "${u}" in ${path.relative(dir, fullPath)}`);
                }
            });
        }
    }
}

scanDir(dir);
