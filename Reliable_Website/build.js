const fs = require('fs');

const content = fs.readFileSync('index.html', 'utf8');

function updatePage(filename, sectionsToKeep, activeNav) {
    let headerMatch = content.match(/(.*?<nav[^>]*>.*?<\/nav>)/s);
    if (!headerMatch) return;
    let headerHtml = headerMatch[1];

    headerHtml = headerHtml.replace(/class="active"/g, '');
    if (activeNav === 'about') headerHtml = headerHtml.replace('href="about.html"', 'href="about.html" class="active"');
    else if (activeNav === 'services') headerHtml = headerHtml.replace('href="services.html"', 'href="services.html" class="active"');
    else if (activeNav === 'gallery') headerHtml = headerHtml.replace('href="gallery.html"', 'href="gallery.html" class="active"');
    else if (activeNav === 'contact') headerHtml = headerHtml.replace('href="contact.html"', 'href="contact.html" class="active"');

    // Replace the videos with an image, and set the height to 400px
    headerHtml = headerHtml.replace(/<video.*?<\/video>/gs, '');
    headerHtml = headerHtml.replace('<div class="hero-exact">', '<div class="hero-exact" style="height: 400px;">\n      <img src="assets/images/Our-process-bg.png" style="position: absolute; width: 100%; height: 100%; object-fit: cover; z-index: -1;">\n      <div style="position: absolute; top:0; left:0; width:100%; height:100%; background: linear-gradient(rgba(18,47,85,0.7), rgba(18,47,85,0.7)); z-index: -1;"></div>');

    const titles = {
        'about': 'About Us',
        'services': 'Our Services',
        'gallery': 'Project Gallery',
        'contact': 'Contact Us'
    };

    headerHtml += `
      <div class="hero-content-exact" style="margin-top: 120px; padding-bottom: 80px; text-align: center;">
        <h1 class="hero-title-exact anim-title" style="font-size: 56px; color: #fff; width: 100%; display: block;">${titles[activeNav]}</h1>
      </div>
    </div>
`;

    let footerMatch = content.match(/(<footer class="footer">.*)/s);
    let footerHtml = footerMatch ? footerMatch[1] : '';

    let newContent = headerHtml;

    for (let secId of sectionsToKeep) {
        let regex = new RegExp(`(<section[^>]*(?:id|class)="[^"]*\\b${secId}\\b[^"]*"[^>]*>.*?)</section>`, 's');
        let match = content.match(regex);
        if (match) {
            newContent += match[1] + '</section>\n\n';
        }
    }

    if (activeNav === 'gallery') {
        newContent += `
        <section class="section" style="padding: 100px 0; background: var(--bg-soft);">
            <div class="container">
                <div class="text-center" style="margin-bottom: 50px;">
                    <h2 class="section-heading">Project Highlights</h2>
                </div>
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 20px;">
                    <img src="assets/images/highway.jpg" style="width: 100%; height: 250px; object-fit: cover; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                    <img src="assets/images/metro.jpg" style="width: 100%; height: 250px; object-fit: cover; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                    <img src="assets/images/railway.jpg" style="width: 100%; height: 250px; object-fit: cover; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                    <img src="assets/images/drone.jpg" style="width: 100%; height: 250px; object-fit: cover; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                    <img src="assets/images/lidar.jpg" style="width: 100%; height: 250px; object-fit: cover; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                    <img src="assets/images/Our-process-bg.png" style="width: 100%; height: 250px; object-fit: cover; border-radius: 12px; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                </div>
            </div>
        </section>
        `;
    } else if (activeNav === 'contact') {
        newContent += `
        <section class="section" style="padding: 100px 0; background-color: var(--bg-white);">
            <div class="container">
                <div class="text-center" style="margin-bottom: 50px;">
                    <h2 class="section-heading">Get In Touch</h2>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 50px;">
                    <div style="background: #fff; padding: 40px; border-radius: 12px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); border: 1px solid #eee;">
                        <h3 style="font-size: 24px; margin-bottom: 20px; color: var(--primary-navy);">Send us a Message</h3>
                        <form style="display: flex; flex-direction: column; gap: 20px;">
                            <input type="text" placeholder="Your Name" style="padding: 15px; border: 1px solid #ccc; border-radius: 8px; outline: none; font-family: inherit;">
                            <input type="email" placeholder="Your Email" style="padding: 15px; border: 1px solid #ccc; border-radius: 8px; outline: none; font-family: inherit;">
                            <input type="text" placeholder="Subject" style="padding: 15px; border: 1px solid #ccc; border-radius: 8px; outline: none; font-family: inherit;">
                            <textarea placeholder="Message" rows="5" style="padding: 15px; border: 1px solid #ccc; border-radius: 8px; outline: none; font-family: inherit; resize: vertical;"></textarea>
                            <button type="button" class="btn" style="background: var(--accent-orange); color: #fff; border: none; padding: 15px; border-radius: 8px; cursor: pointer; font-weight: bold;">Send Message</button>
                        </form>
                    </div>
                    <div style="padding-top: 20px;">
                        <h3 style="font-size: 24px; margin-bottom: 30px; color: var(--primary-navy);">Contact Details</h3>
                        <div style="display: flex; flex-direction: column; gap: 30px;">
                            <div style="display: flex; gap: 20px; align-items: flex-start;">
                                <div style="background: var(--accent-orange); color: #fff; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                                </div>
                                <div>
                                    <h4 style="font-size: 18px; margin-bottom: 5px; color: var(--primary-navy);">Phone</h4>
                                    <p style="color: var(--text-body); font-size: 16px;">+91 98765 43210</p>
                                </div>
                            </div>
                            <div style="display: flex; gap: 20px; align-items: flex-start;">
                                <div style="background: var(--accent-orange); color: #fff; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                                </div>
                                <div>
                                    <h4 style="font-size: 18px; margin-bottom: 5px; color: var(--primary-navy);">Email</h4>
                                    <p style="color: var(--text-body); font-size: 16px;">info@reliablelandsurvey.com</p>
                                </div>
                            </div>
                            <div style="display: flex; gap: 20px; align-items: flex-start;">
                                <div style="background: var(--accent-orange); color: #fff; width: 50px; height: 50px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                                </div>
                                <div>
                                    <h4 style="font-size: 18px; margin-bottom: 5px; color: var(--primary-navy);">Address</h4>
                                    <p style="color: var(--text-body); font-size: 16px;">Pune, Maharashtra, India<br>Pan-Maharashtra & Pan-India Operations</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        `;
    }

    newContent += footerHtml;
    fs.writeFileSync(filename, newContent);
}

updatePage('about.html', ['about', 'counter-section', 'why-flip-section'], 'about');
updatePage('services.html', ['expertise-section', 'process-section', 'technology', 'deliverables-section'], 'services');
updatePage('gallery.html', [], 'gallery');
updatePage('contact.html', [], 'contact');

console.log("Done");
