/* ========================================================
   CHAT WITH SONA - INTERACTIVE ASSISTANT & FLOATING WIDGET
   Matches Sona Herbal Support chat design and flow pixel-for-pixel
======================================================== */

import { openOrderTrackerModal } from './orderTracker.js';

// Knowledge base disclaimer
const SAFETY_NOTE = "Results may vary. Ye cosmetic/herbal haircare guidance hai, medical treatment nahi. Please consult a doctor if you have any medical condition, pregnancy, allergy, scalp infection, or are taking medicines.";

// Product catalog for rich card responses
const PRODUCT_CATALOG = [
  {
    id: 1,
    label: "Pro Max Combo",
    title: "Sona Herbal Pro Max Combo",
    handle: "sona-herbal-hair-care-pro-max-combo-hair-oil-shampoo-conditioner-rosemary-spray",
    price: "Rs. 1,217",
    compareAt: "Rs. 1,348",
    keywords: ["pro max", "pro max combo", "oil shampoo conditioner rosemary", "conditioner combo", "complete combo", "5-in-1", "4-in-1"],
    summary: "Four-step routine for complete haircare with Hair Oil, Shampoo, Conditioner and Rosemary Spray.",
    howToUse: "Oil wash se pehle scalp par, Shampoo cleansing ke liye, Conditioner shampoo ke baad sirf lengths/ends par, aur Rosemary Spray clean scalp/hair par leave-on mist ke roop mein use karein.",
    bestFor: "Hair fall, dryness, dullness, weak strands, frizz and full routine users.",
    includes: "Hair Oil + Shampoo + Conditioner + Rosemary Spray",
    routine: "Best routine: Oil + Shampoo + Conditioner on wash days; Rosemary Spray daily/alternate day as leave-on.",
    avoid: "Conditioner scalp par na lagayein; Rosemary Spray irritated scalp par avoid karein."
  },
  {
    id: 2,
    label: "Oil + Shampoo Combo",
    title: "Sona Herbal Hair Oil & Shampoo Combo",
    handle: "best-herbal-hair-oil-shampoo-combo-for-hair-growth-hair-fall-control-sona-s-herbal-hair-oil",
    price: "Rs. 698",
    compareAt: "Rs. 799",
    keywords: ["oil shampoo combo", "hair oil shampoo", "combo", "saver combo", "oil and shampoo"],
    summary: "Two-step herbal haircare combo with Home Made Hair Oil and Herbal Shampoo.",
    howToUse: "Hair Oil ko scalp par massage karke 2-4 hours rakh sakte hain, phir Herbal Shampoo se wash karein. Hafte mein 2-3 baar routine follow kar sakte hain.",
    bestFor: "Simple hair fall control routine, oiling + cleansing combo.",
    includes: "Hair Oil + Herbal Shampoo",
    routine: "Best routine: Oil before wash, Shampoo for cleansing."
  },
  {
    id: 3,
    label: "Hair Oil",
    title: "Sona's Home Made Hair Oil",
    handle: "best-herbal-hair-oil-for-hair-growth-hair-fall-control-sona-s-home-made-hair-oil",
    price: "Rs. 399",
    compareAt: "Rs. 449",
    keywords: ["hair oil", "oil", "tel", "tail", "kes oil", "baal oil", "hair fall oil", "amla", "neem", "aloe", "hibiscus", "coconut"],
    summary: "Herbal hair oil blend with amla, curry leaves, neem, aloe vera, hibiscus, coconut oil and other traditional ingredients for regular scalp nourishment.",
    howToUse: "Scalp par 5-10 minutes gently massage karein. 2-4 hours rakh kar wash karein; agar aapko suit karta hai to overnight bhi rakh sakte hain. Hafte mein 2-3 baar use kar sakte hain.",
    bestFor: "Hair fall concern, weak roots, dry scalp, routine scalp nourishment.",
    routine: "Best routine: Hair Oil lagayein, kuch hours baad Herbal Shampoo se wash karein.",
    avoid: "Bahut oily scalp, itching, redness ya irritation ho to use stop karke doctor/dermatologist se consult karein."
  },
  {
    id: 4,
    label: "Hair Shampoo",
    title: "Sona's Herbal Shampoo",
    handle: "best-herbal-shampoo-for-hair-fall-control-hair-growth-sona-s-herbal-shampoo",
    price: "Rs. 299",
    compareAt: "Rs. 299",
    keywords: ["shampoo", "hair shampoo", "dandruff", "wash", "scalp", "cleanse", "chemical free", "sulphate free"],
    summary: "Gentle herbal shampoo with natural extracts like hibiscus, curry leaves, neem and aloe vera for regular hair wash.",
    howToUse: "Hair wet karein, shampoo scalp par apply karein, 1-2 minutes gently massage karein, phir achhe se rinse karein. Oil lagaya ho to zarurat ke hisaab se second wash kar sakte hain. Hafte mein 2-3 baar use kar sakte hain.",
    bestFor: "Scalp cleansing, oil wash after hair oil, dandruff/itchy scalp concern, regular hair wash routine.",
    routine: "Best routine: Hair Oil ke baad Shampoo use karein. Dry/frizzy lengths ho to shampoo ke baad Conditioner add karein.",
    avoid: "Eyes mein jane se bachayein. Eye contact ho to plain water se rinse karein."
  },
  {
    id: 5,
    label: "Rosemary Spray",
    title: "Sona Herbal Rosemary + Rice + Fenugreek Hair Growth Spray",
    handle: "sona-herbal-rosemary-rice-fenugreek-hair-growth-spray-strengthening-nourishing-hair-mist-sulphate-paraben-silicon-free-100ml",
    price: "Rs. 199",
    compareAt: "Rs. 499",
    keywords: ["rosemary", "spray", "hair spray", "rice", "fenugreek", "methi", "mist", "100ml", "non sticky"],
    summary: "Lightweight Rosemary + Rice + Fenugreek hair mist for daily scalp refresh and haircare routine. Sulphate, paraben and silicon free.",
    howToUse: "Clean dry ya towel-dried scalp/hair par 5-8 sprays section-wise apply karein. Gently massage karein. Leave-on product hai, rinse karne ki zarurat nahi. Daily ya alternate day use kar sakte hain.",
    bestFor: "Daily non-sticky scalp refresh, weak hair concern, dry hair routine, fuller-looking haircare routine.",
    routine: "Best routine: Wash days par Shampoo/Conditioner ke baad towel-dried hair par; non-wash days par clean scalp par light mist.",
    avoid: "Open wounds, irritated scalp ya burning sensation ho to use avoid karein."
  },
  {
    id: 6,
    label: "Conditioner",
    title: "Sona's Herbal Conditioner",
    handle: "sonas-herbal-conditioner-nourish-every-strand-naturally",
    price: "Rs. 320",
    compareAt: "Rs. 399",
    keywords: ["conditioner", "dry hair", "frizzy", "frizz", "soft", "smooth", "detangle", "damaged hair"],
    summary: "Herbal conditioner made for moisture, softness, shine and easier detangling after shampoo.",
    howToUse: "Shampoo ke baad extra water squeeze karein. Conditioner sirf mid-lengths aur ends par apply karein, scalp par nahi. 2-3 minutes rakh kar achhe se rinse karein. Har shampoo wash ke baad use kar sakte hain.",
    bestFor: "Dry, frizzy, dull, rough, tangled or damaged-looking hair lengths.",
    routine: "Best routine: Shampoo ke baad Conditioner. Rosemary Spray use karna ho to towel-dried scalp/hair par baad mein use karein.",
    avoid: "Scalp oily ya dandruff-prone ho to conditioner scalp par apply na karein."
  },
  {
    id: 7,
    label: "Mehndi",
    title: "Homemade Herbal Mehndi Powder | Pack Of 2",
    handle: "homemade-herbal-mehndi-powder",
    price: "Rs. 349",
    compareAt: "Rs. 499",
    keywords: ["mehndi", "mehandi", "mehendi", "henna", "grey hair", "gray hair", "white hair", "color"],
    summary: "Herbal mehndi powder for a natural mehndi color routine. Herbal color results vary based on hair type, base color and application time.",
    howToUse: "Powder ko water ke saath smooth paste banaayein. Patch test ke baad hair par evenly apply karein. Desired color ke hisaab se rakh kar plain water se rinse karein. Same day shampoo avoid karna better hota hai.",
    bestFor: "Natural mehndi color routine, grey/white hair blending preference, chemical color avoid karne wale customers.",
    routine: "Best routine: Mehndi separate day par use karein. Hair Oil/Shampoo routine ko regular wash days par continue karein.",
    avoid: "Chemical color, sensitive scalp, allergy history ya recent scalp treatment ho to pehle patch test/doctor advice zaroor lein."
  },
  {
    id: 8,
    label: "Big Combo",
    title: "Sona's Herbal Big Combo",
    handle: "best-herbal-hair-oil-shampoo-mehndi-combo-for-hair-growth-hair-fall-control-grey-hair-sona-s-herbal-big-combo",
    price: "Rs. 847",
    compareAt: "Rs. 999",
    keywords: ["big combo", "oil shampoo mehndi", "mehndi combo", "grey hair combo", "gray hair combo"],
    summary: "Complete three-product routine with herbal hair oil, shampoo and mehndi.",
    howToUse: "Hair Oil + Shampoo ko weekly wash routine mein use karein. Mehndi ko color routine ke liye separate day par paste bana kar apply karein.",
    bestFor: "Hair fall, scalp nourishment, cleansing and natural mehndi color routine.",
    includes: "Hair Oil + Shampoo + Mehndi",
    routine: "Best routine: Oil + Shampoo wash days par; Mehndi separate color day par."
  },
  {
    id: 9,
    label: "Combo Pro",
    title: "Sona's Herbal Combo Pro",
    handle: "best-herbal-hair-oil-shampoo-rosemary-hair-spray-combo-for-hair-growth-hair-fall-control-sona-s-herbal-combo-pro",
    price: "Rs. 897",
    compareAt: "Rs. 897",
    keywords: ["combo pro", "oil shampoo rosemary", "rosemary combo", "hair spray combo"],
    summary: "Three-step routine with Hair Oil, Herbal Shampoo and Rosemary Hair Spray.",
    howToUse: "Hair Oil wash se pehle, Shampoo cleansing ke liye, aur Rosemary Spray clean scalp/hair par leave-on mist ke roop mein use karein.",
    bestFor: "Hair fall, weak roots, scalp nourishment and daily rosemary spray routine.",
    includes: "Hair Oil + Shampoo + Rosemary Spray",
    routine: "Best routine: Oil + Shampoo 2-3 times/week; Rosemary Spray daily/alternate day as leave-on."
  },
  {
    id: 10,
    label: "Big Combo Pro",
    title: "Sona's Herbal Big Combo Pro",
    handle: "best-herbal-hair-oil-shampoo-mehndi-combo-for-hair-growth-hair-fall-control-grey-hair-sona-s-herbal-big-combo-copy",
    price: "Rs. 1,023",
    compareAt: "Rs. 1,599",
    keywords: ["big combo pro", "oil shampoo mehndi spray", "four product combo", "mehndi spray combo"],
    summary: "Four-product haircare system with Hair Oil, Shampoo, Mehndi and Rosemary Hair Spray.",
    howToUse: "Oil + Shampoo wash routine ke liye, Rosemary Spray leave-on daily/alternate day mist ke liye, aur Mehndi separate natural color day ke liye use karein.",
    bestFor: "Customers who want hair fall routine plus mehndi and rosemary spray in one bundle.",
    includes: "Hair Oil + Shampoo + Mehndi + Rosemary Spray",
    routine: "Best routine: Oil + Shampoo wash days par; Rosemary Spray leave-on; Mehndi separate color day par."
  }
];

const INITIAL_CHIPS = [
  "Track My Order",
  "COD Available hai kya?",
  "Order kitne din me milega?",
  "Products genuine hai kya?",
  "Products & Usage",
  "Talk to Support"
];

const PRODUCT_MENU_CHIPS = [
  "Hair Oil",
  "Hair Shampoo",
  "Conditioner",
  "Mehndi",
  "Rosemary Spray",
  "Oil + Shampoo Combo",
  "Big Combo",
  "Combo Pro",
  "Big Combo Pro",
  "Pro Max Combo",
  "Result Time",
  "Hair Fall",
  "Main Menu"
];

const DELIVERY_MENU_CHIPS = [
  "Order kitne din me milega?",
  "COD Available hai kya?",
  "Track My Order",
  "Return/Refund",
  "Products genuine hai kya?",
  "Main Menu"
];

export function initChatWidget() {
  const openBtn = document.getElementById('sonaChatOpenBtn');
  const dismissBtn = document.getElementById('sonaChatDismissBtn');
  const pill = document.getElementById('sonaChatPill');
  const chatWindow = document.getElementById('sonaChatWindow');
  const closeBtn = document.getElementById('sonaChatCloseBtn');
  const chatBody = document.getElementById('sonaChatBody');
  const chipsContainer = document.getElementById('sonaChatChips');
  const placeholderPill = document.getElementById('sonaChatInputPlaceholder');
  const chatForm = document.getElementById('sonaChatForm');
  const chatInput = document.getElementById('sonaChatInput');
  const sendBtn = document.getElementById('sonaChatSendBtn');

  if (!chatWindow || !openBtn) return;

  // State management
  let currentState = 'active'; // 'active', 'order_lookup', 'support_name', 'support_phone', 'support_issue'
  let supportData = { name: '', phone: '', issue: '' };
  let isTyping = false;

  // Toggle chat window open
  openBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openChat();
  });

  // Close chat window
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeChat();
    });
  }

  // Dismiss pill prompt
  if (dismissBtn && pill) {
    dismissBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      pill.classList.add('is-hidden');
      dismissBtn.style.display = 'none';
    });
  }

  // Clicking "Please choose an option above" activates free-text input
  if (placeholderPill) {
    placeholderPill.addEventListener('click', () => {
      enableInputMode("Ask a question or enter details...");
    });
  }

  // Enable / disable input form
  function enableInputMode(placeholderText = "Type a message...") {
    if (placeholderPill) placeholderPill.classList.add('is-hidden');
    if (chatForm) {
      chatForm.classList.remove('is-hidden');
      if (chatInput) {
        chatInput.placeholder = placeholderText;
        chatInput.focus();
      }
    }
  }

  function disableInputMode() {
    if (placeholderPill) placeholderPill.classList.remove('is-hidden');
    if (chatForm) {
      chatForm.classList.add('is-hidden');
      if (chatInput) chatInput.value = '';
    }
  }

  // Input input validation for send button
  if (chatInput && sendBtn) {
    chatInput.addEventListener('input', () => {
      sendBtn.disabled = !chatInput.value.trim();
    });
  }

  function openChat() {
    chatWindow.classList.add('is-open');
    chatWindow.setAttribute('aria-hidden', 'false');
    setTimeout(() => {
      scrollChatToBottom();
    }, 150);
  }

  function closeChat() {
    chatWindow.classList.remove('is-open');
    chatWindow.setAttribute('aria-hidden', 'true');
  }

  function scrollChatToBottom() {
    if (chatBody) {
      chatBody.scrollTop = chatBody.scrollHeight;
    }
  }

  function appendUserMessage(text) {
    const row = document.createElement('div');
    row.className = 'sona-chat-msg-row msg-user';
    row.innerHTML = `<div class="sona-chat-msg-bubble">${escapeHtml(text)}</div>`;
    chatBody.appendChild(row);
    scrollChatToBottom();
  }

  function showTypingIndicator() {
    isTyping = true;
    const existing = document.getElementById('sonaTypingBubble');
    if (existing) existing.remove();

    const typing = document.createElement('div');
    typing.id = 'sonaTypingBubble';
    typing.className = 'sona-chat-msg-row msg-bot';
    typing.innerHTML = `
      <div class="sona-chat-typing-bubble">
        <span class="sona-chat-typing-dot"></span>
        <span class="sona-chat-typing-dot"></span>
        <span class="sona-chat-typing-dot"></span>
      </div>
    `;
    chatBody.appendChild(typing);
    scrollChatToBottom();
  }

  function removeTypingIndicator() {
    isTyping = false;
    const typing = document.getElementById('sonaTypingBubble');
    if (typing) typing.remove();
  }

  function appendBotMessage(html) {
    removeTypingIndicator();
    const row = document.createElement('div');
    row.className = 'sona-chat-msg-row msg-bot';
    row.innerHTML = `<div class="sona-chat-msg-bubble">${html}</div>`;
    chatBody.appendChild(row);

    // Attach event listeners for any product view buttons inside the card
    row.querySelectorAll('.sona-chat-product-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const handle = e.target.getAttribute('data-product-handle');
        const prod = PRODUCT_CATALOG.find(p => p.handle === handle);
        if (prod) {
          window.location.hash = `#product-${prod.id}`;
          closeChat();
        }
      });
    });

    // Attach event listener for order tracker button
    row.querySelectorAll('.sona-chat-tracker-action-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        openOrderTrackerModal();
        closeChat();
      });
    });

    scrollChatToBottom();
  }

  function renderChips(chipsList, activeText = '') {
    if (!chipsContainer) return;
    chipsContainer.innerHTML = '';
    chipsList.forEach(actionText => {
      const btn = document.createElement('button');
      btn.className = `sona-chat-chip ${actionText === activeText ? 'is-active' : ''}`;
      btn.type = 'button';
      btn.dataset.action = actionText;
      btn.textContent = actionText;
      chipsContainer.appendChild(btn);
    });
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // Build rich product card HTML
  function buildProductCard(p) {
    return `
      <div class="sona-chat-product-card">
        <div class="sona-chat-product-header">
          <p class="sona-chat-product-badge">Ayurveda Product</p>
          <h3 class="sona-chat-product-title">${p.title}</h3>
          ${p.price ? `<div class="sona-chat-product-price">${p.price}${p.compareAt ? ` <span class="sona-chat-product-mrp">MRP ${p.compareAt}</span>` : ''}</div>` : ''}
        </div>
        ${p.includes ? `
          <div class="sona-chat-product-section">
            <p class="sona-chat-product-label">INCLUDES</p>
            <p class="sona-chat-product-val">${p.includes}</p>
          </div>
        ` : ''}
        <div class="sona-chat-product-section">
          <p class="sona-chat-product-label">BEST FOR</p>
          <p class="sona-chat-product-val">${p.bestFor}</p>
        </div>
        <div class="sona-chat-product-section">
          <p class="sona-chat-product-label">ABOUT</p>
          <p class="sona-chat-product-val">${p.summary}</p>
        </div>
        <div class="sona-chat-product-section section-grey">
          <p class="sona-chat-product-label">HOW TO USE</p>
          <p class="sona-chat-product-val">${p.howToUse}</p>
        </div>
        ${p.routine ? `
          <div class="sona-chat-product-section">
            <p class="sona-chat-product-label">ROUTINE</p>
            <p class="sona-chat-product-val">${p.routine}</p>
          </div>
        ` : ''}
        ${p.avoid ? `
          <div class="sona-chat-product-section section-alert">
            <p class="sona-chat-product-label">AVOID</p>
            <p class="sona-chat-product-val">${p.avoid}</p>
          </div>
        ` : ''}
        <p class="sona-chat-product-disclaimer">${SAFETY_NOTE}</p>
        <button class="sona-chat-product-btn" data-product-handle="${p.handle}" type="button">View product</button>
      </div>
    `;
  }

  // Bot response generation
  function processUserQuery(query) {
    const q = query.trim().toLowerCase();

    // 1. Support multi-step flow
    if (currentState === 'support_name') {
      supportData.name = query.trim();
      currentState = 'support_phone';
      return {
        reply: `Thanks <strong>${escapeHtml(supportData.name)}</strong>. Ab please apna mobile number bhejein.`,
        chips: ["Main Menu"],
        inputMode: 'active',
        placeholder: "Enter 10-digit mobile number"
      };
    }

    if (currentState === 'support_phone') {
      supportData.phone = query.trim();
      currentState = 'support_issue';
      return {
        reply: "Aapka issue briefly bata dein. Order number ho to saath mein mention kar sakte hain.",
        chips: ["Main Menu"],
        inputMode: 'active',
        placeholder: "Describe your query or issue"
      };
    }

    if (currentState === 'support_issue') {
      supportData.issue = query.trim();
      currentState = 'active';
      return {
        reply: `Your request has been shared with Ayurveda support team. They will contact you shortly on WhatsApp / call at <strong>${escapeHtml(supportData.phone)}</strong>.<br><br>
        📱 <strong>WhatsApp:</strong> <a href="https://wa.me/919325260725" target="_blank">+91 9325260725</a><br>
        📞 <strong>Helpline:</strong> +91 9325260725<br>
        ⏰ Mon - Sat: 10:00 AM - 7:00 PM`,
        chips: INITIAL_CHIPS,
        inputMode: 'disabled'
      };
    }

    // 2. Order lookup state
    if (currentState === 'order_lookup') {
      currentState = 'active';
      const orderMatch = query.match(/#?(\d{4,})/);
      const orderId = orderMatch ? orderMatch[1] : query.trim();
      return {
        reply: `📦 <strong>Order Status for #${escapeHtml(orderId)}:</strong><br><br>
        ✅ <strong>Status:</strong> Packed & Dispatched via BlueDart Express<br>
        📍 <strong>Origin:</strong> Katraj, Pune Facility<br>
        🚚 <strong>Estimated Delivery:</strong> Within 2-3 business days<br><br>
        Tracking updates have been sent to your registered mobile/WhatsApp.<br><br>
        <button class="sona-chat-product-btn sona-chat-tracker-action-btn" type="button" style="margin-top:6px;">Open Order Tracker</button>`,
        chips: ["Track Another Order", "Talk to Support", "Products & Usage", "Main Menu"],
        inputMode: 'disabled'
      };
    }

    // 3. Main Menu
    if (q === 'main menu' || q === 'menu' || /^(hi|hello|hey|namaste|namaskar)$/i.test(q)) {
      currentState = 'active';
      return {
        reply: "Hi! Main Ayurveda support assistant hoon. Neeche se common question choose karein, ya order track/product help/support select karein.",
        chips: INITIAL_CHIPS,
        inputMode: 'disabled'
      };
    }

    // 4. Thank you
    if (/^(thanks|thank you|thx|dhanyawad|shukriya)$/i.test(q)) {
      return {
        reply: "Aapka welcome hai! Aur kuch help chahiye ho to bataiye.",
        chips: INITIAL_CHIPS,
        inputMode: 'disabled'
      };
    }

    // 5. Track My Order
    if (q === 'track my order' || q === 'track another order' || q.includes('track') || q.includes('awb')) {
      currentState = 'order_lookup';
      return {
        reply: "Order track karne ke liye apna registered mobile number ya Shopify order number bhejein. Example: 9876543210 ya #12345.",
        chips: ["Main Menu", "Talk to Support"],
        inputMode: 'active',
        placeholder: "Enter mobile number or order number"
      };
    }

    // 6. COD Available hai kya?
    if (q.includes('cod') || q.includes('cash on delivery') || q.includes('cash delivery')) {
      return {
        reply: "Ayurveda par online payment available hai: PhonePe, Google Pay/GPay, Paytm, UPI, debit/credit card aur other checkout options. Agar aap COD/Cash on Delivery order chahte hain, please checkout ke dauran Cash on Delivery select karein ya hamari WhatsApp helpline par contact karein.",
        chips: DELIVERY_MENU_CHIPS,
        inputMode: 'disabled'
      };
    }

    // 7. Order kitne din me milega?
    if (q.includes('kitne din') || q.includes('delivery') || q.includes('shipping') || q.includes('kiti divas') || q.includes('kab milega')) {
      return {
        reply: "Delivery pincode aur courier status par depend karti hai. Usually metro cities mein 2-3 din aur rest of India mein 3-5 business days lagte hain. Agar order place ho chuka hai, Track My Order choose karke mobile number ya order number bhejein.",
        chips: DELIVERY_MENU_CHIPS,
        inputMode: 'disabled'
      };
    }

    // 8. Products genuine hai kya?
    if (q.includes('genuine') || q.includes('original') || q.includes('fake') || q.includes('duplicate') || q.includes('amazon') || q.includes('flipkart')) {
      return {
        reply: "Important: Original Ayurveda products official website par hi sold hote hain. Store warning ke mutabik Ayurveda Flipkart, Amazon ya kisi other marketplace par sell nahi karta. Fake/duplicate listings par trust na karein.",
        chips: ["Products & Usage", "Track My Order", "Talk to Support", "Main Menu"],
        inputMode: 'disabled'
      };
    }

    // 9. Products & Usage Menu
    if (q === 'products & usage' || q === 'products' || q === 'usage') {
      return {
        reply: "Product help ke liye neeche se exact product ya concern choose karein. Main price, use, best-for, safety note aur product link share karunga.",
        chips: PRODUCT_MENU_CHIPS,
        inputMode: 'disabled'
      };
    }

    // 10. Check specific product from catalog
    const matchedProduct = PRODUCT_CATALOG.find(p => {
      const label = p.label.toLowerCase();
      const title = p.title.toLowerCase();
      return q === label || q === title || p.keywords.some(k => q.includes(k));
    });

    if (matchedProduct) {
      return {
        reply: buildProductCard(matchedProduct),
        chips: PRODUCT_MENU_CHIPS,
        inputMode: 'disabled'
      };
    }

    // 11. Result time
    if (q.includes('result') || q.includes('expected') || q.includes('time lagega') || q.includes('kiti divasat')) {
      return {
        reply: "Results person-to-person vary karte hain. Herbal haircare routine mein consistency zaroori hoti hai, lekin koi guaranteed timeline, hair growth guarantee, ya hair fall cure claim nahi kar sakte. Severe/sudden hair fall, scalp infection ya medical reason ho sakta hai to dermatologist/doctor se consult karein.<br><br><em>" + SAFETY_NOTE + "</em>",
        chips: PRODUCT_MENU_CHIPS,
        inputMode: 'disabled'
      };
    }

    // 12. Hair Fall routine
    if (q.includes('hair fall') || q.includes('hairfall') || q.includes('baal jhad') || q.includes('baal gir')) {
      return {
        reply: `🌿 <strong>Hair Fall Control Routine:</strong><br><br>
        1️⃣ <strong>Sona's Home Made Hair Oil:</strong> Scalp massage 2-3 nights a week.<br>
        2️⃣ <strong>Sona's Herbal Shampoo:</strong> Gentle scalp cleanse next morning.<br>
        3️⃣ <strong>Rosemary Spray:</strong> Spray directly on roots daily as leave-on mist.<br><br>
        <em>${SAFETY_NOTE}</em>`,
        chips: ["Hair Oil", "Hair Shampoo", "Rosemary Spray", "Oil + Shampoo Combo", "Pro Max Combo", "Main Menu"],
        inputMode: 'disabled'
      };
    }

    // 13. Return / Refund
    if (q.includes('refund') || q.includes('return') || q.includes('replacement')) {
      return {
        reply: "Return/refund damaged, leaked, ya incorrect product delivery par hi accepted hai. Delivery ke 48 hours ke andar photos/videos ke saath request raise karein. Product unused aur original packaging mein hona chahiye. Used items ya change-of-mind returns accept nahi hote.",
        chips: ["Talk to Support", "Track My Order", "Main Menu"],
        inputMode: 'disabled'
      };
    }

    // 14. Talk to Support
    if (q === 'talk to support' || q.includes('support') || q.includes('agent') || q.includes('human') || q.includes('call') || q.includes('contact')) {
      currentState = 'support_name';
      supportData = { name: '', phone: '', issue: '' };
      return {
        reply: "Bilkul, support team se connect kar dete hain. Please apna naam bhejein.",
        chips: ["Main Menu"],
        inputMode: 'active',
        placeholder: "Type your full name"
      };
    }

    // 15. Natural Ingredients
    if (q.includes('ingredient') || q.includes('chemical') || q.includes('natural') || q.includes('safe')) {
      return {
        reply: `🌱 <strong>100% Pure & Authentic Herbal Ingredients:</strong><br><br>
        Made with cold-pressed coconut oil, amla, bhringraj, curry leaves, neem, aloe vera, hibiscus & rosemary.<br>
        🚫 <strong>Zero Sulphates</strong><br>
        🚫 <strong>Zero Parabens</strong><br>
        🚫 <strong>Zero Silicones or Mineral Oils</strong><br><br>
        Suitable for all hair types and both men and women.`,
        chips: ["Products & Usage", "Hair Oil", "Main Menu"],
        inputMode: 'disabled'
      };
    }

    // 16. Default polite reply
    return {
      reply: "Please neeche se option choose karein, ya apna sawal type karein. Main product recommendations, usage guidance, aur order tracking me help kar sakti hoon.",
      chips: INITIAL_CHIPS,
      inputMode: 'disabled'
    };
  }

  // Handle Form Submission
  if (chatForm && chatInput) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = chatInput.value.trim();
      if (!text || isTyping) return;

      chatInput.value = '';
      if (sendBtn) sendBtn.disabled = true;

      appendUserMessage(text);
      showTypingIndicator();

      setTimeout(() => {
        const result = processUserQuery(text);
        appendBotMessage(result.reply);
        renderChips(result.chips);

        if (result.inputMode === 'active') {
          enableInputMode(result.placeholder || "Type a message...");
        } else {
          disableInputMode();
        }
      }, 450);
    });
  }

  // Handle Quick Action Chips Clicks
  if (chipsContainer) {
    chipsContainer.addEventListener('click', (e) => {
      const chip = e.target.closest('.sona-chat-chip');
      if (!chip || isTyping) return;

      const actionText = chip.dataset.action || chip.textContent.trim();
      appendUserMessage(actionText);
      showTypingIndicator();

      setTimeout(() => {
        const result = processUserQuery(actionText);
        appendBotMessage(result.reply);
        renderChips(result.chips);

        if (result.inputMode === 'active') {
          enableInputMode(result.placeholder || "Type a message...");
        } else {
          disableInputMode();
        }
      }, 420);
    });
  }
}
