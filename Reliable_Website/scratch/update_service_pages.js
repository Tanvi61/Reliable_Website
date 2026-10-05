const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');

// Common Dropdown HTML for Header Nav
function getNavHtml(activePage) {
    return `            <a href="index.html"${activePage === 'home' ? ' class="active"' : ''}>Home</a>
            <a href="about.html"${activePage === 'about' ? ' class="active"' : ''}>About</a>
            <div class="nav-dropdown">
                <a href="services.html" class="nav-dropdown-toggle${activePage === 'services' ? ' active' : ''}">
                    Services
                    <svg class="dropdown-arrow" width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 1l4 4 4-4"/></svg>
                </a>
                <div class="nav-dropdown-menu">
                    <a href="topographical-survey.html" class="nav-dropdown-item">
                        <span class="dropdown-item-bullet"></span>
                        <div class="dropdown-item-text">
                            <span class="dropdown-item-title">Topographical Survey</span>
                            <span class="dropdown-item-desc">High-precision contours & feature mapping</span>
                        </div>
                    </a>
                    <a href="dgps-gnss-control.html" class="nav-dropdown-item">
                        <span class="dropdown-item-bullet"></span>
                        <div class="dropdown-item-text">
                            <span class="dropdown-item-title">DGPS / GNSS Control</span>
                            <span class="dropdown-item-desc">Geodetic networks & SOI benchmark control</span>
                        </div>
                    </a>
                    <a href="total-station-survey.html" class="nav-dropdown-item">
                        <span class="dropdown-item-bullet"></span>
                        <div class="dropdown-item-text">
                            <span class="dropdown-item-title">Total Station Survey</span>
                            <span class="dropdown-item-desc">Millimeter-accurate boundary & layout staking</span>
                        </div>
                    </a>
                    <a href="rtk-drone-mapping.html" class="nav-dropdown-item">
                        <span class="dropdown-item-bullet"></span>
                        <div class="dropdown-item-text">
                            <span class="dropdown-item-title">RTK Drone Mapping</span>
                            <span class="dropdown-item-desc">Rapid aerial orthomosaics & 3D surface models</span>
                        </div>
                    </a>
                    <a href="lidar-3d-scanning.html" class="nav-dropdown-item">
                        <span class="dropdown-item-bullet"></span>
                        <div class="dropdown-item-text">
                            <span class="dropdown-item-title">Drone LiDAR Scanning</span>
                            <span class="dropdown-item-desc">Dense 3D point clouds & canopy penetration</span>
                        </div>
                    </a>
                    <a href="drone-photogrammetry.html" class="nav-dropdown-item">
                        <span class="dropdown-item-bullet"></span>
                        <div class="dropdown-item-text">
                            <span class="dropdown-item-title">Drone Photogrammetry</span>
                            <span class="dropdown-item-desc">Aerial DSM/DTM & volumetric calculations</span>
                        </div>
                    </a>
                    <a href="road-highway.html" class="nav-dropdown-item">
                        <span class="dropdown-item-bullet"></span>
                        <div class="dropdown-item-text">
                            <span class="dropdown-item-title">Road & Highway Survey</span>
                            <span class="dropdown-item-desc">Corridor alignment, L-sections & DPR surveys</span>
                        </div>
                    </a>
                    <a href="rail-metro.html" class="nav-dropdown-item">
                        <span class="dropdown-item-bullet"></span>
                        <div class="dropdown-item-text">
                            <span class="dropdown-item-title">Rail & Metro Survey</span>
                            <span class="dropdown-item-desc">Track geometry, viaduct piers & station grids</span>
                        </div>
                    </a>
                    <a href="cad-gis-processing.html" class="nav-dropdown-item">
                        <span class="dropdown-item-bullet"></span>
                        <div class="dropdown-item-text">
                            <span class="dropdown-item-title">CAD & GIS Processing</span>
                            <span class="dropdown-item-desc">AutoCAD .DWG drafting & GIS spatial modeling</span>
                        </div>
                    </a>
                    <div class="dropdown-footer-link">
                        <a href="services.html">View All Services & Capabilities &rarr;</a>
                    </div>
                </div>
            </div>
            <a href="gallery.html"${activePage === 'gallery' ? ' class="active"' : ''}>Gallery</a>
            <a href="contact.html"${activePage === 'contact' ? ' class="active"' : ''}>Contact</a>`;
}

// 9 Service Definitions with In-Depth Technical Information
const servicesData = [
    {
        slug: 'topographical-survey.html',
        name: 'Topographical Survey',
        heroTitle: 'Topographical Land Survey In Pune & Maharashtra',
        tagline: 'High-Precision Natural & Man-Made Feature Mapping with Certified Geodetic Benchmarks',
        image: 'assets/images/about.jpg',
        specTable: [
            ['SERVICE TYPE', 'Topographical & Land Feature Survey'],
            ['PRIMARY EQUIPMENT', 'Dual-Frequency RTK GNSS, 1" High-Precision Total Stations, Auto Levels'],
            ['ACCURACY / TOLERANCE', 'Horizontal: ±5mm + 1ppm | Vertical: ±1mm per km leveling'],
            ['OUTPUT DELIVERABLES', 'AutoCAD .DWG/.DXF (2D & 3D), 0.5m/1.0m Contours, DTM Surfaces, Spot Levels'],
            ['COMPLIANCE STANDARDS', 'Survey of India (SOI) GTS datum, WGS84 / UTM Grid & Local Grids'],
            ['HEADQUARTERS / REACH', 'Pune Headquarters | 24-48h Rapid Field Mobilization Pan-India']
        ],
        overview: `A Topographical Survey provides the fundamental baseline for all architectural design, civil engineering, and infrastructure development. At <strong>Reliable Land Survey Consultancy</strong>, our expert survey crews map every physical feature on the ground with millimeter accuracy — including terrain contours, spot elevations, trees (with girth and species), utility manholes, overhead power lines, drainage channels, building footprints, and boundary fence lines.`,
        capabilities: [
            { title: 'Contour & Digital Elevation Modeling (DEM)', desc: 'Precise 0.2m, 0.5m, or 1.0m interval contour lines integrated with TIN meshes for exact cut-and-fill earthwork calculations.' },
            { title: 'Comprehensive Utility & Infrastructure Mapping', desc: 'Accurate location and depth inversion mapping of drainage channels, culverts, water lines, electric poles, and underground utility corridors.' },
            { title: 'Legal & Cadastral Boundary Alignment', desc: 'Demarcation and cross-verification of revenue boundary limits against official village maps (7/12 extract and Gut maps).' },
            { title: 'As-Built Topographical Verification', desc: 'Pre-construction and post-construction baseline surveys ensuring alignment with sanctioned architectural master plans.' }
        ],
        workflow: [
            { step: '01', title: 'Site Reconnaissance & Benchmarking', desc: 'Establishing permanent GTS / DGPS baseline control pillars tied to national geodetic grids.' },
            { step: '02', title: 'High-Density Feature Capture', desc: 'Traversing the terrain with robotic total stations and RTK GNSS to record all natural and built features.' },
            { step: '03', title: 'Rigorous Error Adjustment & QA', desc: 'Least-squares traverse adjustment and closure verification ensuring zero mathematical discrepancies.' },
            { step: '04', title: 'CAD Drafting & Deliverable Handover', desc: 'Multi-layered AutoCAD .DWG, 3D surface models, and comprehensive stamped survey reports.' }
        ],
        faqs: [
            { q: 'Why is a topographical survey essential before construction?', a: 'A topographical survey reveals the exact surface relief, slopes, and existing site obstacles. It prevents expensive engineering design mistakes, foundation rework, and inaccurate earthwork budget estimations.' },
            { q: 'What contour intervals do you generate?', a: 'We standardly generate 0.5m or 1.0m contour intervals, and can deliver ultra-fine 0.2m intervals for sensitive grading, drainage design, or golf course developments.' },
            { q: 'What file formats will I receive?', a: 'Deliverables include standard AutoCAD (.DWG, .DXF), 3D surfaces (.TIN, .LandXML), CSV coordinate tables (Easting, Northing, Elevation, Description), and stamped PDF layout sheets.' }
        ]
    },
    {
        slug: 'dgps-gnss-control.html',
        name: 'DGPS / GNSS Control',
        heroTitle: 'DGPS / GNSS Geodetic Control Network In Pune',
        tagline: 'High-Precision Dual-Frequency GNSS Baseline Establishment & Survey of India GTS Control',
        image: 'assets/images/highway.jpg',
        specTable: [
            ['SERVICE TYPE', 'DGPS / GNSS Geodetic Baseline Establishment'],
            ['PRIMARY EQUIPMENT', 'Multi-Constellation Dual-Frequency GNSS Receivers (GPS, GLONASS, Galileo, BeiDou, NavIC)'],
            ['STATIC BASELINE ACCURACY', 'Horizontal: 3mm + 0.5ppm | Vertical: 5mm + 0.5ppm RMS'],
            ['OUTPUT DELIVERABLES', 'Geodetic Baseline Vectors, Control Network Adjustments, WGS84 to UTM Coordinate Sheets'],
            ['APPLICATIONS', 'Highways, Railways, Expressways, Transmission Lines, Township Grids'],
            ['HEADQUARTERS / REACH', 'Pune Central Technical Desk | Pan-India Geodetic Deployment']
        ],
        overview: `Differential Global Positioning System (DGPS) and Global Navigation Satellite System (GNSS) control surveys establish the rigid geometrical backbone for extensive infrastructure projects. <strong>Reliable Land Survey Consultancy</strong> establishes primary and secondary geodetic benchmark networks across Pune, Maharashtra, and India, linking local site coordinates to the Survey of India (SOI) GTS network and national datum.`,
        capabilities: [
            { title: 'Static & Rapid-Static Geodetic Baselines', desc: 'Long-duration multi-satellite tracking achieving millimeter-accurate baseline vectors between distant project master pillars.' },
            { title: 'Real-Time Kinematic (RTK) Control Points', desc: 'Instantaneous centimeter-level coordinate positioning for ground control points (GCPs) utilized in drone and LiDAR mapping.' },
            { title: 'Survey of India (SOI) GTS Ties', desc: 'Transferring true Mean Sea Level (MSL) elevation and geodetic coordinates from official Survey of India Great Trigonometrical Survey pillars.' },
            { title: 'Coordinate Transformation & Local Grid Modeling', desc: 'Custom grid shift parameter computation converting WGS84 global ellipsoidal coordinates to localized site grid systems.' }
        ],
        workflow: [
            { step: '01', title: 'Network Design & Pillar Erection', desc: 'Designing an optimal geometric control network and erecting permanent concrete benchmark pillars.' },
            { step: '02', title: 'Multi-Constellation Satellite Logging', desc: 'Simultaneous multi-receiver static satellite data observation across all primary control stations.' },
            { step: '03', title: 'Post-Processing & Baseline Adjustment', desc: 'Carrier-phase differential processing, ephemeris correction, and 3D network least-squares closure.' },
            { step: '04', title: 'Certified Geodetic Report Publication', desc: 'Publishing official monument description cards, coordinate tables, and baseline verification certificates.' }
        ],
        faqs: [
            { q: 'What is the difference between standard GPS and DGPS?', a: 'Standard handheld GPS has an error margin of 3 to 10 meters. DGPS utilizes dual-frequency base-and-rover carrier-phase differential corrections to reduce positional errors down to millimeters.' },
            { q: 'Why are DGPS control points needed for linear projects like highways?', a: 'Linear projects spanning tens or hundreds of kilometers accumulate significant angular error if surveyed only with optical total stations. DGPS provides absolute global reference nodes every 2-5 km to eliminate cumulative error.' },
            { q: 'Can you link our project to the Survey of India GTS benchmark?', a: 'Yes. Our geodetic engineers execute static GNSS ties to the nearest SOI GTS benchmark to establish certified MSL elevations and national grid coordinates.' }
        ]
    },
    {
        slug: 'total-station-survey.html',
        name: 'Total Station Survey',
        heroTitle: 'High-Precision Total Station Survey In Pune',
        tagline: 'Sub-Second Electronic Theodolite Measurement, Boundary Demarcation & Construction Staking',
        image: 'assets/images/railway.jpg',
        specTable: [
            ['SERVICE TYPE', 'Electronic Total Station (ETS) Precision Measurement'],
            ['PRIMARY EQUIPMENT', '1-Second & 0.5-Second Robotic Total Stations, Precise Digital Levels, Prism Systems'],
            ['MEASUREMENT ACCURACY', 'Angular: 1" (0.3 mgon) | Distance: 1mm + 1.5ppm with optical reflector'],
            ['OUTPUT DELIVERABLES', 'As-Built CAD Drawings, Demarcation Maps, Column Staking Reports, Boundary Coordinates'],
            ['APPLICATIONS', 'High-Rise Construction, Foundation Staking, Industrial Machinery Alignment, Boundary Demarcation'],
            ['HEADQUARTERS / REACH', 'Pune Technical Hub | Rapid Site Dispatch Across Maharashtra']
        ],
        overview: `Total Station surveying remains the gold standard for high-precision civil engineering, structural staking, and boundary demarcations. Utilizing electronic theodolites integrated with electronic distance measurement (EDM) and onboard computing, <strong>Reliable Land Survey Consultancy</strong> provides millimeter-accurate dimensional control for buildings, industrial plants, bridges, and property boundaries.`,
        capabilities: [
            { title: 'Building Column & Foundation Staking', desc: 'Transferring architectural CAD gridlines directly to the construction site with zero-tolerance precision for pile caps, columns, and anchor bolts.' },
            { title: 'As-Built Structural Verification', desc: 'Precision dimensional checks on completed concrete structures, retaining walls, slab levels, and structural steel framing.' },
            { title: 'Legal Land Demarcation & Area Certification', desc: 'Definitive boundary line fixing, resolving land parcel overlaps, and establishing permanent stone corner markers.' },
            { title: 'Deformation & Structural Settlement Monitoring', desc: 'High-frequency sub-millimeter displacement monitoring for retaining walls, dams, tunnels, and adjacent structures during deep excavation.' }
        ],
        workflow: [
            { step: '01', title: 'Control Station Verification', desc: 'Backsight orientation and scale factor calibration against established site benchmarks.' },
            { step: '02', title: 'Precision Angle & Distance Measurement', desc: 'Dual-axis compensated optical measurement recording horizontal angles, vertical angles, and slope distances.' },
            { step: '03', title: 'Real-Time Layout Staking & Offsets', desc: 'Directly driving physical layout points on site with live coordinate readout and offset markings.' },
            { step: '04', title: 'Comprehensive As-Built CAD Output', desc: 'Compiling surveyed coordinate point clouds into clean 2D/3D AutoCAD layer drawings and certificate sheets.' }
        ],
        faqs: [
            { q: 'What is the accuracy of your Total Station surveys?', a: 'Our high-grade 1-second and 0.5-second total stations achieve distance measurement precision of ±1mm + 1.5ppm, providing unmatched millimeter accuracy for structural works.' },
            { q: 'Can you stake out column centers directly from our AutoCAD file?', a: 'Yes. We load your approved structural .DWG CAD drawings directly into our electronic data collectors to stake column centers, footings, and grid intersections directly on site.' },
            { q: 'Do you provide boundary dispute resolution surveys?', a: 'Yes. We correlate official revenue records (Gut maps/TILR) with on-site physical measurements to establish undisputed boundary demarcations.' }
        ]
    },
    {
        slug: 'rtk-drone-mapping.html',
        name: 'RTK Drone Mapping',
        heroTitle: 'RTK Drone Aerial Survey & Mapping In Pune',
        tagline: 'Centimeter-Accurate High-Resolution Aerial Mapping, Digital Elevation Models & Large-Scale Surveys',
        image: 'assets/images/drone.jpg',
        specTable: [
            ['SERVICE TYPE', 'Real-Time Kinematic (RTK) UAV Aerial Mapping'],
            ['PRIMARY EQUIPMENT', 'DJI Enterprise RTK Drones, Mechanical Shutter 45MP Full-Frame Aerial Cameras, D-RTK 2 Bases'],
            ['GROUND RESOLUTION (GSD)', '1.0 cm to 2.5 cm per pixel at standard flight altitudes'],
            ['ABSOLUTE ACCURACY', 'Horizontal: < 2 cm | Vertical: < 3 cm (with verified Ground Control Points)'],
            ['OUTPUT DELIVERABLES', 'High-Res GeoTIFF Orthomosaics, Digital Surface Models (DSM), DTM, 3D Textured Meshes'],
            ['DAILY COVERAGE FLEET', 'Up to 1,500+ Acres per day with multi-drone synchronized deployment']
        ],
        overview: `RTK Drone Mapping has revolutionized modern land surveying by capturing vast geographical areas with sub-centimeter ground sampling distance (GSD). <strong>Reliable Land Survey Consultancy</strong> utilizes enterprise UAV platforms equipped with onboard RTK centimeter-positioning modules and mechanical shutter sensors, eliminating rolling shutter distortion to produce engineering-grade topographical basemaps.`,
        capabilities: [
            { title: 'Sub-Centimeter Orthomosaic Imagery', desc: 'Seamless, geo-referenced orthophoto maps capturing every site detail at resolutions under 2cm/pixel, ideal for master planning.' },
            { title: 'Digital Elevation & Surface Models (DEM / DSM)', desc: 'High-density elevation grids reflecting natural terrain slopes, ridgelines, valleys, and structural heights for hydrological modeling.' },
            { title: 'Massive Area Rapid Coverage (1000+ Acres/Day)', desc: 'Covering vast rural, agricultural, or industrial parcels in a fraction of the time required by traditional terrestrial teams.' },
            { title: 'Cut-and-Fill Earthwork Volumetrics', desc: 'Repeatable aerial surveys measuring stockpile volumes, mine excavation progress, and landfill capacity with certified volumetric sheets.' }
        ],
        workflow: [
            { step: '01', title: 'Mission Planning & Airspace Clearance', desc: 'Designing optimal flight paths, overlap parameters (80% forward / 70% lateral), and ground resolution targets.' },
            { step: '02', title: 'GCP & Check Point Deployment', desc: 'Distributing geodetic ground control points (GCPs) measured via dual-frequency DGPS for absolute external validation.' },
            { step: '03', title: 'Autonomous UAV Photogrammetric Flight', desc: 'Executing RTK-corrected aerial image acquisition with automatic geotagging of high-resolution RAW images.' },
            { step: '04', title: 'Structure-from-Motion (SfM) Processing', desc: 'Processing thousands of aerial images into dense 3D point clouds, seamless orthomosaics, and CAD contours.' }
        ],
        faqs: [
            { q: 'How accurate is RTK Drone Surveying compared to traditional total stations?', a: 'When coupled with proper geodetic Ground Control Points (GCPs), RTK drone mapping achieves absolute spatial accuracy of 2-3 cm horizontally and 3-5 cm vertically, while capturing millions of points rather than sparse manual points.' },
            { q: 'Can drones survey steep hills, active quarries, or hazardous terrain?', a: 'Yes! Drones easily fly over hazardous cliffs, active mines, dense highway corridors, and floodplains safely without endangering ground survey personnel.' },
            { q: 'Do you obtain necessary DGCA / regulatory flight approvals?', a: 'Yes. Our operations adhere strictly to DGCA drone rules, Digital Sky compliance, and trained DGCA-certified remote pilots.' }
        ]
    },
    {
        slug: 'lidar-3d-scanning.html',
        name: 'Drone LiDAR & 3D Scanning',
        heroTitle: 'Drone LiDAR & 3D Laser Scanning In Pune',
        tagline: 'Triple-Return Laser Penetration for Dense Vegetation, Powerlines & Complex 3D Infrastructure',
        image: 'assets/images/lidar.jpg',
        specTable: [
            ['SERVICE TYPE', 'Aerial & Mobile LiDAR 3D Laser Scanning'],
            ['PRIMARY EQUIPMENT', 'High-Pulse Multi-Return Aerial LiDAR Sensors (240,000 pts/sec), High-Accuracy IMUs'],
            ['POINT CLOUD DENSITY', '150 to 450+ points per square meter (XYZ)'],
            ['CANOPY PENETRATION', 'Triple-return laser pulse extracting true bare-earth ground beneath thick forests & crops'],
            ['OUTPUT DELIVERABLES', 'Classified LAS/LAZ Point Clouds (Ground, Low/High Veg, Buildings), Bare-Earth DTM, 3D CAD Meshes'],
            ['APPLICATIONS', 'Forest Corridors, Transmission Line Sag, Dam Basins, Hill Roads, Mining Digitization']
        ],
        overview: `Light Detection and Ranging (LiDAR) utilizes active laser pulses to penetrate dense forest canopies, crops, and shadows where standard photogrammetry cannot see the ground. <strong>Reliable Land Survey Consultancy</strong> deploys advanced aerial LiDAR payloads that pulse hundreds of thousands of laser beams per second, capturing true bare-earth terrain models (DTM) and complex structural assets.`,
        capabilities: [
            { title: 'True Bare-Earth Extraction Beneath Dense Foliage', desc: 'Extracting ground points through dense sugarcane, forest canopies, and jungle brush for highway alignments and dam submergence studies.' },
            { title: 'Powerline Corridor & Vegetation Clearance Analysis', desc: 'Detailed 3D modeling of transmission conductors, tower structures, catenary sag calculations, and dangerous vegetation encroachment zones.' },
            { title: 'Structural & Heritage 3D Digitization', desc: 'High-density laser scanning of historical monuments, bridge piers, tunnel portals, and industrial piping with millimeter point clouds.' },
            { title: 'Landslide & Steep Cliff Stability Profiling', desc: 'Capturing vertical rock faces, ghat roads, and active landslides to compute geological slope stability and rockfall hazard risks.' }
        ],
        workflow: [
            { step: '01', title: 'Flight Parameters & Laser Frequency Setup', desc: 'Optimizing flight speed, swath overlap, and pulse repetition rates (PRR) tailored to canopy density.' },
            { step: '02', title: 'Airborne Laser Scanning & IMU Trajectory', desc: 'Capturing raw laser return ranges synchronized with high-precision inertial navigation system (INS) data.' },
            { step: '03', title: 'Trajectory Post-Processing & Point Cloud Boresighting', desc: 'Differential GNSS-Inertial trajectory calculation and point cloud boresight calibration.' },
            { step: '04', title: 'Automated AI & Manual Point Cloud Classification', desc: 'Classifying millions of points into Ground, Vegetation, Powerline, and Structure layers to generate clean bare-earth DTMs.' }
        ],
        faqs: [
            { q: 'Why choose LiDAR over standard Drone Photogrammetry?', a: 'Photogrammetry relies on visible light and cannot see through thick trees or vegetation. LiDAR emits active laser pulses that physically pass through gaps in the leaves, recording the actual ground beneath.' },
            { q: 'What is the point cloud density of your LiDAR scans?', a: 'Our enterprise aerial LiDAR captures 150 to 450+ points per square meter, delivering dense 3D point cloud representations of terrain and infrastructure.' },
            { q: 'Can LiDAR data be directly loaded into AutoCAD Civil 3D?', a: 'Yes. We deliver classified .LAS, .LAZ, and LandXML surface formats ready for immediate import into AutoCAD Civil 3D, Revit, Bentley MicroStation, and GIS software.' }
        ]
    },
    {
        slug: 'drone-photogrammetry.html',
        name: 'Drone Photogrammetry',
        heroTitle: 'Drone Photogrammetry & Volumetric Survey In Pune',
        tagline: 'High-Overlap Aerial Photogrammetry, 3D Mesh Texturing & Stockpile Earthwork Monitoring',
        image: 'assets/images/drone_photogrammetry.jpg',
        specTable: [
            ['SERVICE TYPE', 'High-Overlap Aerial Photogrammetry & 3D Surface Reconstruction'],
            ['PRIMARY SENSORS', '45MP High-Resolution Aerial Cameras, Calibrated Low-Distortion Lenses'],
            ['IMAGE OVERLAP', '80% Forward Overlap | 75% Lateral Side Lap for dense stereoscopic reconstruction'],
            ['DELIVERABLES', 'High-Res Orthophoto Basemaps, 3D Textured OBJ/FBX Meshes, Volumetric Cut/Fill Reports'],
            ['APPLICATIONS', 'Township Master Plans, Open-Cast Quarries, Industrial Plants, Solar Farms'],
            ['LOCATION', 'Pune, Maharashtra | Pan-India Aerial Fleet']
        ],
        overview: `Drone Photogrammetry converts overlapping 2D aerial photographs into mathematically rigorous 3D spatial models through Structure-from-Motion (SfM) photogrammetric algorithms. <strong>Reliable Land Survey Consultancy</strong> delivers orthorectified aerial basemaps with zero lens distortion, high-density 3D textured mesh models, and accurate volumetric calculation sheets.`,
        capabilities: [
            { title: 'High-Resolution 2D Orthophoto Basemaps', desc: 'Pixel-perfect, orthorectified photographic maps with true horizontal distances, allowing direct CAD measurements on top of imagery.' },
            { title: '3D Photorealistic Textured Meshes', desc: 'Realistic 3D mesh models (.OBJ, .FBX) suitable for architectural visualization, urban planning simulations, and stakeholder presentations.' },
            { title: 'Quarry & Stockpile Volumetric Calculations', desc: 'Rapid, non-invasive volume calculations for gravel, sand, mineral ore, and earthwork with detailed cut-and-fill cross sections.' },
            { title: 'Solar Farm Topography & Shadow Profiling', desc: 'Capturing terrain slope, undulation, and shadow profiles for optimal PV solar panel layout and civil grading design.' }
        ],
        workflow: [
            { step: '01', title: 'Survey Design & Ground Target Placement', desc: 'Deploying high-visibility photogrammetric targets surveyed with DGPS for georeferencing.' },
            { step: '02', title: 'Automated Grid & Corridor Flight', desc: 'Flying automated cross-hatch flight paths capturing Nadir and Oblique imagery from multiple angles.' },
            { step: '03', title: 'Bundle Block Adjustment & Dense Matching', desc: 'Generating tie points, camera calibration, bundle block adjustment, and 3D point cloud extraction.' },
            { step: '04', title: 'Orthomosaic Mosaicking & Quality Stamping', desc: 'Seaming orthophoto tiles into a single seamless GeoTIFF basemap verified against independent check points.' }
        ],
        faqs: [
            { q: 'What is the ground resolution of your photogrammetry maps?', a: 'Depending on flight altitude, our GSD (Ground Sampling Distance) ranges from 1 cm to 2.5 cm per pixel, resolving fine details like curb lines, paint marks, and inspection covers.' },
            { q: 'How fast can you survey a 500-acre project site?', a: 'A 500-acre site can be flown in 1 day, with complete photogrammetric processing, orthomosaics, and CAD contours delivered within 48 to 72 hours.' },
            { q: 'Are your orthomosaics compatible with GIS software?', a: 'Yes! Our GeoTIFF deliverables come embedded with spatial projection metadata (UTM / WGS84) and load seamlessly into ArcGIS, QGIS, AutoCAD, and Google Earth.' }
        ]
    },
    {
        slug: 'road-highway.html',
        name: 'Road & Highway Survey',
        heroTitle: 'Road & Highway Alignment Survey In Pune & Maharashtra',
        tagline: 'DPR Corridor Surveys, Longitudinal Profiles (L-Sections), Cross-Sections & Right-of-Way (RoW) Mapping',
        image: 'assets/images/road_highway.jpg',
        specTable: [
            ['SERVICE TYPE', 'Highway & Expressway Alignment Engineering Survey'],
            ['PRIMARY EQUIPMENT', 'RTK Drones, Dual-Frequency DGPS Receivers, Robotic Total Stations, Auto Levels'],
            ['SURVEY SCOPE', 'Detailed Project Report (DPR), Feasibility Surveys, Right-of-Way (RoW), Widening Surveys'],
            ['DELIVERABLES', 'L-Section Profiles, Cross-Sections (at 10m/20m), Plan & Profile CAD Sheets, Culvert & Bridge Drawings'],
            ['SPECIFICATIONS', 'Indian Roads Congress (IRC) & MORTH Engineering Guidelines'],
            ['HEADQUARTERS / MOBILIZATION', 'Pune Central Desk | 24-48 Hour Highway Crew Mobilization']
        ],
        overview: `Highway engineering demands rigorous spatial data for road alignment optimization, geometric gradient design, cross-drainage planning, and Right-of-Way (RoW) land acquisition. <strong>Reliable Land Survey Consultancy</strong> provides comprehensive Detailed Project Report (DPR) corridor surveying for National Highways (NHAI), State Highways (PWD), Expressways, Ring Roads, and Urban Flyovers.`,
        capabilities: [
            { title: 'Longitudinal (L-Section) & Cross-Section Surveys', desc: 'Generating continuous centerline longitudinal profiles and cross-sections at 10m, 20m, or 50m intervals with exact pavement, shoulder, and ditch elevations.' },
            { title: 'Right-of-Way (RoW) Boundary Demarcation', desc: 'Demarcating highway land acquisition boundaries, correlating village revenue maps, and identifying property encroachments.' },
            { title: 'Bridge, Culvert & Cross-Drainage Hydraulic Surveys', desc: 'Detailed bed levels, High Flood Level (HFL) data, and river cross-sections for major bridges, minor bridges, and box culverts.' },
            { title: 'Junction & Intersection Geometric Mapping', desc: 'High-density mapping of complex rotary intersections, cloverleaf interchanges, and service road merges.' }
        ],
        workflow: [
            { step: '01', title: 'Primary DGPS Geodetic Corridor Traverse', desc: 'Establishing paired DGPS baseline pillars every 2 to 5 km along the entire highway corridor.' },
            { step: '02', title: 'Centerline Alignment & Cross-Section Leveling', desc: 'Total station and digital level profiling capturing pavement levels, berms, ditches, and utility lines.' },
            { step: '03', title: 'Aerial RTK Drone Corridor Scanning', desc: 'Capturing 100m to 200m width corridor orthophotos and terrain models for drainage catchment analysis.' },
            { step: '04', title: 'CAD Plan & Profile Compilation', desc: 'Compiling IRC-compliant Plan & Profile sheets, structural General Arrangement Drawings (GAD), and earthwork BOQs.' }
        ],
        faqs: [
            { q: 'Do your highway surveys comply with MORTH and IRC guidelines?', a: 'Yes, all our highway alignment surveys, cross-section intervals, and benchmark pillars strictly adhere to Indian Roads Congress (IRC:SP:19) and MORTH standards.' },
            { q: 'How do you handle highway widening surveys with live traffic?', a: 'We combine RTK aerial drones and reflectorless Total Stations to capture pavement edges, median lines, and shoulder levels without obstructing live traffic or endangering crews.' },
            { q: 'What data do you provide for road drainage design?', a: 'We supply digital terrain models (DTM), natural ground cross-slopes, culvert invert levels, catchment drainage patterns, and High Flood Level (HFL) records.' }
        ]
    },
    {
        slug: 'rail-metro.html',
        name: 'Rail & Metro Survey',
        heroTitle: 'Rail & Metro Infrastructure Survey In Pune',
        tagline: 'Track Centerline Geometry, Viaduct Pier Staking, Station Yard Layout & Overhead Electrification (OHE)',
        image: 'assets/images/rail_metro.jpg',
        specTable: [
            ['SERVICE TYPE', 'Railway & Metro Rail Geodetic Alignment Survey'],
            ['PRIMARY EQUIPMENT', '0.5" High-Precision Total Stations, Track Gauge Rigs, Precise Digital Levels, DGPS'],
            ['GEOMETRIC ACCURACY', 'Sub-millimeter pier positioning and track horizontal/vertical curvature control'],
            ['DELIVERABLES', 'Track Centerline Coordinates, Pier Foundation CADs, Clearance Envelopes, Station Yard Layouts'],
            ['APPLICATIONS', 'Metro Rail Corridors, Dedicated Freight Corridors (DFC), Railway Yard Remodeling, High-Speed Rail'],
            ['LOCATION', 'Pune, Maharashtra | Executing Rail Projects Pan-India']
        ],
        overview: `Railway and Metro Rail engineering require the highest geodetic precision in civil construction. From high-speed track curvature and cant calculations to elevated viaduct pier staking and underground station cavern layouts, <strong>Reliable Land Survey Consultancy</strong> delivers millimeter-level surveying support for Indian Railways, Metro Rail Corporations (Maha-Metro, MMRDA), and rail EPC contractors.`,
        capabilities: [
            { title: 'Elevated Viaduct Pier & Foundation Staking', desc: 'Exact 3D coordinate layout for elevated metro piers, segment launching spans, and bridge abutments with sub-millimeter closure.' },
            { title: 'Track Centerline & Gauge Geometry Verification', desc: 'Measuring track horizontal alignment, vertical curvature, superelevation (cant), and gauge consistency.' },
            { title: 'Station & Maintenance Depot Master Layout', desc: 'Comprehensive surveys for passenger platforms, stabling lines, workshop pits, and administrative buildings.' },
            { title: 'Structure Gauge & Clearance Envelope Checks', desc: 'Kinematic and static clearance envelope verification ensuring zero infringement of overhead OHE masts and platform edges.' }
        ],
        workflow: [
            { step: '01', title: 'High-Order Geodetic Control Network', desc: 'Establishing high-precision benchmark pillars along the rail corridor tied to national GTS stations.' },
            { step: '02', title: 'Pier Centerline & Anchor Bolt Staking', desc: 'Direct layout of pier cap centerlines and bearing pad elevations using 0.5-second total stations.' },
            { step: '03', title: 'As-Built Track & OHE Profiling', desc: 'Continuous profiling of rails, turnout switches, and overhead catenary wire heights.' },
            { step: '04', title: 'Railway Engineering Documentation', desc: 'Generating detailed Yard Plans, Longitudinal Sections, Structure Gauge Clearance sheets, and CAD handover files.' }
        ],
        faqs: [
            { q: 'What precision is maintained for metro pier coordinates?', a: 'We maintain sub-millimeter positional tolerance (±1mm) using high-precision 0.5-second total stations and invar precision leveling staves.' },
            { q: 'Can you survey active railway tracks without traffic disruption?', a: 'Yes. Our crews utilize reflectorless lasers, non-contact measurement, and coordinated rail block protocols to perform surveys safely and efficiently.' },
            { q: 'Do you provide survey data for Railway Yard Remodeling projects?', a: 'Yes. We map existing turnouts, track center-to-center distances, signal posts, OHE masts, and cross-overs to support yard modernization CAD designs.' }
        ]
    },
    {
        slug: 'cad-gis-processing.html',
        name: 'CAD & GIS Processing',
        heroTitle: 'CAD Drafting & GIS Spatial Data Processing In Pune',
        tagline: 'AutoCAD .DWG Engineering Drafting, GIS Database Creation, Spatial Modeling & 3D Topographical Processing',
        image: 'assets/images/metro.jpg',
        specTable: [
            ['SERVICE TYPE', 'In-House CAD Drafting, GIS Processing & Geospatial Analytics'],
            ['SOFTWARE SUITE', 'AutoCAD Civil 3D, ArcGIS Pro, QGIS, Global Mapper, Bentley MicroStation, Pix4D'],
            ['DELIVERABLE FORMATS', 'AutoCAD .DWG/.DXF, ESRI Shapefiles (.SHP), GeoJSON, GeoPackage, 3D LandXML, Print PDFs'],
            ['DATA PROCESSING', 'Traverse Adjustment, Point Cloud Classification, Contour Generation, Attribute Linking'],
            ['APPLICATIONS', 'Smart City GIS, Utility Asset Management, Town Planning, Land Records (LRMP)'],
            ['HEADQUARTERS', 'Pune Central Geospatial Studio | Fast Turnaround Service']
        ],
        overview: `Raw surveying observations are only as valuable as the engineering drawings and GIS databases produced from them. <strong>Reliable Land Survey Consultancy</strong> operates a state-of-the-art in-house CAD and GIS processing studio in Pune. Our geospatial engineers convert field total station files, GNSS vectors, LiDAR point clouds, and drone imagery into clean, layer-standardized engineering drawings.`,
        capabilities: [
            { title: 'Layer-Standardized AutoCAD (.DWG) Drafting', desc: 'Standardized CAD drawings with verified color codes, layer hierarchy, customized linetypes, and crisp typography matching client drafting guidelines.' },
            { title: 'GIS Spatial Database & Attribute Tagging', desc: 'Linking spatial geometry (polygons, lines, points) with tabular asset data (pipe diameters, ownership records, land parcel IDs) in ESRI Shapefile and Geodatabase formats.' },
            { title: '3D Digital Terrain Modeling (DTM / TIN Surfaces)', desc: 'Generating optimized 3D surface meshes from millions of field points for earthwork grading, road profiling, and volume calculations.' },
            { title: 'Large-Format Engineering Map Printing', desc: 'High-resolution layout sheets (A0, A1, A2) with title blocks, legends, North arrows, coordinate grid ticks, and professional certification stamps.' }
        ],
        workflow: [
            { step: '01', title: 'Raw Data Ingestion & Coordinate Validation', desc: 'Importing raw field data and verifying coordinate system projections (WGS84, UTM, Local Grids).' },
            { step: '02', title: 'Geometric Cleaning & Boundary Snapping', desc: 'Topological error correction, intersection snapping, and line closure verification.' },
            { step: '03', title: 'Surface Modeling & Contour Generation', desc: 'Building Triangulated Irregular Networks (TIN) and extracting smoothed contour lines.' },
            { step: '04', title: 'Multi-Format Export & Engineering QA', desc: 'Exporting final .DWG drawings, GIS layers, and print-ready PDF map sheets with rigorous QA checks.' }
        ],
        faqs: [
            { q: 'Can you convert our old paper land maps into digital AutoCAD .DWG drawings?', a: 'Yes! We provide high-resolution scanning, georeferencing, and precision vectorization of old paper Gut maps, village maps, and architectural blueprints.' },
            { q: 'What CAD standards do you follow?', a: 'We adhere strictly to client-specified CAD layer standards, AIA layering guidelines, NHAI drafting codes, or municipal PWD drafting guidelines.' },
            { q: 'Can you deliver GIS shapefiles for municipal asset management?', a: 'Yes. We deliver topologically cleaned ESRI Shapefiles (.SHP), GeoJSON, and GeoPackage files with structured attribute tables ready for immediate GIS integration.' }
        ]
    }
];

// Template for Individual Service Pages
function generateServicePage(service) {
    const specRows = service.specTable.map(([k, v]) => `
                        <tr style="border-bottom: 1px solid #edf2f7;">
                            <td style="padding: 13px 0; font-weight: 800; color: #64748b; font-size: 13px; letter-spacing: 0.5px; text-transform: uppercase; font-family: var(--font-heading); width: 35%;">${k}</td>
                            <td style="padding: 13px 0; font-weight: 700; color: var(--dark-navy); font-size: 14.5px; line-height: 1.4;">${v}</td>
                        </tr>`).join('');

    const capBlocks = service.capabilities.map(c => `
                <div style="background: #ffffff; border-radius: 12px; padding: 25px 28px; border: 1px solid #e2e8f0; box-shadow: 0 6px 20px rgba(8,43,76,0.04); transition: transform 0.3s ease, border-color 0.3s ease;" onmouseover="this.style.transform='translateY(-4px)'; this.style.borderColor='var(--accent-orange)';" onmouseout="this.style.transform='translateY(0)'; this.style.borderColor='#e2e8f0';">
                    <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                        <span style="width: 10px; height: 10px; border-radius: 50%; background: var(--accent-orange); display: inline-block;"></span>
                        <h3 style="color: var(--dark-navy); font-size: 18px; font-weight: 800; font-family: var(--font-heading); margin: 0;">${c.title}</h3>
                    </div>
                    <p style="color: var(--text-muted); font-size: 14.5px; line-height: 1.6; margin: 0;">${c.desc}</p>
                </div>`).join('');

    const workflowSteps = service.workflow.map(w => `
                <div style="background: #ffffff; border-radius: 14px; padding: 28px 24px; border: 1px solid #e2e8f0; box-shadow: 0 8px 25px rgba(8,43,76,0.05); position: relative; display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <div style="font-size: 32px; font-weight: 900; color: rgba(244, 123, 32, 0.25); font-family: var(--font-heading); line-height: 1; margin-bottom: 14px;">${w.step}</div>
                        <h4 style="color: var(--dark-navy); font-size: 17px; font-weight: 800; font-family: var(--font-heading); margin: 0 0 10px 0;">${w.title}</h4>
                        <p style="color: var(--text-muted); font-size: 13.5px; line-height: 1.55; margin: 0;">${w.desc}</p>
                    </div>
                </div>`).join('');

    const faqItems = service.faqs.map((f, i) => `
            <details style="background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.02);" class="faq-item fade-up"${i === 0 ? ' open' : ''}>
                <summary style="padding: 22px 26px; font-weight: 800; color: var(--dark-navy); font-size: 17px; cursor: pointer; list-style: none; display: flex; justify-content: space-between; align-items: center; outline: none; font-family: var(--font-heading);">
                    ${f.q}
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-orange)" stroke-width="3" class="faq-icon"><polyline points="6 9 12 15 18 9"/></svg>
                </summary>
                <div style="padding: 0 26px 22px 26px; color: #475569; line-height: 1.7; font-size: 15px;">
                    ${f.a}
                </div>
            </details>`).join('');

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${service.name} in Pune | Reliable Land Survey Consultancy</title>
    <meta name="description" content="${service.name} by Reliable Land Survey Consultancy in Pune, Maharashtra. High-accuracy surveying, state-of-the-art instruments, fast turnaround.">
    <meta name="keywords" content="${service.name}, Land Survey, Pune, Maharashtra, Reliable Land Survey Consultancy, Surveying Solutions">
    
    <!-- Open Graph tags -->
    <meta property="og:title" content="${service.name} | Reliable Land Survey Consultancy">
    <meta property="og:description" content="${service.tagline}">
    <meta property="og:type" content="website">
    
    <link rel="canonical" href="https://www.reliablelandsurvey.in/${service.slug}">
    
    <!-- Favicon -->
    <link rel="shortcut icon" href="assets/images/favicon.jpg?v=2" type="image/jpeg">
    <link rel="icon" href="assets/images/favicon.jpg?v=2" type="image/jpeg">
    
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/responsive.css">
</head>
<body>

    <!-- TOP BAR -->
    <div class="top-bar-exact">
        <div class="top-bar-content">
            <div class="top-bar-left">
                <span class="top-bar-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                    Pune, Maharashtra
                </span>
                <span class="top-bar-divider">|</span>
                <span class="top-bar-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                    +91 96046 48777 / +91 86000 44688
                </span>
            </div>
            <div class="top-bar-right">
                <a href="https://wa.me/919604648777" target="_blank" class="top-bar-social" aria-label="WhatsApp">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51h-.57c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                </a>
                <a href="tel:+919604648777" class="top-bar-social" aria-label="Call Us">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                </a>
                <a href="mailto:info@reliablelandsurvey.in" class="top-bar-social" aria-label="Email Us">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                </a>
            </div>
        </div>
    </div>

    <!-- MAIN NAVBAR -->
    <nav class="nav-exact anim-nav">
        <div class="nav-logo">
            <img src="assets/logo/logo-transparent.png" alt="Reliable Land Survey Consultancy">
        </div>
        <div class="nav-links" id="mobileNavMenu">
${getNavHtml('services')}
        </div>
        <button class="nav-btn" onclick="window.location.href='contact.html'">Get a Quote &rarr;</button>
        <div class="hamburger-exact" onclick="this.classList.toggle('active'); document.getElementById('mobileNavMenu').classList.toggle('active')">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </nav>

    <!-- BREADCRUMB & HERO BANNER -->
    <section style="background: linear-gradient(135deg, var(--dark-navy) 0%, var(--primary-navy) 100%); padding: 75px 20px 60px 20px; margin-top: 135px; text-align: center; position: relative; overflow: hidden;">
        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: radial-gradient(circle at 80% 20%, rgba(244,123,32,0.15) 0%, transparent 60%); pointer-events: none;"></div>
        <div class="container" style="position: relative; z-index: 2; max-width: 950px;">
            <div style="font-size: 12px; font-weight: 800; color: #a9b9c9; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 18px; display: flex; align-items: center; justify-content: center; gap: 10px;">
                <a href="index.html" style="color: #cbd5e1; text-decoration: none;">HOME</a>
                <span style="color: var(--accent-orange);">&raquo;</span>
                <a href="services.html" style="color: #cbd5e1; text-decoration: none;">SERVICES</a>
                <span style="color: var(--accent-orange);">&raquo;</span>
                <span style="color: var(--accent-orange); font-weight: 800;">${service.name.toUpperCase()}</span>
            </div>
            <h1 style="color: #ffffff; font-size: clamp(2.2rem, 4.5vw, 3.2rem); font-weight: 800; font-family: var(--font-heading); line-height: 1.2; margin: 0 0 16px 0;">${service.heroTitle}</h1>
            <p style="color: #e2e8f0; font-size: 16.5px; line-height: 1.6; max-width: 780px; margin: 0 auto; font-weight: 500;">${service.tagline}</p>
        </div>
    </section>

    <!-- TECHNICAL SPECS & OVERVIEW -->
    <section class="section" style="padding: 70px 0; background: #f8fafc;">
        <div class="container">
            <div style="display: grid; grid-template-columns: 1fr 1.15fr; gap: 40px; align-items: stretch; background: #ffffff; border-radius: 16px; box-shadow: 0 12px 35px rgba(8, 43, 76, 0.06); border: 1px solid #e2e8f0; padding: clamp(25px, 4vw, 45px); box-sizing: border-box;">
                
                <!-- Left: Media & Quick CTA -->
                <div style="display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <div style="border-radius: 12px; overflow: hidden; box-shadow: 0 8px 25px rgba(0,0,0,0.08); margin-bottom: 24px; position: relative;">
                            <img src="${service.image}" alt="${service.name}" style="width: 100%; height: 320px; object-fit: cover; display: block;">
                            <div style="position: absolute; bottom: 0; left: 0; width: 100%; background: linear-gradient(transparent, rgba(8,43,76,0.85)); padding: 20px 20px 15px; color: #fff;">
                                <div style="font-size: 11px; font-weight: 800; letter-spacing: 1px; color: var(--accent-orange); text-transform: uppercase;">GEOSPATIAL EXPERTISE</div>
                                <div style="font-size: 18px; font-weight: 800; font-family: var(--font-heading);">${service.name}</div>
                            </div>
                        </div>
                        <div style="background: #f1f5f9; border-left: 4px solid var(--accent-orange); border-radius: 0 8px 8px 0; padding: 18px 20px;">
                            <div style="font-size: 13.5px; font-weight: 700; color: var(--dark-navy); margin-bottom: 4px;">Rapid Field Dispatch Across Maharashtra</div>
                            <div style="font-size: 12.5px; color: var(--text-muted); line-height: 1.4;">Direct mobilization from Pune headquarters for urgent infrastructure & topographical requirements.</div>
                        </div>
                    </div>
                    
                    <div style="margin-top: 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
                        <a href="contact.html" class="btn btn-primary" style="padding: 15px 18px; font-size: 14.5px; border-radius: 8px; font-weight: 700; text-align: center; display: flex; justify-content: center; align-items: center; gap: 8px;">Request Quote &rarr;</a>
                        <a href="https://wa.me/919604648777" target="_blank" rel="noopener" style="background: #25D366; color: #fff; text-decoration: none; padding: 15px 18px; border-radius: 8px; font-weight: 700; font-size: 14.5px; text-align: center; display: flex; justify-content: center; align-items: center; gap: 8px; box-shadow: 0 4px 12px rgba(37,211,102,0.25);">WhatsApp Us</a>
                    </div>
                </div>

                <!-- Right: Technical Specs Table & Description -->
                <div style="display: flex; flex-direction: column; justify-content: space-between;">
                    <div>
                        <div class="section-label" style="margin-bottom: 6px;">ENGINEERING SPECIFICATIONS</div>
                        <h2 style="color: var(--dark-navy); font-size: clamp(1.6rem, 3vw, 2.2rem); margin: 0 0 14px 0; font-weight: 800; font-family: var(--font-heading); line-height: 1.25;">Technical Standards & Deliverables</h2>
                        <p style="color: var(--text-muted); font-size: 14.5px; line-height: 1.65; margin: 0 0 20px 0;">${service.overview}</p>
                        
                        <table style="width: 100%; border-collapse: collapse; margin-bottom: 10px;">
                            ${specRows}
                        </table>
                    </div>
                </div>

            </div>
        </div>
    </section>

    <!-- KEY SERVICE CAPABILITIES -->
    <section class="section" style="padding: 70px 0; background: #ffffff;">
        <div class="container">
            <div class="text-center" style="margin-bottom: 45px;">
                <div class="section-label" style="margin-bottom: 8px;">CORE DELIVERABLES</div>
                <h2 class="section-heading" style="font-size: clamp(1.8rem, 3vw, 2.3rem); color: var(--dark-navy); font-weight: 800; font-family: var(--font-heading); margin: 0 0 12px 0;">Key Capabilities & Applications</h2>
                <p style="color: var(--text-muted); max-width: 650px; margin: 0 auto; font-size: 15px; line-height: 1.6;">Designed to provide high accuracy for engineers, architects, developers, and project managers.</p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
                ${capBlocks}
            </div>
        </div>
    </section>

    <!-- 4-STEP METHODOLOGY -->
    <section class="section" style="padding: 75px 0; background: #f8fafc;">
        <div class="container">
            <div class="text-center" style="margin-bottom: 45px;">
                <div class="section-label" style="margin-bottom: 8px;">EXECUTION METHODOLOGY</div>
                <h2 class="section-heading" style="font-size: clamp(1.8rem, 3vw, 2.3rem); color: var(--dark-navy); font-weight: 800; font-family: var(--font-heading); margin: 0 0 12px 0;">Our 4-Step Engineering Workflow</h2>
                <p style="color: var(--text-muted); max-width: 650px; margin: 0 auto; font-size: 15px; line-height: 1.6;">From initial monument establishment to rigorous QA and CAD handover.</p>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 20px;">
                ${workflowSteps}
            </div>
        </div>
    </section>

    <!-- FAQS SECTION -->
    <section class="section" style="padding: 75px 0; background: #ffffff;">
        <div class="container">
            <div class="text-center" style="margin-bottom: 45px;">
                <div class="section-label" style="margin-bottom: 8px;">TECHNICAL FAQS</div>
                <h2 class="section-heading" style="font-size: clamp(1.8rem, 3vw, 2.3rem); color: var(--dark-navy); font-weight: 800; font-family: var(--font-heading); margin: 0 0 12px 0;">Frequently Asked Questions</h2>
                <p style="color: var(--text-muted); max-width: 600px; margin: 0 auto; font-size: 15px;">Specific queries regarding our ${service.name} methodology and deliverables.</p>
            </div>

            <div style="max-width: 820px; margin: 0 auto; display: flex; flex-direction: column; gap: 16px;">
                ${faqItems}
            </div>
        </div>
    </section>

    <!-- CTA BANNER -->
    <section style="background: linear-gradient(135deg, #082B4C 0%, #123F68 100%); padding: 75px 20px; text-align: center; color: #fff; position: relative; overflow: hidden;">
        <div style="position: absolute; top: 0; right: 0; width: 50%; height: 100%; background: radial-gradient(circle, rgba(244,123,32,0.18) 0%, transparent 70%); pointer-events: none;"></div>
        <div class="container" style="position: relative; z-index: 2; max-width: 750px;">
            <h2 style="font-size: clamp(1.8rem, 3.5vw, 2.6rem); font-weight: 800; font-family: var(--font-heading); margin: 0 0 16px 0; line-height: 1.25;">Deploy Our Survey Crews to Your Project</h2>
            <p style="color: #cbd5e1; font-size: 16px; line-height: 1.6; margin: 0 auto 30px auto;">Equipped with high-precision total stations, dual-frequency DGPS, and RTK drones, our Pune teams mobilize within 24-48 hours across Maharashtra and India.</p>
            <div style="display: flex; justify-content: center; gap: 15px; flex-wrap: wrap;">
                <a href="contact.html" class="btn btn-primary" style="padding: 16px 36px; font-size: 15.5px; border-radius: 50px; font-weight: 700;">Request Project Quotation &rarr;</a>
                <a href="tel:+919604648777" style="background: rgba(255,255,255,0.12); color: #fff; border: 1.5px solid rgba(255,255,255,0.3); text-decoration: none; padding: 16px 32px; border-radius: 50px; font-weight: 700; font-size: 15.5px; display: inline-flex; align-items: center; gap: 8px; backdrop-filter: blur(5px);">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                    +91 96046 48777
                </a>
            </div>
        </div>
    </section>

    <!-- FOOTER -->
    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-brand">
                    <div style="width: fit-content;">
                        <img src="assets/logo/logo-transparent.png" alt="Reliable Land Survey Consultancy">
                        <p style="color: #000; font-weight: bold; margin-bottom: 12px; font-size: 1.05rem;">Reliable Land Survey Consultancy</p>
                        <ul style="list-style: none; padding: 0; margin: 0; color: #000;">
                            <li style="margin-bottom: 6px; padding-left: 15px; position: relative;"><span style="position: absolute; left: 0; top: 0; color: var(--accent-orange); font-weight: bold;">•</span> Professional Surveying</li>
                            <li style="margin-bottom: 6px; padding-left: 15px; position: relative;"><span style="position: absolute; left: 0; top: 0; color: var(--accent-orange); font-weight: bold;">•</span> Geospatial Solutions</li>
                            <li style="margin-bottom: 6px; padding-left: 15px; position: relative;"><span style="position: absolute; left: 0; top: 0; color: var(--accent-orange); font-weight: bold;">•</span> LiDAR & Drone Mapping</li>
                            <li style="margin-bottom: 6px; padding-left: 15px; position: relative;"><span style="position: absolute; left: 0; top: 0; color: var(--accent-orange); font-weight: bold;">•</span> Infrastructure Corridors</li>
                        </ul>
                    </div>
                </div>
                
                <div class="footer-col">
                    <h4>Quick Links</h4>
                    <div class="footer-links">
                        <a href="index.html">Home</a>
                        <a href="about.html">About Us</a>
                        <a href="services.html">All Services</a>
                        <a href="gallery.html">Project Gallery</a>
                        <a href="review.html">Client Reviews</a>
                        <a href="contact.html">Contact Headquarters</a>
                    </div>
                </div>
                
                <div class="footer-col">
                    <h4>Our Services</h4>
                    <div class="footer-links">
                        <a href="topographical-survey.html">Topographical Survey</a>
                        <a href="dgps-gnss-control.html">DGPS / GNSS Control</a>
                        <a href="total-station-survey.html">Total Station Survey</a>
                        <a href="rtk-drone-mapping.html">RTK Drone Mapping</a>
                        <a href="lidar-3d-scanning.html">Drone LiDAR Scanning</a>
                        <a href="road-highway.html">Road & Highway Survey</a>
                        <a href="cad-gis-processing.html">CAD & GIS Services</a>
                    </div>
                </div>
                
                <div class="footer-col">
                    <h4>Pune Headquarters</h4>
                    <div class="footer-links" style="color: #000; font-size: 0.92rem; gap: 14px;">
                        <p>Pune, Maharashtra, India</p>
                        <p><a href="tel:+919604648777">+91 96046 48777</a> / <a href="tel:+918600044688">+91 86000 44688</a></p>
                        <p><a href="mailto:info@reliablelandsurvey.in">info@reliablelandsurvey.in</a></p>
                        <a href="https://wa.me/919604648777" style="color: #25D366; display: flex; align-items: center; gap: 8px; font-weight: bold;">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.89-4.443 9.891-9.891.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.74-1.975zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                            WhatsApp Us
                        </a>
                    </div>
                </div>
            </div>
            
            <div class="footer-bottom">
                <div class="copyright-info" style="display: flex; flex-direction: column; gap: 6px; align-items: center; text-align: center;">
                    <p>&copy; 2026 <strong>Reliable Land Survey Consultancy</strong>. All Rights Reserved.</p>
                    <p>Developed by <strong><a href="https://mindaxisinnovation.com/" target="_blank" rel="noopener" class="mindaxis-footer-link" style="color: #ffffff !important; -webkit-text-fill-color: #ffffff !important; text-decoration: none !important;">MindAxis Innovation Pvt.Ltd</a></strong></p>
                </div>
            </div>
        </div>
    </footer>

    <!-- FLOATING ACTION BUTTONS -->
    <div class="floating-actions">
        <a href="#" class="float-btn scroll-top" id="scrollTopBtn" style="display: none; background-color: var(--dark-navy); margin-bottom: 10px;">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"></polyline></svg>
            <span class="float-tooltip">Scroll Top</span>
        </a>
        <a href="https://wa.me/919604648777" target="_blank" class="float-btn whatsapp">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.89-4.443 9.891-9.891.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.74-1.975zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
            <span class="float-tooltip">WhatsApp Us</span>
        </a>
        <a href="tel:+919604648777" class="float-btn call">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <span class="float-tooltip">Call Us</span>
        </a>
    </div>

    <!-- Script -->
    <script src="js/script.js"></script>
</body>
</html>`;
}

// 1. Generate all 9 service explanation pages
servicesData.forEach(service => {
    const filePath = path.join(rootDir, service.slug);
    const content = generateServicePage(service);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Generated explanation page: ${service.slug}`);
});

// 2. Update navbar in all main pages (index, about, services, gallery, contact, review)
const mainPages = [
    { file: 'index.html', active: 'home' },
    { file: 'about.html', active: 'about' },
    { file: 'services.html', active: 'services' },
    { file: 'gallery.html', active: 'gallery' },
    { file: 'contact.html', active: 'contact' },
    { file: 'review.html', active: 'review' }
];

mainPages.forEach(({ file, active }) => {
    const filePath = path.join(rootDir, file);
    if (fs.existsSync(filePath)) {
        let html = fs.readFileSync(filePath, 'utf8');
        // Replace nav-links content
        const navRegex = /<div class="nav-links" id="mobileNavMenu">[\s\S]*?<\/div>/;
        const newNavLinks = `<div class="nav-links" id="mobileNavMenu">\n${getNavHtml(active)}\n        </div>`;
        if (navRegex.test(html)) {
            html = html.replace(navRegex, newNavLinks);
            fs.writeFileSync(filePath, html, 'utf8');
            console.log(`Updated navbar in: ${file}`);
        } else {
            console.log(`Nav pattern not found in: ${file}`);
        }
    }
});

console.log('All service pages and navbars updated successfully!');
