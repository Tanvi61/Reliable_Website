import { products } from '../data/products.js';
import { cart } from './cart.js';

export function renderProductDetail(productId, containerEl) {
  const product = products.find(p => p.id === productId);
  if (!product || !containerEl) return;

  const discountPercent = product.discountPercent || (product.regularPrice > product.salePrice ? Math.round(((product.regularPrice - product.salePrice) / product.regularPrice) * 100) : 0);

  containerEl.innerHTML = `
    <div class="pdp-section">
      <div class="site-container">
        <!-- Breadcrumbs -->
        <div class="pdp-breadcrumbs">
          <a href="#home" data-route="home">Home</a> &nbsp;/&nbsp; 
          <a href="#products" data-route="products">Our Products</a> &nbsp;/&nbsp; 
          <span>${product.title}</span>
        </div>

        <div class="pdp-grid">
          <!-- Gallery -->
          <div class="pdp-gallery-wrap">
            <div class="pdp-main-image-box">
              <img id="pdpMainImage" class="pdp-main-img" src="${product.primaryImg}" alt="${product.title}" />
            </div>
            <div class="pdp-thumbs-row">
              ${product.gallery.map((img, i) => `
                <button class="pdp-thumb-btn ${i === 0 ? 'active' : ''}" data-src="${img}">
                  <img src="${img}" alt="${product.title} preview ${i+1}" />
                </button>
              `).join('')}
            </div>
          </div>

          <!-- Info & Actions -->
          <div class="pdp-info-wrap">
            ${discountPercent > 0 ? `<div class="pdp-badge-pill">Save ${discountPercent}%</div>` : ''}
            <h1 class="pdp-title">${product.title}</h1>

            <div class="pdp-ratings-row">
              <span class="stars-gold">★★★★★</span>
              <strong>${product.rating}</strong>
              <span class="rating-count">(${product.reviewsCount} verified customer reviews)</span>
            </div>

            <div class="pdp-price-row">
              <div class="pdp-sale-price">Rs. ${product.salePrice.toLocaleString()}.00</div>
              ${product.regularPrice > product.salePrice ? `
                <div class="pdp-regular-price">Rs. ${product.regularPrice.toLocaleString()}.00</div>
                <div class="pdp-discount-badge">${discountPercent}% OFF</div>
              ` : ''}
            </div>

            <p style="font-size: 15px; color: #444; line-height: 1.6; margin-bottom: 24px;">
              ${product.shortDesc}
            </p>

            <div class="pdp-actions-box">
              <div class="pdp-qty-label">Quantity</div>
              <div class="pdp-qty-control">
                <button class="pdp-qty-btn" id="pdpQtyDec">−</button>
                <span class="pdp-qty-val" id="pdpQtyVal">1</span>
                <button class="pdp-qty-btn" id="pdpQtyInc">+</button>
              </div>

              <div class="pdp-btn-row">
                <button class="btn-add-cart-large" id="pdpAddToCartBtn">
                  <span>Add to Cart</span>
                </button>
                <button class="btn-buy-now" id="pdpBuyNowBtn">
                  <span>Buy It Now</span>
                </button>
              </div>
            </div>

            <!-- Trust Indicators -->
            <div class="pdp-trust-grid">
              <div class="pdp-trust-item">
                <div class="pdp-trust-icon">🚚</div>
                <div>Free Shipping Over ₹999</div>
              </div>
              <div class="pdp-trust-item">
                <div class="pdp-trust-icon">⚡</div>
                <div>Fast 3-Day Delivery</div>
              </div>
              <div class="pdp-trust-item">
                <div class="pdp-trust-icon">🛡️</div>
                <div>100% Genuine Herbal</div>
              </div>
            </div>

            <!-- Accordions -->
            <div class="pdp-accordions">
              <div class="pdp-acc-item open">
                <button class="pdp-acc-btn">
                  <span>Description</span>
                  <span class="icon">+</span>
                </button>
                <div class="pdp-acc-body">
                  <p>${product.description}</p>
                  <ul style="margin-top: 12px; padding-left: 20px;">
                    ${product.benefits.map(b => `<li style="margin-bottom: 6px;">${b}</li>`).join('')}
                  </ul>
                </div>
              </div>

              <div class="pdp-acc-item">
                <button class="pdp-acc-btn">
                  <span>Key Ingredients</span>
                  <span class="icon">+</span>
                </button>
                <div class="pdp-acc-body">
                  <p>${product.ingredients}</p>
                </div>
              </div>

              <div class="pdp-acc-item">
                <button class="pdp-acc-btn">
                  <span>How to Use</span>
                  <span class="icon">+</span>
                </button>
                <div class="pdp-acc-body">
                  <p>${product.howToUse}</p>
                </div>
              </div>

              <div class="pdp-acc-item">
                <button class="pdp-acc-btn">
                  <span>Shipping & Delivery Policy</span>
                  <span class="icon">+</span>
                </button>
                <div class="pdp-acc-body">
                  <p>At Ayurveda, we strive to deliver your order as quickly as possible. 93% of our orders are delivered within 3 days from the date of dispatch. Orders are usually processed and shipped within 24 hours of confirmation.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  `;

  // Image Switcher
  const mainImg = document.getElementById('pdpMainImage');
  const thumbBtns = containerEl.querySelectorAll('.pdp-thumb-btn');
  thumbBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      thumbBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      mainImg.src = btn.dataset.src;
    });
  });

  // Quantity controls
  let qty = 1;
  const qtyValEl = document.getElementById('pdpQtyVal');
  const qtyDec = document.getElementById('pdpQtyDec');
  const qtyInc = document.getElementById('pdpQtyInc');

  qtyDec.onclick = () => {
    if (qty > 1) {
      qty--;
      qtyValEl.textContent = qty;
    }
  };

  qtyInc.onclick = () => {
    qty++;
    qtyValEl.textContent = qty;
  };

  // Add to cart
  const addBtn = document.getElementById('pdpAddToCartBtn');
  addBtn.onclick = () => {
    cart.addItem(product.id, qty);
  };

  // Buy now
  const buyBtn = document.getElementById('pdpBuyNowBtn');
  buyBtn.onclick = () => {
    cart.addItem(product.id, qty);
    cart.openDrawer();
  };

  // Accordion toggle
  containerEl.querySelectorAll('.pdp-acc-btn').forEach(b => {
    b.onclick = () => {
      const parent = b.parentElement;
      parent.classList.toggle('open');
    };
  });
}
