import re

with open('e:/MindAxis_Web/Reliable_Website/about.html', 'r', encoding='utf-8') as f:
    content = f.read()

new_html = r'''      <div class="hero-content-exact" style="margin-top: 100px; padding-bottom: 60px; text-align: center; max-width: 800px; margin-left: auto; margin-right: auto; padding-left: 20px; padding-right: 20px;">
        <h1 class="hero-title-exact anim-title" style="font-size: clamp(2.5rem, 6vw, 3.5rem); color: #fff; line-height: 1.2; margin-bottom: 20px;">Precision. Reliability. Expertise.</h1>
        <p class="anim-title" style="font-size: 1.1rem; color: rgba(255,255,255,0.9); line-height: 1.6; animation-delay: 0.2s;">Professional land surveying and geospatial solutions built on accurate data, modern technology and dependable field expertise.</p>
      </div>
    </div>

    <!-- 2. WHO WE ARE -->
    <section class="section" style="padding: 100px 20px; background-color: #ffffff; overflow-x: hidden;">
        <div class="container">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 50px; align-items: center;">
                <div class="zoom-in" style="position: relative;">
                    <!-- Grid background element -->
                    <div style="position: absolute; top: -15px; left: -15px; width: 60%; height: 60%; background-image: radial-gradient(#123F68 1.5px, transparent 1.5px); background-size: 15px 15px; opacity: 0.15; z-index: 0;"></div>
                    <img src="assets/images/total-station-survey.jpg" alt="Professional Land Surveying" style="width: 100%; border-radius: 8px; box-shadow: 0 20px 40px rgba(0,0,0,0.08); position: relative; z-index: 1;">
                </div>
                <div class="fade-up">
                    <div class="section-label">WHO WE ARE</div>
                    <h2 class="section-heading" style="margin-bottom: 20px;">Accurate Data.<br>Reliable Results.</h2>
                    <p style="color: var(--text-muted); line-height: 1.7; margin-bottom: 30px; font-size: 1.05rem;">Reliable Land Survey Consultancy provides professional surveying and geospatial solutions for construction, infrastructure, land development and engineering projects. We combine experienced field practices with modern surveying technology to deliver accurate and dependable survey data.</p>
                    <a href="services.html" class="btn btn-primary" style="border-radius: 4px;">Our Services &rarr;</a>
                </div>
            </div>
        </div>
    </section>

    <!-- 3. OUR EXPERTISE -->
    <section class="section" style="padding: 90px 20px; background-color: #f8f9fa; position: relative; overflow: hidden;">
        <!-- Topo Background -->
        <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0.04; background-image: url('assets/images/map-bg.png'); background-size: cover; background-position: center; pointer-events: none;"></div>
        
        <div class="container" style="position: relative; z-index: 1;">
            <div style="text-align: center; margin-bottom: 60px;" class="fade-up">
                <div class="section-label">OUR EXPERTISE</div>
                <h2 class="section-heading">Core Strengths</h2>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 30px;">
                <!-- Card 1 -->
                <div class="fade-up" style="background: #ffffff; padding: 40px 30px; border-radius: 6px; box-shadow: 0 4px 15px rgba(0,0,0,0.03); border-top: 3px solid var(--accent-orange); transition: transform 0.3s ease, box-shadow 0.3s ease;" onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 10px 25px rgba(0,0,0,0.08)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(0,0,0,0.03)'">
                    <div style="color: var(--primary-navy); font-weight: 700; font-size: 0.85rem; margin-bottom: 15px; letter-spacing: 1px;">01 &mdash; PRECISION</div>
                    <h3 style="color: var(--dark-navy); font-size: 1.25rem; margin-bottom: 15px;">Accurate Measurements</h3>
                    <p style="color: var(--text-muted); line-height: 1.6; font-size: 0.95rem;">Accurate measurements and dependable survey data for critical engineering and design.</p>
                </div>
                
                <!-- Card 2 -->
                <div class="fade-up" style="background: #ffffff; padding: 40px 30px; border-radius: 6px; box-shadow: 0 4px 15px rgba(0,0,0,0.03); border-top: 3px solid var(--primary-navy); transition: transform 0.3s ease, box-shadow 0.3s ease; animation-delay: 0.1s;" onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 10px 25px rgba(0,0,0,0.08)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(0,0,0,0.03)'">
                    <div style="color: var(--accent-orange); font-weight: 700; font-size: 0.85rem; margin-bottom: 15px; letter-spacing: 1px;">02 &mdash; TECHNOLOGY</div>
                    <h3 style="color: var(--dark-navy); font-size: 1.25rem; margin-bottom: 15px;">Modern Equipment</h3>
                    <p style="color: var(--text-muted); line-height: 1.6; font-size: 0.95rem;">Modern surveying equipment and efficient field techniques for fast, reliable spatial mapping.</p>
                </div>
                
                <!-- Card 3 -->
                <div class="fade-up" style="background: #ffffff; padding: 40px 30px; border-radius: 6px; box-shadow: 0 4px 15px rgba(0,0,0,0.03); border-top: 3px solid var(--light-blue); transition: transform 0.3s ease, box-shadow 0.3s ease; animation-delay: 0.2s;" onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 10px 25px rgba(0,0,0,0.08)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 15px rgba(0,0,0,0.03)'">
                    <div style="color: var(--primary-navy); font-weight: 700; font-size: 0.85rem; margin-bottom: 15px; letter-spacing: 1px;">03 &mdash; RELIABILITY</div>
                    <h3 style="color: var(--dark-navy); font-size: 1.25rem; margin-bottom: 15px;">Professional Service</h3>
                    <p style="color: var(--text-muted); line-height: 1.6; font-size: 0.95rem;">Professional service and timely project delivery ensuring your projects stay strictly on schedule.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- 4. MISSION / CLOSING -->
    <section class="section" style="padding: 100px 20px; background: linear-gradient(135deg, var(--dark-navy) 0%, var(--primary-navy) 100%); text-align: center; position: relative; overflow: hidden;">
        <!-- decorative grid -->
        <div style="position: absolute; right: 0; bottom: 0; width: 200px; height: 200px; background-image: radial-gradient(rgba(255,255,255,0.2) 1.5px, transparent 1.5px); background-size: 20px 20px; opacity: 0.5;"></div>
        <div style="position: absolute; left: 0; top: 0; width: 200px; height: 200px; background-image: radial-gradient(rgba(255,255,255,0.2) 1.5px, transparent 1.5px); background-size: 20px 20px; opacity: 0.5;"></div>
        
        <div class="container fade-up" style="position: relative; z-index: 1; max-width: 800px; margin: 0 auto;">
            <h2 style="color: #ffffff; font-size: clamp(2rem, 5vw, 2.8rem); margin-bottom: 25px; line-height: 1.2;">Built on Precision.<br>Driven by Accuracy.</h2>
            <p style="color: rgba(255,255,255,0.85); font-size: 1.1rem; line-height: 1.7; margin-bottom: 40px; max-width: 650px; margin-left: auto; margin-right: auto;">Our goal is to provide dependable surveying solutions that help clients make confident decisions and execute projects with accurate spatial information.</p>
            <a href="contact.html" class="btn btn-primary" style="background: var(--accent-orange); color: #fff; padding: 14px 32px; font-weight: 600; border-radius: 4px; box-shadow: 0 8px 20px rgba(244,123,32,0.3);">Get in Touch &rarr;</a>
        </div>
    </section>
'''

# Find everything between <div class="hero-content-exact" and <footer class="footer">
pattern = re.compile(r'      <div class="hero-content-exact"[\s\S]*?(?=<footer class="footer">)')
new_content = pattern.sub(new_html, content)

with open('e:/MindAxis_Web/Reliable_Website/about.html', 'w', encoding='utf-8') as f:
    f.write(new_content)

print('Success')
