// change-password.js - Change Password Page Handler

document.addEventListener('DOMContentLoaded', () => {
    initCommon();
    setupPasswordForm();
});

function setupPasswordForm() {
    const form = document.getElementById('change-password-form');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const currentPassword = document.getElementById('current-password').value;
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        
        // Validate current password (demo check)
        if (currentPassword !== 'demo123') {
            showToast('Current password is incorrect', 'error');
            return;
        }
        
        // Validate new password
        if (newPassword.length < 8) {
            showToast('New password must be at least 8 characters long', 'error');
            return;
        }
        
        // Check if new password has uppercase
        if (!/[A-Z]/.test(newPassword)) {
            showToast('New password must contain at least one uppercase letter', 'error');
            return;
        }
        
        // Check if new password has lowercase
        if (!/[a-z]/.test(newPassword)) {
            showToast('New password must contain at least one lowercase letter', 'error');
            return;
        }
        
        // Check if new password has number
        if (!/[0-9]/.test(newPassword)) {
            showToast('New password must contain at least one number', 'error');
            return;
        }
        
        // Check if new password has special character
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
            showToast('New password must contain at least one special character', 'error');
            return;
        }
        
        // Validate password confirmation
        if (newPassword !== confirmPassword) {
            showToast('New password and confirmation do not match', 'error');
            return;
        }
        
        // Check if new password is same as current
        if (currentPassword === newPassword) {
            showToast('New password must be different from current password', 'error');
            return;
        }
        
        // Success
        showToast('Password changed successfully!', 'success');
        
        // Reset form
        form.reset();
        
        // Redirect to dashboard after 1.5 seconds
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    });
}