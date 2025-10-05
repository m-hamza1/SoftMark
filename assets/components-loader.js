// Component Loader for SoftMark Website
// This script loads header, footer, and chatbot components into all pages

// Initialize components when DOM is ready
console.log('Components loader script loaded');
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing components...');
    loadComponents();
});

async function loadComponents() {
    try {
        // Load Header
        const headerPlaceholder = document.getElementById('header-placeholder');
        if (headerPlaceholder) {
            const headerResponse = await fetch('components/header.html');
            if (headerResponse.ok) {
                const headerHtml = await headerResponse.text();
                headerPlaceholder.innerHTML = headerHtml;
                // Dispatch custom event to notify header is loaded
                document.dispatchEvent(new CustomEvent('headerLoaded'));
                console.log('✅ Header component loaded successfully');
            } else {
                console.error('Failed to load header component');
            }
        }

        // Load Footer
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (footerPlaceholder) {
            const footerResponse = await fetch('components/footer.html');
            if (footerResponse.ok) {
                const footerHtml = await footerResponse.text();
                footerPlaceholder.innerHTML = footerHtml;
            } else {
                console.error('Failed to load footer component');
            }
        }

        // Load Chatbot
        const chatbotPlaceholder = document.getElementById('chatbot-placeholder');
        if (chatbotPlaceholder) {
            const chatbotResponse = await fetch('components/chatbot.html');
            if (chatbotResponse.ok) {
                const chatbotHtml = await chatbotResponse.text();
                chatbotPlaceholder.innerHTML = chatbotHtml;
                console.log('✅ Chatbot component loaded successfully');
            } else {
                console.error('Failed to load chatbot component');
            }
        }

        // Highlight active nav link
        highlightActiveNavLink();
    } catch (error) {
        console.error('Error loading components:', error);
    }
}

// Function to highlight active navigation link based on current page
function highlightActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('header nav a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('text-white', 'bg-white/5');
            link.classList.remove('text-zinc-300');
        }
    });
}
