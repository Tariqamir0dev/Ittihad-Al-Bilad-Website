/**
 * Board Members Page JavaScript
 * Handles interactions and animations for the board members page
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize board members page
    initBoardMembersPage();
    
    // Initialize animations
    initScrollAnimations();
    
    // Initialize member card interactions
    initMemberCardInteractions();
    
    // Initialize statistics counter
    initStatisticsCounter();
});

/**
 * Initialize board members page
 */
function initBoardMembersPage() {
    console.log('Board Members page initialized');
    
    // Add loading animation to member cards
    const memberCards = document.querySelectorAll('.board-member-card');
    memberCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

/**
 * Initialize scroll animations
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.board-member-card, .stat-item');
    animatedElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
}

/**
 * Initialize member card interactions
 */
function initMemberCardInteractions() {
    const memberCards = document.querySelectorAll('.board-member-card');
    
    memberCards.forEach(card => {
        // Add hover effect enhancement
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
            
            // Add special effect for chairman card
            if (this.classList.contains('chairman-card')) {
                this.style.transform = 'translateY(-12px) scale(1.02)';
                this.style.boxShadow = '0 25px 50px rgba(244, 198, 58, 0.3)';
            }
            
            // Add special effect for vice chairman card
            if (this.classList.contains('vice-chairman-card')) {
                this.style.transform = 'translateY(-10px) scale(1.01)';
                this.style.boxShadow = '0 20px 40px rgba(47, 90, 142, 0.2)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '';
        });
        
        // Add click interaction for mobile
        card.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                
                // Toggle active state
                memberCards.forEach(c => c.classList.remove('active'));
                this.classList.add('active');
                
                // Scroll to card if needed
                this.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        });
    });
}

/**
 * Initialize statistics counter animation
 */
function initStatisticsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element, target, suffix = '') => {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (target === 100) {
                element.textContent = Math.floor(current) + '%';
            } else if (target >= 50) {
                element.textContent = Math.floor(current) + '+';
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
        }, 20);
    };
    
    // Create intersection observer for stats
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const text = statNumber.textContent;
                
                // Extract number from text
                let target = 0;
                let suffix = '';
                
                if (text.includes('%')) {
                    target = 100;
                } else if (text.includes('+')) {
                    target = parseInt(text.replace('+', ''));
                } else {
                    target = parseInt(text);
                }
                
                // Animate counter
                animateCounter(statNumber, target, suffix);
                
                // Stop observing this element
                statsObserver.unobserve(statNumber);
            }
        });
    }, { threshold: 0.5 });
    
    // Observe all stat numbers
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
}

/**
 * Handle member card focus for accessibility
 */
function initAccessibilityFeatures() {
    const memberCards = document.querySelectorAll('.board-member-card');
    
    memberCards.forEach(card => {
        // Add keyboard navigation
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Add focus styles
        card.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--accent-gold)';
            this.style.outlineOffset = '2px';
        });
        
        card.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
}

/**
 * Initialize responsive features
 */
function initResponsiveFeatures() {
    // Handle window resize
    window.addEventListener('resize', function() {
        const memberCards = document.querySelectorAll('.board-member-card');
        
        if (window.innerWidth <= 768) {
            // Mobile view adjustments
            memberCards.forEach(card => {
                card.style.cursor = 'pointer';
            });
        } else {
            // Desktop view adjustments
            memberCards.forEach(card => {
                card.style.cursor = 'default';
                card.classList.remove('active');
            });
        }
    });
    
    // Initial call
    window.dispatchEvent(new Event('resize'));
}

/**
 * Initialize page performance optimizations
 */
function initPerformanceOptimizations() {
    // Lazy load images
    const images = document.querySelectorAll('.member-image');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.opacity = '0';
                    img.style.transition = 'opacity 0.3s ease';
                    
                    img.onload = () => {
                        img.style.opacity = '1';
                    };
                    
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

/**
 * Initialize page analytics (if needed)
 */
function initAnalytics() {
    // Track page view
    if (typeof gtag !== 'undefined') {
        gtag('config', 'GA_MEASUREMENT_ID', {
            page_title: 'Board Members - اتحاد البلاد',
            page_location: window.location.href
        });
    }
    
    // Track member card interactions
    const memberCards = document.querySelectorAll('.board-member-card');
    memberCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            const memberName = this.querySelector('.member-name').textContent;
            
            if (typeof gtag !== 'undefined') {
                gtag('event', 'member_card_click', {
                    member_name: memberName,
                    member_position: index + 1
                });
            }
        });
    });
}

// Initialize all features
document.addEventListener('DOMContentLoaded', function() {
    initAccessibilityFeatures();
    initResponsiveFeatures();
    initPerformanceOptimizations();
    initAnalytics();
});

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initBoardMembersPage,
        initScrollAnimations,
        initMemberCardInteractions,
        initStatisticsCounter
    };
}
