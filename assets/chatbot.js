// SoftMark AI Chatbot System
// Professional AI-powered chat with Groq API integration

// AI Configuration
const AI_CONFIG = {
  groqApiKey: "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",
  model: 'llama-3.1-8b-instant',
  useGroqAPI: true,
  maxTokens: 30,
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

// Open AI Chat with Sound Effect
function openAIChat() {
  // Play stunning sound effect
  const openSound = document.getElementById('chat-open-sound');
  if (openSound) {
    openSound.currentTime = 0;
    openSound.play().catch(e => console.log('Sound play failed:', e));
  }
  
  // Show chat with animation
  const chatContainer = document.getElementById('ai-chat-container');
  chatContainer.style.display = 'block';
  
  if (conversationState.chatHistory.length === 0) {
    initializeAIChat();
  }
}

// Close AI Chat
function closeAIChat() {
  document.getElementById('ai-chat-container').style.display = 'none';
}

// Initialize AI Chat
function initializeAIChat() {
  const greeting = AI_RESPONSES.greetings[Math.floor(Math.random() * AI_RESPONSES.greetings.length)];
  addAIMessage(greeting);
  setTimeout(() => {
    showQuickActions(['Our Services', 'Pricing', 'Free Demo', 'About AI']);
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
    
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    conversationState.chatHistory.push({
      sender: 'ai',
      message: message,
      timestamp: new Date()
    });
  }, delay);
}

// Add User Message
function addUserMessage(message) {
  const messagesContainer = document.getElementById('ai-messages');
  
  const messageDiv = document.createElement('div');
  messageDiv.className = 'message-user';
  messageDiv.textContent = message;
  messagesContainer.appendChild(messageDiv);
  
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
  
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
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
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

    STRICT RULES:
    - Answer general questions about business, technology, AI concepts
    - DO NOT provide step-by-step solutions or "how to" instructions
    - If user asks "how to do something" or "what's the solution", say: "That's exactly what SoftMark specializes in! Let me connect you with our experts who can provide the perfect solution."
    - ONLY discuss SoftMark's services for solution-based queries
    - Collect user's business problems and contact information
    - Be direct and professional
    - Keep responses VERY SHORT (maximum 1-2 sentences)
    
    Examples:
    - "What is AI?" ✅ Answer normally
    - "How to implement AI?" ❌ Redirect to SoftMark
    - "What are chatbots?" ✅ Answer normally  
    - "How to build chatbots?" ❌ Redirect to SoftMark
    
    SoftMark Services:
    - AI Chatbots (24/7 customer support)
    - Business Process Automation  
    - Custom AI Solutions
    - Analytics & Insights
    
    For solution/implementation questions: "That's exactly what SoftMark does! What's your email?"
    
    User message: ${userMessage}
    
    Respond briefly:`;

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
        max_tokens: 30,
        temperature: 0.7
      })
    });

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;
    
    addAIMessage(aiResponse);
    
    // Check if we should collect contact info
    if (aiResponse.toLowerCase().includes('contact') || aiResponse.toLowerCase().includes('email')) {
      setTimeout(() => {
        showQuickActions(['Share Contact', 'Schedule Call', 'Tell me more', 'Get Demo']);
      }, 2000);
    }
    
  } catch (error) {
    console.error('Groq API Error:', error);
    // Fallback to regular responses
    handleGeneralQuery(userMessage);
  }
}

// Handle Service Inquiry
function handleServiceInquiry() {
  const response = `Great! SoftMark offers AI automation solutions that save 60%+ time and costs.

Which service interests you?`;
  
  addAIMessage(response);
  setTimeout(() => {
    showQuickActions(['AI Chatbots', 'Automation', 'Custom AI', 'Analytics']);
  }, 1500);
}

// Handle Pricing Inquiry
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

// Handle General Query
function handleGeneralQuery(message) {
  // Check if asking for solutions or "how to" questions  
  if (message.includes('how to') || message.includes('how can') || message.includes('solution') || 
      message.includes('implement') || message.includes('build') || message.includes('create') ||
      message.includes('develop') || message.includes('make') || message.includes('setup') ||
      message.includes('integrate') || message.includes('install')) {
    
    addAIMessage(`That's exactly what SoftMark does! What's your email?`);
    conversationState.stage = 'collecting_contact_for_service';
    return;
  }
  
  // Check if it's general business question
  if (message.includes('business') || message.includes('company') || message.includes('work') || 
      message.includes('ai') || message.includes('automation') || message.includes('chatbot') ||
      message.includes('technology') || message.includes('digital') || message.includes('software')) {
    
    // Let Groq API handle general business questions normally  
    return;
  } else {
    // For non-business queries, redirect to business focus
    const businessRedirects = [
      `If you're interested in our services, let's focus on business matters. What challenges does your company face?`,
      `I'm here for business automation solutions only. What operational problems can SoftMark help you solve?`,
      `Let's talk business! What specific processes in your company need automation?`
    ];
    
    const response = businessRedirects[Math.floor(Math.random() * businessRedirects.length)];
    addAIMessage(response);
    setTimeout(() => {
      showQuickActions(['AI Chatbots', 'Process Automation', 'Analytics', 'Learn More']);
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
    showQuickActions(['Chatbot Demo', 'Automation Demo', 'Pricing Info', "I'm all set!"]);
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
