import puppeteer from 'file:///e:/MindAxis/Samarth_Ayurveda/node_modules/puppeteer-core/lib/puppeteer/puppeteer-core.js';
import path from 'path';
import fs from 'fs';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const ARTIFACT_DIR = 'C:\\Users\\HP\\.gemini\\antigravity-ide\\brain\\f933a7cf-56f8-4efb-b433-1ef6270f3c16';

async function verifyAll() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  const results = {};

  // 1. DESKTOP VIEW
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:5173/#home', { waitUntil: 'networkidle2' });

  // Check 1, 19, 20, 21, 28: Subheader
  const subheader = await page.evaluate(() => {
    const el = document.getElementById('siteSubheader');
    if (!el) return null;
    const phone = el.querySelector('a[href^="tel:"]');
    const email = el.querySelector('a[href^="mailto:"]');
    const socials = Array.from(el.querySelectorAll('.subheader-social-link')).map(a => ({
      href: a.href,
      target: a.getAttribute('target')
    }));
    const badge = el.querySelector('.subheader-highlight-badge')?.innerText;
    return {
      exists: true,
      phone: phone ? phone.getAttribute('href') : null,
      email: email ? email.getAttribute('href') : null,
      socials,
      badge
    };
  });
  results.subheader = subheader;

  // Check 2, 22, 23, 24: Navbar & Get a Quote button
  const navbar = await page.evaluate(() => {
    const header = document.getElementById('siteHeader');
    const logo = header?.querySelector('.logo-brand');
    const links = Array.from(header?.querySelectorAll('.desktop-nav .nav-link') || []).map(a => ({
      text: a.innerText.trim(),
      href: a.getAttribute('href')
    }));
    const quoteBtn = document.getElementById('navGetQuoteBtn');
    const megaMenu = document.getElementById('productsMegaMenu');
    return {
      hasLogo: !!logo,
      logoText: logo?.innerText.trim(),
      links,
      quoteBtnText: quoteBtn?.innerText.trim(),
      hasMegaMenu: !!megaMenu
    };
  });
  results.navbar = navbar;

  // Check 5: Floating Icons (WhatsApp, Call, Scroll-to-Top)
  const floatingIcons = await page.evaluate(() => {
    const group = document.getElementById('floatingActionGroup');
    const wa = group?.querySelector('.floating-btn-whatsapp');
    const call = group?.querySelector('.floating-btn-call');
    const top = group?.querySelector('#scrollTopBtn');
    return {
      groupVisible: !!group,
      waLink: wa?.getAttribute('href'),
      waTarget: wa?.getAttribute('target'),
      callLink: call?.getAttribute('href'),
      topExists: !!top
    };
  });
  results.floatingIcons = floatingIcons;

  // Check 6: Screen Loader (Should NOT exist or block page)
  const screenLoader = await page.evaluate(() => {
    const blockingLoaders = document.querySelectorAll('.screen-loader, .page-loader, .loading-overlay');
    return { count: blockingLoaders.length };
  });
  results.screenLoader = screenLoader;

  // Check 7: Hero Section (Home) - Centered H1, other data visible, NO button in hero, NO video, image slider
  const heroSection = await page.evaluate(() => {
    const hero = document.getElementById('heroSlideshow');
    const h1 = hero?.querySelector('.hero-center-h1');
    const badge = hero?.querySelector('.hero-center-badge');
    const tags = Array.from(hero?.querySelectorAll('.hero-pill-tag') || []).map(t => t.innerText.trim());
    const buttonsInHero = hero?.querySelectorAll('button');
    const videoInHero = hero?.querySelectorAll('video');
    const slides = hero?.querySelectorAll('.hero-slide');
    return {
      heroExists: !!hero,
      h1Text: h1?.innerText.trim(),
      badgeText: badge?.innerText.trim(),
      tags,
      buttonCount: buttonsInHero ? buttonsInHero.length : 0,
      videoCount: videoInHero ? videoInHero.length : 0,
      slideCount: slides ? slides.length : 0
    };
  });
  results.heroSection = heroSection;

  // Take screenshot of Desktop Home Header & Hero
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'qa_desktop_home_header_hero.png'),
    clip: { x: 0, y: 0, width: 1440, height: 850 }
  });

  // Check 4, 12, 16, 28: Footer
  const footer = await page.evaluate(() => {
    const root = document.getElementById('siteFooterRoot');
    const footerEl = root?.querySelector('.site-footer');
    const googleBadge = footerEl?.querySelector('.footer-google-review-btn');
    const centeredBottom = footerEl?.querySelector('.footer-bottom-bar-centered');
    const links = Array.from(footerEl?.querySelectorAll('a') || []).map(a => ({
      text: a.innerText.trim(),
      href: a.getAttribute('href'),
      target: a.getAttribute('target')
    }));
    return {
      footerExists: !!footerEl,
      hasGoogleReviewBadge: !!googleBadge,
      googleReviewText: googleBadge?.innerText.trim(),
      bottomCenteredText: centeredBottom?.innerText.trim(),
      totalLinks: links.length,
      socialLinksNewTab: links.filter(l => l.href && (l.href.includes('facebook') || l.href.includes('instagram'))).every(l => l.target === '_blank')
    };
  });
  results.footer = footer;

  // Scroll to footer and take screenshot
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'qa_desktop_footer.png')
  });

  // Check 8 & 9: ABOUT PAGE (#about)
  await page.goto('http://localhost:5173/#about', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 500));
  const aboutPage = await page.evaluate(() => {
    const company = document.querySelector('.about-company-section');
    const purpose = document.querySelector('.our-purpose-section');
    const vision = purpose?.querySelector('.vision-card .purpose-card-title')?.innerText.trim();
    const mission = purpose?.querySelector('.mission-card .purpose-card-title')?.innerText.trim();
    const clients = document.querySelector('.our-clients-section');
    const stats = Array.from(clients?.querySelectorAll('.client-stat-num') || []).map(el => el.innerText.trim());
    const reviewCards = clients?.querySelectorAll('.client-review-card')?.length || 0;
    return {
      companySection: !!company,
      purposeSection: !!purpose,
      vision,
      mission,
      clientsSection: !!clients,
      stats,
      reviewCards
    };
  });
  results.aboutPage = aboutPage;

  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'qa_about_page_top.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });

  await page.evaluate(() => window.scrollTo(0, 1000));
  await new Promise(r => setTimeout(r, 500));
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'qa_about_page_purpose_clients.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });

  // Check 10 & 26: PRODUCT PAGE (#products)
  await page.goto('http://localhost:5173/#products', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 500));
  const productPage = await page.evaluate(() => {
    const cards = document.querySelectorAll('.product-card');
    const enquiryButtons = document.querySelectorAll('.product-enquiry-btn');
    const allButtons = Array.from(document.querySelectorAll('button'));
    const viewNowButtons = allButtons.filter(b => b.innerText.toLowerCase().includes('view now'));
    return {
      cardCount: cards.length,
      enquiryButtonCount: enquiryButtons.length,
      sampleBtnText: enquiryButtons[0]?.innerText.trim(),
      viewNowCount: viewNowButtons.length
    };
  });
  results.productPage = productPage;

  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'qa_products_page.png'),
    clip: { x: 0, y: 0, width: 1440, height: 900 }
  });

  // Check 11, 13, 27: CONTACT PAGE (#contact)
  await page.goto('http://localhost:5173/#contact', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 500));
  const contactPage = await page.evaluate(() => {
    const form = document.getElementById('contactForm');
    const name = form?.querySelector('#contactFullName');
    const email = form?.querySelector('#contactEmail');
    const phone = form?.querySelector('#contactPhone');
    const address = form?.querySelector('#contactAddress');
    const subject = form?.querySelector('#contactSubject');
    const message = form?.querySelector('#contactMessage');
    const captchaHeader = form?.querySelector('.captcha-header-label')?.innerText.trim();
    const captchaCode = form?.querySelector('#contactCaptchaDisplay')?.innerText.trim();
    const captchaInput = form?.querySelector('#contactCaptchaInput');
    const refreshBtn = form?.querySelector('#contactCaptchaRefreshBtn');
    const recaptchaWidget = form?.querySelector('#contactRecaptchaWidget');
    const mapIframe = document.querySelector('.contact-map-section iframe');
    const companyTitle = document.querySelector('.contact-info-heading')?.innerText.trim();
    return {
      formExists: !!form,
      companyTitle,
      hasName: !!name && name.hasAttribute('required'),
      hasEmail: !!email && email.hasAttribute('required'),
      hasPhone: !!phone && phone.hasAttribute('required'),
      hasAddress: !!address && address.hasAttribute('required'),
      hasSubject: !!subject && subject.hasAttribute('required'),
      hasMessage: !!message && message.hasAttribute('required'),
      captchaHeader,
      hasCaptchaCode: !!captchaCode,
      hasCaptchaInput: !!captchaInput && captchaInput.hasAttribute('required'),
      hasRefreshBtn: !!refreshBtn,
      hasRecaptcha: !!recaptchaWidget,
      hasMap: !!mapIframe
    };
  });
  results.contactPage = contactPage;

  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'qa_contact_page.png'),
    clip: { x: 0, y: 0, width: 1440, height: 950 }
  });

  // Check 17: WRONG URL ROUTING FALLBACK
  await page.goto('http://localhost:5173/#nonexistent-broken-url-test', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 400));
  const wrongUrlHash = await page.evaluate(() => window.location.hash);
  results.wrongUrlRouting = {
    redirectedTo: wrongUrlHash,
    isHomeFallback: wrongUrlHash === '#home' || wrongUrlHash === ''
  };

  // Check 2: "Get a Quote" modal trigger
  await page.goto('http://localhost:5173/#home', { waitUntil: 'networkidle2' });
  await page.click('#navGetQuoteBtn');
  await new Promise(r => setTimeout(r, 400));
  const quoteModal = await page.evaluate(() => {
    const modal = document.getElementById('enquiryModal');
    const isVisible = modal && window.getComputedStyle(modal).display !== 'none';
    const title = modal?.querySelector('#enquiryModalTitle')?.innerText.trim();
    const captchaQuestion = modal?.querySelector('#enquiryCaptchaQuestion')?.innerText.trim();
    return {
      isVisible,
      title,
      captchaQuestion
    };
  });
  results.quoteModal = quoteModal;

  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'qa_get_a_quote_modal.png')
  });

  // Check 3: Mobile Viewport (390 x 844)
  await page.setViewport({ width: 390, height: 844 });
  await page.goto('http://localhost:5173/#home', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'qa_mobile_home.png')
  });

  // Check Tablet Viewport (768 x 1024)
  await page.setViewport({ width: 768, height: 1024 });
  await page.goto('http://localhost:5173/#home', { waitUntil: 'networkidle2' });
  await new Promise(r => setTimeout(r, 400));
  await page.screenshot({
    path: path.join(ARTIFACT_DIR, 'qa_tablet_home.png')
  });

  await browser.close();

  fs.writeFileSync(
    path.join(ARTIFACT_DIR, 'qa_verification_results.json'),
    JSON.stringify(results, null, 2)
  );

  console.log('QA Verification Completed Successfully!');
  console.log(JSON.stringify(results, null, 2));
}

verifyAll().catch(err => {
  console.error('QA Verification Error:', err);
  process.exit(1);
});
