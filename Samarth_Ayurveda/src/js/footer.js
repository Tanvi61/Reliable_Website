/**
 * Samarth Ayurveda - Modular Footer Component
 * Fulfills QA Checklist Item 4, 12, 16, 28:
 * - Logo, about, Quick Links, Contact Us, Map link
 * - Social Media Icons (opening in new tab)
 * - Review Us on Google + Link (Google Business Page)
 * - Company website + link, Year, Centered Copyright
 */

export function renderFooter(containerEl) {
  if (!containerEl) return;

  const currentYear = new Date().getFullYear();

  containerEl.innerHTML = `
    <footer class="site-footer" id="siteFooter">
      <div class="footer-container">
        <!-- Top Newsletter Row -->
        <div class="footer-newsletter-wrap">
          <div class="footer-newsletter-info">
            <span class="footer-newsletter-eyebrow">Stay Connected With Nature</span>
            <h2 class="footer-newsletter-title">Subscribe For Updates,<br />Haircare Tips &amp; Exclusive Offers</h2>
          </div>
          <div class="footer-newsletter-form-wrap">
            <form class="footer-newsletter-form" id="footerNewsletterForm">
              <div class="footer-newsletter-pill">
                <input class="footer-newsletter-input" id="footerEmailInput" type="email" placeholder="Enter your email address" required autocomplete="email" />
                <button class="footer-newsletter-btn" type="submit" aria-label="Subscribe to newsletter">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M7.5 4.5L13 10L7.5 15.5"/>
                  </svg>
                </button>
              </div>
              <p class="footer-newsletter-disclaimer">
                By subscribing, you agree to our <a href="#" data-policy="terms">Terms of Service</a> &amp; <a href="#" data-policy="privacy">Privacy Policy</a>.
              </p>
            </form>
          </div>
        </div>

        <!-- Main Footer 4-Column Grid -->
        <div class="footer-main-grid">
          <!-- Col 1: Brand & About -->
          <div class="footer-col footer-col-about">
            <div class="footer-brand-logo">
              <a href="#home" data-route="home" class="footer-logo-link">
                <span class="footer-logo-title">Ayurveda</span>
              </a>
            </div>
            <p class="footer-about-text">
              Samarth Ayurveda brings 100% pure, natural, and handcrafted herbal haircare inspired by authentic Ayurvedic traditions. Formulated without harsh chemicals to nourish your hair naturally.
            </p>

            <!-- Google Review Badge & Link -->
            <div class="footer-google-review-wrap">
              <a href="https://maps.google.com/?q=Samarth+Ayurveda" target="_blank" rel="noopener noreferrer" class="footer-google-review-btn">
                <span class="google-icon-svg">
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                  </svg>
                </span>
                <span class="google-review-text">
                  <strong>Review Us On Google</strong>
                  <span class="stars-gold">★★★★★ 4.9/5 Rating</span>
                </span>
              </a>
            </div>

            <!-- Social Media Icons (Open in New Tab) -->
            <div class="footer-social-row">
              <a href="https://www.facebook.com/sonaherbal" target="_blank" rel="noopener noreferrer" class="footer-social-btn" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="https://www.instagram.com/sonaliwaghmode8669/" target="_blank" rel="noopener noreferrer" class="footer-social-btn" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="https://wa.me/919325260725?text=Hello%20Ayurveda" target="_blank" rel="noopener noreferrer" class="footer-social-btn" aria-label="WhatsApp">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
              </a>
            </div>
          </div>

          <!-- Col 2: Quick Links -->
          <div class="footer-col footer-col-links">
            <h3 class="footer-col-title">Quick Links</h3>
            <ul class="footer-links-list">
              <li><a class="footer-link" href="#home" data-route="home">Home</a></li>
              <li><a class="footer-link" href="#about" data-route="about">About Us</a></li>
              <li><a class="footer-link" href="#products" data-route="products">Products</a></li>
              <li><a class="footer-link" href="#contact" data-route="contact">Contact Us</a></li>
              <li><a class="footer-link track-order-trigger" href="#orders" data-route="orders">Track Orders</a></li>
              <li><a class="footer-link" href="#account" data-route="account">My Account</a></li>
            </ul>
          </div>

          <!-- Col 3: Products -->
          <div class="footer-col footer-col-products">
            <h3 class="footer-col-title">Our Products</h3>
            <ul class="footer-links-list">
              <li><a class="footer-link" href="#products" data-route="products">Home Made Hair Oil</a></li>
              <li><a class="footer-link" href="#products" data-route="products">Herbal Shampoo</a></li>
              <li><a class="footer-link" href="#products" data-route="products">Homemade Mehndi Powder</a></li>
              <li><a class="footer-link" href="#products" data-route="products">Nourishment Conditioner</a></li>
              <li><a class="footer-link" href="#products" data-route="products">Rosemary Hair Growth Spray</a></li>
              <li><a class="footer-link" href="#products" data-route="products">Big Combo Pro Max</a></li>
            </ul>
          </div>

          <!-- Col 4: Contact Us & Map -->
          <div class="footer-col footer-col-contact">
            <h3 class="footer-col-title">Contact Us</h3>
            <ul class="footer-contact-info-list">
              <li>
                <span class="fci-icon">📍</span>
                <span>Samarth Ayurveda, Katraj-Pune, Maharashtra 411046, India</span>
              </li>
              <li>
                <span class="fci-icon">📞</span>
                <a href="tel:+919325260725" class="footer-link">+91 93252 60725</a>
              </li>
              <li>
                <span class="fci-icon">✉️</span>
                <a href="mailto:info@samarthayurveda.com" class="footer-link">info@samarthayurveda.com</a>
              </li>
              <li>
                <span class="fci-icon">🌐</span>
                <a href="https://samarthayurveda.com" target="_blank" rel="noopener noreferrer" class="footer-link">www.samarthayurveda.com</a>
              </li>
            </ul>

            <!-- Interactive Map Preview Embed & Button (Company Original Location: Katraj, Pune) -->
            <div class="footer-map-action" style="display: flex; flex-direction: column; gap: 8px;">
              <div class="footer-map-embed" style="width: 100%; max-width: 260px; height: 110px; border-radius: 8px; overflow: hidden; border: 1px solid rgba(4, 46, 9, 0.2); box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15138.455088998818!2d73.8567!3d18.4529!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2ea946d49f05f%3A0xb31a96570d6eb773!2sKatraj%2C%20Pune%2C%20Maharashtra%20411046!5e0!3m2!1sen!2sin!4v1711200000000!5m2!1sen!2sin" width="100%" height="100%" style="border:0; display:block;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Samarth Ayurveda Katraj Pune Location"></iframe>
              </div>
              <a href="https://maps.google.com/?q=Katraj+Pune+Maharashtra+411046" target="_blank" rel="noopener noreferrer" class="footer-map-btn">
                <span>View On Google Maps ↗</span>
              </a>
            </div>
          </div>
        </div>

        <!-- Center Copyright Bar (QA Item 16: Verify company name and copyright both center of footer) -->
        <div class="footer-bottom-bar-centered">
          <div class="footer-centered-copyright">
            <p>© ${currentYear} <strong>Samarth Ayurveda</strong>. All Rights Reserved. | <a href="https://samarthayurveda.com" target="_blank" rel="noopener noreferrer" class="footer-site-link">www.samarthayurveda.com</a></p>
          </div>
          <div class="footer-policy-row">
            <a href="#" data-policy="terms">Terms of Service</a>
            <span>•</span>
            <a href="#" data-policy="privacy">Privacy Policy</a>
            <span>•</span>
            <a href="#" data-policy="refund">Refund Policy</a>
            <span>•</span>
            <a href="#" data-policy="shipping">Shipping Policy</a>
          </div>
        </div>
      </div>
    </footer>
  `;
}
