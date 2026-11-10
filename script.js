document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Toggle icon
            const iconName = navLinks.classList.contains('active') ? 'x' : 'menu';
            mobileMenu.innerHTML = `<i data-lucide="${iconName}"></i>`;
            lucide.createIcons();
        });
    }

    // Close mobile menu after picking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (!navLinks.classList.contains('active')) return;
            navLinks.classList.remove('active');
            mobileMenu.innerHTML = '<i data-lucide="menu"></i>';
            lucide.createIcons();
        });
    });

    // Project filters
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.dataset.filter;
            projectCards.forEach(card => {
                card.classList.toggle('hidden', filter !== 'all' && card.dataset.category !== filter);
            });
        });
    });

    // Certificate lightbox
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = lightbox.querySelector('img');
    const closeLightbox = () => lightbox.classList.remove('open');
    document.querySelectorAll('.cert-thumb img').forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightbox.classList.add('open');
        });
    });
    lightbox.addEventListener('click', e => {
        if (e.target !== lightboxImg) closeLightbox();
    });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeLightbox();
    });

    // Header scroll background change
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'var(--header-bg)';
            header.style.padding = '5px 0';
        } else {
            header.style.background = 'var(--header-bg)';
            header.style.padding = '0';
        }
    });

    // Simple reveal animation on scroll
    const sections = document.querySelectorAll('section');
    const revealOnScroll = () => {
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const triggerPoint = window.innerHeight - 150;
            if (sectionTop < triggerPoint) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    };

    // Initial styles for animation
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease-out';
    });

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Run once on load
});
