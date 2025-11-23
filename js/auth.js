// auth.js - Authentication Handler

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
});

function handleLogin(e) {
    e.preventDefault();
    
    const studentId = document.getElementById('student-id').value.trim();
    const password = document.getElementById('password').value.trim();
    
    // Validate inputs
    if (!studentId || !password) {
        showToast('Please enter both Student ID and Password', 'error');
        return;
    }
    
    // Demo credentials check
    if (studentId === '24BCG10026' && password === '123') {
        // Set authentication
        sessionStorage.setItem('authenticated', 'true');
        sessionStorage.setItem('studentId', studentId);
        
        // Show success message
        showToast('Login successful! Redirecting...', 'success');
        
        // Redirect to dashboard
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);
    } else {
        showToast('Invalid credentials! Use: 24BCG10026 / 123', 'error');
    }
}