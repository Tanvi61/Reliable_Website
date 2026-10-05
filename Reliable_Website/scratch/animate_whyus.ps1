$content = Get-Content -Path 'e:\MindAxis_Web\Reliable_Website\about.html' -Raw

$newSection = @"
    <!-- 4. WHY CHOOSE US (Highly Animated) -->
    <section class="section" style="padding: 100px 20px; background-color: #f8f9fa; position: relative; overflow: hidden;">
        <style>
            @keyframes iconPulseOrange {
                0% { box-shadow: 0 0 0 0 rgba(244, 123, 32, 0.4); }
                70% { box-shadow: 0 0 0 15px rgba(244, 123, 32, 0); }
                100% { box-shadow: 0 0 0 0 rgba(244, 123, 32, 0); }
            }
            @keyframes iconPulseNavy {
                0% { box-shadow: 0 0 0 0 rgba(18, 63, 104, 0.4); }
                70% { box-shadow: 0 0 0 15px rgba(18, 63, 104, 0); }
                100% { box-shadow: 0 0 0 0 rgba(18, 63, 104, 0); }
            }
            .feature-card {
                background: #ffffff;
                padding: 45px 30px;
                border-radius: 16px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.04);
                text-align: center;
                transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                position: relative;
                z-index: 1;
            }
            .feature-card::after {
                content: '';
                position: absolute;
                bottom: 0; left: 0; width: 100%; height: 4px;
                background: var(--accent-orange);
                transform: scaleX(0);
                transform-origin: center;
                transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
                border-radius: 0 0 16px 16px;
            }
            .feature-card.navy-accent::after { background: var(--primary-navy); }
            
            .feature-card:hover {
                transform: translateY(-15px);
                box-shadow: 0 25px 50px rgba(0,0,0,0.1);
            }
            .feature-card:hover::after {
                transform: scaleX(1);
            }
            
            .icon-box {
                width: 75px; height: 75px;
                margin: 0 auto 25px auto;
                border-radius: 50%;
                display: flex; align-items: center; justify-content: center;
                transition: all 0.5s ease;
            }
            .icon-box.orange {
                background: rgba(244, 123, 32, 0.1);
                color: var(--accent-orange);
                animation: iconPulseOrange 2s infinite;
            }
            .icon-box.navy {
                background: rgba(18, 63, 104, 0.1);
                color: var(--primary-navy);
                animation: iconPulseNavy 2s infinite;
                animation-delay: 1s;
            }
            
            .feature-card:hover .icon-box {
                transform: scale(1.15) translateY(-5px);
            }
            .feature-card:hover .icon-box svg {
                transform: rotateY(180deg);
                transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
            .icon-box svg {
                transition: transform 0.6s ease;
            }
        </style>

        <div class="container">
            <div class="fade-up mobile-text-center" style="text-align: center; margin-bottom: 60px;">
                <div class="section-label" style="display: inline-block; margin-bottom: 15px; color: var(--accent-orange); font-weight: 700; letter-spacing: 2px;">WHY CHOOSE RELIABLE?</div>
                <h2 class="section-heading" style="font-size: 2.5rem; color: var(--dark-navy);">The Preferred Surveying Partner</h2>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px;">
                
                <!-- Card 1 -->
                <div class="fade-up feature-card" style="animation-delay: 0.1s;">
                    <div class="icon-box orange">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                    </div>
                    <h3 style="color: var(--dark-navy); font-size: 1.3rem; margin-bottom: 15px; font-weight: 800;">Global Standards</h3>
                    <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.7; margin: 0;">We adhere to the highest international surveying standards to ensure impeccable accuracy.</p>
                </div>

                <!-- Card 2 -->
                <div class="fade-up feature-card navy-accent" style="animation-delay: 0.2s;">
                    <div class="icon-box navy">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    </div>
                    <h3 style="color: var(--dark-navy); font-size: 1.3rem; margin-bottom: 15px; font-weight: 800;">Expert Team</h3>
                    <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.7; margin: 0;">Our highly qualified and certified professionals bring decades of combined field experience.</p>
                </div>

                <!-- Card 3 -->
                <div class="fade-up feature-card" style="animation-delay: 0.3s;">
                    <div class="icon-box orange">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    </div>
                    <h3 style="color: var(--dark-navy); font-size: 1.3rem; margin-bottom: 15px; font-weight: 800;">On-Time Delivery</h3>
                    <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.7; margin: 0;">We deploy rapid mapping tech to ensure you receive your data exactly when you need it.</p>
                </div>

                <!-- Card 4 -->
                <div class="fade-up feature-card navy-accent" style="animation-delay: 0.4s;">
                    <div class="icon-box navy">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    </div>
                    <h3 style="color: var(--dark-navy); font-size: 1.3rem; margin-bottom: 15px; font-weight: 800;">Safety First</h3>
                    <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.7; margin: 0;">Uncompromising safety protocols protect our teams and your worksite at all times.</p>
                </div>

            </div>
        </div>
    </section>
"@

# Regex to match the old WHY CHOOSE US section up to the footer
$pattern = '(?s)<!-- 4\. WHY CHOOSE US -->.*?(?=<footer class="footer">)'
$content = [regex]::Replace($content, $pattern, $newSection + "`n`n    ")

Set-Content -Path 'e:\MindAxis_Web\Reliable_Website\about.html' -Value $content
