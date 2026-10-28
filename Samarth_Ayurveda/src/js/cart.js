import { products } from '../data/products.js';

class CartManager {
  constructor() {
    this.items = this.loadCart();
    this.promoDiscount = 0;
    this.promoCode = '';
    this.freeShippingThreshold = 999;
  }

  loadCart() {
    try {
      const saved = localStorage.getItem('sona_herbal_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem('sona_herbal_cart', JSON.stringify(this.items));
    } catch (e) {}
    this.render();
  }

  addItem(productId, qty = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existing = this.items.find(item => item.id === productId);
    if (existing) {
      existing.qty += qty;
    } else {
      this.items.push({
        id: product.id,
        title: product.title,
        price: product.salePrice,
        regularPrice: product.regularPrice,
        img: product.primaryImg,
        qty: qty
      });
    }
    this.saveCart();
    this.openDrawer();
  }

  updateQty(productId, delta) {
    const item = this.items.find(i => i.id === productId);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      this.removeItem(productId);
    } else {
      this.saveCart();
    }
  }

  removeItem(productId) {
    this.items = this.items.filter(i => i.id !== productId);
    this.saveCart();
  }

  getTotalCount() {
    return this.items.reduce((sum, item) => sum + item.qty, 0);
  }

  getSubtotal() {
    return this.items.reduce((sum, item) => sum + (item.price * item.qty), 0);
  }

  getTotal() {
    const subtotal = this.getSubtotal();
    return Math.max(0, subtotal - this.promoDiscount);
  }

  applyPromo(code) {
    if (!code) return { success: false, message: 'Please enter a code' };
    const clean = code.trim().toUpperCase();
    if (clean === 'HERBAL10' || clean === 'SONA10') {
      const discount = Math.round(this.getSubtotal() * 0.1);
      this.promoDiscount = discount;
      this.promoCode = clean;
      this.render();
      return { success: true, message: '10% Discount applied!' };
    }
    if (clean === 'PREPAID200') {
      this.promoDiscount = 200;
      this.promoCode = clean;
      this.render();
      return { success: true, message: '₹200 Prepaid Discount applied!' };
    }
    return { success: false, message: 'Invalid promo code' };
  }

  openDrawer() {
    const drawer = document.getElementById('cartDrawer');
    const backdrop = document.getElementById('modalBackdrop');
    if (drawer && backdrop) {
      drawer.classList.add('open');
      backdrop.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  closeDrawer() {
    const drawer = document.getElementById('cartDrawer');
    const backdrop = document.getElementById('modalBackdrop');
    if (drawer && backdrop) {
      drawer.classList.remove('open');
      backdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  render() {
    // 1. Update cart bubbles in header
    const bubbles = document.querySelectorAll('.cart-count-bubble');
    const count = this.getTotalCount();
    bubbles.forEach(b => {
      b.textContent = count;
      b.style.display = count > 0 ? 'flex' : 'none';
    });

    // 2. Update cart drawer contents
    const cartBody = document.getElementById('cartDrawerBody');
    const cartSubtotalEl = document.getElementById('cartSubtotal');
    const freeShippingText = document.getElementById('freeShippingText');
    const freeShippingFill = document.getElementById('freeShippingFill');

    if (!cartBody) return;

    if (this.items.length === 0) {
      cartBody.innerHTML = `
        <div class="cart-empty-state">
          <div class="cart-empty-icon">🌿</div>
          <h3>Your cart is empty</h3>
          <p>Explore our natural herbal haircare collection crafted with pure village wisdom.</p>
          <button class="cart-empty-btn" id="continueShoppingBtn">Shop Herbal Care</button>
        </div>
      `;
      const btn = document.getElementById('continueShoppingBtn');
      if (btn) btn.onclick = () => this.closeDrawer();
      if (cartSubtotalEl) cartSubtotalEl.textContent = 'Rs. 0.00';
      if (freeShippingText) freeShippingText.textContent = `Add Rs. ${this.freeShippingThreshold} more for Free Express Delivery!`;
      if (freeShippingFill) freeShippingFill.style.width = '0%';
      return;
    }

    // Free shipping progress
    const subtotal = this.getSubtotal();
    const remaining = this.freeShippingThreshold - subtotal;
    if (remaining <= 0) {
      if (freeShippingText) freeShippingText.innerHTML = `🎉 <strong>Congratulations!</strong> You unlocked FREE Shipping across India!`;
      if (freeShippingFill) freeShippingFill.style.width = '100%';
    } else {
      const pct = Math.min(100, Math.round((subtotal / this.freeShippingThreshold) * 100));
      if (freeShippingText) freeShippingText.innerHTML = `🚚 Add <strong>Rs. ${remaining.toLocaleString()}</strong> more for <strong>FREE Express Shipping</strong>!`;
      if (freeShippingFill) freeShippingFill.style.width = `${pct}%`;
    }

    // Render items
    cartBody.innerHTML = this.items.map(item => `
      <div class="cart-item">
        <img class="cart-item-img" src="${item.img}" alt="${item.title}" />
        <div class="cart-item-details">
          <h4 class="cart-item-title">${item.title}</h4>
          <div class="cart-item-price">Rs. ${(item.price * item.qty).toLocaleString()}</div>
          <div class="cart-item-actions">
            <div class="qty-control">
              <button class="qty-btn" data-action="dec" data-id="${item.id}">−</button>
              <span class="qty-number">${item.qty}</span>
              <button class="qty-btn" data-action="inc" data-id="${item.id}">+</button>
            </div>
            <button class="cart-item-remove" data-action="remove" data-id="${item.id}">Remove</button>
          </div>
        </div>
      </div>
    `).join('');

    // Attach item listeners
    cartBody.querySelectorAll('.qty-btn').forEach(b => {
      b.onclick = () => {
        const id = Number(b.dataset.id);
        const action = b.dataset.action;
        this.updateQty(id, action === 'inc' ? 1 : -1);
      };
    });

    cartBody.querySelectorAll('.cart-item-remove').forEach(b => {
      b.onclick = () => {
        const id = Number(b.dataset.id);
        this.removeItem(id);
      };
    });

    if (cartSubtotalEl) {
      cartSubtotalEl.textContent = `Rs. ${this.getTotal().toLocaleString()}.00`;
    }
  }
}

export const cart = new CartManager();
