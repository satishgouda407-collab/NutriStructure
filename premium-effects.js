/* ============================================
   THE 5-PILLAR PROTOCOL - PREMIUM EFFECTS JS
   Scroll Animations | Custom Cursor | Interactions
   ============================================ */

(function() {
    'use strict';

    // ============================================
    // 1. CUSTOM CURSOR
    // ============================================
    function initCustomCursor() {
        // Skip on touch devices
        if (window.matchMedia('(pointer: coarse)').matches) return;

        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);

        // Create trail elements
        const trails = [];
        for (let i = 0; i < 5; i++) {
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            trail.style.opacity = (0.3 - i * 0.05).toString();
            document.body.appendChild(trail);
            trails.push(trail);
        }

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let trailPositions = trails.map(() => ({ x: 0, y: 0 }));

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        }, { passive: true });

        // Hover effect on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .btn, .pillar-card, .product-card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });

        // Animation loop
        function animateCursor() {
            // Smooth cursor follow
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;
            cursor.style.left = cursorX - 10 + 'px';
            cursor.style.top = cursorY - 10 + 'px';

            // Trail effect
            for (let i = trails.length - 1; i >= 0; i--) {
                const targetX = i === 0 ? cursorX : trailPositions[i - 1].x;
                const targetY = i === 0 ? cursorY : trailPositions[i - 1].y;
                
                trailPositions[i].x += (targetX - trailPositions[i].x) * (0.2 - i * 0.03);
                trailPositions[i].y += (targetY - trailPositions[i].y) * (0.2 - i * 0.03);
                
                trails[i].style.left = trailPositions[i].x - 4 + 'px';
                trails[i].style.top = trailPositions[i].y - 4 + 'px';
            }

            requestAnimationFrame(animateCursor);
        }
        animateCursor();
    }

    // ============================================
    // 2. SCROLL REVEAL ANIMATIONS
    // ============================================
    function initScrollReveal() {
        const revealElements = document.querySelectorAll(
            '.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale, ' +
            '.pillar-card, .problem-card, .product-card, .transformation-card, .customer-card, ' +
            '.comparison-card, .phase-card, .citation-card, .faq-item, .stack-item'
        );

        // Add scroll-reveal class if not present
        revealElements.forEach(el => {
            if (!el.classList.contains('scroll-reveal') && 
                !el.classList.contains('scroll-reveal-left') && 
                !el.classList.contains('scroll-reveal-right') && 
                !el.classList.contains('scroll-reveal-scale')) {
                el.classList.add('scroll-reveal');
            }
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(el => observer.observe(el));
    }

    // ============================================
    // 3. PARALLAX EFFECTS
    // ============================================
    function initParallax() {
        const parallaxElements = document.querySelectorAll('.parallax-orbs, .hero::before, .hero::after');
        
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const scrollY = window.scrollY;
                    
                    parallaxElements.forEach(el => {
                        if (el) {
                            const speed = 0.5;
                            el.style.transform = `translateY(${scrollY * speed}px)`;
                        }
                    });
                    
                    ticking = false;
                });
                ticking = true;
            }
        }, { passive: true });
    }

    // ============================================
    // 4. RIPPLE EFFECT ON BUTTONS
    // ============================================
    function initRippleEffect() {
        const buttons = document.querySelectorAll('.btn, .btn-premium, .btn-product, .btn-main, .hero-cta');
        
        buttons.forEach(button => {
            button.classList.add('ripple');
            
            button.addEventListener('click', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const ripple = document.createElement('span');
                ripple.className = 'ripple-effect';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                
                this.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            });
        });
    }

    // ============================================
    // 5. MAGNETIC BUTTON EFFECT
    // ============================================
    function initMagneticButtons() {
        if (window.matchMedia('(pointer: coarse)').matches) return;
        
        const magneticButtons = document.querySelectorAll('.btn-premium, .hero-cta');
        
        magneticButtons.forEach(btn => {
            btn.classList.add('magnetic-btn');
            
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0)';
            });
        });
    }

    // ============================================
    // 6. COUNT UP ANIMATION
    // ============================================
    function initCountUp() {
        const countElements = document.querySelectorAll('.stat-number, .count-up');
        
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
        
        countElements.forEach(el => observer.observe(el));
    }

    // ============================================
    // 7. NAVIGATION SCROLL EFFECT
    // ============================================
    function initNavScroll() {
        const nav = document.querySelector('nav');
        if (!nav) return;
        
        let lastScroll = 0;
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;
            
            if (currentScroll > 100) {
                nav.classList.add('nav-glass');
                nav.style.padding = '10px 0';
            } else {
                nav.classList.remove('nav-glass');
                nav.style.padding = '15px 0';
            }
            
            lastScroll = currentScroll;
        }, { passive: true });
    }

    // ============================================
    // 8. SMOOTH ANCHOR SCROLL
    // ============================================
    function initSmoothAnchorScroll() {
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
    // 9. TILT EFFECT ON CARDS
    // ============================================
    function initTiltEffect() {
        if (window.matchMedia('(pointer: coarse)').matches) return;
        
        const cards = document.querySelectorAll('.pillar-card, .product-card, .transformation-card');
        
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
            });
        });
    }

    // ============================================
    // 10. CONFETTI CELEBRATION
    // ============================================
    window.triggerConfetti = function() {
        const colors = ['#10b981', '#f59e0b', '#34d399', '#fcd34d', '#059669'];
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                confetti.style.left = Math.random() * 100 + 'vw';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
                confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
                
                const piece = document.createElement('div');
                piece.className = 'confetti-piece';
                piece.style.animationDelay = Math.random() * 0.5 + 's';
                piece.style.animationDuration = (2 + Math.random() * 2) + 's';
                
                confetti.appendChild(piece);
                document.body.appendChild(confetti);
                
                setTimeout(() => confetti.remove(), 4000);
            }, i * 30);
        }
    };

    // ============================================
    // 11. TOAST NOTIFICATION
    // ============================================
    window.showToast = function(title, message, icon = '✓') {
        const existingToast = document.querySelector('.toast-notification');
        if (existingToast) existingToast.remove();
        
        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.innerHTML = `
            <div class="toast-icon">${icon}</div>
            <div class="toast-content">
                <h4>${title}</h4>
                <p>${message}</p>
            </div>
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => toast.classList.add('show'), 100);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 500);
        }, 4000);
    };

    // ============================================
    // 12. TEXT SCRAMBLE EFFECT
    // ============================================
    window.TextScramble = class {
        constructor(el) {
            this.el = el;
            this.chars = '!<>-_\\/[]{}—=+*^?#________';
            this.update = this.update.bind(this);
        }
        
        setText(newText) {
            const oldText = this.el.innerText;
            const length = Math.max(oldText.length, newText.length);
            const promise = new Promise(resolve => this.resolve = resolve);
            this.queue = [];
            
            for (let i = 0; i < length; i++) {
                const from = oldText[i] || '';
                const to = newText[i] || '';
                const start = Math.floor(Math.random() * 40);
                const end = start + Math.floor(Math.random() * 40);
                this.queue.push({ from, to, start, end });
            }
            
            cancelAnimationFrame(this.frameRequest);
            this.frame = 0;
            this.update();
            return promise;
        }
        
        update() {
            let output = '';
            let complete = 0;
            
            for (let i = 0, n = this.queue.length; i < n; i++) {
                let { from, to, start, end, char } = this.queue[i];
                
                if (this.frame >= end) {
                    complete++;
                    output += to;
                } else if (this.frame >= start) {
                    if (!char || Math.random() < 0.28) {
                        char = this.randomChar();
                        this.queue[i].char = char;
                    }
                    output += `<span class="dud">${char}</span>`;
                } else {
                    output += from;
                }
            }
            
            this.el.innerHTML = output;
            
            if (complete === this.queue.length) {
                this.resolve();
            } else {
                this.frameRequest = requestAnimationFrame(this.update);
                this.frame++;
            }
        }
        
        randomChar() {
            return this.chars[Math.floor(Math.random() * this.chars.length)];
        }
    };

    // ============================================
    // INITIALIZE ALL EFFECTS
    // ============================================
    function init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', runInit);
        } else {
            runInit();
        }
    }

    function runInit() {
        initCustomCursor();
        initScrollReveal();
        initParallax();
        initRippleEffect();
        initMagneticButtons();
        initCountUp();
        initNavScroll();
        initSmoothAnchorScroll();
        initTiltEffect();
        
        console.log('🚀 Premium Effects Loaded - The 5-Pillar Protocol');
    }

    // Run initialization
    init();

})();
