// utils.js - Utility Functions

// Toast Notification System
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.borderLeft = `4px solid ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#06b6d4'}`;
    toast.textContent = message;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Authentication Check
function checkAuth() {
    const isAuthenticated = sessionStorage.getItem('authenticated');
    if (!isAuthenticated && !window.location.pathname.endsWith('index.html') && !window.location.pathname.endsWith('/')) {
        window.location.href = 'index.html';
    }
}

// Logout Handler
function setupLogout() {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            sessionStorage.removeItem('authenticated');
            window.location.href = 'index.html';
        });
    }
}

// Change Password Handler
function setupChangePassword() {
    const changePasswordBtn = document.getElementById('change-password-btn');
    if (changePasswordBtn) {
        changePasswordBtn.addEventListener('click', () => {
            window.location.href = 'change-password.html';
        });
    }
}

// Get Attendance Color Class
function getAttendanceColor(percentage) {
    if (percentage >= 90) return 'progress-green';
    if (percentage >= 75) return 'progress-yellow';
    return 'progress-red';
}

// Get Attendance Text Color
function getAttendanceTextColor(percentage) {
    if (percentage >= 90) return 'text-green';
    if (percentage >= 75) return 'text-yellow';
    return 'text-red';
}

// Format Date
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// Calculate Days Until
function daysUntil(dateString) {
    const today = new Date();
    const targetDate = new Date(dateString);
    const diffTime = targetDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

// Get Status Badge Class
function getStatusBadgeClass(status) {
    const statusMap = {
        'Approved': 'badge-success',
        'Pending': 'badge-warning',
        'Rejected': 'badge-danger',
        'Paid': 'badge-success',
        'Due': 'badge-warning',
        'Overdue': 'badge-danger'
    };
    return statusMap[status] || 'badge-info';
}

// Calculate Percentage
function calculatePercentage(obtained, total) {
    return ((obtained / total) * 100).toFixed(1);
}

// Format Currency
function formatCurrency(amount) {
    return '₹' + amount.toLocaleString('en-IN');
}

// Get Grade Color
function getGradeColor(grade) {
    const gradeColors = {
        'A+': 'from-green-400 to-emerald-400',
        'A': 'from-cyan-400 to-blue-400',
        'B+': 'from-blue-400 to-indigo-400',
        'B': 'from-purple-400 to-pink-400',
        'C+': 'from-yellow-400 to-orange-400',
        'C': 'from-orange-400 to-red-400',
        'D': 'from-red-400 to-rose-400',
        'F': 'from-gray-400 to-gray-500'
    };
    return gradeColors[grade] || 'from-cyan-400 to-purple-400';
}

// Initialize Lucide Icons
function initIcons() {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// Debounce Function
function debounce(func, wait) {
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

// Smooth Scroll to Element
function scrollToElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Copy to Clipboard
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Copied to clipboard!', 'success');
    }).catch(() => {
        showToast('Failed to copy', 'error');
    });
}

// Validate Email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validate Phone
function validatePhone(phone) {
    const re = /^[+]?[\d\s-()]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// Generate Random ID
function generateId() {
    return 'id_' + Math.random().toString(36).substr(2, 9);
}

// Get Current Academic Year
function getCurrentAcademicYear() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    
    if (month >= 6) { // July onwards
        return `${year}-${year + 1}`;
    } else {
        return `${year - 1}-${year}`;
    }
}

// Initialize Common Features
function initCommon() {
    checkAuth();
    setupLogout();
    setupChangePassword();
    initIcons();
}

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showToast,
        checkAuth,
        setupLogout,
        setupChangePassword,
        getAttendanceColor,
        getAttendanceTextColor,
        formatDate,
        daysUntil,
        getStatusBadgeClass,
        calculatePercentage,
        formatCurrency,
        getGradeColor,
        initIcons,
        debounce,
        scrollToElement,
        copyToClipboard,
        validateEmail,
        validatePhone,
        generateId,
        getCurrentAcademicYear,
        initCommon
    };
}