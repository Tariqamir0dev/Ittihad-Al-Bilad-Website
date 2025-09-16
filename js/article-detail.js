// ===== ARTICLE DETAIL PAGE JAVASCRIPT =====

// Sample article data - في المستقبل سيتم جلبها من API
const articleData = {
    id: 1,
    title: "إطلاق مشروع رؤية 2030 الجديد",
    subtitle: "نفخر بالإعلان عن إطلاق مشروعنا الجديد الذي يساهم في تحقيق رؤية المملكة 2030 من خلال تقديم حلول مبتكرة في مجال الفعاليات والإنتاج الإعلامي",
    content: `
        <p class="lead-paragraph">
            نفخر بالإعلان عن إطلاق مشروعنا الجديد الذي يساهم في تحقيق رؤية المملكة 2030 من خلال تقديم حلول مبتكرة في مجال الفعاليات والإنتاج الإعلامي. هذا المشروع يمثل نقلة نوعية في مسيرتنا نحو الريادة والتميز.
        </p>

        <h2 id="vision">رؤية المشروع وأهدافه</h2>
        <p>
            يهدف هذا المشروع إلى تعزيز مكانة المملكة العربية السعودية كوجهة رائدة في مجال الفعاليات والإنتاج الإعلامي على المستوى الإقليمي والعالمي. نحن نؤمن بأن كل فعالية هي قصة تستحق أن تُحكى بطريقة استثنائية، وهذا ما نسعى لتحقيقه من خلال هذا المشروع الطموح.
        </p>

        <div class="image-gallery my-8">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="gallery-item">
                    <img src="images/article1.jpg" alt="صورة من المشروع" class="w-full h-48 object-cover rounded-lg shadow-md">
                    <p class="text-sm text-gray-600 mt-2 text-center">مركز المؤتمرات الجديد</p>
                </div>
                <div class="gallery-item">
                    <img src="images/article1.jpg" alt="صورة من المشروع" class="w-full h-48 object-cover rounded-lg shadow-md">
                    <p class="text-sm text-gray-600 mt-2 text-center">قاعة الإنتاج الإعلامي</p>
                </div>
            </div>
        </div>

        <h2 id="features">المزايا والخدمات المقدمة</h2>
        <p>
            يوفر المشروع مجموعة شاملة من الخدمات المتطورة التي تشمل:
        </p>

        <ul class="features-list">
            <li>
                <i class="fas fa-check-circle text-accent-gold"></i>
                <span>تجهيزات تقنية متطورة للفعاليات والمؤتمرات</span>
            </li>
            <li>
                <i class="fas fa-check-circle text-accent-gold"></i>
                <span>استوديوهات إنتاج إعلامي مجهزة بأحدث التقنيات</span>
            </li>
            <li>
                <i class="fas fa-check-circle text-accent-gold"></i>
                <span>فريق عمل محترف ومتخصص في جميع المجالات</span>
            </li>
            <li>
                <i class="fas fa-check-circle text-accent-gold"></i>
                <span>خدمات تسويقية وإعلانية متكاملة</span>
            </li>
            <li>
                <i class="fas fa-check-circle text-accent-gold"></i>
                <span>دعم فني على مدار الساعة</span>
            </li>
        </ul>

        <blockquote class="quote-block">
            <i class="fas fa-quote-right quote-icon"></i>
            <p class="quote-text">
                "نحن ملتزمون بتقديم أفضل الخدمات في مجال الفعاليات والإنتاج الإعلامي، ونسعى ليكون هذا المشروع نموذجاً يحتذى به في المنطقة"
            </p>
            <cite class="quote-author">- فريق إدارة المشروع</cite>
        </blockquote>

        <h2 id="impact">التأثير على الاقتصاد المحلي</h2>
        <p>
            يتوقع أن يساهم هذا المشروع في خلق أكثر من 500 فرصة عمل مباشرة وغير مباشرة، بالإضافة إلى جذب استثمارات جديدة تصل قيمتها إلى مليار ريال سعودي خلال السنوات الخمس القادمة.
        </p>

        <div class="stats-grid my-8">
            <div class="stat-card">
                <div class="stat-number">500+</div>
                <div class="stat-label">فرصة عمل</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">1B+</div>
                <div class="stat-label">ريال استثمار</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">50+</div>
                <div class="stat-label">فعالية سنوياً</div>
            </div>
        </div>

        <h2 id="phases">المراحل القادمة</h2>
        <p>
            سيتم تنفيذ المشروع على ثلاث مراحل رئيسية، حيث تبدأ المرحلة الأولى في الربع الثاني من عام 2025، وتشمل إنشاء البنية التحتية الأساسية وتجهيز المرافق الرئيسية.
        </p>

        <div class="timeline my-8">
            <div class="timeline-item">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                    <h3>المرحلة الأولى</h3>
                    <p>إنشاء البنية التحتية وتجهيز المرافق الأساسية</p>
                    <span class="timeline-date">Q2 2025</span>
                </div>
            </div>
            <div class="timeline-item">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                    <h3>المرحلة الثانية</h3>
                    <p>تطوير الخدمات المتقدمة وتدريب الفريق</p>
                    <span class="timeline-date">Q4 2025</span>
                </div>
            </div>
            <div class="timeline-item">
                <div class="timeline-marker"></div>
                <div class="timeline-content">
                    <h3>المرحلة الثالثة</h3>
                    <p>الإطلاق الرسمي وبدء العمليات التجارية</p>
                    <span class="timeline-date">Q2 2026</span>
                </div>
            </div>
        </div>

        <h2 id="partnerships">الشراكات الاستراتيجية</h2>
        <p>
            نعمل على إقامة شراكات استراتيجية مع كبرى الشركات المحلية والدولية المتخصصة في مجال الفعاليات والإنتاج الإعلامي، مما سيمكننا من تقديم خدمات عالمية المستوى.
        </p>

        <div class="partners-section my-8">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div class="partner-logo">
                    <img src="images/company1-logo.png" alt="شريك 1" class="w-full h-20 object-contain">
                </div>
                <div class="partner-logo">
                    <img src="images/company2-logo.png" alt="شريك 2" class="w-full h-20 object-contain">
                </div>
                <div class="partner-logo">
                    <img src="images/logo.png" alt="شريك 3" class="w-full h-20 object-contain">
                </div>
                <div class="partner-logo">
                    <img src="images/logo-light.png" alt="شريك 4" class="w-full h-20 object-contain">
                </div>
            </div>
        </div>

        <h2>الخاتمة</h2>
        <p>
            يمثل إطلاق هذا المشروع بداية جديدة في مسيرتنا نحو الريادة والتميز في مجال الفعاليات والإنتاج الإعلامي. نحن متحمسون لما يحمله المستقبل من إمكانيات وفرص، ونتطلع إلى العمل مع عملائنا وشركائنا لتحقيق أهداف رؤية المملكة 2030.
        </p>
    `,
    image: "images/article1.jpg",
    imageCaption: "صورة توضيحية لمشروع رؤية 2030 الجديد",
    date: "2025-01-15",
    author: "فريق التحرير",
    category: "أخبار الشركة",
    readingTime: "5 دقائق قراءة",
    tags: ["رؤية 2030", "الفعاليات", "الإنتاج الإعلامي", "الاستثمار", "التطوير"]
};


// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeArticleDetail();
    setupEventListeners();
    setupTableOfContents();
});

// ===== INITIALIZATION =====
function initializeArticleDetail() {
    // Get article ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id') || '1';
    
    // Load article data (in real app, this would be from API)
    loadArticleData(articleId);
    
    // Update page title and meta
    updatePageMeta();
    
    // Setup social sharing
    setupSocialSharing();
    
    // Setup reading progress
    setupReadingProgress();
}

// ===== LOAD ARTICLE DATA =====
function loadArticleData(articleId) {
    // In a real application, this would fetch from API
    // For now, we'll use the sample data
    
    // Update article content
    document.getElementById('article-title').textContent = articleData.title;
    document.getElementById('article-subtitle').textContent = articleData.subtitle;
    document.getElementById('featured-image').src = articleData.image;
    document.getElementById('image-caption').textContent = articleData.imageCaption;
    document.getElementById('article-date').textContent = formatDate(articleData.date);
    document.getElementById('article-author').textContent = articleData.author;
    document.getElementById('article-category').textContent = articleData.category;
    document.getElementById('category-badge').textContent = articleData.category;
    document.getElementById('reading-time').textContent = articleData.readingTime;
    
    // Update article body
    document.getElementById('article-body').innerHTML = articleData.content;
    
    // Update tags
    updateArticleTags(articleData.tags);
    
    // Update breadcrumb
    document.getElementById('article-category').textContent = articleData.category;
}

// ===== UPDATE PAGE META =====
function updatePageMeta() {
    // Update page title
    document.title = `${articleData.title} - اتحاد البلاد`;
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
        metaDescription.content = articleData.subtitle;
    }
    
    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
        ogTitle.content = articleData.title;
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
        ogDescription.content = articleData.subtitle;
    }
    
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) {
        ogImage.content = articleData.image;
    }
}

// ===== UPDATE ARTICLE TAGS =====
function updateArticleTags(tags) {
    const tagsContainer = document.getElementById('article-tags');
    tagsContainer.innerHTML = '';
    
    tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'tag';
        tagElement.textContent = tag;
        tagElement.setAttribute('tabindex', '0');
        tagElement.setAttribute('role', 'button');
        tagElement.setAttribute('aria-label', `تصفية المقالات حسب: ${tag}`);
        
        // Add click event for tag filtering
        tagElement.addEventListener('click', function() {
            window.location.href = `media-center.html?tag=${encodeURIComponent(tag)}`;
        });
        
        // Add keyboard support
        tagElement.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                window.location.href = `media-center.html?tag=${encodeURIComponent(tag)}`;
            }
        });
        
        tagsContainer.appendChild(tagElement);
    });
}

// ===== SETUP EVENT LISTENERS =====
function setupEventListeners() {
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', handleNewsletterSubmit);
    }
    
    // Social share buttons
    setupSocialShareButtons();
    
    // Back to top button
    setupBackToTop();
    
    // Reading progress
    setupReadingProgressBar();
}

// ===== NEWSLETTER SUBMISSION =====
function handleNewsletterSubmit(e) {
    e.preventDefault();
    
    const email = e.target.querySelector('.newsletter-input').value;
    const button = e.target.querySelector('.newsletter-btn');
    
    if (!email) {
        showNotification('يرجى إدخال بريد إلكتروني صحيح', 'error');
        return;
    }
    
    // Show loading state
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
    button.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showNotification('تم الاشتراك بنجاح! شكراً لك', 'success');
        e.target.reset();
        button.innerHTML = '<i class="fas fa-paper-plane"></i> اشتراك';
        button.disabled = false;
    }, 2000);
}

// ===== SOCIAL SHARING =====
function setupSocialSharing() {
    const shareUrl = encodeURIComponent(window.location.href);
    const shareTitle = encodeURIComponent(articleData.title);
    const shareText = encodeURIComponent(articleData.subtitle);
    
    // Update share URLs
    const facebookBtn = document.querySelector('.social-share-btn.facebook');
    if (facebookBtn) {
        facebookBtn.href = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
    }
    
    const twitterBtn = document.querySelector('.social-share-btn.twitter');
    if (twitterBtn) {
        twitterBtn.href = `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`;
    }
    
    const linkedinBtn = document.querySelector('.social-share-btn.linkedin');
    if (linkedinBtn) {
        linkedinBtn.href = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;
    }
    
    const whatsappBtn = document.querySelector('.social-share-btn.whatsapp');
    if (whatsappBtn) {
        whatsappBtn.href = `https://wa.me/?text=${shareTitle}%20${shareUrl}`;
    }
}

function setupSocialShareButtons() {
    const shareButtons = document.querySelectorAll('.social-share-btn');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const url = this.href;
            const width = 600;
            const height = 400;
            const left = (screen.width - width) / 2;
            const top = (screen.height - height) / 2;
            
            window.open(url, 'share', `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`);
        });
    });
}

// ===== TABLE OF CONTENTS =====
function setupTableOfContents() {
    const tocLinks = document.querySelectorAll('.toc-link');
    const sections = document.querySelectorAll('h2[id]');
    
    // Update TOC links to match actual sections
    tocLinks.forEach((link, index) => {
        if (sections[index]) {
            link.href = `#${sections[index].id}`;
            
            // Add click event for smooth scrolling
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update active TOC item
                    updateActiveTOCItem(this);
                }
            });
        }
    });
    
    // Setup intersection observer for TOC highlighting
    setupTOCIntersectionObserver(sections);
}

function setupTOCIntersectionObserver(sections) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                const tocLink = document.querySelector(`.toc-link[href="#${id}"]`);
                if (tocLink) {
                    updateActiveTOCItem(tocLink);
                }
            }
        });
    }, {
        rootMargin: '-20% 0px -70% 0px'
    });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

function updateActiveTOCItem(activeLink) {
    // Remove active class from all TOC links
    document.querySelectorAll('.toc-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to current link
    activeLink.classList.add('active');
}

// ===== READING PROGRESS =====
function setupReadingProgress() {
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    progressBar.innerHTML = '<div class="reading-progress-bar"></div>';
    document.body.appendChild(progressBar);
    
    // Add CSS for progress bar
    const style = document.createElement('style');
    style.textContent = `
        .reading-progress {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 4px;
            background: rgba(0,0,0,0.1);
            z-index: 9999;
        }
        .reading-progress-bar {
            height: 100%;
            background: linear-gradient(90deg, var(--accent-gold), var(--primary-blue));
            width: 0%;
            transition: width 0.3s ease;
        }
    `;
    document.head.appendChild(style);
}

function setupReadingProgressBar() {
    const progressBar = document.querySelector('.reading-progress-bar');
    if (!progressBar) return;
    
    const articleContent = document.querySelector('.article-main-content');
    if (!articleContent) return;
    
    function updateProgress() {
        const articleTop = articleContent.offsetTop;
        const articleHeight = articleContent.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollTop = window.pageYOffset;
        
        const progress = Math.min(
            Math.max((scrollTop - articleTop + windowHeight) / articleHeight, 0),
            1
        );
        
        progressBar.style.width = `${progress * 100}%`;
    }
    
    window.addEventListener('scroll', updateProgress);
    updateProgress(); // Initial call
}


// ===== BACK TO TOP =====
function setupBackToTop() {
    const backToTopBtn = document.querySelector('.back-to-top');
    if (!backToTopBtn) return;
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== UTILITY FUNCTIONS =====

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--white);
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-lg);
            padding: 1rem 1.5rem;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            border-right: 4px solid var(--accent-gold);
        }
        .notification-visible {
            transform: translateX(0);
        }
        .notification-success {
            border-right-color: #28a745;
        }
        .notification-error {
            border-right-color: #dc3545;
        }
        .notification-content {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .notification-content i {
            color: var(--accent-gold);
        }
        .notification-success .notification-content i {
            color: #28a745;
        }
        .notification-error .notification-content i {
            color: #dc3545;
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('notification-visible');
    }, 100);
    
    // Hide notification after 5 seconds
    setTimeout(() => {
        notification.classList.remove('notification-visible');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// ===== PERFORMANCE OPTIMIZATIONS =====

// Lazy loading for images
function setupLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', setupLazyLoading);

// ===== ERROR HANDLING =====

// Handle image loading errors
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.src = 'images/logo.png'; // Fallback image
        e.target.alt = 'شريك استراتيجي';
    }
}, true);

// Ensure partner logos load properly
document.addEventListener('DOMContentLoaded', function() {
    const partnerLogos = document.querySelectorAll('.partner-logo img');
    partnerLogos.forEach(img => {
        // Force reload if image fails
        img.addEventListener('error', function() {
            this.src = 'images/logo.png';
            this.alt = 'شريك استراتيجي';
        });
        
        // Add loading indicator
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    });
});

// ===== ACCESSIBILITY ENHANCEMENTS =====

// Add focus management for keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        const focusedElement = document.activeElement;
        if (focusedElement && (focusedElement.classList.contains('tag') || focusedElement.classList.contains('toc-link'))) {
            focusedElement.style.outline = '2px solid var(--accent-gold)';
            focusedElement.style.outlineOffset = '2px';
        }
    }
});

// Remove focus outline on mouse interaction
document.addEventListener('mousedown', function() {
    const focusedElements = document.querySelectorAll('.tag:focus, .toc-link:focus');
    focusedElements.forEach(element => {
        element.style.outline = 'none';
    });
});

// ===== EXPORT FOR TESTING (if needed) =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        articleData,
        relatedArticles,
        formatDate,
        showNotification,
        createRelatedArticleCard
    };
}
