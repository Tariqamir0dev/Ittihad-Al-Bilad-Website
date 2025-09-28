/**
 * Ittihad Al-Bilad Corporate Website
 * Main JavaScript File
 * Features: Mobile Navigation, Carousels, Animations, Statistics Counter
 */

document.addEventListener('DOMContentLoaded', function() {
    // ===== INITIALIZE ALL FEATURES =====
    initMobileNavigation();
    initHeaderScrollEffect();
    initCarousels();
    initCompaniesShowcase();
    initStatisticsCounter();
    initScrollAnimations();
    initLazyLoading();
    initMediaCenter();
    initProjectsData();
    initAccessibility();
    initFooterInteractions();
    
    // ===== MOBILE NAVIGATION =====
    function initMobileNavigation() {
        const mobileToggle = document.querySelector('.mobile-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
        
        if (mobileToggle && navMenu) {
            mobileToggle.addEventListener('click', function() {
                const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
                
                mobileToggle.setAttribute('aria-expanded', !isExpanded);
                navMenu.classList.toggle('open');
                document.body.style.overflow = !isExpanded ? 'hidden' : '';
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!mobileToggle.contains(e.target) && !navMenu.contains(e.target)) {
                    mobileToggle.setAttribute('aria-expanded', 'false');
                    navMenu.classList.remove('open');
                    document.body.style.overflow = '';
                }
            });
            
            // Close menu on escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && navMenu.classList.contains('open')) {
                    mobileToggle.setAttribute('aria-expanded', 'false');
                    navMenu.classList.remove('open');
                    document.body.style.overflow = '';
                    mobileToggle.focus();
                }
            });
        }
        
        // Mobile dropdown functionality
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                const dropdown = this.closest('.dropdown');
                const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                const isOpen = dropdown.classList.contains('open');
                
                // Close all other dropdowns
                document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('open'));
                
                if (!isOpen) {
                    dropdown.classList.add('open');
                    this.setAttribute('aria-expanded', 'true');
                } else {
                    dropdown.classList.remove('open');
                    this.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }
    
    // ===== HEADER SCROLL EFFECT =====
    function initHeaderScrollEffect() {
        const header = document.querySelector('.header');
        let lastScrollY = window.scrollY;
        let ticking = false;
        
        function updateHeader() {
            const scrollY = window.scrollY;
            
            if (scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            lastScrollY = scrollY;
            ticking = false;
        }
        
        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        }
        
        window.addEventListener('scroll', requestTick, { passive: true });
    }
    
    // ===== CAROUSEL INITIALIZATION =====
    function initCarousels() {
        // Companies section now uses grid layout - no swiper needed
        
        // Projects Gallery Swiper
        const projectsSwiper = new Swiper('.projects-swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.projects-nav-next',
                prevEl: '.projects-nav-prev',
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
                1400: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                }
            },
            a11y: {
                prevSlideMessage: 'المشروع السابق',
                nextSlideMessage: 'المشروع التالي',
            }
        });
        
        // Media Blog Swiper
        const mediaSwiper = new Swiper('.media-swiper', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            navigation: {
                prevEl: '.media-nav-prev',
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 3,
                    spaceBetween: 25,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
                1400: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                }
            },
            a11y: {
                prevSlideMessage: 'المقال السابق',
                nextSlideMessage: 'المقال التالي',
            }
        });
        
        // Clients Carousel
        const clientsSwiper = new Swiper('.clients-swiper', {
            slidesPerView: 2,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            breakpoints: {
                640: {
                    slidesPerView: 3,
                },
                768: {
                    slidesPerView: 4,
                },
                1024: {
                    slidesPerView: 5,
                },
                1400: {
                    slidesPerView: 6,
                }
            },
            a11y: {
                prevSlideMessage: 'العميل السابق',
                nextSlideMessage: 'العميل التالي',
            }
        });
    }
    
    // ===== COMPANIES SHOWCASE =====
    function initCompaniesShowcase() {
        const companiesData = {
            'ittihad-group': {
                name: 'اتحاد جروب',
                description: 'شركة رائدة في مجال الاستثمار والتطوير، تقدم حلولاً متكاملة للمشاريع الاستراتيجية والاستثمارات طويلة المدى مع التركيز على الابتكار والجودة.',
                image: 'images/atihad group.jpeg',
                link: 'companies.html#ittihad-group'
            },
            'ittihad-contracting': {
                name: 'اتحاد البلاد للمقاولات',
                description: 'متخصصة في المقاولات العامة والإنشاءات، تنفذ مشاريع البنية التحتية والمباني السكنية والتجارية بأعلى معايير الجودة والسلامة.',
                image: 'images/atthad albilad cpmtractic .jpeg',
                link: 'companies.html#ittihad-contracting'
            },
            'ittihad-maintenance': {
                name: 'اتحاد البلاد للصيانة',
                description: 'تقدم خدمات الصيانة الشاملة للمباني والمرافق، مع فريق متخصص يضمن استمرارية العمل وأعلى مستويات الأداء والكفاءة.',
                image: 'images/etthad albilad mintenance.jpeg',
                link: 'companies.html#ittihad-maintenance'
            },
            'maayeer-roads': {
                name: 'معايير الطرق',
                description: 'شركة متخصصة في إنشاء وتطوير الطرق والبنية التحتية، تطبق أحدث التقنيات والمعايير العالمية في مشاريع النقل والمواصلات.',
                image: 'images/maayeer alturuq.jpeg',
                link: 'companies.html#maayeer-roads'
            },
            'suhul-shipping': {
                name: 'سهول التجاه للشحن',
                description: 'تقدم خدمات الشحن واللوجستيات المتكاملة، مع شبكة واسعة من الخدمات التي تغطي جميع احتياجات النقل والتوزيع المحلي والدولي.',
                image: 'images/suhul alttijah for shipping .jpeg',
                link: 'companies.html#suhul-shipping'
            }
        };

        const logoCards = document.querySelectorAll('.company-logo-card');
        const detailsPanel = document.getElementById('companyDetailsPanel');
        const companyName = document.getElementById('companyName');
        const companyDescription = document.getElementById('companyDescription');
        const companyImage = document.getElementById('companyImage');
        const learnMoreBtn = document.getElementById('learnMoreBtn');
        if (!logoCards.length || !detailsPanel) return;

        let currentActiveCard = logoCards[0]; // Set first card as initially active

        // Handle logo card clicks
        logoCards.forEach(card => {
            card.addEventListener('click', function() {
                const companyId = this.getAttribute('data-company');
                const companyData = companiesData[companyId];
                
                if (!companyData) return;

                // Remove active class from all cards
                logoCards.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked card
                this.classList.add('active');
                currentActiveCard = this;

                // Update details panel content
                companyName.textContent = companyData.name;
                companyDescription.textContent = companyData.description;
                companyImage.src = companyData.image;
                companyImage.alt = companyData.name;
                learnMoreBtn.href = companyData.link;

                // Set data attribute for specific styling
                detailsPanel.setAttribute('data-company', companyId);

                // Show details panel with animation
                detailsPanel.classList.add('show');

                // Smooth scroll to details panel
                setTimeout(() => {
                    detailsPanel.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                }, 200);
            });

            // Add hover effects
            card.addEventListener('mouseenter', function() {
                if (!this.classList.contains('active')) {
                    this.style.transform = 'translateY(-4px) scale(1.01)';
                }
            });

            card.addEventListener('mouseleave', function() {
                if (!this.classList.contains('active')) {
                    this.style.transform = '';
                }
            });
        });


        // Auto-show first company details on page load
        if (logoCards.length > 0) {
            const firstCard = logoCards[0];
            const firstCompanyId = firstCard.getAttribute('data-company');
            const firstCompanyData = companiesData[firstCompanyId];
            
            if (firstCompanyData) {
                // Set first card as active
                firstCard.classList.add('active');
                currentActiveCard = firstCard;

                // Update details panel content
                companyName.textContent = firstCompanyData.name;
                companyDescription.textContent = firstCompanyData.description;
                companyImage.src = firstCompanyData.image;
                companyImage.alt = firstCompanyData.name;
                learnMoreBtn.href = firstCompanyData.link;

                // Set data attribute for specific styling
                detailsPanel.setAttribute('data-company', firstCompanyId);

                // Show details panel immediately
                detailsPanel.classList.add('show');
            }
        }
    }
    
    // ===== ENHANCED ACHIEVEMENTS COUNTER ANIMATION =====
    function initStatisticsCounter() {
        const achievementCards = document.querySelectorAll('.achievement-card');
        let hasAnimated = false;
        
        function animateCounter(card) {
            const target = parseInt(card.dataset.target);
            const suffix = card.dataset.suffix || '';
            const numberElement = card.querySelector('.achievement-number');
            const duration = 2000; // 2 seconds
            const steps = 60;
            const increment = target / steps;
            const stepDuration = duration / steps;
            
            // Add counting animation class
            numberElement.classList.add('counting');
            
            let current = 0;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                    
                    // Remove counting class after animation
                    setTimeout(() => {
                        numberElement.classList.remove('counting');
                    }, 300);
                }
                
                // Update number with proper formatting
                const displayNumber = Math.floor(current);
                const existingPlus = numberElement.querySelector('.plus-sign');
                if (existingPlus) {
                    numberElement.innerHTML = displayNumber + '<span class="plus-sign">' + suffix + '</span>';
                } else {
                    numberElement.textContent = displayNumber + suffix;
                }
            }, stepDuration);
        }
        
        // Enhanced Intersection Observer for counter animation
        const achievementsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    hasAnimated = true;
                    
                    // Add entrance animation to each achievement card
                    achievementCards.forEach((card, index) => {
                        // Initial state
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(50px) scale(0.8)';
                        
                        // Animate entrance
                        setTimeout(() => {
                            card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0) scale(1)';
                            card.classList.add('animate-in');
                            
                            // Start counter animation after entrance
                            setTimeout(() => {
                                animateCounter(card);
                            }, 300);
                        }, index * 150);
                    });
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        });
        
        if (achievementCards.length > 0) {
            achievementsObserver.observe(document.querySelector('.achievements-section'));
        }
        
        // Add enhanced hover effects for achievement cards
        achievementCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                const numberElement = this.querySelector('.achievement-number');
                const icon = this.querySelector('.achievement-icon');
                
                // Add hover animation
                if (numberElement) {
                    numberElement.style.transform = 'scale(1.05)';
                }
                if (icon) {
                    icon.style.transform = 'scale(1.1)';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                const numberElement = this.querySelector('.achievement-number');
                const icon = this.querySelector('.achievement-icon');
                
                // Reset hover animation
                if (numberElement) {
                    numberElement.style.transform = 'scale(1)';
                }
                if (icon) {
                    icon.style.transform = 'scale(1)';
                }
            });
        });
    }
    
    // ===== SCROLL ANIMATIONS =====
    function initScrollAnimations() {
        const animateElements = document.querySelectorAll('.section-title, .about-description, .project-card, .article-card, .footer-section');
        
        const scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animateElements.forEach(element => {
            element.classList.add('animate-on-scroll');
            scrollObserver.observe(element);
        });
        
        // Parallax effect for hero section
        const hero = document.querySelector('.hero-image');
        if (hero) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const parallax = scrolled * 0.3;
                hero.style.transform = `translateY(${parallax}px)`;
            });
        }
    }
    
    // ===== LAZY LOADING =====
    function initLazyLoading() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
    
    // ===== MEDIA CENTER DATA =====
    function initMediaCenter() {
        const mediaContainer = document.getElementById('media-articles');
        
        // Professional blog articles data - Updated with proper links to article-detail.html
        const articles = [
            {
                id: 1,
                title: "إطلاق مشروع رؤية 2030 الجديد",
                excerpt: "نفخر بالإعلان عن إطلاق مشروعنا الجديد الذي يساهم في تحقيق رؤية المملكة 2030 من خلال تقديم حلول مبتكرة في مجال الفعاليات والإنتاج الإعلامي",
                image: "images/article1.jpg",
                date: "2025-01-15",
                author: "فريق التحرير",
                category: "أخبار الشركة",
                link: "article-detail.html?id=1"
            },
            {
                id: 2,
                title: "نجاح فعالية الرياض الكبرى",
                excerpt: "حققت فعالية الرياض الكبرى التي نظمناها نجاحاً باهراً بحضور أكثر من 50 ألف زائر ومشاركة 200+ شركة رائدة في مختلف القطاعات",
                image: "images/article1.jpg",
                date: "2025-01-10",
                author: "إدارة الفعاليات",
                category: "الفعاليات",
                link: "article-detail.html?id=2"
            },
            {
                id: 3,
                title: "شراكة استراتيجية جديدة",
                excerpt: "توقيع اتفاقية شراكة استراتيجية مع كبرى الشركات السعودية لتطوير قطاع الفعاليات والإنتاج الإعلامي في المملكة",
                image: "images/article1.jpg",
                date: "2025-01-05",
                author: "إدارة التطوير",
                category: "الشراكات",
                link: "article-detail.html?id=3"
            },
            {
                id: 4,
                title: "جائزة أفضل شركة فعاليات",
                excerpt: "حصلنا على جائزة أفضل شركة فعاليات في المملكة للعام الثالث على التوالي، مما يؤكد ريادتنا في هذا المجال",
                image: "images/article1.jpg",
                date: "2024-12-25",
                author: "العلاقات العامة",
                category: "الجوائز",
                link: "article-detail.html?id=4"
            },
            {
                id: 5,
                title: "تقنيات الذكاء الاصطناعي في الفعاليات",
                excerpt: "استخدام أحدث تقنيات الذكاء الاصطناعي لتحسين تجربة الزوار في الفعاليات وتقديم خدمات أكثر تطوراً",
                image: "images/article1.jpg",
                date: "2024-12-20",
                author: "قسم التقنية",
                category: "التكنولوجيا",
                link: "article-detail.html?id=5"
            },
            {
                id: 6,
                title: "مؤتمر الابتكار السعودي 2025",
                excerpt: "تنظيم مؤتمر الابتكار السعودي الذي يجمع أبرز الخبراء والمختصين في مجال التكنولوجيا والابتكار",
                image: "images/article1.jpg",
                date: "2024-12-15",
                author: "فريق المؤتمرات",
                category: "المؤتمرات",
                link: "article-detail.html?id=6"
            },
            {
                id: 7,
                title: "برنامج التدريب المهني",
                excerpt: "إطلاق برنامج تدريبي شامل لتأهيل الكوادر الوطنية في مجال إدارة الفعاليات والإنتاج الإعلامي",
                image: "images/article1.jpg",
                date: "2024-12-10",
                author: "إدارة الموارد البشرية",
                category: "التدريب",
                link: "article-detail.html?id=7"
            },
            {
                id: 8,
                title: "الاستدامة في تنظيم الفعاليات",
                excerpt: "مبادرات جديدة لتحقيق الاستدامة البيئية في جميع فعالياتنا ومشاريعنا لبناء مستقبل أكثر استدامة",
                image: "images/article1.jpg",
                date: "2024-12-05",
                author: "قسم الاستدامة",
                category: "الاستدامة",
                link: "article-detail.html?id=8"
            },
            {
                id: 9,
                title: "توسعة الأعمال في المنطقة الشرقية",
                excerpt: "افتتاح مكتب جديد في المنطقة الشرقية لخدمة عملائنا بشكل أفضل وتوسيع نطاق خدماتنا",
                image: "images/article1.jpg",
                date: "2024-11-30",
                author: "إدارة التوسع",
                category: "التوسع",
                link: "article-detail.html?id=9"
            },
            {
                id: 10,
                title: "مهرجان الثقافة والفنون",
                excerpt: "تنظيم مهرجان الثقافة والفنون السعودية بمشاركة أكثر من 200 فنان ومبدع من مختلف مناطق المملكة",
                image: "images/article1.jpg",
                date: "2024-11-25",
                author: "قسم الفعاليات الثقافية",
                category: "الثقافة",
                link: "article-detail.html?id=10"
            },
            {
                id: 11,
                title: "تطوير منصة الفعاليات الرقمية",
                excerpt: "إطلاق منصة رقمية متطورة لإدارة وتنظيم الفعاليات الافتراضية والمدمجة باستخدام أحدث التقنيات",
                image: "images/article1.jpg",
                date: "2024-11-20",
                author: "فريق التطوير الرقمي",
                category: "الرقمنة",
                link: "article-detail.html?id=11"
            },
            {
                id: 12,
                title: "شهادة الجودة العالمية",
                excerpt: "حصولنا على شهادة الجودة العالمية ISO في إدارة وتنظيم الفعاليات، مما يؤكد التزامنا بأعلى المعايير",
                image: "images/article1.jpg",
                date: "2024-11-15",
                author: "إدارة الجودة",
                category: "الجودة",
                link: "article-detail.html?id=12"
            }
        ];
        
        if (mediaContainer) {
            articles.forEach(article => {
                const slide = document.createElement('div');
                slide.className = 'swiper-slide';
                
                const formattedDate = new Date(article.date).toLocaleDateString('ar-SA', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                
                slide.innerHTML = `
                    <article class="article-card">
                        <img src="${article.image}" alt="${article.title}" class="article-image" loading="lazy">
                        <div class="article-content">
                            <div class="article-header">
                                <span class="article-category">${article.category}</span>
                                <h3 class="article-title">${article.title}</h3>
                                <p class="article-excerpt">${article.excerpt}</p>
                            </div>
                            <div class="article-meta">
                                <div class="article-date">
                                    <i class="fas fa-calendar-alt" aria-hidden="true"></i>
                                    <span>${formattedDate}</span>
                                </div>
                                <div class="article-author">
                                    <i class="fas fa-user" aria-hidden="true"></i>
                                    <span>${article.author}</span>
                                </div>
                            </div>
                            <a href="${article.link}" class="article-read-more" aria-label="قراءة المقال: ${article.title}">
                                <span>قراءة المقال</span>
                                <i class="fas fa-arrow-left" aria-hidden="true"></i>
                            </a>
                        </div>
                    </article>
                `;
                
                mediaContainer.appendChild(slide);
            });
        }
        
        // Initialize blog card interactions
        initBlogCardInteractions();
    }
    
    // ===== BLOG CARD INTERACTIONS =====
    function initBlogCardInteractions() {
        const blogCards = document.querySelectorAll('.article-card');
        
        blogCards.forEach(card => {
            // Handle keyboard navigation
            card.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const link = this.querySelector('.article-read-more');
                    if (link) {
                        link.click();
                    }
                }
            });
            
            // Handle focus/blur for accessibility
            card.addEventListener('focus', function() {
                this.classList.add('focused');
            });
            
            card.addEventListener('blur', function() {
                this.classList.remove('focused');
            });
        });
    }
    
    // ===== PROJECTS GALLERY DATA =====
    function initProjectsData() {
        const projectsGrid = document.getElementById('projects-grid');
        
        // Projects data
        const projects = [
            {
                title: "مشروع الفعاليات الكبرى",
                description: "تنظيم وإدارة أكبر الفعاليات في المملكة مع حضور أكثر من 50 ألف زائر ومشاركة 200+ شركة رائدة في مختلف القطاعات",
                image: "images/project1.jpg",
                link: "project-detail.html"
            },
            {
                title: "مؤتمر الابتكار التقني",
                description: "مؤتمر متخصص في التقنيات الحديثة والابتكار يجمع أبرز الخبراء والمختصين في مجال التكنولوجيا والذكاء الاصطناعي",
                image: "images/project1.jpg",
                link: "project-detail.html"
            },
            {
                title: "معرض التراث السعودي",
                description: "معرض يسلط الضوء على التراث والثقافة السعودية الأصيلة بمشاركة أكثر من 150 فنان ومبدع من مختلف مناطق المملكة",
                image: "images/project1.jpg",
                link: "project-detail.html"
            }
        ];
        
        // Initialize projects grid
        if (projectsGrid) {
            projects.forEach(project => {
                const card = document.createElement('div');
                card.className = 'project-card';
                
                card.innerHTML = `
                    <img src="${project.image}" alt="${project.title}" class="project-image" loading="lazy">
                    <div class="project-content">
                        <h3 class="project-title">${project.title}</h3>
                        <p class="project-description">${project.description}</p>
                        <a href="${project.link}" class="project-link">تفاصيل المشروع</a>
                    </div>
                `;
                
                projectsGrid.appendChild(card);
            });
        }
    }
    
    // ===== END OF PROJECTS SECTION =====
    
    // ===== ACCESSIBILITY FEATURES =====
    function initAccessibility() {
        // Skip links
        const skipLinks = document.querySelectorAll('.skip-link');
        skipLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.focus();
                    target.scrollIntoView();
                }
            });
        });
        
        // Language switcher
        const langButtons = document.querySelectorAll('.lang-btn');
        langButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const lang = this.dataset.lang;
                
                // Update active state
                langButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                // Update document attributes
                if (lang === 'en') {
                    document.documentElement.lang = 'en';
                    document.documentElement.dir = 'ltr';
                } else {
                    document.documentElement.lang = 'ar';
                    document.documentElement.dir = 'rtl';
                }
                
                // Announce language change to screen readers
                const announcement = lang === 'en' ? 'Language changed to English' : 'تم تغيير اللغة إلى العربية';
                announceToScreenReader(announcement);
            });
        });
        
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // ===== UTILITY FUNCTIONS =====
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
    
    // ===== PERFORMANCE OPTIMIZATIONS =====
    
    // Throttle scroll events
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
    
    // Debounce resize events
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
    
    
    // ===== PRELOADER (OPTIONAL) =====
    function initPreloader() {
        const preloader = document.createElement('div');
        preloader.id = 'preloader';
        preloader.innerHTML = `
            <div class="preloader-content">
                <div class="preloader-logo">
                    <img src="images/logo-placeholder.png" alt="اتحاد البلاد">
                </div>
                <div class="loading-spinner"></div>
            </div>
        `;
        
        const preloaderStyles = `
            <style>
                #preloader {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: white;
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                }
                .preloader-content {
                    text-align: center;
                }
                .preloader-logo img {
                    height: 80px;
                    margin-bottom: 20px;
                }
                .loading-spinner {
                    width: 40px;
                    height: 40px;
                    border: 4px solid #f3f3f3;
                    border-top: 4px solid #2f5a8e;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', preloaderStyles);
        document.body.insertBefore(preloader, document.body.firstChild);
        
        // Hide preloader after page load
        window.addEventListener('load', function() {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.remove();
                }, 300);
            }, 500);
        });
    }
    
    // Initialize preloader if needed
    // initPreloader();
    
    console.log('Ittihad Al-Bilad website initialized successfully!');
});

// ===== FOOTER INTERACTIONS =====
function initFooterInteractions() {
    // Back to Top Button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        // Smooth scroll to top
        backToTopBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Newsletter Form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('.newsletter-input').value;
            
            if (email) {
                // Show success message
                showNotification('تم الاشتراك بنجاح!', 'success');
                this.querySelector('.newsletter-input').value = '';
            }
        });
    }
    
    // Social Media Links Animation
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Footer Section Hover Effects
    const footerSections = document.querySelectorAll('.footer-section');
    footerSections.forEach(section => {
        section.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 30px rgba(255, 215, 0, 0.1)';
        });
        
        section.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Trust Indicators Animation
    const trustItems = document.querySelectorAll('.trust-item');
    trustItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
            this.style.background = 'rgba(255, 215, 0, 0.2)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.background = 'rgba(255, 215, 0, 0.1)';
        });
    });
    
    // Contact Items Animation
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.background = 'rgba(255, 215, 0, 0.1)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.background = 'rgba(255, 255, 255, 0.05)';
        });
    });
    
    // Footer Links Animation
    const footerLinks = document.querySelectorAll('.footer-link');
    footerLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.color = 'var(--accent-gold)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.color = 'rgba(255, 255, 255, 0.9)';
        });
    });
    
    // Badge Hover Effects
    const badges = document.querySelectorAll('.badge');
    badges.forEach(badge => {
        badge.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
            this.style.background = 'rgba(255, 215, 0, 0.2)';
        });
        
        badge.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.background = 'rgba(255, 215, 0, 0.1)';
        });
    });
    
    // Map Container Animation
    const mapContainer = document.querySelector('.map-container');
    if (mapContainer) {
        mapContainer.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.6)';
        });
        
        mapContainer.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.5)';
        });
    }
    
    // Floating Shapes Animation Enhancement
    const floatingShapes = document.querySelectorAll('.floating-shape');
    floatingShapes.forEach((shape, index) => {
        // Add random movement
        setInterval(() => {
            const randomX = Math.random() * 20 - 10;
            const randomY = Math.random() * 20 - 10;
            shape.style.transform = `translate(${randomX}px, ${randomY}px)`;
        }, 3000 + (index * 1000));
    });
    
    // Footer Particles Animation
    const footerParticles = document.querySelector('.footer-particles');
    if (footerParticles) {
        let animationFrame;
        
        function animateParticles() {
            const time = Date.now() * 0.001;
            footerParticles.style.backgroundPosition = `${time * 10}px ${time * 5}px`;
            animationFrame = requestAnimationFrame(animateParticles);
        }
        
        animateParticles();
        
        // Pause animation when not visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateParticles();
                } else {
                    cancelAnimationFrame(animationFrame);
                }
            });
        });
        
        observer.observe(footerParticles);
    }
}

// Notification System
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

// ===== SERVICE WORKER (OPTIONAL FOR PWA) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}