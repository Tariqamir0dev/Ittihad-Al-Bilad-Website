// ===== MEDIA CENTER PAGE JAVASCRIPT =====

// Articles data - في المستقبل سيتم جلبها من API
const articlesData = [
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
        title: "تطوير تقنيات الإنتاج الإعلامي",
        excerpt: "نستثمر في أحدث التقنيات لتطوير قدراتنا في الإنتاج الإعلامي وتقديم محتوى عالي الجودة يلبي احتياجات عملائنا",
        image: "images/article1.jpg",
        date: "2025-01-08",
        author: "قسم التقنية",
        category: "الإنتاج الإعلامي",
        link: "article-detail.html?id=3"
    },
    {
        id: 4,
        title: "شراكة استراتيجية جديدة",
        excerpt: "نعلن عن شراكة استراتيجية جديدة مع إحدى الشركات الرائدة في مجال التسويق الرقمي لتعزيز خدماتنا التسويقية",
        image: "images/article1.jpg",
        date: "2025-01-05",
        author: "إدارة الشراكات",
        category: "التسويق",
        link: "article-detail.html?id=4"
    },
    {
        id: 5,
        title: "توسيع نطاق الخدمات",
        excerpt: "نوسع نطاق خدماتنا لتشمل مناطق جديدة في المملكة مع الحفاظ على نفس مستوى الجودة والتميز الذي نقدمه",
        image: "images/article1.jpg",
        date: "2025-01-03",
        author: "إدارة العمليات",
        category: "الخدمات",
        link: "article-detail.html?id=5"
    },
    {
        id: 6,
        title: "فعالية جدة للمؤتمرات",
        excerpt: "نظمنا فعالية مؤتمرات ناجحة في جدة شارك فيها أكثر من 1000 متخصص في مجال الفعاليات والإنتاج الإعلامي",
        image: "images/article1.jpg",
        date: "2024-12-28",
        author: "فريق جدة",
        category: "الفعاليات",
        link: "article-detail.html?id=6"
    },
    {
        id: 7,
        title: "تطوير منصة رقمية جديدة",
        excerpt: "أطلقنا منصة رقمية جديدة لتسهيل عملية حجز وإدارة الفعاليات مع واجهة مستخدم محسنة وتقنيات متقدمة",
        image: "images/article1.jpg",
        date: "2024-12-25",
        author: "قسم التطوير",
        category: "التقنية",
        link: "article-detail.html?id=7"
    },
    {
        id: 8,
        title: "جائزة التميز في الفعاليات",
        excerpt: "فزنا بجائزة التميز في تنظيم الفعاليات لعام 2024 تقديراً لجهودنا المتميزة في هذا المجال",
        image: "images/article1.jpg",
        date: "2024-12-20",
        author: "إدارة الجودة",
        category: "أخبار الشركة",
        link: "article-detail.html?id=8"
    }
];

// Global variables
let currentPage = 1;
const articlesPerPage = 6;
let filteredArticles = [...articlesData];
let displayedArticles = 0;

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeMediaCenter();
    setupEventListeners();
});

// ===== INITIALIZATION =====
function initializeMediaCenter() {
    displayArticles();
    updateLoadMoreButton();
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }

    // Category filter
    const categoryFilter = document.getElementById('category-filter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', handleCategoryFilter);
    }

    // Load more button
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', handleLoadMore);
    }
}

// ===== SEARCH FUNCTIONALITY =====
function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        filteredArticles = [...articlesData];
    } else {
        filteredArticles = articlesData.filter(article => 
            article.title.toLowerCase().includes(searchTerm) ||
            article.excerpt.toLowerCase().includes(searchTerm) ||
            article.author.toLowerCase().includes(searchTerm) ||
            article.category.toLowerCase().includes(searchTerm)
        );
    }
    
    resetPagination();
    displayArticles();
    updateLoadMoreButton();
}

// ===== CATEGORY FILTER =====
function handleCategoryFilter(event) {
    const selectedCategory = event.target.value;
    
    if (selectedCategory === '') {
        filteredArticles = [...articlesData];
    } else {
        filteredArticles = articlesData.filter(article => 
            article.category === selectedCategory
        );
    }
    
    resetPagination();
    displayArticles();
    updateLoadMoreButton();
}

// ===== LOAD MORE FUNCTIONALITY =====
function handleLoadMore() {
    currentPage++;
    displayArticles();
    updateLoadMoreButton();
}

// ===== DISPLAY ARTICLES =====
function displayArticles() {
    const container = document.getElementById('articles-container');
    if (!container) return;

    const startIndex = 0;
    const endIndex = currentPage * articlesPerPage;
    const articlesToShow = filteredArticles.slice(startIndex, endIndex);

    if (currentPage === 1) {
        container.innerHTML = '';
        displayedArticles = 0;
    }

    if (articlesToShow.length === 0 && currentPage === 1) {
        showEmptyState(container);
        return;
    }

    articlesToShow.forEach((article, index) => {
        const articleElement = createArticleCard(article);
        articleElement.style.animationDelay = `${index * 0.1}s`;
        articleElement.classList.add('fade-in');
        container.appendChild(articleElement);
    });

    displayedArticles = articlesToShow.length;
}

// ===== CREATE ARTICLE CARD =====
function createArticleCard(article) {
    const articleDiv = document.createElement('article');
    articleDiv.className = 'article-card';
    articleDiv.setAttribute('data-category', article.category);
    articleDiv.setAttribute('tabindex', '0');
    articleDiv.setAttribute('role', 'article');
    articleDiv.setAttribute('aria-label', `مقال: ${article.title}`);

    // Format date
    const formattedDate = formatDate(article.date);

    articleDiv.innerHTML = `
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
    `;

    // Add click event for accessibility
    articleDiv.addEventListener('click', function() {
        window.location.href = article.link;
    });

    // Add keyboard navigation
    articleDiv.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            window.location.href = article.link;
        }
    });

    return articleDiv;
}

// ===== FORMAT DATE =====
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('ar-SA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// ===== SHOW EMPTY STATE =====
function showEmptyState(container) {
    container.innerHTML = `
        <div class="empty-state col-span-full">
            <i class="fas fa-search" aria-hidden="true"></i>
            <h3>لا توجد مقالات</h3>
            <p>لم نجد أي مقالات تطابق معايير البحث الخاصة بك. حاول تغيير كلمات البحث أو الفئة المحددة.</p>
        </div>
    `;
}

// ===== UPDATE LOAD MORE BUTTON =====
function updateLoadMoreButton() {
    const loadMoreBtn = document.getElementById('load-more-btn');
    if (!loadMoreBtn) return;

    const hasMoreArticles = displayedArticles < filteredArticles.length;
    
    if (hasMoreArticles) {
        loadMoreBtn.style.display = 'inline-flex';
        loadMoreBtn.textContent = 'تحميل المزيد';
        loadMoreBtn.innerHTML = '<i class="fas fa-plus ml-2"></i>تحميل المزيد';
    } else {
        loadMoreBtn.style.display = 'none';
    }
}

// ===== RESET PAGINATION =====
function resetPagination() {
    currentPage = 1;
    displayedArticles = 0;
}

// ===== UTILITY FUNCTIONS =====

// Debounce function for search
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

// Apply debounce to search
const debouncedSearch = debounce(handleSearch, 300);

// Update search event listener with debounced version
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', debouncedSearch);
    }
});

// ===== ACCESSIBILITY ENHANCEMENTS =====

// Add focus management for keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        const focusedElement = document.activeElement;
        if (focusedElement && focusedElement.classList.contains('article-card')) {
            focusedElement.style.outline = '2px solid var(--accent-gold)';
            focusedElement.style.outlineOffset = '2px';
        }
    }
});

// Remove focus outline on mouse interaction
document.addEventListener('mousedown', function() {
    const focusedCards = document.querySelectorAll('.article-card:focus');
    focusedCards.forEach(card => {
        card.style.outline = 'none';
    });
});

// ===== PERFORMANCE OPTIMIZATIONS =====

// Lazy loading for images
function setupLazyLoading() {
    const images = document.querySelectorAll('.article-image[loading="lazy"]');
    
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

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', setupLazyLoading);

// ===== ERROR HANDLING =====

// Handle image loading errors
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG' && e.target.classList.contains('article-image')) {
        e.target.src = 'images/placeholder.jpg'; // Fallback image
        e.target.alt = 'صورة المقال غير متوفرة';
    }
}, true);

// ===== EXPORT FOR TESTING (if needed) =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        articlesData,
        createArticleCard,
        formatDate,
        handleSearch,
        handleCategoryFilter
    };
}
