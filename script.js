document.addEventListener('DOMContentLoaded', () => {
    
    // 1. SCROLL ANIMATION & PROGRESS BAR
    const steps = document.querySelectorAll('.step');
    const progressText = document.getElementById('progress-text');
    const progressFill = document.getElementById('progress-fill');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -20% 0px',
        threshold: 0.2
    };

    const stepObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                if (progressText && progressFill) {
                    const stepNum = entry.target.getAttribute('data-step');
                    const totalSteps = entry.target.getAttribute('data-total');
                    
                    progressText.innerText = `LANGKAH ${stepNum.padStart(2, '0')} / ${totalSteps}`;
                    
                    const percentage = (stepNum / totalSteps) * 100;
                    progressFill.style.width = `${percentage}%`;
                }
            }
        });
    }, observerOptions);

    steps.forEach(step => {
        stepObserver.observe(step);
    });

    // 2. CAROUSEL TABUNGAN (Jika ada di halaman)
    const carouselContainer = document.getElementById('tabungan-carousel');
    const dots = document.querySelectorAll('.dot');

    if (carouselContainer) {
        carouselContainer.addEventListener('scroll', () => {
            const scrollLeft = carouselContainer.scrollLeft;
            const slideWidth = carouselContainer.clientWidth;
            
            let activeIndex = Math.round(scrollLeft / slideWidth);
            
            if(activeIndex < 0) activeIndex = 0;
            if(activeIndex > dots.length - 1) activeIndex = dots.length - 1;

            dots.forEach((dot, index) => {
                if (index === activeIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        });
    }

    // 3. BACK TO TOP BUTTON
    const backToTopBtn = document.getElementById('backToTopBtn');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 4. FITUR "SELESAI" -> TAMPILKAN THANK YOU SCREEN
    const btnSelesaiList = document.querySelectorAll('.btn-selesai');
    const mainTutorialWrapper = document.getElementById('main-tutorial-wrapper');
    const thankYouScreen = document.getElementById('thankYouScreen');
    const topNavSimple = document.querySelector('.top-nav-simple');
    const progressContainer = document.querySelector('.progress-container');
    const backToTop = document.querySelector('.back-to-top');

    btnSelesaiList.forEach(btn => {
        btn.addEventListener('click', () => {
            if(mainTutorialWrapper && thankYouScreen) {
                // Sembunyikan semua elemen tutorial
                mainTutorialWrapper.style.display = 'none';
                if(topNavSimple) topNavSimple.style.display = 'none';
                if(progressContainer) progressContainer.style.display = 'none';
                if(backToTop) backToTop.style.display = 'none';
                
                // Tampilkan halaman ucapan terima kasih
                thankYouScreen.classList.remove('hidden');
                
                // Scroll kembali ke atas
                window.scrollTo({ top: 0, behavior: 'instant' });
            }
        });
    });
});