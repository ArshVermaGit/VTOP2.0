// Enhanced utility functions
class ToastManager {
    constructor() {
        this.container = null;
        this.init();
    }

    init() {
        this.createContainer();
    }

    createContainer() {
        this.container = document.getElementById('toast-container');
        if (!this.container) {
            this.container = document.createElement('div');
            this.container.id = 'toast-container';
            this.container.className = 'fixed top-4 right-4 z-50 space-y-2 max-w-sm';
            document.body.appendChild(this.container);
        }
    }

    show(message, type = 'info', duration = 4000) {
        const toast = this.createToast(message, type);
        this.container.appendChild(toast);

        // Animate in
        setTimeout(() => {
            toast.classList.add('toast-visible');
        }, 10);

        // Auto remove
        setTimeout(() => {
            this.removeToast(toast);
        }, duration);

        // Add click to dismiss
        toast.addEventListener('click', () => {
            this.removeToast(toast);
        });

        return toast;
    }

    createToast(message, type) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type} transform translate-x-full opacity-0 transition-all duration-300 cursor-pointer`;
        
        const icons = {
            success: 'check-circle',
            error: 'x-circle',
            warning: 'alert-triangle',
            info: 'info'
        };

        toast.innerHTML = `
            <div class="flex items-center space-x-3 p-4 bg-white/10 backdrop-blur-lg border rounded-2xl border-white/20">
                <i data-lucide="${icons[type]}" class="w-5 h-5 ${this.getIconColor(type)}"></i>
                <span class="text-white text-sm flex-1">${message}</span>
                <i data-lucide="x" class="w-4 h-4 text-gray-400 hover:text-white"></i>
            </div>
        `;

        return toast;
    }

    getIconColor(type) {
        const colors = {
            success: 'text-green-400',
            error: 'text-red-400',
            warning: 'text-yellow-400',
            info: 'text-cyan-400'
        };
        return colors[type] || 'text-cyan-400';
    }

    removeToast(toast) {
        toast.classList.remove('toast-visible');
        toast.classList.add('opacity-0', 'translate-x-full');
        
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }
}

// Initialize toast manager
const toastManager = new ToastManager();

// Global showToast function
function showToast(message, type = 'info', duration = 4000) {
    return toastManager.show(message, type, duration);
}

// Enhanced form validation
class FormValidator {
    static validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    static validatePassword(password) {
        return password.length >= 6;
    }

    static validateRequired(value) {
        return value && value.trim().length > 0;
    }

    static validatePhone(phone) {
        const re = /^[\+]?[1-9][\d]{0,15}$/;
        return re.test(phone.replace(/[\s\-\(\)]/g, ''));
    }

    static showFieldError(field, message) {
        this.hideFieldError(field);
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'text-red-400 text-xs mt-1 flex items-center space-x-1';
        errorDiv.innerHTML = `
            <i data-lucide="alert-circle" class="w-3 h-3"></i>
            <span>${message}</span>
        `;
        
        field.parentNode.appendChild(errorDiv);
        field.classList.add('border-red-400');
        
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    static hideFieldError(field) {
        const existingError = field.parentNode.querySelector('.text-red-400');
        if (existingError) {
            existingError.remove();
        }
        field.classList.remove('border-red-400');
    }

    static validateForm(form, rules) {
        let isValid = true;
        
        for (const [fieldName, rule] of Object.entries(rules)) {
            const field = form.querySelector(`[name="${fieldName}"]`);
            if (!field) continue;
            
            const value = field.value.trim();
            
            if (rule.required && !this.validateRequired(value)) {
                this.showFieldError(field, rule.required);
                isValid = false;
                continue;
            }
            
            if (rule.email && !this.validateEmail(value)) {
                this.showFieldError(field, rule.email);
                isValid = false;
                continue;
            }
            
            if (rule.password && !this.validatePassword(value)) {
                this.showFieldError(field, rule.password);
                isValid = false;
                continue;
            }
            
            if (rule.phone && !this.validatePhone(value)) {
                this.showFieldError(field, rule.phone);
                isValid = false;
                continue;
            }
            
            this.hideFieldError(field);
        }
        
        return isValid;
    }
}

// Date and time utilities
class DateUtils {
    static formatDate(date, format = 'medium') {
        const d = new Date(date);
        const options = {
            short: { year: 'numeric', month: 'short', day: 'numeric' },
            medium: { year: 'numeric', month: 'long', day: 'numeric' },
            long: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
        };
        
        return d.toLocaleDateString('en-US', options[format] || options.medium);
    }

    static formatTime(date) {
        const d = new Date(date);
        return d.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
    }

    static getRelativeTime(date) {
        const d = new Date(date);
        const now = new Date();
        const diffMs = now - d;
        const diffSecs = Math.floor(diffMs / 1000);
        const diffMins = Math.floor(diffSecs / 60);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffSecs < 60) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
        return this.formatDate(d, 'short');
    }

    static isToday(date) {
        const d = new Date(date);
        const today = new Date();
        return d.toDateString() === today.toDateString();
    }

    static isFuture(date) {
        return new Date(date) > new Date();
    }
}

// Local storage utilities
class StorageManager {
    static set(key, value) {
        try {
            const serializedValue = JSON.stringify(value);
            localStorage.setItem(key, serializedValue);
            return true;
        } catch (error) {
            console.error('Storage error:', error);
            return false;
        }
    }

    static get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Storage error:', error);
            return defaultValue;
        }
    }

    static remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Storage error:', error);
            return false;
        }
    }

    static clear() {
        try {
            localStorage.clear();
            return true;
        } catch (error) {
            console.error('Storage error:', error);
            return false;
        }
    }
}

// API simulation utilities
class ApiSimulator {
    static async simulateRequest(data, delay = 1000, shouldFail = false) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (shouldFail) {
                    reject(new Error('Simulated API failure'));
                } else {
                    resolve({
                        success: true,
                        data: data,
                        timestamp: new Date().toISOString()
                    });
                }
            }, delay);
        });
    }

    static async simulateLogin(credentials) {
        return this.simulateRequest({
            token: 'demo_token_' + credentials.studentId,
            user: {
                student_id: credentials.studentId,
                name: 'Student ' + credentials.studentId
            }
        }, 1500);
    }

    static async simulateDataFetch(endpoint) {
        return this.simulateRequest({
            endpoint: endpoint,
            data: `Mock data for ${endpoint}`
        }, 800);
    }
}

// UI utility functions
class UIUtils {
    static toggleLoading(element, isLoading) {
        if (isLoading) {
            element.disabled = true;
            const originalText = element.innerHTML;
            element.setAttribute('data-original-text', originalText);
            element.innerHTML = '<div class="loading-spinner mx-auto"></div>';
            element.classList.add('loading');
        } else {
            element.disabled = false;
            const originalText = element.getAttribute('data-original-text');
            if (originalText) {
                element.innerHTML = originalText;
            }
            element.classList.remove('loading');
        }
    }

    static animateValue(element, start, end, duration = 1000) {
        const startTime = performance.now();
        const change = end - start;

        function updateValue(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = start + (change * easeOutQuart);
            
            element.textContent = Math.round(currentValue).toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(updateValue);
            }
        }

        requestAnimationFrame(updateValue);
    }

    static copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            showToast('Copied to clipboard!', 'success');
        }).catch(() => {
            showToast('Failed to copy to clipboard', 'error');
        });
    }

    static debounce(func, wait) {
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

    static throttle(func, limit) {
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
}

// Export utilities to global scope
window.showToast = showToast;
window.FormValidator = FormValidator;
window.DateUtils = DateUtils;
window.StorageManager = StorageManager;
window.ApiSimulator = ApiSimulator;
window.UIUtils = UIUtils;

// Initialize utilities when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Add loading state management to all forms
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const submitButton = this.querySelector('button[type="submit"]');
            if (submitButton) {
                UIUtils.toggleLoading(submitButton, true);
                
                // Re-enable button after form processing (if not redirected)
                setTimeout(() => {
                    UIUtils.toggleLoading(submitButton, false);
                }, 3000);
            }
        });
    });

    // Add copy functionality to code elements
    const codeElements = document.querySelectorAll('code');
    codeElements.forEach(code => {
        code.addEventListener('click', () => {
            UIUtils.copyToClipboard(code.textContent);
        });
    });
});