// SoftMark AI Chatbot System
// Professional AI-powered chat with Groq API integration

// AI Configuration
const AI_CONFIG = {
  groqApiKey: "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",
  model: 'llama-3.1-8b-instant',
  useGroqAPI: true,
  maxTokens: 150,
  temperature: 0.7
};

// AI Responses Library
const AI_RESPONSES = {
  greetings: [
    "👋 Hi! I'm Sarah, SoftMark's AI assistant. How can I help automate your business today?",
    "Hello! I'm Sarah from SoftMark. Ready to boost your productivity with AI? What brings you here?",
    "Hey there! Sarah here 🤖 What business challenges can SoftMark solve for you today?"
  ],
  fallbacks: [
    "That's interesting! Could you tell me more about your business needs?",
    "I understand. What specific automation challenges are you facing?",
    "Got it! How can SoftMark's AI solutions help your business?"
  ]
};

// Conversation State
const conversationState = {
  chatHistory: [],
  userInfo: {
    name: null,
    email: null,
    phone: null,
    company: null,
    interestedService: null
  },
  stage: 'greeting',
  selectedService: null
};

// Open AI Chat with Sound Effect and Animation
function openAIChat() {
  // Play stunning sound effect
  const openSound = document.getElementById('chat-open-sound');
  if (openSound) {
    openSound.currentTime = 0;
    openSound.play().catch(e => console.log('Sound play failed:', e));
  }
  
  // Hide chat button when opening chat
  const chatButton = document.getElementById('chat-button');
  if (chatButton) {
    chatButton.style.display = 'none';
  }
  
  // Show chat with smooth animation
  const chatContainer = document.getElementById('ai-chat-container');
  chatContainer.style.display = 'flex';
  chatContainer.classList.remove('hidden');
  chatContainer.classList.add('open');
  
  // Add entrance animation
  setTimeout(() => {
    chatContainer.style.opacity = '1';
    chatContainer.style.transform = 'translateY(0) scale(1)';
  }, 10);
  
  // Focus on input field
  setTimeout(() => {
    const inputField = document.getElementById('ai-input');
    if (inputField) {
      inputField.focus();
    }
  }, 400);
  
  if (conversationState.chatHistory.length === 0) {
    initializeAIChat();
  }
}

// Close AI Chat with Animation
function closeAIChat() {
  const chatContainer = document.getElementById('ai-chat-container');
  
  if (!chatContainer.classList.contains('open')) {
    return; // Already closed or closing
  }
  
  // Add exit animation
  chatContainer.style.opacity = '0';
  chatContainer.style.transform = 'translateY(20px) scale(0.95)';
  
  // Hide after animation completes
  setTimeout(() => {
    chatContainer.style.display = 'none';
    chatContainer.classList.remove('open');
    chatContainer.classList.add('hidden');
    
    // Show chat button again when chat is closed
    const chatButton = document.getElementById('chat-button');
    if (chatButton) {
      chatButton.style.display = 'flex';
    }
  }, 300);
  
  // Play close sound effect
  const closeSound = document.getElementById('chat-close-sound');
  if (closeSound) {
    closeSound.currentTime = 0;
    closeSound.play().catch(e => console.log('Sound play failed:', e));
  }
}

// Close chat when clicking outside
document.addEventListener('click', function(event) {
  const chatContainer = document.getElementById('ai-chat-container');
  const chatButton = document.getElementById('chat-button');
  
  // Check if chat is open and click is outside chat container and button
  if (chatContainer && chatContainer.classList.contains('open')) {
    if (!chatContainer.contains(event.target) && !chatButton.contains(event.target)) {
      closeAIChat();
    }
  }
});

// Escape key to close chat
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    const chatContainer = document.getElementById('ai-chat-container');
    if (chatContainer && chatContainer.classList.contains('open')) {
      closeAIChat();
    }
  }
});

// Initialize AI Chat
function initializeAIChat() {
  const greeting = AI_RESPONSES.greetings[Math.floor(Math.random() * AI_RESPONSES.greetings.length)];
  addAIMessage(greeting);
  setTimeout(() => {
    showQuickActions([
      'How much can AI automation save me?',
      'What types of tasks can you automate?',
      'How quickly can you implement this?',
      'Do you work with my industry?',
      'Can I see examples of your work?',
      'What\'s the ROI of AI automation?'
    ]);
  }, 2000);
}

// Add AI Message
function addAIMessage(message, delay = 1000) {
  const messagesContainer = document.getElementById('ai-messages');
  
  showTypingIndicator();
  
  setTimeout(() => {
    hideTypingIndicator();
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message-ai';
    messageDiv.innerHTML = message;
    messagesContainer.appendChild(messageDiv);
    
    scrollToBottom(); // Use enhanced scroll function
    
    conversationState.chatHistory.push({
      sender: 'ai',
      message: message,
      timestamp: new Date()
    });
  }, delay);
}

// Enhanced scroll to bottom function
function scrollToBottom() {
  const messagesContainer = document.getElementById('ai-messages');
  if (messagesContainer) {
    setTimeout(() => {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 100); // Small delay to ensure content is rendered
  }
}

// Add User Message
function addUserMessage(message) {
  const messagesContainer = document.getElementById('ai-messages');
  
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message-user';
  messageDiv.textContent = message;
  messagesContainer.appendChild(messageDiv);
  
  scrollToBottom(); // Use enhanced scroll function
  
  conversationState.chatHistory.push({
    sender: 'user',
    message: message,
    timestamp: new Date()
  });
}

// Show Typing Indicator
function showTypingIndicator() {
  const messagesContainer = document.getElementById('ai-messages');
  const typingDiv = document.createElement('div');
  typingDiv.id = 'typing-indicator';
  typingDiv.className = 'typing-indicator';
  typingDiv.innerHTML = `
    <div class="typing-dots">
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    </div>
    <span style="margin-left: 8px; font-size: 12px; color: #666;">Sarah is typing...</span>
  `;
  messagesContainer.appendChild(typingDiv);
  scrollToBottom(); // Use enhanced scroll function
}

function hideTypingIndicator() {
  const typingIndicator = document.getElementById('typing-indicator');
  if (typingIndicator) typingIndicator.remove();
}

// Show Quick Actions
function showQuickActions(actions) {
  const messagesContainer = document.getElementById('ai-messages');
  const actionsDiv = document.createElement('div');
  actionsDiv.className = 'quick-actions';
  
  actions.forEach(action => {
    const button = document.createElement('button');
    button.className = 'quick-btn';
    button.textContent = action;
    button.onclick = () => handleQuickAction(action);
    actionsDiv.appendChild(button);
  });
  
  messagesContainer.appendChild(actionsDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Handle Quick Actions
function handleQuickAction(action) {
  addUserMessage(action);
  processAIResponse(action.toLowerCase());
}

// Send AI Message
function sendAIMessage() {
  const input = document.getElementById('ai-input');
  const message = input.value.trim();
  
  if (!message) return;
  
  addUserMessage(message);
  input.value = '';
  
  processAIResponse(message);
}

// Handle Enter Key
function handleAIEnter(event) {
  if (event.key === 'Enter') {
    sendAIMessage();
  }
}

// Process AI Response (Main Intelligence)
async function processAIResponse(userMessage) {
  const message = userMessage.toLowerCase();
  
  // Check if we should use Groq API for intelligent responses
  if (AI_CONFIG.useGroqAPI && AI_CONFIG.groqApiKey !== "YOUR_GROQ_API_KEY_HERE") {
    await handleGroqResponse(userMessage);
    return;
  }
  
  if (message.includes('service') || message.includes('what do you do')) {
    handleServiceInquiry();
  } else if (message.includes('pricing') || message.includes('cost') || message.includes('price')) {
    handlePricingInquiry();
  } else if (message.includes('demo') || message.includes('trial') || message.includes('free')) {
    handleDemoRequest();
  } else if (message.includes('chatbot') || message.includes('chat bot')) {
    handleSpecificService('chatbot');
  } else if (message.includes('automation') || message.includes('automate')) {
    handleSpecificService('automation');
  } else if (message.includes('ai') || message.includes('artificial intelligence')) {
    handleSpecificService('ai');
  } else if (message.includes('contact') || message.includes('call') || message.includes('phone')) {
    collectContactInfo();
  } else if (isContactInfo(message)) {
    saveContactInfo(message);
  } else {
    handleGeneralQuery(message);
  }
}

// Groq API Integration
async function handleGroqResponse(userMessage) {
  try {
    const businessContext = `You are Sarah, an AI assistant for SoftMark - a company that provides AI automation solutions, chatbots, and business process automation.

    GUIDELINES:
    - Answer general questions about business, technology, AI concepts helpfully
    - Provide brief, practical information for "how to" questions when they're general
    - For complex implementation questions, mention that SoftMark can provide custom solutions
    - Always be professional, helpful, and concise
    - Keep responses clear and actionable (2-3 sentences max)
    - Promote SoftMark services naturally when relevant
    - Focus on business automation, AI chatbots, and productivity solutions

    Common Questions & Answers:
    - "How much can AI save me?": "Businesses typically save 40-80% on operational costs and 60%+ time with AI automation."
    - "What tasks can you automate?": "We automate repetitive tasks like data entry, customer support, invoicing, scheduling, and reporting."
    - "How quickly can you implement?": "Most solutions are live within 2-4 weeks, depending on complexity."
    - "What's the ROI?": "Clients typically see 200-500% ROI within the first year through cost savings and efficiency gains."
    - "Do you work with my industry?": "We serve healthcare, retail, finance, manufacturing, and most business sectors."

    SoftMark Services:
    - AI Chatbots (24/7 customer support, handle 80% of queries)
    - Business Process Automation (save 60%+ time and costs)
    - Custom AI Solutions (boost productivity by 3x)
    - Analytics & Insights (data-driven decisions)

    For complex solutions: "SoftMark specializes in that! What's your email for a consultation?"

    User message: ${userMessage}

    Respond helpfully:`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AI_CONFIG.groqApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          {
            role: 'system',
            content: businessContext
          },
          {
            role: 'user', 
            content: userMessage
          }
        ],
        max_tokens: 150,
        temperature: 0.7
      })
    });

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    
    addAIMessage(aiResponse);
    
    // Check if we should collect contact info
    if (aiResponse.toLowerCase().includes('contact') || aiResponse.toLowerCase().includes('email')) {
      setTimeout(() => {
        showQuickActions(['Share Email', 'Schedule Call', 'Get Demo', 'Pricing Info']);
      }, 2000);
    }
    
  } catch (error) {
    console.error('Groq API Error:', error);
    // Fallback to regular responses with helpful answers
    handleFallbackResponse(userMessage);
  }
}

// Handle Service Inquiry
function handleServiceInquiry() {
  const response = `Great! SoftMark offers AI automation solutions that save 60%+ time and costs.

Which service interests you?`;

  addAIMessage(response);
  setTimeout(() => {
    showQuickActions([
      'AI Chatbots for customer support',
      'Business process automation',
      'Custom AI solutions',
      'Analytics & reporting'
    ]);
  }, 1500);
}// Handle Pricing Inquiry
function handlePricingInquiry() {
  const response = `Our pricing is flexible and tailored to your needs:

💼 Starter: $299/mo - Perfect for small businesses
🚀 Professional: $599/mo - Best for growing companies
⭐ Enterprise: Custom - For large organizations

What's your email? I'll send you detailed pricing.`;

  addAIMessage(response);
  conversationState.stage = 'collecting_contact_for_pricing';
}

// Handle Demo Request
function handleDemoRequest() {
  const response = `Excellent! Our free demo shows how we can:

✅ Automate repetitive tasks
✅ Reduce costs by 60%+
✅ Increase productivity 3x

What's your email to schedule your personalized demo?`;
  
  addAIMessage(response);
  conversationState.stage = 'collecting_contact_for_demo';
}

// Handle Specific Service
function handleSpecificService(service) {
  const serviceResponses = {
    'chatbot': 'Excellent! Our AI chatbots handle 80% of queries automatically and work 24/7.',
    'automation': 'Perfect! Our automation saves businesses 60%+ time on repetitive tasks.',
    'ai': 'Great choice! Custom AI solutions that boost productivity by 3x.'
  };
  
  const response = serviceResponses[service] || 'Great choice! Our AI solutions transform businesses.';
  addAIMessage(response);
  
  setTimeout(() => {
    addAIMessage('To provide you the best solution, I need your contact details. What\'s your email address?');
    conversationState.stage = 'collecting_contact_for_service';
    conversationState.selectedService = service;
  }, 1500);
}

// Collect Contact Info
function collectContactInfo() {
  const response = `Perfect! To help you better, I need some quick details:

📧 Email address
📱 Phone number (optional)

What's your email?`;
  
  addAIMessage(response);
  conversationState.stage = 'collecting_contact';
}

// Handle Fallback Response when API fails
function handleFallbackResponse(message) {
  const lowerMessage = message.toLowerCase();

  // Common questions and helpful responses
  if (lowerMessage.includes('how much can ai save') || lowerMessage.includes('cost savings')) {
    addAIMessage('AI automation typically saves businesses 40-80% on operational costs and 60%+ time on repetitive tasks. Most clients see their ROI within 6-12 months.');
  } else if (lowerMessage.includes('what tasks can you automate') || lowerMessage.includes('what can you automate')) {
    addAIMessage('We can automate data entry, customer support, invoicing, scheduling, reporting, email responses, and many other repetitive business tasks.');
  } else if (lowerMessage.includes('how quickly') || lowerMessage.includes('implementation time')) {
    addAIMessage('Most AI automation solutions are implemented within 2-4 weeks. Simple chatbots can be live in days, while complex integrations take a few weeks.');
  } else if (lowerMessage.includes('roi') || lowerMessage.includes('return on investment')) {
    addAIMessage('Clients typically achieve 200-500% ROI within the first year through reduced costs, increased efficiency, and 24/7 operation capabilities.');
  } else if (lowerMessage.includes('industries') || lowerMessage.includes('what industries')) {
    addAIMessage('We serve healthcare, retail, finance, manufacturing, professional services, e-commerce, and most other business sectors.');
  } else if (lowerMessage.includes('demo') || lowerMessage.includes('show me')) {
    handleDemoRequest();
  } else if (lowerMessage.includes('pricing') || lowerMessage.includes('cost') || lowerMessage.includes('price')) {
    handlePricingInquiry();
  } else {
    // General fallback
    const fallbacks = [
      'That\'s a great question! AI automation can transform how businesses operate. What specific challenge are you facing?',
      'I\'d love to help with that. SoftMark specializes in AI solutions that save time and money. What\'s your biggest operational pain point?',
      'Excellent question! Our AI automation handles everything from customer support to data processing. What would you like to automate first?'
    ];
    addAIMessage(fallbacks[Math.floor(Math.random() * fallbacks.length)]);
  }
}
function handleGeneralQuery(message) {
  // Check if asking for solutions or "how to" questions
  if (message.includes('how to') || message.includes('how can') || message.includes('solution') ||
      message.includes('implement') || message.includes('build') || message.includes('create') ||
      message.includes('develop') || message.includes('make') || message.includes('setup') ||
      message.includes('integrate') || message.includes('install')) {

    // For complex technical questions, offer SoftMark's help
    if (message.includes('complex') || message.includes('enterprise') || message.includes('large scale') ||
        message.includes('integrate') || message.includes('custom')) {
      addAIMessage(`That sounds like a perfect fit for SoftMark's custom solutions! What's your email for a consultation?`);
      conversationState.stage = 'collecting_contact_for_service';
      return;
    }

    // For general "how to" questions, let Groq API handle them
    return;
  }

  // Check if it's general business/AI question - let Groq handle it
  if (message.includes('business') || message.includes('company') || message.includes('work') ||
      message.includes('ai') || message.includes('automation') || message.includes('chatbot') ||
      message.includes('technology') || message.includes('digital') || message.includes('software') ||
      message.includes('cost') || message.includes('price') || message.includes('pricing') ||
      message.includes('demo') || message.includes('trial') || message.includes('free') ||
      message.includes('service') || message.includes('what do you do') ||
      message.includes('how much') || message.includes('time') || message.includes('save') ||
      message.includes('industry') || message.includes('serve')) {

    // Let Groq API handle general business questions normally
    return;
  } else {
    // For completely off-topic queries, gently redirect
    const businessRedirects = [
      `I'm here to help with business automation and AI solutions. What challenges does your company face?`,
      `Let's focus on how SoftMark can help automate your business processes. What specific tasks take up too much time?`,
      `I specialize in AI automation for businesses. What repetitive processes would you like to automate?`
    ];

    const response = businessRedirects[Math.floor(Math.random() * businessRedirects.length)];
    addAIMessage(response);
    setTimeout(() => {
      showQuickActions([
        'How does AI automation work?',
        'What are your pricing plans?',
        'Can you show me a demo?',
        'How much time can I save?',
        'What industries do you serve?'
      ]);
    }, 1500);
  }
}

// Check if message contains contact info
function isContactInfo(message) {
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
  const phoneRegex = /[\+]?[1-9]?[\d]{3}[\s\-]?[\d]{3}[\s\-]?[\d]{4}/;
  
  return emailRegex.test(message) || phoneRegex.test(message) || 
         message.toLowerCase().includes('my name is') || 
         message.toLowerCase().includes("i'm ") ||
         message.toLowerCase().includes("i am ");
}

// Save Contact Info
function saveContactInfo(message) {
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/;
  const phoneRegex = /[\+]?[1-9]?[\d]{3}[\s\-]?[\d]{3}[\s\-]?[\d]{4}/;
  
  const email = message.match(emailRegex);
  const phone = message.match(phoneRegex);
  
  if (email) conversationState.userInfo.email = email[0];
  if (phone) conversationState.userInfo.phone = phone[0];
  
  if (message.toLowerCase().includes('my name is')) {
    const name = message.split('my name is')[1].trim();
    conversationState.userInfo.name = name;
  }
  
  // Check if we're collecting for service interest
  if (conversationState.stage === 'collecting_contact_for_service') {
    if (email && !conversationState.userInfo.phone) {
      // Got email, now ask for phone
      addAIMessage('Perfect! And what\'s your phone number?');
      conversationState.userInfo.interestedService = conversationState.selectedService;
      return;
    } else if (phone || (email && conversationState.userInfo.phone)) {
      // Got both email and phone
      saveLeadToDatabase();
      const response = `Excellent! Thank you for your interest in our ${conversationState.selectedService || 'services'}!

Our team will contact you within the next 30 minutes to discuss your requirements. 

Have a great day!`;
      addAIMessage(response);
      return;
    }
  }
  
  // Regular contact collection flow
  saveLeadToDatabase();
  
  const response = `Perfect! Thank you ${conversationState.userInfo.name || 'for sharing that'}!

I've forwarded your information to our automation experts. You can expect:

✅ A personalized consultation within 24 hours
✅ Custom solution recommendations  
✅ Free demo of our AI automation tools
✅ No-obligation pricing proposal

Is there anything specific you'd like me to tell our team about your automation needs?`;
  
  addAIMessage(response);
  setTimeout(() => {
    showQuickActions(['Schedule a Call', 'Get Pricing Info', 'View Demo', 'Learn More']);
  }, 3000);
}

// Save Lead to Local Storage (No Firebase)
function saveLeadToDatabase() {
  const leadData = {
    ...conversationState.userInfo,
    chatHistory: conversationState.chatHistory,
    timestamp: new Date().toISOString(),
    source: 'website_ai_chat',
    stage: conversationState.stage
  };
  
  // Save to localStorage instead of Firebase
  try {
    let leads = JSON.parse(localStorage.getItem('softmark_leads') || '[]');
    leads.push(leadData);
    localStorage.setItem('softmark_leads', JSON.stringify(leads));
    console.log('✅ Lead saved to local storage');
    
    // Optional: Send to your backend API
    // fetch('/api/leads', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(leadData)
    // });
  } catch (error) {
    console.error('❌ Error saving lead:', error);
  }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
  console.log('🤖 AI Chatbot System Ready!');
});
