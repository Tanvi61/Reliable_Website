/**
 * Hero Showcase Slider for Reliable Land Survey Consultancy
 * Controls the rectangular floating showcase card on the right side of the hero
 */
document.addEventListener('DOMContentLoaded', function () {
    const box = document.getElementById('heroShowcaseBox');
    if (!box) return;

    const slides = box.querySelectorAll('.showcase-slide');
    const dots = box.querySelectorAll('.showcase-dot');
    const prevBtn = document.getElementById('showcasePrev');
    const nextBtn = document.getElementById('showcaseNext');

    if (slides.length <= 1) return;

    let currentIndex = 0;
    let timer = null;
    const INTERVAL = 4200; // 4.2 seconds per slide

    function goToSlide(index) {
        slides[currentIndex].classList.remove('active');
        if (dots[currentIndex]) dots[currentIndex].classList.remove('active');

        currentIndex = (index + slides.length) % slides.length;

        slides[currentIndex].classList.add('active');
        if (dots[currentIndex]) dots[currentIndex].classList.add('active');
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    function startTimer() {
        stopTimer();
        timer = setInterval(nextSlide, INTERVAL);
    }

    function stopTimer() {
        if (timer) clearInterval(timer);
    }

    // Attach dot click events
    dots.forEach(function (dot, i) {
        dot.addEventListener('click', function () {
            goToSlide(i);
            startTimer();
        });
    });

    // Arrow click events
    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            nextSlide();
            startTimer();
        });
    }
    if (prevBtn) {
        prevBtn.addEventListener('click', function () {
            prevSlide();
            startTimer();
        });
    }

    // Pause on hover so visitors can read the caption and inspect photo
    box.addEventListener('mouseenter', stopTimer);
    box.addEventListener('mouseleave', startTimer);

    // Initial start: wait until the showcase box floats into view (2.6s entrance + full first slide display)
    setTimeout(startTimer, 6800);
});
