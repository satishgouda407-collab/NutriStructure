/* ============================================
   THE 5-PILLAR PROTOCOL - LIVE RESULTS TICKER
   Social Proof FOMO Notifications
   ============================================ */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        enabled: true,
        interval: 8000, // Show new notification every 8 seconds
        displayDuration: 5000, // Each notification shows for 5 seconds
        maxNotifications: 3, // Max notifications to show per session
        cities: [
            'New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX', 
            'Phoenix, AZ', 'Philadelphia, PA', 'San Antonio, TX', 'San Diego, CA',
            'Dallas, TX', 'San Jose, CA', 'Austin, TX', 'Jacksonville, FL',
            'Fort Worth, TX', 'Columbus, OH', 'Charlotte, NC', 'San Francisco, CA',
            'Indianapolis, IN', 'Seattle, WA', 'Denver, CO', 'Washington, DC',
            'Boston, MA', 'El Paso, TX', 'Nashville, TN', 'Detroit, MI',
            'Oklahoma City, OK', 'Portland, OR', 'Las Vegas, NV', 'Louisville, KY',
            'Baltimore, MD', 'Milwaukee, WI', 'Albuquerque, NM', 'Tucson, AZ',
            'Fresno, CA', 'Sacramento, CA', 'Mesa, AZ', 'Kansas City, MO',
            'Atlanta, GA', 'Long Beach, CA', 'Colorado Springs, CO', 'Raleigh, NC',
            'Miami, FL', 'Virginia Beach, VA', 'Omaha, NE', 'Oakland, CA',
            'Minneapolis, MN', 'Tulsa, OK', 'Arlington, TX', 'Wichita, KS',
            'Bakersfield, CA', 'New Orleans, LA', 'Honolulu, HI', 'Anaheim, CA',
            'Tampa, FL', 'Aurora, CO', 'Santa Ana, CA', 'St. Louis, MO',
            'Pittsburgh, PA', 'Corpus Christi, TX', 'Riverside, CA', 'Cincinnati, OH',
            'Lexington, KY', 'Anchorage, AK', 'Stockton, CA', 'Toledo, OH',
            'St. Paul, MN', 'Newark, NJ', 'Greensboro, NC', 'Plano, TX',
            'Henderson, NV', 'Lincoln, NE', 'Buffalo, NY', 'Jersey City, NJ',
            'Chula Vista, CA', 'Fort Wayne, IN', 'Orlando, FL', 'St. Petersburg, FL',
            'Chandler, AZ', 'Laredo, TX', 'Norfolk, VA', 'Durham, NC',
            'Madison, WI', 'Lubbock, TX', 'Irvine, CA', 'Winston-Salem, NC',
            'Glendale, AZ', 'Garland, TX', 'Hialeah, FL', 'Reno, NV',
            'Chesapeake, VA', 'Gilbert, AZ', 'Baton Rouge, LA', 'Irving, TX',
            'Scottsdale, AZ', 'North Las Vegas, NV', 'Fremont, CA', 'Boise, ID',
            'Richmond, VA', 'San Bernardino, CA', 'Birmingham, AL', 'Spokane, WA',
            'Rochester, NY', 'Des Moines, IA', 'Modesto, CA', 'Fayetteville, NC',
            'Tacoma, WA', 'Oxnard, CA', 'Fontana, CA', 'Columbus, GA',
            'Montgomery, AL', 'Moreno Valley, CA', 'Shreveport, LA', 'Aurora, IL',
            'Yonkers, NY', 'Akron, OH', 'Huntington Beach, CA', 'Little Rock, AR',
            'Augusta, GA', 'Amarillo, TX', 'Glendale, CA', 'Mobile, AL',
            'Grand Rapids, MI', 'Salt Lake City, UT', 'Tallahassee, FL', 'Huntsville, AL',
            'Grand Prairie, TX', 'Knoxville, TN', 'Worcester, MA', 'Newport News, VA',
            'Brownsville, TX', 'Overland Park, KS', 'Santa Clarita, CA', 'Providence, RI',
            'Garden Grove, CA', 'Chattanooga, TN', 'Oceanside, CA', 'Jackson, MS',
            'Fort Lauderdale, FL', 'Santa Rosa, CA', 'Rancho Cucamonga, CA', 'Port St. Lucie, FL',
            'Tempe, AZ', 'Ontario, CA', 'Vancouver, WA', 'Sioux Falls, SD',
            'Springfield, MO', 'Peoria, AZ', 'Pembroke Pines, FL', 'Elk Grove, CA',
            'Salem, OR', 'Lancaster, CA', 'Corona, CA', 'Eugene, OR',
            'Palmdale, CA', 'McKinney, TX', 'Salinas, CA', 'Fort Collins, CO',
            'Cape Coral, FL', 'Frisco, TX', 'Bridgeport, CT', 'Syracuse, NY',
            'Hayward, CA', 'Springfield, MA', 'Alexandria, VA', 'Paterson, NJ',
            'Rockford, IL', 'Killeen, TX', 'Macon, GA', 'Kansas City, KS',
            'Sunnyvale, CA', 'Hollywood, FL', 'Visalia, CA', 'Pasadena, TX',
            'Pomona, CA', 'Kansas City, MO', 'Escondido, CA', 'Clarksville, TN',
            'Joliet, IL', 'Stamford, CT', 'Toronto, ON', 'Vancouver, BC',
            'Montreal, QC', 'Calgary, AB', 'Ottawa, ON', 'Edmonton, AB',
            'Mississauga, ON', 'Winnipeg, MB', 'Quebec City, QC', 'Hamilton, ON',
            'Brampton, ON', 'Kitchener, ON', 'Surrey, BC', 'Halifax, NS',
            'Laval, QC', 'London, ON', 'Markham, ON', 'Vaughan, ON',
            'Gatineau, QC', 'Saskatoon, SK', 'Longueuil, QC', 'Burnaby, BC',
            'Regina, SK', 'Richmond, BC', 'Richmond Hill, ON', 'Oakville, ON',
            'Burlington, ON', 'Greater Sudbury, ON', 'Sherbrooke, QC', 'Oshawa, ON',
            'Saguenay, QC', 'Lévis, QC', 'Barrie, ON', 'Abbotsford, BC',
            'Coquitlam, BC', 'St. Catharines, ON', 'Trois-Rivières, QC', 'Guelph, ON',
            'Cambridge, ON', 'Whitby, ON', 'Ajax, ON', 'Langley, BC',
            'Milton, ON', 'Moncton, NB', 'St. John's, NL', 'Waterloo, ON',
            'Delta, BC', 'Chatham-Kent, ON', 'Red Deer, AB', 'Strathcona County, AB',
            'Brantford, ON', 'Saint-Jean-sur-Richelieu, QC', 'Cape Breton, NS', 'Lethbridge, AB',
            'Clarington, ON', 'Pickering, ON', 'Nanaimo, BC', 'Kamloops, BC',
            'Niagara Falls, ON', 'Victoria, BC', 'Brossard, QC', 'Repentigny, QC',
            'Newmarket, ON', 'Chilliwack, BC', 'Maple Ridge, BC', 'Peterborough, ON',
            'Kawartha Lakes, ON', 'Drummondville, QC', 'Saint-Jérôme, QC', 'Prince George, BC'
        ],
        actions: [
            'just unlocked their 7-Pillar Protocol!',
            'completed the Metabolic Quiz!',
            'started their transformation journey!',
            'calculated their Metabolic Age!',
            'discovered their metabolic type!',
            'downloaded their personalized protocol!',
            'claimed their starter stack!',
            'joined 50,000+ success stories!',
            'took the first step to reset their metabolism!',
            'unlocked the Gut-Brain Reset secrets!',
            'started mitochondrial biohacking!',
            'discovered the 5 Fat-Burning Pillars!'
        ],
        avatars: ['👤', '👩', '👨', '👱‍♀️', '👱', '👴', '👵', '👧', '👦', '👩‍🦱', '👨‍🦱', '👩‍🦰', '👨‍🦰']
    };

    // Session notification count
    let notificationCount = 0;
    let notificationInterval = null;

    // ============================================
    // INITIALIZE TICKER
    // ============================================
    function init() {
        if (!CONFIG.enabled) return;
        
        // Check if user has seen max notifications
        const sessionCount = sessionStorage.getItem('ticker_count') || 0;
        if (parseInt(sessionCount) >= CONFIG.maxNotifications) return;
        
        // Wait a bit before showing first notification
        setTimeout(() => {
            showNotification();
            startTicker();
        }, 3000);
        
        console.log('📊 Live Results Ticker Initialized');
    }

    // ============================================
    // START TICKER
    // ============================================
    function startTicker() {
        if (notificationInterval) return;
        
        notificationInterval = setInterval(() => {
            const sessionCount = parseInt(sessionStorage.getItem('ticker_count') || 0);
            if (sessionCount >= CONFIG.maxNotifications) {
                stopTicker();
                return;
            }
            showNotification();
        }, CONFIG.interval);
    }

    // ============================================
    // STOP TICKER
    // ============================================
    function stopTicker() {
        if (notificationInterval) {
            clearInterval(notificationInterval);
            notificationInterval = null;
        }
    }

    // ============================================
    // SHOW NOTIFICATION
    // ============================================
    function showNotification() {
        // Check max notifications
        const sessionCount = parseInt(sessionStorage.getItem('ticker_count') || 0);
        if (sessionCount >= CONFIG.maxNotifications) {
            stopTicker();
            return;
        }
        
        // Remove existing notification
        const existing = document.querySelector('.live-ticker');
        if (existing) {
            existing.style.animation = 'ticker-slide-out 0.3s ease forwards';
            setTimeout(() => existing.remove(), 300);
        }
        
        // Generate random data
        const city = CONFIG.cities[Math.floor(Math.random() * CONFIG.cities.length)];
        const action = CONFIG.actions[Math.floor(Math.random() * CONFIG.actions.length)];
        const avatar = CONFIG.avatars[Math.floor(Math.random() * CONFIG.avatars.length)];
        const firstName = getRandomFirstName();
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = 'live-ticker';
        notification.innerHTML = `
            <div class="ticker-pulse"></div>
            <div class="ticker-avatar">${avatar}</div>
            <div class="ticker-content">
                <p><strong>${firstName}</strong> from ${city}</p>
                <span>${action}</span>
            </div>
        `;
        
        // Add styles if not already added
        addTickerStyles();
        
        // Add to page
        document.body.appendChild(notification);
        
        // Increment count
        sessionStorage.setItem('ticker_count', sessionCount + 1);
        
        // Auto remove
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'ticker-slide-out 0.3s ease forwards';
                setTimeout(() => notification.remove(), 300);
            }
        }, CONFIG.displayDuration);
        
        // Track
        if (typeof gtag !== 'undefined') {
            gtag('event', 'ticker_shown', {
                'event_category': 'social_proof',
                'event_label': action
            });
        }
    }

    // ============================================
    // GET RANDOM FIRST NAME
    // ============================================
    function getRandomFirstName() {
        const names = [
            'Sarah', 'Michael', 'Jennifer', 'David', 'Jessica', 'James', 'Emily', 'John',
            'Emma', 'Robert', 'Olivia', 'William', 'Sophia', 'Joseph', 'Isabella', 'Thomas',
            'Ava', 'Charles', 'Mia', 'Daniel', 'Charlotte', 'Matthew', 'Amelia', 'Anthony',
            'Harper', 'Mark', 'Evelyn', 'Donald', 'Abigail', 'Steven', 'Elizabeth', 'Paul',
            'Mila', 'Andrew', 'Ella', 'Joshua', 'Avery', 'Kenneth', 'Sofia', 'Kevin',
            'Camila', 'Brian', 'Aria', 'George', 'Scarlett', 'Timothy', 'Victoria', 'Ronald',
            'Madison', 'Edward', 'Luna', 'Jason', 'Grace', 'Jeffrey', 'Chloe', 'Ryan',
            'Penelope', 'Jacob', 'Layla', 'Gary', 'Riley', 'Nicholas', 'Zoey', 'Eric',
            'Nora', 'Jonathan', 'Lily', 'Stephen', 'Eleanor', 'Larry', 'Hannah', 'Justin',
            'Lillian', 'Scott', 'Addison', 'Brandon', 'Aubrey', 'Benjamin', 'Ellie', 'Samuel',
            'Stella', 'Gregory', 'Natalie', 'Alexander', 'Zoe', 'Patrick', 'Leah', 'Frank',
            'Hazel', 'Raymond', 'Violet', 'Jack', 'Aurora', 'Dennis', 'Savannah', 'Jerry',
            'Audrey', 'Tyler', 'Brooklyn', 'Aaron', 'Bella', 'Jose', 'Claire', 'Adam',
            'Skylar', 'Nathan', 'Lucy', 'Henry', 'Paisley', 'Douglas', 'Everly', 'Zachary',
            'Anna', 'Peter', 'Caroline', 'Kyle', 'Nova', 'Ethan', 'Genesis', 'Walter'
        ];
        return names[Math.floor(Math.random() * names.length)];
    }

    // ============================================
    // ADD TICKER STYLES
    // ============================================
    function addTickerStyles() {
        if (document.getElementById('ticker-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'ticker-styles';
        styles.textContent = `
            .live-ticker {
                position: fixed;
                bottom: 20px;
                left: 20px;
                background: white;
                border-radius: 16px;
                padding: 15px 20px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
                z-index: 10000;
                display: flex;
                align-items: center;
                gap: 12px;
                max-width: 380px;
                border: 1px solid rgba(16, 185, 129, 0.2);
                animation: ticker-slide-in 0.5s ease;
            }
            @keyframes ticker-slide-in {
                from {
                    transform: translateX(-100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            @keyframes ticker-slide-out {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(-100%);
                    opacity: 0;
                }
            }
            .ticker-pulse {
                width: 12px;
                height: 12px;
                background: #10b981;
                border-radius: 50%;
                animation: ticker-pulse 2s ease-in-out infinite;
                flex-shrink: 0;
            }
            @keyframes ticker-pulse {
                0%, 100% {
                    box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7);
                }
                50% {
                    box-shadow: 0 0 0 10px rgba(16, 185, 129, 0);
                }
            }
            .ticker-avatar {
                width: 45px;
                height: 45px;
                background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.5rem;
                flex-shrink: 0;
            }
            .ticker-content {
                flex: 1;
                min-width: 0;
            }
            .ticker-content p {
                font-size: 0.9rem;
                color: #0f172a;
                margin: 0;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .ticker-content span {
                font-size: 0.8rem;
                color: #64748b;
                display: block;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            @media (max-width: 480px) {
                .live-ticker {
                    left: 10px;
                    right: 10px;
                    max-width: none;
                    bottom: 80px;
                }
            }
        `;
        document.head.appendChild(styles);
    }

    // ============================================
    // PUBLIC API
    // ============================================
    window.LiveTicker = {
        show: showNotification,
        start: startTicker,
        stop: stopTicker,
        reset: function() {
            sessionStorage.removeItem('ticker_count');
            notificationCount = 0;
        }
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
