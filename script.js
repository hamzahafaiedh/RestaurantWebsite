/**
 * Lucky Folks - Homepage Interactive Scripts
 * Handles animations, scroll effects, and menu functionality
 */

// Performance optimization: Reduce Motion Support
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    initMenu();
    initScrollReveal();
    initSmoothScroll();
    initSideNavigation();

    // Only run heavy animations if user doesn't prefer reduced motion
    if (!prefersReducedMotion) {
        initParallax();
    }

    initHeaderScroll();
    optimizeVideoLoading();
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
 * Parallax Effects - Optimized with RAF
 */
function initParallax() {
    const heroImage = document.querySelector('.hero-image');
    const blobs = document.querySelectorAll('.ambiance-blob');
    let ticking = false;

    const updateParallax = () => {
        const scrollY = window.scrollY;

        // Hero parallax
        if (heroImage && scrollY < window.innerHeight) {
            heroImage.style.transform = `scale(1.1) translateY(${scrollY * 0.3}px)`;
        }

        // Blob floating effect
        blobs.forEach((blob, index) => {
            const speed = 0.05 + (index * 0.02);
            const yOffset = Math.sin(scrollY * 0.002 + index) * 20;
            blob.style.transform = `translateY(${yOffset}px) translateZ(0)`;
        });

        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });
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
 * Mouse Move Effect for Blobs (Desktop Only) - Optimized
 */
if (window.matchMedia('(min-width: 1024px)').matches && !prefersReducedMotion) {
    let mouseTicking = false;
    let mouseX = 0;
    let mouseY = 0;

    const updateBlobPosition = () => {
        const blobs = document.querySelectorAll('.ambiance-blob');
        blobs.forEach((blob, index) => {
            const intensity = 20 + (index * 10);
            const x = mouseX * intensity;
            const y = mouseY * intensity;
            blob.style.transform = `translate(${x}px, ${y}px) translateZ(0)`;
        });
        mouseTicking = false;
    };

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX / window.innerWidth - 0.5;
        mouseY = e.clientY / window.innerHeight - 0.5;

        if (!mouseTicking) {
            requestAnimationFrame(updateBlobPosition);
            mouseTicking = true;
        }
    }, { passive: true });
}

/**
 * Scroll Progress Indicator (updates scroll badge rotation)
 */
function initScrollProgress() {
    const scrollText = document.querySelector('.scroll-text');
    if (!scrollText) return;

    let scrollTicking = false;

    const updateScrollRotation = () => {
        const scrollProgress = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        const rotation = scrollProgress * 360 * 2;
        scrollText.style.transform = `rotate(${rotation}deg) translateZ(0)`;
        scrollTicking = false;
    };

    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            requestAnimationFrame(updateScrollRotation);
            scrollTicking = true;
        }
    }, { passive: true });
}

/**
 * Optimize Video Loading
 */
function optimizeVideoLoading() {
    const heroVideo = document.querySelector('.hero-video');
    if (!heroVideo) return;

    // Reduce video quality on mobile for faster loading
    if (window.innerWidth < 768) {
        heroVideo.playbackRate = 1;
        // Add a lower resolution source for mobile if available
    }

    // Pause video when not in viewport to save resources
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                heroVideo.play().catch(e => console.log('Video play failed:', e));
            } else {
                heroVideo.pause();
            }
        });
    }, { threshold: 0.25 });

    videoObserver.observe(heroVideo);
}
document.addEventListener("DOMContentLoaded", () => {
    initWaveMarquee();
});

/**
 * Wave Marquee Animation - Optimized for Performance
 * Creates a smooth traveling wave effect on scrolling text
 */
function initWaveMarquee() {
    if (typeof gsap === "undefined") return;
    if (prefersReducedMotion) return; // Skip if user prefers reduced motion

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
        const totalWidth = singleTextWidth * 2;

        // -----------------------------
        // HORIZONTAL SCROLL ANIMATION
        // -----------------------------
        tracks.forEach((track, index) => {
            const duration = 25 + (index * 5);

            gsap.to(track, {
                x: -totalWidth,
                duration: duration,
                ease: "none",
                repeat: -1,
                modifiers: {
                    x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
                },
                force3D: true // Force GPU acceleration
            });
        });

        // -----------------------------
        // WAVE ANIMATION - Optimized
        // -----------------------------
        const waveConfig = {
            amplitude: 25,
            speed: 0.02, // Slightly reduced for better performance
            waveLength: 250
        };

        const rows = document.querySelectorAll(".marquee-row");
        let time = 0;
        let frameCount = 0;

        // Only update wave animation if section is in viewport
        const marqueeSection = document.querySelector(".about-section");
        let isInViewport = false;

        if (marqueeSection) {
            const marqueeObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    isInViewport = entry.isIntersecting;
                });
            }, { threshold: 0.1 });

            marqueeObserver.observe(marqueeSection);
        }

        gsap.ticker.add(() => {
            // Skip animation if not in viewport
            if (!isInViewport) return;

            // Throttle to every 2 frames for better performance
            frameCount++;
            if (frameCount % 2 !== 0) return;

            time += waveConfig.speed;

            rows.forEach((row) => {
                const chars = row.querySelectorAll(".char");
                if (!chars.length) return;

                chars.forEach((char) => {
                    const rect = char.getBoundingClientRect();
                    const charX = rect.left + rect.width / 2;

                    const phase = (charX / waveConfig.waveLength) + time;
                    const y = Math.sin(phase) * waveConfig.amplitude;
                    const rotation = Math.cos(phase) * 8;

                    // Use transform with translateZ for GPU acceleration
                    char.style.transform = `translateY(${y}px) rotate(${rotation}deg) translateZ(0)`;
                });
            });
        });
    });
}
