
        const openModalBtn = document.querySelector('.open-modal-btn');
        const openModalBtn2 = document.getElementById('open-modal-btn');
        const modalOverlay = document.getElementById('modalOverlay');
        const closeBtn = document.querySelector('.close-btn');
        const pageContent = document.querySelector('.page-content');
        const body = document.body;


        openModalBtn.addEventListener('click', function() {
            modalOverlay.style.display = 'flex';
            body.classList.add('blur-background');
        });

        


        closeBtn.addEventListener('click', function() {
            modalOverlay.style.display = 'none';
            body.classList.remove('blur-background');
        });

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