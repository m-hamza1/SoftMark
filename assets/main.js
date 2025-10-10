// Main JavaScript for SoftMark Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initModals();
    initForms();
    initNavigation();
    initCountrySelect();
    initScrollToTop();
    initCalendarDate();
});

// Initialize all modal dialogs
function initModals() {
    // Close modal when clicking outside content
    document.addEventListener('click', function(e) {
        const modal = document.getElementById('modal');
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}

// Open modal function - Updated to use separate modals
window.openModal = function(type = 'consultation') {
    let modalId = type; // 'trial' or 'consultation'
    const modal = document.getElementById(modalId);

    if (!modal) {
        console.error('Modal element not found:', modalId);
        return;
    }

    // Show modal with animation
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';

    // Force reflow
    void modal.offsetHeight;

    // Add visible class
    modal.classList.remove('opacity-0');
    const modalContent = modal.querySelector('.modal-content');
    if (modalContent) {
        modalContent.style.transform = 'scale(1)';
        modalContent.style.opacity = '1';
    }
};// Close modal function - Updated to handle specific modal IDs
window.closeModal = function(modalId = null) {
    // If no modalId provided, try to find which modal is open
    if (!modalId) {
        const openModals = ['trial', 'consultation', 'modal'];
        for (const id of openModals) {
            const modal = document.getElementById(id);
            if (modal && !modal.classList.contains('hidden')) {
                modalId = id;
                break;
            }
        }
    }
    
    const modal = document.getElementById(modalId);
    if (!modal) return;
    
    const modalContent = modal.querySelector('.modal-content');
    
    // Animate out
    modal.classList.add('opacity-0');
    if (modalContent) {
        modalContent.style.transform = 'scale(0.9)';
        modalContent.style.opacity = '0';
    }
    
    // Hide after animation
    setTimeout(() => {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
        
        // Reset styles
        if (modalContent) {
            modalContent.style.transform = '';
            modalContent.style.opacity = '';
        }
    }, 300);
};

// Initialize all forms
function initForms() {
    // Booking form submission
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Basic form validation
            const requiredFields = bookingForm.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('border-red-500');
                    isValid = false;
                } else {
                    field.classList.remove('border-red-500');
                }
            });
            
            if (!isValid) {
                showNotification('Please fill in all required fields', 'error');
                return;
            }
            
            // Get form data
            const formData = new FormData(bookingForm);
            
            // Show loading state
            const submitBtn = bookingForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner">Sending...</span>';
            
            try {
                // Submit form data
                const response = await fetch('process-booking.php', {
                    method: 'POST',
                    body: formData
                });
                
                const result = await response.json();
                
                if (result.success) {
                    showNotification(result.message, 'success');
                    bookingForm.reset();
                    closeModal();
                } else {
                    showNotification(result.message, 'error');
                }
            } catch (error) {
                console.error('Error:', error);
                showNotification('There was an error submitting the form. Please try again.', 'error');
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
            
            // Form handling is done in try-catch block above
        });
    }
    
    // Contact form and Trial form submission
    document.querySelectorAll('#contactForm, #trialForm').forEach(form => {
        if (form) {
            form.addEventListener('submit', async function(e) {
                e.preventDefault();
                
                // Basic form validation
                const requiredFields = this.querySelectorAll('[required]');
                let isValid = true;
                
                requiredFields.forEach(field => {
                    if (!field.value.trim()) {
                        field.classList.add('border-red-500');
                        isValid = false;
                    } else {
                        field.classList.remove('border-red-500');
                    }
                });
                
                if (!isValid) {
                    showNotification('Please fill in all required fields', 'error');
                    return;
                }
                
                // Get form data
                const formData = new FormData(this);
                
                // Show loading state
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalBtnText = submitBtn.innerHTML;
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span class="spinner">Sending...</span>';
                
                try {
                    // Submit form data
                    const response = await fetch('process-form.php', {
                        method: 'POST',
                        body: formData
                    });
                    
                    const result = await response.json();
                    
                    if (result.success) {
                        showNotification(result.message, 'success');
                        this.reset();
                        if (this.id === 'trialForm') closeModal();
                    } else {
                        showNotification(result.message, 'error');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    showNotification('There was an error submitting the form. Please try again.', 'error');
                } finally {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalBtnText;
                }
            });
        }
    });
}

// Initialize country select
function initCountrySelect() {
    const countryInput = document.getElementById('country');
    if (countryInput && typeof countrySelect === 'function') {
        countrySelect(countryInput, {
            defaultCountry: 'us',
            preferredCountries: ['pk', 'us', 'gb', 'ca', 'au', 'de', 'fr', 'in'],
            responsiveDropdown: true,
            placeholder: 'Select your country',
            style: {
                color: 'inherit',
                fontWeight: 'inherit',
            },
        });
        
        // Handle country change
        countryInput.addEventListener('countrychange', function() {
            // You can add custom logic here when country changes
        });
    }
}

// Initialize navigation
function initNavigation() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobile-menu');
                if (mobileMenu && mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
                
                // Scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for fixed header
                    behavior: 'smooth'
                });
                
                // Update URL without page jump
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            this.setAttribute('aria-expanded', !mobileMenu.classList.contains('hidden'));
        });
    }
}

// Initialize scroll to top button
function initScrollToTop() {
    const scrollToTopButton = document.getElementById('scroll-to-top');
    
    if (scrollToTopButton) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollToTopButton.classList.remove('opacity-0', 'invisible');
                scrollToTopButton.classList.add('opacity-100', 'visible');
            } else {
                scrollToTopButton.classList.remove('opacity-100', 'visible');
                scrollToTopButton.classList.add('opacity-0', 'invisible');
            }
        });
        
        // Scroll to top when clicked
        scrollToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg transform transition-all duration-300 ${
        type === 'success' 
            ? 'bg-green-500 text-white' 
            : 'bg-red-500 text-white'
    }`;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('translate-x-0', 'opacity-100');
    }, 10);
    
    // Remove after delay
    setTimeout(() => {
        notification.classList.remove('opacity-100');
        notification.classList.add('opacity-0');
        
        // Remove from DOM after animation
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Video modal functionality
window.openVideoModal = function(videoUrl) {
    const videoModal = document.getElementById('video-modal');
    const videoPlayer = document.getElementById('video-player');
    
    if (videoModal && videoPlayer) {
        videoPlayer.src = videoUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ'; // Default video or pass your own
        videoModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
};

window.closeVideoModal = function() {
    const videoModal = document.getElementById('video-modal');
    const videoPlayer = document.getElementById('video-player');
    
    if (videoModal && videoPlayer) {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
        videoModal.classList.add('hidden');
        document.body.style.overflow = '';
    }
};

// Initialize calendar date display
function initCalendarDate() {
    const dateDisplay = document.getElementById('calendar-date-display');
    const monthDisplay = document.getElementById('calendar-month-display');
    const dayDisplay = document.getElementById('calendar-day-display');

    if (dateDisplay && monthDisplay && dayDisplay) {
        const now = new Date();
        const day = now.getDate();
        const month = now.toLocaleString('default', { month: 'long' });
        const year = now.getFullYear();
        const dayName = now.toLocaleString('default', { weekday: 'long' });

        dateDisplay.textContent = day;
        monthDisplay.textContent = `${month} ${year}`;
        dayDisplay.textContent = dayName;
    }
}
