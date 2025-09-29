/**
 * Clients Management JavaScript
 * Handles all functionality for the clients management page
 */

class ClientsManager {
    constructor() {
        console.log('ClientsManager constructor called');
        this.clients = [
            {
                id: 1,
                name: 'شركة التقنية المتقدمة',
                logo: 'https://via.placeholder.com/60x60/3b82f6/ffffff?text=C1',
                status: 'active'
            },
            {
                id: 2,
                name: 'مؤسسة الإبداع الرقمي',
                logo: 'https://via.placeholder.com/60x60/10b981/ffffff?text=C2',
                status: 'active'
            },
            {
                id: 3,
                name: 'مجموعة الحلول المتكاملة',
                logo: 'https://via.placeholder.com/60x60/f59e0b/ffffff?text=C3',
                status: 'inactive'
            }
        ];
        
        this.currentClientId = null;
        this.isEditing = false;
        
        this.initializeEventListeners();
        this.initializeFormValidation();
        this.initializeFileUpload();
        this.initializeSearch();
        this.initializeFilters();
        this.updateTable();
        console.log('ClientsManager initialization completed');
    }

    /**
     * Initialize all event listeners
     */
    initializeEventListeners() {
        console.log('initializeEventListeners called');
        
        // Add Client Button
        const addClientBtn = document.getElementById('addClientBtn');
        if (addClientBtn) {
            addClientBtn.addEventListener('click', () => {
                console.log('Add Client Button clicked!');
                this.openAddModal();
            });
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
        const clientForm = document.getElementById('clientForm');
        if (clientForm) {
            clientForm.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }


        // Close modals when clicking outside
        document.addEventListener('click', (e) => this.handleOutsideClick(e));
        
        // Close modals with Escape key
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
        
        // Add click listeners to modal backdrops
        const modals = ['clientModal', 'confirmModal'];
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
        const form = document.getElementById('clientForm');
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
        const fileInput = document.getElementById('clientLogo');
        
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
        const searchInput = document.getElementById('searchClients');
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
     * Open add client modal
     */
    openAddModal() {
        console.log('openAddModal called');
        this.isEditing = false;
        this.currentClientId = null;
        this.resetForm();
        this.showModal('إضافة عميل جديد');
    }

    /**
     * Open edit client modal
     */
    openEditModal(clientId) {
        console.log('openEditModal called with clientId:', clientId);
        
        const client = this.clients.find(c => c.id === clientId);
        console.log('Found client:', client);
        
        if (!client) {
            console.error('Client not found with id:', clientId);
            return;
        }

        this.isEditing = true;
        this.currentClientId = clientId;
        
        this.resetForm();
        this.populateForm(client);
        this.showModal('تعديل العميل');
    }

    /**
     * Show modal
     */
    showModal(title) {
        console.log('showModal called with title:', title);
        const modal = document.getElementById('clientModal');
        const modalTitle = document.getElementById('modalTitle');
        
        if (modal && modalTitle) {
            modalTitle.textContent = title;
            modal.classList.add('show');
            modal.style.display = 'flex';
            modal.style.visibility = 'visible';
            modal.style.opacity = '1';
            modal.style.zIndex = '99999';
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
        const modal = document.getElementById('clientModal');
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
     * Hide client
     */
    hideClient(clientId) {
        const clientIndex = this.clients.findIndex(c => c.id === clientId);
        if (clientIndex !== -1) {
            this.clients[clientIndex].status = 'inactive';
            this.updateTable();
            this.showNotification('تم إخفاء العميل بنجاح', 'success');
        }
    }

    /**
     * Show confirmation modal
     */
    showConfirmModal(clientId) {
        this.currentClientId = clientId;
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
            this.currentClientId = null;
        }
    }

    /**
     * Reset form
     */
    resetForm() {
        console.log('resetForm called');
        
        const form = document.getElementById('clientForm');
        if (form) {
            form.reset();
            this.clearFieldErrors();
            this.hideImagePreview();
        }
    }

    /**
     * Populate form with client data
     */
    populateForm(client) {
        console.log('populateForm called with client:', client);
        
        const nameInput = document.getElementById('clientName');
        const statusSelect = document.getElementById('clientStatus');

        if (nameInput) nameInput.value = client.name;
        if (statusSelect) statusSelect.value = client.status;

        // Show logo preview
        this.showImagePreview(client.logo);
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
            this.updateClient(this.currentClientId, formData);
        } else {
            this.addClient(formData);
        }
        
        this.closeModal();
    }

    /**
     * Get form data
     */
    getFormData() {
        const form = document.getElementById('clientForm');
        if (!form) return null;

        const formData = new FormData(form);
        const fileInput = document.getElementById('clientLogo');
        
        return {
            name: formData.get('clientName') || document.getElementById('clientName').value,
            status: formData.get('clientStatus') || document.getElementById('clientStatus').value,
            logo: fileInput.files[0] || this.getCurrentLogo()
        };
    }

    /**
     * Get current logo (for editing)
     */
    getCurrentLogo() {
        if (this.isEditing && this.currentClientId) {
            const client = this.clients.find(c => c.id === this.currentClientId);
            return client ? client.logo : null;
        }
        return null;
    }

    /**
     * Add new client
     */
    addClient(clientData) {
        const newClient = {
            id: Date.now(),
            name: clientData.name,
            status: clientData.status,
            logo: clientData.logo || 'https://via.placeholder.com/60x60/6b7280/ffffff?text=CL'
        };

        this.clients.push(newClient);
        this.updateTable();
        this.showNotification('تم إضافة العميل بنجاح', 'success');
    }

    /**
     * Update existing client
     */
    updateClient(clientId, clientData) {
        const clientIndex = this.clients.findIndex(c => c.id === clientId);
        if (clientIndex === -1) return;

        this.clients[clientIndex] = {
            ...this.clients[clientIndex],
            name: clientData.name,
            status: clientData.status,
            logo: clientData.logo || this.clients[clientIndex].logo
        };

        this.updateTable();
        this.showNotification('تم تحديث العميل بنجاح', 'success');
    }

    /**
     * Delete client
     */
    deleteClient(clientId) {
        this.clients = this.clients.filter(c => c.id !== clientId);
        this.updateTable();
        this.showNotification('تم حذف العميل بنجاح', 'success');
    }

    /**
     * Confirm delete
     */
    confirmDelete() {
        if (this.currentClientId) {
            this.deleteClient(this.currentClientId);
            this.closeConfirmModal();
        }
    }

    /**
     * Update table display
     */
    updateTable() {
        const tableBody = document.querySelector('#clientsTable tbody');
        const gridContainer = document.getElementById('clientsGrid');
        
        if (tableBody) {
            tableBody.innerHTML = this.generateTableRows();
        }
        
        if (gridContainer) {
            gridContainer.innerHTML = this.generateGridCards();
        }
    }

    /**
     * Generate table rows
     */
    generateTableRows() {
        return this.clients.map(client => `
            <tr>
                <td>
                    <div class="client-logo">
                        <img src="${client.logo}" alt="${client.name}" class="logo-img">
                    </div>
                </td>
                <td>
                    <div class="client-name">
                        <strong>${client.name}</strong>
                    </div>
                </td>
                <td>
                    <span class="status-badge status-${client.status}">
                        ${client.status === 'active' ? 'مفعل' : 'غير مفعل'}
                    </span>
                </td>
                <td>
                    <div class="action-buttons">
                        <button class="btn btn-sm btn-primary" onclick="editClient(${client.id})">
                            <i class="fas fa-edit"></i>
                            تعديل
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="deleteClient(${client.id})">
                            <i class="fas fa-trash"></i>
                            حذف
                        </button>
                        <button class="btn btn-sm btn-warning" onclick="hideClient(${client.id})">
                            <i class="fas fa-eye-slash"></i>
                            إخفاء
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    /**
     * Generate grid cards
     */
    generateGridCards() {
        return this.clients.map(client => `
            <div class="client-card">
                <div class="card-header">
                    <div class="client-logo">
                        <img src="${client.logo}" alt="${client.name}" class="logo-img">
                    </div>
                    <div class="client-info">
                        <h3 class="client-name">${client.name}</h3>
                        <span class="status-badge status-${client.status}">
                            ${client.status === 'active' ? 'مفعل' : 'غير مفعل'}
                        </span>
                    </div>
                </div>
                <div class="card-actions">
                    <button class="btn btn-sm btn-primary" onclick="editClient(${client.id})">
                        <i class="fas fa-edit"></i>
                        تعديل
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteClient(${client.id})">
                        <i class="fas fa-trash"></i>
                        حذف
                    </button>
                    <button class="btn btn-sm btn-info" onclick="previewClient(${client.id})">
                        <i class="fas fa-eye"></i>
                        معاينة
                    </button>
                </div>
            </div>
        `).join('');
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
        const fileInput = document.getElementById('clientLogo');
        if (fileInput) {
            fileInput.value = '';
        }
        this.hideImagePreview();
    }


    /**
     * Handle search
     */
    handleSearch(query) {
        const filteredClients = this.clients.filter(client =>
            client.name.toLowerCase().includes(query.toLowerCase())
        );
        
        this.filterTable(filteredClients);
    }

    /**
     * Handle status filter
     */
    handleStatusFilter(status) {
        if (!status) {
            this.filterTable(this.clients);
            return;
        }
        
        const filteredClients = this.clients.filter(client => client.status === status);
        this.filterTable(filteredClients);
    }

    /**
     * Filter table
     */
    filterTable(clients) {
        const tableBody = document.querySelector('#clientsTable tbody');
        const gridContainer = document.getElementById('clientsGrid');
        
        if (tableBody) {
            tableBody.innerHTML = clients.map(client => `
                <tr>
                    <td>
                        <div class="client-logo">
                            <img src="${client.logo}" alt="${client.name}" class="logo-img">
                        </div>
                    </td>
                    <td>
                        <div class="client-name">
                            <strong>${client.name}</strong>
                        </div>
                    </td>
                    <td>
                        <span class="status-badge status-${client.status}">
                            ${client.status === 'active' ? 'مفعل' : 'غير مفعل'}
                        </span>
                    </td>
                    <td>
                        <div class="action-buttons">
                            <button class="btn btn-sm btn-primary" onclick="editClient(${client.id})">
                                <i class="fas fa-edit"></i>
                                تعديل
                            </button>
                            <button class="btn btn-sm btn-danger" onclick="deleteClient(${client.id})">
                                <i class="fas fa-trash"></i>
                                حذف
                            </button>
                            <button class="btn btn-sm btn-info" onclick="previewClient(${client.id})">
                                <i class="fas fa-eye"></i>
                                معاينة
                            </button>
                        </div>
                    </td>
                </tr>
            `).join('');
        }
        
        if (gridContainer) {
            gridContainer.innerHTML = clients.map(client => `
                <div class="client-card">
                    <div class="card-header">
                        <div class="client-logo">
                            <img src="${client.logo}" alt="${client.name}" class="logo-img">
                        </div>
                        <div class="client-info">
                            <h3 class="client-name">${client.name}</h3>
                            <span class="status-badge status-${client.status}">
                                ${client.status === 'active' ? 'مفعل' : 'غير مفعل'}
                            </span>
                        </div>
                    </div>
                    <div class="card-actions">
                        <button class="btn btn-sm btn-primary" onclick="editClient(${client.id})">
                            <i class="fas fa-edit"></i>
                            تعديل
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="deleteClient(${client.id})">
                            <i class="fas fa-trash"></i>
                            حذف
                        </button>
                        <button class="btn btn-sm btn-warning" onclick="hideClient(${client.id})">
                            <i class="fas fa-eye-slash"></i>
                            إخفاء
                        </button>
                    </div>
                </div>
            `).join('');
        }
    }

    /**
     * Validate form
     */
    validateForm() {
        const form = document.getElementById('clientForm');
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
        if (field.id === 'clientName' && value && value.length < 2) {
            isValid = false;
            errorMessage = 'اسم العميل يجب أن يكون على الأقل حرفين';
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
     * Handle outside click
     */
    handleOutsideClick(e) {
        // Check if clicked element is the modal backdrop (not the modal content)
        if (e.target.classList.contains('modal') && e.target === e.currentTarget) {
            if (e.target.id === 'clientModal') {
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
            const clientModal = document.getElementById('clientModal');
            const confirmModal = document.getElementById('confirmModal');
            
            if (clientModal && clientModal.style.display === 'flex') {
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
}

// Global functions for onclick handlers
function editClient(clientId) {
    console.log('editClient called with clientId:', clientId);
    
    if (window.clientsManager) {
        console.log('Opening edit modal for client:', clientId);
        window.clientsManager.openEditModal(clientId);
    } else {
        console.error('ClientsManager not found!');
    }
}

function deleteClient(clientId) {
    if (window.clientsManager) {
        window.clientsManager.showConfirmModal(clientId);
    }
}

function hideClient(clientId) {
    if (window.clientsManager) {
        window.clientsManager.hideClient(clientId);
    }
}

function removeLogo() {
    if (window.clientsManager) {
        window.clientsManager.removeLogo();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.clientsManager = new ClientsManager();
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ClientsManager;
}
