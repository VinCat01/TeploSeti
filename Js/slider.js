document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide:not([data-index$="-clone"])');
    const allSlides = document.querySelectorAll('.slide');
    const timerProgress = document.querySelector('.timer-progress');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;
    let slideCount = slides.length;
    let timer;
    let timerDuration = 5000;
    let isTransitioning = false;
    slider.style.transform = 'translateX(0)';
    function startTimer() {
        timerProgress.style.transitionDuration = (timerDuration / 1000) + 's';
        timerProgress.style.width = '100%';

        timer = setTimeout(() => {
            nextSlide();
        }, timerDuration);
    }
    function resetTimer() {
        clearTimeout(timer);
        timerProgress.style.transitionDuration = '0s';
        timerProgress.style.width = '0%';
        setTimeout(() => {
            startTimer();
        }, 10);
    }
    function nextSlide() {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex = (currentIndex + 1) % slideCount;
        const offset = -currentIndex * 1920;
        slider.style.transition = 'transform 0.5s ease-in-out';
        slider.style.transform = `translateX(${offset}px)`;
        setTimeout(() => {

            if (currentIndex === slideCount) {
                currentIndex = 0;
                slider.style.transition = 'none';
                slider.style.transform = 'translateX(0)';

                setTimeout(() => {
                    slider.style.transition = 'transform 0.5s ease-in-out';
                }, 10);
            }
            isTransitioning = false;
        }, 500);
        resetTimer();
    }
    function prevSlide() {
        if (isTransitioning) return;
        isTransitioning = true;
        currentIndex = (currentIndex - 1 + slideCount) % slideCount;
        let offset = -currentIndex * 1920;
        if (currentIndex === slideCount - 1) {
            slider.style.transition = 'none';
            slider.style.transform = `translateX(${-(slideCount + 1) * 1920}px)`;
            setTimeout(() => {
                slider.style.transition = 'transform 0.5s ease-in-out';
                slider.style.transform = `translateX(${-slideCount * 1920}px)`;
            }, 10);
        } else {
            slider.style.transition = 'transform 0.5s ease-in-out';
            slider.style.transform = `translateX(${offset}px)`;
        }
        setTimeout(() => {
            isTransitioning = false;
        }, 500);

        resetTimer();
    }
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    startTimer();
    slider.addEventListener('mouseenter', () => {
        clearTimeout(timer);
        timerProgress.style.width = '0%';
        timerProgress.style.transitionDuration = '0s';
    });
    slider.addEventListener('mouseleave', () => {
        startTimer();
    });
});