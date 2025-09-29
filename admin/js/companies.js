/**
 * Companies Management JavaScript
 * Handles all functionality for the companies management page
 */

class CompaniesManager {
    constructor() {
        console.log('CompaniesManager constructor called'); // Debug log
        this.companies = [
            {
                id: 1,
                name: 'شركة الأحداث المتقدمة',
                description: 'شركة رائدة في مجال صناعة الفعاليات والإنتاج الإعلامي',
                logo: 'https://via.placeholder.com/60x60/3b82f6/ffffff?text=EP',
                status: 'active',
                overview: 'شركة رائدة في مجال صناعة الفعاليات والإنتاج الإعلامي مع خبرة تزيد عن 12 عاماً في السوق المحلي والإقليمي.',
                banner: 'https://via.placeholder.com/1200x400/3b82f6/ffffff?text=شركة+الأحداث+المتقدمة',
                stats: {
                    years: '12',
                    events: '500',
                    clients: '250',
                    areas: '15'
                },
                pdf: '',
                services: [
                    { title: 'تنظيم الفعاليات', description: 'تنظيم وإدارة الفعاليات الكبرى', icon: 'fas fa-calendar-alt' },
                    { title: 'الإنتاج الإعلامي', description: 'إنتاج المحتوى الإعلامي والمرئي', icon: 'fas fa-video' },
                    { title: 'التصوير الاحترافي', description: 'خدمات التصوير الفوتوغرافي والفيديو', icon: 'fas fa-camera' }
                ],
                social: {
                    facebook: 'https://facebook.com/eventscompany',
                    twitter: 'https://twitter.com/eventscompany',
                    instagram: 'https://instagram.com/eventscompany',
                    linkedin: 'https://linkedin.com/company/eventscompany'
                },
                contact: {
                    email: 'info@events.com',
                    phone: '+966501234567'
                },
                map: 'https://maps.google.com/@24.7136,46.6753,15z'
            },
            {
                id: 2,
                name: 'شركة الإنتاج الإعلامي',
                description: 'شركة متخصصة في الإنتاج الإعلامي والمرئي',
                logo: 'https://via.placeholder.com/60x60/10b981/ffffff?text=MP',
                status: 'active',
                overview: 'شركة متخصصة في الإنتاج الإعلامي والمرئي مع فريق من الخبراء في مجال التصوير والإنتاج التلفزيوني.',
                banner: 'https://via.placeholder.com/1200x400/10b981/ffffff?text=شركة+الإنتاج+الإعلامي',
                stats: {
                    years: '8',
                    events: '300',
                    clients: '150',
                    areas: '8'
                },
                pdf: '',
                services: [
                    { title: 'الإنتاج التلفزيوني', description: 'إنتاج البرامج والمحتوى التلفزيوني', icon: 'fas fa-tv' },
                    { title: 'التصوير الفوتوغرافي', description: 'خدمات التصوير الفوتوغرافي والمهني', icon: 'fas fa-camera' },
                    { title: 'البث المباشر', description: 'خدمات البث المباشر والتغطية الإعلامية', icon: 'fas fa-broadcast-tower' }
                ],
                social: {
                    facebook: 'https://facebook.com/mediaproduction',
                    twitter: 'https://twitter.com/mediaproduction',
                    instagram: 'https://instagram.com/mediaproduction',
                    linkedin: 'https://linkedin.com/company/mediaproduction'
                },
                contact: {
                    email: 'info@media.com',
                    phone: '+966501234568'
                },
                map: 'https://maps.google.com/@24.7136,46.6753,15z'
            },
            {
                id: 3,
                name: 'شركة التقنية والتسويق',
                description: 'شركة متخصصة في التقنية والتسويق الرقمي',
                logo: 'https://via.placeholder.com/60x60/f59e0b/ffffff?text=TM',
                status: 'inactive',
                overview: 'شركة متخصصة في التقنية والتسويق الرقمي مع خبرة واسعة في تطوير الحلول التقنية والتسويق الإلكتروني.',
                banner: 'https://via.placeholder.com/1200x400/f59e0b/ffffff?text=شركة+التقنية+والتسويق',
                stats: {
                    years: '5',
                    events: '200',
                    clients: '100',
                    areas: '5'
                },
                pdf: '',
                services: [
                    { title: 'التطوير التقني', description: 'تطوير التطبيقات والمواقع الإلكترونية', icon: 'fas fa-code' },
                    { title: 'التسويق الرقمي', description: 'خدمات التسويق الرقمي والإعلان', icon: 'fas fa-bullhorn' },
                    { title: 'تحليل البيانات', description: 'تحليل البيانات وذكاء الأعمال', icon: 'fas fa-chart-line' }
                ],
                social: {
                    facebook: 'https://facebook.com/techmarketing',
                    twitter: 'https://twitter.com/techmarketing',
                    instagram: 'https://instagram.com/techmarketing',
                    linkedin: 'https://linkedin.com/company/techmarketing'
                },
                contact: {
                    email: 'info@tech.com',
                    phone: '+966501234569'
                },
                map: 'https://maps.google.com/@24.7136,46.6753,15z'
            }
        ];
        
        this.currentCompanyId = null;
        this.isEditing = false;
        
        this.initializeEventListeners();
        this.initializeFormValidation();
        this.initializeFileUpload();
        this.initializeSearch();
        this.initializeFilters();
        this.initializeDetailsCard();
        console.log('CompaniesManager initialization completed'); // Debug log
    }

    /**
     * Initialize all event listeners
     */
    initializeEventListeners() {
        console.log('initializeEventListeners called'); // Debug log
        // Add Company Button
        const addCompanyBtn = document.getElementById('addCompanyBtn');
        console.log('Add Company Button:', addCompanyBtn); // Debug log
        if (addCompanyBtn) {
            addCompanyBtn.addEventListener('click', () => {
                console.log('Add Company Button clicked!'); // Debug log
                this.openAddModal();
            });
        } else {
            console.error('Add Company Button not found!'); // Debug log
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
        
        // Add click listeners to modal backdrops
        const modals = ['companyModal', 'confirmModal'];
        modals.forEach(modalId => {
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.addEventListener('click', (e) => this.handleOutsideClick(e));
            }
        });
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
        console.log('openAddModal called'); // Debug log
        this.isEditing = false;
        this.currentCompanyId = null;
        this.resetForm();
        this.showModal('إضافة شركة جديدة');
    }

    /**
     * Open edit company modal
     */
    openEditModal(companyId) {
        console.log('openEditModal called with companyId:', companyId);
        console.log('Available companies:', this.companies);
        
        const company = this.companies.find(c => c.id === companyId);
        console.log('Found company:', company);
        
        if (!company) {
            console.error('Company not found with id:', companyId);
            return;
        }

        this.isEditing = true;
        this.currentCompanyId = companyId;
        console.log('Setting isEditing to true and currentCompanyId to:', companyId);
        
        // Reset form first to clear any previous data
        this.resetForm();
        
        // Then populate with company data
        this.populateDetailedForm(company);
        this.showModal('تعديل الشركة');
    }


    /**
     * Show modal
     */
    showModal(title) {
        console.log('showModal called with title:', title);
        const modal = document.getElementById('companyModal');
        const modalTitle = document.getElementById('modalTitle');
        
        console.log('Modal elements found:', {
            modal: !!modal,
            modalTitle: !!modalTitle
        });
        
        if (modal && modalTitle) {
            modalTitle.textContent = title;
            modal.classList.add('show');
            modal.style.display = 'flex';
            modal.style.visibility = 'visible';
            modal.style.opacity = '1';
            modal.style.zIndex = '99999';
            document.body.style.overflow = 'hidden';
            
            console.log('Modal shown successfully with title:', title);
            
            // Focus first input
            const firstInput = modal.querySelector('input, textarea, select');
            if (firstInput) {
                setTimeout(() => firstInput.focus(), 100);
                console.log('Focused first input:', firstInput);
            }
        } else {
            console.error('Modal or modalTitle not found!');
        }
    }

    /**
     * Close modal
     */
    closeModal() {
        const modal = document.getElementById('companyModal');
        if (modal) {
            modal.classList.remove('show');
            modal.style.display = 'none';
            modal.style.visibility = 'hidden';
            modal.style.opacity = '0';
            modal.style.zIndex = '-1';
            document.body.style.overflow = 'auto';
            this.resetForm();
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
            modal.style.visibility = 'visible';
            modal.style.opacity = '1';
            modal.style.zIndex = '99999';
            document.body.style.overflow = 'hidden';
        }
    }

    /**
     * Hide company
     */
    hideCompany(companyId) {
        const companyIndex = this.companies.findIndex(c => c.id === companyId);
        if (companyIndex !== -1) {
            this.companies[companyIndex].status = 'hidden';
            this.updateTable();
            this.showNotification('تم إخفاء الشركة بنجاح', 'success');
        }
    }

    /**
     * Close confirmation modal
     */
    closeConfirmModal() {
        const modal = document.getElementById('confirmModal');
        if (modal) {
            modal.style.display = 'none';
            modal.style.visibility = 'hidden';
            modal.style.opacity = '0';
            modal.style.zIndex = '-1';
            document.body.style.overflow = 'auto';
            this.currentCompanyId = null;
        }
    }

    /**
     * Reset form
     */
    resetForm() {
        console.log('resetForm called');
        
        const form = document.getElementById('companyForm');
        if (form) {
            form.reset();
            this.clearFieldErrors();
            this.hideImagePreview();
            this.updateCharCount();
            
            // Reset details card fields
            document.getElementById('companyOverview').value = '';
            document.getElementById('yearsExperience').value = '';
            document.getElementById('successfulEvents').value = '';
            document.getElementById('satisfiedClients').value = '';
            document.getElementById('coverageAreas').value = '';
            document.getElementById('facebookLink').value = '';
            document.getElementById('twitterLink').value = '';
            document.getElementById('instagramLink').value = '';
            document.getElementById('linkedinLink').value = '';
            document.getElementById('companyEmail').value = '';
            document.getElementById('companyPhone').value = '';
            document.getElementById('mapLink').value = '';
            
            // Reset services
            const servicesContainer = document.getElementById('servicesContainer');
            if (servicesContainer) {
                servicesContainer.innerHTML = '';
                this.addServiceToContainer(); // Add one default service
            }
            
            // Reset banner preview
            document.getElementById('bannerPreview').style.display = 'none';
            
            // Reset PDF preview
            document.getElementById('pdfPreview').style.display = 'none';
            
            // Reset map preview
            document.getElementById('mapPreview').style.display = 'none';
            
            // Update character counts
            this.updateOverviewCharCount();
            console.log('resetForm completed successfully');
        } else {
            console.error('companyForm not found in resetForm!');
        }
    }

    /**
     * Populate form with company data
     */
    populateForm(company) {
        console.log('populateForm called with company:', company);
        
        const form = document.getElementById('companyForm');
        if (!form) {
            console.error('companyForm not found!');
            return;
        }

        // Set form values
        const nameInput = document.getElementById('companyName');
        const descriptionTextarea = document.getElementById('companyDescription');
        const statusSelect = document.getElementById('companyStatus');

        console.log('Form elements found:', {
            nameInput: !!nameInput,
            descriptionTextarea: !!descriptionTextarea,
            statusSelect: !!statusSelect
        });

        if (nameInput) {
            nameInput.value = company.name;
            console.log('Set company name to:', company.name);
        }
        if (descriptionTextarea) {
            descriptionTextarea.value = company.description;
            console.log('Set company description to:', company.description);
            this.updateCharCount();
        }
        if (statusSelect) {
            statusSelect.value = company.status;
            console.log('Set company status to:', company.status);
        }

        // Show logo preview
        this.showImagePreview(company.logo);
        console.log('populateForm completed');
    }

    /**
     * Handle form submission
     */
    handleFormSubmit(e) {
        e.preventDefault();
        
        if (!this.validateForm()) {
            return;
        }

        const formData = this.getDetailedFormData();
        
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
            status: companyData.status,
            logo: companyData.logo || '../images/companies/default.jpg',
            overview: companyData.overview || '',
            banner: companyData.banner || '',
            stats: companyData.stats || { years: '0', events: '0', clients: '0', areas: '0' },
            pdf: companyData.pdf || '',
            services: companyData.services || [],
            social: companyData.social || { facebook: '', twitter: '', instagram: '', linkedin: '' },
            contact: companyData.contact || { email: '', phone: '' },
            map: companyData.map || ''
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
            status: companyData.status,
            logo: companyData.logo || this.companies[companyIndex].logo,
            overview: companyData.overview || this.companies[companyIndex].overview,
            banner: companyData.banner || this.companies[companyIndex].banner,
            stats: companyData.stats || this.companies[companyIndex].stats,
            pdf: companyData.pdf || this.companies[companyIndex].pdf,
            services: companyData.services || this.companies[companyIndex].services,
            social: companyData.social || this.companies[companyIndex].social,
            contact: companyData.contact || this.companies[companyIndex].contact,
            map: companyData.map || this.companies[companyIndex].map
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
        // Check if clicked element is the modal backdrop (not the modal content)
        if (e.target.classList.contains('modal') && e.target === e.currentTarget) {
            if (e.target.id === 'companyModal') {
                this.closeModal();
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
            // Close the currently visible modal
            const companyModal = document.getElementById('companyModal');
            const confirmModal = document.getElementById('confirmModal');
            
            if (companyModal && companyModal.style.display === 'flex') {
                this.closeModal();
            } else if (confirmModal && confirmModal.style.display === 'flex') {
                this.closeConfirmModal();
            }
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

    /**
     * Initialize details card functionality
     */
    initializeDetailsCard() {
        // Overview character count
        const overviewTextarea = document.getElementById('companyOverview');
        if (overviewTextarea) {
            overviewTextarea.addEventListener('input', this.updateOverviewCharCount.bind(this));
        }

        // Banner upload
        const bannerInput = document.getElementById('companyBanner');
        if (bannerInput) {
            bannerInput.addEventListener('change', this.handleBannerUpload.bind(this));
        }

        // PDF upload
        const pdfInput = document.getElementById('companyPDF');
        if (pdfInput) {
            pdfInput.addEventListener('change', this.handlePDFUpload.bind(this));
        }

        // Map link
        const mapInput = document.getElementById('mapLink');
        if (mapInput) {
            mapInput.addEventListener('input', this.handleMapLink.bind(this));
        }

        // Social media links validation
        const socialInputs = ['facebookLink', 'twitterLink', 'instagramLink', 'linkedinLink'];
        socialInputs.forEach(id => {
            const input = document.getElementById(id);
            if (input) {
                input.addEventListener('blur', (e) => this.validateSocialLink(e.target));
            }
        });

        // Contact validation
        const emailInput = document.getElementById('companyEmail');
        if (emailInput) {
            emailInput.addEventListener('blur', (e) => this.validateEmail(e.target));
        }

        const phoneInput = document.getElementById('companyPhone');
        if (phoneInput) {
            phoneInput.addEventListener('blur', (e) => this.validatePhone(e.target));
        }
    }

    /**
     * Update overview character count
     */
    updateOverviewCharCount() {
        const textarea = document.getElementById('companyOverview');
        const charCount = document.getElementById('overviewCharCount');
        
        if (textarea && charCount) {
            const count = textarea.value.length;
            charCount.textContent = count;
            
            if (count > 500) {
                charCount.style.color = 'var(--danger)';
            } else if (count > 400) {
                charCount.style.color = 'var(--warning)';
            } else {
                charCount.style.color = 'var(--gray-500)';
            }
        }
    }

    /**
     * Handle banner upload
     */
    handleBannerUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        // Validate file size (5MB max for images)
        if (file.size > 5 * 1024 * 1024) {
            this.showNotification('حجم الصورة يجب أن يكون أقل من 5MB', 'error');
            event.target.value = '';
            return;
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
            this.showNotification('يرجى رفع صورة فقط', 'error');
            event.target.value = '';
            return;
        }

        // Validate image dimensions
        const img = new Image();
        img.onload = () => {
            const aspectRatio = img.width / img.height;
            const recommendedRatio = 1200 / 400; // 3:1 ratio
            
            if (Math.abs(aspectRatio - recommendedRatio) > 0.5) {
                this.showNotification('نسبة العرض للارتفاع الموصى بها هي 3:1 (1200x400 بكسل)', 'warning');
            }
            
            // Show preview regardless of ratio
            this.showBannerPreview(file);
        };
        
        img.src = URL.createObjectURL(file);
    }

    /**
     * Handle PDF upload
     */
    handlePDFUpload(event) {
        const file = event.target.files[0];
        if (!file) return;

        // Validate file size (10MB max)
        if (file.size > 10 * 1024 * 1024) {
            this.showNotification('حجم الملف يجب أن يكون أقل من 10MB', 'error');
            event.target.value = '';
            return;
        }

        // Validate file type
        if (file.type !== 'application/pdf') {
            this.showNotification('يرجى رفع ملف PDF فقط', 'error');
            event.target.value = '';
            return;
        }

        // Show preview
        this.showPDFPreview(file);
    }

    /**
     * Show banner preview
     */
    showBannerPreview(file) {
        const preview = document.getElementById('bannerPreview');
        const previewImg = document.getElementById('bannerPreviewImg');
        
        if (preview && previewImg) {
            const reader = new FileReader();
            reader.onload = (e) => {
                previewImg.src = e.target.result;
                preview.style.display = 'block';
            };
            reader.readAsDataURL(file);
        }
    }

    /**
     * Show PDF preview
     */
    showPDFPreview(file) {
        const preview = document.getElementById('pdfPreview');
        const fileName = document.querySelector('#pdfPreview .file-name');
        
        if (preview && fileName) {
            fileName.textContent = file.name;
            preview.style.display = 'block';
        }
    }

    /**
     * Handle map link
     */
    handleMapLink(event) {
        const url = event.target.value.trim();
        const preview = document.getElementById('mapPreview');
        const iframe = document.getElementById('mapIframe');
        
        if (!url) {
            if (preview) preview.style.display = 'none';
            return;
        }

        if (this.isValidMapUrl(url) && preview && iframe) {
            const embedUrl = this.convertToEmbedUrl(url);
            iframe.src = embedUrl;
            preview.style.display = 'block';
        } else {
            if (preview) preview.style.display = 'none';
        }
    }

    /**
     * Validate map URL
     */
    isValidMapUrl(url) {
        return url.includes('maps.google.com') || url.includes('goo.gl/maps') || url.includes('maps.app.goo.gl');
    }

    /**
     * Convert map URL to embed URL
     */
    convertToEmbedUrl(url) {
        // Extract coordinates or place ID from URL
        let embedUrl = url;
        
        if (url.includes('/@')) {
            // Extract coordinates from URL like: /@lat,lng,zoom
            const coordsMatch = url.match(/\/@(-?\d+\.?\d*),(-?\d+\.?\d*),(\d+\.?\d*)z/);
            if (coordsMatch) {
                const [, lat, lng, zoom] = coordsMatch;
                embedUrl = `https://www.google.com/maps/embed/v1/view?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dO1l5Vx8X1pZc&center=${lat},${lng}&zoom=${zoom}`;
            }
        } else if (url.includes('place_id=')) {
            // Extract place ID
            const placeIdMatch = url.match(/place_id=([^&]+)/);
            if (placeIdMatch) {
                const placeId = placeIdMatch[1];
                embedUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dO1l5Vx8X1pZc&place_id=${placeId}`;
            }
        }
        
        return embedUrl;
    }

    /**
     * Validate social media link
     */
    validateSocialLink(input) {
        const value = input.value.trim();
        if (!value) return true;

        const urlPattern = /^https?:\/\/.+/;
        if (!urlPattern.test(value)) {
            this.showFieldError(input, 'يرجى إدخال رابط صحيح يبدأ بـ http:// أو https://');
            return false;
        }

        this.clearFieldError(input);
        return true;
    }

    /**
     * Validate email
     */
    validateEmail(input) {
        const value = input.value.trim();
        if (!value) return true;

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
            this.showFieldError(input, 'يرجى إدخال بريد إلكتروني صحيح');
            return false;
        }

        this.clearFieldError(input);
        return true;
    }

    /**
     * Validate phone number
     */
    validatePhone(input) {
        const value = input.value.trim();
        if (!value) return true;

        const phonePattern = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phonePattern.test(value.replace(/[\s\-\(\)]/g, ''))) {
            this.showFieldError(input, 'يرجى إدخال رقم هاتف صحيح');
            return false;
        }

        this.clearFieldError(input);
        return true;
    }

    /**
     * Get all form data including details
     */
    getDetailedFormData() {
        const basicData = this.getFormData();
        
        // Get services
        const services = [];
        const serviceItems = document.querySelectorAll('.service-item');
        serviceItems.forEach(item => {
            const title = item.querySelector('.service-title').value.trim();
            const description = item.querySelector('.service-description').value.trim();
            const icon = item.querySelector('.service-icon').value;
            
            if (title && description) {
                services.push({ title, description, icon });
            }
        });

        // Get statistics
        const stats = {
            years: document.getElementById('yearsExperience').value || '0',
            events: document.getElementById('successfulEvents').value || '0',
            clients: document.getElementById('satisfiedClients').value || '0',
            areas: document.getElementById('coverageAreas').value || '0'
        };

        // Get social media
        const social = {
            facebook: document.getElementById('facebookLink').value.trim(),
            twitter: document.getElementById('twitterLink').value.trim(),
            instagram: document.getElementById('instagramLink').value.trim(),
            linkedin: document.getElementById('linkedinLink').value.trim()
        };

        // Get contact
        const contact = {
            email: document.getElementById('companyEmail').value.trim(),
            phone: document.getElementById('companyPhone').value.trim()
        };

        return {
            ...basicData,
            overview: document.getElementById('companyOverview').value.trim(),
            banner: document.getElementById('companyBanner').files[0] || null,
            pdf: document.getElementById('companyPDF').files[0] || null,
            stats,
            services,
            social,
            contact,
            map: document.getElementById('mapLink').value.trim()
        };
    }

    /**
     * Populate detailed form data
     */
    populateDetailedForm(company) {
        console.log('populateDetailedForm called with company:', company);
        
        // Basic data
        this.populateForm(company);

        // Overview
        const overview = document.getElementById('companyOverview');
        if (overview) {
            overview.value = company.overview || '';
            this.updateOverviewCharCount();
        }

        // Statistics
        if (company.stats) {
            document.getElementById('yearsExperience').value = company.stats.years || '';
            document.getElementById('successfulEvents').value = company.stats.events || '';
            document.getElementById('satisfiedClients').value = company.stats.clients || '';
            document.getElementById('coverageAreas').value = company.stats.areas || '';
        }

        // Services
        const servicesContainer = document.getElementById('servicesContainer');
        if (servicesContainer && company.services && company.services.length > 0) {
            servicesContainer.innerHTML = '';
            company.services.forEach(service => {
                this.addServiceToContainer(service);
            });
        }

        // Social media
        if (company.social) {
            document.getElementById('facebookLink').value = company.social.facebook || '';
            document.getElementById('twitterLink').value = company.social.twitter || '';
            document.getElementById('instagramLink').value = company.social.instagram || '';
            document.getElementById('linkedinLink').value = company.social.linkedin || '';
        }

        // Contact
        if (company.contact) {
            document.getElementById('companyEmail').value = company.contact.email || '';
            document.getElementById('companyPhone').value = company.contact.phone || '';
        }

        // Map
        const mapLink = document.getElementById('mapLink');
        if (mapLink) {
            mapLink.value = company.map || '';
            this.handleMapLink({ target: mapLink });
        }

        // Banner preview if exists
        if (company.banner) {
            this.showBannerPreview({ name: company.banner });
        }

        // PDF preview if exists
        if (company.pdf) {
            this.showPDFPreview({ name: company.pdf });
        }
        
        console.log('populateDetailedForm completed successfully');
    }

    /**
     * Add service to container
     */
    addServiceToContainer(service = {}) {
        const container = document.getElementById('servicesContainer');
        if (!container) return;

        const serviceItem = document.createElement('div');
        serviceItem.className = 'service-item';
        serviceItem.innerHTML = `
            <div class="form-group">
                <label class="form-label">عنوان الخدمة</label>
                <input type="text" class="form-input service-title" placeholder="عنوان الخدمة" value="${service.title || ''}">
            </div>
            <div class="form-group">
                <label class="form-label">وصف الخدمة</label>
                <textarea class="form-textarea service-description" rows="2" placeholder="وصف قصير للخدمة">${service.description || ''}</textarea>
            </div>
            <div class="form-group">
                <label class="form-label">أيقونة الخدمة</label>
                <div class="icon-input-group">
                    <input type="text" class="form-input service-icon" placeholder="fas fa-calendar-alt" value="${service.icon || ''}">
                    <button type="button" class="btn btn-secondary btn-sm icon-preview-btn" onclick="previewIcon(this)">
                        <i class="fas fa-eye"></i>
                        معاينة
                    </button>
                </div>
                <div class="icon-preview" style="display: none;">
                    <i class="preview-icon"></i>
                    <small class="icon-help">أدخل كود الأيقونة من Font Awesome أو أي مكتبة أيقونات أخرى</small>
                </div>
            </div>
            <button type="button" class="btn btn-danger btn-sm remove-service" onclick="removeService(this)">
                <i class="fas fa-trash"></i>
                حذف الخدمة
            </button>
        `;

        container.appendChild(serviceItem);
    }
}

// Global functions for onclick handlers
function editCompany(companyId) {
    console.log('editCompany called with companyId:', companyId);
    console.log('window.companiesManager:', window.companiesManager);
    
    if (window.companiesManager) {
        console.log('Opening edit modal for company:', companyId);
        window.companiesManager.openEditModal(companyId);
    } else {
        console.error('CompaniesManager not found!');
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

// Details card functions
function toggleCard(cardId) {
    const header = document.querySelector(`#${cardId}Icon`).parentElement;
    const content = document.getElementById(`${cardId}Content`);
    const icon = document.getElementById(`${cardId}Icon`);
    
    if (content && icon) {
        const isCollapsed = content.classList.contains('collapsed');
        
        if (isCollapsed) {
            content.classList.remove('collapsed');
            header.classList.remove('collapsed');
            icon.style.transform = 'rotate(0deg)';
        } else {
            content.classList.add('collapsed');
            header.classList.add('collapsed');
            icon.style.transform = 'rotate(-90deg)';
        }
    }
}

function addService() {
    if (window.companiesManager) {
        window.companiesManager.addServiceToContainer();
    }
}

function removeService(button) {
    const serviceItem = button.closest('.service-item');
    if (serviceItem) {
        serviceItem.remove();
    }
}

function removePDF() {
    const pdfInput = document.getElementById('companyPDF');
    const preview = document.getElementById('pdfPreview');
    
    if (pdfInput) pdfInput.value = '';
    if (preview) preview.style.display = 'none';
}

function removeBanner() {
    const bannerInput = document.getElementById('companyBanner');
    const preview = document.getElementById('bannerPreview');
    
    if (bannerInput) bannerInput.value = '';
    if (preview) preview.style.display = 'none';
}

function hideCompany(companyId) {
    if (window.companiesManager) {
        window.companiesManager.hideCompany(companyId);
    }
}

function previewIcon(button) {
    const serviceItem = button.closest('.service-item');
    const iconInput = serviceItem.querySelector('.service-icon');
    const iconPreview = serviceItem.querySelector('.icon-preview');
    const previewIcon = serviceItem.querySelector('.preview-icon');
    
    if (!iconInput || !iconPreview || !previewIcon) return;
    
    const iconClass = iconInput.value.trim();
    
    if (!iconClass) {
        iconPreview.style.display = 'none';
        return;
    }
    
    // Clear existing classes and add new one
    previewIcon.className = `preview-icon ${iconClass}`;
    
    // Check if icon loaded successfully
    const testIcon = document.createElement('i');
    testIcon.className = iconClass;
    document.body.appendChild(testIcon);
    
    // Check if the icon is visible (Font Awesome loads icons as pseudo-elements)
    const computedStyle = window.getComputedStyle(testIcon, '::before');
    const content = computedStyle.getPropertyValue('content');
    
    document.body.removeChild(testIcon);
    
    if (content && content !== 'none' && content !== '""') {
        // Icon exists
        previewIcon.style.color = 'var(--primary)';
        iconPreview.style.display = 'flex';
    } else {
        // Icon doesn't exist
        previewIcon.style.color = 'var(--danger)';
        previewIcon.className = 'preview-icon fas fa-exclamation-triangle';
        iconPreview.style.display = 'flex';
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
