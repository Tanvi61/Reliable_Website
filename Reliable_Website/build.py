import re

def update_page(filename, sections_to_keep, active_nav):
    with open('index.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract header: Everything up to <div class="hero-content-exact">
    header_match = re.search(r'(.*?<nav[^>]*>.*?</nav>)', content, re.DOTALL)
    header_html = header_match.group(1)

    # Adjust active class in header
    header_html = header_html.replace('class="active"', '')
    if active_nav == 'about':
        header_html = header_html.replace('href="about.html"', 'href="about.html" class="active"')
    elif active_nav == 'services':
        header_html = header_html.replace('href="services.html"', 'href="services.html" class="active"')
    elif active_nav == 'gallery':
        header_html = header_html.replace('href="gallery.html"', 'href="gallery.html" class="active"')
    elif active_nav == 'contact':
        header_html = header_html.replace('href="contact.html"', 'href="contact.html" class="active"')

    # Small hero section for internal pages
    title = {
        'about': 'About Us',
        'services': 'Our Services',
        'gallery': 'Project Gallery',
        'contact': 'Contact Us'
    }.get(active_nav, '')

    header_html += f'''
      <div class="hero-content-exact" style="margin-top: 100px; padding-bottom: 80px; text-align: center;">
        <h1 class="hero-title-exact anim-title" style="font-size: 56px; color: #fff;">{title}</h1>
      </div>
    </div>
'''

    # Extract footer
    footer_match = re.search(r'(<footer class="footer">.*)', content, re.DOTALL)
    footer_html = footer_match.group(1)

    # Build content
    new_content = header_html
    
    # We will use simple regex to extract sections by id or class
    for sec_id in sections_to_keep:
        # regex to match <section id="sec_id" ...> ... </section>
        # or <section class="sec_id" ...> ... </section>
        pattern = f'(<section[^>]*(?:id|class)="[^"]*\\b{sec_id}\\b[^"]*"[^>]*>.*?</section>)'
        match = re.search(pattern, content, re.DOTALL)
        if match:
            new_content += match.group(1) + '\n\n'

    # Append custom content if needed
    if active_nav == 'gallery':
        new_content += '''
        <section class="section">
            <div class="container">
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px;">
                    <img src="assets/images/highway.jpg" style="width: 100%; height: 250px; object-fit: cover; border-radius: 12px;">
                    <img src="assets/images/metro.jpg" style="width: 100%; height: 250px; object-fit: cover; border-radius: 12px;">
                    <img src="assets/images/railway.jpg" style="width: 100%; height: 250px; object-fit: cover; border-radius: 12px;">
                    <img src="assets/images/drone.jpg" style="width: 100%; height: 250px; object-fit: cover; border-radius: 12px;">
                    <img src="assets/images/lidar.jpg" style="width: 100%; height: 250px; object-fit: cover; border-radius: 12px;">
                    <img src="assets/images/Our-process-bg.png" style="width: 100%; height: 250px; object-fit: cover; border-radius: 12px;">
                </div>
            </div>
        </section>
        '''
    elif active_nav == 'contact':
        new_content += '''
        <section class="section" style="background-color: var(--bg-soft);">
            <div class="container">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 50px;">
                    <div style="background: #fff; padding: 40px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
                        <h3 style="font-size: 24px; margin-bottom: 20px; color: var(--primary-navy);">Send us a Message</h3>
                        <form style="display: flex; flex-direction: column; gap: 20px;">
                            <input type="text" placeholder="Your Name" style="padding: 15px; border: 1px solid #ccc; border-radius: 8px;">
                            <input type="email" placeholder="Your Email" style="padding: 15px; border: 1px solid #ccc; border-radius: 8px;">
                            <textarea placeholder="Message" rows="5" style="padding: 15px; border: 1px solid #ccc; border-radius: 8px;"></textarea>
                            <button type="submit" class="btn" style="background: var(--accent-orange); color: #fff; border: none; padding: 15px;">Send Message</button>
                        </form>
                    </div>
                    <div>
                        <h3 style="font-size: 24px; margin-bottom: 20px; color: var(--primary-navy);">Contact Details</h3>
                        <div style="display: flex; flex-direction: column; gap: 20px;">
                            <p><strong>Phone:</strong> +91 98765 43210</p>
                            <p><strong>Email:</strong> info@reliablelandsurvey.com</p>
                            <p><strong>Address:</strong> Pune, Maharashtra, India</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        '''

    new_content += footer_html

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(new_content)

update_page('about.html', ['about', 'counter-section', 'why-flip-section'], 'about')
update_page('services.html', ['expertise-section', 'process-section', 'technology', 'deliverables-section'], 'services')
update_page('gallery.html', [], 'gallery')
update_page('contact.html', [], 'contact')

print("Done")
