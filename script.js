/**
 * Lucky Folks - Homepage Interactive Scripts
 * Handles animations, scroll effects, and menu functionality
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initMenu();
    initScrollReveal();
    initSmoothScroll();
    initSideNavigation();
    initParallax();
    initHeaderScroll();
});

/**
 * Mobile Menu Toggle
 */
function initMenu() {
    const menuBtn = document.querySelector('.btn-menu');
    const menuOverlay = document.getElementById('menuOverlay');
    const menuLinks = document.querySelectorAll('.menu-nav a, .menu-reserve');
    
    if (!menuBtn || !menuOverlay) return;
    
    // Add data attributes for menu numbering
    const menuNavLinks = document.querySelectorAll('.menu-nav a');
    menuNavLinks.forEach((link, index) => {
        link.setAttribute('data-num', `0${index + 1}`);
    });
    
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.style.overflow = menuOverlay.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu on link click
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuOverlay.classList.contains('active')) {
            menuBtn.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/**
 * Scroll Reveal Animations
 */
function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.tagline-text, .tagline-icon, .about-title, .about-right, ' +
        '.split-panel, .ambiance-content, .teambuilding-content, ' +
        '.reserve-title, .btn-reserve-large'
    );
    
    revealElements.forEach(el => el.classList.add('reveal'));
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);
    
    revealElements.forEach(el => observer.observe(el));
}

/**
 * Smooth Scrolling for Anchor Links
 */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Side Navigation Updates Based on Scroll Position
 */
function initSideNavigation() {
    const sections = [
        { id: 'hero', navText: 'EAT' },
        { id: 'tagline', navText: 'EAT' },
        { id: 'about', navText: 'EAT' },
        { id: 'split', navText: 'DRINK' },
        { id: 'ambiance', navText: 'DRINK' },
        { id: 'teambuilding', navText: 'PLAY' },
        { id: 'reserve', navText: 'PLAY' }
    ];
    
    const leftNav = document.querySelector('.side-nav-left .side-nav-text');
    const rightNav = document.querySelector('.side-nav-right .side-nav-text');
    
    if (!leftNav || !rightNav) return;
    
    const updateNavigation = () => {
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        
        for (let i = sections.length - 1; i >= 0; i--) {
            const section = document.getElementById(sections[i].id);
            if (section && section.offsetTop <= scrollPosition) {
                const navText = sections[i].navText;
                leftNav.textContent = navText;
                
                // Cycle through EAT, DRINK, PLAY for right nav
                const navOptions = ['EAT', 'DRINK', 'PLAY'];
                const currentIndex = navOptions.indexOf(navText);
                const nextIndex = (currentIndex + 2) % 3;
                rightNav.textContent = navOptions[nextIndex];
                break;
            }
        }
    };
    
    window.addEventListener('scroll', throttle(updateNavigation, 100));
    updateNavigation();
}

/**
 * Parallax Effects
 */
function initParallax() {
    const heroImage = document.querySelector('.hero-image');
    const blobs = document.querySelectorAll('.ambiance-blob, .teambuilding-blob');
    
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        // Hero parallax
        if (heroImage && scrollY < window.innerHeight) {
            heroImage.style.transform = `scale(1.1) translateY(${scrollY * 0.3}px)`;
        }
        
        // Blob floating effect
        blobs.forEach((blob, index) => {
            const speed = 0.05 + (index * 0.02);
            const yOffset = Math.sin(scrollY * 0.002 + index) * 20;
            blob.style.transform = `translateY(${yOffset}px)`;
        });
    });
}

/**
 * Header Background on Scroll
 */
function initHeaderScroll() {
    const header = document.querySelector('.header');

    if (!header) return;

    const updateHeader = () => {
        // Keep header transparent
        header.style.background = 'transparent';
        header.style.backdropFilter = 'none';
    };

    window.addEventListener('scroll', throttle(updateHeader, 50));
    updateHeader();
}

/**
 * Throttle Utility Function
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Intersection Observer for Section Color Changes
 */
function initSectionColors() {
    const sections = document.querySelectorAll('section');
    const header = document.querySelector('.header');
    const logo = document.querySelector('.logo-svg');
    
    const colorMap = {
        'hero': { logo: '#e6a23c', text: '#ffffff' },
        'tagline': { logo: '#e6a23c', text: '#1e2756' },
        'about': { logo: '#e6a23c', text: '#ffffff' },
        'split': { logo: '#1e2756', text: '#1e2756' },
        'ambiance': { logo: '#e6a23c', text: '#ffffff' },
        'teambuilding': { logo: '#e6a23c', text: '#ffffff' },
        'reserve': { logo: '#e6a23c', text: '#ffffff' }
    };
    
    const observerOptions = {
        root: null,
        rootMargin: '-50% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                const colors = colorMap[sectionId];
                if (colors && logo) {
                    logo.style.color = colors.logo;
                }
            }
        });
    }, observerOptions);
    
    sections.forEach(section => {
        if (section.id) {
            observer.observe(section);
        }
    });
}

// Initialize section colors after DOM is ready
document.addEventListener('DOMContentLoaded', initSectionColors);

/**
 * Preloader (optional enhancement)
 */
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    setTimeout(() => {
        document.querySelectorAll('.hero .title-line').forEach((line, i) => {
            line.style.animationPlayState = 'running';
        });
    }, 100);
});

/**
 * Mouse Move Effect for Blobs (Desktop Only)
 */
if (window.matchMedia('(min-width: 1024px)').matches) {
    document.addEventListener('mousemove', (e) => {
        const blobs = document.querySelectorAll('.ambiance-blob, .teambuilding-blob');
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        blobs.forEach((blob, index) => {
            const intensity = 20 + (index * 10);
            const x = mouseX * intensity;
            const y = mouseY * intensity;
            blob.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
}

/**
 * Scroll Progress Indicator (updates scroll badge rotation)
 */
function initScrollProgress() {
    const scrollText = document.querySelector('.scroll-text');
    
    if (!scrollText) return;
    
    window.addEventListener('scroll', () => {
        const scrollProgress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        const rotation = scrollProgress * 360 * 2; // 2 full rotations over page scroll
        scrollText.style.transform = `rotate(${rotation}deg)`;
    });
}

// Comment out default rotation animation and use scroll-based instead
// Uncomment below to enable scroll-based rotation
// document.addEventListener('DOMContentLoaded', initScrollProgress);

