const fs = require('fs');
const path = require('path');

const dir = 'e:/MindAxis_Web/Reliable_Website';

const fileMap = {
    'services.html': 'land-survey-services.html',
    'road-highway.html': 'road-highway-survey.html',
    'rail-metro.html': 'rail-metro-survey.html',
    'dgps-gnss-control.html': 'dgps-gnss-control-survey.html',
    'drone-photogrammetry.html': 'drone-photogrammetry-survey.html',
    'rtk-drone-mapping.html': 'rtk-drone-mapping-survey.html',
    'lidar-3d-scanning.html': 'lidar-3d-scanning-survey.html',
    'cad-gis-processing.html': 'cad-gis-processing-services.html'
};

for (const [oldName, newName] of Object.entries(fileMap)) {
    const oldPath = path.join(dir, oldName);
    const newPath = path.join(dir, newName);
    if (fs.existsSync(oldPath)) {
        fs.copyFileSync(oldPath, newPath);
        console.log(`Copied ${oldName} -> ${newName}`);
    } else {
        console.error(`Missing source file: ${oldName}`);
    }
}
