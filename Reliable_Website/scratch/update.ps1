$content = [System.IO.File]::ReadAllText('e:\MindAxis_Web\Reliable_Website\about.html')

$newHtml = @"
    <div class="about-hero-exact" style="position: relative; width: 100%; background-color: #eaf4fc; padding-top: 150px; overflow: hidden;">
      
      <!-- Animated Background Image -->
      <img src="assets/images/about-hero-clean.jpg" class="bg-pan-anim" style="width: 100%; height: auto; min-height: 400px; object-fit: cover; display: block; object-position: right center;">
      
      <!-- Overlay Text -->
      <div style="position: absolute; top: 150px; left: 0; width: 100%; height: calc(100% - 150px); display: flex; flex-direction: column; justify-content: center; padding: 0 8%; z-index: 2; pointer-events: none;">
        <div class="text-fade-in-left" style="max-width: 600px; padding-bottom: 50px;">
            <h5 style="color: var(--primary-navy); font-weight: 700; letter-spacing: 2px; font-size: 14px; margin-bottom: 10px;">ABOUT US</h5>
            <div style="width: 40px; height: 3px; background: var(--accent-orange); margin-bottom: 25px;"></div>
            <h1 style="font-size: clamp(2.5rem, 5vw, 4rem); color: var(--dark-navy); line-height: 1.1; margin-bottom: 20px; font-weight: 800;">Precision. Reliability. <span style="color: var(--accent-orange);">Expertise<span style="font-size: 0.5em; vertical-align: super; font-weight: normal; margin-left: 2px;">○</span></span></h1>
            <p style="font-size: 1.1rem; color: #444; line-height: 1.6; max-width: 500px; font-weight: 500;">Professional land surveying and geospatial solutions built on accurate data, modern technology and dependable field expertise.</p>
        </div>
      </div>
"@

$content = $content -replace '(?s)\s+<div class="about-hero-exact".*?</div>\s*</div>', ("`n" + $newHtml + "`n    </div>")

[System.IO.File]::WriteAllText('e:\MindAxis_Web\Reliable_Website\about.html', $content)
