/**
 * Chairman Message Page JavaScript
 * Features: Page-specific animations, interactions, and enhancements
 */

document.addEventListener('DOMContentLoaded', function() {
    // ===== INITIALIZE CHAIRMAN MESSAGE FEATURES =====
    initChairmanAnimations();
    initMessageInteractions();
    initVisionMissionCards();
    initScrollEffects();
    initAccessibilityFeatures();
    
    console.log('Chairman Message page initialized successfully!');
    
    // ===== CHAIRMAN PROFILE ANIMATIONS =====
    function initChairmanAnimations() {
        const chairmanImage = document.querySelector('.chairman-image');
        const chairmanProfile = document.querySelector('.chairman-profile');
        
        if (chairmanImage && chairmanProfile) {
            // Image hover effect
            chairmanImage.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05)';
                this.style.filter = 'brightness(1.1)';
            });
            
            chairmanImage.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
                this.style.filter = 'brightness(1)';
            });
            
            // Profile card hover effect
            chairmanProfile.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
                this.style.boxShadow = '0 25px 50px rgba(47, 90, 142, 0.2)';
            });
            
            chairmanProfile.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'var(--shadow-lg)';
            });
        }
        
        // Credential items animation
        const credentialItems = document.querySelectorAll('.credential-item');
        credentialItems.forEach((item, index) => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(10px)';
                this.style.background = 'var(--white)';
                this.style.boxShadow = 'var(--shadow-sm)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0)';
                this.style.background = 'var(--light-gray)';
                this.style.boxShadow = 'none';
            });
        });
    }
    
    // ===== MESSAGE CONTENT INTERACTIONS =====
    function initMessageInteractions() {
        const messageContent = document.querySelector('.message-content');
        const messageParagraphs = document.querySelectorAll('.message-paragraph');
        
        if (messageContent) {
            // Message content hover effect
            messageContent.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-5px)';
                this.style.boxShadow = '0 25px 50px rgba(47, 90, 142, 0.2)';
            });
            
            messageContent.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = 'var(--shadow-lg)';
            });
        }
        
        // Paragraph hover effects
        messageParagraphs.forEach((paragraph, index) => {
            paragraph.addEventListener('mouseenter', function() {
                this.style.transform = 'translateX(5px)';
                this.style.color = 'var(--primary-blue)';
                this.style.fontWeight = '500';
            });
            
            paragraph.addEventListener('mouseleave', function() {
                this.style.transform = 'translateX(0)';
                this.style.color = 'var(--text-gray)';
                this.style.fontWeight = 'normal';
            });
        });
        
        // Signature animation
        const signatureLine = document.querySelector('.signature-line');
        const signatureName = document.querySelector('.signature-name');
        
        if (signatureLine && signatureName) {
            signatureLine.addEventListener('mouseenter', function() {
                this.style.width = '250px';
                this.style.background = 'linear-gradient(90deg, var(--accent-gold), var(--primary-blue))';
            });
            
            signatureLine.addEventListener('mouseleave', function() {
                this.style.width = '200px';
                this.style.background = 'linear-gradient(90deg, var(--primary-blue), var(--accent-gold))';
            });
        }
    }
    
    // ===== VISION & MISSION CARDS =====
    function initVisionMissionCards() {
        const visionCard = document.querySelector('.vision-card');
        const missionCard = document.querySelector('.mission-card');
        
        if (visionCard) {
            visionCard.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-15px) scale(1.02)';
                this.style.boxShadow = '0 30px 60px rgba(47, 90, 142, 0.2)';
                this.style.borderColor = 'var(--accent-gold)';
                
                const icon = this.querySelector('.card-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.2) rotate(10deg)';
                    icon.style.boxShadow = '0 20px 40px rgba(47, 90, 142, 0.3)';
                }
            });
            
            visionCard.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = 'var(--shadow-lg)';
                this.style.borderColor = 'transparent';
                
                const icon = this.querySelector('.card-icon');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                    icon.style.boxShadow = 'var(--shadow-md)';
                }
            });
        }
        
        if (missionCard) {
            missionCard.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-15px) scale(1.02)';
                this.style.boxShadow = '0 30px 60px rgba(47, 90, 142, 0.2)';
                this.style.borderColor = 'var(--accent-gold)';
                
                const icon = this.querySelector('.card-icon');
                if (icon) {
                    icon.style.transform = 'scale(1.2) rotate(-10deg)';
                    icon.style.boxShadow = '0 20px 40px rgba(47, 90, 142, 0.3)';
                }
            });
            
            missionCard.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = 'var(--shadow-lg)';
                this.style.borderColor = 'transparent';
                
                const icon = this.querySelector('.card-icon');
                if (icon) {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                    icon.style.boxShadow = 'var(--shadow-md)';
                }
            });
        }
    }
    
    // ===== SCROLL EFFECTS =====
    function initScrollEffects() {
        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Add staggered animation for multiple elements
                    if (entry.target.classList.contains('chairman-profile')) {
                        setTimeout(() => {
                            entry.target.style.animation = 'fadeInUp 0.8s ease-out';
                        }, 100);
                    } else if (entry.target.classList.contains('message-content')) {
                        setTimeout(() => {
                            entry.target.style.animation = 'fadeInUp 0.8s ease-out';
                        }, 200);
                    } else if (entry.target.classList.contains('vision-card')) {
                        setTimeout(() => {
                            entry.target.style.animation = 'fadeInUp 0.8s ease-out';
                        }, 300);
                    } else if (entry.target.classList.contains('mission-card')) {
                        setTimeout(() => {
                            entry.target.style.animation = 'fadeInUp 0.8s ease-out';
                        }, 400);
                    }
                }
            });
        }, observerOptions);
        
        // Observe elements
        const elementsToObserve = document.querySelectorAll('.chairman-profile, .message-content, .vision-card, .mission-card');
        elementsToObserve.forEach(element => {
            observer.observe(element);
        });
        
        // Parallax effect for page header
        const pageHeader = document.querySelector('.page-header');
        if (pageHeader) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const parallax = scrolled * 0.3;
                pageHeader.style.transform = `translateY(${parallax}px)`;
            });
        }
    }
    
    // ===== ACCESSIBILITY FEATURES =====
    function initAccessibilityFeatures() {
        // Keyboard navigation for interactive elements
        const interactiveElements = document.querySelectorAll('.chairman-profile, .message-content, .vision-card, .mission-card');
        
        interactiveElements.forEach(element => {
            element.setAttribute('tabindex', '0');
            element.setAttribute('role', 'button');
            
            element.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
            
            element.addEventListener('focus', function() {
                this.style.outline = '2px solid var(--accent-gold)';
                this.style.outlineOffset = '2px';
            });
            
            element.addEventListener('blur', function() {
                this.style.outline = 'none';
            });
        });
        
        // Screen reader announcements
        const messageTitle = document.querySelector('.message-title');
        if (messageTitle) {
            messageTitle.setAttribute('aria-live', 'polite');
        }
        
        // High contrast mode support
        if (window.matchMedia('(prefers-contrast: high)').matches) {
            document.body.classList.add('high-contrast');
        }
        
        // Reduced motion support
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.body.classList.add('reduced-motion');
            
            // Disable animations
            const style = document.createElement('style');
            style.textContent = `
                *, *::before, *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // ===== UTILITY FUNCTIONS =====
    
    // Throttle function for scroll events
    function throttle(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Debounce function for resize events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Optimize scroll events
    const optimizedScrollHandler = throttle(() => {
        // Handle scroll-dependent animations here if needed
    }, 16); // ~60fps
    
    window.addEventListener('scroll', optimizedScrollHandler);
    
    // Optimize resize events
    const optimizedResizeHandler = debounce(() => {
        // Handle resize-dependent layout changes here if needed
    }, 250);
    
    window.addEventListener('resize', optimizedResizeHandler);
    
    // ===== PERFORMANCE MONITORING =====
    
    // Monitor page load performance
    window.addEventListener('load', function() {
        if ('performance' in window) {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`Chairman Message page loaded in ${loadTime}ms`);
        }
    });
    
    // ===== ERROR HANDLING =====
    
    window.addEventListener('error', function(e) {
        console.error('Chairman Message page error:', e.error);
    });
    
    // ===== CLEANUP =====
    
    // Cleanup function for when page is unloaded
    window.addEventListener('beforeunload', function() {
        // Remove event listeners and clean up resources
        window.removeEventListener('scroll', optimizedScrollHandler);
        window.removeEventListener('resize', optimizedResizeHandler);
    });
});

// ===== GLOBAL FUNCTIONS =====

// Function to announce changes to screen readers
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.style.position = 'absolute';
    announcement.style.left = '-10000px';
    announcement.style.width = '1px';
    announcement.style.height = '1px';
    announcement.style.overflow = 'hidden';
    
    document.body.appendChild(announcement);
    announcement.textContent = message;
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Function to show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'var(--accent-gold)' : 'var(--primary-blue)'};
        color: var(--white);
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}
