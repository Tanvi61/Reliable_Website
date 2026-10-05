$content = Get-Content -Path 'e:\MindAxis_Web\Reliable_Website\about.html' -Raw

$newSection = @"
    <!-- MISSION, VISION & VALUES (Dark Premium) -->
    <section class="section" style="padding: 100px 20px; background-color: #0d1117; overflow: hidden; position: relative;">
        <!-- Subtle dark background glow -->
        <div style="position: absolute; top: 0; right: 0; width: 600px; height: 600px; background: radial-gradient(circle, rgba(220,53,69,0.05) 0%, transparent 70%); pointer-events: none;"></div>
        
        <div class="container">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 60px; align-items: center;">
                
                <!-- Left Content -->
                <div class="fade-up">
                    <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 20px;">
                        <div style="height: 2px; width: 40px; background-color: #dc3545;"></div>
                        <span style="color: #dc3545; font-weight: 700; font-size: 0.85rem; letter-spacing: 2px; text-transform: uppercase;">OUR PURPOSE</span>
                    </div>
                    
                    <h2 style="color: #ffffff; font-size: clamp(2.5rem, 5vw, 3.5rem); line-height: 1.1; margin-bottom: 25px; font-weight: 800;">
                        Mission, Vision <span style="color: #dc3545;">&</span><br>
                        <span style="color: #dc3545;">Values</span>
                    </h2>
                    
                    <p style="color: rgba(255,255,255,0.7); font-size: 1.1rem; line-height: 1.8; margin-bottom: 0;">
                        We are driven by a single-minded commitment to excellence. Every project we survey, every layout we establish, and every client experience we curate is a reflection of our core purpose.
                    </p>
                </div>

                <!-- Right Cards -->
                <div style="display: flex; flex-direction: column; gap: 15px;">
                    
                    <!-- Card 1: Mission -->
                    <div class="fade-up mission-card" style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 12px; padding: 25px 30px; display: flex; gap: 25px; align-items: center; position: relative; overflow: hidden; transition: transform 0.4s ease, background 0.4s ease; animation-delay: 0.1s; cursor: pointer;" onmouseover="this.style.transform='translateX(-8px)'; this.style.background='rgba(255,255,255,0.06)';" onmouseout="this.style.transform='translateX(0)'; this.style.background='rgba(255,255,255,0.03)';">
                        <!-- Watermark -->
                        <div style="position: absolute; right: 20px; top: 50%; transform: translateY(-50%); font-size: 6rem; font-weight: 900; color: rgba(255,255,255,0.02); z-index: 0; pointer-events: none;">01</div>
                        
                        <div style="background: rgba(220, 53, 69, 0.1); width: 50px; height: 50px; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #dc3545; flex-shrink: 0; z-index: 1;">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                        </div>
                        <div style="z-index: 1;">
                            <h4 style="color: #ffffff; font-size: 1.25rem; margin-bottom: 8px;">Our Mission</h4>
                            <p style="color: rgba(255,255,255,0.6); font-size: 0.95rem; line-height: 1.5; margin: 0;">To deliver world-class surveying solutions that ensure precision and unmatched accuracy for every construction and development project.</p>
                        </div>
                    </div>

                    <!-- Card 2: Vision -->
                    <div class="fade-up mission-card" style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 12px; padding: 25px 30px; display: flex; gap: 25px; align-items: center; position: relative; overflow: hidden; transition: transform 0.4s ease, background 0.4s ease; animation-delay: 0.2s; cursor: pointer;" onmouseover="this.style.transform='translateX(-8px)'; this.style.background='rgba(255,255,255,0.06)';" onmouseout="this.style.transform='translateX(0)'; this.style.background='rgba(255,255,255,0.03)';">
                        <!-- Watermark -->
                        <div style="position: absolute; right: 20px; top: 50%; transform: translateY(-50%); font-size: 6rem; font-weight: 900; color: rgba(255,255,255,0.02); z-index: 0; pointer-events: none;">02</div>
                        
                        <div style="background: rgba(220, 53, 69, 0.1); width: 50px; height: 50px; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #dc3545; flex-shrink: 0; z-index: 1;">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        </div>
                        <div style="z-index: 1;">
                            <h4 style="color: #ffffff; font-size: 1.25rem; margin-bottom: 8px;">Our Vision</h4>
                            <p style="color: rgba(255,255,255,0.6); font-size: 0.95rem; line-height: 1.5; margin: 0;">To be the most trusted premium land survey and geospatial solutions brand, recognized globally for excellence in field practices.</p>
                        </div>
                    </div>

                    <!-- Card 3: Values -->
                    <div class="fade-up mission-card" style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 12px; padding: 25px 30px; display: flex; gap: 25px; align-items: center; position: relative; overflow: hidden; transition: transform 0.4s ease, background 0.4s ease; animation-delay: 0.3s; cursor: pointer;" onmouseover="this.style.transform='translateX(-8px)'; this.style.background='rgba(255,255,255,0.06)';" onmouseout="this.style.transform='translateX(0)'; this.style.background='rgba(255,255,255,0.03)';">
                        <!-- Watermark -->
                        <div style="position: absolute; right: 20px; top: 50%; transform: translateY(-50%); font-size: 6rem; font-weight: 900; color: rgba(255,255,255,0.02); z-index: 0; pointer-events: none;">03</div>
                        
                        <div style="background: rgba(220, 53, 69, 0.1); width: 50px; height: 50px; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #dc3545; flex-shrink: 0; z-index: 1;">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                        </div>
                        <div style="z-index: 1;">
                            <h4 style="color: #ffffff; font-size: 1.25rem; margin-bottom: 8px;">Our Values</h4>
                            <p style="color: rgba(255,255,255,0.6); font-size: 0.95rem; line-height: 1.5; margin: 0;">Quality without compromise. Integrity in every interaction. Innovation in every measurement. Commitment to client success.</p>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </section>
"@

# 1. Remove the old "4. MISSION / CLOSING" section (from "<!-- 4. MISSION" to "</section>")
$patternRemove = '(?s)<!-- 4\. MISSION / CLOSING -->.*?</section>'
$content = [regex]::Replace($content, $patternRemove, '')

# 2. Insert the new section right before "<!-- 3. OUR EXPERTISE -->"
$patternInsert = '<!-- 3\. OUR EXPERTISE -->'
$content = $content -replace $patternInsert, ($newSection + "`n`n    " + $patternInsert)

Set-Content -Path 'e:\MindAxis_Web\Reliable_Website\about.html' -Value $content
