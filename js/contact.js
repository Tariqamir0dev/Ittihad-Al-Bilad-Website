/**
 * Contact Page JavaScript - Simplified Version
 * Handles basic form functionality and interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize contact page features
    initContactForm();
    initQuickContactButtons();
    initMapInteractions();
    
    console.log('Contact page initialized successfully!');
});

// ===== CONTACT FORM HANDLING =====
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmission);
        
        // Basic validation on blur and focus tracking
        const formInputs = contactForm.querySelectorAll('input, textarea, select');
        formInputs.forEach(input => {
            // Mark field as touched when user focuses on it
            input.addEventListener('focus', function() {
                this.classList.add('touched');
            });
            
            // Validate when user leaves the field
            input.addEventListener('blur', validateField);
            
            // Also validate on input for real-time feedback
            input.addEventListener('input', function() {
                if (this.classList.contains('touched')) {
                    validateField({ target: this });
                }
            });
        });
    }
}

// ===== FORM VALIDATION =====
function validateField(event) {
    const field = event.target;
    const fieldValue = field.value.trim();
    const fieldName = field.name;
    
    // Only validate if field has been touched (focused and then blurred)
    if (!field.classList.contains('touched')) {
        return true;
    }
    
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (field.hasAttribute('required') && !fieldValue) {
        isValid = false;
        errorMessage = 'هذا الحقل مطلوب';
    }
    
    // Email validation
    if (fieldName === 'email' && fieldValue) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(fieldValue)) {
            isValid = false;
            errorMessage = 'يرجى إدخال بريد إلكتروني صحيح';
        }
    }
    
    // Name validation
    if (fieldName === 'name' && fieldValue && fieldValue.length < 2) {
        isValid = false;
        errorMessage = 'الاسم يجب أن يكون على الأقل حرفين';
    }
    
    // Message validation
    if (fieldName === 'message' && fieldValue && fieldValue.length < 10) {
        isValid = false;
        errorMessage = 'الرسالة يجب أن تكون على الأقل 10 أحرف';
    }
    
    // Display validation result
    showFieldValidation(field, isValid, errorMessage);
    
    return isValid;
}

function showFieldValidation(field, isValid, errorMessage) {
    const errorElement = document.getElementById(field.name + 'Error');
    
    if (errorElement) {
        if (isValid) {
            errorElement.textContent = '';
            errorElement.classList.remove('show');
            field.classList.remove('error');
        } else {
            errorElement.textContent = errorMessage;
            errorElement.classList.add('show');
            field.classList.add('error');
        }
    }
}

// ===== FORM SUBMISSION =====
function handleFormSubmission(event) {
    event.preventDefault();
    
    const form = event.target;
    const submitBtn = form.querySelector('.submit-btn');
    
    // Mark all fields as touched and validate
    const formInputs = form.querySelectorAll('input, textarea, select');
    let isFormValid = true;
    
    formInputs.forEach(input => {
        // Mark as touched to enable validation
        input.classList.add('touched');
        
        // Validate the field
        if (!validateField({ target: input })) {
            isFormValid = false;
        }
    });
    
    // Check privacy checkbox
    const privacyCheckbox = form.querySelector('#privacy');
    if (privacyCheckbox && !privacyCheckbox.checked) {
        isFormValid = false;
        showFieldValidation(privacyCheckbox, false, 'يجب الموافقة على سياسة الخصوصية');
    }
    
    if (!isFormValid) {
        showFormMessage('يرجى تصحيح الأخطاء في النموذج', 'error');
        return;
    }
    
    // Show loading state
    setSubmitButtonLoading(submitBtn, true);
    
    // Simulate form submission
    setTimeout(() => {
        const success = Math.random() > 0.1; // 90% success rate for demo
        
        if (success) {
            showFormMessage('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.', 'success');
            form.reset();
            clearAllFieldErrors(form);
        } else {
            showFormMessage('حدث خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى.', 'error');
        }
        
        setSubmitButtonLoading(submitBtn, false);
    }, 2000);
}

function setSubmitButtonLoading(button, isLoading) {
    if (isLoading) {
        button.disabled = true;
        button.classList.add('loading');
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
    } else {
        button.disabled = false;
        button.classList.remove('loading');
        button.innerHTML = '<i class="fas fa-paper-plane"></i> إرسال الرسالة';
    }
}

function clearAllFieldErrors(form) {
    const errorElements = form.querySelectorAll('.form-error');
    const inputElements = form.querySelectorAll('input, textarea, select');
    
    errorElements.forEach(error => {
        error.textContent = '';
        error.classList.remove('show');
    });
    
    inputElements.forEach(input => {
        input.classList.remove('error');
    });
}

function showFormMessage(message, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.form-success, .form-error-message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message element
    const messageElement = document.createElement('div');
    messageElement.className = type === 'success' ? 'form-success' : 'form-error-message';
    messageElement.textContent = message;
    messageElement.classList.add('show');
    
    // Insert message at the top of the form
    const form = document.getElementById('contactForm');
    form.insertBefore(messageElement, form.firstChild);
    
    // Auto-remove success message after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            messageElement.classList.remove('show');
            setTimeout(() => messageElement.remove(), 300);
        }, 5000);
    }
}

// ===== QUICK CONTACT BUTTONS =====
function initQuickContactButtons() {
    const quickContactBtns = document.querySelectorAll('.quick-contact-btn');
    
    quickContactBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// ===== MAP INTERACTIONS =====
function initMapInteractions() {
    const mapContainer = document.querySelector('.map-container');
    
    if (mapContainer) {
        // Add hover effects
        mapContainer.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.1)';
        });
        
        mapContainer.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
        });
    }
}

// ===== SIMPLE ANIMATIONS =====
function initAnimations() {
    // Simple fade-in animation for contact cards
    const contactCards = document.querySelectorAll('.contact-form-container, .contact-info-card, .map-container');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    contactCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Initialize animations
initAnimations();