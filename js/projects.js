// ===== PROJECTS PAGE JAVASCRIPT =====

// Projects data
const projectsData = [
    {
        id: 1,
        title: "حملة إعلانية لشركة الاتصالات",
        category: "marketing",
        description: "تصميم وتنفيذ حملة إعلانية شاملة لشركة الاتصالات السعودية تشمل الإعلانات التلفزيونية والرقمية والطباعة.",
        image: "images/hero-placeholder.jpg",
        date: "2024-02-20",
        location: "جميع أنحاء المملكة",
        tags: ["إعلانات", "اتصالات", "رقمية"],
        client: "شركة الاتصالات السعودية",
        duration: "6 أشهر",
        reach: "10M+",
        status: "مكتمل"
    },
    {
        id: 2,
        title: "إنتاج فيلم وثائقي عن التراث السعودي",
        category: "media",
        description: "إنتاج فيلم وثائقي طويل يسلط الضوء على التراث الثقافي السعودي الغني والمتنوع، من إخراج متميز وإنتاج عالي الجودة.",
        image: "images/article1.jpg",
        date: "2024-01-10",
        location: "مناطق متعددة",
        tags: ["وثائقي", "تراث", "ثقافة"],
        client: "الهيئة العامة للثقافة",
        duration: "8 أشهر",
        runtime: "90 دقيقة",
        status: "مكتمل"
    },
    {
        id: 3,
        title: "حفل افتتاح المدينة الرياضية الجديدة",
        category: "events",
        description: "تنظيم حفل افتتاح ضخم للمدينة الرياضية الجديدة في الرياض، مع عروض مبهرة ومشاركة نجوم عالميين.",
        image: "images/hero-placeholder.jpg",
        date: "2023-12-01",
        location: "الرياض",
        tags: ["رياضة", "افتتاح", "ترفيه"],
        client: "الهيئة العامة للرياضة",
        duration: "يوم واحد",
        attendees: "15000+",
        status: "مكتمل"
    },
    {
        id: 4,
        title: "معرض التقنية والابتكار",
        category: "events",
        description: "تنظيم معرض تقني متخصص يعرض أحدث الابتكارات التقنية في المملكة، مع ورش عمل ومحاضرات تفاعلية.",
        image: "images/project1.jpg",
        date: "2023-11-15",
        location: "جدة",
        tags: ["تقنية", "ابتكار", "معرض"],
        client: "هيئة تنمية الصادرات",
        duration: "5 أيام",
        attendees: "8000+",
        status: "مكتمل"
    },
    {
        id: 5,
        title: "حملة تسويقية للسياحة السعودية",
        category: "marketing",
        description: "حملة تسويقية شاملة لتعزيز السياحة الداخلية والخارجية في المملكة، تشمل إنتاج محتوى مرئي ورقمي متميز.",
        image: "images/article1.jpg",
        date: "2023-10-20",
        location: "عالمي",
        tags: ["سياحة", "تسويق", "محتوى"],
        client: "الهيئة السعودية للسياحة",
        duration: "12 شهر",
        reach: "50M+",
        status: "مكتمل"
    },
    {
        id: 6,
        title: "إنتاج برنامج تلفزيوني عن ريادة الأعمال",
        category: "media",
        description: "إنتاج برنامج تلفزيوني أسبوعي يسلط الضوء على قصص نجاح رواد الأعمال السعوديين ويقدم نصائح قيمة للمبتدئين.",
        image: "images/hero-placeholder.jpg",
        date: "2023-09-01",
        location: "استوديوهات الرياض",
        tags: ["تلفزيون", "ريادة أعمال", "تعليمي"],
        client: "قناة السعودية",
        duration: "26 حلقة",
        episodes: "26",
        status: "مكتمل"
    },
    {
        id: 7,
        title: "مؤتمر الصحة والطب الرقمي",
        category: "events",
        description: "تنظيم مؤتمر متخصص في الصحة الرقمية والطب الحديث، يجمع بين الخبراء المحليين والدوليين في هذا المجال.",
        image: "images/project1.jpg",
        date: "2023-08-15",
        location: "الدمام",
        tags: ["صحة", "طب رقمي", "مؤتمر"],
        client: "وزارة الصحة",
        duration: "3 أيام",
        attendees: "3000+",
        status: "مكتمل"
    },
    {
        id: 8,
        title: "حملة إعلانية للطاقة المتجددة",
        category: "marketing",
        description: "حملة إعلانية مبتكرة لتوعية المجتمع بأهمية الطاقة المتجددة ودور المملكة في هذا المجال الحيوي.",
        image: "images/article1.jpg",
        date: "2023-07-10",
        location: "جميع أنحاء المملكة",
        tags: ["طاقة متجددة", "توعية", "بيئة"],
        client: "وزارة الطاقة",
        duration: "4 أشهر",
        reach: "15M+",
        status: "مكتمل"
    },
    {
        id: 9,
        title: "إنتاج فيديو موسيقي للفنان السعودي",
        category: "media",
        description: "إنتاج فيديو موسيقي احترافي لفنان سعودي مشهور، مع إخراج مبدع وتقنيات إنتاج متقدمة.",
        image: "images/hero-placeholder.jpg",
        date: "2023-06-20",
        location: "الرياض وجدة",
        tags: ["موسيقى", "فيديو", "فن"],
        client: "شركة إنتاج موسيقي",
        duration: "شهر واحد",
        views: "5M+",
        status: "مكتمل"
    },
    {
        id: 10,
        title: "معرض التعليم والتدريب المهني",
        category: "events",
        description: "تنظيم معرض متخصص في التعليم والتدريب المهني، يهدف إلى ربط الطلاب بفرص العمل المتاحة في السوق.",
        image: "images/project1.jpg",
        date: "2023-05-25",
        location: "الرياض",
        tags: ["تعليم", "تدريب", "وظائف"],
        client: "وزارة التعليم",
        duration: "4 أيام",
        attendees: "12000+",
        status: "مكتمل"
    },
    {
        id: 11,
        title: "حملة تسويقية للقطاع المصرفي",
        category: "marketing",
        description: "حملة تسويقية شاملة لبنك سعودي رائد، تركز على الخدمات الرقمية والحلول المصرفية المبتكرة.",
        image: "images/article1.jpg",
        date: "2023-04-15",
        location: "جميع أنحاء المملكة",
        tags: ["مصرفي", "رقمي", "خدمات"],
        client: "بنك سعودي رائد",
        duration: "6 أشهر",
        reach: "8M+",
        status: "مكتمل"
    }
];

// DOM Elements
let projectsContainer;
let loadMoreBtn;
let visibleProjects = 6;
let allProjects = [];

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeProjectsPage();
});

function initializeProjectsPage() {
    // Get DOM elements
    projectsContainer = document.getElementById('projects-container');
    loadMoreBtn = document.getElementById('loadMoreBtn');
    
    if (!projectsContainer) {
        console.error('Projects container not found');
        return;
    }
    
    // Initialize projects
    allProjects = [...projectsData];
    renderProjects();
    
    // Setup event listeners
    setupEventListeners();
    
    // Initialize animations
    initializeAnimations();
    
    // Initialize statistics counter
    initializeStatistics();
}

function setupEventListeners() {
    
    // Load more button
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreProjects);
    }
    
    // Project card interactions
    document.addEventListener('click', function(e) {
        if (e.target.closest('.project-card')) {
            const projectCard = e.target.closest('.project-card');
            const projectId = projectCard.getAttribute('data-project-id');
             if (projectId) {
                 // Navigate to project detail page
                 window.location.href = `project-detail.html?id=${projectId}`;
             }
        }
    });
}


function renderProjects(projects = allProjects) {
    const projectsToShow = projects.slice(0, visibleProjects);
    
    projectsToShow.forEach((project, index) => {
        const projectCard = createProjectCard(project, index);
        projectsContainer.appendChild(projectCard);
    });
    
    // Add animation classes
    setTimeout(() => {
        const cards = projectsContainer.querySelectorAll('.project-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('animate-on-scroll', 'visible');
            }, index * 100);
        });
    }, 100);
}

function createProjectCard(project, index) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-project-id', project.id);
    card.setAttribute('data-category', project.category);
    
    const categoryNames = {
        'events': 'الفعاليات',
        'media': 'الإنتاج الإعلامي',
        'marketing': 'التسويق',
        'corporate': 'الفعاليات المؤسسية'
    };
    
    const formattedDate = formatDate(project.date);
    
    card.innerHTML = `
        <div class="project-image-container">
            <img src="${project.image}" alt="${project.title}" class="project-image" loading="lazy">
            <div class="project-overlay">
                <div class="project-overlay-content">
                    <h3 class="project-overlay-title">${project.title}</h3>
                    <p class="project-overlay-description">${project.description}</p>
                    <a href="project-detail.html?id=${project.id}" class="project-overlay-link">
                        <span>عرض التفاصيل</span>
                        <i class="fas fa-arrow-left"></i>
                    </a>
                </div>
            </div>
        </div>
    `;
    
    return card;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        calendar: 'gregory'
    };
    return date.toLocaleDateString('ar-SA', options);
}

function loadMoreProjects() {
    visibleProjects += 6;
    
    // Clear container
    projectsContainer.innerHTML = '';
    
    // Render projects with new count
    renderProjects(allProjects);
    
    // Update load more button
    updateLoadMoreButton(allProjects);
    
    // Scroll to new projects
    setTimeout(() => {
        const newProjects = projectsContainer.querySelectorAll('.project-card');
        if (newProjects.length > 0) {
            newProjects[newProjects.length - 6].scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    }, 300);
}

function updateLoadMoreButton(filteredProjects) {
    if (!loadMoreBtn) return;
    
    if (visibleProjects >= filteredProjects.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'inline-flex';
        loadMoreBtn.disabled = false;
    }
}

function initializeAnimations() {
    // Intersection Observer for animations
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
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));
}

function initializeStatistics() {
    const statItems = document.querySelectorAll('.stat-item');
    
    statItems.forEach(item => {
        const target = parseInt(item.getAttribute('data-target'));
        const suffix = item.getAttribute('data-suffix') || '';
        const numberElement = item.querySelector('.stat-number');
        
        if (numberElement && target) {
            animateCounter(numberElement, target, suffix);
        }
    });
}

function animateCounter(element, target, suffix) {
    let current = 0;
    const increment = target / 100;
    const duration = 2000; // 2 seconds
    const stepTime = duration / 100;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Format number with commas for large numbers
        const formattedNumber = Math.floor(current).toLocaleString('ar-SA');
        element.textContent = formattedNumber + suffix;
    }, stepTime);
}

// Utility functions
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Search functionality (if needed)
function searchProjects(query) {
    const filteredProjects = allProjects.filter(project => 
        project.title.toLowerCase().includes(query.toLowerCase()) ||
        project.description.toLowerCase().includes(query.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
    
    projectsContainer.innerHTML = '';
    renderProjects(filteredProjects);
}

// Export functions for potential external use
window.ProjectsPage = {
    searchProjects,
    loadMoreProjects,
    initializeProjectsPage
};
