document.addEventListener('DOMContentLoaded', function() {
            const slider = document.querySelector('.slider');
            const slides = document.querySelectorAll('.slide:not([data-index$="-clone"])');
            const allSlides = document.querySelectorAll('.slide');
            const timerProgress = document.querySelector('.timer-progress');
            const prevBtn = document.querySelector('.prev');
            const nextBtn = document.querySelector('.next');
            
            let currentIndex = 0;
            let slideCount = slides.length;
            let timer;
            let timerDuration = 5000; // 5 секунд
            let isTransitioning = false;

            // Установка начальной позиции
            slider.style.transform = 'translateX(0)';
            
            // Инициализация таймера
            function startTimer() {
                timerProgress.style.transitionDuration = (timerDuration / 1000) + 's';
                timerProgress.style.width = '100%';
                
                timer = setTimeout(() => {
                    nextSlide();
                }, timerDuration);
            }
            
            // Сброс таймера
            function resetTimer() {
                clearTimeout(timer);
                timerProgress.style.transitionDuration = '0s';
                timerProgress.style.width = '0%';
                
                // Небольшая задержка перед запуском нового таймера
                setTimeout(() => {
                    startTimer();
                }, 10);
            }
            
            // Переход к следующему слайду
            function nextSlide() {
                if (isTransitioning) return;
                isTransitioning = true;
                
                currentIndex = (currentIndex + 1) % slideCount;
                const offset = -currentIndex * 1920;
                
                slider.style.transition = 'transform 0.5s ease-in-out';
                slider.style.transform = `translateX(${offset}px)`;
                
                // После завершения анимации
                setTimeout(() => {
                    // Если достигли клона, незаметно перескакиваем на оригинал
                    if (currentIndex === slideCount) {
                        currentIndex = 0;
                        slider.style.transition = 'none';
                        slider.style.transform = 'translateX(0)';
                        // Небольшая задержка для применения стиля
                        setTimeout(() => {
                            slider.style.transition = 'transform 0.5s ease-in-out';
                        }, 10);
                    }
                    isTransitioning = false;
                }, 500);
                
                resetTimer();
            }
            
            // Переход к предыдущему слайду
            function prevSlide() {
                if (isTransitioning) return;
                isTransitioning = true;
                
                currentIndex = (currentIndex - 1 + slideCount) % slideCount;
                let offset = -currentIndex * 1920;
                
                // Если переходим от первого слайда к последнему
                if (currentIndex === slideCount - 1) {
                    // Сначала переходим к клону первого слайда
                    slider.style.transition = 'none';
                    slider.style.transform = `translateX(${-(slideCount + 1) * 1920}px)`;
                    
                    // Затем анимируем переход к последнему слайду
                    setTimeout(() => {
                        slider.style.transition = 'transform 0.5s ease-in-out';
                        slider.style.transform = `translateX(${-slideCount * 1920}px)`;
                    }, 10);
                } else {
                    slider.style.transition = 'transform 0.5s ease-in-out';
                    slider.style.transform = `translateX(${offset}px)`;
                }
                
                // После завершения анимации
                setTimeout(() => {
                    isTransitioning = false;
                }, 500);
                
                resetTimer();
            }
            
            // Обработчики кнопок
            nextBtn.addEventListener('click', nextSlide);
            prevBtn.addEventListener('click', prevSlide);
            
            // Запуск таймера при загрузке
            startTimer();
            
            // Обработчик для сброса таймера при наведении
            slider.addEventListener('mouseenter', () => {
                clearTimeout(timer);
                timerProgress.style.width = '0%';
                timerProgress.style.transitionDuration = '0s';
            });
            
            // Возобновление таймера при уходе курсора
            slider.addEventListener('mouseleave', () => {
                startTimer();
            });
        });