/**
 * Manage Company JavaScript
 * Handles all functionality for the advanced company management page
 */

class ManageCompanyManager {
    constructor() {
        this.companies = [
            {
                id: 1,
                name: 'شركة الأحداث المتقدمة',
                field: 'events',
                description: 'شركة رائدة في مجال صناعة الفعاليات والحفلات، تقدم خدمات متكاملة من التخطيط حتى التنفيذ مع فريق محترف من ذوي الخبرة.',
                logo: 'https://via.placeholder.com/200x200/3b82f6/ffffff?text=EP',
                pdf: null,
                stats: {
                    experienceYears: 15,
                    eventsCount: 500,
                    clientsCount: 150,
                    coverageAreas: 'الرياض، جدة، الدمام، الخبر'
                },
                services: [
                    {
                        title: 'تخطيط الفعاليات',
                        description: 'تخطيط شامل ومفصل لجميع أنواع الفعاليات',
                        icon: 'fas fa-calendar-alt'
                    },
                    {
                        title: 'الإنتاج الإعلامي',
                        description: 'إنتاج محتوى إعلامي احترافي للفعاليات',
                        icon: 'fas fa-video'
                    }
                ],
                contact: {
                    email: 'info@events-pro.com',
                    phone: '+966501234567',
                    location: 'https://maps.google.com/...'
                },
                social: {
                    facebook: 'https://facebook.com/events-pro',
                    twitter: 'https://twitter.com/events-pro',
                    instagram: 'https://instagram.com/events-pro',
                    linkedin: 'https://linkedin.com/company/events-pro'
                },
                status: 'active'
            },
            {
                id: 2,
                name: 'مجموعة الإنتاج الإعلامي',
                field: 'media',
                description: 'مجموعة متخصصة في الإنتاج الإعلامي والتسويق الرقمي، تقدم حلول إبداعية للشركات والمؤسسات.',
                logo: 'https://via.placeholder.com/200x200/10b981/ffffff?text=MP',
                pdf: null,
                stats: {
                    experienceYears: 12,
                    eventsCount: 1000,
                    clientsCount: 300,
                    coverageAreas: 'جميع مناطق المملكة'
                },
                services: [
                    {
                        title: 'الإنتاج التلفزيوني',
                        description: 'إنتاج برامج تلفزيونية وثائقية',
                        icon: 'fas fa-tv'
                    },
                    {
                        title: 'التسويق الرقمي',
                        description: 'حملات تسويقية رقمية متكاملة',
                        icon: 'fas fa-bullhorn'
                    }
                ],
                contact: {
                    email: 'contact@media-group.com',
                    phone: '+966502345678',
                    location: 'https://maps.google.com/...'
                },
                social: {
                    facebook: 'https://facebook.com/media-group',
                    twitter: 'https://twitter.com/media-group',
                    instagram: 'https://instagram.com/media-group',
                    linkedin: 'https://linkedin.com/company/media-group'
                },
                status: 'active'
            },
            {
                id: 3,
                name: 'شركة التقنية والتسويق',
                field: 'technology',
                description: 'شركة متخصصة في حلول التقنية والتسويق الرقمي، تقدم خدمات مبتكرة للشركات الناشئة والمؤسسات الكبيرة.',
                logo: 'https://via.placeholder.com/200x200/f59e0b/ffffff?text=TM',
                pdf: null,
                stats: {
                    experienceYears: 8,
                    eventsCount: 200,
                    clientsCount: 200,
                    coverageAreas: 'الرياض، جدة'
                },
                services: [
                    {
                        title: 'تطوير المواقع',
                        description: 'تطوير مواقع ويب احترافية ومتجاوبة',
                        icon: 'fas fa-code'
                    },
                    {
                        title: 'التسويق الإلكتروني',
                        description: 'حملات تسويقية إلكترونية فعالة',
                        icon: 'fas fa-chart-line'
                    }
                ],
                contact: {
                    email: 'hello@tech-marketing.com',
                    phone: '+966503456789',
                    location: 'https://maps.google.com/...'
                },
                social: {
                    facebook: 'https://facebook.com/tech-marketing',
                    twitter: 'https://twitter.com/tech-marketing',
                    instagram: 'https://instagram.com/tech-marketing',
                    linkedin: 'https://linkedin.com/company/tech-marketing'
                },
                status: 'inactive'
            }
        ];
        
        this.currentCompanyId = null;
        this.isEditing = false;
        this.serviceCounter = 0;
        
        this.initializeEventListeners();
        this.initializeFormValidation();
        this.initializeFileUploads();
        this.initializeSearch();
        this.initializeFilters();
        this.initializeServices();
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
    initializeFileUploads() {
        // Logo Upload
        const logoUploadArea = document.getElementById('logoUploadArea');
        const logoInput = document.getElementById('companyLogo');
        
        if (logoUploadArea && logoInput) {
            logoUploadArea.addEventListener('click', () => logoInput.click());
            logoInput.addEventListener('change', (e) => this.handleLogoSelect(e));
            this.setupDragAndDrop(logoUploadArea, logoInput, 'logo');
        }

        // PDF Upload
        const pdfUploadArea = document.getElementById('pdfUploadArea');
        const pdfInput = document.getElementById('companyPdf');
        
        if (pdfUploadArea && pdfInput) {
            pdfUploadArea.addEventListener('click', () => pdfInput.click());
            pdfInput.addEventListener('change', (e) => this.handlePdfSelect(e));
            this.setupDragAndDrop(pdfUploadArea, pdfInput, 'pdf');
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
        const fieldFilter = document.getElementById('fieldFilter');
        if (fieldFilter) {
            fieldFilter.addEventListener('change', (e) => this.handleFieldFilter(e.target.value));
        }

        const statusFilter = document.getElementById('statusFilter');
        if (statusFilter) {
            statusFilter.addEventListener('change', (e) => this.handleStatusFilter(e.target.value));
        }
    }

    /**
     * Initialize services functionality
     */
    initializeServices() {
        this.serviceCounter = 1;
    }

    /**
     * Setup drag and drop for file uploads
     */
    setupDragAndDrop(uploadArea, fileInput, type) {
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.stopPropagation();
            uploadArea.classList.add('dragover');
        });

        uploadArea.addEventListener('dragleave', (e) => {
            e.preventDefault();
            e.stopPropagation();
            uploadArea.classList.remove('dragover');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            e.stopPropagation();
            uploadArea.classList.remove('dragover');
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                fileInput.files = files;
                if (type === 'logo') {
                    this.handleLogoSelect({ target: { files: files } });
                } else if (type === 'pdf') {
                    this.handlePdfSelect({ target: { files: files } });
                }
            }
        });
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
        const previewField = document.getElementById('previewField');
        const previewStatus = document.getElementById('previewStatus');
        const previewDescription = document.getElementById('previewDescription');
        const previewStats = document.getElementById('previewStats');
        const previewServices = document.getElementById('previewServices');
        const previewContact = document.getElementById('previewContact');
        const previewSocial = document.getElementById('previewSocial');
        const viewCompanyBtn = document.getElementById('viewCompanyBtn');

        if (modal && previewLogo && previewName) {
            // Basic Info
            previewLogo.src = company.logo;
            previewLogo.alt = company.name;
            previewName.textContent = company.name;
            previewField.textContent = this.getFieldName(company.field);
            previewField.className = `preview-field field-badge field-${company.field}`;
            previewStatus.textContent = company.status === 'active' ? 'مفعل' : 'غير مفعل';
            previewStatus.className = `preview-status status-badge status-${company.status}`;
            previewDescription.textContent = company.description;

            // Stats
            this.renderPreviewStats(previewStats, company.stats);

            // Services
            this.renderPreviewServices(previewServices, company.services);

            // Contact
            this.renderPreviewContact(previewContact, company.contact);

            // Social Links
            this.renderPreviewSocial(previewSocial, company.social);

            // View Company Button
            if (viewCompanyBtn) {
                viewCompanyBtn.href = `#company-${company.id}`;
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
            this.hidePdfPreview();
            this.updateCharCount();
            this.resetServices();
        }
    }

    /**
     * Populate form with company data
     */
    populateForm(company) {
        const form = document.getElementById('companyForm');
        if (!form) return;

        // Basic Info
        document.getElementById('companyName').value = company.name;
        document.getElementById('companyField').value = company.field;
        document.getElementById('companyDescription').value = company.description;
        document.getElementById('companyStatus').value = company.status;

        // Stats
        document.getElementById('experienceYears').value = company.stats.experienceYears;
        document.getElementById('eventsCount').value = company.stats.eventsCount;
        document.getElementById('clientsCount').value = company.stats.clientsCount;
        document.getElementById('coverageAreas').value = company.stats.coverageAreas;

        // Contact
        document.getElementById('companyEmail').value = company.contact.email;
        document.getElementById('companyPhone').value = company.contact.phone;
        document.getElementById('companyLocation').value = company.contact.location;

        // Social
        document.getElementById('facebookLink').value = company.social.facebook || '';
        document.getElementById('twitterLink').value = company.social.twitter || '';
        document.getElementById('instagramLink').value = company.social.instagram || '';
        document.getElementById('linkedinLink').value = company.social.linkedin || '';

        // Logo
        this.showImagePreview(company.logo);

        // PDF
        if (company.pdf) {
            this.showPdfPreview(company.pdf.name);
        }

        // Services
        this.populateServices(company.services);

        this.updateCharCount();
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

        const services = this.getServicesData();
        
        return {
            name: document.getElementById('companyName').value,
            field: document.getElementById('companyField').value,
            description: document.getElementById('companyDescription').value,
            status: document.getElementById('companyStatus').value,
            logo: document.getElementById('companyLogo').files[0] || this.getCurrentLogo(),
            pdf: document.getElementById('companyPdf').files[0] || this.getCurrentPdf(),
            stats: {
                experienceYears: parseInt(document.getElementById('experienceYears').value),
                eventsCount: parseInt(document.getElementById('eventsCount').value) || 0,
                clientsCount: parseInt(document.getElementById('clientsCount').value) || 0,
                coverageAreas: document.getElementById('coverageAreas').value
            },
            services: services,
            contact: {
                email: document.getElementById('companyEmail').value,
                phone: document.getElementById('companyPhone').value,
                location: document.getElementById('companyLocation').value
            },
            social: {
                facebook: document.getElementById('facebookLink').value,
                twitter: document.getElementById('twitterLink').value,
                instagram: document.getElementById('instagramLink').value,
                linkedin: document.getElementById('linkedinLink').value
            }
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
     * Get current PDF (for editing)
     */
    getCurrentPdf() {
        if (this.isEditing && this.currentCompanyId) {
            const company = this.companies.find(c => c.id === this.currentCompanyId);
            return company ? company.pdf : null;
        }
        return null;
    }

    /**
     * Get services data from form
     */
    getServicesData() {
        const services = [];
        const serviceItems = document.querySelectorAll('.service-item');
        
        serviceItems.forEach(item => {
            const title = item.querySelector('.service-title').value;
            const description = item.querySelector('.service-description').value;
            const icon = item.querySelector('.service-icon').value;
            
            if (title && description) {
                services.push({ title, description, icon });
            }
        });
        
        return services;
    }

    /**
     * Add new company
     */
    addCompany(companyData) {
        const newCompany = {
            id: Date.now(),
            name: companyData.name,
            field: companyData.field,
            description: companyData.description,
            status: companyData.status,
            logo: companyData.logo || 'https://via.placeholder.com/200x200/6b7280/ffffff?text=Logo',
            pdf: companyData.pdf,
            stats: companyData.stats,
            services: companyData.services,
            contact: companyData.contact,
            social: companyData.social
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
            field: companyData.field,
            description: companyData.description,
            status: companyData.status,
            logo: companyData.logo || this.companies[companyIndex].logo,
            pdf: companyData.pdf || this.companies[companyIndex].pdf,
            stats: companyData.stats,
            services: companyData.services,
            contact: companyData.contact,
            social: companyData.social
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
     * Handle logo file selection
     */
    handleLogoSelect(e) {
        const file = e.target.files[0];
        if (file) {
            this.validateImageFile(file);
        }
    }

    /**
     * Handle PDF file selection
     */
    handlePdfSelect(e) {
        const file = e.target.files[0];
        if (file) {
            this.validatePdfFile(file);
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
     * Validate PDF file
     */
    validatePdfFile(file) {
        if (file.type !== 'application/pdf') {
            this.showNotification('يرجى اختيار ملف PDF صالح', 'error');
            return;
        }

        if (file.size > 10 * 1024 * 1024) { // 10MB
            this.showNotification('حجم الملف يجب أن يكون أقل من 10 ميجابايت', 'error');
            return;
        }

        this.previewPdf(file);
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
     * Preview PDF
     */
    previewPdf(file) {
        this.showPdfPreview(file.name);
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
     * Show PDF preview
     */
    showPdfPreview(fileName) {
        const preview = document.getElementById('pdfPreview');
        const pdfName = document.getElementById('pdfName');
        
        if (preview && pdfName) {
            pdfName.textContent = fileName;
            preview.style.display = 'block';
        }
    }

    /**
     * Hide PDF preview
     */
    hidePdfPreview() {
        const preview = document.getElementById('pdfPreview');
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
     * Remove PDF
     */
    removePdf() {
        const fileInput = document.getElementById('companyPdf');
        if (fileInput) {
            fileInput.value = '';
        }
        this.hidePdfPreview();
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
     * Add new service
     */
    addService() {
        const container = document.getElementById('servicesContainer');
        if (!container) return;

        const serviceHtml = `
            <div class="service-item">
                <div class="form-row">
                    <div class="form-group">
                        <label class="form-label">عنوان الخدمة</label>
                        <input type="text" class="form-input service-title" placeholder="عنوان الخدمة">
                    </div>
                    <div class="form-group">
                        <label class="form-label">أيقونة الخدمة</label>
                        <select class="form-select service-icon">
                            <option value="fas fa-calendar-alt">تقويم</option>
                            <option value="fas fa-video">فيديو</option>
                            <option value="fas fa-camera">كاميرا</option>
                            <option value="fas fa-microphone">ميكروفون</option>
                            <option value="fas fa-lightbulb">إضاءة</option>
                            <option value="fas fa-music">موسيقى</option>
                            <option value="fas fa-code">برمجة</option>
                            <option value="fas fa-chart-line">تحليلات</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="form-label">الإجراء</label>
                        <button type="button" class="btn btn-danger btn-sm" onclick="removeService(this)">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="form-group">
                    <label class="form-label">وصف الخدمة</label>
                    <textarea class="form-textarea service-description" rows="2" placeholder="وصف مختصر للخدمة"></textarea>
                </div>
            </div>
        `;

        container.insertAdjacentHTML('beforeend', serviceHtml);
    }

    /**
     * Remove service
     */
    removeService(button) {
        const serviceItem = button.closest('.service-item');
        if (serviceItem) {
            serviceItem.remove();
        }
    }

    /**
     * Populate services in form
     */
    populateServices(services) {
        const container = document.getElementById('servicesContainer');
        if (!container) return;

        container.innerHTML = '';

        services.forEach(service => {
            const serviceHtml = `
                <div class="service-item">
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label">عنوان الخدمة</label>
                            <input type="text" class="form-input service-title" placeholder="عنوان الخدمة" value="${service.title}">
                        </div>
                        <div class="form-group">
                            <label class="form-label">أيقونة الخدمة</label>
                            <select class="form-select service-icon">
                                <option value="fas fa-calendar-alt" ${service.icon === 'fas fa-calendar-alt' ? 'selected' : ''}>تقويم</option>
                                <option value="fas fa-video" ${service.icon === 'fas fa-video' ? 'selected' : ''}>فيديو</option>
                                <option value="fas fa-camera" ${service.icon === 'fas fa-camera' ? 'selected' : ''}>كاميرا</option>
                                <option value="fas fa-microphone" ${service.icon === 'fas fa-microphone' ? 'selected' : ''}>ميكروفون</option>
                                <option value="fas fa-lightbulb" ${service.icon === 'fas fa-lightbulb' ? 'selected' : ''}>إضاءة</option>
                                <option value="fas fa-music" ${service.icon === 'fas fa-music' ? 'selected' : ''}>موسيقى</option>
                                <option value="fas fa-code" ${service.icon === 'fas fa-code' ? 'selected' : ''}>برمجة</option>
                                <option value="fas fa-chart-line" ${service.icon === 'fas fa-chart-line' ? 'selected' : ''}>تحليلات</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">الإجراء</label>
                            <button type="button" class="btn btn-danger btn-sm" onclick="removeService(this)">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label">وصف الخدمة</label>
                        <textarea class="form-textarea service-description" rows="2" placeholder="وصف مختصر للخدمة">${service.description}</textarea>
                    </div>
                </div>
            `;

            container.insertAdjacentHTML('beforeend', serviceHtml);
        });
    }

    /**
     * Reset services
     */
    resetServices() {
        const container = document.getElementById('servicesContainer');
        if (container) {
            container.innerHTML = `
                <div class="service-item">
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label">عنوان الخدمة</label>
                            <input type="text" class="form-input service-title" placeholder="عنوان الخدمة">
                        </div>
                        <div class="form-group">
                            <label class="form-label">أيقونة الخدمة</label>
                            <select class="form-select service-icon">
                                <option value="fas fa-calendar-alt">تقويم</option>
                                <option value="fas fa-video">فيديو</option>
                                <option value="fas fa-camera">كاميرا</option>
                                <option value="fas fa-microphone">ميكروفون</option>
                                <option value="fas fa-lightbulb">إضاءة</option>
                                <option value="fas fa-music">موسيقى</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">الإجراء</label>
                            <button type="button" class="btn btn-danger btn-sm" onclick="removeService(this)">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label">وصف الخدمة</label>
                        <textarea class="form-textarea service-description" rows="2" placeholder="وصف مختصر للخدمة"></textarea>
                    </div>
                </div>
            `;
        }
    }

    /**
     * Render preview stats
     */
    renderPreviewStats(container, stats) {
        if (!container) return;

        container.innerHTML = `
            <div class="stat-item">
                <i class="fas fa-calendar-alt"></i>
                <span>${stats.experienceYears}+ سنوات خبرة</span>
            </div>
            <div class="stat-item">
                <i class="fas fa-star"></i>
                <span>${stats.eventsCount}+ فعالية</span>
            </div>
            <div class="stat-item">
                <i class="fas fa-users"></i>
                <span>${stats.clientsCount}+ عميل</span>
            </div>
            <div class="stat-item">
                <i class="fas fa-map-marker-alt"></i>
                <span>${stats.coverageAreas}</span>
            </div>
        `;
    }

    /**
     * Render preview services
     */
    renderPreviewServices(container, services) {
        if (!container) return;

        container.innerHTML = '';
        services.forEach(service => {
            const serviceHtml = `
                <div class="service-preview-item">
                    <i class="${service.icon}"></i>
                    <div>
                        <strong>${service.title}</strong>
                        <p>${service.description}</p>
                    </div>
                </div>
            `;
            container.insertAdjacentHTML('beforeend', serviceHtml);
        });
    }

    /**
     * Render preview contact
     */
    renderPreviewContact(container, contact) {
        if (!container) return;

        container.innerHTML = `
            <div class="contact-item">
                <i class="fas fa-envelope"></i>
                <span>${contact.email}</span>
            </div>
            <div class="contact-item">
                <i class="fas fa-phone"></i>
                <span>${contact.phone}</span>
            </div>
            ${contact.location ? `
                <div class="contact-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <a href="${contact.location}" target="_blank">عرض الموقع</a>
                </div>
            ` : ''}
        `;
    }

    /**
     * Render preview social links
     */
    renderPreviewSocial(container, social) {
        if (!container) return;

        container.innerHTML = '';
        
        if (social.facebook) {
            container.insertAdjacentHTML('beforeend', `
                <a href="${social.facebook}" class="social-link" target="_blank">
                    <i class="fab fa-facebook"></i>
                    <span>فيسبوك</span>
                </a>
            `);
        }
        
        if (social.twitter) {
            container.insertAdjacentHTML('beforeend', `
                <a href="${social.twitter}" class="social-link" target="_blank">
                    <i class="fab fa-twitter"></i>
                    <span>تويتر</span>
                </a>
            `);
        }
        
        if (social.instagram) {
            container.insertAdjacentHTML('beforeend', `
                <a href="${social.instagram}" class="social-link" target="_blank">
                    <i class="fab fa-instagram"></i>
                    <span>إنستغرام</span>
                </a>
            `);
        }
        
        if (social.linkedin) {
            container.insertAdjacentHTML('beforeend', `
                <a href="${social.linkedin}" class="social-link" target="_blank">
                    <i class="fab fa-linkedin"></i>
                    <span>لينكدإن</span>
                </a>
            `);
        }
    }

    /**
     * Get field name in Arabic
     */
    getFieldName(field) {
        const fieldNames = {
            'events': 'صناعة الفعاليات',
            'media': 'الإنتاج الإعلامي',
            'marketing': 'التسويق',
            'technology': 'التقنية',
            'construction': 'البناء'
        };
        return fieldNames[field] || field;
    }

    /**
     * Handle search
     */
    handleSearch(query) {
        const filteredCompanies = this.companies.filter(company =>
            company.name.toLowerCase().includes(query.toLowerCase()) ||
            this.getFieldName(company.field).toLowerCase().includes(query.toLowerCase()) ||
            company.description.toLowerCase().includes(query.toLowerCase())
        );
        
        this.filterTable(filteredCompanies);
    }

    /**
     * Handle field filter
     */
    handleFieldFilter(field) {
        if (!field) {
            this.filterTable(this.companies);
            return;
        }
        
        const filteredCompanies = this.companies.filter(company => company.field === field);
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

        if (field.id === 'companyEmail' && value && !this.isValidEmail(value)) {
            isValid = false;
            errorMessage = 'يرجى إدخال بريد إلكتروني صحيح';
        }

        if (field.id === 'companyPhone' && value && !this.isValidPhone(value)) {
            isValid = false;
            errorMessage = 'يرجى إدخال رقم هاتف صحيح';
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
     * Validate email
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    /**
     * Validate phone
     */
    isValidPhone(phone) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        return phoneRegex.test(phone);
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
    if (window.manageCompanyManager) {
        window.manageCompanyManager.openEditModal(companyId);
    }
}

function previewCompany(companyId) {
    if (window.manageCompanyManager) {
        window.manageCompanyManager.showPreviewModal(companyId);
    }
}

function deleteCompany(companyId) {
    if (window.manageCompanyManager) {
        window.manageCompanyManager.showConfirmModal(companyId);
    }
}

function removeLogo() {
    if (window.manageCompanyManager) {
        window.manageCompanyManager.removeLogo();
    }
}

function removePdf() {
    if (window.manageCompanyManager) {
        window.manageCompanyManager.removePdf();
    }
}

function addService() {
    if (window.manageCompanyManager) {
        window.manageCompanyManager.addService();
    }
}

function removeService(button) {
    if (window.manageCompanyManager) {
        window.manageCompanyManager.removeService(button);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.manageCompanyManager = new ManageCompanyManager();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ManageCompanyManager;
}
