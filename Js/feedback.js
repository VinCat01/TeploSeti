document.addEventListener('DOMContentLoaded', function() {
            const slider = document.getElementById('slider');
            const dotsContainer = document.getElementById('dots');
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            const cards = document.querySelectorAll('.review-card');
            const cardCount = cards.length;
            let currentIndex = 0;
            let cardsPerView = 3;
            
            function updateCardsPerView() {
                if (window.innerWidth <= 1200 && window.innerWidth > 768) {
                    cardsPerView = 2;
                } else if (window.innerWidth <= 768) {
                    cardsPerView = 1;
                } else {
                    cardsPerView = 3;
                }
            }
            
            // Create dots
            function createDots() {
                dotsContainer.innerHTML = '';
                const dotCount = Math.ceil(cardCount / cardsPerView);
                
                for (let i = 0; i < dotCount; i++) {
                    const dot = document.createElement('div');
                    dot.classList.add('nav-dot');
                    if (i === 0) dot.classList.add('active');
                    dot.addEventListener('click', () => {
                        goToSlide(i);
                    });
                    dotsContainer.appendChild(dot);
                }
            }
            
            function goToSlide(index) {
                const cardWidth = cards[0].offsetWidth + 20; // including gap
                slider.scrollTo({
                    left: index * cardsPerView * cardWidth,
                    behavior: 'smooth'
                });
                currentIndex = index;
                updateDots();
            }
            
            function updateDots() {
                const dots = document.querySelectorAll('.nav-dot');
                dots.forEach((dot, i) => {
                    dot.classList.toggle('active', i === currentIndex);
                });
            }
            
            function scrollToCurrentIndex() {
                const cardWidth = cards[0].offsetWidth + 20; // including gap
                slider.scrollTo({
                    left: currentIndex * cardsPerView * cardWidth,
                    behavior: 'smooth'
                });
            }
            
            function handleResize() {
                updateCardsPerView();
                createDots();
                scrollToCurrentIndex();
            }
            
            // Initialize
            updateCardsPerView();
            createDots();
            
            // Button events
            prevBtn.addEventListener('click', () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    goToSlide(currentIndex);
                }
            });
            
            nextBtn.addEventListener('click', () => {
                const maxIndex = Math.ceil(cardCount / cardsPerView) - 1;
                if (currentIndex < maxIndex) {
                    currentIndex++;
                    goToSlide(currentIndex);
                }
            });
            
            // Touch events for better mobile handling
            let touchStartX = 0;
            let touchEndX = 0;
            
            slider.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            }, {passive: true});
            
            slider.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, {passive: true});
            
            function handleSwipe() {
                const diff = touchStartX - touchEndX;
                if (Math.abs(diff) > 50) { // threshold for swipe
                    const maxIndex = Math.ceil(cardCount / cardsPerView) - 1;
                    
                    if (diff > 0 && currentIndex < maxIndex) { // swipe left
                        currentIndex++;
                    } else if (diff < 0 && currentIndex > 0) { // swipe right
                        currentIndex--;
                    }
                    
                    goToSlide(currentIndex);
                }
            }
            
            // Update on scroll
            let debounceTimer;
            slider.addEventListener('scroll', () => {
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(() => {
                    const cardWidth = cards[0].offsetWidth + 20; // including gap
                    const newIndex = Math.round(slider.scrollLeft / (cardWidth * cardsPerView));
                    if (newIndex !== currentIndex) {
                        currentIndex = newIndex;
                        updateDots();
                    }
                }, 100);
            });
            
            // Handle window resize
            window.addEventListener('resize', handleResize);
        });


        var feed = document.querySelector(".send_feedback")
        var thx = document.querySelector(".thx")


        const form = document.querySelector('form');
        form.addEventListener('submit', handleSubmit);
        function handleSubmit(event) {
      event.preventDefault();
      feed.classList.add("none")
      thx.classList.add("open")
      
      console.log('Форма отправлена, но страница не перезагружается');
    }