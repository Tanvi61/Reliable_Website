$content = Get-Content -Path 'e:\MindAxis_Web\Reliable_Website\about.html' -Raw

$newSection = @"
    <!-- 3. OUR EXPERTISE (Interactive Slider) -->
    <section class="section" style="padding: 100px 20px; position: relative; overflow: hidden; background-color: #f8f9fa;">
        <!-- Background Image -->
        <div class="expertise-bg-anim" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-image: url('assets/images/expertise-bg-v2.png'); background-size: cover; background-position: center; z-index: 0; opacity: 0.8; pointer-events: none;"></div>

        <style>
        .expertise-slider-wrapper { max-width: 1100px; margin: 0 auto; display: flex; flex-direction: column; gap: 40px; position: relative; z-index: 1;}
        .expertise-card {
            display: flex;
            background: #fff;
            border-radius: 20px;
            box-shadow: 0 30px 60px rgba(0,0,0,0.06);
            overflow: hidden;
            min-height: 480px;
        }
        .expertise-img-col {
            flex: 0 0 45%;
            position: relative;
            overflow: hidden;
            background: #ddd;
        }
        .expertise-img-col img {
            width: 100%; height: 100%; object-fit: cover;
            transition: opacity 0.5s ease, transform 0.8s ease;
        }
        .expertise-content-col {
            flex: 1;
            padding: 60px 60px;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            background: #ffffff;
        }
        .exp-top-bar {
            display: flex; justify-content: space-between; align-items: center;
            border-bottom: 1px solid #eaeaea;
            padding-bottom: 20px;
            margin-bottom: 40px;
            position: absolute; top: 40px; left: 60px; right: 60px;
        }
        .exp-line { width: 80px; height: 3px; background: var(--accent-orange); }
        .exp-counter { font-weight: 700; color: #888; font-size: 0.9rem; letter-spacing: 1px; }

        .exp-text-wrap {
            position: relative; z-index: 2;
            transition: opacity 0.4s ease, transform 0.4s ease;
        }
        .exp-tag {
            color: var(--accent-orange); font-weight: 800; font-size: 0.9rem; letter-spacing: 2px;
            margin-bottom: 15px; display: flex; align-items: center; gap: 8px; text-transform: uppercase;
        }
        .exp-dot { width: 6px; height: 6px; background: var(--accent-orange); border-radius: 50%; }
        .exp-text-wrap h2 {
            font-size: 2.8rem; color: var(--dark-navy); margin-bottom: 20px; line-height: 1.1; font-weight: 900;
        }
        .exp-text-wrap p {
            color: var(--text-muted); font-size: 1.1rem; line-height: 1.7; max-width: 95%; margin: 0;
        }
        .exp-watermark {
            position: absolute; bottom: 0px; right: 30px;
            font-size: 14rem; font-weight: 900; color: rgba(0,0,0,0.03);
            line-height: 1; z-index: 1; pointer-events: none;
            transition: opacity 0.4s ease;
        }

        /* Controls */
        .exp-controls {
            display: flex; align-items: center; justify-content: center; gap: 30px; position: relative; z-index: 1;
        }
        .exp-arrow {
            width: 45px; height: 45px; border-radius: 50%; border: none;
            display: flex; align-items: center; justify-content: center;
            cursor: pointer; transition: all 0.3s ease; font-size: 1.2rem;
        }
        .exp-prev { background: #fff; color: var(--dark-navy); box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
        .exp-prev:hover { background: #f0f0f0; }
        .exp-next { background: var(--accent-orange); color: #fff; box-shadow: 0 4px 15px rgba(244,123,32,0.3); }
        .exp-next:hover { background: #d96813; transform: translateX(3px); }
        .exp-dots { display: flex; gap: 10px; align-items: center; }
        .exp-dot-btn {
            width: 8px; height: 8px; border-radius: 50%; background: #ccc; border: none; cursor: pointer; transition: all 0.3s ease; padding: 0;
        }
        .exp-dot-btn.active {
            width: 24px; border-radius: 4px; background: var(--accent-orange);
        }

        /* Thumbnails */
        .exp-thumbnails {
            display: flex; justify-content: center; gap: 15px; margin-top: 10px; flex-wrap: wrap; position: relative; z-index: 1;
        }
        .exp-thumb {
            width: 70px; height: 70px; border-radius: 50%; object-fit: cover;
            cursor: pointer; border: 3px solid transparent; padding: 2px;
            transition: all 0.3s ease; opacity: 0.6; box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }
        .exp-thumb.active {
            border-color: var(--accent-orange); opacity: 1; transform: scale(1.1);
        }
        .exp-thumb:hover { opacity: 1; }

        @media(max-width: 991px) {
            .expertise-card { flex-direction: column; min-height: auto; }
            .expertise-img-col { height: 350px; flex: none; }
            .expertise-content-col { padding: 80px 40px 40px 40px; }
            .exp-top-bar { left: 40px; right: 40px; top: 30px; }
            .exp-watermark { font-size: 10rem; }
            .exp-text-wrap h2 { font-size: 2.2rem; }
        }
        @media(max-width: 576px) {
            .expertise-img-col { height: 250px; }
            .expertise-content-col { padding: 70px 25px 30px 25px; }
            .exp-top-bar { left: 25px; right: 25px; top: 25px; }
            .exp-watermark { font-size: 7rem; }
            .exp-text-wrap h2 { font-size: 1.8rem; }
            .exp-thumbnails { display: none; }
        }
        </style>

        <div class="container" style="position: relative; z-index: 1;">
            
            <div style="text-align: center; margin-bottom: 50px;" class="fade-up">
                <div class="section-label" style="display: inline-block; margin-bottom: 15px; color: var(--accent-orange); font-weight: 700; letter-spacing: 2px;">OUR EXPERTISE</div>
                <h2 class="section-heading" style="color: var(--dark-navy);">Core Strengths</h2>
            </div>

            <!-- Slider Main Container -->
            <div class="expertise-slider-wrapper fade-up">
                
                <!-- Main Card -->
                <div class="expertise-card">
                    <div class="expertise-img-col">
                        <img id="exp-img" src="assets/images/total-station.jpg" alt="Expertise">
                    </div>
                    <div class="expertise-content-col">
                        <!-- Top Bar -->
                        <div class="exp-top-bar">
                            <div class="exp-line"></div>
                            <div class="exp-counter" id="exp-counter">01 / 07</div>
                        </div>
                        
                        <!-- Content -->
                        <div class="exp-text-wrap" id="exp-text-wrap">
                            <div class="exp-tag"><span class="exp-dot"></span> <span id="exp-tag-text">PRECISION</span></div>
                            <h2 id="exp-title">Accurate Measurements</h2>
                            <p id="exp-desc">Accurate measurements and dependable survey data for critical engineering and design.</p>
                        </div>
                        
                        <!-- Watermark -->
                        <div class="exp-watermark" id="exp-watermark">01</div>
                    </div>
                </div>

                <!-- Controls (Arrows & Dots) -->
                <div class="exp-controls">
                    <button class="exp-arrow exp-prev" onclick="expPrev()">&#10094;</button>
                    <div class="exp-dots" id="exp-dots-container"></div>
                    <button class="exp-arrow exp-next" onclick="expNext()">&#10095;</button>
                </div>

                <!-- Thumbnails -->
                <div class="exp-thumbnails" id="exp-thumb-container"></div>

            </div>
        </div>

        <script>
            const expData = [
                { tag: "PRECISION", title: "Accurate Measurements", desc: "Accurate measurements and dependable survey data for critical engineering and design.", img: "assets/images/total-station.jpg" },
                { tag: "TECHNOLOGY", title: "Modern Equipment", desc: "Modern surveying equipment and efficient field techniques for fast, reliable spatial mapping.", img: "assets/images/drone.jpg" },
                { tag: "RELIABILITY", title: "Professional Service", desc: "Professional service and timely project delivery ensuring your projects stay strictly on schedule.", img: "assets/images/highway.jpg" },
                { tag: "EFFICIENCY", title: "Rapid Data Delivery", desc: "State-of-the-art DGPS systems that allow us to collect and process vast amounts of field data quickly.", img: "assets/images/dgps.jpg" },
                { tag: "EXPERTISE", title: "Certified Surveyors", desc: "Our teams consist of certified, highly experienced land surveyors who understand complex geospatial challenges.", img: "assets/images/lidar.jpg" },
                { tag: "SAFETY", title: "Uncompromising Standards", desc: "Strict adherence to safety protocols protecting our teams, your worksite, and the surrounding environment.", img: "assets/images/railway.jpg" },
                { tag: "INNOVATION", title: "Advanced Processing", desc: "Utilizing cutting-edge CAD and GIS software to translate raw field data into actionable 3D models.", img: "assets/images/digital-level.jpg" }
            ];

            let currentExpIndex = 0;
            
            function initExpSlider() {
                const dotsContainer = document.getElementById('exp-dots-container');
                const thumbContainer = document.getElementById('exp-thumb-container');
                
                expData.forEach((item, index) => {
                    const dot = document.createElement('button');
                    dot.className = 'exp-dot-btn' + (index === 0 ? ' active' : '');
                    dot.onclick = () => goToExpSlide(index);
                    dotsContainer.appendChild(dot);
                    
                    const thumb = document.createElement('img');
                    thumb.src = item.img;
                    thumb.className = 'exp-thumb' + (index === 0 ? ' active' : '');
                    thumb.onclick = () => goToExpSlide(index);
                    thumbContainer.appendChild(thumb);
                });
                updateExpDOM();
            }

            function updateExpDOM() {
                const data = expData[currentExpIndex];
                const imgEl = document.getElementById('exp-img');
                const textWrap = document.getElementById('exp-text-wrap');
                const watermark = document.getElementById('exp-watermark');
                
                imgEl.style.opacity = 0;
                imgEl.style.transform = 'scale(1.05)';
                textWrap.style.opacity = 0;
                textWrap.style.transform = 'translateY(10px)';
                watermark.style.opacity = 0;
                
                setTimeout(() => {
                    imgEl.src = data.img;
                    document.getElementById('exp-counter').innerText = '0' + (currentExpIndex + 1) + ' / 0' + expData.length;
                    document.getElementById('exp-tag-text').innerText = data.tag;
                    document.getElementById('exp-title').innerText = data.title;
                    document.getElementById('exp-desc').innerText = data.desc;
                    watermark.innerText = '0' + (currentExpIndex + 1);
                    
                    document.querySelectorAll('.exp-dot-btn').forEach((d, i) => d.className = i === currentExpIndex ? 'exp-dot-btn active' : 'exp-dot-btn');
                    document.querySelectorAll('.exp-thumb').forEach((t, i) => t.className = i === currentExpIndex ? 'exp-thumb active' : 'exp-thumb');
                    
                    imgEl.style.opacity = 1;
                    imgEl.style.transform = 'scale(1)';
                    textWrap.style.opacity = 1;
                    textWrap.style.transform = 'translateY(0)';
                    watermark.style.opacity = 1;
                }, 300);
            }
            
            function expNext() { goToExpSlide((currentExpIndex + 1) % expData.length); }
            function expPrev() { goToExpSlide((currentExpIndex - 1 + expData.length) % expData.length); }
            function goToExpSlide(index) { if(currentExpIndex !== index) { currentExpIndex = index; updateExpDOM(); } }

            document.addEventListener('DOMContentLoaded', initExpSlider);
            // Run immediately in case DOM is already loaded
            if (document.readyState === 'complete' || document.readyState === 'interactive') { setTimeout(initExpSlider, 100); }
        </script>
    </section>
"@

$pattern = '(?s)<!-- 3\. OUR EXPERTISE -->.*?<!-- 4\. WHY CHOOSE US \(Highly Animated\) -->'
if ($content -match $pattern) {
    $content = [regex]::Replace($content, $pattern, $newSection + "`n`n    <!-- 4. WHY CHOOSE US (Highly Animated) -->")
    Set-Content -Path 'e:\MindAxis_Web\Reliable_Website\about.html' -Value $content
} else {
    Write-Host "Pattern not found"
}
