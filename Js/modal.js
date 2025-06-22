// Получаем элементы
        const openModalBtn = document.querySelector('.open-modal-btn');
        const openModalBtn2 = document.getElementById('open-modal-btn');
        const modalOverlay = document.getElementById('modalOverlay');
        const closeBtn = document.querySelector('.close-btn');
        const pageContent = document.querySelector('.page-content');
        const body = document.body;

        // Открываем модальное окно
        openModalBtn.addEventListener('click', function() {
            modalOverlay.style.display = 'flex';
            body.classList.add('blur-background');
        });

        

        // Закрываем модальное окно при клике на крестик
        closeBtn.addEventListener('click', function() {
            modalOverlay.style.display = 'none';
            body.classList.remove('blur-background');
        });

        // Закрываем модальное окно при клике на оверлей
        modalOverlay.addEventListener('click', function(e) {
            if (e.target === modalOverlay) {
                modalOverlay.style.display = 'none';
                body.classList.remove('blur-background');
            }
        });
        openModalBtn2.addEventListener('click', function() {
            modalOverlay.style.display = 'flex';
            body.classList.add('blur-background');
        });