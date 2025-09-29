/**
 * Content Management JavaScript
 * Handles content management functionality including tables, filters, and CRUD operations
 */

class ContentManager {
    constructor() {
        this.currentView = 'grid';
        this.currentFilters = {
            type: '',
            status: ''
        };
        this.selectedItems = new Set();
        this.contentData = [];
        
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeContentManager());
        } else {
            this.initializeContentManager();
        }
    }

    initializeContentManager() {
        this.initializeViewToggle();
        this.initializeFilters();
        this.initializeTable();
        this.initializeActions();
        this.initializeBulkActions();
        this.initializePagination();
        this.loadContentData();
        this.setupResponsiveBehavior();
    }

    // ===== VIEW TOGGLE FUNCTIONALITY =====
    initializeViewToggle() {
        const viewButtons = document.querySelectorAll('.view-btn');
        
        viewButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const view = btn.dataset.view;
                this.switchView(view);
            });
        });
    }

    switchView(view) {
        this.currentView = view;
        
        // Update button states
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === view);
        });
        
        // Toggle view containers
        const mobileView = document.getElementById('mobileContentGrid');
        const desktopView = document.getElementById('desktopContentTable');
        
        if (view === 'grid') {
            mobileView?.classList.remove('hidden');
            desktopView?.classList.add('hidden');
        } else {
            mobileView?.classList.add('hidden');
            desktopView?.classList.remove('hidden');
        }
        
        // Store preference
        localStorage.setItem('contentView', view);
        
        // Trigger resize event for charts/tables
        window.dispatchEvent(new Event('resize'));
    }

    // ===== FILTERS FUNCTIONALITY =====
    initializeFilters() {
        const typeFilter = document.getElementById('contentTypeFilter');
        const statusFilter = document.getElementById('statusFilter');
        
        if (typeFilter) {
            typeFilter.addEventListener('change', (e) => {
                this.currentFilters.type = e.target.value;
                this.applyFilters();
            });
        }
        
        if (statusFilter) {
            statusFilter.addEventListener('change', (e) => {
                this.currentFilters.status = e.target.value;
                this.applyFilters();
            });
        }
    }

    applyFilters() {
        const filteredData = this.contentData.filter(item => {
            const typeMatch = !this.currentFilters.type || item.type === this.currentFilters.type;
            const statusMatch = !this.currentFilters.status || item.status === this.currentFilters.status;
            return typeMatch && statusMatch;
        });
        
        this.renderContent(filteredData);
        this.updatePagination(filteredData.length);
    }

    // ===== TABLE FUNCTIONALITY =====
    initializeTable() {
        this.initializeSelectAll();
        this.initializeRowSelection();
        this.initializeSorting();
    }

    initializeSelectAll() {
        const selectAllCheckbox = document.getElementById('selectAll');
        
        if (selectAllCheckbox) {
            selectAllCheckbox.addEventListener('change', (e) => {
                const isChecked = e.target.checked;
                const rowCheckboxes = document.querySelectorAll('.row-select');
                
                rowCheckboxes.forEach(checkbox => {
                    checkbox.checked = isChecked;
                    const row = checkbox.closest('tr');
                    if (row) {
                        row.classList.toggle('selected', isChecked);
                    }
                });
                
                this.updateSelectedItems();
                this.updateBulkActions();
            });
        }
    }

    initializeRowSelection() {
        const rowCheckboxes = document.querySelectorAll('.row-select');
        
        rowCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const row = e.target.closest('tr');
                if (row) {
                    row.classList.toggle('selected', e.target.checked);
                }
                
                this.updateSelectedItems();
                this.updateBulkActions();
                this.updateSelectAllState();
            });
        });
    }

    updateSelectedItems() {
        this.selectedItems.clear();
        const checkedBoxes = document.querySelectorAll('.row-select:checked');
        
        checkedBoxes.forEach(checkbox => {
            const row = checkbox.closest('tr');
            if (row) {
                const id = row.dataset.id;
                if (id) {
                    this.selectedItems.add(id);
                }
            }
        });
    }

    updateSelectAllState() {
        const selectAllCheckbox = document.getElementById('selectAll');
        const rowCheckboxes = document.querySelectorAll('.row-select');
        const checkedBoxes = document.querySelectorAll('.row-select:checked');
        
        if (selectAllCheckbox && rowCheckboxes.length > 0) {
            selectAllCheckbox.checked = checkedBoxes.length === rowCheckboxes.length;
            selectAllCheckbox.indeterminate = checkedBoxes.length > 0 && checkedBoxes.length < rowCheckboxes.length;
        }
    }

    updateBulkActions() {
        const bulkActionsContainer = document.querySelector('.bulk-actions');
        
        if (bulkActionsContainer) {
            if (this.selectedItems.size > 0) {
                bulkActionsContainer.classList.add('active');
                bulkActionsContainer.querySelector('.selected-count').textContent = this.selectedItems.size;
            } else {
                bulkActionsContainer.classList.remove('active');
            }
        }
    }

    initializeSorting() {
        const sortableHeaders = document.querySelectorAll('th[data-sortable]');
        
        sortableHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const column = header.dataset.column;
                const currentSort = header.dataset.sort || 'asc';
                const newSort = currentSort === 'asc' ? 'desc' : 'asc';
                
                // Update all headers
                sortableHeaders.forEach(h => {
                    h.dataset.sort = '';
                    h.classList.remove('sort-asc', 'sort-desc');
                });
                
                // Update clicked header
                header.dataset.sort = newSort;
                header.classList.add(`sort-${newSort}`);
                
                // Sort data
                this.sortData(column, newSort);
            });
        });
    }

    sortData(column, direction) {
        this.contentData.sort((a, b) => {
            let aVal = a[column];
            let bVal = b[column];
            
            // Handle different data types
            if (typeof aVal === 'string') {
                aVal = aVal.toLowerCase();
                bVal = bVal.toLowerCase();
            }
            
            if (direction === 'asc') {
                return aVal > bVal ? 1 : -1;
            } else {
                return aVal < bVal ? 1 : -1;
            }
        });
        
        this.renderContent(this.contentData);
    }

    // ===== ACTIONS FUNCTIONALITY =====
    initializeActions() {
        this.initializeEditActions();
        this.initializeDeleteActions();
        this.initializeViewActions();
        this.initializeAddContent();
    }

    initializeEditActions() {
        const editButtons = document.querySelectorAll('.action-btn[title="تعديل"]');
        
        editButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const row = btn.closest('tr') || btn.closest('.content-card');
                const id = row?.dataset.id;
                if (id) {
                    this.editContent(id);
                }
            });
        });
    }

    initializeDeleteActions() {
        const deleteButtons = document.querySelectorAll('.action-btn[title="حذف"]');
        
        deleteButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const row = btn.closest('tr') || btn.closest('.content-card');
                const id = row?.dataset.id;
                if (id) {
                    this.deleteContent(id);
                }
            });
        });
    }

    initializeViewActions() {
        const viewButtons = document.querySelectorAll('.action-btn[title="عرض"]');
        
        viewButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const row = btn.closest('tr') || btn.closest('.content-card');
                const id = row?.dataset.id;
                if (id) {
                    this.viewContent(id);
                }
            });
        });
    }

    initializeAddContent() {
        // The add content button is now a link, so no event listener needed
        // The link will navigate to add-content.html automatically
        const addLink = document.getElementById('addContentBtn');
        
        if (addLink) {
            // Optional: Add any additional functionality if needed
            // For example, tracking clicks or showing loading state
            addLink.addEventListener('click', () => {
                console.log('Navigating to add content page...');
            });
        }
    }

    editContent(id) {
        const content = this.contentData.find(item => item.id === id);
        if (content) {
            console.log('Editing content:', content);
            // Navigate to edit page or show edit modal
            window.location.href = `edit-content.html?id=${id}`;
        }
    }

    deleteContent(id) {
        const content = this.contentData.find(item => item.id === id);
        if (content) {
            this.showConfirmDialog(
                'تأكيد الحذف',
                `هل أنت متأكد من حذف "${content.title}"؟`,
                () => {
                    this.performDelete(id);
                }
            );
        }
    }

    performDelete(id) {
        // Simulate API call
        this.setLoading(true);
        
        setTimeout(() => {
            this.contentData = this.contentData.filter(item => item.id !== id);
            this.renderContent(this.contentData);
            this.setLoading(false);
            this.showToast('تم حذف المحتوى بنجاح', 'success');
        }, 1000);
    }

    viewContent(id) {
        const content = this.contentData.find(item => item.id === id);
        if (content) {
            // Open in new tab or show preview modal
            window.open(`../${content.slug}`, '_blank');
        }
    }

    showAddContentModal() {
        // This function is no longer used since we navigate to add-content.html
        // Keeping for backward compatibility
        console.log('Redirecting to add content page...');
        window.location.href = 'add-content.html';
    }

    // ===== BULK ACTIONS =====
    initializeBulkActions() {
        this.createBulkActionsBar();
    }

    createBulkActionsBar() {
        const container = document.querySelector('.content-container');
        
        const bulkActionsHTML = `
            <div class="bulk-actions">
                <div class="bulk-actions-content">
                    <span class="selected-count">0</span>
                    <span>عنصر محدد</span>
                    <div class="bulk-buttons">
                        <button class="btn btn-secondary btn-sm" id="bulkPublish">
                            <i class="fas fa-check"></i>
                            نشر
                        </button>
                        <button class="btn btn-secondary btn-sm" id="bulkDraft">
                            <i class="fas fa-edit"></i>
                            مسودة
                        </button>
                        <button class="btn btn-danger btn-sm" id="bulkDelete">
                            <i class="fas fa-trash"></i>
                            حذف
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        container.insertAdjacentHTML('beforebegin', bulkActionsHTML);
        
        // Add event listeners
        document.getElementById('bulkPublish')?.addEventListener('click', () => this.bulkPublish());
        document.getElementById('bulkDraft')?.addEventListener('click', () => this.bulkDraft());
        document.getElementById('bulkDelete')?.addEventListener('click', () => this.bulkDelete());
    }

    bulkPublish() {
        if (this.selectedItems.size === 0) return;
        
        this.showConfirmDialog(
            'نشر المحتوى',
            `هل تريد نشر ${this.selectedItems.size} عنصر؟`,
            () => {
                this.performBulkAction('published');
            }
        );
    }

    bulkDraft() {
        if (this.selectedItems.size === 0) return;
        
        this.showConfirmDialog(
            'تحويل للمسودة',
            `هل تريد تحويل ${this.selectedItems.size} عنصر إلى مسودة؟`,
            () => {
                this.performBulkAction('draft');
            }
        );
    }

    bulkDelete() {
        if (this.selectedItems.size === 0) return;
        
        this.showConfirmDialog(
            'حذف المحتوى',
            `هل أنت متأكد من حذف ${this.selectedItems.size} عنصر؟`,
            () => {
                this.performBulkAction('delete');
            }
        );
    }

    performBulkAction(action) {
        this.setLoading(true);
        
        setTimeout(() => {
            if (action === 'delete') {
                this.contentData = this.contentData.filter(item => !this.selectedItems.has(item.id));
            } else {
                this.contentData.forEach(item => {
                    if (this.selectedItems.has(item.id)) {
                        item.status = action;
                    }
                });
            }
            
            this.selectedItems.clear();
            this.renderContent(this.contentData);
            this.setLoading(false);
            
            const actionText = {
                'published': 'تم نشر المحتوى',
                'draft': 'تم تحويل المحتوى إلى مسودة',
                'delete': 'تم حذف المحتوى'
            };
            
            this.showToast(actionText[action] || 'تم تنفيذ العملية بنجاح', 'success');
        }, 1000);
    }

    // ===== PAGINATION =====
    initializePagination() {
        const paginationBtns = document.querySelectorAll('.pagination-btn');
        
        paginationBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const page = parseInt(btn.textContent);
                
                if (!isNaN(page)) {
                    this.goToPage(page);
                } else if (btn.querySelector('.fa-chevron-right')) {
                    this.goToPreviousPage();
                } else if (btn.querySelector('.fa-chevron-left')) {
                    this.goToNextPage();
                }
            });
        });
    }

    goToPage(page) {
        console.log('Going to page:', page);
        // Update pagination UI and load data
    }

    goToPreviousPage() {
        const currentPage = document.querySelector('.pagination-btn.active')?.textContent;
        if (currentPage && parseInt(currentPage) > 1) {
            this.goToPage(parseInt(currentPage) - 1);
        }
    }

    goToNextPage() {
        const currentPage = document.querySelector('.pagination-btn.active')?.textContent;
        if (currentPage) {
            this.goToPage(parseInt(currentPage) + 1);
        }
    }

    updatePagination(totalItems) {
        // Update pagination info and buttons
        const infoElement = document.querySelector('.pagination-info');
        if (infoElement) {
            infoElement.textContent = `عرض 1-${Math.min(4, totalItems)} من ${totalItems} عنصر`;
        }
    }

    // ===== DATA MANAGEMENT =====
    loadContentData() {
        // Simulate API call
        this.contentData = [
            {
                id: '1',
                title: 'الصفحة الرئيسية',
                type: 'page',
                status: 'published',
                author: 'طارق عامر',
                createdDate: '15 يناير 2025',
                views: 1250,
                excerpt: 'صفحة الترحيب الرئيسية للموقع مع معلومات الشركة',
                slug: 'index.html'
            },
            {
                id: '2',
                title: 'من نحن',
                type: 'page',
                status: 'published',
                author: 'فاطمة أحمد',
                createdDate: '12 يناير 2025',
                views: 890,
                excerpt: 'تعريف بالشركة ورؤيتها ورسالتها',
                slug: 'about.html'
            },
            {
                id: '3',
                title: 'مشروع معرض الرياض الدولي',
                type: 'article',
                status: 'draft',
                author: 'خالد السعيد',
                createdDate: '10 يناير 2025',
                views: 0,
                excerpt: 'تفاصيل مشروع معرض الرياض الدولي 2025',
                slug: 'projects/riyadh-expo.html'
            },
            {
                id: '4',
                title: 'شركاتنا',
                type: 'page',
                status: 'published',
                author: 'طارق عامر',
                createdDate: '8 يناير 2025',
                views: 650,
                excerpt: 'عرض الشركات التابعة لمجموعة اتحاد البلاد',
                slug: 'companies.html'
            }
        ];
        
        this.renderContent(this.contentData);
    }

    renderContent(data) {
        this.renderMobileView(data);
        this.renderDesktopView(data);
    }

    renderMobileView(data) {
        const container = document.getElementById('mobileContentGrid');
        if (!container) return;
        
        container.innerHTML = data.map(item => this.createMobileCard(item)).join('');
        
        // Re-attach event listeners
        this.initializeActions();
    }

    renderDesktopView(data) {
        const tbody = document.querySelector('.data-table tbody');
        if (!tbody) return;
        
        tbody.innerHTML = data.map(item => this.createTableRow(item)).join('');
        
        // Re-attach event listeners
        this.initializeTable();
        this.initializeActions();
    }

    createMobileCard(item) {
        const statusClass = item.status === 'published' ? 'published' : 'draft';
        const statusIcon = item.status === 'published' ? 'check-circle' : 'edit';
        const statusText = item.status === 'published' ? 'منشور' : 'مسودة';
        
        return `
            <div class="content-card" data-id="${item.id}">
                <div class="content-card-header">
                    <div class="content-status ${statusClass}">
                        <i class="fas fa-${statusIcon}"></i>
                        ${statusText}
                    </div>
                    <div class="content-actions">
                        <button class="action-btn" title="تعديل">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn" title="حذف">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="content-card-body">
                    <h3 class="content-title">${item.title}</h3>
                    <p class="content-type">${item.type === 'page' ? 'صفحة' : 'مقال'}</p>
                    <p class="content-excerpt">${item.excerpt}</p>
                    <div class="content-meta">
                        <div class="meta-item">
                            <i class="fas fa-user"></i>
                            <span>${item.author}</span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-calendar"></i>
                            <span>${item.createdDate}</span>
                        </div>
                        <div class="meta-item">
                            <i class="fas fa-eye"></i>
                            <span>${item.views.toLocaleString()} مشاهدة</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    createTableRow(item) {
        const statusClass = item.status === 'published' ? 'published' : 'draft';
        const statusIcon = item.status === 'published' ? 'check-circle' : 'edit';
        const statusText = item.status === 'published' ? 'منشور' : 'مسودة';
        
        return `
            <tr data-id="${item.id}">
                <td>
                    <input type="checkbox" class="row-select">
                </td>
                <td>
                    <div class="title-cell">
                        <strong>${item.title}</strong>
                        <p class="excerpt">${item.excerpt}</p>
                    </div>
                </td>
                <td>
                    <span class="type-badge ${item.type}">${item.type === 'page' ? 'صفحة' : 'مقال'}</span>
                </td>
                <td>
                    <span class="status-badge ${statusClass}">
                        <i class="fas fa-${statusIcon}"></i>
                        ${statusText}
                    </span>
                </td>
                <td>${item.author}</td>
                <td>${item.createdDate}</td>
                <td>
                    <span class="views-count">${item.views.toLocaleString()}</span>
                </td>
                <td>
                    <div class="table-actions">
                        <button class="action-btn" title="تعديل">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn" title="عرض">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="action-btn danger" title="حذف">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }

    // ===== RESPONSIVE BEHAVIOR =====
    setupResponsiveBehavior() {
        // Load saved view preference
        const savedView = localStorage.getItem('contentView');
        if (savedView && ['grid', 'list'].includes(savedView)) {
            this.switchView(savedView);
        }
        
        // Handle window resize
        window.addEventListener('resize', this.debounce(() => {
            this.handleResponsiveChanges();
        }, 250));
    }

    handleResponsiveChanges() {
        // Auto-switch to appropriate view based on screen size
        if (window.innerWidth < 768 && this.currentView === 'list') {
            this.switchView('grid');
        }
    }

    // ===== UTILITY METHODS =====
    
    setLoading(loading) {
        const container = document.querySelector('.content-container');
        if (container) {
            container.classList.toggle('loading', loading);
        }
    }

    showConfirmDialog(title, message, onConfirm) {
        // Simple confirm dialog - in real app, use a proper modal
        if (confirm(`${title}\n\n${message}`)) {
            onConfirm();
        }
    }

    showToast(message, type = 'info', duration = 3000) {
        // Use the toast method from admin dashboard
        if (window.adminDashboard) {
            window.adminDashboard.showToast(message, type, duration);
        }
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
}

// Initialize content manager when DOM is ready
const contentManager = new ContentManager();

// Export for use in other modules
window.ContentManager = ContentManager;
