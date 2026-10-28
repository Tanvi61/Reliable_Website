const fs = require('fs');
const path = require('path');

const dir = 'e:/MindAxis_Web/Reliable_Website';
const imgDir = path.join(dir, 'assets/images');

// 1. Rename / Copy image files so both hyphens and legacy exist
const imageCopies = [
    { from: 'rtk_drone_latest.jpg', to: 'rtk-drone-latest.jpg' },
    { from: 'drone_photogrammetry.jpg', to: 'drone-photogrammetry.jpg' },
    { from: 'rail_metro.jpg', to: 'rail-metro.jpg' },
    { from: 'road_highway.jpg', to: 'road-highway.jpg' },
    { from: 'Our-process-bg.png', to: 'our-process-bg.png' }
];

imageCopies.forEach(pair => {
    const src = path.join(imgDir, pair.from);
    const dest = path.join(imgDir, pair.to);
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
        console.log(`Created asset copy: ${pair.from} -> ${pair.to}`);
    } else {
        console.warn(`Source image not found: ${pair.from}`);
    }
});

// 2. Replacements across all HTML, CSS, JS files
const textReplacements = [
    { from: 'assets/images/rtk_drone_latest.jpg', to: 'assets/images/rtk-drone-latest.jpg' },
    { from: 'assets/images/drone_photogrammetry.jpg', to: 'assets/images/drone-photogrammetry.jpg' },
    { from: 'assets/images/rail_metro.jpg', to: 'assets/images/rail-metro.jpg' },
    { from: 'assets/images/road_highway.jpg', to: 'assets/images/road-highway.jpg' },
    { from: 'Our-process-bg.png', to: 'our-process-bg.png' },
    { from: '?v=20261010_11', to: '?v=20261010-11' },
    { from: '?v=20261010_06', to: '?v=20261010-06' }
];

function updateFilesInDir(subDir) {
    const fullDir = path.join(dir, subDir);
    const files = fs.readdirSync(fullDir);
    files.forEach(f => {
        const fullPath = path.join(fullDir, f);
        if (fs.statSync(fullPath).isDirectory()) return;
        if (!f.endsWith('.html') && !f.endsWith('.css') && !f.endsWith('.js') && !f.endsWith('.xml')) return;
        if (f === 'ups.html' || f === 'hero-test.html') return;

        let content = fs.readFileSync(fullPath, 'utf8');
        let modified = false;

        textReplacements.forEach(r => {
            if (content.includes(r.from)) {
                content = content.split(r.from).join(r.to);
                modified = true;
            }
        });

        if (modified) {
            fs.writeFileSync(fullPath, content, 'utf8');
            console.log(`Updated URLs in: ${path.join(subDir, f)}`);
        }
    });
}

updateFilesInDir('');
updateFilesInDir('css');
updateFilesInDir('js');

console.log('Asset URLs successfully updated to strict hyphenated format!');
