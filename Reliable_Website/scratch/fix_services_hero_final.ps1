$content = Get-Content -Path 'e:\MindAxis_Web\Reliable_Website\services.html' -Raw

# 1. Extract Top Bar
$topBarRegex = [regex]::Match($content, '(?s)<!-- ==========================================\s*TOP BAR\s*========================================== -->\s*<div class="top-bar-exact".*?</div>\s*</div>\s*</div>')
$topBarHtml = if ($topBarRegex.Success) { $topBarRegex.Value } else { "" }

# 2. Extract Nav
$navRegex = [regex]::Match($content, '(?s)<nav class="nav-exact anim-nav".*?</nav>')
$navHtml = if ($navRegex.Success) { $navRegex.Value } else { "" }

# 3. Build new Hero (without top bar and nav inside it!)
$newHeroHtml = '
<!-- ==========================================
   SERVICES HERO BANNER
========================================== -->
<div class="services-hero-exact" style="position: relative; width: 100%; height: 75vh; min-height: 500px; max-height: 800px; overflow: hidden; background-color: #f4f9fd;">
    <style>
        @keyframes subtleZoom {
            0% { transform: scale(1); }
            50% { transform: scale(1.03); }
            100% { transform: scale(1); }
        }
        .services-hero-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center 20%;
            animation: subtleZoom 25s ease-in-out infinite;
        }
        .services-hero-content {
            position: absolute;
            top: 50%;
            left: 5%;
            transform: translateY(-50%);
            max-width: 600px;
            z-index: 10;
            padding: 20px;
            pointer-events: none;
        }
        .services-hero-title {
            font-size: clamp(2.5rem, 5vw, 4rem);
            font-weight: 900;
            color: var(--dark-navy);
            line-height: 1.1;
            margin-bottom: 20px;
            text-shadow: 0 0 15px rgba(255,255,255,0.9), 0 0 30px rgba(255,255,255,0.9);
        }
        .services-hero-desc {
            font-size: clamp(1rem, 1.5vw, 1.15rem);
            color: #111;
            font-weight: 700;
            line-height: 1.6;
            text-shadow: 0 0 10px rgba(255,255,255,1), 0 0 20px rgba(255,255,255,1);
        }
        @media(max-width: 768px) {
            .services-hero-exact { height: 60vh; min-height: 450px; }
            .services-hero-img { object-position: center; }
            .services-hero-content { left: 5%; right: 5%; text-align: center; background: rgba(255,255,255,0.4); backdrop-filter: blur(5px); border-radius: 12px; padding: 25px; }
            .services-hero-title { text-shadow: none; color: var(--dark-navy); }
            .services-hero-desc { text-shadow: none; color: #333; }
        }
    </style>
    
    <!-- Image -->
    <img src="assets/images/services-hero-bg.png" class="services-hero-img" alt="Our Services">
    
    <!-- Content -->
    <div class="services-hero-content">
        <h5 style="color: var(--accent-orange); font-weight: 800; letter-spacing: 3px; font-size: 14px; margin-bottom: 10px; text-shadow: 0 0 10px rgba(255,255,255,0.9);">OUR EXPERTISE</h5>
        <h1 class="services-hero-title">Comprehensive<br>Surveying Solutions</h1>
        <p class="services-hero-desc">Delivering precision engineering data through modern DGPS, LiDAR, and Drone mapping technologies.</p>
    </div>
</div>
'

# Remove old hero block completely
$content = $content -replace '(?s)<!-- ==========================================\s*HERO EXACT REPLICA\s*========================================== -->\s*<div class="hero-exact".*?</div>\s*</div>', ''

# Rebuild body top
$replacementBody = "<body>`n`n    $topBarHtml`n`n    $navHtml`n`n    $newHeroHtml"
$content = $content -replace '<body>', $replacementBody

Set-Content -Path 'e:\MindAxis_Web\Reliable_Website\services.html' -Value $content
