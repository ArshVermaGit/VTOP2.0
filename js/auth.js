// Authentication functionality
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        // Check if user is already logged in
        const token = localStorage.getItem('vtop_token');
        if (token) {
            window.location.href = 'dashboard.html';
            return;
        }
        
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const studentId = document.getElementById('student-id').value.trim();
            const password = document.getElementById('password').value;
            const loginButton = loginForm.querySelector('button[type="submit"]');
            
            if (!studentId || !password) {
                showToast('Please enter both Student ID and Password', 'error');
                return;
            }
            
            // Show loading state
            loginButton.disabled = true;
            const originalText = loginButton.textContent;
            loginButton.innerHTML = '<div class="loading-spinner mx-auto"></div>';
            
            // Simulate API call
            setTimeout(() => {
                if (dataService.verifyLogin(studentId, password)) {
                    showToast('Login successful! Redirecting...', 'success');
                    setTimeout(() => {
                        window.location.href = 'dashboard.html';
                    }, 1000);
                } else {
                    showToast('Invalid credentials. Try: 21BCE001 / demo123', 'error');
                    loginButton.disabled = false;
                    loginButton.textContent = originalText;
                }
            }, 1500);
        });
        
        // Add input animations
        const inputs = loginForm.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('input-focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('input-focused');
                }
            });
        });
    }
});

// Enhanced authentication check
function checkAuth() {
    const token = localStorage.getItem('vtop_token');
    const currentPage = window.location.pathname.split('/').pop();
    
    if (!token && currentPage !== 'index.html') {
        window.location.href = 'index.html';
        return false;
    }
    
    if (token && currentPage === 'index.html') {
        window.location.href = 'dashboard.html';
        return false;
    }
    
    return true;
}

// Session management
function initSession() {
    const token = localStorage.getItem('vtop_token');
    if (token) {
        // Set session expiration (8 hours)
        const sessionExpiry = Date.now() + (8 * 60 * 60 * 1000);
        localStorage.setItem('vtop_session_expiry', sessionExpiry);
        
        // Check session periodically
        setInterval(() => {
            const expiry = localStorage.getItem('vtop_session_expiry');
            if (expiry && Date.now() > parseInt(expiry)) {
                showToast('Session expired. Please login again.', 'warning');
                logout();
            }
        }, 60000); // Check every minute
    }
}

// Enhanced logout function
function logout() {
    localStorage.removeItem('vtop_token');
    localStorage.removeItem('vtop_student');
    localStorage.removeItem('vtop_session_expiry');
    localStorage.removeItem('vtop_leave_requests');
    window.location.href = 'index.html';
}