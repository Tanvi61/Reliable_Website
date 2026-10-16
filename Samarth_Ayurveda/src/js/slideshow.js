export function initHeroSlideshow() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');

  const section = document.querySelector('.hero-slideshow-section');

  if (!slides.length) return;

  let currentIdx = 0;
  let timer = null;

  function goToSlide(idx) {
    slides.forEach((s, i) => {
      s.classList.toggle('active', i === idx);
    });
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === idx);
    });
    currentIdx = idx;
  }

  function nextSlide() {
    goToSlide((currentIdx + 1) % slides.length);
  }

  function prevSlide() {
    goToSlide((currentIdx - 1 + slides.length) % slides.length);
  }

  function startAutoplay() {
    stopAutoplay();
    timer = setInterval(nextSlide, 5000);
  }

  function stopAutoplay() {
    if (timer) clearInterval(timer);
  }

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      goToSlide(idx);
      startAutoplay();
    });
  });

  let touchStartX = 0;
  let touchEndX = 0;

  if (section) {
    section.addEventListener('mouseenter', stopAutoplay);
    section.addEventListener('mouseleave', startAutoplay);

    // Touch swipe support
    section.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoplay();
    }, { passive: true });

    section.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
      startAutoplay();
    }, { passive: true });
  }

  function handleSwipe() {
    const diff = touchEndX - touchStartX;
    if (Math.abs(diff) > 40) {
      if (diff < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  }

  startAutoplay();
}
