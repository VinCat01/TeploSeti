
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    const dropdownBtns = document.querySelectorAll('.dropdown-btn');
    
    mobileMenuBtn.addEventListener('click', function() {
        nav.classList.toggle('active');
    });
    
    dropdownBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                const dropdown = this.parentElement;
                dropdown.classList.toggle('active');
            }
        });
    });
});