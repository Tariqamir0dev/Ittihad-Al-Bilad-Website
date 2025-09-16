// ===== PROJECT DETAIL PAGE JAVASCRIPT =====

// Simple JavaScript for project detail page
// Focus on minimal functionality as requested

// DOM Elements
let imageModal;
let modalImage;
let modalClose;
let modalPrev;
let modalNext;
let galleryImages;
let currentImageIndex = 0;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeProjectDetailPage();
});

function initializeProjectDetailPage() {
    // Get DOM elements
    imageModal = document.getElementById('imageModal');
    modalImage = document.getElementById('modalImage');
    modalClose = document.getElementById('modalClose');
    modalPrev = document.getElementById('modalPrev');
    modalNext = document.getElementById('modalNext');
    galleryImages = document.querySelectorAll('.gallery-zoom-btn');
    
    // Setup event listeners
    setupEventListeners();
    
    // Initialize animations
    initializeAnimations();
}

function setupEventListeners() {
    // Gallery zoom buttons
    galleryImages.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            const imageSrc = this.getAttribute('data-image');
            openImageModal(imageSrc, index);
        });
    });
    
    // Modal close
    if (modalClose) {
        modalClose.addEventListener('click', closeImageModal);
    }
    
    // Modal overlay click to close
    if (imageModal) {
        imageModal.addEventListener('click', function(e) {
            if (e.target === imageModal || e.target.classList.contains('modal-overlay')) {
                closeImageModal();
            }
        });
    }
    
    // Modal navigation
    if (modalPrev) {
        modalPrev.addEventListener('click', showPreviousImage);
    }
    
    if (modalNext) {
        modalNext.addEventListener('click', showNextImage);
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (imageModal && imageModal.classList.contains('active')) {
            switch(e.key) {
                case 'Escape':
                    closeImageModal();
                    break;
                case 'ArrowLeft':
                    showNextImage();
                    break;
                case 'ArrowRight':
                    showPreviousImage();
                    break;
            }
        }
    });
}

function openImageModal(imageSrc, index) {
    if (!imageModal || !modalImage) return;
    
    currentImageIndex = index;
    modalImage.src = imageSrc;
    modalImage.alt = `صورة ${index + 1} من المعرض`;
    
    imageModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Update navigation buttons visibility
    updateNavigationButtons();
}

function closeImageModal() {
    if (!imageModal) return;
    
    imageModal.classList.remove('active');
    document.body.style.overflow = '';
}

function showPreviousImage() {
    if (galleryImages.length === 0) return;
    
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    const imageSrc = galleryImages[currentImageIndex].getAttribute('data-image');
    
    if (modalImage) {
        modalImage.src = imageSrc;
        modalImage.alt = `صورة ${currentImageIndex + 1} من المعرض`;
    }
    
    updateNavigationButtons();
}

function showNextImage() {
    if (galleryImages.length === 0) return;
    
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    const imageSrc = galleryImages[currentImageIndex].getAttribute('data-image');
    
    if (modalImage) {
        modalImage.src = imageSrc;
        modalImage.alt = `صورة ${currentImageIndex + 1} من المعرض`;
    }
    
    updateNavigationButtons();
}

function updateNavigationButtons() {
    // Navigation buttons are always visible for simplicity
    // In a more complex implementation, you could hide them when there's only one image
    if (modalPrev && modalNext) {
        modalPrev.style.display = galleryImages.length > 1 ? 'flex' : 'none';
        modalNext.style.display = galleryImages.length > 1 ? 'flex' : 'none';
    }
}

function initializeAnimations() {
    // Simple intersection observer for animations
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

// Utility function to get URL parameters (for future backend integration)
function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Simple function to load project data (placeholder for backend integration)
function loadProjectData(projectId) {
    // This would be replaced with actual API call
    console.log('Loading project data for ID:', projectId);
    
    // For now, we'll use static data
    // In the future, this would fetch from backend
    return {
        id: projectId,
        title: "فعالية يوم التأسيس 24",
        location: "الرياض (حديقة الملتقى)",
        sponsor: "أمانة منطقة الرياض",
        year: "2024 م",
        description: "تغطيات للحفل المقدم من أمانة منطقة الرياض للمواطنين في بعض الحدائق العامة بمنطقة الرياض، ومشاركة احتفالهم وسعادتهم بيوم التأسيس."
    };
}

// Export functions for potential external use
window.ProjectDetailPage = {
    openImageModal,
    closeImageModal,
    showPreviousImage,
    showNextImage,
    loadProjectData
};
