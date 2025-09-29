/**
 * Forms JavaScript
 * Handles form functionality including validation, rich text editor, and file uploads
 */

class FormsManager {
    constructor() {
        this.tinymceInstance = null;
        this.tags = [];
        this.selectedImage = null;
        
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeForms());
        } else {
            this.initializeForms();
        }
    }

    initializeForms() {
        this.initializeFormValidation();
        this.initializeRichTextEditor();
        this.initializeImageUpload();
        this.initializeTagsInput();
        this.initializeFormSubmission();
        this.initializeAutoSlug();
        this.initializeCharacterCounters();
    }

    // ===== FORM VALIDATION =====
    initializeFormValidation() {
        const form = document.getElementById('contentForm');
        if (!form) return;

        // Real-time validation
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });

        // Form submission validation
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.validateForm(form);
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'هذا الحقل مطلوب';
        }

        // Specific field validations
        switch (fieldName) {
            case 'title':
                if (value && value.length < 3) {
                    isValid = false;
                    errorMessage = 'العنوان يجب أن يكون 3 أحرف على الأقل';
                }
                break;
            
            case 'slug':
                if (value && !/^[a-z0-9-]+$/.test(value)) {
                    isValid = false;
                    errorMessage = 'الرابط يجب أن يحتوي على أحرف صغيرة وأرقام وشرطات فقط';
                }
                break;
            
            case 'metaDescription':
                if (value && (value.length < 150 || value.length > 160)) {
                    isValid = false;
                    errorMessage = 'وصف SEO يجب أن يكون بين 150-160 حرف';
                }
                break;
            
            case 'email':
                if (value && !this.isValidEmail(value)) {
                    isValid = false;
                    errorMessage = 'يرجى إدخال بريد إلكتروني صحيح';
                }
                break;
        }

        this.showFieldError(field, isValid ? '' : errorMessage);
        return isValid;
    }

    validateForm(form) {
        const fields = form.querySelectorAll('input[required], select[required], textarea[required]');
        let isFormValid = true;

        fields.forEach(field => {
            const isFieldValid = this.validateField(field);
            if (!isFieldValid) {
                isFormValid = false;
            }
        });

        // Validate rich text editor content
        if (this.tinymceInstance) {
            const content = this.tinymceInstance.getContent();
            if (!content.trim()) {
                isFormValid = false;
                this.showFieldError(document.getElementById('content'), 'المحتوى مطلوب');
            }
        }

        if (isFormValid) {
            this.submitForm(form);
        } else {
            this.showToast('يرجى تصحيح الأخطاء في النموذج', 'error');
            this.scrollToFirstError();
        }

        return isFormValid;
    }

    showFieldError(field, message) {
        const formGroup = field.closest('.form-group');
        const errorElement = formGroup.querySelector('.form-error');

        if (message) {
            formGroup.classList.add('error');
            formGroup.classList.remove('success');
            if (errorElement) {
                errorElement.textContent = message;
                errorElement.classList.add('show');
            }
        } else {
            formGroup.classList.remove('error');
            if (errorElement) {
                errorElement.classList.remove('show');
            }
        }
    }

    clearFieldError(field) {
        const formGroup = field.closest('.form-group');
        formGroup.classList.remove('error');
        
        const errorElement = formGroup.querySelector('.form-error');
        if (errorElement) {
            errorElement.classList.remove('show');
        }
    }

    scrollToFirstError() {
        const firstError = document.querySelector('.form-group.error');
        if (firstError) {
            firstError.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
            firstError.querySelector('input, select, textarea')?.focus();
        }
    }

    // ===== RICH TEXT EDITOR =====
    initializeRichTextEditor() {
        const contentField = document.getElementById('content');
        if (!contentField) return;

        // Initialize TinyMCE
        tinymce.init({
            selector: '#content',
            directionality: 'rtl',
            language: 'ar',
            height: 400,
            menubar: false,
            plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'help', 'wordcount'
            ],
            toolbar: 'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
            content_style: 'body { font-family: Tajawal, Inter, sans-serif; font-size: 14px; }',
            setup: (editor) => {
                this.tinymceInstance = editor;
                
                editor.on('change', () => {
                    this.clearFieldError(contentField);
                });
            },
            init_instance_callback: (editor) => {
                console.log('TinyMCE initialized');
            }
        });
    }

    // ===== IMAGE UPLOAD =====
    initializeImageUpload() {
        const imageUpload = document.querySelector('.image-upload');
        const imagePreview = document.getElementById('imagePreview');
        const selectImageBtn = document.getElementById('selectImageBtn');
        const featuredImageInput = document.getElementById('featuredImage');

        if (!imageUpload || !selectImageBtn || !featuredImageInput) return;

        // Click to select image
        selectImageBtn.addEventListener('click', () => {
            featuredImageInput.click();
        });

        // File input change
        featuredImageInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                this.handleImageUpload(file);
            }
        });

        // Drag and drop
        imageUpload.addEventListener('dragover', (e) => {
            e.preventDefault();
            imageUpload.classList.add('dragover');
        });

        imageUpload.addEventListener('dragleave', () => {
            imageUpload.classList.remove('dragover');
        });

        imageUpload.addEventListener('drop', (e) => {
            e.preventDefault();
            imageUpload.classList.remove('dragover');
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                this.handleImageUpload(files[0]);
            }
        });
    }

    handleImageUpload(file) {
        // Validate file type
        if (!file.type.startsWith('image/')) {
            this.showToast('يرجى اختيار ملف صورة صحيح', 'error');
            return;
        }

        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            this.showToast('حجم الصورة يجب أن يكون أقل من 5 ميجابايت', 'error');
            return;
        }

        // Show preview
        const reader = new FileReader();
        reader.onload = (e) => {
            this.showImagePreview(e.target.result);
        };
        reader.readAsDataURL(file);

        this.selectedImage = file;
        this.clearFieldError(document.getElementById('featuredImage'));
    }

    showImagePreview(imageSrc) {
        const imagePreview = document.getElementById('imagePreview');
        if (!imagePreview) return;

        imagePreview.innerHTML = `
            <img src="${imageSrc}" alt="معاينة الصورة">
            <div class="image-actions">
                <button type="button" class="btn btn-secondary btn-sm" id="changeImageBtn">
                    <i class="fas fa-edit"></i>
                    تغيير الصورة
                </button>
                <button type="button" class="btn btn-danger btn-sm" id="removeImageBtn">
                    <i class="fas fa-trash"></i>
                    حذف
                </button>
            </div>
        `;

        imagePreview.classList.add('has-image');

        // Add event listeners for new buttons
        document.getElementById('changeImageBtn')?.addEventListener('click', () => {
            document.getElementById('featuredImage')?.click();
        });

        document.getElementById('removeImageBtn')?.addEventListener('click', () => {
            this.removeImage();
        });
    }

    removeImage() {
        const imagePreview = document.getElementById('imagePreview');
        const featuredImageInput = document.getElementById('featuredImage');

        if (imagePreview) {
            imagePreview.innerHTML = `
                <i class="fas fa-image"></i>
                <p>لا توجد صورة مختارة</p>
                <button type="button" class="btn btn-secondary btn-sm" id="selectImageBtn">
                    اختيار صورة
                </button>
            `;
            imagePreview.classList.remove('has-image');
        }

        if (featuredImageInput) {
            featuredImageInput.value = '';
        }

        this.selectedImage = null;

        // Re-attach event listener
        document.getElementById('selectImageBtn')?.addEventListener('click', () => {
            document.getElementById('featuredImage')?.click();
        });
    }

    // ===== TAGS INPUT =====
    initializeTagsInput() {
        const tagsInput = document.getElementById('tags');
        const tagsList = document.getElementById('tagsList');

        if (!tagsInput || !tagsList) return;

        tagsInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const tag = e.target.value.trim();
                if (tag && !this.tags.includes(tag)) {
                    this.addTag(tag);
                    e.target.value = '';
                }
            }
        });

        tagsInput.addEventListener('blur', (e) => {
            const tag = e.target.value.trim();
            if (tag && !this.tags.includes(tag)) {
                this.addTag(tag);
                e.target.value = '';
            }
        });
    }

    addTag(tag) {
        if (this.tags.includes(tag)) return;

        this.tags.push(tag);
        this.renderTags();
    }

    removeTag(tag) {
        this.tags = this.tags.filter(t => t !== tag);
        this.renderTags();
    }

    renderTags() {
        const tagsList = document.getElementById('tagsList');
        if (!tagsList) return;

        tagsList.innerHTML = this.tags.map(tag => `
            <div class="tag-item">
                <span>${tag}</span>
                <button type="button" class="tag-remove" data-tag="${tag}">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');

        // Add event listeners for remove buttons
        tagsList.querySelectorAll('.tag-remove').forEach(btn => {
            btn.addEventListener('click', () => {
                const tag = btn.dataset.tag;
                this.removeTag(tag);
            });
        });
    }

    // ===== AUTO SLUG GENERATION =====
    initializeAutoSlug() {
        const titleInput = document.getElementById('title');
        const slugInput = document.getElementById('slug');

        if (!titleInput || !slugInput) return;

        titleInput.addEventListener('input', (e) => {
            // Only auto-generate slug if slug field is empty
            if (!slugInput.value) {
                const slug = this.generateSlug(e.target.value);
                slugInput.value = slug;
            }
        });
    }

    generateSlug(text) {
        return text
            .toLowerCase()
            .replace(/[\u0600-\u06FF]/g, '') // Remove Arabic characters
            .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
            .replace(/\s+/g, '-') // Replace spaces with hyphens
            .replace(/-+/g, '-') // Replace multiple hyphens with single
            .trim();
    }

    // ===== CHARACTER COUNTERS =====
    initializeCharacterCounters() {
        const metaDescription = document.getElementById('metaDescription');
        const excerpt = document.getElementById('excerpt');

        if (metaDescription) {
            this.addCharacterCounter(metaDescription, 160, 'form-help');
        }

        if (excerpt) {
            this.addCharacterCounter(excerpt, 300, 'form-help');
        }
    }

    addCharacterCounter(field, maxLength, containerClass) {
        const formGroup = field.closest('.form-group');
        const helpElement = formGroup.querySelector(`.${containerClass}`);

        if (!helpElement) return;

        const counter = document.createElement('div');
        counter.className = 'character-counter';
        counter.style.fontSize = 'var(--font-size-xs)';
        counter.style.color = 'var(--gray-500)';
        counter.style.marginTop = 'var(--spacing-xs)';

        const updateCounter = () => {
            const length = field.value.length;
            const remaining = maxLength - length;
            
            counter.textContent = `${length}/${maxLength} حرف`;
            
            if (remaining < 0) {
                counter.style.color = 'var(--danger-color)';
            } else if (remaining < 20) {
                counter.style.color = 'var(--warning-color)';
            } else {
                counter.style.color = 'var(--gray-500)';
            }
        };

        field.addEventListener('input', updateCounter);
        updateCounter(); // Initial count

        helpElement.appendChild(counter);
    }

    // ===== FORM SUBMISSION =====
    initializeFormSubmission() {
        const saveDraftBtn = document.getElementById('saveDraftBtn');
        const publishBtn = document.getElementById('publishBtn');

        if (saveDraftBtn) {
            saveDraftBtn.addEventListener('click', () => {
                this.submitForm(document.getElementById('contentForm'), 'draft');
            });
        }

        if (publishBtn) {
            publishBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.submitForm(document.getElementById('contentForm'), 'published');
            });
        }
    }

    submitForm(form, status = null) {
        if (!form) return;

        // Set form loading state
        this.setFormLoading(true);

        // Collect form data
        const formData = this.collectFormData(form);
        
        // Override status if provided
        if (status) {
            formData.status = status;
        }

        // Simulate API call
        setTimeout(() => {
            this.setFormLoading(false);
            
            const action = status === 'draft' ? 'حفظ كمسودة' : 'نشر المحتوى';
            this.showToast(`تم ${action} بنجاح`, 'success');
            
            // Redirect or show success message
            setTimeout(() => {
                window.location.href = 'content.html';
            }, 1500);
        }, 2000);
    }

    collectFormData(form) {
        const formData = new FormData(form);
        const data = {};

        // Convert FormData to object
        for (let [key, value] of formData.entries()) {
            if (data[key]) {
                // Handle multiple values (like checkboxes)
                if (Array.isArray(data[key])) {
                    data[key].push(value);
                } else {
                    data[key] = [data[key], value];
                }
            } else {
                data[key] = value;
            }
        }

        // Add rich text content
        if (this.tinymceInstance) {
            data.content = this.tinymceInstance.getContent();
        }

        // Add tags
        data.tags = this.tags;

        // Add image if selected
        if (this.selectedImage) {
            data.featuredImage = this.selectedImage;
        }

        return data;
    }

    setFormLoading(loading) {
        const form = document.getElementById('contentForm');
        if (!form) return;

        form.classList.toggle('form-loading', loading);
        
        const buttons = form.querySelectorAll('button[type="submit"], button[id$="Btn"]');
        buttons.forEach(btn => {
            btn.disabled = loading;
            if (loading) {
                btn.dataset.originalText = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الحفظ...';
            } else {
                btn.innerHTML = btn.dataset.originalText || btn.innerHTML;
            }
        });
    }

    // ===== UTILITY METHODS =====
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showToast(message, type = 'info', duration = 3000) {
        // Use the toast method from admin dashboard
        if (window.adminDashboard) {
            window.adminDashboard.showToast(message, type, duration);
        } else {
            alert(message); // Fallback
        }
    }

    // ===== FORM RESET =====
    resetForm() {
        const form = document.getElementById('contentForm');
        if (!form) return;

        form.reset();
        
        // Clear TinyMCE
        if (this.tinymceInstance) {
            this.tinymceInstance.setContent('');
        }

        // Clear tags
        this.tags = [];
        this.renderTags();

        // Clear image
        this.removeImage();

        // Clear all errors
        form.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error', 'success');
        });

        form.querySelectorAll('.form-error').forEach(error => {
            error.classList.remove('show');
        });
    }
}

// Initialize forms manager when DOM is ready
const formsManager = new FormsManager();

// Export for use in other modules
window.FormsManager = FormsManager;
