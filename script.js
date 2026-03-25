/**
 * SEMESTA COMPUTER - DYNAMIC INTERACTIONS
 * Memproses animasi Scroll Reveal, Parallax Tilt, dan Haptic Feedback
 */

document.addEventListener('DOMContentLoaded', () => {
    const htmlElement = document.documentElement;
    const themeToggle = document.getElementById('theme-toggle');

    // --- 1. THEME MANAGEMENT ---
    const updateTheme = () => {
        const isDark = htmlElement.hasAttribute('data-theme');
        if (isDark) {
            htmlElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeToggle.innerText = '🌙';
        } else {
            htmlElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggle.innerText = '☀️';
        }
    };

    themeToggle.addEventListener('click', updateTheme);

    // Cek preferensi tersimpan
    if (localStorage.getItem('theme') === 'dark') {
        htmlElement.setAttribute('data-theme', 'dark');
        themeToggle.innerText = '☀️';
    }

    // --- 2. SCROLL REVEAL (Animasi Muncul saat Scroll) ---
    // Targetkan semua elemen utama untuk efek muncul perlahan
    const animatedElements = document.querySelectorAll(
        'section, .glass-panel, .card, .section-heading, .social-footer'
    );

    animatedElements.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                revealObserver.unobserve(entry.target); // Animasi hanya sekali
            }
        });
    }, { 
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px' 
    });

    animatedElements.forEach(el => revealObserver.observe(el));

    // --- 3. PARALLAX GLASS EFFECT (Desktop Only) ---
    if (window.innerWidth > 1024) {
        const glassPanels = document.querySelectorAll('.about-container, .location-container, .main-cta');
        
        document.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const xRotation = (clientY - window.innerHeight / 2) / 60;
            const yRotation = (clientX - window.innerWidth / 2) / 60;

            glassPanels.forEach(panel => {
                panel.style.transform = `perspective(1000px) rotateX(${-xRotation}deg) rotateY(${yRotation}deg)`;
            });
        });
    }

    // --- 4. HAPTIC VISUAL FEEDBACK (Mobile/Android/iOS) ---
    const touchElements = document.querySelectorAll('.btn-primary, .btn-secondary, .card, .bottom-nav a, .social-item');

    touchElements.forEach(el => {
        el.addEventListener('touchstart', () => {
            el.style.transform = 'scale(0.92)';
            el.style.transition = 'transform 0.1s ease';
        }, { passive: true });
        
        el.addEventListener('touchend', () => {
            el.style.transform = '';
            el.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        }, { passive: true });
    });

    // --- 5. SMOOTH SCROLL OPTIMIZATION ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === "#") return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navHeight = 90;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});