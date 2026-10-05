$content = Get-Content -Path 'e:\MindAxis_Web\Reliable_Website\about.html' -Raw

# Remove the inline hover styles
$content = $content -replace 'onmouseover="this\.style\.transform=''translateX\(-8px\)?''; this\.style\.background=''rgba\(255,255,255,0\.06\)?'';?"', ''
$content = $content -replace 'onmouseout="this\.style\.transform=''translateX\(0\)?''; this\.style\.background=''rgba\(255,255,255,0\.03\)?'';?"', ''

# Add class to icon box
$content = $content -replace '<div style="background: rgba\(244, 123, 32, 0\.15\); width: 50px; height: 50px; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: var\(--accent-orange\); flex-shrink: 0; z-index: 1;">', '<div class="mission-icon-box" style="background: rgba(244, 123, 32, 0.15); width: 50px; height: 50px; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: var(--accent-orange); flex-shrink: 0; z-index: 1;">'

# Add the CSS block before the section starts
$cssBlock = @"
    <!-- MISSION, VISION & VALUES (Dark Premium) -->
    <style>
    .mission-card { transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important; }
    .mission-card:hover {
        transform: translateX(-10px) translateY(-5px);
        background: rgba(255,255,255,0.06) !important;
        border-color: rgba(244, 123, 32, 0.4) !important;
        box-shadow: 0 15px 35px rgba(0,0,0,0.2);
    }
    .mission-card .mission-icon-box { transition: all 0.5s ease; }
    .mission-card:hover .mission-icon-box {
        background: var(--accent-orange) !important;
        color: #ffffff !important;
        transform: rotateY(180deg) scale(1.15);
        box-shadow: 0 0 20px rgba(244,123,32,0.4);
    }
    .mission-card h4 { transition: color 0.3s ease, transform 0.3s ease; }
    .mission-card:hover h4 {
        color: var(--accent-orange) !important;
        transform: translateX(5px);
    }
    .mission-card p { transition: color 0.3s ease; }
    .mission-card:hover p { color: rgba(255,255,255,0.9) !important; }
    </style>
"@

$content = $content -replace '<!-- MISSION, VISION & VALUES \(Dark Premium\) -->', $cssBlock

Set-Content -Path 'e:\MindAxis_Web\Reliable_Website\about.html' -Value $content
