// ===== PROJECT DETAIL PAGE JAVASCRIPT =====

// Media Carousel and Modal functionality
let mediaCarousel;
let mediaItems;
let currentSlide = 0;
let totalSlides;
let mediaModal;
let modalMedia;
let modalClose;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeMediaCarousel();
    initializeMediaModal();
});

function initializeMediaCarousel() {
    mediaCarousel = document.getElementById('mediaCarousel');
    mediaItems = document.querySelectorAll('.media-item');
    totalSlides = mediaItems.length;
    
    if (!mediaCarousel || totalSlides === 0) return;
    
    // Setup navigation buttons
    const prevBtn = document.querySelector('.media-prev');
    const nextBtn = document.querySelector('.media-next');
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateCarousel();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        });
    }
    
    // Setup indicators
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            updateCarousel();
        });
    });
    
    // Setup touch/swipe support
    setupTouchSupport();
    
    // Setup media zoom buttons
    setupMediaZoomButtons();
}

function updateCarousel() {
    if (!mediaCarousel) return;
    
    const translateX = -currentSlide * 100;
    mediaCarousel.style.transform = `translateX(${translateX}%)`;
    
    // Update indicators
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

function setupTouchSupport() {
    if (!mediaCarousel) return;
    
    let startX = 0;
    let startY = 0;
    let isDragging = false;
    
    mediaCarousel.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        isDragging = true;
    });
    
    mediaCarousel.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
    });
    
    mediaCarousel.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        const diffX = startX - endX;
        const diffY = startY - endY;
        
        // Only handle horizontal swipes
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            if (diffX > 0) {
                // Swipe left - next slide
                currentSlide = (currentSlide + 1) % totalSlides;
            } else {
                // Swipe right - previous slide
                currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            }
            updateCarousel();
        }
        
        isDragging = false;
    });
}

function setupMediaZoomButtons() {
    const zoomButtons = document.querySelectorAll('.media-zoom-btn');
    zoomButtons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const mediaType = btn.getAttribute('data-type');
            const mediaSrc = btn.getAttribute('data-src');
            openMediaModal(mediaType, mediaSrc);
        });
    });
    
    // Video play buttons
    const videoPlayButtons = document.querySelectorAll('.video-play-btn');
    videoPlayButtons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const video = btn.closest('.media-item').querySelector('video');
            if (video) {
                openMediaModal('video', video.src);
            }
        });
    });
}

function initializeMediaModal() {
    mediaModal = document.getElementById('mediaModal');
    modalMedia = document.getElementById('modalMedia');
    modalClose = document.getElementById('modalClose');
    
    if (!mediaModal || !modalClose) return;
    
    // Close modal events
    modalClose.addEventListener('click', closeMediaModal);
    
    // Close on overlay click
    mediaModal.addEventListener('click', (e) => {
        if (e.target === mediaModal || e.target.classList.contains('modal-overlay')) {
            closeMediaModal();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mediaModal.classList.contains('active')) {
            closeMediaModal();
        }
    });
}

function openMediaModal(type, src) {
    if (!mediaModal || !modalMedia) return;
    
    modalMedia.innerHTML = '';
    
    if (type === 'image') {
        const img = document.createElement('img');
        img.src = src;
        img.alt = 'صورة المشروع';
        img.style.maxWidth = '100%';
        img.style.maxHeight = '100%';
        img.style.objectFit = 'contain';
        modalMedia.appendChild(img);
    } else if (type === 'video') {
        const video = document.createElement('video');
        video.src = src;
        video.controls = true;
        video.autoplay = true;
        video.style.maxWidth = '100%';
        video.style.maxHeight = '100%';
        modalMedia.appendChild(video);
    }
    
    mediaModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMediaModal() {
    if (!mediaModal) return;
    
    mediaModal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Stop any playing videos
    const videos = modalMedia.querySelectorAll('video');
    videos.forEach(video => {
        video.pause();
        video.currentTime = 0;
    });
}

// Auto-play carousel (optional)
function startAutoPlay() {
    setInterval(() => {
        if (totalSlides > 1) {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateCarousel();
        }
    }, 5000); // Change slide every 5 seconds
}

// Uncomment the line below to enable auto-play
// startAutoPlay();