document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    
    if (loginForm) {
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
            
            loginButton.disabled = true;
            loginButton.textContent = 'Signing in...';
            
            setTimeout(() => {
                if (dataService.verifyLogin(studentId, password)) {
                    showToast('Login successful!', 'success');
                    setTimeout(() => {
                        window.location.href = 'dashboard.html';
                    }, 500);
                } else {
                    showToast('Invalid credentials. Try: 21BCE001 / demo123', 'error');
                    loginButton.disabled = false;
                    loginButton.textContent = 'Sign In';
                }
            }, 500);
        });
    }
});