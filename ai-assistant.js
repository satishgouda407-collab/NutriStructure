/* ============================================
   NUTRISTRUCTURE - AI ASSISTANT
   Floating AI Chat Widget with Smart Responses
   ============================================ */

(function() {
    'use strict';

    // ============================================
    // AI ASSISTANT CONFIGURATION
    // ============================================
    const AI_CONFIG = {
        name: 'NutriAI',
        avatar: '🤖',
        greeting: 'Hi! I\'m NutriAI, your personal metabolism coach. How can I help you today?',
        placeholder: 'Ask me about weight loss, metabolism, or our products...',
        typingDelay: 500,
        responseDelay: 1000
    };

    // ============================================
    // KNOWLEDGE BASE FOR AI RESPONSES
    // ============================================
    const knowledgeBase = {
        greetings: [
            'Hello! I\'m NutriAI, your metabolism coach. How can I help you today?',
            'Hi there! Ready to optimize your metabolism? Ask me anything!',
            'Welcome! I\'m here to help you understand your body better.'
        ],
        
        metabolism: {
            keywords: ['metabolism', 'metabolic', 'burn fat', 'lose weight', 'weight loss', 'calories', 'calorie'],
            responses: [
                'Your metabolism is the engine that burns calories. The 5 pillars - Metabolism, Hormones, Appetite, Energy, and Fat Processing - all work together. Which one would you like to learn more about?',
                'Metabolic health is about more than just calories! It involves your hormones, sleep, stress levels, and gut health. Our AI Coach can create a personalized plan for you.',
                'Did you know your metabolic age might be different from your actual age? Try our Metabolic Age Calculator to find out!'
            ]
        },
        
        products: {
            keywords: ['product', 'supplement', 'citrus burn', 'mitolyn', 'java burn', 'lanta', 'kito', 'slim crystal', 'buy', 'order', 'price', 'cost'],
            responses: [
                'We have 6 science-backed products targeting different aspects of metabolic health: Citrus Burn (metabolism), Mitolyn (hormones), Java Burn (energy), Lanta Shake (appetite), Kito Flow (cognitive), and Slim Crystal (hydration). Which one interests you?',
                'Each product targets a specific pillar of metabolic health. Would you like me to recommend one based on your goals?',
                'You can view all our products in the site map on our homepage. Each product has a detailed review page too!'
            ]
        },
        
        hormones: {
            keywords: ['hormone', 'cortisol', 'insulin', 'thyroid', 'estrogen', 'testosterone', 'leptin', 'ghrelin'],
            responses: [
                'Hormones play a huge role in weight management! Cortisol (stress hormone) can cause belly fat, while insulin resistance makes it hard to lose weight. Mitolyn is designed to support hormonal balance.',
                'Hormonal weight gain is real! If you\'re doing everything right but not losing weight, hormones might be the culprit. Check out Pillar 2: Hormones in our cheat sheets.',
                'Sleep, stress, and nutrition all affect your hormones. Would you like tips on balancing them naturally?'
            ]
        },
        
        appetite: {
            keywords: ['hunger', 'appetite', 'craving', 'cravings', 'eat', 'eating', 'food', 'snack', 'full', 'satiety'],
            responses: [
                'Constant hunger is often caused by blood sugar swings or lack of protein/fiber. Lanta Flat Belly Shake is designed to keep you full for hours!',
                'Cravings usually mean something - sugar cravings can indicate blood sugar issues, while salt cravings might mean stress. Would you like help understanding yours?',
                'Protein and fiber are your best friends for appetite control. Aim for 25-30g of protein per meal!'
            ]
        },
        
        energy: {
            keywords: ['energy', 'tired', 'fatigue', 'exhausted', 'sleepy', 'motivation', 'active'],
            responses: [
                'Low energy often points to mitochondrial dysfunction - your cellular power plants need support! Java Burn is designed to boost cellular energy.',
                'Feeling tired all the time? It could be your mitochondria, thyroid, or adrenal glands. Our Metabolic Quiz can help identify the cause!',
                'Quality sleep is crucial for energy. Are you getting 7-8 hours of deep, restorative sleep?'
            ]
        },
        
        calculator: {
            keywords: ['calculator', 'calculate', 'metabolic age', 'biological age', 'bmi', 'bmr', 'tdee'],
            responses: [
                'Our Metabolic Age Calculator is a great starting point! It compares your metabolic health to your actual age. Most people are surprised by their results!',
                'The calculator uses your age, weight, height, activity level, sleep, and stress to estimate your metabolic age. Try it - it only takes 60 seconds!',
                'Your metabolic age can be improved! Even if it\'s higher than your actual age, the right protocol can help you reverse it.'
            ]
        },
        
        quiz: {
            keywords: ['quiz', 'assessment', 'test', 'personalized', 'recommendation', 'recommend'],
            responses: [
                'Our AI Coach quiz creates a personalized protocol based on your body data, goals, and lifestyle. It takes just 2 minutes!',
                'The quiz analyzes your main challenge (metabolism, hormones, appetite, energy, or stubborn fat) and recommends the perfect product stack for you.',
                'Want a completely personalized plan? Try our AI Coach - it generates a downloadable PDF protocol just for you!'
            ]
        },
        
        pillars: {
            keywords: ['pillar', 'pillars', '5 pillar', '7 pillar', 'system', 'protocol'],
            responses: [
                'The 5 Pillars are: 1) Metabolism, 2) Hormones, 3) Appetite, 4) Energy, and 5) Fat Processing. We also cover Gut Health (Pillar 6) and Biohacking (Pillar 7)!',
                'Each pillar represents a biological system that controls weight. When all 5 are supported, weight loss becomes effortless.',
                'You can explore each pillar in detail through our cheat sheets. Check the site map on our homepage!'
            ]
        },
        
        exercise: {
            keywords: ['exercise', 'workout', 'gym', 'fitness', 'training', 'cardio', 'strength'],
            responses: [
                'Exercise is important, but it\'s only 20% of the equation. Nutrition and metabolic health are the other 80%!',
                'For metabolism, HIIT and strength training are most effective. They build muscle, which burns more calories at rest.',
                'You can\'t out-exercise a bad metabolism! Fix your metabolic health first, then exercise becomes more effective.'
            ]
        },
        
        diet: {
            keywords: ['diet', 'keto', 'fasting', 'intermittent', 'carb', 'protein', 'fat', 'nutrition', 'meal', 'eat'],
            responses: [
                'We don\'t believe in extreme diets. Instead, we focus on supporting your body\'s natural systems so weight loss becomes effortless.',
                'Intermittent fasting can be a great tool for metabolic health. It gives your body a break from digestion and activates cellular repair.',
                'Protein is crucial - aim for 0.7-1g per pound of body weight. It keeps you full and supports muscle mass.'
            ]
        },
        
        sleep: {
            keywords: ['sleep', 'insomnia', 'rest', 'tired', 'bedtime', 'night'],
            responses: [
                'Sleep is CRITICAL for weight loss! Poor sleep disrupts hunger hormones and increases cravings. Aim for 7-8 hours.',
                'Your body burns fat while you sleep - but only if you\'re getting quality deep sleep. Check out Pillar 7 for biohacking tips!',
                'Try to finish eating 3-4 hours before bed and keep your room cool (65-68°F) for optimal fat burning during sleep.'
            ]
        },
        
        stress: {
            keywords: ['stress', 'anxious', 'anxiety', 'worried', 'cortisol', 'relax'],
            responses: [
                'Stress raises cortisol, which causes belly fat and cravings. Managing stress is key for weight loss!',
                'Chronic stress is like pouring gasoline on fat storage. Try meditation, deep breathing, or yoga to lower cortisol.',
                'Your mental health affects your physical health. Take time to de-stress - your metabolism will thank you!'
            ]
        },
        
        results: {
            keywords: ['result', 'success', 'story', 'testimonial', 'review', 'transformation', 'lost weight'],
            responses: [
                'We have thousands of success stories! People have lost 20, 50, even 100+ pounds by supporting their metabolic health.',
                'Check out our Customer Transformations page for real stories from real people who changed their lives!',
                'Everyone\'s journey is different, but the principles work. Support your metabolism and the weight will follow.'
            ]
        },
        
        guarantee: {
            keywords: ['guarantee', 'refund', 'money back', 'risk', 'trial'],
            responses: [
                'All our products come with a 180-day money-back guarantee. That\'s 6 full months to try them risk-free!',
                'We\'re so confident in our approach that we offer one of the longest guarantees in the industry.',
                'If you\'re not satisfied for any reason, just contact us for a full refund. No questions asked!'
            ]
        },
        
        shipping: {
            keywords: ['shipping', 'delivery', 'ship', 'arrive', 'when', 'how long'],
            responses: [
                'Most orders ship within 24-48 hours. Delivery typically takes 3-5 business days in the US.',
                'We offer free shipping on most bundle orders. Check the product page for details!',
                'You\'ll receive a tracking number as soon as your order ships.'
            ]
        },
        
        default: [
            'That\'s an interesting question! I\'d recommend checking out our AI Coach for a personalized answer, or browse our site map for more information.',
            'I\'m still learning! For the best answer, try our Metabolic Quiz or AI Coach - they\'ll give you personalized recommendations.',
            'Great question! You might find the answer in our FAQ section, or feel free to ask me something else about metabolism, weight loss, or our products.',
            'I want to make sure I give you the best answer. Can you tell me more about your specific situation? Or try our AI Coach for a complete personalized protocol!'
        ]
    };

    // ============================================
    // AI RESPONSE GENERATOR
    // ============================================
    function generateResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Check each category for matching keywords
        for (const [category, data] of Object.entries(knowledgeBase)) {
            if (category === 'default' || category === 'greetings') continue;
            
            const hasMatch = data.keywords.some(keyword => message.includes(keyword));
            if (hasMatch) {
                // Return random response from matching category
                return data.responses[Math.floor(Math.random() * data.responses.length)];
            }
        }
        
        // Check for greetings
        if (message.match(/^(hi|hello|hey|greetings|howdy|hola)/)) {
            return knowledgeBase.greetings[Math.floor(Math.random() * knowledgeBase.greetings.length)];
        }
        
        // Return default response
        return knowledgeBase.default[Math.floor(Math.random() * knowledgeBase.default.length)];
    }

    // ============================================
    // CREATE AI ASSISTANT WIDGET
    // ============================================
    function createAIAssistant() {
        // Check if already exists
        if (document.getElementById('nutri-ai-assistant')) return;

        // Create widget container
        const widget = document.createElement('div');
        widget.id = 'nutri-ai-assistant';
        widget.innerHTML = `
            <style>
                #nutri-ai-assistant {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    z-index: 99999;
                    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
                }
                
                .ai-chat-button {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                    border: none;
                    cursor: pointer;
                    box-shadow: 0 4px 20px rgba(16, 185, 129, 0.4);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.8rem;
                    transition: all 0.3s ease;
                    animation: ai-pulse 2s infinite;
                }
                
                @keyframes ai-pulse {
                    0%, 100% { box-shadow: 0 4px 20px rgba(16, 185, 129, 0.4); }
                    50% { box-shadow: 0 4px 30px rgba(16, 185, 129, 0.7); }
                }
                
                .ai-chat-button:hover {
                    transform: scale(1.1);
                }
                
                .ai-chat-container {
                    position: absolute;
                    bottom: 75px;
                    right: 0;
                    width: 350px;
                    height: 500px;
                    background: white;
                    border-radius: 20px;
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
                    display: none;
                    flex-direction: column;
                    overflow: hidden;
                    border: 1px solid #e2e8f0;
                }
                
                .ai-chat-container.active {
                    display: flex;
                    animation: ai-slide-up 0.3s ease;
                }
                
                @keyframes ai-slide-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .ai-chat-header {
                    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
                    color: white;
                    padding: 15px 20px;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                
                .ai-avatar {
                    width: 40px;
                    height: 40px;
                    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.5rem;
                }
                
                .ai-header-info {
                    flex: 1;
                }
                
                .ai-header-info h4 {
                    margin: 0;
                    font-size: 1rem;
                }
                
                .ai-status {
                    font-size: 0.8rem;
                    color: #34d399;
                    display: flex;
                    align-items: center;
                    gap: 5px;
                }
                
                .ai-status::before {
                    content: '';
                    width: 8px;
                    height: 8px;
                    background: #34d399;
                    border-radius: 50%;
                    animation: status-blink 2s infinite;
                }
                
                @keyframes status-blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                }
                
                .ai-close-btn {
                    background: none;
                    border: none;
                    color: white;
                    font-size: 1.5rem;
                    cursor: pointer;
                    padding: 5px;
                    opacity: 0.7;
                    transition: opacity 0.3s;
                }
                
                .ai-close-btn:hover {
                    opacity: 1;
                }
                
                .ai-chat-messages {
                    flex: 1;
                    overflow-y: auto;
                    padding: 20px;
                    background: #f8fafc;
                }
                
                .ai-message {
                    display: flex;
                    gap: 10px;
                    margin-bottom: 15px;
                    animation: message-fade-in 0.3s ease;
                }
                
                @keyframes message-fade-in {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .ai-message.user {
                    flex-direction: row-reverse;
                }
                
                .ai-message-avatar {
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.2rem;
                    flex-shrink: 0;
                }
                
                .ai-message.ai .ai-message-avatar {
                    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                }
                
                .ai-message.user .ai-message-avatar {
                    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
                }
                
                .ai-message-content {
                    max-width: 75%;
                    padding: 12px 16px;
                    border-radius: 18px;
                    font-size: 0.95rem;
                    line-height: 1.5;
                }
                
                .ai-message.ai .ai-message-content {
                    background: white;
                    color: #334155;
                    border-bottom-left-radius: 4px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
                }
                
                .ai-message.user .ai-message-content {
                    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
                    color: white;
                    border-bottom-right-radius: 4px;
                }
                
                .ai-typing {
                    display: flex;
                    gap: 4px;
                    padding: 15px 16px;
                    background: white;
                    border-radius: 18px;
                    border-bottom-left-radius: 4px;
                    width: fit-content;
                }
                
                .ai-typing-dot {
                    width: 8px;
                    height: 8px;
                    background: #cbd5e1;
                    border-radius: 50%;
                    animation: typing-bounce 1.4s infinite ease-in-out both;
                }
                
                .ai-typing-dot:nth-child(1) { animation-delay: -0.32s; }
                .ai-typing-dot:nth-child(2) { animation-delay: -0.16s; }
                
                @keyframes typing-bounce {
                    0%, 80%, 100% { transform: scale(0); }
                    40% { transform: scale(1); }
                }
                
                .ai-chat-input-container {
                    padding: 15px 20px;
                    background: white;
                    border-top: 1px solid #e2e8f0;
                    display: flex;
                    gap: 10px;
                }
                
                .ai-chat-input {
                    flex: 1;
                    padding: 12px 16px;
                    border: 2px solid #e2e8f0;
                    border-radius: 25px;
                    font-size: 0.95rem;
                    font-family: inherit;
                    outline: none;
                    transition: border-color 0.3s;
                }
                
                .ai-chat-input:focus {
                    border-color: #10b981;
                }
                
                .ai-send-btn {
                    width: 45px;
                    height: 45px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                    border: none;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-size: 1.2rem;
                    transition: all 0.3s;
                }
                
                .ai-send-btn:hover {
                    transform: scale(1.05);
                }
                
                .ai-send-btn:disabled {
                    opacity: 0.5;
                    cursor: not-allowed;
                    transform: none;
                }
                
                .ai-suggested-questions {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                    padding: 10px 20px;
                    background: #f8fafc;
                    border-top: 1px solid #e2e8f0;
                }
                
                .ai-suggested-question {
                    padding: 8px 14px;
                    background: white;
                    border: 1px solid #e2e8f0;
                    border-radius: 20px;
                    font-size: 0.85rem;
                    color: #475569;
                    cursor: pointer;
                    transition: all 0.3s;
                }
                
                .ai-suggested-question:hover {
                    border-color: #10b981;
                    color: #10b981;
                }
                
                @media (max-width: 480px) {
                    .ai-chat-container {
                        width: calc(100vw - 40px);
                        height: 70vh;
                        right: -10px;
                    }
                }
            </style>
            
            <button class="ai-chat-button" id="aiChatButton" title="Chat with NutriAI">
                ${AI_CONFIG.avatar}
            </button>
            
            <div class="ai-chat-container" id="aiChatContainer">
                <div class="ai-chat-header">
                    <div class="ai-avatar">${AI_CONFIG.avatar}</div>
                    <div class="ai-header-info">
                        <h4>${AI_CONFIG.name}</h4>
                        <span class="ai-status">Online</span>
                    </div>
                    <button class="ai-close-btn" id="aiCloseBtn">&times;</button>
                </div>
                
                <div class="ai-chat-messages" id="aiChatMessages"></div>
                
                <div class="ai-suggested-questions" id="aiSuggestedQuestions">
                    <span class="ai-suggested-question" data-question="What products do you recommend?">What products?</span>
                    <span class="ai-suggested-question" data-question="How does metabolism work?">Metabolism?</span>
                    <span class="ai-suggested-question" data-question="Take the metabolic quiz">Take quiz</span>
                    <span class="ai-suggested-question" data-question="Calculate my metabolic age">Calculator</span>
                </div>
                
                <div class="ai-chat-input-container">
                    <input type="text" class="ai-chat-input" id="aiChatInput" placeholder="${AI_CONFIG.placeholder}" autocomplete="off">
                    <button class="ai-send-btn" id="aiSendBtn">➤</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(widget);
        
        // Initialize chat functionality
        initChatFunctionality();
    }

    // ============================================
    // INITIALIZE CHAT FUNCTIONALITY
    // ============================================
    function initChatFunctionality() {
        const chatButton = document.getElementById('aiChatButton');
        const chatContainer = document.getElementById('aiChatContainer');
        const closeBtn = document.getElementById('aiCloseBtn');
        const chatInput = document.getElementById('aiChatInput');
        const sendBtn = document.getElementById('aiSendBtn');
        const chatMessages = document.getElementById('aiChatMessages');
        const suggestedQuestions = document.getElementById('aiSuggestedQuestions');
        
        let isTyping = false;
        
        // Toggle chat
        chatButton.addEventListener('click', () => {
            chatContainer.classList.toggle('active');
            if (chatContainer.classList.contains('active') && chatMessages.children.length === 0) {
                // Add greeting message
                addMessage('ai', AI_CONFIG.greeting);
            }
            if (chatContainer.classList.contains('active')) {
                chatInput.focus();
            }
        });
        
        // Close chat
        closeBtn.addEventListener('click', () => {
            chatContainer.classList.remove('active');
        });
        
        // Send message
        function sendMessage() {
            const message = chatInput.value.trim();
            if (!message || isTyping) return;
            
            // Add user message
            addMessage('user', message);
            chatInput.value = '';
            
            // Generate and show AI response
            showTypingIndicator();
            
            setTimeout(() => {
                removeTypingIndicator();
                const response = generateResponse(message);
                addMessage('ai', response);
            }, AI_CONFIG.responseDelay + Math.random() * 500);
        }
        
        sendBtn.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });
        
        // Suggested questions
        suggestedQuestions.addEventListener('click', (e) => {
            if (e.target.classList.contains('ai-suggested-question')) {
                const question = e.target.dataset.question;
                chatInput.value = question;
                sendMessage();
            }
        });
        
        // Add message to chat
        function addMessage(sender, text) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `ai-message ${sender}`;
            messageDiv.innerHTML = `
                <div class="ai-message-avatar">${sender === 'ai' ? AI_CONFIG.avatar : '👤'}</div>
                <div class="ai-message-content">${escapeHtml(text)}</div>
            `;
            chatMessages.appendChild(messageDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
        
        // Show typing indicator
        function showTypingIndicator() {
            isTyping = true;
            sendBtn.disabled = true;
            
            const typingDiv = document.createElement('div');
            typingDiv.className = 'ai-message ai';
            typingDiv.id = 'aiTypingIndicator';
            typingDiv.innerHTML = `
                <div class="ai-message-avatar">${AI_CONFIG.avatar}</div>
                <div class="ai-typing">
                    <div class="ai-typing-dot"></div>
                    <div class="ai-typing-dot"></div>
                    <div class="ai-typing-dot"></div>
                </div>
            `;
            chatMessages.appendChild(typingDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
        
        // Remove typing indicator
        function removeTypingIndicator() {
            isTyping = false;
            sendBtn.disabled = false;
            const indicator = document.getElementById('aiTypingIndicator');
            if (indicator) indicator.remove();
        }
        
        // Escape HTML
        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }
    }

    // ============================================
    // INITIALIZE WHEN DOM IS READY
    // ============================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', createAIAssistant);
    } else {
        createAIAssistant();
    }

    console.log('🤖 NutriAI Assistant Loaded');

})();
