/* ============================================
   THE 5-PILLAR PROTOCOL - BADGE GAMIFICATION SYSTEM
   Pillar Mastery Badges with LocalStorage Tracking
   ============================================ */

(function() {
    'use strict';

    // Badge definitions
    const BADGES = {
        'metabolism': {
            id: 'metabolism',
            name: 'Metabolism Master',
            icon: '⚡',
            description: 'Mastered the Metabolism Pillar',
            page: 'index.html',
            color: '#10b981'
        },
        'hormones': {
            id: 'hormones',
            name: 'Hormone Hero',
            icon: '⚖️',
            description: 'Balanced your fat-burning hormones',
            page: 'index.html',
            color: '#f59e0b'
        },
        'appetite': {
            id: 'appetite',
            name: 'Appetite Controller',
            icon: '🍽️',
            description: 'Mastered hunger and cravings',
            page: 'index.html',
            color: '#8b5cf6'
        },
        'energy': {
            id: 'energy',
            name: 'Energy Optimizer',
            icon: '🔋',
            description: 'Maximized cellular energy production',
            page: 'index.html',
            color: '#06b6d4'
        },
        'cellular': {
            id: 'cellular',
            name: 'Cellular Expert',
            icon: '🧬',
            description: 'Optimized cellular fat processing',
            page: 'index.html',
            color: '#ec4899'
        },
        'gut-brain': {
            id: 'gut-brain',
            name: 'Gut-Brain Guru',
            icon: '🧠',
            description: 'Reset your gut-brain connection',
            page: 'pillar-6.html',
            color: '#8b5cf6'
        },
        'biohacking': {
            id: 'biohacking',
            name: 'Biohacker',
            icon: '🧬',
            description: 'Optimized mitochondrial function',
            page: 'pillar-7.html',
            color: '#06b6d4'
        },
        'quiz': {
            id: 'quiz',
            name: 'Knowledge Seeker',
            icon: '📚',
            description: 'Completed the metabolic quiz',
            page: 'metabolic-quiz.html',
            color: '#10b981'
        },
        'calculator': {
            id: 'calculator',
            name: 'Age Calculator',
            icon: '🧮',
            description: 'Discovered your metabolic age',
            page: 'calculator.html',
            color: '#f59e0b'
        },
        'solutions': {
            id: 'solutions',
            name: 'Solution Finder',
            icon: '💎',
            description: 'Explored the solutions page',
            page: 'solutions.html',
            color: '#ec4899'
        }
    };

    // Storage key
    const STORAGE_KEY = '5pillar_badges_v1';
    const VISITS_KEY = '5pillar_visits_v1';

    // ============================================
    // INITIALIZE BADGE SYSTEM
    // ============================================
    function init() {
        // Create badge widget if not on mobile
        if (!window.matchMedia('(pointer: coarse)').matches) {
            createBadgeWidget();
        }
        
        // Track current page visit
        trackPageVisit();
        
        // Check for badge unlocks
        checkBadgeUnlocks();
        
        console.log('🏆 Badge System Initialized');
    }

    // ============================================
    // CREATE BADGE WIDGET
    // ============================================
    function createBadgeWidget() {
        // Check if widget already exists
        if (document.querySelector('.badge-widget')) return;

        const widget = document.createElement('div');
        widget.className = 'badge-widget';
        widget.innerHTML = `
            <h4>🏆 Pillar Mastery</h4>
            <div class="badge-list" id="badgeList"></div>
            <div class="badge-progress" id="badgeProgress"></div>
        `;

        // Add styles
        const styles = document.createElement('style');
        styles.textContent = `
            .badge-widget {
                position: fixed;
                right: 20px;
                top: 50%;
                transform: translateY(-50%);
                background: white;
                border-radius: 20px;
                padding: 25px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
                z-index: 1000;
                width: 220px;
                border: 1px solid rgba(0, 0, 0, 0.05);
                transition: all 0.3s ease;
            }
            .badge-widget:hover {
                box-shadow: 0 15px 50px rgba(0, 0, 0, 0.2);
            }
            .badge-widget h4 {
                font-size: 0.95rem;
                color: #0f172a;
                margin-bottom: 15px;
                text-align: center;
            }
            .badge-list {
                max-height: 300px;
                overflow-y: auto;
            }
            .badge-item {
                display: flex;
                align-items: center;
                gap: 12px;
                padding: 12px;
                border-radius: 12px;
                margin-bottom: 8px;
                background: #f8fafc;
                transition: all 0.3s ease;
            }
            .badge-item.unlocked {
                background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
                border: 1px solid rgba(16, 185, 129, 0.3);
                animation: badge-unlock 0.5s ease;
            }
            .badge-item.locked {
                opacity: 0.5;
                filter: grayscale(1);
            }
            .badge-item.new-unlock {
                animation: badge-pulse 1s ease-in-out infinite;
            }
            @keyframes badge-unlock {
                0% { transform: scale(0.8); opacity: 0; }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); opacity: 1; }
            }
            @keyframes badge-pulse {
                0%, 100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
                50% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
            }
            .badge-icon {
                width: 40px;
                height: 40px;
                border-radius: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.3rem;
                flex-shrink: 0;
            }
            .badge-item.unlocked .badge-icon {
                background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            }
            .badge-item.locked .badge-icon {
                background: #cbd5e1;
            }
            .badge-info {
                flex: 1;
            }
            .badge-name {
                font-size: 0.85rem;
                font-weight: 600;
                color: #0f172a;
                display: block;
            }
            .badge-item.locked .badge-name {
                color: #94a3b8;
            }
            .badge-desc {
                font-size: 0.75rem;
                color: #64748b;
            }
            .badge-progress {
                margin-top: 15px;
                padding-top: 15px;
                border-top: 1px solid #e2e8f0;
                text-align: center;
            }
            .badge-progress-bar {
                height: 8px;
                background: #e2e8f0;
                border-radius: 4px;
                overflow: hidden;
                margin-bottom: 8px;
            }
            .badge-progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #10b981, #34d399);
                border-radius: 4px;
                transition: width 0.5s ease;
            }
            .badge-progress-text {
                font-size: 0.8rem;
                color: #64748b;
            }
            .badge-progress-text strong {
                color: #10b981;
            }
            .badge-reward {
                margin-top: 15px;
                padding: 15px;
                background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
                border-radius: 12px;
                text-align: center;
                display: none;
            }
            .badge-reward.show {
                display: block;
                animation: reward-appear 0.5s ease;
            }
            @keyframes reward-appear {
                from { transform: scale(0.9); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }
            .badge-reward h5 {
                font-size: 0.9rem;
                color: #92400e;
                margin-bottom: 8px;
            }
            .badge-reward p {
                font-size: 0.8rem;
                color: #78350f;
                margin-bottom: 10px;
            }
            .badge-reward code {
                display: inline-block;
                background: white;
                padding: 8px 15px;
                border-radius: 8px;
                font-size: 1rem;
                font-weight: 700;
                color: #d97706;
                border: 2px dashed #f59e0b;
            }
            @media (max-width: 1200px) {
                .badge-widget { display: none; }
            }
        `;
        document.head.appendChild(styles);
        document.body.appendChild(widget);

        // Update badge display
        updateBadgeWidget();
    }

    // ============================================
    // UPDATE BADGE WIDGET
    // ============================================
    function updateBadgeWidget() {
        const badgeList = document.getElementById('badgeList');
        const badgeProgress = document.getElementById('badgeProgress');
        if (!badgeList) return;

        const unlockedBadges = getUnlockedBadges();
        const totalBadges = Object.keys(BADGES).length;
        const progressPercent = (unlockedBadges.length / totalBadges) * 100;

        // Build badge list
        let badgeHTML = '';
        Object.values(BADGES).forEach(badge => {
            const isUnlocked = unlockedBadges.includes(badge.id);
            badgeHTML += `
                <div class="badge-item ${isUnlocked ? 'unlocked' : 'locked'}" data-badge="${badge.id}">
                    <div class="badge-icon">${badge.icon}</div>
                    <div class="badge-info">
                        <span class="badge-name">${badge.name}</span>
                        <span class="badge-desc">${isUnlocked ? badge.description : 'Locked'}</span>
                    </div>
                </div>
            `;
        });
        badgeList.innerHTML = badgeHTML;

        // Build progress
        badgeProgress.innerHTML = `
            <div class="badge-progress-bar">
                <div class="badge-progress-fill" style="width: ${progressPercent}%"></div>
            </div>
            <div class="badge-progress-text">
                <strong>${unlockedBadges.length}/${totalBadges}</strong> badges unlocked
            </div>
            ${progressPercent >= 70 ? `
                <div class="badge-reward show">
                    <h5>🎉 Secret Reward Unlocked!</h5>
                    <p>Use code for 20% off:</p>
                    <code>PILLAR20</code>
                </div>
            ` : progressPercent >= 50 ? `
                <div class="badge-reward show">
                    <h5>⭐ Halfway There!</h5>
                    <p>Unlock 70% for a special discount code!</p>
                </div>
            ` : ''}
        `;
    }

    // ============================================
    // GET UNLOCKED BADGES
    // ============================================
    function getUnlockedBadges() {
        try {
            const data = localStorage.getItem(STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            return [];
        }
    }

    // ============================================
    // SAVE UNLOCKED BADGES
    // ============================================
    function saveUnlockedBadges(badges) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(badges));
        } catch (e) {
            console.warn('Could not save badges:', e);
        }
    }

    // ============================================
    // UNLOCK BADGE
    // ============================================
    function unlockBadge(badgeId) {
        const unlockedBadges = getUnlockedBadges();
        
        if (!unlockedBadges.includes(badgeId)) {
            unlockedBadges.push(badgeId);
            saveUnlockedBadges(unlockedBadges);
            
            // Show notification
            const badge = BADGES[badgeId];
            if (badge && typeof showToast === 'function') {
                showToast(
                    '🏆 Badge Unlocked!',
                    `You earned the "${badge.name}" badge!`,
                    badge.icon
                );
            }
            
            // Trigger confetti for milestone badges
            if (['gut-brain', 'biohacking', 'calculator'].includes(badgeId)) {
                if (typeof triggerConfetti === 'function') {
                    triggerConfetti();
                }
            }
            
            // Update widget
            updateBadgeWidget();
            
            // Highlight new badge
            setTimeout(() => {
                const badgeEl = document.querySelector(`[data-badge="${badgeId}"]`);
                if (badgeEl) {
                    badgeEl.classList.add('new-unlock');
                    setTimeout(() => badgeEl.classList.remove('new-unlock'), 3000);
                }
            }, 100);
            
            // Track event
            if (typeof gtag !== 'undefined') {
                gtag('event', 'badge_unlocked', {
                    'event_category': 'gamification',
                    'event_label': badgeId
                });
            }
            
            return true;
        }
        
        return false;
    }

    // ============================================
    // TRACK PAGE VISIT
    // ============================================
    function trackPageVisit() {
        const page = window.location.pathname.split('/').pop() || 'index.html';
        
        try {
            let visits = JSON.parse(localStorage.getItem(VISITS_KEY) || '{}');
            visits[page] = (visits[page] || 0) + 1;
            localStorage.setItem(VISITS_KEY, JSON.stringify(visits));
        } catch (e) {
            console.warn('Could not track visit:', e);
        }
    }

    // ============================================
    // CHECK FOR BADGE UNLOCKS
    // ============================================
    function checkBadgeUnlocks() {
        const page = window.location.pathname.split('/').pop() || 'index.html';
        
        // Auto-unlock badges based on page
        Object.values(BADGES).forEach(badge => {
            if (badge.page === page) {
                // Check if this is the main page for this badge
                if (page === 'index.html' && badge.id !== 'quiz' && badge.id !== 'calculator') {
                    // For index, unlock based on scroll depth or time
                    checkIndexPageBadges(badge.id);
                } else {
                    unlockBadge(badge.id);
                }
            }
        });
    }

    // ============================================
    // CHECK INDEX PAGE BADGES
    // ============================================
    function checkIndexPageBadges(badgeId) {
        // Track scroll depth for pillar badges
        let maxScroll = 0;
        
        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
            maxScroll = Math.max(maxScroll, scrollPercent);
            
            // Unlock badges based on scroll progress
            if (badgeId === 'metabolism' && maxScroll > 20) unlockBadge('metabolism');
            if (badgeId === 'hormones' && maxScroll > 35) unlockBadge('hormones');
            if (badgeId === 'appetite' && maxScroll > 50) unlockBadge('appetite');
            if (badgeId === 'energy' && maxScroll > 65) unlockBadge('energy');
            if (badgeId === 'cellular' && maxScroll > 80) unlockBadge('cellular');
        }, { passive: true });
    }

    // ============================================
    // PUBLIC API
    // ============================================
    window.trackPillarVisit = function(pillarId) {
        if (BADGES[pillarId]) {
            unlockBadge(pillarId);
        }
    };

    window.unlockQuizBadge = function() {
        unlockBadge('quiz');
    };

    window.unlockCalculatorBadge = function() {
        unlockBadge('calculator');
    };

    window.getBadgeProgress = function() {
        const unlocked = getUnlockedBadges();
        const total = Object.keys(BADGES).length;
        return {
            unlocked: unlocked.length,
            total: total,
            percent: Math.round((unlocked.length / total) * 100),
            badges: unlocked
        };
    };

    window.resetBadges = function() {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(VISITS_KEY);
        updateBadgeWidget();
    };

    // ============================================
    // INITIALIZE
    // ============================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
