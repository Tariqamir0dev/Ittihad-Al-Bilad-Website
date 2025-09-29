/**
 * Dashboard Page JavaScript
 * Handles charts, statistics, and dashboard-specific functionality
 */

class DashboardManager {
    constructor() {
        this.visitorsChart = null;
        this.projectsChart = null;
        this.statsCards = [];
        
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeDashboard());
        } else {
            this.initializeDashboard();
        }
    }

    initializeDashboard() {
        this.initializeCharts();
        this.initializeStats();
        this.initializeActivity();
        this.initializeQuickActions();
        this.animateElements();
    }

    // ===== CHARTS INITIALIZATION =====
    initializeCharts() {
        this.createVisitorsChart();
        this.createProjectsChart();
        this.setupChartResponsiveness();
    }

    createVisitorsChart() {
        const ctx = document.getElementById('visitorsChart');
        if (!ctx) return;

        // Sample data - in real app, this would come from API
        const data = {
            labels: ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
            datasets: [{
                label: 'الزوار',
                data: [1200, 1900, 3000, 5000, 2000, 3000],
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#2563eb',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 6,
                pointHoverRadius: 8
            }]
        };

        const options = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    borderColor: '#2563eb',
                    borderWidth: 1,
                    cornerRadius: 8,
                    displayColors: false,
                    callbacks: {
                        title: function(context) {
                            return context[0].label;
                        },
                        label: function(context) {
                            return `الزوار: ${context.parsed.y.toLocaleString()}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#6b7280',
                        font: {
                            size: 12
                        }
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    },
                    ticks: {
                        color: '#6b7280',
                        font: {
                            size: 12
                        },
                        callback: function(value) {
                            return value.toLocaleString();
                        }
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            }
        };

        this.visitorsChart = new Chart(ctx, {
            type: 'line',
            data: data,
            options: options
        });
    }

    createProjectsChart() {
        const ctx = document.getElementById('projectsChart');
        if (!ctx) return;

        const data = {
            labels: ['مكتملة', 'قيد التنفيذ', 'معلقة', 'ملغية'],
            datasets: [{
                data: [45, 25, 15, 5],
                backgroundColor: [
                    '#10b981',
                    '#f59e0b',
                    '#6b7280',
                    '#ef4444'
                ],
                borderWidth: 0,
                hoverOffset: 4
            }]
        };

        const options = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                        font: {
                            size: 12
                        },
                        color: '#6b7280'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: '#ffffff',
                    bodyColor: '#ffffff',
                    cornerRadius: 8,
                    displayColors: false,
                    callbacks: {
                        title: function(context) {
                            return context[0].label;
                        },
                        label: function(context) {
                            const total = context.dataset.data.reduce((a, b) => a + b, 0);
                            const percentage = ((context.parsed / total) * 100).toFixed(1);
                            return `المشاريع: ${context.parsed} (${percentage}%)`;
                        }
                    }
                }
            }
        };

        this.projectsChart = new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: options
        });
    }

    setupChartResponsiveness() {
        // Handle chart resize on window resize with enhanced mobile support
        window.addEventListener('resize', this.debounce(() => {
            this.handleChartResize();
        }, 250));
        
        // Initial responsive setup
        this.handleChartResize();
    }
    
    handleChartResize() {
        const isMobile = window.innerWidth <= 767;
        const isTablet = window.innerWidth >= 768 && window.innerWidth <= 1023;
        
        // Update chart options based on screen size
        if (isMobile) {
            this.updateChartsForMobile();
        } else if (isTablet) {
            this.updateChartsForTablet();
        } else {
            this.updateChartsForDesktop();
        }
        
        // Resize charts
        this.visitorsChart?.resize();
        this.projectsChart?.resize();
    }
    
    updateChartsForMobile() {
        // Mobile-specific chart configurations
        const mobileOptions = {
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    titleFont: { size: 14 },
                    bodyFont: { size: 13 }
                }
            },
            scales: {
                x: {
                    ticks: {
                        font: { size: 11 },
                        maxRotation: 45,
                        minRotation: 45
                    }
                },
                y: {
                    ticks: {
                        font: { size: 11 },
                        callback: function(value) {
                            if (value >= 1000) {
                                return (value / 1000).toFixed(1) + 'k';
                            }
                            return value;
                        }
                    }
                }
            },
            elements: {
                point: {
                    radius: 4,
                    hoverRadius: 6
                },
                line: {
                    borderWidth: 2
                }
            }
        };
        
        if (this.visitorsChart) {
            this.visitorsChart.options = { ...this.visitorsChart.options, ...mobileOptions };
            this.visitorsChart.update('none');
        }
        
        if (this.projectsChart) {
            this.projectsChart.options = { ...this.projectsChart.options, ...mobileOptions };
            this.projectsChart.update('none');
        }
    }
    
    updateChartsForTablet() {
        // Tablet-specific chart configurations
        const tabletOptions = {
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                        font: { size: 12 }
                    }
                },
                tooltip: {
                    titleFont: { size: 13 },
                    bodyFont: { size: 12 }
                }
            }
        };
        
        if (this.visitorsChart) {
            this.visitorsChart.options = { ...this.visitorsChart.options, ...tabletOptions };
            this.visitorsChart.update('none');
        }
        
        if (this.projectsChart) {
            this.projectsChart.options = { ...this.projectsChart.options, ...tabletOptions };
            this.projectsChart.update('none');
        }
    }
    
    updateChartsForDesktop() {
        // Desktop-specific chart configurations (default)
        const desktopOptions = {
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                        font: { size: 13 }
                    }
                },
                tooltip: {
                    titleFont: { size: 14 },
                    bodyFont: { size: 13 }
                }
            }
        };
        
        if (this.visitorsChart) {
            this.visitorsChart.options = { ...this.visitorsChart.options, ...desktopOptions };
            this.visitorsChart.update('none');
        }
        
        if (this.projectsChart) {
            this.projectsChart.options = { ...this.projectsChart.options, ...desktopOptions };
            this.projectsChart.update('none');
        }
    }

    // ===== STATISTICS =====
    initializeStats() {
        this.animateStats();
        this.setupStatsInteractions();
    }

    animateStats() {
        const statCards = document.querySelectorAll('.stat-card');
        
        // Use Intersection Observer for better performance
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateStatCard(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statCards.forEach(card => observer.observe(card));
    }

    animateStatCard(card) {
        const numberElement = card.querySelector('.stat-number');
        const changeElement = card.querySelector('.stat-change');
        
        if (numberElement) {
            const finalNumber = parseInt(numberElement.textContent.replace(/[^\d]/g, ''));
            this.animateNumber(numberElement, 0, finalNumber, 2000);
        }

        if (changeElement) {
            changeElement.style.opacity = '0';
            changeElement.style.transform = 'translateY(10px)';
            
            setTimeout(() => {
                changeElement.style.transition = 'all 0.5s ease';
                changeElement.style.opacity = '1';
                changeElement.style.transform = 'translateY(0)';
            }, 1000);
        }

        // Add hover effect
        card.style.transition = 'all 0.3s ease';
    }

    animateNumber(element, start, end, duration) {
        const startTime = performance.now();
        const suffix = element.textContent.replace(/[\d]/g, '');
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentNumber = Math.floor(start + (end - start) * easeOutQuart);
            
            element.textContent = currentNumber.toLocaleString() + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    }

    setupStatsInteractions() {
        const statCards = document.querySelectorAll('.stat-card');
        
        statCards.forEach(card => {
            card.addEventListener('click', () => {
                this.handleStatCardClick(card);
            });
        });
    }

    handleStatCardClick(card) {
        // Add click animation
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);

        // Handle specific card actions
        const label = card.querySelector('.stat-label')?.textContent;
        console.log('Stat card clicked:', label);
        
        // Show detailed view or navigate to specific page
        this.showStatDetails(label);
    }

    showStatDetails(label) {
        // This would show a modal or navigate to detailed view
        console.log('Showing details for:', label);
    }

    // ===== ACTIVITY SECTION =====
    initializeActivity() {
        this.setupActivityInteractions();
        this.loadRecentActivity();
    }

    setupActivityInteractions() {
        const activityItems = document.querySelectorAll('.activity-item');
        
        activityItems.forEach(item => {
            item.addEventListener('click', () => {
                this.handleActivityClick(item);
            });
        });
    }

    handleActivityClick(item) {
        const title = item.querySelector('.activity-title')?.textContent;
        console.log('Activity clicked:', title);
        
        // Navigate to relevant page or show details
    }

    loadRecentActivity() {
        // In a real app, this would fetch from API
        // For now, we'll just animate existing items
        const activityItems = document.querySelectorAll('.activity-item');
        
        activityItems.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(20px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.3s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateX(0)';
            }, index * 100);
        });
    }

    // ===== QUICK ACTIONS =====
    initializeQuickActions() {
        const quickActionBtns = document.querySelectorAll('.btn');
        
        quickActionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleQuickAction(e.target);
            });
        });
    }

    handleQuickAction(button) {
        const buttonText = button.textContent.trim();
        
        // Add loading state
        this.setButtonLoading(button, true);
        
        // Simulate API call
        setTimeout(() => {
            this.setButtonLoading(button, false);
            this.showToast(`تم تنفيذ: ${buttonText}`, 'success');
        }, 1500);
    }

    // ===== ANIMATIONS =====
    animateElements() {
        // Animate cards on scroll
        this.animateOnScroll();
        
        // Animate welcome section
        this.animateWelcomeSection();
    }

    animateOnScroll() {
        const elements = document.querySelectorAll('.stat-card, .chart-card, .activity-section');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                }
            });
        }, { threshold: 0.1 });

        elements.forEach(element => observer.observe(element));
    }

    animateWelcomeSection() {
        const welcomeSection = document.querySelector('.welcome-section');
        if (welcomeSection) {
            welcomeSection.style.opacity = '0';
            welcomeSection.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                welcomeSection.style.transition = 'all 0.6s ease';
                welcomeSection.style.opacity = '1';
                welcomeSection.style.transform = 'translateY(0)';
            }, 200);
        }
    }

    // ===== UTILITY METHODS =====
    
    setButtonLoading(button, isLoading = true) {
        if (!button) return;
        
        if (isLoading) {
            button.dataset.originalText = button.innerHTML;
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري التحميل...';
            button.disabled = true;
        } else {
            button.innerHTML = button.dataset.originalText || button.innerHTML;
            button.disabled = false;
        }
    }

    showToast(message, type = 'info', duration = 3000) {
        // Create toast element
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas fa-${this.getToastIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Add styles
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%) translateY(-100px);
            background: ${this.getToastColor(type)};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            transition: all 0.3s ease;
            font-size: 14px;
            font-weight: 500;
            min-width: 300px;
            text-align: center;
        `;
        
        // Add to DOM
        document.body.appendChild(toast);
        
        // Show toast
        setTimeout(() => {
            toast.style.transform = 'translateX(-50%) translateY(0)';
        }, 100);
        
        // Hide and remove toast
        setTimeout(() => {
            toast.style.transform = 'translateX(-50%) translateY(-100px)';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }

    getToastIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    getToastColor(type) {
        const colors = {
            success: '#10b981',
            error: '#ef4444',
            warning: '#f59e0b',
            info: '#2563eb'
        };
        return colors[type] || '#2563eb';
    }

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

    // ===== CHART PERIOD SELECTOR =====
    setupChartPeriodSelector() {
        const periodSelector = document.querySelector('.chart-period');
        if (periodSelector) {
            periodSelector.addEventListener('change', (e) => {
                this.updateChartData(e.target.value);
            });
        }
    }

    updateChartData(period) {
        // Simulate data update based on period
        const data = this.getChartDataForPeriod(period);
        
        if (this.visitorsChart) {
            this.visitorsChart.data.labels = data.labels;
            this.visitorsChart.data.datasets[0].data = data.values;
            this.visitorsChart.update('active');
        }
    }

    getChartDataForPeriod(period) {
        // Sample data for different periods
        const dataSets = {
            '7': {
                labels: ['الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت', 'الأحد'],
                values: [800, 1200, 900, 1500, 1800, 1100, 1400]
            },
            '30': {
                labels: ['الأسبوع 1', 'الأسبوع 2', 'الأسبوع 3', 'الأسبوع 4'],
                values: [8500, 9200, 7800, 9800]
            },
            '90': {
                labels: ['الشهر 1', 'الشهر 2', 'الشهر 3'],
                values: [32000, 35000, 38000]
            }
        };
        
        return dataSets[period] || dataSets['30'];
    }
}

// Initialize dashboard when DOM is ready
const dashboardManager = new DashboardManager();

// Export for use in other modules
window.DashboardManager = DashboardManager;
