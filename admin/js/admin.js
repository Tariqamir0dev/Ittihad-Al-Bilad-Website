/**
 * Admin Dashboard JavaScript
 * Mobile-First Responsive Admin Panel
 */

class AdminDashboard {
    constructor() {
        this.sidebar = null;
        this.sidebarOverlay = null;
        this.mobileMenuBtn = null;
        this.sidebarToggle = null;
        this.searchToggle = null;
        this.searchBox = null;
        this.notificationBtn = null;
        this.notificationDropdown = null;
        this.userMenuBtn = null;
        this.userMenuDropdown = null;
        
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
        } else {
            this.initializeComponents();
        }
    }

    initializeComponents() {
        // Initialize all components
        this.initializeSidebar();
        this.initializeTopbar();
        this.initializeNotifications();
        this.initializeUserMenu();
        this.initializeSearch();
        this.initializeLoading();
        this.initializeAccessibility();
        this.initializeResponsive();
        
        // Hide loading screen
        this.hideLoadingScreen();
    }

    // ===== SIDEBAR FUNCTIONALITY =====
    initializeSidebar() {
        this.sidebar = document.getElementById('sidebar');
        this.sidebarOverlay = document.getElementById('sidebarOverlay');
        this.mobileMenuBtn = document.getElementById('mobileMenuBtn');
        this.sidebarToggle = document.getElementById('sidebarToggle');

        if (this.mobileMenuBtn && this.sidebar) {
            this.mobileMenuBtn.addEventListener('click', () => this.toggleSidebar());
        }

        if (this.sidebarToggle && this.sidebar) {
            this.sidebarToggle.addEventListener('click', () => this.closeSidebar());
        }

        if (this.sidebarOverlay) {
            this.sidebarOverlay.addEventListener('click', () => this.closeSidebar());
        }

        // Close sidebar on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.sidebar?.classList.contains('open')) {
                this.closeSidebar();
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => this.handleResize());
    }

    toggleSidebar() {
        if (!this.sidebar) return;
        
        const isOpen = this.sidebar.classList.contains('open');
        
        if (isOpen) {
            this.closeSidebar();
        } else {
            this.openSidebar();
        }
    }

    openSidebar() {
        if (!this.sidebar || !this.sidebarOverlay) return;
        
        // Add open class to sidebar
        this.sidebar.classList.add('open');
        
        // Show overlay
        this.sidebarOverlay.classList.add('show');
        
        // Update aria attributes
        this.mobileMenuBtn?.setAttribute('aria-expanded', 'true');
        
        // Focus management
        const firstFocusableElement = this.sidebar.querySelector('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
        firstFocusableElement?.focus();
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    closeSidebar() {
        if (!this.sidebar || !this.sidebarOverlay) return;
        
        // Remove open class from sidebar
        this.sidebar.classList.remove('open');
        
        // Hide overlay
        this.sidebarOverlay.classList.remove('show');
        
        // Update aria attributes
        this.mobileMenuBtn?.setAttribute('aria-expanded', 'false');
        
        // Return focus to menu button
        this.mobileMenuBtn?.focus();
        
        // Restore body scroll
        document.body.style.overflow = '';
    }

    handleResize() {
        const isMobile = window.innerWidth <= 767;
        const isTablet = window.innerWidth >= 768 && window.innerWidth <= 1023;
        const isDesktop = window.innerWidth >= 1024;
        
        if (isDesktop || isTablet) {
            // Desktop/Tablet - sidebar always visible, close mobile drawer if open
            if (this.sidebar?.classList.contains('open')) {
                this.sidebar.classList.remove('open');
            }
            if (this.sidebarOverlay?.classList.contains('show')) {
                this.sidebarOverlay.classList.remove('show');
                document.body.style.overflow = '';
            }
            
            // Show search box on desktop/tablet
            if (this.searchBox) {
                this.searchBox.style.display = 'flex';
            }
            if (this.searchToggle) {
                this.searchToggle.style.display = 'none';
            }
            
        } else if (isMobile) {
            // Mobile - use drawer system
            // Hide search box on mobile, show toggle
            if (this.searchBox) {
                this.searchBox.style.display = 'none';
            }
            if (this.searchToggle) {
                this.searchToggle.style.display = 'flex';
            }
        }
        
        // Trigger resize event for charts and other components
        window.dispatchEvent(new Event('resize'));
    }

    // ===== TOPBAR FUNCTIONALITY =====
    initializeTopbar() {
        // Initialize any topbar-specific functionality
        this.initializeBreadcrumbs();
    }

    initializeBreadcrumbs() {
        // Update breadcrumbs based on current page
        const currentPage = window.location.pathname.split('/').pop();
        const breadcrumbActive = document.querySelector('.breadcrumb-item.active');
        
        if (breadcrumbActive && currentPage) {
        const pageNames = {
            'index.html': 'الرئيسية',
            'content.html': 'إدارة المحتوى',
            'projects.html': 'المشاريع',
            'companies.html': 'الشركات',
            'media.html': 'الوسائط',
            'users.html': 'المستخدمين',
            'analytics.html': 'التحليلات',
            'settings.html': 'الإعدادات'
        };
            
            breadcrumbActive.textContent = pageNames[currentPage] || 'لوحة التحكم';
        }
    }

    // ===== SEARCH FUNCTIONALITY =====
    initializeSearch() {
        this.searchToggle = document.getElementById('searchToggle');
        this.searchBox = document.getElementById('searchBox');
        const searchInput = this.searchBox?.querySelector('.search-input');

        if (this.searchToggle && this.searchBox) {
            this.searchToggle.addEventListener('click', () => this.toggleSearch());
        }

        if (searchInput) {
            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.closeSearch();
                }
            });

            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }

        // Close search when clicking outside
        document.addEventListener('click', (e) => {
            if (this.searchBox?.classList.contains('active') && 
                !this.searchBox.contains(e.target) && 
                !this.searchToggle?.contains(e.target)) {
                this.closeSearch();
            }
        });
    }

    toggleSearch() {
        if (!this.searchBox) return;
        
        const isActive = this.searchBox.classList.contains('active');
        
        if (isActive) {
            this.closeSearch();
        } else {
            this.openSearch();
        }
    }

    openSearch() {
        if (!this.searchBox) return;
        
        this.searchBox.classList.add('active');
        
        // Focus search input
        const searchInput = this.searchBox.querySelector('.search-input');
        searchInput?.focus();
        
        // Update aria attributes
        this.searchToggle?.setAttribute('aria-expanded', 'true');
    }

    closeSearch() {
        if (!this.searchBox) return;
        
        this.searchBox.classList.remove('active');
        
        // Clear search input
        const searchInput = this.searchBox.querySelector('.search-input');
        if (searchInput) {
            searchInput.value = '';
        }
        
        // Update aria attributes
        this.searchToggle?.setAttribute('aria-expanded', 'false');
    }

    handleSearch(query) {
        // Implement search functionality
        console.log('Search query:', query);
        
        // This would typically make an API call or filter local data
        // For now, we'll just log the query
    }

    // ===== NOTIFICATIONS FUNCTIONALITY =====
    initializeNotifications() {
        this.notificationBtn = document.getElementById('notificationBtn');
        this.notificationDropdown = document.getElementById('notificationDropdown');

        if (this.notificationBtn && this.notificationDropdown) {
            this.notificationBtn.addEventListener('click', () => this.toggleNotifications());
        }

        // Close notifications when clicking outside
        document.addEventListener('click', (e) => {
            if (this.notificationDropdown?.classList.contains('active') && 
                !this.notificationDropdown.contains(e.target) && 
                !this.notificationBtn?.contains(e.target)) {
                this.closeNotifications();
            }
        });

        // Mark all as read functionality
        const markAllReadBtn = this.notificationDropdown?.querySelector('.mark-all-read');
        if (markAllReadBtn) {
            markAllReadBtn.addEventListener('click', () => this.markAllNotificationsRead());
        }

        // Individual notification click handlers
        const notificationItems = this.notificationDropdown?.querySelectorAll('.notification-item');
        notificationItems?.forEach(item => {
            item.addEventListener('click', () => this.handleNotificationClick(item));
        });
    }

    toggleNotifications() {
        if (!this.notificationDropdown) return;
        
        const isActive = this.notificationDropdown.classList.contains('active');
        
        if (isActive) {
            this.closeNotifications();
        } else {
            this.openNotifications();
        }
    }

    openNotifications() {
        if (!this.notificationDropdown) return;
        
        this.notificationDropdown.classList.add('active');
        
        // Update aria attributes
        this.notificationBtn?.setAttribute('aria-expanded', 'true');
    }

    closeNotifications() {
        if (!this.notificationDropdown) return;
        
        this.notificationDropdown.classList.remove('active');
        
        // Update aria attributes
        this.notificationBtn?.setAttribute('aria-expanded', 'false');
    }

    markAllNotificationsRead() {
        const unreadItems = this.notificationDropdown?.querySelectorAll('.notification-item.unread');
        unreadItems?.forEach(item => {
            item.classList.remove('unread');
        });

        // Update notification badge
        const badge = this.notificationBtn?.querySelector('.notification-badge');
        if (badge) {
            badge.textContent = '0';
            badge.style.display = 'none';
        }

        // Close dropdown
        this.closeNotifications();
    }

    handleNotificationClick(notificationItem) {
        // Mark as read
        notificationItem.classList.remove('unread');
        
        // Update notification count
        this.updateNotificationCount();
        
        // Handle notification-specific actions
        const title = notificationItem.querySelector('.notification-title')?.textContent;
        console.log('Notification clicked:', title);
    }

    updateNotificationCount() {
        const unreadItems = this.notificationDropdown?.querySelectorAll('.notification-item.unread');
        const badge = this.notificationBtn?.querySelector('.notification-badge');
        
        if (badge && unreadItems) {
            const count = unreadItems.length;
            badge.textContent = count;
            badge.style.display = count > 0 ? 'flex' : 'none';
        }
    }

    // ===== USER MENU FUNCTIONALITY =====
    initializeUserMenu() {
        this.userMenuBtn = document.getElementById('userMenuBtn');
        this.userMenuDropdown = document.getElementById('userMenuDropdown');

        if (this.userMenuBtn && this.userMenuDropdown) {
            this.userMenuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleUserMenu();
            });
        }

        // Create overlay if it doesn't exist
        this.createUserMenuOverlay();

        // Close user menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.userMenuDropdown?.classList.contains('open') && 
                !this.userMenuDropdown.contains(e.target) && 
                !this.userMenuBtn?.contains(e.target)) {
                this.closeUserMenu();
            }
        });

        // Close sidebar when clicking outside
        document.addEventListener('click', (e) => {
            if (this.sidebar?.classList.contains('open') && 
                !this.sidebar.contains(e.target) && 
                !this.mobileMenuBtn?.contains(e.target)) {
                this.closeSidebar();
            }
        });

        // Close user menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.userMenuDropdown?.classList.contains('open')) {
                this.closeUserMenu();
            }
        });

        // Close sidebar on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.sidebar?.classList.contains('open')) {
                this.closeSidebar();
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => this.handleUserMenuResize());
    }

    toggleUserMenu() {
        if (!this.userMenuDropdown) return;
        
        const isOpen = this.userMenuDropdown.classList.contains('open');
        
        if (isOpen) {
            this.closeUserMenu();
        } else {
            this.openUserMenu();
        }
    }

    openUserMenu() {
        if (!this.userMenuDropdown) return;
        
        // Adjust position based on screen size
        this.adjustUserMenuPosition();
        
        // Add open class
        this.userMenuDropdown.classList.add('open');
        
        // Show overlay on mobile
        if (window.innerWidth <= 767) {
            this.showUserMenuOverlay();
        }
        
        // Update aria attributes
        this.userMenuBtn?.setAttribute('aria-expanded', 'true');
        
        // Focus first menu item
        const firstMenuItem = this.userMenuDropdown.querySelector('.user-menu-item');
        firstMenuItem?.focus();
    }

    closeUserMenu() {
        if (!this.userMenuDropdown) return;
        
        // Remove open class
        this.userMenuDropdown.classList.remove('open');
        
        // Hide overlay
        this.hideUserMenuOverlay();
        
        // Update aria attributes
        this.userMenuBtn?.setAttribute('aria-expanded', 'false');
        
        // Return focus to button
        this.userMenuBtn?.focus();
    }

    createUserMenuOverlay() {
        // Check if overlay already exists
        if (document.getElementById('userMenuOverlay')) return;
        
        // Create overlay element
        const overlay = document.createElement('div');
        overlay.id = 'userMenuOverlay';
        overlay.className = 'user-menu-overlay';
        
        // Add click handler to close menu
        overlay.addEventListener('click', () => this.closeUserMenu());
        
        // Append to body
        document.body.appendChild(overlay);
    }

    showUserMenuOverlay() {
        const overlay = document.getElementById('userMenuOverlay');
        if (overlay) {
            overlay.classList.add('show');
        }
    }

    hideUserMenuOverlay() {
        const overlay = document.getElementById('userMenuOverlay');
        if (overlay) {
            overlay.classList.remove('show');
        }
    }

    handleUserMenuResize() {
        // Close user menu on resize
        if (this.userMenuDropdown?.classList.contains('open')) {
            this.closeUserMenu();
        }
        
        // Adjust position after resize
        this.adjustUserMenuPosition();
    }

    adjustUserMenuPosition() {
        if (!this.userMenuDropdown || !this.userMenuBtn) return;
        
        const isMobile = window.innerWidth <= 767;
        const isTablet = window.innerWidth >= 768 && window.innerWidth <= 1023;
        
        if (isMobile) {
            // On mobile, use fixed positioning
            this.userMenuDropdown.style.position = 'fixed';
            this.userMenuDropdown.style.top = '56px';
            this.userMenuDropdown.style.right = '16px';
            this.userMenuDropdown.style.left = '16px';
            this.userMenuDropdown.style.width = 'auto';
            this.userMenuDropdown.style.maxWidth = 'none';
            this.userMenuDropdown.style.transformOrigin = 'top center';
        } else {
            // On desktop/tablet, use absolute positioning
            this.userMenuDropdown.style.position = 'absolute';
            this.userMenuDropdown.style.top = 'calc(100% + 8px)';
            this.userMenuDropdown.style.right = '12px';
            this.userMenuDropdown.style.left = 'auto';
            this.userMenuDropdown.style.width = 'auto';
            this.userMenuDropdown.style.maxWidth = '92vw';
            this.userMenuDropdown.style.transformOrigin = 'top right';
        }
    }

    // ===== LOADING SCREEN =====
    initializeLoading() {
        // Loading screen is handled in CSS and will be hidden by hideLoadingScreen()
    }

    hideLoadingScreen() {
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            // Add a small delay for better UX
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                // Remove from DOM after animation
                setTimeout(() => {
                    loadingScreen.remove();
                }, 300);
            }, 500);
        }
    }

    // ===== ACCESSIBILITY =====
    initializeAccessibility() {
        // Skip to main content link
        this.initializeSkipLinks();
        
        // Keyboard navigation
        this.initializeKeyboardNavigation();
        
        // Focus management
        this.initializeFocusManagement();
    }

    initializeSkipLinks() {
        const skipLinks = document.querySelectorAll('.skip-link');
        skipLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.focus();
                    target.scrollIntoView();
                }
            });
        });
    }

    initializeKeyboardNavigation() {
        // Handle keyboard navigation for dropdowns and menus
        document.addEventListener('keydown', (e) => {
            // Handle arrow keys for navigation menus
            if (e.target.closest('.nav-menu')) {
                this.handleMenuKeyboardNavigation(e);
            }
            
            // Handle escape key to close modals/dropdowns
            if (e.key === 'Escape') {
                this.closeAllDropdowns();
            }
        });
    }

    handleMenuKeyboardNavigation(e) {
        const menuItems = Array.from(document.querySelectorAll('.nav-link'));
        const currentIndex = menuItems.indexOf(e.target);
        
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                const nextIndex = (currentIndex + 1) % menuItems.length;
                menuItems[nextIndex]?.focus();
                break;
            case 'ArrowUp':
                e.preventDefault();
                const prevIndex = currentIndex === 0 ? menuItems.length - 1 : currentIndex - 1;
                menuItems[prevIndex]?.focus();
                break;
        }
    }

    initializeFocusManagement() {
        // Ensure focus is visible and properly managed
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }

    closeAllDropdowns() {
        this.closeNotifications();
        this.closeUserMenu();
        this.closeSearch();
        this.closeSidebar();
    }

    // ===== RESPONSIVE FUNCTIONALITY =====
    initializeResponsive() {
        // Handle responsive breakpoints
        this.handleResponsiveChanges();
        
        // Optimize for mobile performance
        this.optimizeForMobile();
    }

    handleResponsiveChanges() {
        let currentBreakpoint = this.getCurrentBreakpoint();
        
        window.addEventListener('resize', () => {
            const newBreakpoint = this.getCurrentBreakpoint();
            
            if (newBreakpoint !== currentBreakpoint) {
                currentBreakpoint = newBreakpoint;
                this.onBreakpointChange(newBreakpoint);
            }
        });
    }

    getCurrentBreakpoint() {
        const width = window.innerWidth;
        if (width < 768) return 'mobile';
        if (width < 1024) return 'tablet';
        if (width < 1280) return 'desktop';
        return 'large';
    }

    onBreakpointChange(breakpoint) {
        console.log('Breakpoint changed to:', breakpoint);
        
        // Close mobile sidebar when switching to desktop
        if (breakpoint !== 'mobile' && this.sidebar?.classList.contains('open')) {
            this.closeSidebar();
        }
        
        // Adjust chart sizes and layouts
        this.adjustLayoutForBreakpoint(breakpoint);
    }

    adjustLayoutForBreakpoint(breakpoint) {
        // This would adjust chart sizes, grid layouts, etc.
        // based on the current breakpoint
    }

    optimizeForMobile() {
        // Reduce animations on mobile for better performance
        if (window.innerWidth < 768) {
            document.body.classList.add('mobile-optimized');
        }
    }

    // ===== UTILITY METHODS =====
    
    // Show toast notification
    showToast(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        
        // Add to DOM
        document.body.appendChild(toast);
        
        // Show toast
        setTimeout(() => toast.classList.add('show'), 100);
        
        // Hide and remove toast
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }

    // Show loading state for buttons
    setButtonLoading(button, isLoading = true) {
        if (!button) return;
        
        if (isLoading) {
            button.dataset.originalText = button.textContent;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحميل...';
            button.disabled = true;
        } else {
            button.textContent = button.dataset.originalText || button.textContent;
            button.disabled = false;
        }
    }

    // Format numbers for display
    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }

    // Debounce function for search and resize events
    debounce(func, wait) {
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
}

// Initialize the admin dashboard when DOM is ready
const adminDashboard = new AdminDashboard();

// Export for use in other modules
window.AdminDashboard = AdminDashboard;
