const fs = require('fs');
const path = require('path');

const dir = 'e:/MindAxis_Web/Reliable_Website';

// Helper function to update <img> tags cleanly
function updateImgTag(tagHtml, newAttrs) {
    let result = tagHtml;
    // Update or insert alt
    if (newAttrs.alt) {
        if (/alt\s*=\s*["'][^"']*["']/i.test(result)) {
            result = result.replace(/alt\s*=\s*["'][^"']*["']/i, `alt="${newAttrs.alt}"`);
        } else {
            result = result.replace(/^<img\b/i, `<img alt="${newAttrs.alt}"`);
        }
    }
    // Update or insert title
    if (newAttrs.title) {
        if (/title\s*=\s*["'][^"']*["']/i.test(result)) {
            result = result.replace(/title\s*=\s*["'][^"']*["']/i, `title="${newAttrs.title}"`);
        } else {
            result = result.replace(/^<img\b/i, `<img title="${newAttrs.title}"`);
        }
    }
    return result;
}

// 1. Process 9 Service Pages
const servicePagesData = [
    {
        file: 'topographical-survey.html',
        heroAlt: 'Topographical Land Survey Services - Contour Mapping & Boundary Demarcation in Pune',
        heroTitle: 'Topographical Survey Services - Accurate Elevation & Terrain Mapping',
        mainImg: 'assets/images/about.jpg',
        mainAlt: 'Topographical Survey Field Crew Measuring Contours and Spot Levels',
        mainTitle: 'Topographical Survey Field Execution - Ground Feature Demarcation'
    },
    {
        file: 'dgps-gnss-control-survey.html',
        heroAlt: 'DGPS & GNSS Geodetic Control Survey - Dual Frequency Satellite Positioning in Maharashtra',
        heroTitle: 'DGPS GNSS Control Survey - High Precision Geodetic Networks',
        mainImg: 'assets/images/highway.jpg',
        mainAlt: 'DGPS GNSS Satellite Receivers Establishing Ground Control Survey Baseline',
        mainTitle: 'DGPS GNSS Control Survey - High Precision Geodetic Benchmarks'
    },
    {
        file: 'total-station-survey.html',
        heroAlt: 'Total Station Survey Services - Millimeter Precision Construction Staking in Pune',
        heroTitle: 'Total Station Survey Services - Precise Alignment & Demarcation',
        mainImg: 'assets/images/railway.jpg',
        mainAlt: 'Total Station Survey Instrument Operating on Infrastructure Construction Site',
        mainTitle: 'Total Station Survey - Sub-Millimeter Optical Engineering Alignment'
    },
    {
        file: 'rtk-drone-mapping-survey.html',
        heroAlt: 'RTK Drone Mapping Survey Services - High Resolution Aerial Orthomosaic Mapping',
        heroTitle: 'RTK Drone Mapping Survey - Fast Aerial Photogrammetry Solutions',
        mainImg: 'assets/images/drone.jpg',
        mainAlt: 'RTK Drone Aerial Survey Equipment for Large Scale Land Mapping',
        mainTitle: 'RTK Drone Mapping Survey - Aerial Photogrammetry & Orthophoto Mapping'
    },
    {
        file: 'lidar-3d-scanning-survey.html',
        heroAlt: 'Drone LiDAR & 3D Laser Scanning Survey - High Density Point Cloud Terrain Modeling',
        heroTitle: 'Drone LiDAR 3D Scanning Survey - Dense Vegetation & Corridor Mapping',
        mainImg: 'assets/images/lidar.jpg',
        mainAlt: 'LiDAR Laser Scanner Generating 3D Point Cloud for Dense Topography',
        mainTitle: 'LiDAR 3D Scanning Survey - Dense Point Cloud Elevation Modeling'
    },
    {
        file: 'drone-photogrammetry-survey.html',
        heroAlt: 'Drone Photogrammetry Survey Services - Digital Surface Model DSM & DTM Generation',
        heroTitle: 'Drone Photogrammetry Survey - 3D Volumetric & Orthomosaic Analysis',
        mainImg: 'assets/images/drone_photogrammetry.jpg',
        mainAlt: 'Drone Photogrammetry Aerial Survey Flight for Volumetric Stockpile Analysis',
        mainTitle: 'Drone Photogrammetry Survey - 3D Surface & Terrain Modeling'
    },
    {
        file: 'road-highway-survey.html',
        heroAlt: 'Road and Highway Alignment Survey Services - Corridor Cross Section & L-Section Profiling',
        heroTitle: 'Road & Highway Survey Services - Expressway & Road Alignment Engineering',
        mainImg: 'assets/images/road_highway.jpg',
        mainAlt: 'Highway Corridor Alignment Survey and Cross Section Profile Mapping',
        mainTitle: 'Road & Highway Survey - Engineering Corridor & Topo Profiling'
    },
    {
        file: 'rail-metro-survey.html',
        heroAlt: 'Rail and Metro Infrastructure Survey Services - Viaduct, Pier & Track Alignment',
        heroTitle: 'Rail & Metro Survey Services - High Accuracy Mass Transit Corridor Mapping',
        mainImg: 'assets/images/rail_metro.jpg',
        mainAlt: 'Metro Rail Transit Route Alignment and Pier Construction Staking Survey',
        mainTitle: 'Rail & Metro Survey - Mass Transit Route & Viaduct Alignment'
    },
    {
        file: 'cad-gis-processing-services.html',
        heroAlt: 'CAD Drafting and GIS Data Processing Services - Spatial Database & Engineering Deliverables',
        heroTitle: 'CAD & GIS Processing Services - Digital Cartography & As-Built Plans',
        mainImg: 'assets/images/metro.jpg',
        mainAlt: 'GIS Spatial Database Mapping and AutoCAD Civil 3D Engineering Drawing Production',
        mainTitle: 'CAD & GIS Processing Services - Digital Drawings & Spatial Data Layers'
    }
];

servicePagesData.forEach(p => {
    const filePath = path.join(dir, p.file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Header Logo
    content = content.replace(
        /<div class="nav-logo">\s*<img src="assets\/logo\/logo-transparent\.png"[^>]*>/i,
        `<div class="nav-logo">\n            <img src="assets/logo/logo-transparent.png" alt="Reliable Land Survey Consultancy Pune - Land & Drone Survey Services" title="Reliable Land Survey Consultancy - Expert Land Surveyors in Pune, Maharashtra">`
    );

    // Hero banner
    content = content.replace(
        /<img src="assets\/images\/about-hero-clean\.jpg"[^>]*>/i,
        `<img src="assets/images/about-hero-clean.jpg" alt="${p.heroAlt}" title="${p.heroTitle}" class="bg-pan-anim" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; display: block; object-position: right center; z-index: 1;">`
    );

    // Main Image
    const mainImgRegex = new RegExp(`<img src="${p.mainImg.replace(/\//g, '\\/')}"[^>]*>`, 'i');
    content = content.replace(
        mainImgRegex,
        `<img src="${p.mainImg}" alt="${p.mainAlt}" title="${p.mainTitle}">`
    );

    // Footer Logo
    content = content.replace(
        /<img src="assets\/logo\/logo-transparent\.png" alt="Reliable Land Survey Consultancy" class="footer-logo-img"[^>]*>/i,
        `<img src="assets/logo/logo-transparent.png" alt="Reliable Land Survey Consultancy Official Logo - Pune Land Surveying Services" title="Reliable Land Survey Consultancy - High Precision Geospatial Engineering Solutions" class="footer-logo-img" style="height: 100px; width: auto; display: block;">`
    );

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Applied SEO images to ${p.file}`);
});

// 2. land-survey-services.html
{
    const filePath = path.join(dir, 'land-survey-services.html');
    let content = fs.readFileSync(filePath, 'utf8');

    // Header Logo
    content = content.replace(
        /<div class="nav-logo">\s*<img src="assets\/logo\/logo-transparent\.png"[^>]*>/i,
        `<div class="nav-logo">\n            <img src="assets/logo/logo-transparent.png" alt="Reliable Land Survey Consultancy Pune - Land & Drone Survey Services" title="Reliable Land Survey Consultancy - Expert Land Surveyors in Pune, Maharashtra">`
    );

    // Hero banner
    content = content.replace(
        /<img src="assets\/images\/about-hero-clean\.jpg"[^>]*>/i,
        `<img src="assets/images/about-hero-clean.jpg" alt="Comprehensive Land Surveying Solutions - DGPS, LiDAR, Total Station & Drone Survey Services" title="Our Survey Services - Complete Geospatial & Engineering Solutions" class="bg-pan-anim" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; display: block; object-position: right center; z-index: 1;">`
    );

    // Service card 1: Topographical Survey
    content = content.replace(
        /<img src="assets\/images\/about\.jpg" alt="Topographical Survey"[^>]*>/i,
        `<img src="assets/images/about.jpg" alt="Topographical Survey Services - Contour and Spot Level Mapping" title="Topographical Land Survey Services - Reliable Land Survey Consultancy" style="width: 100%; height: 220px; object-fit: cover;">`
    );

    // Service card 2: DGPS / GNSS
    content = content.replace(
        /<img src="assets\/images\/highway\.jpg" alt="DGPS \/ GNSS"[^>]*>/i,
        `<img src="assets/images/highway.jpg" alt="DGPS and GNSS Geodetic Control Survey Networks" title="DGPS & GNSS Control Survey - Geodetic Satellite Positioning" style="width: 100%; height: 220px; object-fit: cover;">`
    );

    // Service card 3: Total Station Survey
    content = content.replace(
        /<img src="assets\/images\/railway\.jpg" alt="Total Station Survey"[^>]*>/i,
        `<img src="assets/images/railway.jpg" alt="Total Station High Precision Layout and Staking Survey" title="Total Station Survey Services - Precise Engineering Measurements" style="width: 100%; height: 220px; object-fit: cover;">`
    );

    // Service card 4: RTK Drone Mapping
    content = content.replace(
        /<img src="assets\/images\/drone\.jpg" alt="RTK Drone Mapping"[^>]*>/i,
        `<img src="assets/images/drone.jpg" alt="RTK Drone Aerial Mapping Survey and Orthomosaic Deliverables" title="RTK Drone Mapping Survey - Fast UAV Photogrammetry" style="width: 100%; height: 220px; object-fit: cover;">`
    );

    // Service card 5: LiDAR Laser Scanning
    content = content.replace(
        /<img src="assets\/images\/lidar\.jpg" alt="LiDAR Laser Scanning"[^>]*>/i,
        `<img src="assets/images/lidar.jpg" alt="LiDAR 3D Laser Scanning Survey and Point Cloud Modeling" title="LiDAR 3D Scanning Survey - Terrestrial and Aerial Laser Scanning" style="width: 100%; height: 220px; object-fit: cover;">`
    );

    // Service card 6: CAD / GIS Services
    content = content.replace(
        /<img src="assets\/images\/metro\.jpg" alt="CAD \/ GIS Services"[^>]*>/i,
        `<img src="assets/images/metro.jpg" alt="CAD Drafting and GIS Data Processing Services" title="CAD & GIS Processing Services - Engineering Ready Deliverables" style="width: 100%; height: 220px; object-fit: cover;">`
    );

    // Service card 7: Drone Photogrammetry
    content = content.replace(
        /<img src="assets\/images\/drone_photogrammetry\.jpg" alt="Drone Photogrammetry"[^>]*>/i,
        `<img src="assets/images/drone_photogrammetry.jpg" alt="Drone Photogrammetry Survey for Volumetric and Terrain Modeling" title="Drone Photogrammetry Survey - 3D Elevation Modeling" style="width: 100%; height: 220px; object-fit: cover;">`
    );

    // Service card 8: Rail / Metro Surveys
    content = content.replace(
        /<img src="assets\/images\/rail_metro\.jpg" alt="Rail \/ Metro Surveys"[^>]*>/i,
        `<img src="assets/images/rail_metro.jpg" alt="Rail and Metro Rapid Transit Infrastructure Survey Services" title="Rail & Metro Survey - Track Alignment and Station Staking" style="width: 100%; height: 220px; object-fit: cover;">`
    );

    // Service card 9: Road / Highway Surveys
    content = content.replace(
        /<img src="assets\/images\/road_highway\.jpg" alt="Road \/ Highway Surveys"[^>]*>/i,
        `<img src="assets/images/road_highway.jpg" alt="Road and Highway Alignment Survey Services" title="Road & Highway Survey - Corridor Alignment and Cross-Sections" style="width: 100%; height: 220px; object-fit: cover;">`
    );

    // Footer Logo
    content = content.replace(
        /<img src="assets\/logo\/logo-transparent\.png" alt="Reliable Land Survey Consultancy" class="footer-logo-img"[^>]*>/i,
        `<img src="assets/logo/logo-transparent.png" alt="Reliable Land Survey Consultancy Official Logo - Pune Land Surveying Services" title="Reliable Land Survey Consultancy - High Precision Geospatial Engineering Solutions" class="footer-logo-img" style="height: 100px; width: auto; display: block;">`
    );

    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Applied SEO images to land-survey-services.html');
}

// 3. about.html
{
    const filePath = path.join(dir, 'about.html');
    let content = fs.readFileSync(filePath, 'utf8');

    // Header Logo
    content = content.replace(
        /<div class="nav-logo">\s*<img src="assets\/logo\/logo-transparent\.png"[^>]*>/i,
        `<div class="nav-logo">\n            <img src="assets/logo/logo-transparent.png" alt="Reliable Land Survey Consultancy Pune - Land & Drone Survey Services" title="Reliable Land Survey Consultancy - Expert Land Surveyors in Pune, Maharashtra">`
    );

    // Hero banner
    content = content.replace(
        /<img src="assets\/images\/about-hero-clean\.jpg"[^>]*>/i,
        `<img src="assets/images/about-hero-clean.jpg" alt="About Reliable Land Survey Consultancy - Advanced Engineering & Land Survey Services in Pune" title="Reliable Land Survey Consultancy - Trusted Land Surveying Team Pune" class="bg-pan-anim" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; display: block; object-position: right center; z-index: 1;">`
    );

    // Who we are
    content = content.replace(
        /<img src="assets\/images\/who-we-are-new\.jpg"[^>]*>/i,
        `<img src="assets/images/who-we-are-new.jpg" alt="Reliable Land Survey Consultancy Professional Survey Team and Field Engineers in Pune" title="Our Surveying Team - 15+ Years of Engineering & Geospatial Excellence" style="width: 100%; border-radius: 8px; border: 4px solid var(--accent-orange); box-shadow: 0 20px 40px rgba(244, 123, 32, 0.15); position: relative; z-index: 1;">`
    );

    // Total station expertise
    content = content.replace(
        /<img id="exp-img" src="assets\/images\/total-station\.jpg"[^>]*>/i,
        `<img id="exp-img" src="assets/images/total-station.jpg" alt="High Precision Digital Total Station Instrument for Construction Layout Survey" title="Total Station Surveying Technology - Sub-Millimeter Engineering Accuracy">`
    );

    // Footer Logo
    content = content.replace(
        /<img src="assets\/logo\/logo-transparent\.png" alt="Reliable Land Survey Consultancy" class="footer-logo-img"[^>]*>/i,
        `<img src="assets/logo/logo-transparent.png" alt="Reliable Land Survey Consultancy Official Logo - Pune Land Surveying Services" title="Reliable Land Survey Consultancy - High Precision Geospatial Engineering Solutions" class="footer-logo-img" style="height: 100px; width: auto; display: block;">`
    );

    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Applied SEO images to about.html');
}

// 4. contact.html
{
    const filePath = path.join(dir, 'contact.html');
    let content = fs.readFileSync(filePath, 'utf8');

    // Header Logo
    content = content.replace(
        /<div class="nav-logo">\s*<img src="assets\/logo\/logo-transparent\.png"[^>]*>/i,
        `<div class="nav-logo">\n            <img src="assets/logo/logo-transparent.png" alt="Reliable Land Survey Consultancy Pune - Land & Drone Survey Services" title="Reliable Land Survey Consultancy - Expert Land Surveyors in Pune, Maharashtra">`
    );

    // Hero banner
    content = content.replace(
        /<img src="assets\/images\/about-hero-clean\.jpg"[^>]*>/i,
        `<img src="assets/images/about-hero-clean.jpg" alt="Contact Reliable Land Survey Consultancy Pune - Request Survey Quotation & Site Mobilization" title="Contact Us - Reliable Land Survey Consultancy Pune Office" class="bg-pan-anim" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; display: block; object-position: right center; z-index: 1;">`
    );

    // Footer Logo
    content = content.replace(
        /<img src="assets\/logo\/logo-transparent\.png" alt="Reliable Land Survey Consultancy" class="footer-logo-img"[^>]*>/i,
        `<img src="assets/logo/logo-transparent.png" alt="Reliable Land Survey Consultancy Official Logo - Pune Land Surveying Services" title="Reliable Land Survey Consultancy - High Precision Geospatial Engineering Solutions" class="footer-logo-img" style="height: 100px; width: auto; display: block;">`
    );

    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Applied SEO images to contact.html');
}

// 5. review.html
{
    const filePath = path.join(dir, 'review.html');
    let content = fs.readFileSync(filePath, 'utf8');

    // Header Logo
    content = content.replace(
        /<div class="nav-logo">\s*<img src="assets\/logo\/logo-transparent\.png"[^>]*>/i,
        `<div class="nav-logo">\n            <img src="assets/logo/logo-transparent.png" alt="Reliable Land Survey Consultancy Pune - Land & Drone Survey Services" title="Reliable Land Survey Consultancy - Expert Land Surveyors in Pune, Maharashtra">`
    );

    // Hero banner
    content = content.replace(
        /<img src="assets\/images\/about-hero-clean\.jpg"[^>]*>/i,
        `<img src="assets/images/about-hero-clean.jpg" alt="Client Testimonials and Reviews - Reliable Land Survey Consultancy Project Feedback" title="Client Reviews - Proven Track Record in Land Surveying & Mapping" class="bg-pan-anim" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; display: block; object-position: right center; z-index: 1;">`
    );

    // Footer Logo
    content = content.replace(
        /<img src="assets\/logo\/logo-transparent\.png" alt="Reliable Land Survey Consultancy" class="footer-logo-img"[^>]*>/i,
        `<img src="assets/logo/logo-transparent.png" alt="Reliable Land Survey Consultancy Official Logo - Pune Land Surveying Services" title="Reliable Land Survey Consultancy - High Precision Geospatial Engineering Solutions" class="footer-logo-img" style="height: 100px; width: auto; display: block;">`
    );

    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Applied SEO images to review.html');
}

// 6. gallery.html
{
    const filePath = path.join(dir, 'gallery.html');
    let content = fs.readFileSync(filePath, 'utf8');

    // Header Logo
    content = content.replace(
        /<div class="nav-logo">\s*<img src="assets\/logo\/logo-transparent\.png"[^>]*>/i,
        `<div class="nav-logo">\n            <img src="assets/logo/logo-transparent.png" alt="Reliable Land Survey Consultancy Pune - Land & Drone Survey Services" title="Reliable Land Survey Consultancy - Expert Land Surveyors in Pune, Maharashtra">`
    );

    // Hero banner
    content = content.replace(
        /<img src="assets\/images\/about-hero-clean\.jpg"[^>]*>/i,
        `<img src="assets/images/about-hero-clean.jpg" alt="Reliable Land Survey Consultancy Field Project Gallery - On-Site Engineering Survey Work" title="Survey Project Gallery - Drone, DGPS & Total Station Field Operations" class="bg-pan-anim" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; display: block; object-position: right center; z-index: 1;">`
    );

    // Gallery images 1 to 9
    const galleryItems = [
        {
            src: 'assets/images/gallery-1.jpg',
            alt: 'Permanent Ground Control Benchmark Monument Built for Highway Infrastructure Survey',
            title: 'Survey Benchmark Ground Monument - Reliable Land Survey Consultancy'
        },
        {
            src: 'assets/images/gallery-2.jpg',
            alt: 'Rail & Metro Corridor Alignment Survey Using Precision Geodetic Instruments',
            title: 'Rail & Metro Infrastructure Alignment Survey Operation'
        },
        {
            src: 'assets/images/gallery-3.jpg',
            alt: 'State of the Art Survey Equipment - Total Station, RTK Drone & DGPS GNSS Receivers',
            title: 'Advanced Survey Instrumentation & Geospatial Hardware'
        },
        {
            src: 'assets/images/gallery-4.jpg',
            alt: 'Field Engineers Conducting DGPS GNSS Control & Total Station Layout on Construction Site',
            title: 'Construction Staking & Geodetic Layout Survey in Progress'
        },
        {
            src: 'assets/images/gallery-5.jpg',
            alt: 'Cadastral Boundary Demarcation and GIS Land Parcel Measurement in Rural Maharashtra',
            title: 'Cadastral Boundary Demarcation & GIS Land Parcel Survey'
        },
        {
            src: 'assets/images/gallery-6.jpg',
            alt: 'Highway Flyover and River Bridge Geodetic Survey Benchmark Installation',
            title: 'Bridge Infrastructure Survey Benchmark & Alignment'
        },
        {
            src: 'assets/images/gallery-7.jpg',
            alt: 'Expressway Drainage Culvert and Highway Corridor Profile Leveling Survey',
            title: 'Highway Culvert & Road Profile Leveling Survey'
        },
        {
            src: 'assets/images/gallery-8.jpg',
            alt: 'Residential Township and Plotted Land Layout Topographical Survey in Pune',
            title: 'Township Land Development Topographical Survey'
        },
        {
            src: 'assets/images/gallery-9.jpg',
            alt: 'Survey Engineers Deploying Drone Photogrammetry and Total Station in Mountainous Valley',
            title: 'Mountainous Valley Terrain Drone Survey & Photogrammetry'
        }
    ];

    galleryItems.forEach(item => {
        const regex = new RegExp(`<img src="${item.src.replace(/\//g, '\\/')}"[^>]*>`, 'i');
        content = content.replace(regex, `<img src="${item.src}" alt="${item.alt}" title="${item.title}" loading="lazy">`);
    });

    // Lightbox image
    content = content.replace(
        /<img id="lightboxImg" class="lightbox-img" src=""[^>]*>/i,
        `<img id="lightboxImg" class="lightbox-img" src="" alt="Full Resolution Land Survey Project Preview Image" title="Survey Project Photographic Evidence Preview">`
    );

    // Footer Logo
    content = content.replace(
        /<img src="assets\/logo\/logo-transparent\.png" alt="Reliable Land Survey Consultancy" class="footer-logo-img"[^>]*>/i,
        `<img src="assets/logo/logo-transparent.png" alt="Reliable Land Survey Consultancy Official Logo - Pune Land Surveying Services" title="Reliable Land Survey Consultancy - High Precision Geospatial Engineering Solutions" class="footer-logo-img" style="height: 100px; width: auto; display: block;">`
    );

    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Applied SEO images to gallery.html');
}

// 7. index.html
{
    const filePath = path.join(dir, 'index.html');
    let content = fs.readFileSync(filePath, 'utf8');

    // Header Logo
    content = content.replace(
        /<div class="nav-logo">\s*<img src="assets\/logo\/logo-transparent\.png"[^>]*>/i,
        `<div class="nav-logo">\n            <img src="assets/logo/logo-transparent.png" alt="Reliable Land Survey Consultancy Pune - Land & Drone Survey Services" title="Reliable Land Survey Consultancy - Expert Land Surveyors in Pune, Maharashtra">`
    );

    // Highway Hero image in index
    content = content.replace(
        /<img src="assets\/images\/highway\.jpg" alt="Highway Infrastructure Survey"[^>]*>/i,
        `<img src="assets/images/highway.jpg" alt="High Precision Highway & Infrastructure Land Survey in Maharashtra" title="Reliable Land Survey Consultancy - Highway & Infrastructure Alignment">`
    );

    // Expertise track images (10 items)
    const expertiseItems = [
        {
            alt: 'Highways',
            newAlt: 'Highway Infrastructure Survey & Geometric Alignment Profiling',
            title: 'Highway & Expressway Alignment Survey Services'
        },
        {
            alt: 'Metro Rail',
            newAlt: 'Metro Rail Route Viaduct and Pier Construction Layout Survey',
            title: 'Metro Rail Mass Transit Infrastructure Survey'
        },
        {
            alt: 'Railways',
            newAlt: 'Railway Track Alignment & Corridor Topographical Surveying',
            title: 'Railway Infrastructure Survey Services'
        },
        {
            alt: 'Drone Mapping',
            newAlt: 'RTK Drone Aerial Survey Mapping for Large Acreage Land',
            title: 'UAV Drone Photogrammetry & Orthomosaic Survey'
        },
        {
            alt: 'LiDAR',
            newAlt: 'LiDAR 3D Laser Scanning Point Cloud Ground Elevation Modeling',
            title: 'Drone LiDAR 3D Laser Scanning Survey'
        }
    ];

    expertiseItems.forEach(item => {
        // Replace all occurrences (since there is a duplicate track)
        const regex = new RegExp(`<img src="assets\/images\/[^"]+" alt="${item.alt.replace(/\//g, '\\/')}" class="expertise-bg"[^>]*>`, 'gi');
        // Let's replace each with matching src
        content = content.replace(regex, (match) => {
            const srcMatch = match.match(/src="([^"]+)"/);
            const src = srcMatch ? srcMatch[1] : '';
            return `<img src="${src}" alt="${item.newAlt}" title="${item.title}" class="expertise-bg">`;
        });
    });

    // Tech preview image
    content = content.replace(
        /<img src="assets\/images\/rtk_drone_latest\.jpg"[^>]*>/i,
        `<img src="assets/images/rtk_drone_latest.jpg" alt="Commercial RTK Survey Drone with Geospatial Sensor for Precision Photogrammetry" title="RTK Aerial Survey Drone - Reliable Land Survey Technology" class="tech-preview-img">`
    );

    // Flip cards (4 items)
    content = content.replace(
        /<img src="assets\/images\/about\.jpg" alt="Advanced Tech bg" class="flip-front-bg"[^>]*>/i,
        `<img src="assets/images/about.jpg" alt="Advanced Surveying Technology - Digital Total Stations and Dual Frequency GNSS" title="Advanced Geospatial Technology - Reliable Land Survey" class="flip-front-bg">`
    );

    content = content.replace(
        /<img src="assets\/images\/metro\.jpg" alt="Engineering Ready bg" class="flip-front-bg"[^>]*>/i,
        `<img src="assets/images/metro.jpg" alt="Engineering Ready CAD Drawings and GIS Spatial Data Deliverables" title="Engineering Ready Survey Data & CAD Deliverables" class="flip-front-bg">`
    );

    content = content.replace(
        /<img src="assets\/images\/drone\.jpg" alt="Quality Control bg" class="flip-front-bg"[^>]*>/i,
        `<img src="assets/images/drone.jpg" alt="Rigorous Multi-Tier Quality Control in Land Survey Field Measurements" title="Geospatial Quality Control & Calibration Standards" class="flip-front-bg">`
    );

    content = content.replace(
        /<img src="assets\/images\/highway\.jpg" alt="Infrastructure Focused bg" class="flip-front-bg"[^>]*>/i,
        `<img src="assets/images/highway.jpg" alt="Infrastructure Focused Land Surveying for Bridges, Highways and Metros" title="Infrastructure Land Survey Expertise - Maharashtra Projects" class="flip-front-bg">`
    );

    // Footer Logo
    content = content.replace(
        /<img src="assets\/logo\/logo-transparent\.png" alt="Reliable Land Survey Consultancy" class="footer-logo-img"[^>]*>/i,
        `<img src="assets/logo/logo-transparent.png" alt="Reliable Land Survey Consultancy Official Logo - Pune Land Surveying Services" title="Reliable Land Survey Consultancy - High Precision Geospatial Engineering Solutions" class="footer-logo-img" style="height: 100px; width: auto; display: block;">`
    );

    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Applied SEO images to index.html');
}
