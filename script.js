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
        '.split-panel, .ambiance-content, ' +
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
    const blobs = document.querySelectorAll('.ambiance-blob');
    
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
        // Only keep transparent on desktop, let CSS handle mobile/tablet
        if (window.innerWidth > 768) {
            header.style.background = 'transparent';
            header.style.backdropFilter = 'none';
        } else {
            // Remove inline styles on mobile/tablet to let CSS take over
            header.style.background = '';
            header.style.backdropFilter = '';
        }
    };

    window.addEventListener('scroll', throttle(updateHeader, 50));
    window.addEventListener('resize', throttle(updateHeader, 100));
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
        const blobs = document.querySelectorAll('.ambiance-blob');
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
document.addEventListener("DOMContentLoaded", () => {
    initWaveMarquee();
});

/**
 * Wave Marquee Animation - Lucky Folks Style
 * Creates a smooth traveling wave effect on scrolling text
 */
function initWaveMarquee() {
    if (typeof gsap === "undefined") return;

    const tracks = document.querySelectorAll(".marquee-track");
    if (!tracks.length) return;

    // Split text into characters using SplitType
    if (typeof SplitType !== "undefined") {
        document.querySelectorAll(".marquee-text").forEach(text => {
            new SplitType(text, { types: "chars" });
        });
    }

    // Wait for DOM update after splitting
    requestAnimationFrame(() => {
        // Calculate track width for seamless loop
        const firstTrack = document.getElementById("gsap-marquee-1");
        if (!firstTrack) return;
        
        const singleTextWidth = firstTrack.querySelector(".marquee-text")?.offsetWidth || 0;
        const totalWidth = singleTextWidth * 2; // Width of 2 text spans for seamless loop

        // -----------------------------
        // HORIZONTAL SCROLL ANIMATION
        // -----------------------------
        tracks.forEach((track, index) => {
            // Different speeds for each row
            const duration = 25 + (index * 5);
            
            gsap.to(track, {
                x: -totalWidth,
                duration: duration,
                ease: "none",
                repeat: -1,
                modifiers: {
                    x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
                }
            });
        });

        // -----------------------------
        // WAVE ANIMATION - Ocean Wave Effect
        // -----------------------------
        // Text rides on top of a traveling water wave
        const waveConfig = {
            amplitude: 25,       // Wave height (bigger wave)
            speed: 0.025,        // How fast the wave travels
            waveLength: 250      // Distance between wave peaks (in pixels)
        };

        // Get all rows for the wave effect
        const rows = document.querySelectorAll(".marquee-row");
        
        // Smooth continuous wave animation using GSAP ticker
        let time = 0;
        
        gsap.ticker.add(() => {
            time += waveConfig.speed;
            
            rows.forEach((row, rowIndex) => {
                const chars = row.querySelectorAll(".char");
                if (!chars.length) return;
                
                // Phase offset for each row (creates layered wave effect)
                chars.forEach((char) => {
                    // Get character's position relative to viewport
                    const rect = char.getBoundingClientRect();
                    const charX = rect.left + rect.width / 2;
                    
                    // Calculate wave based on horizontal position
                    // Wave travels from right to left (opposite to scroll direction)
                    const phase = (charX / waveConfig.waveLength) + time ;
                    const y = Math.sin(phase) * waveConfig.amplitude;
                    
                    // Tilt based on wave slope (cosine = derivative of sine)
                    // Letters tilt as they ride up and down the wave
                    const rotation = Math.cos(phase) * 8; // 8 degrees max tilt
                    
                    // Apply vertical displacement and rotation
                    char.style.transform = `translateY(${y}px) rotate(${rotation}deg)`;
                });
            });
        });
    });
}
