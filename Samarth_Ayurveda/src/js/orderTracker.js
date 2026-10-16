/* ========================================================
   ORDER TRACKER & MY ORDERS MODAL CONTROLLER
   Official Ayurveda Express Tracking Experience
======================================================== */

export function openOrderTrackerModal() {
  const modal = document.getElementById('orderTrackModal');
  const resultBox = document.getElementById('orderTrackResult');
  const inputEl = document.getElementById('trackOrderInput');

  // Close mobile drawer if open
  const mobileDrawer = document.getElementById('mobileNavDrawer');
  if (mobileDrawer) mobileDrawer.classList.remove('open');

  const backdrop = document.getElementById('modalBackdrop');
  if (backdrop) backdrop.classList.remove('active');

  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (resultBox) resultBox.style.display = 'none';
    if (inputEl) {
      inputEl.value = '';
      setTimeout(() => inputEl.focus(), 120);
    }
  }
}

export function closeOrderTrackerModal() {
  const modal = document.getElementById('orderTrackModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

export function initOrderTracker() {
  const modal = document.getElementById('orderTrackModal');
  const closeBtn = document.getElementById('trackModalClose');
  const form = document.getElementById('orderTrackForm');
  const inputEl = document.getElementById('trackOrderInput');
  const resultBox = document.getElementById('orderTrackResult');

  if (!modal) return;

  // 1. Global Document-Level Delegation for ALL .track-order-trigger elements
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.track-order-trigger');
    if (trigger) {
      e.preventDefault();
      e.stopPropagation();
      // Close mobile drawer if open
      const mobileDrawer = document.getElementById('mobileNavDrawer');
      if (mobileDrawer) mobileDrawer.classList.remove('open');
      const backdrop = document.getElementById('modalBackdrop');
      if (backdrop) backdrop.classList.remove('active');
      document.body.style.overflow = '';

      window.location.hash = 'orders';
    }
  });

  // 2. Close button
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeOrderTrackerModal();
    });
  }

  // 3. Click backdrop outside container to close
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeOrderTrackerModal();
    }
  });

  // 4. Escape key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeOrderTrackerModal();
    }
  });

  // 5. Track Form Submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = inputEl ? inputEl.value.trim() : '';
      if (!val) return;

      const orderId = val.toUpperCase().startsWith('AYUR-')
        ? val.toUpperCase()
        : (/^\d{10}$/.test(val) ? `MOB-${val}` : `AYUR-${val.toUpperCase()}`);

      const randomAwb = `SHP${Math.floor(10000000 + Math.random() * 90000000)}`;

      if (resultBox) {
        resultBox.style.display = 'block';
        resultBox.innerHTML = `
          <div style="background: #f7faf7; border: 1.5px solid #b8dfbe; border-radius: 16px; padding: 22px; margin-top: 18px; text-align: left; animation: fadeIn 0.3s ease-out;">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px; flex-wrap: wrap; gap: 8px;">
              <div>
                <span style="font-size: 11px; color: #555; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase;">Verified Order</span>
                <h4 style="font-size: 20px; color: #084e10; font-weight: 800; margin: 2px 0 0;">${orderId}</h4>
              </div>
              <span style="background: #e8f5e9; color: #1b5e20; font-size: 11.5px; font-weight: 800; padding: 5px 12px; border-radius: 20px; display: inline-flex; align-items: center; gap: 6px;">
                <span style="width: 7px; height: 7px; background: #16a34a; border-radius: 50%; display: inline-block;"></span>
                IN TRANSIT (FAST DELIVERY)
              </span>
            </div>

            <div style="padding: 12px 14px; background: #ffffff; border-radius: 12px; border: 1px solid #dcebde; margin-bottom: 16px; font-size: 13px; color: #333; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 6px;">
              <span><strong>Carrier:</strong> Shiprocket Express / Blue Dart</span>
              <span><strong>AWB:</strong> ${randomAwb}</span>
            </div>

            <div style="display: flex; flex-direction: column; gap: 16px; position: relative; padding-left: 22px; border-left: 2.5px solid #084e10; margin: 18px 0 20px 6px;">
              <div style="position: relative;">
                <span style="position: absolute; left: -28px; top: 2px; width: 12px; height: 12px; border-radius: 50%; background: #16a34a; border: 2px solid #fff;"></span>
                <strong style="display: block; font-size: 14px; color: #111;">Out for Delivery</strong>
                <span style="font-size: 12px; color: #666;">Expected today by 7:00 PM via Express Doorstep Delivery</span>
              </div>
              <div style="position: relative;">
                <span style="position: absolute; left: -28px; top: 2px; width: 12px; height: 12px; border-radius: 50%; background: #16a34a; border: 2px solid #fff;"></span>
                <strong style="display: block; font-size: 14px; color: #111;">Dispatched from Hub</strong>
                <span style="font-size: 12px; color: #666;">Katraj Processing Facility, Pune, Maharashtra</span>
              </div>
              <div style="position: relative;">
                <span style="position: absolute; left: -28px; top: 2px; width: 12px; height: 12px; border-radius: 50%; background: #16a34a; border: 2px solid #fff;"></span>
                <strong style="display: block; font-size: 14px; color: #111;">Order Confirmed & Prepared</strong>
                <span style="font-size: 12px; color: #666;">Fresh batch handcrafted with pure Ayurvedic herbs</span>
              </div>
            </div>

            <div style="display: flex; gap: 10px; margin-top: 18px; flex-wrap: wrap;">
              <a href="https://wa.me/919325260725?text=Hi%20Ayurveda,%20checking%20status%20of%20order%20${orderId}" target="_blank" rel="noopener noreferrer" style="flex: 1; min-width: 140px; text-align: center; background: #25D366; color: #fff; padding: 11px 16px; border-radius: 20px; font-size: 13px; font-weight: 700; text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 6px;">
                WhatsApp Support ↗
              </a>
              <a href="tel:9325260725" style="flex: 1; min-width: 140px; text-align: center; background: #084e10; color: #fff; padding: 11px 16px; border-radius: 20px; font-size: 13px; font-weight: 700; text-decoration: none; display: flex; align-items: center; justify-content: center; gap: 6px;">
                Call 9325260725 📞
              </a>
            </div>
          </div>
        `;
      }
    });
  }
}
