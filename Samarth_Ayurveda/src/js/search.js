import { products } from '../data/products.js';

export function initSearch(onSelectProduct) {
  const modal = document.getElementById('searchModal');
  const input = document.getElementById('searchInput');
  const resultsEl = document.getElementById('searchResults');
  const closeBtn = document.getElementById('searchCloseBtn');
  const openBtns = document.querySelectorAll('.search-trigger-btn');

  if (!modal || !input || !resultsEl) return;

  function openSearch() {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    input.value = '';
    renderResults('');
    setTimeout(() => input.focus(), 100);
  }

  function closeSearch() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  function renderResults(query) {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? products.filter(p => p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.shortDesc.toLowerCase().includes(q))
      : products.slice(0, 5); // popular items when empty

    if (filtered.length === 0) {
      resultsEl.innerHTML = `<div style="padding: 20px; text-align: center; color: #888;">No herbal products found matching "${query}".</div>`;
      return;
    }

    resultsEl.innerHTML = filtered.map(p => `
      <div class="search-item-card" data-id="${p.id}">
        <img class="search-item-thumb" src="${p.primaryImg}" alt="${p.title}" />
        <div class="search-item-info">
          <div class="search-item-title">${p.title}</div>
          <div class="search-item-price">Rs. ${p.salePrice.toLocaleString()}</div>
        </div>
      </div>
    `).join('');

    resultsEl.querySelectorAll('.search-item-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = Number(card.dataset.id);
        closeSearch();
        if (onSelectProduct) onSelectProduct(id);
      });
    });
  }

  openBtns.forEach(btn => btn.addEventListener('click', openSearch));
  if (closeBtn) closeBtn.addEventListener('click', closeSearch);

  input.addEventListener('input', (e) => {
    renderResults(e.target.value);
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeSearch();
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeSearch();
    }
  });
}
