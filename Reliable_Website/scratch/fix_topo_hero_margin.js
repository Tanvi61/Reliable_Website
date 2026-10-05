const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..');

// 1. Service detail pages
const servicePages = [
    'topographical-survey.html',
    'cad-gis-processing.html',
    'dgps-gnss-control.html',
    'drone-photogrammetry.html',
    'lidar-3d-scanning.html',
    'rail-metro.html',
    'road-highway.html',
    'rtk-drone-mapping.html',
    'total-station-survey.html'
];

servicePages.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace margin-top: 80px with margin-top: 135px
    const updated = content.replace(
        /style="background-color:\s*var\(--dark-navy\);\s*padding:\s*40px 0;\s*margin-top:\s*80px;\s*text-align:\s*center;"/g,
        'style="background-color: var(--dark-navy); padding: 50px 20px; margin-top: 135px; text-align: center;"'
    );
    
    if (updated !== content) {
        fs.writeFileSync(filePath, updated, 'utf8');
        console.log(`Updated margin-top in ${file}`);
    } else {
        console.log(`Pattern not matched in ${file}, checking general regex...`);
        const fallbackUpdated = content.replace(
            /margin-top:\s*80px;/g,
            'margin-top: 135px;'
        );
        fs.writeFileSync(filePath, fallbackUpdated, 'utf8');
        console.log(`Fallback updated margin-top in ${file}`);
    }
});

// 2. Fix services.html mobile media query
const servicesPath = path.join(dir, 'services.html');
let servicesContent = fs.readFileSync(servicesPath, 'utf8');
servicesContent = servicesContent.replace(/margin-top:\s*80px\s*!important;/g, 'margin-top: 135px !important;');
fs.writeFileSync(servicesPath, servicesContent, 'utf8');
console.log('Updated services.html mobile hero margin');

// 3. Fix gallery.html hero content margin
const galleryPath = path.join(dir, 'gallery.html');
let galleryContent = fs.readFileSync(galleryPath, 'utf8');
galleryContent = galleryContent.replace(/margin-top:\s*120px;/g, 'margin-top: 140px;');
fs.writeFileSync(galleryPath, galleryContent, 'utf8');
console.log('Updated gallery.html hero margin');
