/**
 * Companies Management JavaScript
 * Handles all functionality for the companies management page
 */

class CompaniesManager {
    constructor() {
        this.companies = [
            {
                id: 1,
                name: 'شركة التقنية المتقدمة',
                description: 'شركة رائدة في مجال التقنية والحلول الذكية',
                logo: '../images/companies/company1.jpg',
                link: 'https://example.com/company1',
                status: 'active'
            },
            {
                id: 2,
                name: 'مجموعة الاستثمار الوطنية',
                description: 'مجموعة استثمارية رائدة في السوق المحلي',
                logo: '../images/companies/company2.jpg',
                link: 'https://example.com/company2',
                status: 'active'
            },
            {
                id: 3,
                name: 'شركة البناء الحديث',
                description: 'شركة متخصصة في أعمال البناء والتشييد',
                logo: '../images/companies/company3.jpg',
                link: '',
                status: 'inactive'
            }
        ];
        
        this.currentCompanyId = null;
        this.isEditing = false;
        
        this.initializeEventListeners();
        this.initializeFormValidation();
        this.initializeFileUpload();
        this.initializeSearch();
        this.initializeFilters();
    }

    /**
     * Initialize all event listeners
     */
    initializeEventListeners() {
        // Add Company Button
        const addCompanyBtn = document.getElementById('addCompanyBtn');
        if (addCompanyBtn) {
            addCompanyBtn.addEventListener('click', () => this.openAddModal());
        }

        // Modal Close Buttons
        const closeModalBtn = document.getElementById('closeModal');
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => this.closeModal());
        }

        const cancelBtn = document.getElementById('cancelBtn');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => this.closeModal());
        }

        // Preview Modal Close Buttons
        const closePreviewModalBtn = document.getElementById('closePreviewModal');
        if (closePreviewModalBtn) {
            closePreviewModalBtn.addEventListener('click', () => this.closePreviewModal());
        }

        const closePreviewBtn = document.getElementById('closePreviewBtn');
        if (closePreviewBtn) {
            closePreviewBtn.addEventListener('click', () => this.closePreviewModal());
        }

        // Confirmation Modal Close Buttons
        const closeConfirmModalBtn = document.getElementById('closeConfirmModal');
        if (closeConfirmModalBtn) {
            closeConfirmModalBtn.addEventListener('click', () => this.closeConfirmModal());
        }

        const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
        if (cancelDeleteBtn) {
            cancelDeleteBtn.addEventListener('click', () => this.closeConfirmModal());
        }

        const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
        if (confirmDeleteBtn) {
            confirmDeleteBtn.addEventListener('click', () => this.confirmDelete());
        }

        // Form Submission
        const companyForm = document.getElementById('companyForm');
        if (companyForm) {
            companyForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }

        // Character Count for Description
        const descriptionTextarea = document.getElementById('companyDescription');
        if (descriptionTextarea) {
            descriptionTextarea.addEventListener('input', () => this.updateCharCount());
        }

        // Close modals when clicking outside
        document.addEventListener('click', (e) => this.handleOutsideClick(e));
        
        // Close modals with Escape key
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
    }

    /**
     * Initialize form validation
     */
    initializeFormValidation() {
        const form = document.getElementById('companyForm');
        if (form) {
            const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => this.clearFieldError(input));
            });
        }
    }

    /**
     * Initialize file upload functionality
     */
    initializeFileUpload() {
        const uploadArea = document.getElementById('logoUploadArea');
        const fileInput = document.getElementById('companyLogo');
        
        if (uploadArea && fileInput) {
            // Click to upload
            uploadArea.addEventListener('click', () => fileInput.click());
            
            // File selection
            fileInput.addEventListener('change', (e) => this.handleFileSelect(e));
            
            // Drag and drop
            uploadArea.addEventListener('dragover', (e) => this.handleDragOver(e));
            uploadArea.addEventListener('dragleave', (e) => this.handleDragLeave(e));
            uploadArea.addEventListener('drop', (e) => this.handleDrop(e));
        }
    }

    /**
     * Initialize search functionality
     */
    initializeSearch() {
        const searchInput = document.getElementById('searchCompanies');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        }
    }

    /**
     * Initialize filters
     */
    initializeFilters() {
        const statusFilter = document.getElementById('statusFilter');
        if (statusFilter) {
            statusFilter.addEventListener('change', (e) => this.handleStatusFilter(e.target.value));
        }
    }

    /**
     * Open add company modal
     */
    openAddModal() {
        this.isEditing = false;
        this.currentCompanyId = null;
        this.resetForm();
        this.showModal('إضافة شركة جديدة');
    }

    /**
     * Open edit company modal
     */
    openEditModal(companyId) {
        const company = this.companies.find(c => c.id === companyId);
        if (!company) return;

        this.isEditing = true;
        this.currentCompanyId = companyId;
        this.populateForm(company);
        this.showModal('تعديل الشركة');
    }

    /**
     * Show modal
     */
    showModal(title) {
        const modal = document.getElementById('companyModal');
        const modalTitle = document.getElementById('modalTitle');
        
        if (modal && modalTitle) {
            modalTitle.textContent = title;
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            
            // Focus first input
            const firstInput = modal.querySelector('input, textarea, select');
            if (firstInput) {
                setTimeout(() => firstInput.focus(), 100);
            }
        }
    }

    /**
     * Close modal
     */
    closeModal() {
        const modal = document.getElementById('companyModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            this.resetForm();
        }
    }

    /**
     * Show preview modal
     */
    showPreviewModal(companyId) {
        const company = this.companies.find(c => c.id === companyId);
        if (!company) return;

        const modal = document.getElementById('previewModal');
        const previewLogo = document.getElementById('previewLogo');
        const previewName = document.getElementById('previewName');
        const previewDescription = document.getElementById('previewDescription');
        const previewLink = document.getElementById('previewLink');

        if (modal && previewLogo && previewName && previewDescription && previewLink) {
            previewLogo.src = company.logo;
            previewLogo.alt = company.name;
            previewName.textContent = company.name;
            previewDescription.textContent = company.description;
            
            if (company.link) {
                previewLink.href = company.link;
                previewLink.style.display = 'inline-flex';
            } else {
                previewLink.style.display = 'none';
            }

            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }

    /**
     * Close preview modal
     */
    closePreviewModal() {
        const modal = document.getElementById('previewModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    /**
     * Show confirmation modal
     */
    showConfirmModal(companyId) {
        this.currentCompanyId = companyId;
        const modal = document.getElementById('confirmModal');
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }

    /**
     * Close confirmation modal
     */
    closeConfirmModal() {
        const modal = document.getElementById('confirmModal');
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
            this.currentCompanyId = null;
        }
    }

    /**
     * Reset form
     */
    resetForm() {
        const form = document.getElementById('companyForm');
        if (form) {
            form.reset();
            this.clearFieldErrors();
            this.hideImagePreview();
            this.updateCharCount();
        }
    }

    /**
     * Populate form with company data
     */
    populateForm(company) {
        const form = document.getElementById('companyForm');
        if (!form) return;

        // Set form values
        const nameInput = document.getElementById('companyName');
        const descriptionTextarea = document.getElementById('companyDescription');
        const linkInput = document.getElementById('companyLink');
        const statusSelect = document.getElementById('companyStatus');

        if (nameInput) nameInput.value = company.name;
        if (descriptionTextarea) {
            descriptionTextarea.value = company.description;
            this.updateCharCount();
        }
        if (linkInput) linkInput.value = company.link;
        if (statusSelect) statusSelect.value = company.status;

        // Show logo preview
        this.showImagePreview(company.logo);
    }

    /**
     * Handle form submission
     */
    handleFormSubmit(e) {
        e.preventDefault();
        
        if (!this.validateForm()) {
            return;
        }

        const formData = this.getFormData();
        
        if (this.isEditing) {
            this.updateCompany(this.currentCompanyId, formData);
        } else {
            this.addCompany(formData);
        }
        
        this.closeModal();
    }

    /**
     * Get form data
     */
    getFormData() {
        const form = document.getElementById('companyForm');
        if (!form) return null;

        const formData = new FormData(form);
        const fileInput = document.getElementById('companyLogo');
        
        return {
            name: formData.get('companyName') || document.getElementById('companyName').value,
            description: formData.get('companyDescription') || document.getElementById('companyDescription').value,
            link: formData.get('companyLink') || document.getElementById('companyLink').value,
            status: formData.get('companyStatus') || document.getElementById('companyStatus').value,
            logo: fileInput.files[0] || this.getCurrentLogo()
        };
    }

    /**
     * Get current logo (for editing)
     */
    getCurrentLogo() {
        if (this.isEditing && this.currentCompanyId) {
            const company = this.companies.find(c => c.id === this.currentCompanyId);
            return company ? company.logo : null;
        }
        return null;
    }

    /**
     * Add new company
     */
    addCompany(companyData) {
        const newCompany = {
            id: Date.now(),
            name: companyData.name,
            description: companyData.description,
            link: companyData.link,
            status: companyData.status,
            logo: companyData.logo || '../images/companies/default.jpg'
        };

        this.companies.push(newCompany);
        this.updateTable();
        this.showNotification('تم إضافة الشركة بنجاح', 'success');
    }

    /**
     * Update existing company
     */
    updateCompany(companyId, companyData) {
        const companyIndex = this.companies.findIndex(c => c.id === companyId);
        if (companyIndex === -1) return;

        this.companies[companyIndex] = {
            ...this.companies[companyIndex],
            name: companyData.name,
            description: companyData.description,
            link: companyData.link,
            status: companyData.status,
            logo: companyData.logo || this.companies[companyIndex].logo
        };

        this.updateTable();
        this.showNotification('تم تحديث الشركة بنجاح', 'success');
    }

    /**
     * Delete company
     */
    deleteCompany(companyId) {
        this.companies = this.companies.filter(c => c.id !== companyId);
        this.updateTable();
        this.showNotification('تم حذف الشركة بنجاح', 'success');
    }

    /**
     * Confirm delete
     */
    confirmDelete() {
        if (this.currentCompanyId) {
            this.deleteCompany(this.currentCompanyId);
            this.closeConfirmModal();
        }
    }

    /**
     * Update table display
     */
    updateTable() {
        // This would typically update the DOM
        // For now, we'll just log the companies
        console.log('Companies updated:', this.companies);
    }

    /**
     * Handle file selection
     */
    handleFileSelect(e) {
        const file = e.target.files[0];
        if (file) {
            this.validateImageFile(file);
        }
    }

    /**
     * Handle drag over
     */
    handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.classList.add('dragover');
    }

    /**
     * Handle drag leave
     */
    handleDragLeave(e) {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.classList.remove('dragover');
    }

    /**
     * Handle drop
     */
    handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.classList.remove('dragover');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            this.validateImageFile(files[0]);
        }
    }

    /**
     * Validate image file
     */
    validateImageFile(file) {
        if (!file.type.startsWith('image/')) {
            this.showNotification('يرجى اختيار ملف صورة صالح', 'error');
            return;
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB
            this.showNotification('حجم الصورة يجب أن يكون أقل من 5 ميجابايت', 'error');
            return;
        }

        this.previewImage(file);
    }

    /**
     * Preview image
     */
    previewImage(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            this.showImagePreview(e.target.result);
        };
        reader.readAsDataURL(file);
    }

    /**
     * Show image preview
     */
    showImagePreview(src) {
        const preview = document.getElementById('logoPreview');
        const previewImg = document.getElementById('previewImg');
        
        if (preview && previewImg) {
            previewImg.src = src;
            preview.style.display = 'block';
        }
    }

    /**
     * Hide image preview
     */
    hideImagePreview() {
        const preview = document.getElementById('logoPreview');
        if (preview) {
            preview.style.display = 'none';
        }
    }

    /**
     * Remove logo
     */
    removeLogo() {
        const fileInput = document.getElementById('companyLogo');
        if (fileInput) {
            fileInput.value = '';
        }
        this.hideImagePreview();
    }

    /**
     * Update character count
     */
    updateCharCount() {
        const textarea = document.getElementById('companyDescription');
        const charCount = document.getElementById('charCount');
        
        if (textarea && charCount) {
            const count = textarea.value.length;
            charCount.textContent = count;
            
            if (count > 300) {
                charCount.style.color = 'var(--danger)';
            } else if (count > 250) {
                charCount.style.color = 'var(--warning)';
            } else {
                charCount.style.color = 'var(--gray-500)';
            }
        }
    }

    /**
     * Handle search
     */
    handleSearch(query) {
        const filteredCompanies = this.companies.filter(company =>
            company.name.toLowerCase().includes(query.toLowerCase()) ||
            company.description.toLowerCase().includes(query.toLowerCase())
        );
        
        this.filterTable(filteredCompanies);
    }

    /**
     * Handle status filter
     */
    handleStatusFilter(status) {
        if (!status) {
            this.filterTable(this.companies);
            return;
        }
        
        const filteredCompanies = this.companies.filter(company => company.status === status);
        this.filterTable(filteredCompanies);
    }

    /**
     * Filter table
     */
    filterTable(companies) {
        // This would typically update the DOM
        // For now, we'll just log the filtered companies
        console.log('Filtered companies:', companies);
    }

    /**
     * Validate form
     */
    validateForm() {
        const form = document.getElementById('companyForm');
        if (!form) return false;

        let isValid = true;
        const requiredFields = form.querySelectorAll('input[required], textarea[required], select[required]');
        
        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    /**
     * Validate individual field
     */
    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Check if required field is empty
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'هذا الحقل مطلوب';
        }

        // Additional validation for specific fields
        if (field.id === 'companyName' && value && value.length < 2) {
            isValid = false;
            errorMessage = 'اسم الشركة يجب أن يكون على الأقل حرفين';
        }

        if (field.id === 'companyDescription' && value && value.length < 10) {
            isValid = false;
            errorMessage = 'وصف الشركة يجب أن يكون على الأقل 10 أحرف';
        }

        if (field.id === 'companyLink' && value && !this.isValidUrl(value)) {
            isValid = false;
            errorMessage = 'يرجى إدخال رابط صحيح';
        }

        this.showFieldError(field, errorMessage);
        return isValid;
    }

    /**
     * Show field error
     */
    showFieldError(field, message) {
        this.clearFieldError(field);
        
        if (message) {
            field.classList.add('error');
            const errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            errorDiv.textContent = message;
            field.parentNode.appendChild(errorDiv);
        }
    }

    /**
     * Clear field error
     */
    clearFieldError(field) {
        field.classList.remove('error');
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    /**
     * Clear all field errors
     */
    clearFieldErrors() {
        const errorFields = document.querySelectorAll('.error');
        errorFields.forEach(field => this.clearFieldError(field));
    }

    /**
     * Validate URL
     */
    isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }

    /**
     * Handle outside click
     */
    handleOutsideClick(e) {
        if (e.target.classList.contains('modal')) {
            if (e.target.id === 'companyModal') {
                this.closeModal();
            } else if (e.target.id === 'previewModal') {
                this.closePreviewModal();
            } else if (e.target.id === 'confirmModal') {
                this.closeConfirmModal();
            }
        }
    }

    /**
     * Handle key down events
     */
    handleKeyDown(e) {
        if (e.key === 'Escape') {
            this.closeModal();
            this.closePreviewModal();
            this.closeConfirmModal();
        }
    }

    /**
     * Show notification
     */
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;

        // Add to page
        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);

        // Auto hide after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);

        // Close button functionality
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        });
    }
}

// Global functions for onclick handlers
function editCompany(companyId) {
    if (window.companiesManager) {
        window.companiesManager.openEditModal(companyId);
    }
}

function previewCompany(companyId) {
    if (window.companiesManager) {
        window.companiesManager.showPreviewModal(companyId);
    }
}

function deleteCompany(companyId) {
    if (window.companiesManager) {
        window.companiesManager.showConfirmModal(companyId);
    }
}

function removeLogo() {
    if (window.companiesManager) {
        window.companiesManager.removeLogo();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.companiesManager = new CompaniesManager();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CompaniesManager;
}
