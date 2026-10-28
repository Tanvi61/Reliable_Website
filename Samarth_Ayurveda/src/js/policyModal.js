export const policyData = {
  shipping: {
    title: "Shipping & Delivery Policy",
    content: `
      <p>At Ayurveda, we strive to deliver your order as quickly and safely as possible across all states of India.</p>
      <br/>
      <p><strong>Key Shipping Highlights:</strong></p>
      <ul>
        <li><strong>93% Delivery within 3 Days:</strong> We partner with premier logistics partners via Shiprocket to ensure rapid express transit.</li>
        <li><strong>Fast Dispatch:</strong> Most orders are hand-packed and dispatched within 24 hours of confirmation.</li>
        <li><strong>Free Shipping:</strong> Available on all prepaid orders and eligible orders over ₹999.</li>
        <li><strong>Dispatched from:</strong> Oil company SR No. 8/3 Khopdenagar, Katraj, Pune, Maharashtra 411046.</li>
      </ul>
      <br/>
      <p>Tracking updates will be sent via SMS and WhatsApp as soon as your shipment is dispatched.</p>
    `
  },
  refund: {
    title: "Refund & Replacement Policy",
    content: `
      <p>We stand by the authenticity and quality of every handcrafted batch of Ayurveda haircare.</p>
      <br/>
      <p><strong>Returns & Damages:</strong></p>
      <ul>
        <li>In the unlikely event that your package arrives damaged in transit, please share an unboxing photo/video within 48 hours of delivery.</li>
        <li>We will immediately arrange a hassle-free replacement or full refund to your original payment method.</li>
        <li>Contact our customer care team at <strong>Jitwellness2025@gmail.com</strong> or call <strong>9325260725</strong>.</li>
      </ul>
    `
  },
  privacy: {
    title: "Privacy Policy",
    content: `
      <p>Ayurveda is committed to protecting your privacy and personal information.</p>
      <br/>
      <p>We only collect essential details such as your name, shipping address, contact number, and email to process your orders and provide order status updates. We do not sell or disclose your private information to third parties.</p>
      <br/>
      <p>Payment information is processed via RBI-compliant, 256-bit encrypted secure payment gateways.</p>
    `
  },
  terms: {
    title: "Terms of Service",
    content: `
      <p>Welcome to Ayurveda.com. By visiting our store or purchasing from us, you agree to our standard terms and conditions.</p>
      <br/>
      <p>All Ayurveda formulations are proprietary homemade Ayurvedic preparations developed by founder Sonali Waghmode for personal haircare hygiene. Results may vary depending on individual scalp condition and regular usage.</p>
    `
  },
  contact: {
    title: "Contact Information",
    content: `
      <p><strong>Company Details:</strong> Ayurveda (Jit Wellness)</p>
      <p><strong>Customer Care:</strong> 9325260725</p>
      <p><strong>Support Email:</strong> Jitwellness2025@gmail.com</p>
      <p><strong>Facility Address:</strong> Oil company SR No. 8/3 Khopdenagar, Katraj Pune, Maharashtra 411046</p>
      <p><strong>Working Hours:</strong> Mon - Sat: 9:00 AM – 7:00 PM IST</p>
    `
  },
  legal: {
    title: "Legal Notice",
    content: `
      <p><strong>Entity Name:</strong> Ayurveda / Jit Wellness</p>
      <p><strong>Registered Address:</strong> Oil company SR No. 8/3 Khopdenagar, Katraj Pune, Maharashtra 411046</p>
      <p><strong>Founder & Proprietor:</strong> Sonali Waghmode</p>
      <p><strong>Business Activity:</strong> Authentic Handcrafted Ayurvedic Haircare Preparations</p>
      <p><strong>Compliance & Notice:</strong> All products are handcrafted using Ayurvedic herbs and manufactured under proprietary village methods. Ayurveda is the official trademark brand of Sonali Waghmode.</p>
    `
  }
};

export function initPolicyModal() {
  const modal = document.getElementById('policyModal');
  const titleEl = document.getElementById('policyModalTitle');
  const bodyEl = document.getElementById('policyModalBody');
  const closeBtn = document.getElementById('policyModalClose');

  if (!modal) return;

  function openPolicy(key) {
    const data = policyData[key] || policyData.shipping;
    titleEl.textContent = data.title;
    bodyEl.innerHTML = data.content;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closePolicy() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('[data-policy]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      openPolicy(el.dataset.policy);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closePolicy);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closePolicy();
  });
}
