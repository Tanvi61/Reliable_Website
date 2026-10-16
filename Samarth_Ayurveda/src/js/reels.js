import { reels } from '../data/reels.js';

export function initReels() {
  const modal = document.getElementById('reelModal');
  const videoEl = document.getElementById('reelVideo');
  const titleEl = document.getElementById('reelTitle');
  const ctaBtn = document.getElementById('reelCtaBtn');
  const closeBtn = document.getElementById('reelCloseBtn');
  const prevBtn = document.getElementById('reelPrevBtn');
  const nextBtn = document.getElementById('reelNextBtn');

  if (!modal || !videoEl) return;

  let currentReelIndex = 0;

  function openReel(index) {
    currentReelIndex = (index + reels.length) % reels.length;
    const r = reels[currentReelIndex];
    if (!r) return;

    videoEl.src = r.video;
    titleEl.textContent = r.title;
    ctaBtn.textContent = r.ctaText;
    ctaBtn.href = r.ctaLink;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    videoEl.play().catch(() => {});
  }

  function closeReel() {
    modal.classList.remove('active');
    videoEl.pause();
    videoEl.currentTime = 0;
    document.body.style.overflow = '';
  }

  // Attach click to each reel story ring & footer video cards
  document.querySelectorAll('.reel-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.dataset.index);
      openReel(idx);
    });
  });

  // Footer video card hover preview
  document.querySelectorAll('.footer-video-card').forEach(card => {
    const vid = card.querySelector('video');
    if (vid) {
      card.addEventListener('mouseenter', () => {
        vid.play().catch(() => {});
      });
      card.addEventListener('mouseleave', () => {
        vid.pause();
        vid.currentTime = 0;
      });
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeReel);
  if (prevBtn) prevBtn.addEventListener('click', () => openReel(currentReelIndex - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => openReel(currentReelIndex + 1));

  // Close on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeReel();
  });

  // Keyboard navigation
  window.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeReel();
    if (e.key === 'ArrowLeft') openReel(currentReelIndex - 1);
    if (e.key === 'ArrowRight') openReel(currentReelIndex + 1);
  });
}
