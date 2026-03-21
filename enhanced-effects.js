/* ============================================
   ENHANCED EFFECTS - NutriStructure
   Fixed visibility + Enhanced animations
   ============================================ */

(function() {
    'use strict';

    // ============================================
    // 1. ENSURE CONTENT VISIBILITY (FIX FOR DEPLOYMENT)
    // ============================================
    function ensureVisibility() {
        // Make all sections visible immediately
        document.querySelectorAll('section').forEach(section => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        });
        
        // Make calculator card visible
        const calculatorCard = document.querySelector('.calculator-card');
        if (calculatorCard) {
            calculatorCard.style.display = 'block';
            calculatorCard.style.visibility = 'visible';
        }
        
        // Make form steps visible
        document.querySelectorAll('.form-step').forEach(step => {
            if (step.classList.contains('active')) {
                step.style.display = 'block';
            }
        });
    }

    // Run immediately and on DOM ready
    ensureVisibility();
    document.addEventListener('DOMContentLoaded', ensureVisibility);

    // ============================================
    // 2. SMOOTH SCROLL REVEAL ANIMATIONS
    // ============================================
    function initScrollReveal() {
        const revealElements = document.querySelectorAll(
            '.pillar-card, .problem-card, .product-card, .testimonial-card, ' +
            '.comparison-card, .phase-card, .citation-card, .faq-item, ' +
            '.step-card, .benefit-item, .ingredient-card, .research-card'
        );

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Add staggered delay
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => {
            // Set initial state for animation
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(el);
        });
    }

    // ============================================
    // 3. ENHANCED CARD HOVER EFFECTS
    // ============================================
    function initCardHoverEffects() {
        const cards = document.querySelectorAll('.pillar-card, .product-card, .testimonial-card, .step-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
                this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '';
            });
        });
    }

    // ============================================
    // 4. BUTTON RIPPLE EFFECT
    // ============================================
    function initRippleEffect() {
        const buttons = document.querySelectorAll('.btn, .btn-primary, .btn-product, .hero-cta, .btn-product-cta');
        
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const ripple = document.createElement('span');
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.5);
                    transform: scale(0);
                    animation: rippleEffect 0.6s ease-out;
                    left: ${x}px;
                    top: ${y}px;
                    width: 10px;
                    height: 10px;
                    margin: -5px;
                    pointer-events: none;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });
        
        // Add ripple animation keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rippleEffect {
                to { transform: scale(25); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    // ============================================
    // 5. NAVIGATION SCROLL EFFECT
    // ============================================
    function initNavScroll() {
        const nav = document.querySelector('nav');
        if (!nav) return;
        
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;
            
            if (currentScroll > 100) {
                nav.style.background = 'rgba(255, 255, 255, 0.95)';
                nav.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
                nav.style.padding = '10px 0';
            } else {
                nav.style.background = 'rgba(255, 255, 255, 0.98)';
                nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
                nav.style.padding = '15px 0';
            }
            
            lastScroll = currentScroll;
        }, { passive: true });
    }

    // ============================================
    // 6. COUNT UP ANIMATION FOR STATS
    // ============================================
    function initCountUp() {
        const statElements = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const text = el.textContent;
                    const numMatch = text.match(/[\d,]+/);
                    
                    if (numMatch) {
                        const targetNum = parseInt(numMatch[0].replace(/,/g, ''));
                        const suffix = text.replace(numMatch[0], '');
                        const duration = 2000;
                        const startTime = performance.now();
                        
                        function updateCount(currentTime) {
                            const elapsed = currentTime - startTime;
                            const progress = Math.min(elapsed / duration, 1);
                            const easeOut = 1 - Math.pow(1 - progress, 3);
                            const currentNum = Math.floor(targetNum * easeOut);
                            
                            el.textContent = currentNum.toLocaleString() + suffix;
                            
                            if (progress < 1) {
                                requestAnimationFrame(updateCount);
                            }
                        }
                        
                        requestAnimationFrame(updateCount);
                    }
                    
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.5 });
        
        statElements.forEach(el => observer.observe(el));
    }

    // ============================================
    // 7. SMOOTH ANCHOR SCROLL
    // ============================================
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

    // ============================================
    // 8. FLOATING ANIMATION FOR HERO ELEMENTS
    // ============================================
    function initFloatingElements() {
        const floatElements = document.querySelectorAll('.hero-badge, .logo-icon');
        
        floatElements.forEach((el, index) => {
            el.style.animation = `float ${3 + index * 0.5}s ease-in-out infinite`;
        });
        
        // Add float animation if not exists
        if (!document.getElementById('float-animation')) {
            const style = document.createElement('style');
            style.id = 'float-animation';
            style.textContent = `
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
            `;
            document.head.appendChild(style);
        }
    }

    // ============================================
    // 9. PULSE ANIMATION FOR CTA BUTTONS
    // ============================================
    function initPulseAnimation() {
        const ctaButtons = document.querySelectorAll('.hero-cta, .btn-main');
        
        ctaButtons.forEach(btn => {
            btn.classList.add('pulse-animation');
        });
        
        // Add pulse animation
        const style = document.createElement('style');
        style.textContent = `
            .pulse-animation {
                animation: pulseBtn 2s ease-in-out infinite;
            }
            @keyframes pulseBtn {
                0%, 100% { box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4); }
                50% { box-shadow: 0 8px 35px rgba(16, 185, 129, 0.6), 0 0 20px rgba(16, 185, 129, 0.3); }
            }
        `;
        document.head.appendChild(style);
    }

    // ============================================
    // 10. PARALLAX EFFECT FOR HERO
    // ============================================
    function initParallax() {
        const hero = document.querySelector('.hero');
        if (!hero) return;
        
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const rate = scrolled * 0.3;
            
            hero.style.backgroundPositionY = `${rate}px`;
        }, { passive: true });
    }

    // ============================================
    // 11. TYPING EFFECT FOR HEADLINES
    // ============================================
    function initTypingEffect() {
        const headlines = document.querySelectorAll('.hero h1');
        
        headlines.forEach(headline => {
            const text = headline.textContent;
            headline.textContent = '';
            headline.style.opacity = '1';
            
            let i = 0;
            const typeInterval = setInterval(() => {
                if (i < text.length) {
                    headline.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typeInterval);
                }
            }, 50);
        });
    }

    // ============================================
    // 12. GLOW EFFECT ON HOVER FOR CARDS
    // ============================================
    function initGlowEffect() {
        const cards = document.querySelectorAll('.pillar-card, .product-pillar-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.boxShadow = '0 20px 50px rgba(16, 185, 129, 0.3)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.boxShadow = '';
            });
        });
    }

    // ============================================
    // INITIALIZE ALL EFFECTS
    // ============================================
    function init() {
        // Ensure visibility first
        ensureVisibility();
        
        // Initialize all effects
        initScrollReveal();
        initCardHoverEffects();
        initRippleEffect();
        initNavScroll();
        initCountUp();
        initSmoothScroll();
        initFloatingElements();
        initPulseAnimation();
        initParallax();
        initGlowEffect();
        
        console.log('✨ Enhanced Effects Loaded - NutriStructure');
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Also run immediately for visibility fix
    ensureVisibility();

})();
