$content = Get-Content -Path 'e:\MindAxis_Web\Reliable_Website\about.html' -Raw

$newSection = @"
    <!-- 4. WHY CHOOSE US -->
    <section class="section" style="padding: 100px 20px; background-color: #f8f9fa; position: relative;">
        <div class="container">
            <div class="fade-up mobile-text-center" style="text-align: center; margin-bottom: 60px;">
                <div class="section-label" style="display: inline-block; margin-bottom: 15px; color: var(--accent-orange); font-weight: 700; letter-spacing: 2px;">WHY CHOOSE RELIABLE?</div>
                <h2 class="section-heading" style="font-size: 2.5rem; color: var(--dark-navy);">The Preferred Surveying Partner</h2>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px;">
                
                <!-- Card 1 -->
                <div class="fade-up" style="background: #ffffff; padding: 40px 30px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); text-align: center; transition: all 0.4s ease; animation-delay: 0.1s; cursor: pointer; border-bottom: 3px solid transparent;" onmouseover="this.style.transform='translateY(-10px)'; this.style.boxShadow='0 20px 40px rgba(0,0,0,0.1)'; this.style.borderBottom='3px solid var(--accent-orange)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 10px 30px rgba(0,0,0,0.05)'; this.style.borderBottom='3px solid transparent';">
                    <div style="width: 70px; height: 70px; background: rgba(244, 123, 32, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--accent-orange); margin: 0 auto 20px auto; transition: transform 0.4s ease;">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                    </div>
                    <h3 style="color: var(--dark-navy); font-size: 1.25rem; margin-bottom: 15px;">Global Standards</h3>
                    <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin: 0;">We adhere to the highest international surveying standards to ensure impeccable accuracy.</p>
                </div>

                <!-- Card 2 -->
                <div class="fade-up" style="background: #ffffff; padding: 40px 30px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); text-align: center; transition: all 0.4s ease; animation-delay: 0.2s; cursor: pointer; border-bottom: 3px solid transparent;" onmouseover="this.style.transform='translateY(-10px)'; this.style.boxShadow='0 20px 40px rgba(0,0,0,0.1)'; this.style.borderBottom='3px solid var(--accent-orange)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 10px 30px rgba(0,0,0,0.05)'; this.style.borderBottom='3px solid transparent';">
                    <div style="width: 70px; height: 70px; background: rgba(18, 63, 104, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--primary-navy); margin: 0 auto 20px auto; transition: transform 0.4s ease;">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                    </div>
                    <h3 style="color: var(--dark-navy); font-size: 1.25rem; margin-bottom: 15px;">Expert Team</h3>
                    <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin: 0;">Our highly qualified and certified professionals bring decades of combined field experience.</p>
                </div>

                <!-- Card 3 -->
                <div class="fade-up" style="background: #ffffff; padding: 40px 30px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); text-align: center; transition: all 0.4s ease; animation-delay: 0.3s; cursor: pointer; border-bottom: 3px solid transparent;" onmouseover="this.style.transform='translateY(-10px)'; this.style.boxShadow='0 20px 40px rgba(0,0,0,0.1)'; this.style.borderBottom='3px solid var(--accent-orange)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 10px 30px rgba(0,0,0,0.05)'; this.style.borderBottom='3px solid transparent';">
                    <div style="width: 70px; height: 70px; background: rgba(244, 123, 32, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--accent-orange); margin: 0 auto 20px auto; transition: transform 0.4s ease;">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                    </div>
                    <h3 style="color: var(--dark-navy); font-size: 1.25rem; margin-bottom: 15px;">On-Time Delivery</h3>
                    <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin: 0;">We deploy rapid mapping tech to ensure you receive your data exactly when you need it.</p>
                </div>

                <!-- Card 4 -->
                <div class="fade-up" style="background: #ffffff; padding: 40px 30px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); text-align: center; transition: all 0.4s ease; animation-delay: 0.4s; cursor: pointer; border-bottom: 3px solid transparent;" onmouseover="this.style.transform='translateY(-10px)'; this.style.boxShadow='0 20px 40px rgba(0,0,0,0.1)'; this.style.borderBottom='3px solid var(--primary-navy)';" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 10px 30px rgba(0,0,0,0.05)'; this.style.borderBottom='3px solid transparent';">
                    <div style="width: 70px; height: 70px; background: rgba(18, 63, 104, 0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--primary-navy); margin: 0 auto 20px auto; transition: transform 0.4s ease;">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    </div>
                    <h3 style="color: var(--dark-navy); font-size: 1.25rem; margin-bottom: 15px;">Safety First</h3>
                    <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6; margin: 0;">Uncompromising safety protocols protect our teams and your worksite at all times.</p>
                </div>

            </div>
        </div>
    </section>

    <footer class="footer">
"@

$content = $content -replace '<footer class="footer">', $newSection

# Also fix the weird typo `<!-- 3\. OUR EXPERTISE -->` to `<!-- 3. OUR EXPERTISE -->`
$content = $content -replace '<!-- 3\\\. OUR EXPERTISE -->', '<!-- 3. OUR EXPERTISE -->'

Set-Content -Path 'e:\MindAxis_Web\Reliable_Website\about.html' -Value $content
