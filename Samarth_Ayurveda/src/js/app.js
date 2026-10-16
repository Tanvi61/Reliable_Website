import { products } from '../data/products.js';
import { reviews } from '../data/reviews.js';
import { faqs } from '../data/faqs.js';
import { reels } from '../data/reels.js';
import { cart } from './cart.js';
import { initHeroSlideshow } from './slideshow.js';
import { initReels } from './reels.js';
import { initFAQ } from './faq.js';
import { initSearch } from './search.js';
import { renderProductDetail } from './pdp.js';
import { initOrderTracker } from './orderTracker.js';
import { initPolicyModal } from './policyModal.js';
import { initChatWidget } from './chat.js';
import { renderAccountView } from './account.js';
import { renderFooter } from './footer.js';

let currentCategory = 'All';
let currentSort = 'featured';
let currentView = 'home'; // 'home' | 'about' | 'products' | 'contact' | 'account' | 'pdp' | 'orders'
let currentProductId = 1;
let productSliderAutoTimer = null;
let currentGridView = 3;
let filterMinPrice = 0;
let filterMaxPrice = 1399;

export function initApp() {
  cart.render();
  renderFooter(document.getElementById('siteFooterRoot'));
  initEnquiryAndQuoteModal();
  initFloatingActionButtons();
  setupGlobalEvents();
  handleRouteFromHash();
  window.addEventListener('hashchange', handleRouteFromHash);
}

function handleRouteFromHash() {
  const hash = window.location.hash.replace(/^#\/?/, '').trim();
  if (!hash || hash === 'home') {
    navigateTo('home', null, false);
  } else if (hash === 'about' || hash === 'about-us' || hash === 'pages/about') {
    navigateTo('about', null, false);
  } else if (hash === 'products' || hash === 'collections/all' || hash === 'productsSection') {
    navigateTo('products', null, false);
  } else if (hash === 'contact' || hash === 'pages/contact') {
    navigateTo('contact', null, false);
  } else if (hash === 'account' || hash === 'login' || hash === 'signin' || hash === 'signup' || hash === 'my-account' || hash === 'pages/account') {
    navigateTo('account', null, false);
  } else if (hash === 'orders' || hash === 'pages/orders' || hash === 'my-orders' || hash === 'track-order') {
    navigateTo('orders', null, false);
  } else if (hash.startsWith('product/')) {
    const id = Number(hash.split('/')[1]);
    if (id) {
      navigateTo('pdp', id, false);
    } else {
      navigateTo('home', null, false);
    }
  } else {
    // QA Item 17: Verify after wrong url - page go to the home page
    navigateTo('home', null, true);
  }
}

export function navigateTo(route, productId = null, updateHash = true) {
  currentView = route;
  if (productId) currentProductId = productId;

  if (updateHash) {
    if (route === 'home') {
      window.location.hash = 'home';
    } else if (route === 'about') {
      window.location.hash = 'about';
    } else if (route === 'products') {
      window.location.hash = 'products';
    } else if (route === 'contact') {
      window.location.hash = 'contact';
    } else if (route === 'account') {
      window.location.hash = 'account';
    } else if (route === 'orders') {
      window.location.hash = 'orders';
    } else if (route === 'pdp' && productId) {
      window.location.hash = `product/${productId}`;
    }
  }

  // Update nav active classes
  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    const isMatch = link.dataset.route === route;
    link.classList.toggle('active', isMatch);
  });

  renderApp();
  closeMobileDrawer();
  closeEnquiryModal();
}

function renderApp() {
  const mainEl = document.getElementById('mainContent');
  if (!mainEl) return;

  if (currentView === 'orders') {
    document.body.classList.add('page-orders-active');
    renderOrdersView(mainEl);
  } else {
    document.body.classList.remove('page-orders-active');
    if (currentView === 'home') {
      renderHomeView(mainEl);
    } else if (currentView === 'about') {
      renderAboutView(mainEl);
    } else if (currentView === 'products') {
      renderProductsView(mainEl);
    } else if (currentView === 'contact') {
      renderContactView(mainEl);
    } else if (currentView === 'account') {
      renderAccountView(mainEl);
    } else if (currentView === 'pdp') {
      renderProductDetail(currentProductId, mainEl);
    }
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ========================================================
   RENDER HOMEPAGE
======================================================== */
function renderHomeView(mainEl) {
  mainEl.innerHTML = `
    <!-- 1. INSTAGRAM REEL STORIES -->
    <section class="reels-section">
      <div class="reels-container">
        <div class="reels-row">
          ${reels.map(r => `
            <button class="reel-item" data-index="${r.id}" type="button">
              <span class="reel-ring">
                <img class="reel-thumb" src="${r.thumb}" alt="${r.title}" loading="lazy" />
              </span>
              <span class="reel-title">${r.title}</span>
            </button>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- 2. HERO SLIDESHOW -->
    <section class="hero-slideshow-section" id="heroSlideshow">
      <div class="hero-slides-wrapper">
        <!-- Slide 1 -->
        <div class="hero-slide active">
          <picture>
            <source media="(max-width: 749px)" srcset="https://cdn.shopify.com/s/files/1/0601/8242/9745/files/Untitled_design_13.svg?v=1788326707" />
            <img src="https://cdn.shopify.com/s/files/1/0601/8242/9745/files/Untitled_design_62.png?v=1788326706" alt="Ayurveda Founder Award" loading="eager" />
          </picture>
        </div>

        <!-- Slide 2 -->
        <div class="hero-slide">
          <picture>
            <source media="(max-width: 749px)" srcset="https://cdn.shopify.com/s/files/1/0601/8242/9745/files/Sona_Herbal_Founder_Award_Template_-_Portrait_2.svg?v=1788326706" />
            <img src="https://cdn.shopify.com/s/files/1/0601/8242/9745/files/Sona_Herbal_Founder_Award_Template_-_Landscape_1400_x_788_px.png?v=1788326706" alt="Ayurveda Founder Award" loading="lazy" />
          </picture>
        </div>

        <!-- Slide 3 -->
        <div class="hero-slide">
          <picture>
            <source media="(max-width: 749px)" srcset="https://cdn.shopify.com/s/files/1/0601/8242/9745/files/ChatGPT_Image_Jul_9_2026_12_51_42_AM.png?v=1783538738" />
            <img src="https://cdn.shopify.com/s/files/1/0601/8242/9745/files/ChatGPT_Image_Jul_9_2026_12_01_08_AM.png?v=1783535534" alt="Ayurveda Range" loading="lazy" />
          </picture>
        </div>
      </div>

      <!-- Centered Hero Overlay (QA Item 7: Centered H1, other data visible, no button, no video, slider in background) -->
      <div class="hero-center-overlay">
        <span class="hero-center-badge">🌿 100% Homemade Ayurvedic Haircare</span>
        <h1 class="hero-center-h1">Pure Herbal Haircare From Village Roots</h1>
        <p class="hero-center-desc">Handcrafted by Sonali Waghmode with cold-pressed natural herbs &amp; Vedic recipes for thicker, healthier hair.</p>
        <div class="hero-center-tags">
          <span class="hero-pill-tag">✓ 100% Chemical-Free</span>
          <span class="hero-pill-tag">✓ Trusted by 2.5L+ Families</span>
          <span class="hero-pill-tag">✓ Original Ayurvedic Formulas</span>
        </div>
      </div>

      <!-- Slideshow Navigation Dots -->
      <div class="hero-dots-container">
        <span role="button" tabindex="0" class="hero-dot active" data-slide="0" aria-label="Slide 1"></span>
        <span role="button" tabindex="0" class="hero-dot" data-slide="1" aria-label="Slide 2"></span>
        <span role="button" tabindex="0" class="hero-dot" data-slide="2" aria-label="Slide 3"></span>
      </div>
    </section>

    <!-- 3. FEATURED COLLECTION / CURATED FOR YOU (Exact Reference Match) -->
    <section class="fc-clean" id="curatedSection">
      <div class="fc-shell">
        <div class="fc-header">
          <h2 class="fc-heading">Curated For You</h2>
          <a class="fc-viewall" href="#productsSection" id="homeViewAllBtn">View All</a>
        </div>

        <div class="fc-slider" id="homeProductsSlider">
          ${products.map(p => `
            <div class="fc-card" data-id="${p.id}">
              <a href="#product/${p.id}" class="fc-img-wrap" data-id="${p.id}">
                ${p.badge ? `<span class="fc-badge">${p.badge}</span>` : ''}
                <img src="${p.primaryImg}" alt="${p.title}" class="fc-img" loading="lazy" />
              </a>

              <div class="fc-info">
                <a href="#product/${p.id}" class="fc-title-product" data-id="${p.id}">
                  ${p.title}
                </a>

                <div class="fc-price-row">
                  <span class="fc-price">Rs. ${p.salePrice.toLocaleString()}.00</span>
                  ${p.regularPrice > p.salePrice ? `<span class="fc-compare">Rs. ${p.regularPrice.toLocaleString()}.00</span>` : ''}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- 3.5 BRAND TRUST TICKER RIBBON (Floating Green Line) -->
    <div class="sona-brand-ticker-ribbon" aria-label="Brand Trust Highlights">
      <div class="sona-brand-ticker-track">
        ${[...Array(4)].map(() => `
          <div class="sona-brand-ticker-item">
            <span class="ticker-text-normal">Trusted by 2.5L Customers</span>
            <span class="ticker-dot"></span>
            <span class="ticker-text-bold">100% Natural</span>
            <span class="ticker-dot"></span>
            <span class="ticker-text-normal">Original</span>
            <span class="ticker-dot"></span>
            <span class="ticker-text-bold">Official Ayurveda</span>
            <span class="ticker-dot"></span>
            <span class="ticker-text-normal">Authentic</span>
            <span class="ticker-dot"></span>
            <span class="ticker-text-bold">No Chemical Used</span>
            <span class="ticker-dot"></span>
          </div>
        `).join('')}
      </div>
    </div>

    <!-- 4. LUXURY 3D UNIVERSAL EXPERIENCE (Exact Reference Match) -->
    <section class="sona-luxury-3d-section" id="luxuryExperience">
      <div class="sona-luxury-bg"></div>
      <div class="sona-noise"></div>
      <div class="sona-orb sona-orb-1"></div>
      <div class="sona-orb sona-orb-2"></div>
      <div class="sona-orb sona-orb-3"></div>

      <div class="sona-luxury-container">
        <!-- Left Column: Heading, Description, Points with Star Signs, Buttons, Mini-Stats -->
        <div class="sona-copy" data-depth="0.08">
          <div class="sona-eyebrow">
            <span class="sona-eyebrow-dot"></span>
            Natural Herbal Haircare
          </div>

          <h2 class="sona-heading">
            Pure herbal care for
            <span>stronger, smoother &amp; healthier hair</span>
          </h2>

          <p class="sona-description">
            At Ayurveda, we bring together trusted herbal ingredients and thoughtful formulations to create haircare that feels natural, gentle, and effective. From herbal shampoo to nourishing hair oil and traditional mehandi care, every product is made to support healthy-looking hair with the goodness of nature.
          </p>

          <!-- Points Cards with 4-Point Sparkle Star Signs -->
          <div class="sona-points">
            <div class="sona-point">
              <div class="sona-point-icon">✦</div>
              <div class="sona-point-text">
                <strong>Herbal shampoo for everyday care</strong>
                <span>Helps cleanse the scalp gently while leaving hair feeling fresh, smooth, and manageable.</span>
              </div>
            </div>

            <div class="sona-point">
              <div class="sona-point-icon">✦</div>
              <div class="sona-point-text">
                <strong>Nourishing herbal hair oil</strong>
                <span>Crafted to support your regular haircare routine with a rich blend inspired by traditional care.</span>
              </div>
            </div>

            <div class="sona-point">
              <div class="sona-point-icon">✦</div>
              <div class="sona-point-text">
                <strong>Rooted in natural ingredients</strong>
                <span>Made for those who prefer herbal, nature-inspired haircare for everyday use.</span>
              </div>
            </div>
          </div>

          <!-- CTA Buttons Row -->
          <div class="sona-cta-row">
            <a href="#products" class="sona-btn sona-btn-primary" data-route="products">
              Shop Herbal Haircare
            </a>
            <a href="#founder" class="sona-btn sona-btn-secondary" id="btnKnowMoreAboutUs">
              Know More About Us
            </a>
          </div>

          <!-- Below 3 Mini-Stats / Feature Cards -->
          <div class="sona-mini-stats" role="tablist">
            <div class="sona-mini-stat is-active" data-feature="shampoo" role="tab" aria-selected="true" tabindex="0">
              <strong>Herbal Shampoo</strong>
              <span>Gentle cleansing with a natural care feel</span>
            </div>
            <div class="sona-mini-stat" data-feature="oil" role="tab" aria-selected="false" tabindex="0">
              <strong>Hair Oil</strong>
              <span>Nourishing care for your regular routine</span>
            </div>
            <div class="sona-mini-stat" data-feature="care" role="tab" aria-selected="false" tabindex="0">
              <strong>Natural Care</strong>
              <span>Inspired by trusted herbal traditions</span>
            </div>
          </div>
        </div>

        <!-- Right Column: 3D Interactive Stage with Images & Matching Floating Text Boxes -->
        <div class="sona-stage" id="sonaStage">
          <div class="sona-stage-glow"></div>
          <div class="sona-ring ring-a"></div>
          <div class="sona-ring ring-b"></div>

          <div class="sona-spotlight" id="sonaSpotlight" data-depth="0.10">
            <div class="sona-spotlight-shadow"></div>

            <div class="sona-main-visual" id="sonaMainVisual">
              <!-- Center Main Front Card: Hair Oil + Herbal Shampoo with Red Ribbon Bow -->
              <div class="sona-main-card front-card">
                <img src="https://cdn.shopify.com/s/files/1/0808/3944/2652/files/SN4.png?v=1774590149" alt="Ayurveda Home Made Hair Oil &amp; Herbal Shampoo" />
              </div>

              <!-- Left Side Card: Hair Oil on Golden Pedestal -->
              <div class="sona-side-card side-card-left">
                <img src="https://cdn.shopify.com/s/files/1/0808/3944/2652/files/Oil_edited.png?v=1774590337" alt="Ayurveda Home Made Hair Oil" />
              </div>

              <!-- Right Side Card: Herbal Shampoo with Botanicals -->
              <div class="sona-side-card side-card-right">
                <img src="https://cdn.shopify.com/s/files/1/0808/3944/2652/files/SN10.png?v=1774590040" alt="Ayurveda Herbal Shampoo" />
              </div>
            </div>

            <!-- Floating Top Left Box (Herbal Shampoo) -->
            <div class="sona-float-card ingredient-card ingredient-card-1" data-depth="0.24">
              <div class="sona-float-label">Herbal Shampoo</div>
              <p>Created for a fresh, clean wash experience with a soft, natural care feel.</p>
            </div>

            <!-- Floating Top Right Box (Hair Oil) -->
            <div class="sona-float-card ingredient-card ingredient-card-2" data-depth="0.20">
              <div class="sona-float-label">Hair Oil</div>
              <p>A nourishing step in your routine that complements regular herbal haircare.</p>
            </div>

            <!-- Floating Traditional Care Card (Overlapping mid-left of visual) -->
            <div class="sona-float-card ingredient-card-3" data-depth="0.26">
              <div class="sona-float-label">Traditional Care</div>
              <p>Inspired by time-trusted herbal hair rituals for everyday beauty and care.</p>
            </div>

            <!-- Floating Pill Chips -->
            <div class="sona-chip chip-1" data-depth="0.28">Herbal Haircare</div>
            <div class="sona-chip chip-2" data-depth="0.22">Naturally Inspired</div>
            <div class="sona-chip chip-3" data-depth="0.30">Shampoo • Oil • Mehandi</div>
          </div>

          <!-- Row of 3 Thumbnail Cards (Exact Reference Match) -->
          <div class="sona-gallery-strip">
            <div class="sona-gallery-card is-active" data-feature="care">
              <img src="https://cdn.shopify.com/s/files/1/0808/3944/2652/files/SN3.png?v=1774590337" alt="Ayurveda Big Combo Oil Shampoo Mehndi" loading="lazy" />
            </div>
            <div class="sona-gallery-card" data-feature="shampoo">
              <img src="https://cdn.shopify.com/s/files/1/0808/3944/2652/files/SN9.png?v=1774590040" alt="Ayurveda Herbal Shampoo with Coconut &amp; Amla" loading="lazy" />
            </div>
            <div class="sona-gallery-card" data-feature="oil">
              <img src="https://cdn.shopify.com/s/files/1/0808/3944/2652/files/SN10.png?v=1774590040" alt="Ayurveda Herbal Shampoo Botanicals" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 5. CUSTOMER LOVE / REVIEWS SECTION (Exact Reference Match) -->
    <section class="sona-reviews-section">
      <div class="sona-reviews-inner">
        <div class="sona-reviews-eyebrow">Customer Love</div>
        <h2 class="sona-reviews-title">Loved by Happy Customers</h2>
        <p class="sona-reviews-subtitle">Real reviews from customers who trusted Ayurveda for natural hair care.</p>
      </div>

      <div class="sona-reviews-marquee">
        <div class="sona-reviews-track">
          ${[...reviews, ...reviews].map(r => `
            <div class="sona-review-card">
              <div>
                <div class="sona-review-stars">★★★★★</div>
                <div class="sona-review-product">${r.product}</div>
                <p class="sona-review-text">${r.text}</p>
              </div>
              <div class="sona-review-user">
                <div class="sona-review-avatar">${r.avatar}</div>
                <div>
                  <p class="sona-review-name">${r.author}</p>
                  <p class="sona-review-city">${r.city}</p>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="sona-reviews-inner">
        <div class="sona-review-badges">
          <div class="sona-review-badge">★★★★★ Rated by Customers</div>
          <div class="sona-review-badge">Natural Hair Care</div>
          <div class="sona-review-badge">Fast Delivery</div>
          <div class="sona-review-badge">Trusted Herbal Products</div>
        </div>
      </div>
    </section>

    <!-- 6. FEATURED IN NEWS SECTION (Exact reference match) -->
    <section class="sona-news-feature">
      <div class="sona-news-wrap">
        <div class="sona-news-image">
          <img
            src="./images/sona-news-feature.jpg"
            alt="Ayurveda featured in newspaper"
            onerror="this.src='https://cdn.shopify.com/s/files/1/0601/8242/9745/files/SnapInsta.to_731702558_18000499061956624_3334212273510406262_n.jpg?v=1783541788'"
            loading="lazy"
          />
        </div>

        <div class="sona-news-content">
          <div class="sona-news-eyebrow">Featured in News</div>
          <h2>From a Small Village to Thousands of Homes</h2>
          <p>Ayurveda’s journey has been featured in the news for bringing homemade herbal hair care from Hirakani Sonali Waghmode to customers across India.</p>

          <div class="sona-news-points">
            <div class="sona-news-point">Founder-led homemade herbal brand</div>
            <div class="sona-news-point">Rooted in traditional hair care wisdom</div>
            <div class="sona-news-point">Trusted by thousands of happy customers</div>
          </div>

          <div>
            <div class="sona-news-badge">Recognised for Natural Hair Care</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 7. FREQUENTLY ASKED QUESTIONS -->
    <section class="faq-section" id="faqSection">
      <div class="faq-container">
        <div class="faq-header">
          <div class="faq-eyebrow">FAQs</div>
          <h2 class="faq-title">Frequently Asked Questions</h2>
          <p class="faq-subtitle">Everything you need to know about Ayurveda’s natural hair care products.</p>
        </div>

        <div class="faq-list">
          ${faqs.map((f, i) => `
            <div class="faq-item ${i === 0 ? 'active' : ''}">
              <button class="faq-question-btn" type="button">
                <span>${f.question}</span>
                <span class="faq-toggle-icon" aria-hidden="true">
                  <svg class="faq-icon-svg" viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" fill="none">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </span>
              </button>
              <div class="faq-answer-wrap">
                <div class="faq-answer-inner">${f.answer}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- 8. MEET OUR FOUNDER (Exact Reference Match) -->
    <section class="sona-founder" id="founderSection">
      <div class="sf-wrap">
        <div class="sf-image">
          <img
            src="https://cdn.shopify.com/s/files/1/0601/8242/9745/files/0Q7A2433.jpg_1_1.jpg?v=1783542548"
            alt="Sonali Waghmode Founder of Ayurveda"
            loading="lazy"
          />
          <div class="sf-badge">
            <span>Founder</span>
            Sonali Waghmode
          </div>
        </div>

        <div class="sf-content">
          <div class="sf-eyebrow">Meet Our Founder</div>
          <h2>Rooted in Tradition, Made with Care.</h2>
          <p>Ayurveda was started by Sonali Waghmode with a simple belief — hair care should be natural, honest and trusted by every family.</p>
          <p>Inspired by traditional herbal knowledge, every product is thoughtfully prepared to bring pure, effective and gentle hair care into Indian homes.</p>

          <div class="sf-quote">
            “Our goal is to make herbal hair care simple, trustworthy and accessible for every home.”
          </div>

          <div class="sf-name">
            <div>
              <div class="sf-sign">Sonali</div>
              <div class="sf-role">Founder, Ayurveda</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 9. OUR PROMISE & STATS (Exact Reference Match) -->
    <section class="sona-promise-white">
      <div class="spw-wrap">
        <div class="spw-head">
          <div class="spw-eyebrow">Our Promise</div>
          <h2>Pure Ingredients.<br>Honest Hair Care.</h2>
          <p>Every Ayurveda product is thoughtfully prepared using traditional herbal ingredients to nourish your hair naturally.</p>
        </div>

        <div class="spw-grid">
          <div class="spw-card">
            <div class="spw-icon">
              <svg viewBox="0 0 24 24"><path d="M5 21c8-1 14-7 15-18C10 4 4 10 3 20"/><path d="M4 20c4-5 8-8 14-11"/></svg>
            </div>
            <h3>100% Herbal</h3>
            <p>Prepared with carefully selected herbal ingredients inspired by traditional Indian hair care.</p>
          </div>

          <div class="spw-card">
            <div class="spw-icon">
              <svg viewBox="0 0 24 24"><path d="M9 2h6"/><path d="M10 2v6l-5 9a4 4 0 0 0 3.5 6h7a4 4 0 0 0 3.5-6l-5-9V2"/><path d="M7 16h10"/></svg>
            </div>
            <h3>No Harsh Chemicals</h3>
            <p>Gentle formulas made without unnecessary harsh chemicals for everyday family use.</p>
          </div>

          <div class="spw-card">
            <div class="spw-icon">
              <svg viewBox="0 0 24 24"><path d="M7 10h10"/><path d="M8 10l1 10h6l1-10"/><path d="M9 6a3 3 0 0 1 6 0v4"/><path d="M4 20h16"/></svg>
            </div>
            <h3>Traditional Formula</h3>
            <p>Rooted in age-old herbal wisdom and prepared with care for healthy-looking hair.</p>
          </div>

          <div class="spw-card">
            <div class="spw-icon">
              <svg viewBox="0 0 24 24"><path d="M12 21s-7-4.4-9.3-9A5.4 5.4 0 0 1 12 6a5.4 5.4 0 0 1 9.3 6c-2.3 4.6-9.3 9-9.3 9z"/></svg>
            </div>
            <h3>Trusted by 2.5L+</h3>
            <p>Loved by thousands of customers across India as part of their hair care routine.</p>
          </div>
        </div>

        <div class="spw-stats">
          <div class="spw-stat">
            <strong>2.5L+</strong>
            <span>Happy Customers</span>
          </div>
          <div class="spw-stat">
            <strong>100%</strong>
            <span>Herbal Focus</span>
          </div>
          <div class="spw-stat">
            <strong>4.8★</strong>
            <span>Customer Rating</span>
          </div>
        </div>
      </div>
    </section>
  `;

  // Initialize interactive subcomponents
  initHeroSlideshow();
  initReels();
  initFAQ();
  initProductSlider();
  attachHomeEventListeners();
  initLuxury3DStage();
}

/* ========================================================
   RENDER ABOUT US VIEW (QA Item 8 & 9)
   - About Company Section
   - Our Purpose Section with Our Vision & Our Mission
   - Our Clients Section with Stats & Reviews
======================================================== */
function renderAboutView(mainEl) {
  mainEl.innerHTML = `
    <div class="about-page-wrapper">
      <!-- 1. Header Banner -->
      <section class="about-hero-banner">
        <div class="site-container">
          <span class="about-hero-eyebrow">Rooted in Tradition</span>
          <h1 class="about-hero-title">About Samarth Ayurveda</h1>
          <p class="about-hero-desc">
            Bringing 100% homemade, chemical-free herbal haircare from Maharashtra's fertile soils to over 2,50,000+ homes across India.
          </p>
        </div>
      </section>

      <!-- 2. About Company Section (QA Item 8) -->
      <section class="about-company-section" id="aboutCompany">
        <div class="site-container">
          <div class="about-company-grid">
            <div class="about-company-image-wrap">
              <img
                src="https://cdn.shopify.com/s/files/1/0601/8242/9745/files/0Q7A2433.jpg_1_1.jpg?v=1783542548"
                alt="Sonali Waghmode Founder of Samarth Ayurveda"
                class="about-company-img"
                loading="lazy"
              />
              <div class="about-company-badge">
                <strong>Sonali Waghmode</strong>
                <span>Hirakani Awardee &amp; Founder</span>
              </div>
            </div>

            <div class="about-company-content">
              <span class="about-section-eyebrow">Our Heritage</span>
              <h2 class="about-section-heading">Authentic Homemade Haircare Born From Generational Wisdom</h2>
              <p class="about-company-text">
                Samarth Ayurveda was born out of a simple, heartfelt motherly promise — to provide pure, honest, and completely natural haircare without the dangerous parabens, sulphates, or mineral oils found in commercial products.
              </p>
              <p class="about-company-text">
                Every bottle of hair oil, conditioner, and herbal shampoo is slow-cooked in brass vessels using freshly harvested village herbs including Bhringraj, Brahmi, Amla, Shikakai, Hibiscus flowers, and cold-pressed coconut oil.
              </p>

              <div class="about-company-features">
                <div class="about-feat-item">
                  <span class="about-feat-icon">🌿</span>
                  <span>100% Herbal Herbs</span>
                </div>
                <div class="about-feat-item">
                  <span class="about-feat-icon">🚫</span>
                  <span>Zero Harmful Chemicals</span>
                </div>
                <div class="about-feat-item">
                  <span class="about-feat-icon">🏺</span>
                  <span>Traditional Brass Brewing</span>
                </div>
                <div class="about-feat-item">
                  <span class="about-feat-icon">🏆</span>
                  <span>Hirakani Award Winning</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 3. Our Purpose Section (QA Item 8: Below About company section Our Purpose should be present with Our Vision & Our Mission) -->
      <section class="our-purpose-section" id="ourPurpose">
        <div class="site-container">
          <div class="purpose-header">
            <span class="about-section-eyebrow">Guiding Light</span>
            <h2 class="about-section-heading">Our Purpose</h2>
            <p style="color: #4b6350; font-size: 15.5px; line-height: 1.6; margin: 0;">
              Driven by an unyielding dedication to natural scalp health, traditional Indian wisdom, and transparent family wellness.
            </p>
          </div>

          <div class="purpose-grid">
            <!-- Vision Card -->
            <div class="purpose-card vision-card">
              <div class="purpose-card-icon">👁️</div>
              <h3 class="purpose-card-title">Our Vision</h3>
              <p class="purpose-card-text">
                To become India’s most trusted household name in chemical-free Ayurvedic wellness, empowering families worldwide to replace toxic cosmetic chemicals with 100% pure, nature-derived herbal care.
              </p>
              <ul class="purpose-card-bullets">
                <li><span class="purpose-bullet-dot"></span> Rejuvenate ancient Indian hair recipes for modern lifestyles</li>
                <li><span class="purpose-bullet-dot"></span> Educate families on authentic scalp nutrition and natural wellness</li>
                <li><span class="purpose-bullet-dot"></span> Lead the global movement toward conscious, cruelty-free herbal beauty</li>
              </ul>
            </div>

            <!-- Mission Card -->
            <div class="purpose-card mission-card">
              <div class="purpose-card-icon">🎯</div>
              <h3 class="purpose-card-title">Our Mission</h3>
              <p class="purpose-card-text">
                To handcraft honest, safe, and effective Ayurvedic hair remedies using purest cold-pressed botanicals, sustaining village farming communities while guaranteeing visible hair nourishment for every customer.
              </p>
              <ul class="purpose-card-bullets">
                <li><span class="purpose-bullet-dot"></span> Handpick fresh, pesticide-free indigenous herbs directly from farmers</li>
                <li><span class="purpose-bullet-dot"></span> Maintain stringent hygienic preparation without artificial colors or aromas</li>
                <li><span class="purpose-bullet-dot"></span> Deliver direct-to-doorstep fresh batches with compassionate customer care</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- 4. Our Clients Section (QA Item 9: Below Our Purpose, Our Client section should be present) -->
      <section class="our-clients-section" id="ourClients">
        <div class="site-container">
          <div class="clients-header">
            <span class="about-section-eyebrow">Community &amp; Trust</span>
            <h2 class="about-section-heading">Our Clients</h2>
            <p style="color: #4b6350; font-size: 15.5px; line-height: 1.6; margin: 0;">
              Over 2,50,000+ satisfied clients across Maharashtra and India trust Samarth Ayurveda for daily hair protection.
            </p>
          </div>

          <!-- Stats Counters -->
          <div class="clients-stats-row">
            <div class="client-stat-card">
              <span class="client-stat-num">2,50,000+</span>
              <span class="client-stat-label">Happy Clients Across India</span>
            </div>
            <div class="client-stat-card">
              <span class="client-stat-num">4.9 ★</span>
              <span class="client-stat-label">Average Customer Rating</span>
            </div>
            <div class="client-stat-card">
              <span class="client-stat-num">98.4%</span>
              <span class="client-stat-label">Repeat Client Re-orders</span>
            </div>
            <div class="client-stat-card">
              <span class="client-stat-num">100%</span>
              <span class="client-stat-label">Pure Herbal Transparency</span>
            </div>
          </div>

          <!-- Verified Client Reviews Grid -->
          <div class="clients-reviews-grid">
            <div class="client-review-card">
              <div class="client-rating-stars">★★★★★</div>
              <p class="client-review-quote">
                “I struggled with post-monsoon hair fall for months. Within 3 weeks of using Samarth Ayurveda Home Made Hair Oil, the breakage completely stopped. Truly pure Ayurvedic medicine!”
              </p>
              <div class="client-author-info">
                <div class="client-author-meta">
                  <strong>Pooja Deshmukh</strong>
                  <span>Pune, Maharashtra</span>
                </div>
                <span class="client-verified-tag">✓ Verified Client</span>
              </div>
            </div>

            <div class="client-review-card">
              <div class="client-rating-stars">★★★★★</div>
              <p class="client-review-quote">
                “The Herbal Shampoo and Nourishment Conditioner duo is incredible. No sulphate dryness, no itchiness. My hair is softer and has natural volume like never before.”
              </p>
              <div class="client-author-info">
                <div class="client-author-meta">
                  <strong>Rajesh Kadam</strong>
                  <span>Mumbai, Maharashtra</span>
                </div>
                <span class="client-verified-tag">✓ Verified Client</span>
              </div>
            </div>

            <div class="client-review-card">
              <div class="client-rating-stars">★★★★★</div>
              <p class="client-review-quote">
                “Ordered the Big Combo Pro Max. The packaging was fresh and the homemade oil smelled exactly like traditional recipes my grandmother used to make. Outstanding quality!”
              </p>
              <div class="client-author-info">
                <div class="client-author-meta">
                  <strong>Snehal Patil</strong>
                  <span>Kolhapur, Maharashtra</span>
                </div>
                <span class="client-verified-tag">✓ Verified Client</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  `;
}

/* ========================================================
   RENDER ALL PRODUCTS VIEW - EXACT MATCH TO AYURVEDA
======================================================== */
function renderProductsView(mainEl) {
  const filtered = getFilteredProducts();

  mainEl.innerHTML = `
    <div class="products-catalog-section">
      <!-- Breadcrumbs -->
      <div class="collection-breadcrumbs-wrap">
        <div class="site-container">
          <nav class="collection-breadcrumbs" aria-label="breadcrumbs">
            <a href="#home" data-route="home">Home</a>
            <span class="breadcrumb-sep">/</span>
            <span class="breadcrumb-current">All</span>
          </nav>
        </div>
      </div>

      <!-- Collection Toolbar -->
      <div class="collection-toolbar-wrap">
        <div class="site-container">
          <div class="collection-toolbar">
            <!-- Left: Filters button + Product Count -->
            <div class="collection-toolbar-left">
              <button class="collection-filters-btn" id="filterDrawerBtn" type="button">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                </svg>
                <span>Filters</span>
              </button>
              <span class="collection-count-text" id="collectionProductCount">${filtered.length} products</span>
            </div>

            <!-- Right: Sort by & View as -->
            <div class="collection-toolbar-right">
              <div class="sort-by-wrap">
                <label for="catalogSortSelect" class="sort-by-label">Sort by</label>
                <div class="sort-select-pill-box">
                  <select id="catalogSortSelect" class="sort-select-pill">
                    <option value="featured" ${currentSort === 'featured' ? 'selected' : ''}>Featured</option>
                    <option value="best-selling" ${currentSort === 'best-selling' ? 'selected' : ''}>Best selling</option>
                    <option value="title-asc" ${currentSort === 'title-asc' ? 'selected' : ''}>Alphabetically, A-Z</option>
                    <option value="title-desc" ${currentSort === 'title-desc' ? 'selected' : ''}>Alphabetically, Z-A</option>
                    <option value="price-asc" ${currentSort === 'price-asc' ? 'selected' : ''}>Price: Low to High</option>
                    <option value="price-desc" ${currentSort === 'price-desc' ? 'selected' : ''}>Price: High to Low</option>
                  </select>
                  <svg class="sort-chevron-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </div>
              </div>

              <div class="view-as-wrap">
                <span class="view-as-label">View as</span>
                <div class="view-as-btns">
                  <button class="view-as-btn ${currentGridView === 3 ? 'active' : ''}" id="viewGrid3Btn" type="button" aria-label="3 columns">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="2" y="2" width="8" height="8" rx="1.5"></rect>
                      <rect x="14" y="2" width="8" height="8" rx="1.5"></rect>
                      <rect x="2" y="14" width="8" height="8" rx="1.5"></rect>
                      <rect x="14" y="14" width="8" height="8" rx="1.5"></rect>
                    </svg>
                  </button>
                  <button class="view-as-btn ${currentGridView === 4 ? 'active' : ''}" id="viewGrid4Btn" type="button" aria-label="4 columns">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="4" cy="4" r="2.2"></circle>
                      <circle cx="12" cy="4" r="2.2"></circle>
                      <circle cx="20" cy="4" r="2.2"></circle>
                      <circle cx="4" cy="12" r="2.2"></circle>
                      <circle cx="12" cy="12" r="2.2"></circle>
                      <circle cx="20" cy="12" r="2.2"></circle>
                      <circle cx="4" cy="20" r="2.2"></circle>
                      <circle cx="12" cy="20" r="2.2"></circle>
                      <circle cx="20" cy="20" r="2.2"></circle>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main 2-Column Section -->
      <div class="collection-main-section">
        <div class="site-container">
          <div class="collection-layout">
            <!-- Left Sidebar -->
            <aside class="collection-sidebar" id="collectionSidebar">
              <!-- Availability Filter -->
              <div class="sidebar-filter-block" id="filterBlockAvailability">
                <button class="sidebar-filter-header" type="button" data-collapse="availability">
                  <span class="filter-header-title">Availability</span>
                  <span class="filter-toggle-icon">−</span>
                </button>
                <div class="sidebar-filter-content">
                  <label class="filter-checkbox-item">
                    <input type="checkbox" id="checkInStock" checked />
                    <span class="filter-label-text">In stock <span class="filter-qty">12</span></span>
                  </label>
                  <label class="filter-checkbox-item disabled">
                    <input type="checkbox" id="checkOutOfStock" disabled />
                    <span class="filter-label-text">Out of stock <span class="filter-qty">0</span></span>
                  </label>
                </div>
              </div>

              <!-- Price Filter -->
              <div class="sidebar-filter-block" id="filterBlockPrice">
                <button class="sidebar-filter-header" type="button" data-collapse="price">
                  <span class="filter-header-title">Price</span>
                  <span class="filter-toggle-icon">−</span>
                </button>
                <div class="sidebar-filter-content">
                  <div class="price-hint-text">The highest price is Rs. 1,399.00</div>

                  <div class="price-range-slider-wrap">
                    <div class="price-slider-track"></div>
                    <div class="price-slider-progress" id="priceSliderProgress" style="left: ${((filterMinPrice / 1399) * 100)}%; right: ${100 - ((filterMaxPrice / 1399) * 100)}%;"></div>
                    <input type="range" class="price-range-input range-min" id="rangeMin" min="0" max="1399" value="${filterMinPrice}" step="10" />
                    <input type="range" class="price-range-input range-max" id="rangeMax" min="0" max="1399" value="${filterMaxPrice}" step="10" />
                  </div>

                  <div class="price-inputs-row">
                    <div class="price-pill-box">
                      <span class="price-currency">₹</span>
                      <input class="price-pill-field" id="minPriceInput" type="number" min="0" max="1399" value="${filterMinPrice}" />
                    </div>
                    <div class="price-pill-box">
                      <span class="price-currency">₹</span>
                      <input class="price-pill-field" id="maxPriceInput" type="text" value="${filterMaxPrice === 1399 ? '1,399.00' : filterMaxPrice}" />
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            <!-- Right Column: Products Grid -->
            <div class="collection-products-column">
              <div class="collection-products-grid grid-${currentGridView}-cols" id="catalogProductsGrid">
                ${renderProductCards(filtered)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  attachCatalogEvents(mainEl);
}

function attachCatalogEvents(mainEl) {
  attachProductCardEvents();

  const grid = mainEl.querySelector('#catalogProductsGrid');
  const countEl = mainEl.querySelector('#collectionProductCount');
  const sortSelect = mainEl.querySelector('#catalogSortSelect');
  const view3Btn = mainEl.querySelector('#viewGrid3Btn');
  const view4Btn = mainEl.querySelector('#viewGrid4Btn');
  const filterBtn = mainEl.querySelector('#filterDrawerBtn');
  const sidebar = mainEl.querySelector('#collectionSidebar');

  const rangeMin = mainEl.querySelector('#rangeMin');
  const rangeMax = mainEl.querySelector('#rangeMax');
  const minInput = mainEl.querySelector('#minPriceInput');
  const maxInput = mainEl.querySelector('#maxPriceInput');
  const progress = mainEl.querySelector('#priceSliderProgress');

  function updatePriceFilter() {
    const minVal = Math.min(Number(rangeMin.value), Number(rangeMax.value));
    const maxVal = Math.max(Number(rangeMin.value), Number(rangeMax.value));
    filterMinPrice = minVal;
    filterMaxPrice = maxVal;

    if (minInput) minInput.value = minVal;
    if (maxInput) maxInput.value = maxVal === 1399 ? '1,399.00' : maxVal;

    if (progress) {
      progress.style.left = ((minVal / 1399) * 100) + '%';
      progress.style.right = (100 - (maxVal / 1399) * 100) + '%';
    }

    const filtered = getFilteredProducts();
    if (grid) grid.innerHTML = renderProductCards(filtered);
    if (countEl) countEl.textContent = `${filtered.length} products`;
    attachProductCardEvents();
  }

  if (rangeMin && rangeMax) {
    rangeMin.oninput = updatePriceFilter;
    rangeMax.oninput = updatePriceFilter;
  }

  if (minInput) {
    minInput.onchange = (e) => {
      const v = Math.max(0, Math.min(Number(e.target.value) || 0, filterMaxPrice));
      if (rangeMin) rangeMin.value = v;
      updatePriceFilter();
    };
  }

  if (maxInput) {
    maxInput.onchange = (e) => {
      const cleanVal = Number(String(e.target.value).replace(/,/g, '')) || 1399;
      const v = Math.min(1399, Math.max(cleanVal, filterMinPrice));
      if (rangeMax) rangeMax.value = v;
      updatePriceFilter();
    };
  }

  // Accordion collapse headers
  mainEl.querySelectorAll('.sidebar-filter-header').forEach(header => {
    header.onclick = () => {
      const block = header.closest('.sidebar-filter-block');
      if (block) {
        block.classList.toggle('collapsed');
        const icon = header.querySelector('.filter-toggle-icon');
        if (icon) icon.textContent = block.classList.contains('collapsed') ? '+' : '−';
      }
    };
  });

  // Mobile filters toggle button
  if (filterBtn && sidebar) {
    filterBtn.onclick = () => {
      sidebar.classList.toggle('open');
    };
  }

  // View as toggle
  if (view3Btn && view4Btn && grid) {
    view3Btn.onclick = () => {
      currentGridView = 3;
      view3Btn.classList.add('active');
      view4Btn.classList.remove('active');
      grid.classList.remove('grid-4-cols');
      grid.classList.add('grid-3-cols');
    };

    view4Btn.onclick = () => {
      currentGridView = 4;
      view4Btn.classList.add('active');
      view3Btn.classList.remove('active');
      grid.classList.remove('grid-3-cols');
      grid.classList.add('grid-4-cols');
    };
  }

  // Sort dropdown
  if (sortSelect) {
    sortSelect.onchange = (e) => {
      currentSort = e.target.value;
      const filtered = getFilteredProducts();
      if (grid) grid.innerHTML = renderProductCards(filtered);
      if (countEl) countEl.textContent = `${filtered.length} products`;
      attachProductCardEvents();
    };
  }

  // Breadcrumbs home click
  mainEl.querySelectorAll('[data-route="home"]').forEach(link => {
    link.onclick = (e) => {
      e.preventDefault();
      navigateTo('home', null, true);
    };
  });
}

/* ========================================================
   RENDER CONTACT VIEW - EXACT MATCH TO AYURVEDA
   QA Item 11, 13, 27:
   - Company Name, Address, Phone, Social Media, Map
   - Compulsory fields: Full Name, Email (validated), Phone no (validated), Address, Subject, Message, Captcha
======================================================== */
function renderContactView(mainEl) {
  let currentContactCaptchaCode = '';
  let isContactRobotVerified = false;

  function generateContactCaptcha() {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 5; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    currentContactCaptchaCode = code;
    const displayEl = document.getElementById('contactCaptchaDisplay');
    if (displayEl) {
      displayEl.innerHTML = code.split('').map((ch, idx) => {
        const rot = ((idx % 2 === 0 ? 1 : -1) * (Math.floor(Math.random() * 12) + 3));
        return `<span class="captcha-char" style="transform: rotate(${rot}deg);">${ch}</span>`;
      }).join('');
    }
  }

  mainEl.innerHTML = `
    <div class="contact-page-wrapper">
      <div class="site-container">
        <div class="contact-header">
          <h1 class="contact-title">Contact Us</h1>
          <p style="font-size: 15px; color: #556c5a; margin-top: 6px;">Have questions about our Ayurvedic remedies? We’re here to help you.</p>
        </div>

        <div class="contact-grid">
          <!-- Left Column: Compulsory Form (QA Item 13 & 27) -->
          <div class="contact-form-column">
            <form class="contact-form" id="contactForm" novalidate>
              <div class="form-row">
                <div class="form-group">
                  <label class="contact-label" for="contactFullName">Full Name*</label>
                  <input class="contact-pill-input" type="text" id="contactFullName" name="fullName" required placeholder="Your full name" />
                  <span class="form-error-text" id="errContactFullName" style="display: none;">Please enter your full name.</span>
                </div>
                <div class="form-group">
                  <label class="contact-label" for="contactEmail">Email Address*</label>
                  <input class="contact-pill-input" type="email" id="contactEmail" name="email" required placeholder="e.g. name@example.com" />
                  <span class="form-error-text" id="errContactEmail" style="display: none;">Please enter a valid email address.</span>
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label class="contact-label" for="contactPhone">Phone Number (10 Digits)*</label>
                  <input class="contact-pill-input" type="tel" id="contactPhone" name="phone" required maxlength="10" placeholder="10-digit mobile number" />
                  <span class="form-error-text" id="errContactPhone" style="display: none;">Please enter a valid 10-digit phone number.</span>
                </div>
                <div class="form-group">
                  <label class="contact-label" for="contactSubject">Subject*</label>
                  <input class="contact-pill-input" type="text" id="contactSubject" name="subject" required placeholder="Subject of your enquiry" />
                  <span class="form-error-text" id="errContactSubject" style="display: none;">Please enter the subject.</span>
                </div>
              </div>

              <div class="form-group">
                <label class="contact-label" for="contactAddress">Address / City*</label>
                <input class="contact-pill-input" type="text" id="contactAddress" name="address" required placeholder="Street address, city, state, pincode" />
                <span class="form-error-text" id="errContactAddress" style="display: none;">Please enter your address.</span>
              </div>

              <div class="form-group">
                <label class="contact-label" for="contactMessage">Message*</label>
                <textarea class="contact-textarea" id="contactMessage" name="message" rows="5" required placeholder="Type your detailed message or hair concern here..."></textarea>
                <span class="form-error-text" id="errContactMessage" style="display: none;">Please enter your message (at least 10 characters).</span>
              </div>

              <!-- Captcha Verification (QA Item 27: After SEO work done captcha should be add in contact form) -->
              <div class="contact-captcha-wrapper">
                <div class="captcha-header-label">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#084e10" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  <span>Captcha Verification*</span>
                </div>

                <!-- 1. Visual Alphanumeric Security Code Display + Refresh Button -->
                <div class="captcha-code-row">
                  <div class="captcha-code-display" id="contactCaptchaDisplay" title="Security Captcha Code"></div>
                  <button type="button" class="captcha-refresh-btn" id="contactCaptchaRefreshBtn" title="Generate New Captcha Code">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5">
                      <path d="M23 4v6h-6M1 20v-6h6"/>
                      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
                    </svg>
                    <span>Refresh</span>
                  </button>
                  <input class="captcha-input-field" type="text" id="contactCaptchaInput" name="captcha" required placeholder="Enter Captcha Code" autocomplete="off" maxlength="6" />
                </div>
                <span class="form-error-text" id="errContactCaptcha" style="display: none;">Please enter the correct 5-character captcha code.</span>

                <!-- 2. Google reCAPTCHA v2 Widget ("I'm not a robot") -->
                <div class="google-recaptcha-widget" id="contactRecaptchaWidget">
                  <div class="recaptcha-checkbox-area" id="contactRecaptchaClickArea">
                    <div class="recaptcha-checkbox" id="contactRecaptchaCheckbox" role="checkbox" aria-checked="false" tabindex="0">
                      <div class="recaptcha-spinner" id="contactRecaptchaSpinner"></div>
                      <svg class="recaptcha-checkmark" id="contactRecaptchaCheckmark" viewBox="0 0 24 24">
                        <path d="M4 12l5 5L20 6" fill="none" stroke="#00a859" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                    </div>
                    <span class="recaptcha-label" id="contactRecaptchaLabel">I'm not a robot</span>
                  </div>
                  <div class="recaptcha-brand">
                    <svg class="recaptcha-logo-icon" viewBox="0 0 32 32" width="28" height="28">
                      <path fill="#4285F4" d="M16 2.5a13.5 13.5 0 0 0-9.55 3.95l3.22 3.22A9 9 0 0 1 16 7a9 9 0 0 1 9 9h4.5A13.5 13.5 0 0 0 16 2.5z"/>
                      <path fill="#4285F4" d="M16 29.5a13.5 13.5 0 0 0 9.55-3.95l-3.22-3.22A9 9 0 0 1 16 25a9 9 0 0 1-9-9H2.5A13.5 13.5 0 0 0 16 29.5z"/>
                      <path fill="#34A853" d="M2.5 16A13.5 13.5 0 0 0 16 29.5v-4.5A9 9 0 0 1 7 16H2.5z"/>
                    </svg>
                    <div class="recaptcha-brand-text">
                      <span class="recaptcha-brand-title">reCAPTCHA</span>
                      <div class="recaptcha-brand-links">
                        <a href="https://www.google.com/intl/en/policies/privacy/" target="_blank" rel="noopener noreferrer">Privacy</a>
                        <span>-</span>
                        <a href="https://www.google.com/intl/en/policies/terms/" target="_blank" rel="noopener noreferrer">Terms</a>
                      </div>
                    </div>
                  </div>
                </div>
                <span class="form-error-text" id="errContactRecaptcha" style="display: none;">Please check "I'm not a robot" to verify.</span>
              </div>

              <button class="contact-submit-btn" type="submit" id="contactSubmitBtn">
                <span>Send Message</span>
                <span class="btn-arrow-circle">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </span>
              </button>
            </form>
          </div>

          <!-- Right Column: Information (QA Item 11: Company Name, Address, Phone, Social Media, Map) -->
          <div class="contact-info-column">
            <h2 class="contact-info-heading">Samarth Ayurveda</h2>
            <p class="contact-info-desc">
              Authentic handmade herbal haircare by Sonali Waghmode.<br />
              Visit us, call our team, or connect on social channels.
            </p>

            <div class="contact-info-items">
              <!-- Address -->
              <div class="contact-info-row">
                <div class="contact-info-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#084e10" stroke-width="2">
                    <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                  </svg>
                </div>
                <div class="contact-info-content">
                  <h4 class="contact-info-title">Registered Office &amp; Unit</h4>
                  <p class="contact-info-address">
                    Samarth Ayurveda, Oil Company SR No. 8/3 Khopdenagar,<br />
                    Katraj-Pune, Maharashtra 411046, India.
                  </p>
                </div>
              </div>

              <!-- Call Us (tel: click-to-call) -->
              <div class="contact-info-row">
                <div class="contact-info-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#084e10" stroke-width="2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div class="contact-info-content">
                  <h4 class="contact-info-title">Phone &amp; WhatsApp Support</h4>
                  <a class="contact-info-link" href="tel:+919325260725">+91 93252 60725</a>
                </div>
              </div>

              <!-- Email (mailto:) -->
              <div class="contact-info-row">
                <div class="contact-info-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#084e10" stroke-width="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div class="contact-info-content">
                  <h4 class="contact-info-title">Email Enquiries</h4>
                  <a class="contact-info-link" href="mailto:info@samarthayurveda.com">info@samarthayurveda.com</a>
                </div>
              </div>

              <!-- Social Media Links (QA Item 11 & 28: Target _blank) -->
              <div class="contact-info-row">
                <div class="contact-info-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#084e10" stroke-width="2">
                    <circle cx="18" cy="5" r="3"/>
                    <circle cx="6" cy="12" r="3"/>
                    <circle cx="18" cy="19" r="3"/>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                  </svg>
                </div>
                <div class="contact-info-content">
                  <h4 class="contact-info-title">Connect on Social Media</h4>
                  <div class="contact-social-row">
                    <a href="https://www.facebook.com/sonaherbal" target="_blank" rel="noopener noreferrer" class="contact-social-btn" aria-label="Facebook">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </a>
                    <a href="https://www.instagram.com/sonaliwaghmode8669/" target="_blank" rel="noopener noreferrer" class="contact-social-btn" aria-label="Instagram">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    </a>
                    <a href="https://wa.me/919325260725?text=Hello%20Ayurveda" target="_blank" rel="noopener noreferrer" class="contact-social-btn" aria-label="WhatsApp">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Embedded Google Map (QA Item 11) -->
        <div class="contact-map-section">
          <h3 class="contact-map-title">Find Us on Google Maps</h3>
          <div class="contact-map-frame-wrap">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15138.455088998818!2d73.8567!3d18.4529!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2ea946d49f05f%3A0xb31a96570d6eb773!2sKatraj%2C%20Pune%2C%20Maharashtra%20411046!5e0!3m2!1sen!2sin!4v1711200000000!5m2!1sen!2sin"
              title="Samarth Ayurveda Location Katraj Pune"
              width="100%"
              height="380"
              style="border:0;"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade">
            </iframe>
          </div>
        </div>
      </div>
    </div>
  `;

  // Initialize Contact Captcha Suite
  generateContactCaptcha();

  const refreshBtn = document.getElementById('contactCaptchaRefreshBtn');
  if (refreshBtn) {
    refreshBtn.onclick = (e) => {
      e.preventDefault();
      refreshBtn.classList.add('rotating');
      setTimeout(() => refreshBtn.classList.remove('rotating'), 350);
      generateContactCaptcha();
      const inputEl = document.getElementById('contactCaptchaInput');
      if (inputEl) inputEl.value = '';
      const errCaptcha = document.getElementById('errContactCaptcha');
      if (errCaptcha) errCaptcha.style.display = 'none';
    };
  }

  const recaptchaArea = document.getElementById('contactRecaptchaClickArea');
  const recaptchaBox = document.getElementById('contactRecaptchaCheckbox');
  const recaptchaWidget = document.getElementById('contactRecaptchaWidget');
  const errRecaptcha = document.getElementById('errContactRecaptcha');

  if (recaptchaArea && recaptchaBox) {
    recaptchaArea.onclick = () => {
      if (!isContactRobotVerified) {
        recaptchaBox.classList.add('verifying');
        setTimeout(() => {
          recaptchaBox.classList.remove('verifying');
          recaptchaBox.classList.add('checked');
          isContactRobotVerified = true;
          if (recaptchaWidget) recaptchaWidget.classList.remove('has-error');
          if (errRecaptcha) errRecaptcha.style.display = 'none';
        }, 400);
      }
    };
  }

  // Compulsory Form Validation & Captcha Check
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let hasError = false;
      const fullName = document.getElementById('contactFullName')?.value.trim();
      const email = document.getElementById('contactEmail')?.value.trim();
      const phone = document.getElementById('contactPhone')?.value.trim();
      const address = document.getElementById('contactAddress')?.value.trim();
      const subject = document.getElementById('contactSubject')?.value.trim();
      const message = document.getElementById('contactMessage')?.value.trim();
      const inputCaptcha = document.getElementById('contactCaptchaInput')?.value.trim().toUpperCase();

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^[6-9]\d{9}$/;

      // 1) Full Name
      const errName = document.getElementById('errContactFullName');
      if (!fullName || fullName.length < 2) {
        if (errName) errName.style.display = 'block';
        hasError = true;
      } else if (errName) {
        errName.style.display = 'none';
      }

      // 2) Email
      const errEmail = document.getElementById('errContactEmail');
      if (!email || !emailRegex.test(email)) {
        if (errEmail) errEmail.style.display = 'block';
        hasError = true;
      } else if (errEmail) {
        errEmail.style.display = 'none';
      }

      // 3) Phone
      const errPhone = document.getElementById('errContactPhone');
      if (!phone || !phoneRegex.test(phone)) {
        if (errPhone) errPhone.style.display = 'block';
        hasError = true;
      } else if (errPhone) {
        errPhone.style.display = 'none';
      }

      // 4) Address
      const errAddress = document.getElementById('errContactAddress');
      if (!address || address.length < 3) {
        if (errAddress) errAddress.style.display = 'block';
        hasError = true;
      } else if (errAddress) {
        errAddress.style.display = 'none';
      }

      // 5) Subject
      const errSubject = document.getElementById('errContactSubject');
      if (!subject || subject.length < 2) {
        if (errSubject) errSubject.style.display = 'block';
        hasError = true;
      } else if (errSubject) {
        errSubject.style.display = 'none';
      }

      // 6) Message
      const errMessage = document.getElementById('errContactMessage');
      if (!message || message.length < 10) {
        if (errMessage) errMessage.style.display = 'block';
        hasError = true;
      } else if (errMessage) {
        errMessage.style.display = 'none';
      }

      // 7) Captcha Code Verification (QA Item 27)
      const errCaptcha = document.getElementById('errContactCaptcha');
      if (!inputCaptcha || inputCaptcha !== currentContactCaptchaCode) {
        if (errCaptcha) errCaptcha.style.display = 'block';
        hasError = true;
      } else if (errCaptcha) {
        errCaptcha.style.display = 'none';
      }

      // 8) Google reCAPTCHA Verification (QA Item 27)
      const errRobot = document.getElementById('errContactRecaptcha');
      const widgetEl = document.getElementById('contactRecaptchaWidget');
      if (!isContactRobotVerified) {
        if (errRobot) errRobot.style.display = 'block';
        if (widgetEl) widgetEl.classList.add('has-error');
        hasError = true;
      } else {
        if (errRobot) errRobot.style.display = 'none';
        if (widgetEl) widgetEl.classList.remove('has-error');
      }

      if (hasError) return;

      const btn = document.getElementById('contactSubmitBtn');
      const originalHtml = btn.innerHTML;
      btn.innerHTML = '<span>Message Sent! ✓</span>';
      btn.style.backgroundColor = '#0a9b61';
      setTimeout(() => {
        alert('Thank you, ' + fullName + '! Your message has been received by Samarth Ayurveda team. We will call/email you shortly.');
        contactForm.reset();
        btn.innerHTML = originalHtml;
        btn.style.backgroundColor = '';
        renderContactView(mainEl);
      }, 600);
    });
  }
}

/* ========================================================
   RENDER ORDERS VIEW - AYURVEDA
======================================================== */
function renderOrdersView(mainEl) {
  mainEl.innerHTML = `
    <div class="orders-page-wrapper">
      <!-- Top Brand Header -->
      <header class="orders-page-header">
        <a href="#home" class="orders-brand-logo" data-route="home" title="Go to Ayurveda Home">
          <div class="orders-brand-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
            </svg>
          </div>
          <div class="orders-brand-text">
            <span class="orders-brand-title">AYURVEDA</span>
            <span class="orders-brand-subtitle">Pure care, naturally</span>
          </div>
        </a>
        <a href="#home" class="orders-back-link" data-route="home">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>Back to Store</span>
        </a>
      </header>

      <!-- Central Card -->
      <main class="orders-card-container">
        <div class="orders-card">
          <div class="orders-card-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1e5638" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <!-- Isometric Box -->
              <path d="M12 3l8 4.5v7l-8 4.5-8-4.5v-7L12 3z"/>
              <path d="M12 12l8-4.5"/>
              <path d="M12 12v7"/>
              <path d="M12 12L4 7.5"/>
              <!-- Magnifying Glass -->
              <circle cx="16.5" cy="16.5" r="3" fill="#e6f2eb" stroke="#1e5638" stroke-width="2"/>
              <path d="M18.8 18.8L21.5 21.5" stroke="#1e5638" stroke-width="2.2"/>
            </svg>
          </div>

          <div class="orders-card-eyebrow">ORDER CARE</div>
          <h1 class="orders-card-title">My Orders</h1>
          <p class="orders-card-desc">Enter the mobile number used while placing your order</p>

          <form class="orders-form" id="myOrdersForm" novalidate>
            <label class="orders-input-label" for="ordersMobileInput">Mobile number</label>
            <div class="orders-input-group" id="ordersInputGroup">
              <div class="orders-prefix">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                <span>+91</span>
              </div>
              <input 
                type="tel" 
                id="ordersMobileInput" 
                class="orders-input" 
                placeholder="Mobile Number" 
                maxlength="10" 
                inputmode="numeric"
                autocomplete="tel"
                required
              />
            </div>
            <div class="orders-helper-text" id="ordersHelperText">Use the same number you entered at checkout</div>

            <button type="submit" class="orders-submit-btn" id="ordersSubmitBtn">
              <span>View My Orders</span>
            </button>

            <div class="orders-security-notice">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <span>Your order details are shown securely. Addresses and payment details are never displayed.</span>
            </div>
          </form>

          <div id="ordersResultArea" class="orders-result-container" style="display: none;"></div>
        </div>
      </main>

      <!-- Bottom Footer Line -->
      <footer class="orders-page-footer">
        © Ayurveda · Natural wellness, delivered with care
      </footer>
    </div>
  `;

  attachOrdersEvents();
}

function attachOrdersEvents() {
  const form = document.getElementById('myOrdersForm');
  const input = document.getElementById('ordersMobileInput');
  const submitBtn = document.getElementById('ordersSubmitBtn');
  const resultArea = document.getElementById('ordersResultArea');
  const helperText = document.getElementById('ordersHelperText');
  const inputGroup = document.getElementById('ordersInputGroup');

  if (!form || !input) return;

  // Auto clean input to numbers only
  input.addEventListener('input', () => {
    input.value = input.value.replace(/\D/g, '');
    if (helperText) {
      helperText.textContent = 'Use the same number you entered at checkout';
      helperText.style.color = '#77857c';
    }
    if (inputGroup) inputGroup.style.borderColor = '';
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const val = input.value.trim();

    if (!val || val.length !== 10) {
      if (helperText) {
        helperText.textContent = 'Please enter a valid 10-digit mobile number';
        helperText.style.color = '#d32f2f';
      }
      if (inputGroup) inputGroup.style.borderColor = '#d32f2f';
      input.focus();
      return;
    }

    // Submit state
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Verifying &amp; Fetching Orders...</span>';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;

      const orderSuffix = val.slice(-4);
      const awbNum = `DEL${val.slice(-5)}82`;

      if (resultArea) {
        resultArea.style.display = 'block';
        resultArea.innerHTML = `
          <div class="orders-status-header">
            <div>
              <span class="orders-id-tag">Active Shipment</span>
              <h3 class="orders-id-val">#AYUR-${orderSuffix}-749</h3>
            </div>
            <span class="orders-badge-pill">
              <span class="orders-badge-dot"></span>
              In Transit • Dispatched
            </span>
          </div>

          <div class="orders-steps-track">
            <div class="orders-step-node completed">
              <div class="orders-step-bullet">✓</div>
              <span class="orders-step-label">Ordered</span>
            </div>
            <div class="orders-step-node completed">
              <div class="orders-step-bullet">✓</div>
              <span class="orders-step-label">Packed</span>
            </div>
            <div class="orders-step-node current">
              <div class="orders-step-bullet">3</div>
              <span class="orders-step-label">In Transit</span>
            </div>
            <div class="orders-step-node">
              <div class="orders-step-bullet">4</div>
              <span class="orders-step-label">Delivered</span>
            </div>
          </div>

          <div class="orders-item-preview">
            <img class="orders-item-thumb" src="https://sonaherbal.com/cdn/shop/files/ChatGPT_Image_Jul_9_2026_12_51_42_AM.png?v=1783538738&width=360" alt="Ayurveda Herbal Oil" />
            <div class="orders-item-info">
              <h4 class="orders-item-name">Ayurveda Pure Hair &amp; Scalp Oil</h4>
              <p class="orders-item-sub">AWB: ${awbNum} · Delhivery Express</p>
            </div>
          </div>

          <div class="orders-action-buttons">
            <a href="https://wa.me/919325260725?text=Hello%20Ayurveda,%20please%20update%20me%20on%20my%20order%20for%20mobile%20${val}" target="_blank" class="orders-btn-secondary">
              WhatsApp Support
            </a>
            <button type="button" class="orders-btn-secondary" id="ordersResetBtn">
              Check Another Number
            </button>
          </div>
        `;

        const resetBtn = document.getElementById('ordersResetBtn');
        if (resetBtn) {
          resetBtn.onclick = () => {
            resultArea.style.display = 'none';
            resultArea.innerHTML = '';
            input.value = '';
            input.focus();
          };
        }

        resultArea.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 600);
  });
}

/* ========================================================
   RENDER PRODUCT CARDS & FILTER LOGIC
======================================================== */
function getFilteredProducts() {
  let list = [...products];

  // Price range filtering
  list = list.filter(p => p.salePrice >= filterMinPrice && p.salePrice <= filterMaxPrice);

  if (currentSort === 'price-asc') {
    return list.sort((a, b) => a.salePrice - b.salePrice);
  }
  if (currentSort === 'price-desc') {
    return list.sort((a, b) => b.salePrice - a.salePrice);
  }
  if (currentSort === 'title-asc') {
    return list.sort((a, b) => a.title.localeCompare(b.title));
  }
  if (currentSort === 'title-desc') {
    return list.sort((a, b) => b.title.localeCompare(a.title));
  }
  if (currentSort === 'best-selling') {
    return list.sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0));
  }
  return list;
}

function renderProductCards(list) {
  if (list.length === 0) {
    return `
      <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: #666;">
        <h3 style="font-size: 18px; color: #222; margin-bottom: 8px;">No products found in this price range</h3>
        <p style="font-size: 14px;">Try adjusting the price slider or resetting filters.</p>
      </div>
    `;
  }

  return list.map(p => {
    const hasSecondary = Boolean(p.secondaryImg);
    return `
      <div class="product-card ${hasSecondary ? '' : 'single-img'}" data-id="${p.id}">
        <div class="product-card-media" data-id="${p.id}">
          ${p.regularPrice > p.salePrice ? `<span class="badge-on-sale">On sale</span>` : ''}
          <img class="product-card-img primary-img" src="${p.primaryImg}" alt="${p.title}" loading="lazy" />
          ${hasSecondary ? `<img class="product-card-img secondary-img" src="${p.secondaryImg}" alt="${p.title}" loading="lazy" />` : ''}
        </div>

        <!-- QA Item 10 & 26: On product page Enquiry button should be present (placed directly below image, do not use view now button) -->
        <button class="product-enquiry-btn" data-id="${p.id}" data-title="${p.title}" type="button">
          <span>Enquiry</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>

        <div class="product-card-body">
          <h3 class="product-card-title" data-id="${p.id}">${p.title}</h3>

          <div class="product-price-row">
            <span class="sale-price">Rs. ${p.salePrice.toLocaleString()}.00</span>
            ${p.regularPrice > p.salePrice ? `<span class="regular-price">Rs. ${p.regularPrice.toLocaleString()}.00</span>` : ''}
          </div>

          <button class="add-to-cart-btn" data-id="${p.id}" type="button">
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function initProductSlider() {
  const slider = document.getElementById('homeProductsSlider');
  if (!slider) return;

  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  function getStep() {
    const card = slider.querySelector('.fc-card') || slider.querySelector('.product-card');
    return card ? card.offsetWidth + 18 : 338;
  }

  function slideNext() {
    const step = getStep();
    const maxScroll = slider.scrollWidth - slider.clientWidth;
    if (slider.scrollLeft >= maxScroll - 15) {
      slider.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      slider.scrollBy({ left: step, behavior: 'smooth' });
    }
  }

  function startAuto() {
    stopAuto();
    productSliderAutoTimer = setInterval(slideNext, 3500);
  }

  function stopAuto() {
    if (productSliderAutoTimer) clearInterval(productSliderAutoTimer);
  }

  slider.addEventListener('mouseenter', stopAuto);
  slider.addEventListener('mouseleave', startAuto);

  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
    stopAuto();
  });

  window.addEventListener('mouseup', () => {
    if (isDown) {
      isDown = false;
      startAuto();
    }
  });

  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.3;
    slider.scrollLeft = scrollLeft - walk;
  });

  slider.addEventListener('touchstart', stopAuto, { passive: true });
  slider.addEventListener('touchend', startAuto, { passive: true });

  startAuto();
}

/* ========================================================
   EVENT LISTENERS & NAVIGATION
======================================================== */
function attachHomeEventListeners() {
  // Category filter pills
  document.querySelectorAll('.filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      currentCategory = pill.dataset.cat;
      document.querySelectorAll('.filter-pill').forEach(p => p.classList.toggle('active', p === pill));
      const slider = document.getElementById('homeProductsSlider');
      if (slider) {
        slider.innerHTML = renderProductCards(getFilteredProducts());
        slider.scrollLeft = 0;
        attachProductCardEvents();
        initProductSlider();
      }
    });
  });

  const viewAllBtn = document.getElementById('homeViewAllBtn');
  if (viewAllBtn) {
    viewAllBtn.onclick = (e) => {
      e.preventDefault();
      currentView = 'products';
      currentCategory = 'All';
      renderApp();
    };
  }

  const luxuryShopBtn = document.getElementById('luxuryShopBtn');
  if (luxuryShopBtn) {
    luxuryShopBtn.onclick = (e) => {
      e.preventDefault();
      currentView = 'products';
      renderApp();
    };
  }

  const luxuryAboutBtn = document.getElementById('luxuryAboutBtn');
  if (luxuryAboutBtn) {
    luxuryAboutBtn.onclick = (e) => {
      e.preventDefault();
      const el = document.getElementById('founderSection');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    };
  }

  attachProductCardEvents();
}

function attachProductCardEvents() {
  // Add to cart buttons
  document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const id = Number(btn.dataset.id);
      cart.addItem(id, 1);
      btn.classList.add('added');
      btn.querySelector('span').textContent = 'Added ✓';
      setTimeout(() => {
        btn.classList.remove('added');
        btn.querySelector('span').textContent = 'Add to Cart';
      }, 1200);
    };
  });

  // Product Enquiry buttons (QA Item 10 & 26)
  document.querySelectorAll('.product-enquiry-btn').forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const title = btn.dataset.title;
      openEnquiryModal(title);
    };
  });

  // Product media or title click -> Open PDP
  document.querySelectorAll('.product-card-media, .product-card-title, .fc-img-wrap, .fc-title-product, .fc-card').forEach(el => {
    el.onclick = (e) => {
      if (e.target.closest('.add-to-cart-btn') || e.target.closest('.product-enquiry-btn')) return;
      const id = Number(el.dataset.id || el.closest('[data-id]')?.dataset.id);
      if (id) {
        e.preventDefault();
        openProductDetailPage(id);
      }
    };
  });
}

function openProductDetailPage(productId) {
  navigateTo('pdp', productId, true);
}

/* ========================================================
   LUXURY 3D INTERACTIVE STAGE TILT
======================================================== */
function initLuxury3DStage() {
  const stage = document.getElementById('sonaStage');
  const mainVisual = document.getElementById('sonaMainVisual');
  const spotlight = document.getElementById('sonaSpotlight');
  if (!stage) return;

  const section = stage.closest('.sona-luxury-3d-section') || document;
  const layers = section.querySelectorAll('[data-depth]');
  const isTouch = window.matchMedia('(pointer: coarse)').matches;

  if (!isTouch) {
    stage.addEventListener('mousemove', (e) => {
      const rect = stage.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      layers.forEach(layer => {
        const depth = parseFloat(layer.getAttribute('data-depth')) || 0;
        const moveX = x * depth * 85;
        const moveY = y * depth * 85;
        layer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
      });

      if (mainVisual) {
        const rotateY = x * 14;
        const rotateX = -y * 12;
        mainVisual.style.transform = `translateY(-4px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }
    });

    stage.addEventListener('mouseleave', () => {
      layers.forEach(layer => {
        layer.style.transform = 'translate3d(0, 0, 0)';
      });
      if (mainVisual) {
        mainVisual.style.transform = 'translateY(0) rotateX(0deg) rotateY(0deg)';
      }
    });
  }

  // Mini stats and gallery cards click events to highlight corresponding 3D cards
  const stats = document.querySelectorAll('.sona-mini-stat');
  const galleryCards = document.querySelectorAll('.sona-gallery-card');
  const frontCard = document.querySelector('.sona-main-card.front-card');
  const leftCard = document.querySelector('.sona-side-card.side-card-left');
  const rightCard = document.querySelector('.sona-side-card.side-card-right');

  function activateFeature(featureName) {
    // 1. Update left mini-stats
    stats.forEach(s => {
      const match = s.dataset.feature === featureName;
      s.classList.toggle('is-active', match);
      s.setAttribute('aria-selected', match ? 'true' : 'false');
    });

    // 2. Update gallery cards
    galleryCards.forEach(gc => {
      gc.classList.toggle('is-active', gc.dataset.feature === featureName);
    });

    // 3. Highlight 3D stage card with smooth pulse
    if (frontCard && leftCard && rightCard) {
      frontCard.classList.remove('is-highlighted');
      leftCard.classList.remove('is-highlighted');
      rightCard.classList.remove('is-highlighted');

      if (featureName === 'shampoo') {
        frontCard.classList.add('is-highlighted');
      } else if (featureName === 'oil') {
        leftCard.classList.add('is-highlighted');
      } else if (featureName === 'care') {
        rightCard.classList.add('is-highlighted');
      }
    }
  }

  stats.forEach(stat => {
    stat.addEventListener('click', () => {
      activateFeature(stat.dataset.feature);
    });
  });

  galleryCards.forEach(card => {
    card.addEventListener('click', () => {
      activateFeature(card.dataset.feature);
    });
  });

  // Know More About Us button click
  const knowMoreBtn = document.getElementById('btnKnowMoreAboutUs');
  if (knowMoreBtn) {
    knowMoreBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const founderSec = document.querySelector('.sona-founder') || document.querySelector('.sona-promise-white');
      if (founderSec) {
        founderSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }
}

export function closeMobileDrawer() {
  const mobileDrawer = document.getElementById('mobileNavDrawer');
  const backdrop = document.getElementById('modalBackdrop');
  if (mobileDrawer) mobileDrawer.classList.remove('open');
  if (backdrop && !document.getElementById('cartDrawer')?.classList.contains('open')) {
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
  }
}

export function openMobileDrawer() {
  const mobileDrawer = document.getElementById('mobileNavDrawer');
  const backdrop = document.getElementById('modalBackdrop');
  if (mobileDrawer && backdrop) {
    mobileDrawer.classList.add('open');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

/* ========================================================
   GLOBAL EVENTS SETUP
======================================================== */
function setupGlobalEvents() {
  // 1. Navigation links with document-level event delegation
  document.addEventListener('click', (e) => {
    const link = e.target.closest('[data-route]');
    if (link) {
      e.preventDefault();
      const route = link.dataset.route;
      navigateTo(route, null, true);
    }
  });

  // 2. Mobile Drawer
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileClose = document.getElementById('mobileDrawerClose');

  if (mobileToggle) mobileToggle.onclick = openMobileDrawer;
  if (mobileClose) mobileClose.onclick = closeMobileDrawer;

  // 3. Cart Drawer Toggle
  document.querySelectorAll('.cart-drawer-trigger').forEach(btn => {
    btn.onclick = () => cart.openDrawer();
  });

  const cartClose = document.getElementById('cartDrawerClose');
  if (cartClose) cartClose.onclick = () => cart.closeDrawer();

  const backdrop = document.getElementById('modalBackdrop');
  if (backdrop) {
    backdrop.onclick = () => {
      closeMobileDrawer();
      cart.closeDrawer();
    };
  }

  // 4. Cart Promo Code Apply
  const promoBtn = document.getElementById('cartPromoBtn');
  const promoInput = document.getElementById('cartPromoInput');
  if (promoBtn && promoInput) {
    promoBtn.onclick = () => {
      const res = cart.applyPromo(promoInput.value);
      alert(res.message);
    };
  }

  // 5. Checkout Button in Drawer
  const checkoutBtn = document.getElementById('cartCheckoutBtn');
  if (checkoutBtn) {
    checkoutBtn.onclick = () => {
      if (cart.items.length === 0) {
        alert('Your cart is empty! Add products to proceed.');
        return;
      }
      alert(`Proceeding to Fastrr / Shiprocket 1-Click Secure Checkout for Rs. ${cart.getTotal().toLocaleString()}.00 (Prepaid Orders qualify for Extra ₹200 OFF).`);
    };
  }

  // 6. Language Selector Dropdown
  const langBtn = document.getElementById('langBtn');
  const langDropdown = document.getElementById('langDropdown');
  if (langBtn && langDropdown) {
    langBtn.onclick = (e) => {
      e.stopPropagation();
      langDropdown.classList.toggle('open');
    };

    document.querySelectorAll('.lang-item').forEach(item => {
      item.onclick = (e) => {
        e.stopPropagation();
        const code = item.dataset.lang;
        const name = item.dataset.name;
        document.getElementById('currentLangCode').textContent = code;
        langDropdown.classList.remove('open');
      };
    });

    document.addEventListener('click', () => {
      langDropdown.classList.remove('open');
    });
  }

  // 7. Search Modal
  initSearch((productId) => {
    openProductDetailPage(productId);
  });

  // 8. Order Tracking Modal
  initOrderTracker();

  // 9. Policies Modal
  initPolicyModal();

  // 10. Footer Newsletter Form & Language selector
  const newsletterForm = document.getElementById('footerNewsletterForm');
  if (newsletterForm) {
    newsletterForm.onsubmit = (e) => {
      e.preventDefault();
      const input = document.getElementById('footerEmailInput');
      if (input && input.value) {
        alert(`Thank you for subscribing! A 10% welcome discount voucher (HERBAL10) has been sent to ${input.value}.`);
        newsletterForm.reset();
      }
    };
  }

  const footerLangSelect = document.getElementById('footerLanguageSelect');
  if (footerLangSelect) {
    footerLangSelect.addEventListener('change', (e) => {
      const code = e.target.value.toUpperCase();
      const currentCodeEl = document.getElementById('currentLangCode');
      if (currentCodeEl) currentCodeEl.textContent = code;
    });
  }

  // 11. Floating Chat with Sona Widget & Chat Application
  initChatWidget();
}

/* ========================================================
   QUICK ENQUIRY & GET A QUOTE MODAL (QA Item 2, 10, 13, 27)
======================================================== */
/* ========================================================
   QUICK ENQUIRY & GET A QUOTE MODAL (QA Item 2, 10, 13, 27)
======================================================== */
let currentModalCaptchaCode = '';
let isModalRobotVerified = false;

function generateModalCaptcha() {
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let code = '';
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  currentModalCaptchaCode = code;
  const displayEl = document.getElementById('enquiryCaptchaDisplay');
  if (displayEl) {
    displayEl.innerHTML = code.split('').map((ch, idx) => {
      const rot = ((idx % 2 === 0 ? 1 : -1) * (Math.floor(Math.random() * 12) + 3));
      return `<span class="captcha-char" style="transform: rotate(${rot}deg);">${ch}</span>`;
    }).join('');
  }
}

export function openEnquiryModal(prefillProduct = '') {
  const modal = document.getElementById('enquiryModal');
  const backdrop = document.getElementById('modalBackdrop');
  const productInput = document.getElementById('enquiryProduct');
  const form = document.getElementById('enquiryForm');

  if (form) form.reset();
  isModalRobotVerified = false;
  const checkbox = document.getElementById('enquiryRecaptchaCheckbox');
  const widget = document.getElementById('enquiryRecaptchaWidget');
  if (checkbox) checkbox.className = 'recaptcha-checkbox';
  if (widget) widget.classList.remove('has-error');

  generateModalCaptcha();

  if (productInput) {
    productInput.value = prefillProduct || 'Samarth Ayurveda Hair Care';
  }

  // Clear previous errors
  document.querySelectorAll('#enquiryModal .form-error-text').forEach(e => e.style.display = 'none');

  if (modal && backdrop) {
    modal.classList.add('active', 'open');
    backdrop.classList.add('active', 'open');
  }
}

export function closeEnquiryModal() {
  const modal = document.getElementById('enquiryModal');
  const backdrop = document.getElementById('modalBackdrop');
  if (modal) modal.classList.remove('active', 'open');
  if (backdrop) backdrop.classList.remove('active', 'open');
}

function initEnquiryAndQuoteModal() {
  const closeBtn = document.getElementById('enquiryModalClose');
  const backdrop = document.getElementById('modalBackdrop');
  const navQuoteBtn = document.getElementById('navGetQuoteBtn');
  const mobileQuoteBtn = document.getElementById('mobileGetQuoteBtn');
  const form = document.getElementById('enquiryForm');

  if (closeBtn) closeBtn.onclick = closeEnquiryModal;
  if (backdrop) {
    backdrop.addEventListener('click', () => {
      closeEnquiryModal();
    });
  }

  const refreshBtn = document.getElementById('enquiryCaptchaRefreshBtn');
  if (refreshBtn) {
    refreshBtn.onclick = (e) => {
      e.preventDefault();
      refreshBtn.classList.add('rotating');
      setTimeout(() => refreshBtn.classList.remove('rotating'), 350);
      generateModalCaptcha();
      const inputEl = document.getElementById('enquiryCaptchaInput');
      if (inputEl) inputEl.value = '';
      const errCaptcha = document.getElementById('errEnquiryCaptcha');
      if (errCaptcha) errCaptcha.style.display = 'none';
    };
  }

  const recaptchaArea = document.getElementById('enquiryRecaptchaClickArea');
  const recaptchaBox = document.getElementById('enquiryRecaptchaCheckbox');
  const recaptchaWidget = document.getElementById('enquiryRecaptchaWidget');
  const errRecaptcha = document.getElementById('errEnquiryRecaptcha');

  if (recaptchaArea && recaptchaBox) {
    recaptchaArea.onclick = () => {
      if (!isModalRobotVerified) {
        recaptchaBox.classList.add('verifying');
        setTimeout(() => {
          recaptchaBox.classList.remove('verifying');
          recaptchaBox.classList.add('checked');
          isModalRobotVerified = true;
          if (recaptchaWidget) recaptchaWidget.classList.remove('has-error');
          if (errRecaptcha) errRecaptcha.style.display = 'none';
        }, 400);
      }
    };
  }

  if (navQuoteBtn) {
    navQuoteBtn.onclick = (e) => {
      e.preventDefault();
      openEnquiryModal('Full Consultation & Quote');
    };
  }

  if (mobileQuoteBtn) {
    mobileQuoteBtn.onclick = (e) => {
      e.preventDefault();
      closeMobileDrawer();
      openEnquiryModal('Full Consultation & Quote');
    };
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let hasError = false;

      const fullName = document.getElementById('enquiryFullName')?.value.trim();
      const email = document.getElementById('enquiryEmail')?.value.trim();
      const phone = document.getElementById('enquiryPhone')?.value.trim();
      const product = document.getElementById('enquiryProduct')?.value.trim();
      const address = document.getElementById('enquiryAddress')?.value.trim();
      const subject = document.getElementById('enquirySubject')?.value.trim();
      const message = document.getElementById('enquiryMessage')?.value.trim();
      const inputCaptcha = document.getElementById('enquiryCaptchaInput')?.value.trim().toUpperCase();

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^[6-9]\d{9}$/;

      // 1) Full Name
      const errName = document.getElementById('errEnquiryFullName');
      if (!fullName || fullName.length < 2) {
        if (errName) errName.style.display = 'block';
        hasError = true;
      } else if (errName) errName.style.display = 'none';

      // 2) Email
      const errEmail = document.getElementById('errEnquiryEmail');
      if (!email || !emailRegex.test(email)) {
        if (errEmail) errEmail.style.display = 'block';
        hasError = true;
      } else if (errEmail) errEmail.style.display = 'none';

      // 3) Phone
      const errPhone = document.getElementById('errEnquiryPhone');
      if (!phone || !phoneRegex.test(phone)) {
        if (errPhone) errPhone.style.display = 'block';
        hasError = true;
      } else if (errPhone) errPhone.style.display = 'none';

      // 4) Product
      const errProduct = document.getElementById('errEnquiryProduct');
      if (!product) {
        if (errProduct) errProduct.style.display = 'block';
        hasError = true;
      } else if (errProduct) errProduct.style.display = 'none';

      // 5) Address
      const errAddress = document.getElementById('errEnquiryAddress');
      if (!address || address.length < 3) {
        if (errAddress) errAddress.style.display = 'block';
        hasError = true;
      } else if (errAddress) errAddress.style.display = 'none';

      // 6) Subject
      const errSubject = document.getElementById('errEnquirySubject');
      if (!subject || subject.length < 2) {
        if (errSubject) errSubject.style.display = 'block';
        hasError = true;
      } else if (errSubject) errSubject.style.display = 'none';

      // 7) Message
      const errMessage = document.getElementById('errEnquiryMessage');
      if (!message || message.length < 5) {
        if (errMessage) errMessage.style.display = 'block';
        hasError = true;
      } else if (errMessage) errMessage.style.display = 'none';

      // 8) Captcha Code Verification (QA Item 27)
      const errCaptcha = document.getElementById('errEnquiryCaptcha');
      if (!inputCaptcha || inputCaptcha !== currentModalCaptchaCode) {
        if (errCaptcha) errCaptcha.style.display = 'block';
        hasError = true;
      } else if (errCaptcha) errCaptcha.style.display = 'none';

      // 9) Google reCAPTCHA Verification (QA Item 27)
      const errRobot = document.getElementById('errEnquiryRecaptcha');
      const widget = document.getElementById('enquiryRecaptchaWidget');
      if (!isModalRobotVerified) {
        if (errRobot) errRobot.style.display = 'block';
        if (widget) widget.classList.add('has-error');
        hasError = true;
      } else {
        if (errRobot) errRobot.style.display = 'none';
        if (widget) widget.classList.remove('has-error');
      }

      if (hasError) return;

      const submitBtn = document.getElementById('enquirySubmitBtn');
      const originalHtml = submitBtn.innerHTML;
      submitBtn.innerHTML = '<span>Enquiry Submitted! ✓</span>';
      submitBtn.style.background = '#0a9b61';

      setTimeout(() => {
        alert(`Thank you, ${fullName}! Your enquiry for "${product}" has been received. Our team will contact you at ${phone} / ${email} shortly.`);
        form.reset();
        submitBtn.innerHTML = originalHtml;
        submitBtn.style.background = '';
        closeEnquiryModal();
      }, 700);
    });
  }
}

/* ========================================================
   FLOATING ACTION BUTTONS (QA Item 5: Whatsapp, Call, Top to Scroll)
======================================================== */
function initFloatingActionButtons() {
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 250) {
        scrollTopBtn.classList.add('is-visible');
      } else {
        scrollTopBtn.classList.remove('is-visible');
      }
    }, { passive: true });

    scrollTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Mega-menu click toggle for touch devices (QA Item 22)
  const dropdownItem = document.getElementById('navProductDropdown');
  const dropdownTrigger = document.getElementById('navProductTrigger');
  if (dropdownItem && dropdownTrigger) {
    dropdownTrigger.addEventListener('click', (e) => {
      const isTouch = window.matchMedia('(pointer: coarse)').matches;
      if (isTouch) {
        if (!dropdownItem.classList.contains('is-open')) {
          e.preventDefault();
          dropdownItem.classList.add('is-open');
        } else {
          dropdownItem.classList.remove('is-open');
        }
      }
    });

    document.addEventListener('click', (e) => {
      if (!dropdownItem.contains(e.target)) {
        dropdownItem.classList.remove('is-open');
      }
    });
  }
}

