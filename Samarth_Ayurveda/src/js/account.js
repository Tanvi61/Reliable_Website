/* ========================================================
   MY ACCOUNT & SIGN IN PAGE - AYURVEDA
   Authentication, OTP verification & Account Dashboard
======================================================== */

import { cart } from './cart.js';
import { products } from '../data/products.js';

const STORAGE_KEY = 'ayurveda_user';

export function getStoredUser() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function saveStoredUser(userData) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
  } catch (e) {
    console.error('Failed to save user session', e);
  }
}

export function clearStoredUser() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear user session', e);
  }
}

export function showAccountToast(message, icon = '🌿') {
  const existing = document.querySelector('.account-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'account-toast';
  toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-15px)';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}

/**
 * Main Render Function for Account / Sign In View
 */
export function renderAccountView(mainEl) {
  const user = getStoredUser();

  if (user && user.loggedIn) {
    renderDashboardView(mainEl, user);
  } else {
    renderAuthView(mainEl);
  }
}

/* ========================================================
   1. AUTHENTICATION VIEW (SIGN IN / SIGN UP)
======================================================== */
function renderAuthView(mainEl, initialTab = 'signin', loginMode = 'password') {
  mainEl.innerHTML = `
    <div class="account-page-wrapper">
      <div class="account-container">
        
        <!-- Breadcrumbs -->
        <nav class="account-breadcrumbs" aria-label="Breadcrumbs">
          <a href="#home" data-route="home">Home</a>
          <span class="sep">/</span>
          <span class="current">My Account</span>
        </nav>

        <div class="account-auth-grid">
          
          <!-- Left Column: Brand Heritage & Member Perks -->
          <div class="account-perks-card">
            <div class="account-perks-header">
              <span class="account-perks-badge">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                  <path d="M2 17l10 5 10-5"></path>
                  <path d="M2 12l10 5 10-5"></path>
                </svg>
                100% HOMEMADE AYURVEDA
              </span>
              <h1 class="account-perks-title">Welcome to the Ayurveda Family</h1>
              <p class="account-perks-desc">
                Sign in to manage your orders, track live doorstep deliveries, and enjoy handcrafted Ayurvedic hair remedies tailored for your scalp health.
              </p>
            </div>

            <!-- Perks List -->
            <div class="account-perks-list">
              <div class="account-perk-item">
                <div class="account-perk-icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="1" y="3" width="15" height="13"></rect>
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                    <circle cx="5.5" cy="18.5" r="2.5"></circle>
                    <circle cx="18.5" cy="18.5" r="2.5"></circle>
                  </svg>
                </div>
                <div class="account-perk-content">
                  <h4>1-Click Live Order Tracking</h4>
                  <p>Real-time delivery milestones, courier details & instant WhatsApp tracking alerts.</p>
                </div>
              </div>

              <div class="account-perk-item">
                <div class="account-perk-icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 21a9 9 0 0 0 9-9c0-4.97-4.03-9-9-9s-9 4.03-9 9a9 9 0 0 0 9 9Z"></path>
                    <path d="M12 3v18"></path>
                    <path d="M12 14l7-7"></path>
                  </svg>
                </div>
                <div class="account-perk-content">
                  <h4>Fresh Small-Batch Herb Access</h4>
                  <p>Priority access to freshly brewed batches of Sona's Homemade Hair Oil before open restocks.</p>
                </div>
              </div>

              <div class="account-perk-item">
                <div class="account-perk-icon-wrap">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                  </svg>
                </div>
                <div class="account-perk-content">
                  <h4>Personalized Ayurvedic Guidance</h4>
                  <p>Direct WhatsApp consultation with our haircare team for custom scalp routines.</p>
                </div>
              </div>
            </div>

            <!-- Customer Love Testimonial -->
            <div class="account-perks-testimonial">
              <div class="account-stars">★★★★★</div>
              <p class="account-testimonial-text">
                "Sona's homemade oil changed my hair within 3 weeks. Having an account makes reordering my monthly combo so fast and easy!"
              </p>
              <span class="account-testimonial-author">— Snehal Deshmukh, Pune</span>
            </div>
          </div>

          <!-- Right Column: Interactive Sign In / Sign Up Card -->
          <div class="account-auth-card" id="accountAuthCard">
            
            <!-- Segmented Tab Switcher -->
            <div class="account-tab-pills" role="tablist">
              <button 
                class="account-tab-pill ${initialTab === 'signin' ? 'is-active' : ''}" 
                id="tabBtnSignIn" 
                role="tab" 
                type="button">
                Sign In
              </button>
              <button 
                class="account-tab-pill ${initialTab === 'signup' ? 'is-active' : ''}" 
                id="tabBtnSignUp" 
                role="tab" 
                type="button">
                Create Account
              </button>
            </div>

            <!-- TAB 1: SIGN IN PANEL -->
            <div class="account-tab-panel" id="panelSignIn" style="${initialTab === 'signin' ? 'display:block;' : 'display:none;'}">
              <div class="account-form-head">
                <h2 class="account-form-title">Sign In to Ayurveda</h2>
                <p class="account-form-subtitle">Enter your details to access orders & saved information</p>
              </div>

              <!-- Switch between Password vs OTP -->
              <div class="account-mode-switcher">
                <span class="account-mode-text" id="accountModeLabel">
                  ${loginMode === 'password' ? 'Prefer fast OTP login?' : 'Prefer password login?'}
                </span>
                <button class="account-mode-btn" id="btnToggleLoginMode" type="button">
                  ${loginMode === 'password' ? 'Sign In with Mobile OTP' : 'Sign In with Password'}
                </button>
              </div>

              <!-- 1A: Password Form -->
              <form class="account-form" id="formSignInPassword" style="${loginMode === 'password' ? 'display:block;' : 'display:none;'}">
                <div class="account-form-group">
                  <label class="account-form-label" for="signInIdentifier">Mobile Number or Email</label>
                  <div class="account-input-wrap">
                    <span class="account-input-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </span>
                    <input 
                      class="account-input" 
                      id="signInIdentifier" 
                      type="text" 
                      placeholder="e.g. 9822012345 or user@example.com" 
                      required 
                      autocomplete="username" />
                  </div>
                </div>

                <div class="account-form-group">
                  <label class="account-form-label" for="signInPassword">Password</label>
                  <div class="account-input-wrap">
                    <span class="account-input-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                    </span>
                    <input 
                      class="account-input" 
                      id="signInPassword" 
                      type="password" 
                      placeholder="Enter your password" 
                      required 
                      autocomplete="current-password" />
                    <button class="account-toggle-pwd" id="btnTogglePassword" type="button" aria-label="Toggle password visibility">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                    </button>
                  </div>
                </div>

                <div class="account-form-meta-row">
                  <label class="account-remember-label">
                    <input class="account-remember-checkbox" type="checkbox" checked />
                    Remember me
                  </label>
                  <a class="account-forgot-link" id="linkForgotPassword" href="#forgot">Forgot Password?</a>
                </div>

                <button class="account-primary-btn" type="submit">
                  <span>Sign In</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>
              </form>

              <!-- 1B: OTP Form -->
              <form class="account-form" id="formSignInOtp" style="${loginMode === 'otp' ? 'display:block;' : 'display:none;'}">
                <div id="otpStepPhone">
                  <div class="account-form-group">
                    <label class="account-form-label" for="signInOtpPhone">10-Digit Mobile Number</label>
                    <div class="account-input-wrap">
                      <span class="account-input-icon">
                        <span style="font-weight: 700; color: #084e10; font-size: 13.5px;">+91</span>
                      </span>
                      <input 
                        class="account-input" 
                        id="signInOtpPhone" 
                        type="tel" 
                        maxlength="10" 
                        placeholder="e.g. 9822012345" 
                        required />
                    </div>
                  </div>

                  <button class="account-primary-btn" id="btnSendOtp" type="button">
                    <span>Send Verification Code (OTP)</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  </button>
                </div>

                <!-- OTP digits step (hidden initially) -->
                <div id="otpStepDigits" style="display: none;">
                  <p style="font-size: 13.5px; color: #435e4d; margin: 0 0 12px 0;">
                    Enter the 4-digit code sent to <strong id="otpDisplayPhone">+91 XXXXXXXX</strong>
                  </p>

                  <div class="account-otp-boxes">
                    <input class="account-otp-input" type="text" maxlength="1" inputmode="numeric" />
                    <input class="account-otp-input" type="text" maxlength="1" inputmode="numeric" />
                    <input class="account-otp-input" type="text" maxlength="1" inputmode="numeric" />
                    <input class="account-otp-input" type="text" maxlength="1" inputmode="numeric" />
                  </div>

                  <div class="account-resend-row">
                    <span>Didn't get code?</span>
                    <button class="account-resend-btn" id="btnResendOtp" type="button">Resend Code</button>
                  </div>

                  <button class="account-primary-btn" id="btnVerifyOtp" type="button">
                    <span>Verify & Access Account</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </button>
                </div>
              </form>

              <!-- Social / Google Divider -->
              <div class="account-divider">
                <span>or continue with</span>
              </div>

              <!-- Google One-Click Button -->
              <button class="account-secondary-btn" id="btnGoogleSignIn" type="button">
                <svg viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                </svg>
                Continue with Google
              </button>

              <!-- Guest Order Tracking Hint -->
              <div class="account-guest-note">
                Looking for an order placed without an account?<br />
                <a href="#orders" data-route="orders">Track order with Mobile Number →</a>
              </div>
            </div>

            <!-- TAB 2: CREATE ACCOUNT PANEL -->
            <div class="account-tab-panel" id="panelSignUp" style="${initialTab === 'signup' ? 'display:block;' : 'display:none;'}">
              <div class="account-form-head">
                <h2 class="account-form-title">Create Your Account</h2>
                <p class="account-form-subtitle">Join the Ayurveda family for personalized haircare and faster reordering</p>
              </div>

              <form class="account-form" id="formSignUp">
                <div class="account-form-group">
                  <label class="account-form-label" for="signUpName">Full Name</label>
                  <div class="account-input-wrap">
                    <span class="account-input-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </span>
                    <input 
                      class="account-input" 
                      id="signUpName" 
                      type="text" 
                      placeholder="e.g. Priya Sharma" 
                      required 
                      autocomplete="name" />
                  </div>
                </div>

                <div class="account-form-group">
                  <label class="account-form-label" for="signUpPhone">Mobile Number</label>
                  <div class="account-input-wrap">
                    <span class="account-input-icon">
                      <span style="font-weight: 700; color: #084e10; font-size: 13.5px;">+91</span>
                    </span>
                    <input 
                      class="account-input" 
                      id="signUpPhone" 
                      type="tel" 
                      maxlength="10" 
                      placeholder="e.g. 9822012345" 
                      required 
                      autocomplete="tel" />
                  </div>
                </div>

                <div class="account-form-group">
                  <label class="account-form-label" for="signUpEmail">Email Address</label>
                  <div class="account-input-wrap">
                    <span class="account-input-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </span>
                    <input 
                      class="account-input" 
                      id="signUpEmail" 
                      type="email" 
                      placeholder="e.g. priya@gmail.com" 
                      required 
                      autocomplete="email" />
                  </div>
                </div>

                <div class="account-form-group">
                  <label class="account-form-label" for="signUpPassword">Create Password</label>
                  <div class="account-input-wrap">
                    <span class="account-input-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                    </span>
                    <input 
                      class="account-input" 
                      id="signUpPassword" 
                      type="password" 
                      placeholder="At least 6 characters" 
                      minlength="6" 
                      required 
                      autocomplete="new-password" />
                  </div>
                </div>

                <!-- Primary Concern Selection -->
                <span class="account-concerns-label">Primary Hair Concern (Optional)</span>
                <div class="account-concerns-grid" id="signUpConcerns">
                  <button type="button" class="account-concern-chip is-selected" data-concern="Hair Fall Control">Hair Fall Control</button>
                  <button type="button" class="account-concern-chip" data-concern="Dandruff & Itch">Dandruff & Itch</button>
                  <button type="button" class="account-concern-chip" data-concern="Hair Growth & Density">Hair Growth & Density</button>
                  <button type="button" class="account-concern-chip" data-concern="Premature Greying">Premature Greying</button>
                  <button type="button" class="account-concern-chip" data-concern="Dry / Frizzy Hair">Dry & Frizzy Hair</button>
                </div>

                <div class="account-form-group">
                  <label class="account-remember-label">
                    <input class="account-remember-checkbox" id="signUpWhatsappConsent" type="checkbox" checked />
                    Send Ayurvedic hair tips & batch alerts on WhatsApp
                  </label>
                </div>

                <button class="account-primary-btn" type="submit">
                  <span>Create My Account</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </button>
              </form>
            </div>

            <!-- TAB 3: FORGOT PASSWORD PANEL -->
            <div class="account-tab-panel" id="panelForgot" style="display: none;">
              <div class="account-form-head">
                <h2 class="account-form-title">Reset Your Password</h2>
                <p class="account-form-subtitle">Enter your registered email or phone to receive instructions</p>
              </div>

              <form class="account-form" id="formForgotPassword">
                <div class="account-form-group">
                  <label class="account-form-label" for="forgotIdentifier">Email Address or Mobile</label>
                  <div class="account-input-wrap">
                    <span class="account-input-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                        <polyline points="22,6 12,13 2,6"></polyline>
                      </svg>
                    </span>
                    <input 
                      class="account-input" 
                      id="forgotIdentifier" 
                      type="text" 
                      placeholder="e.g. 9822012345 or user@example.com" 
                      required />
                  </div>
                </div>

                <button class="account-primary-btn" type="submit">
                  <span>Send Reset Link</span>
                </button>

                <div style="text-align: center; margin-top: 20px;">
                  <button class="account-mode-btn" id="btnBackToSignIn" type="button">
                    ← Back to Sign In
                  </button>
                </div>
              </form>
            </div>

          </div>

        </div>

      </div>
    </div>
  `;

  attachAuthEventListeners(mainEl);
}

/* ========================================================
   2. LOGGED-IN DASHBOARD VIEW
======================================================== */
function renderDashboardView(mainEl, user) {
  const initials = (user.name || 'Ayurveda User')
    .split(' ')
    .map(p => p[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  mainEl.innerHTML = `
    <div class="account-page-wrapper">
      <div class="account-container">
        
        <!-- Breadcrumbs -->
        <nav class="account-breadcrumbs" aria-label="Breadcrumbs">
          <a href="#home" data-route="home">Home</a>
          <span class="sep">/</span>
          <span class="current">My Account</span>
        </nav>

        <div class="account-dashboard-wrapper">
          
          <!-- Welcome Hero Banner -->
          <div class="account-dashboard-header">
            <div class="account-user-meta">
              <div class="account-avatar">${initials}</div>
              <div class="account-user-info">
                <h2>Namaste, ${user.name || 'Ayurveda Member'} 🌿</h2>
                <p>${user.email || user.phone || 'Ayurveda Premium Customer'} • Member since 2026</p>
              </div>
            </div>

            <button class="account-signout-btn" id="btnAccountSignOut" type="button">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                <polyline points="16 17 21 12 16 7"></polyline>
                <line x1="21" y1="12" x2="9" y2="12"></line>
              </svg>
              <span>Sign Out</span>
            </button>
          </div>

          <!-- 3-Column Dashboard Cards -->
          <div class="account-dash-grid">
            
            <!-- Card 1: Active Order -->
            <div class="account-dash-card">
              <div>
                <div class="account-dash-card-head">
                  <div class="account-dash-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="1" y="3" width="15" height="13"></rect>
                      <polygon points="16 8 20 8 23 11 23 16 16 16 8"></polygon>
                      <circle cx="5.5" cy="18.5" r="2.5"></circle>
                      <circle cx="18.5" cy="18.5" r="2.5"></circle>
                    </svg>
                  </div>
                  <h3 class="account-dash-card-title">Recent Order</h3>
                </div>

                <div class="account-order-preview">
                  <div class="account-order-id">
                    <span>#AYUR-84920</span>
                    <span class="account-order-badge">Dispatched</span>
                  </div>
                  <p class="account-order-item-name">Sona's Home Made Hair Oil (200ml) + Herbal Shampoo</p>
                  <span class="account-order-date">Expected delivery in 2 days via Delhivery</span>
                </div>
              </div>

              <a href="#orders" class="account-dash-btn" data-route="orders">
                Track Live Shipment →
              </a>
            </div>

            <!-- Card 2: Ayurvedic Hair Profile -->
            <div class="account-dash-card">
              <div>
                <div class="account-dash-card-head">
                  <div class="account-dash-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                      <path d="M2 17l10 5 10-5"></path>
                      <path d="M2 12l10 5 10-5"></path>
                    </svg>
                  </div>
                  <h3 class="account-dash-card-title">Ayurvedic Hair Profile</h3>
                </div>

                <div class="account-order-preview">
                  <div class="account-order-id">
                    <span>Focus Area</span>
                    <span class="account-order-badge">${user.concern || 'Hair Fall Control'}</span>
                  </div>
                  <p class="account-order-item-name">Custom Scalp Regimen: 3x Night Massage + Rosemary Mist</p>
                  <span class="account-order-date">Formulated with 100% pure Ayurvedic oils</span>
                </div>
              </div>

              <a href="https://wa.me/919325260725?text=Hello%20Ayurveda%20Team%2C%20I%20need%20haircare%20guidance%20for%20my%20account" target="_blank" class="account-dash-btn">
                Ask Vaidya on WhatsApp
              </a>
            </div>

            <!-- Card 3: Saved Delivery Address -->
            <div class="account-dash-card">
              <div>
                <div class="account-dash-card-head">
                  <div class="account-dash-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <h3 class="account-dash-card-title">Saved Address</h3>
                </div>

                <div class="account-order-preview">
                  <div class="account-order-id">
                    <span>${user.name || 'Primary Delivery'}</span>
                    <span class="account-order-badge">Default</span>
                  </div>
                  <p class="account-order-item-name">Flat 402, Green Meadows, MG Road, Pune, Maharashtra - 411001</p>
                  <span class="account-order-date">Phone: ${user.phone || '+91 9325260725'}</span>
                </div>
              </div>

              <a href="#products" class="account-dash-btn" data-route="products">
                Shop Our Products →
              </a>
            </div>

          </div>

          <!-- Quick Reorder Favorites -->
          <div style="background: #ffffff; border: 1px solid #e1ede3; border-radius: 18px; padding: 28px; margin-top: 10px;">
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;">
              <h3 style="margin: 0; font-size: 20px; font-weight: 800; color: #0b3318;">Handcrafted Favorites for You</h3>
              <a href="#products" data-route="products" style="color: #084e10; font-weight: 700; text-decoration: none; font-size: 14px;">View All Products →</a>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px;">
              ${products.slice(0, 3).map(p => `
                <div style="display: flex; gap: 14px; align-items: center; padding: 12px; background: #fbfdfb; border: 1px solid #e8f2ea; border-radius: 14px;">
                  <img src="${p.primaryImg}" alt="${p.title}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 10px;" />
                  <div style="flex: 1; min-width: 0;">
                    <div style="font-size: 13.5px; font-weight: 700; color: #172c1c; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${p.title.split('|')[0].trim()}</div>
                    <div style="font-size: 13px; font-weight: 800; color: #084e10; margin-top: 2px;">₹${p.salePrice || p.regularPrice}</div>
                    <button class="account-quick-reorder-btn" data-product-id="${p.id}" style="margin-top: 6px; padding: 5px 12px; border-radius: 20px; background: #084e10; color: #fff; font-size: 11.5px; font-weight: 700; border: none; cursor: pointer;">
                      + Quick Reorder
                    </button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

        </div>

      </div>
    </div>
  `;

  // Attach Dashboard Event Listeners
  const signOutBtn = document.getElementById('btnAccountSignOut');
  if (signOutBtn) {
    signOutBtn.onclick = () => {
      clearStoredUser();
      showAccountToast('You have been signed out successfully.', '👋');
      renderAccountView(mainEl);
    };
  }

  // Quick reorder buttons
  mainEl.querySelectorAll('.account-quick-reorder-btn').forEach(btn => {
    btn.onclick = () => {
      const pid = Number(btn.dataset.productId);
      const pr = products.find(p => p.id === pid);
      if (pr) {
        cart.addItem(pr, 1);
        showAccountToast(`${pr.title} added to your cart!`, '🛒');
      }
    };
  });
}

/* ========================================================
   3. ATTACH AUTH EVENT LISTENERS
======================================================== */
function attachAuthEventListeners(mainEl) {
  // Tab Switcher
  const tabSignIn = document.getElementById('tabBtnSignIn');
  const tabSignUp = document.getElementById('tabBtnSignUp');
  const panelSignIn = document.getElementById('panelSignIn');
  const panelSignUp = document.getElementById('panelSignUp');
  const panelForgot = document.getElementById('panelForgot');

  if (tabSignIn && tabSignUp) {
    tabSignIn.onclick = () => {
      tabSignIn.classList.add('is-active');
      tabSignUp.classList.remove('is-active');
      panelSignIn.style.display = 'block';
      panelSignUp.style.display = 'none';
      if (panelForgot) panelForgot.style.display = 'none';
    };

    tabSignUp.onclick = () => {
      tabSignUp.classList.add('is-active');
      tabSignIn.classList.remove('is-active');
      panelSignUp.style.display = 'block';
      panelSignIn.style.display = 'none';
      if (panelForgot) panelForgot.style.display = 'none';
    };
  }

  // Forgot password link & Back button
  const linkForgot = document.getElementById('linkForgotPassword');
  const btnBackToSignIn = document.getElementById('btnBackToSignIn');

  if (linkForgot) {
    linkForgot.onclick = (e) => {
      e.preventDefault();
      panelSignIn.style.display = 'none';
      panelSignUp.style.display = 'none';
      if (panelForgot) panelForgot.style.display = 'block';
    };
  }

  if (btnBackToSignIn) {
    btnBackToSignIn.onclick = () => {
      if (panelForgot) panelForgot.style.display = 'none';
      panelSignIn.style.display = 'block';
      tabSignIn.classList.add('is-active');
      tabSignUp.classList.remove('is-active');
    };
  }

  // Toggle Password Visibility
  const togglePwdBtn = document.getElementById('btnTogglePassword');
  const pwdInput = document.getElementById('signInPassword');
  if (togglePwdBtn && pwdInput) {
    togglePwdBtn.onclick = () => {
      const isPwd = pwdInput.type === 'password';
      pwdInput.type = isPwd ? 'text' : 'password';
      togglePwdBtn.style.color = isPwd ? '#084e10' : '#7a9482';
    };
  }

  // Switch between Password vs OTP Login
  const btnToggleMode = document.getElementById('btnToggleLoginMode');
  const modeLabel = document.getElementById('accountModeLabel');
  const formPassword = document.getElementById('formSignInPassword');
  const formOtp = document.getElementById('formSignInOtp');

  let currentMode = 'password';

  if (btnToggleMode) {
    btnToggleMode.onclick = () => {
      if (currentMode === 'password') {
        currentMode = 'otp';
        modeLabel.textContent = 'Prefer password login?';
        btnToggleMode.textContent = 'Sign In with Password';
        formPassword.style.display = 'none';
        formOtp.style.display = 'block';
      } else {
        currentMode = 'password';
        modeLabel.textContent = 'Prefer fast OTP login?';
        btnToggleMode.textContent = 'Sign In with Mobile OTP';
        formOtp.style.display = 'none';
        formPassword.style.display = 'block';
      }
    };
  }

  // OTP Form interactions
  const btnSendOtp = document.getElementById('btnSendOtp');
  const otpPhoneInput = document.getElementById('signInOtpPhone');
  const otpStepPhone = document.getElementById('otpStepPhone');
  const otpStepDigits = document.getElementById('otpStepDigits');
  const otpDisplayPhone = document.getElementById('otpDisplayPhone');
  const btnVerifyOtp = document.getElementById('btnVerifyOtp');
  const btnResendOtp = document.getElementById('btnResendOtp');
  const otpBoxes = mainEl.querySelectorAll('.account-otp-input');

  if (btnSendOtp && otpPhoneInput) {
    btnSendOtp.onclick = () => {
      const val = otpPhoneInput.value.trim().replace(/\D/g, '');
      if (val.length < 10) {
        showAccountToast('Please enter a valid 10-digit mobile number', '⚠️');
        otpPhoneInput.focus();
        return;
      }

      otpDisplayPhone.textContent = `+91 ${val.slice(0, 2)}••••••${val.slice(-2)}`;
      otpStepPhone.style.display = 'none';
      otpStepDigits.style.display = 'block';
      showAccountToast(`OTP sent to +91 ${val}. (Use code: 4920)`, '📲');

      // Autofocus first digit box
      if (otpBoxes.length > 0) otpBoxes[0].focus();
    };
  }

  // Auto-focus next OTP input on keyup
  otpBoxes.forEach((box, idx) => {
    box.addEventListener('input', (e) => {
      const val = e.target.value.replace(/\D/g, '');
      e.target.value = val;
      if (val && idx < otpBoxes.length - 1) {
        otpBoxes[idx + 1].focus();
      }
    });

    box.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !box.value && idx > 0) {
        otpBoxes[idx - 1].focus();
      }
    });
  });

  if (btnResendOtp) {
    btnResendOtp.onclick = () => {
      showAccountToast('A new 4-digit OTP has been sent. Code: 4920', '📲');
    };
  }

  if (btnVerifyOtp) {
    btnVerifyOtp.onclick = () => {
      const enteredOtp = Array.from(otpBoxes).map(b => b.value).join('');
      if (enteredOtp.length < 4) {
        showAccountToast('Please enter the 4-digit code', '⚠️');
        return;
      }

      const phone = otpPhoneInput.value.trim();
      const user = {
        name: 'Ayurveda Member',
        phone: `+91 ${phone}`,
        email: 'member@ayurveda.in',
        loggedIn: true,
        concern: 'Hair Fall Control'
      };
      saveStoredUser(user);
      showAccountToast('Phone verified! Welcome back to Ayurveda.', '🌿');
      renderDashboardView(mainEl, user);
    };
  }

  // Password Sign In Form Submission
  if (formPassword) {
    formPassword.onsubmit = (e) => {
      e.preventDefault();
      const identifier = document.getElementById('signInIdentifier').value.trim();
      const password = document.getElementById('signInPassword').value;

      if (!identifier || !password) {
        showAccountToast('Please fill in both fields', '⚠️');
        return;
      }

      const isEmail = identifier.includes('@');
      const displayName = isEmail
        ? identifier.split('@')[0].replace(/[^a-zA-Z]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()).trim() || 'Ayurveda Member'
        : 'Ayurveda Member';

      const user = {
        name: displayName,
        email: isEmail ? identifier : `${identifier}@ayurveda.in`,
        phone: !isEmail ? `+91 ${identifier}` : '+91 9325260725',
        loggedIn: true,
        concern: 'Hair Fall Control'
      };

      saveStoredUser(user);
      showAccountToast(`Welcome back, ${user.name}!`, '🌿');
      renderDashboardView(mainEl, user);
    };
  }

  // Google 1-Click Sign In
  const btnGoogle = document.getElementById('btnGoogleSignIn');
  if (btnGoogle) {
    btnGoogle.onclick = () => {
      const user = {
        name: 'Priya Sharma',
        email: 'priya.sharma@gmail.com',
        phone: '+91 98220 12345',
        loggedIn: true,
        concern: 'Hair Growth & Density'
      };
      saveStoredUser(user);
      showAccountToast('Signed in with Google! Welcome Priya.', '🌿');
      renderDashboardView(mainEl, user);
    };
  }

  // Concern chips in Create Account form
  mainEl.querySelectorAll('.account-concern-chip').forEach(chip => {
    chip.onclick = () => {
      mainEl.querySelectorAll('.account-concern-chip').forEach(c => c.classList.remove('is-selected'));
      chip.classList.add('is-selected');
    };
  });

  // Create Account Form Submission
  const formSignUp = document.getElementById('formSignUp');
  if (formSignUp) {
    formSignUp.onsubmit = (e) => {
      e.preventDefault();
      const name = document.getElementById('signUpName').value.trim();
      const phone = document.getElementById('signUpPhone').value.trim();
      const email = document.getElementById('signUpEmail').value.trim();
      const password = document.getElementById('signUpPassword').value;
      const selectedChip = mainEl.querySelector('.account-concern-chip.is-selected');
      const concern = selectedChip ? selectedChip.dataset.concern : 'Hair Fall Control';

      if (!name || !phone || !email || !password) {
        showAccountToast('Please complete all required fields', '⚠️');
        return;
      }

      const user = {
        name: name,
        email: email,
        phone: `+91 ${phone.replace(/\D/g, '')}`,
        concern: concern,
        loggedIn: true
      };

      saveStoredUser(user);
      showAccountToast(`Account created! Welcome to the Ayurveda family, ${name} 🌿`, '🎉');
      renderDashboardView(mainEl, user);
    };
  }

  // Forgot Password Form Submission
  const formForgot = document.getElementById('formForgotPassword');
  if (formForgot) {
    formForgot.onsubmit = (e) => {
      e.preventDefault();
      const ident = document.getElementById('forgotIdentifier').value.trim();
      if (!ident) {
        showAccountToast('Please enter your email or mobile', '⚠️');
        return;
      }
      showAccountToast(`Password reset link sent to ${ident}`, '📧');
      setTimeout(() => {
        if (panelForgot) panelForgot.style.display = 'none';
        if (panelSignIn) panelSignIn.style.display = 'block';
        if (tabSignIn) tabSignIn.classList.add('is-active');
      }, 1500);
    };
  }
}
