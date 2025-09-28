/**
 * Company Profile PDF Viewer
 * Advanced PDF viewer with zoom, navigation, and responsive design
 */

document.addEventListener('DOMContentLoaded', function() {
    // PDF.js configuration
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
    
    // PDF viewer state
    let pdfDoc = null;
    let pageNum = 1;
    let pageRendering = false;
    let pageNumPending = null;
    let scale = 1.0; // Start with 100% for better Arabic text readability
    const canvas = document.getElementById('pdfCanvas');
    const ctx = canvas.getContext('2d');
    const loadingSpinner = document.getElementById('loadingSpinner');
    
    // Control elements
    const prevButton = document.getElementById('prevPage');
    const nextButton = document.getElementById('nextPage');
    const pageNumSpan = document.getElementById('pageNum');
    const pageCountSpan = document.getElementById('pageCount');
    const zoomInButton = document.getElementById('zoomIn');
    const zoomOutButton = document.getElementById('zoomOut');
    const zoomResetButton = document.getElementById('zoomReset');
    const zoomLevelSpan = document.getElementById('zoomLevel');
    const fullscreenButton = document.getElementById('fullscreen');
    const pdfContainer = document.getElementById('pdfContainer');
    const viewerContainer = document.querySelector('.pdf-viewer-container');
    
    // Mobile elements
    const pageSlider = document.getElementById('pageSlider');
    const mobilePageNum = document.getElementById('mobilePageNum');
    const mobilePageCount = document.getElementById('mobilePageCount');
    
    // PDF file path
    const pdfPath = 'images/pdf.pdf';
    
    /**
     * Render a page of the PDF with Arabic text support
     */
    function renderPage(num) {
        pageRendering = true;
        
        // Get the page
        pdfDoc.getPage(num).then(function(page) {
            // Calculate scale based on container width for responsive design
            const container = document.querySelector('.pdf-canvas-container');
            const containerWidth = container.clientWidth - 40; // Account for padding
            const pageViewport = page.getViewport({ scale: 1.0 });
            const autoScale = Math.min(containerWidth / pageViewport.width, 2.0);
            const finalScale = scale * autoScale;
            
            const viewport = page.getViewport({ scale: finalScale });
            
            // Set canvas dimensions
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            
            // Configure canvas for high DPI displays and Arabic text
            const outputScale = window.devicePixelRatio || 1;
            const scaledViewport = page.getViewport({ scale: finalScale * outputScale });
            
            canvas.width = scaledViewport.width;
            canvas.height = scaledViewport.height;
            canvas.style.width = viewport.width + 'px';
            canvas.style.height = viewport.height + 'px';
            
            // Scale the drawing context for high DPI
            ctx.scale(outputScale, outputScale);
            
            // Render PDF page into canvas context
            const renderContext = {
                canvasContext: ctx,
                viewport: viewport,
                // Enable text rendering for better Arabic support
                textLayer: null,
                annotationLayer: null,
                imageLayer: null
            };
            
            const renderTask = page.render(renderContext);
            
            // Wait for rendering to finish
            renderTask.promise.then(function() {
                pageRendering = false;
                if (pageNumPending !== null) {
                    // New page rendering is pending
                    renderPage(pageNumPending);
                    pageNumPending = null;
                }
                
                // Hide loading spinner
                loadingSpinner.style.display = 'none';
                canvas.style.display = 'block';
                
                // Update page info
                updatePageInfo();
                updateControls();
                
                // Add smooth fade-in effect
                canvas.style.opacity = '0';
                canvas.style.transition = 'opacity 0.3s ease';
                setTimeout(() => {
                    canvas.style.opacity = '1';
                }, 50);
                
            });
        }).catch(function(error) {
            console.error('Error rendering page:', error);
            showError('حدث خطأ في عرض الصفحة');
        });
    }
    
    /**
     * Queue page rendering if another page is being rendered
     */
    function queueRenderPage(num) {
        if (pageRendering) {
            pageNumPending = num;
        } else {
            renderPage(num);
        }
    }
    
    /**
     * Show previous page
     */
    function showPrevPage() {
        if (pageNum <= 1) {
            return;
        }
        pageNum--;
        queueRenderPage(pageNum);
    }
    
    /**
     * Show next page
     */
    function showNextPage() {
        if (pageNum >= pdfDoc.numPages) {
            return;
        }
        pageNum++;
        queueRenderPage(pageNum);
    }
    
    /**
     * Zoom in with Arabic text optimization
     */
    function zoomIn() {
        if (scale >= 2.5) return;
        scale += 0.25;
        queueRenderPage(pageNum);
        updateZoomLevel();
    }
    
    /**
     * Zoom out with Arabic text optimization
     */
    function zoomOut() {
        if (scale <= 0.6) return;
        scale -= 0.25;
        queueRenderPage(pageNum);
        updateZoomLevel();
    }
    
    /**
     * Reset zoom to optimal level for Arabic text
     */
    function resetZoom() {
        scale = 1.0;
        queueRenderPage(pageNum);
        updateZoomLevel();
    }
    
    /**
     * Update page information display
     */
    function updatePageInfo() {
        pageNumSpan.textContent = pageNum;
        pageCountSpan.textContent = pdfDoc.numPages;
        mobilePageNum.textContent = pageNum;
        mobilePageCount.textContent = pdfDoc.numPages;
        
        // Update slider
        pageSlider.value = pageNum;
        pageSlider.max = pdfDoc.numPages;
    }
    
    /**
     * Update control buttons state
     */
    function updateControls() {
        prevButton.disabled = pageNum <= 1;
        nextButton.disabled = pageNum >= pdfDoc.numPages;
        
        // Update button styles
        if (pageNum <= 1) {
            prevButton.style.opacity = '0.5';
        } else {
            prevButton.style.opacity = '1';
        }
        
        if (pageNum >= pdfDoc.numPages) {
            nextButton.style.opacity = '0.5';
        } else {
            nextButton.style.opacity = '1';
        }
    }
    
    /**
     * Update zoom level display
     */
    function updateZoomLevel() {
        const percentage = Math.round(scale * 100);
        zoomLevelSpan.textContent = percentage + '%';
    }
    
    /**
     * Toggle fullscreen mode
     */
    function toggleFullscreen() {
        if (viewerContainer.classList.contains('fullscreen')) {
            exitFullscreen();
        } else {
            enterFullscreen();
        }
    }
    
    /**
     * Enter fullscreen mode with Arabic text optimization
     */
    function enterFullscreen() {
        viewerContainer.classList.add('fullscreen');
        fullscreenButton.innerHTML = '<i class="fas fa-compress" aria-hidden="true"></i>';
        fullscreenButton.setAttribute('aria-label', 'خروج من ملء الشاشة');
        
        // Optimize scale for fullscreen Arabic text reading
        const originalScale = scale;
        if (window.innerWidth > 1200) {
            scale = Math.min(scale * 1.3, 2.0);
        } else {
            scale = Math.min(scale * 1.1, 1.8);
        }
        
        if (scale !== originalScale) {
            queueRenderPage(pageNum);
            updateZoomLevel();
        }
    }
    
    /**
     * Exit fullscreen mode
     */
    function exitFullscreen() {
        viewerContainer.classList.remove('fullscreen');
        fullscreenButton.innerHTML = '<i class="fas fa-expand" aria-hidden="true"></i>';
        fullscreenButton.setAttribute('aria-label', 'ملء الشاشة');
        
        // Reset to optimal scale for Arabic text
        if (window.innerWidth > 1200) {
            scale = Math.max(scale / 1.3, 0.8);
        } else {
            scale = Math.max(scale / 1.1, 0.7);
        }
        queueRenderPage(pageNum);
        updateZoomLevel();
    }
    
    /**
     * Show error message
     */
    function showError(message) {
        loadingSpinner.innerHTML = `
            <div style="color: #dc3545;">
                <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 1rem;"></i>
                <p>${message}</p>
                <button onclick="location.reload()" style="
                    padding: 0.5rem 1rem;
                    background: var(--primary-blue);
                    color: white;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    margin-top: 1rem;
                ">إعادة المحاولة</button>
            </div>
        `;
    }
    
    /**
     * Handle responsive design with Arabic text optimization
     */
    function handleResize() {
        // Re-render current page to adjust to new container size
        queueRenderPage(pageNum);
        
        if (window.innerWidth <= 768) {
            // Mobile adjustments for Arabic text readability
            if (scale > 1.3) {
                scale = 1.0;
                queueRenderPage(pageNum);
                updateZoomLevel();
            }
        } else if (window.innerWidth <= 1024) {
            // Tablet adjustments
            if (scale > 1.8) {
                scale = 1.2;
                queueRenderPage(pageNum);
                updateZoomLevel();
            }
        }
    }
    
    /**
     * Initialize PDF viewer
     */
    function initPDFViewer() {
        // Show loading spinner
        loadingSpinner.style.display = 'flex';
        canvas.style.display = 'none';
        
        // Load PDF
        pdfjsLib.getDocument(pdfPath).promise.then(function(pdfDoc_) {
            pdfDoc = pdfDoc_;
            
            // Initial page render
            renderPage(pageNum);
            
            // Update initial state
            updatePageInfo();
            updateControls();
            updateZoomLevel();
            
        }).catch(function(error) {
            console.error('Error loading PDF:', error);
            showError('حدث خطأ في تحميل الملف. يرجى المحاولة مرة أخرى.');
        });
    }
    
    // Event listeners
    prevButton.addEventListener('click', showPrevPage);
    nextButton.addEventListener('click', showNextPage);
    zoomInButton.addEventListener('click', zoomIn);
    zoomOutButton.addEventListener('click', zoomOut);
    zoomResetButton.addEventListener('click', resetZoom);
    fullscreenButton.addEventListener('click', toggleFullscreen);
    
    // Mobile slider
    pageSlider.addEventListener('input', function() {
        const newPageNum = parseInt(this.value);
        if (newPageNum !== pageNum && newPageNum >= 1 && newPageNum <= pdfDoc.numPages) {
            pageNum = newPageNum;
            queueRenderPage(pageNum);
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.target.tagName.toLowerCase() === 'input') return;
        
        switch(e.key) {
            case 'ArrowLeft':
            case 'ArrowUp':
                e.preventDefault();
                showNextPage(); // In RTL, left arrow goes to next page
                break;
            case 'ArrowRight':
            case 'ArrowDown':
                e.preventDefault();
                showPrevPage(); // In RTL, right arrow goes to previous page
                break;
            case '+':
            case '=':
                e.preventDefault();
                zoomIn();
                break;
            case '-':
                e.preventDefault();
                zoomOut();
                break;
            case 'f':
            case 'F':
                e.preventDefault();
                toggleFullscreen();
                break;
            case 'Escape':
                if (viewerContainer.classList.contains('fullscreen')) {
                    exitFullscreen();
                }
                break;
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', handleResize);
    
    // Handle fullscreen change events
    document.addEventListener('fullscreenchange', function() {
        if (!document.fullscreenElement && viewerContainer.classList.contains('fullscreen')) {
            exitFullscreen();
        }
    });
    
    // Enhanced touch gestures for mobile with Arabic support
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;
    
    canvas.addEventListener('touchstart', function(e) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchStartTime = Date.now();
        
        // Prevent default to avoid scrolling issues
        if (e.touches.length === 1) {
            e.preventDefault();
        }
    }, { passive: false });
    
    canvas.addEventListener('touchend', function(e) {
        if (!touchStartX || !touchStartY) return;
        
        const touchEndX = e.changedTouches[0].clientX;
        const touchEndY = e.changedTouches[0].clientY;
        const touchEndTime = Date.now();
        
        const diffX = touchStartX - touchEndX;
        const diffY = touchStartY - touchEndY;
        const timeDiff = touchEndTime - touchStartTime;
        
        // Minimum swipe distance and maximum time for swipe
        const minSwipeDistance = 60;
        const maxSwipeTime = 500;
        
        if (Math.abs(diffX) > Math.abs(diffY) && 
            Math.abs(diffX) > minSwipeDistance && 
            timeDiff < maxSwipeTime) {
            
            if (diffX > 0) {
                // Swipe left - next page in RTL (Arabic reading direction)
                showNextPage();
            } else {
                // Swipe right - previous page in RTL
                showPrevPage();
            }
        }
        
        touchStartX = 0;
        touchStartY = 0;
        touchStartTime = 0;
    });
    
    // Prevent context menu on canvas
    canvas.addEventListener('contextmenu', function(e) {
        e.preventDefault();
    });
    
    // Initialize the PDF viewer
    initPDFViewer();
    
    // Add smooth scrolling to canvas container
    const canvasContainer = document.querySelector('.pdf-canvas-container');
    if (canvasContainer) {
        canvasContainer.style.scrollBehavior = 'smooth';
    }
    
    // Add loading progress indicator
    let loadingProgress = 0;
    const progressInterval = setInterval(function() {
        if (loadingSpinner.style.display === 'none') {
            clearInterval(progressInterval);
            return;
        }
        
        loadingProgress += Math.random() * 10;
        if (loadingProgress > 90) loadingProgress = 90;
        
        const progressText = loadingSpinner.querySelector('p');
        if (progressText) {
            progressText.textContent = `جاري تحميل الملف... ${Math.round(loadingProgress)}%`;
        }
    }, 200);
});
