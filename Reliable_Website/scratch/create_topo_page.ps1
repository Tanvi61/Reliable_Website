$content = Get-Content -Path 'e:\MindAxis_Web\Reliable_Website\about.html' -Raw

# Replace everything from the end of the <nav> block down to the <footer> block
$pattern = '(?s)(</nav>).*?(<footer class="footer">)'

$newContent = '
    <!-- ==========================================
       BREADCRUMB / HERO
    ========================================== -->
    <div style="background-color: var(--dark-navy); padding: 40px 0; margin-top: 80px; text-align: center;">
        <h1 style="color: #fff; font-size: 2.5rem; margin-bottom: 10px;">Topographical Survey In Pune</h1>
        <p style="color: #a9b9c9; font-size: 1rem;"><a href="index.html" style="color: var(--accent-orange); text-decoration: none;">Home</a> &raquo; <a href="services.html" style="color: var(--accent-orange); text-decoration: none;">Services</a> &raquo; Topographical Survey</p>
    </div>

    <!-- ==========================================
       PRODUCT DETAIL SECTION
    ========================================== -->
    <section class="section" style="padding: 60px 0; background-color: #f8f9fa;">
        <div class="container">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px; align-items: flex-start; background: #fff; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); padding: 40px;">
                
                <!-- Left: Image & Button -->
                <div>
                    <img src="assets/images/about.jpg" alt="Topographical Survey" style="width: 100%; border-radius: 8px; box-shadow: 0 5px 15px rgba(0,0,0,0.1); margin-bottom: 20px;">
                    <a href="contact.html" class="btn btn-primary" style="display: block; width: 100%; text-align: center; font-size: 1.1rem; padding: 15px; border-radius: 8px;">Get a Quote &rarr;</a>
                </div>

                <!-- Right: Specs Table -->
                <div>
                    <h2 style="color: var(--dark-navy); font-size: 2rem; margin-bottom: 20px;">Topographical Survey In Pune</h2>
                    
                    <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px; font-size: 0.95rem;">
                        <tr style="border-bottom: 1px solid #eee;">
                            <td style="padding: 12px 0; font-weight: bold; color: #555;">SERVICE TYPE</td>
                            <td style="padding: 12px 0; text-align: right; font-weight: bold; color: var(--dark-navy);">Topographical Survey</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #eee;">
                            <td style="padding: 12px 0; font-weight: bold; color: #555;">EQUIPMENT USED</td>
                            <td style="padding: 12px 0; text-align: right; font-weight: bold; color: var(--dark-navy);">DGPS, Total Station, Drone</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #eee;">
                            <td style="padding: 12px 0; font-weight: bold; color: #555;">DELIVERABLES</td>
                            <td style="padding: 12px 0; text-align: right; font-weight: bold; color: var(--dark-navy);">Contour Maps, CAD Data</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #eee;">
                            <td style="padding: 12px 0; font-weight: bold; color: #555;">APPLICATIONS</td>
                            <td style="padding: 12px 0; text-align: right; font-weight: bold; color: var(--dark-navy);">Planning, Engineering, Design</td>
                        </tr>
                        <tr style="border-bottom: 1px solid #eee;">
                            <td style="padding: 12px 0; font-weight: bold; color: #555;">LOCATION</td>
                            <td style="padding: 12px 0; text-align: right; font-weight: bold; color: var(--dark-navy);">Pune, Maharashtra</td>
                        </tr>
                    </table>

                    <div style="text-align: center;">
                        <h4 style="color: var(--dark-navy); margin-bottom: 10px;">Service Description</h4>
                        <p style="color: var(--primary-navy); line-height: 1.6;">Reliable Land Survey Consultancy is a Trusted Topographical Survey Provider In Pune. We deliver highly accurate mapping of natural and man-made features essential for preliminary design and detailed engineering.</p>
                    </div>
                </div>

            </div>
        </div>
    </section>

    <!-- ==========================================
       FAQ SECTION
    ========================================== -->
    <style>
        .faq-item {
            border: 1px solid #eee;
            border-radius: 8px;
            margin-bottom: 15px;
            background: #fff;
            overflow: hidden;
        }
        .faq-question {
            padding: 20px;
            font-weight: 700;
            color: var(--dark-navy);
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: #f8f9fa;
            transition: background 0.3s;
        }
        .faq-question:hover {
            background-color: #f1f3f5;
        }
        .faq-answer {
            padding: 0 20px;
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease-out, padding 0.3s ease;
            color: var(--primary-navy);
            line-height: 1.6;
        }
        .faq-item.active .faq-answer {
            padding: 20px;
            max-height: 500px;
            border-top: 1px solid #eee;
        }
        .faq-item.active .faq-icon {
            transform: rotate(45deg);
        }
        .faq-icon {
            transition: transform 0.3s ease;
            color: var(--accent-orange);
            font-size: 1.5rem;
            line-height: 1;
        }
    </style>
    <section class="section" style="padding: 60px 0; background-color: #fff;">
        <div class="container">
            <h2 class="section-heading" style="text-align: center; margin-bottom: 40px;">Frequently Asked Questions</h2>
            
            <div style="max-width: 800px; margin: 0 auto;">
                
                <div class="faq-item">
                    <div class="faq-question" onclick="this.parentElement.classList.toggle(''active'')">
                        1. What is a topographical survey?
                        <span class="faq-icon">+</span>
                    </div>
                    <div class="faq-answer">A detailed survey that maps ground levels, contours, natural features, structures, roads, drainage and other site features.</div>
                </div>

                <div class="faq-item">
                    <div class="faq-question" onclick="this.parentElement.classList.toggle(''active'')">
                        2. Why do I need a topographical survey?
                        <span class="faq-icon">+</span>
                    </div>
                    <div class="faq-answer">It provides accurate existing-site information needed for planning, design, engineering and construction.</div>
                </div>

                <div class="faq-item">
                    <div class="faq-question" onclick="this.parentElement.classList.toggle(''active'')">
                        3. What information do you need to start the survey?
                        <span class="faq-icon">+</span>
                    </div>
                    <div class="faq-answer">We need the project location, survey area, project requirements and any available drawings or reference documents.</div>
                </div>

                <div class="faq-item">
                    <div class="faq-question" onclick="this.parentElement.classList.toggle(''active'')">
                        4. What equipment do you use?
                        <span class="faq-icon">+</span>
                    </div>
                    <div class="faq-answer">Depending on the project, we use DGPS/GNSS, Total Station, Digital Levels, RTK Drone and LiDAR-based surveying methods.</div>
                </div>

                <div class="faq-item">
                    <div class="faq-question" onclick="this.parentElement.classList.toggle(''active'')">
                        5. What deliverables will I receive?
                        <span class="faq-icon">+</span>
                    </div>
                    <div class="faq-answer">Depending on the scope, deliverables can include topographical plans, contours, spot levels, L-sections, cross-sections, CAD/GIS data and DEM/DTM.</div>
                </div>

                <div class="faq-item">
                    <div class="faq-question" onclick="this.parentElement.classList.toggle(''active'')">
                        6. How do you ensure survey accuracy?
                        <span class="faq-icon">+</span>
                    </div>
                    <div class="faq-answer">We use reliable control points, field verification, coordinate and level cross-checks, independent checking and technical review.</div>
                </div>

                <div class="faq-item">
                    <div class="faq-question" onclick="this.parentElement.classList.toggle(''active'')">
                        7. How can I request a topographical survey?
                        <span class="faq-icon">+</span>
                    </div>
                    <div class="faq-answer">Submit your project details through the Request Survey form, including the location, survey requirement and available project information.</div>
                </div>

            </div>
        </div>
    </section>

'

$result = [regex]::Replace($content, $pattern, "`$1`n$newContent`n`$2")
Set-Content -Path 'e:\MindAxis_Web\Reliable_Website\topographical-survey.html' -Value $result
