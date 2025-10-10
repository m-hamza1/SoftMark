// Enhanced form validation and popup functionality

// Validate phone number format
function validatePhone(phone) {
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/;
    return phoneRegex.test(phone);
}

// Validate email format
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Enhanced form validation with real-time feedback
function enhancedFormValidation(form) {
    const fields = form.querySelectorAll('input, select, textarea');
    let isValid = true;

    fields.forEach(field => {
        const fieldValue = field.value.trim();
        const fieldType = field.type;
        const isRequired = field.hasAttribute('required');

        // Remove existing error messages
        const existingError = field.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        if (isRequired && !fieldValue) {
            showFieldError(field, 'This field is required');
            isValid = false;
        } else if (fieldValue) {
            switch (fieldType) {
                case 'email':
                    if (!validateEmail(fieldValue)) {
                        showFieldError(field, 'Please enter a valid email address');
                        isValid = false;
                    }
                    break;
                case 'tel':
                    if (!validatePhone(fieldValue)) {
                        showFieldError(field, 'Please enter a valid phone number');
                        isValid = false;
                    }
                    break;
            }
        }

        // Add real-time validation
        field.addEventListener('input', function() {
            const errorMsg = field.parentElement.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.remove();
            }
            field.classList.remove('border-red-500');
            field.classList.add('border-white/20');
        });
    });

    return isValid;
}

// Show field error message
function showFieldError(field, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message text-red-400 text-xs mt-1';
    errorDiv.textContent = message;
    field.parentElement.appendChild(errorDiv);
    field.classList.remove('border-white/20');
    field.classList.add('border-red-500');
}

// Enhanced modal functionality
function enhanceModal() {
    const modal = document.getElementById('modal');
    const backdrop = modal.querySelector('.backdrop');

    // Add loading animation to form submissions
    const forms = modal.querySelectorAll('form');
    forms.forEach(form => {
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.addEventListener('click', function(e) {
                if (!enhancedFormValidation(form)) {
                    e.preventDefault();
                    return;
                }
            });
        }
    });

    // Smooth modal animations
    window.openModal = function(type = 'consultation') {
        let modalId = type; // 'trial', 'consultation', or 'modal'
        const modal = document.getElementById(modalId);
        if (!modal) {
            console.error('Modal element not found:', modalId);
            return;
        }

        // Update form type and title if it's the generic modal
        if (modalId === 'modal') {
            const form = modal.querySelector('form');
            const title = modal.querySelector('h2');
            
            if (form && title) {
                if (type === 'consultation') {
                    form.id = 'bookingForm';
                    title.textContent = 'Book Your Free Consultation';
                } else if (type === 'trial') {
                    form.id = 'trialForm';
                    title.textContent = 'Start Your Free Trial';
                }
            }
        }

        // Show modal with animation
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';

        // Force reflow
        void modal.offsetHeight;

        // Add visible class
        requestAnimationFrame(() => {
            modal.classList.remove('opacity-0');
            const modalContent = modal.querySelector('.modal-content');
            if (modalContent) {
                modalContent.style.transform = 'scale(1)';
                modalContent.style.opacity = '1';
            }
        });
    };

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

        const content = modal.querySelector('.modal-content');
        if (content) {
            content.style.transform = 'scale(0.9)';
            content.style.opacity = '0';
        }
        
        modal.classList.add('opacity-0');

        // Wait for animation to complete
        setTimeout(() => {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
            if (content) {
                content.style.transform = '';
                content.style.opacity = '';
            }
        }, 300);
    };
}

// Initialize enhanced forms and modals
document.addEventListener('DOMContentLoaded', function() {
    enhanceModal();

    // Add real-time validation to all forms
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!enhancedFormValidation(this)) {
                e.preventDefault();
            }
        });
    });
});