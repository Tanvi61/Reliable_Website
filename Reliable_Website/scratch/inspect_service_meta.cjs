const fs = require('fs');
const path = require('path');

const dir = 'e:/MindAxis_Web/Reliable_Website';
const servicePages = [
    'topographical-survey.html',
    'dgps-gnss-control.html',
    'total-station-survey.html',
    'rtk-drone-mapping.html',
    'lidar-3d-scanning.html',
    'drone-photogrammetry.html',
    'road-highway.html',
    'rail-metro.html',
    'cad-gis-processing.html',
    'services.html'
];

servicePages.forEach(file => {
    const content = fs.readFileSync(path.join(dir, file), 'utf8');
    const titleMatch = content.match(/<title>([^<]*)<\/title>/i);
    const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    const canonicalMatch = content.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i);
    
    console.log(`\n=== ${file} ===`);
    console.log('Title:', titleMatch ? titleMatch[1].trim() : 'NONE');
    console.log('H1:', h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ') : 'NONE');
    console.log('Canonical:', canonicalMatch ? canonicalMatch[1] : 'NONE');
});
