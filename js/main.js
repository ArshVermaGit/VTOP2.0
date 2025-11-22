import { router } from './router.js';
import { dataService } from './data.js';

class App {
    constructor() {
        this.currentPage = 'login';
        this.isAuthenticated = false;
        this.init();
    }

    init() {
        this.checkAuth();
        this.render();
        this.setupRouter();
    }

    checkAuth() {
        const token = localStorage.getItem('vtop_token');
        const student = localStorage.getItem('vtop_student');
        if (token && student) {
            this.isAuthenticated = true;
            this.currentPage = 'dashboard';
        }
    }

    setupRouter() {
        window.addEventListener('popstate', () => {
            this.handleRoute();
        });

        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-link]')) {
                e.preventDefault();
                const path = e.target.getAttribute('href');
                this.navigate(path);
            }
        });

        this.handleRoute();
    }

    navigate(path) {
        window.history.pushState(null, '', path);
        this.handleRoute();
    }

    handleRoute() {
        const path = window.location.pathname;
        
        if (path === '/' || path === '/login') {
            this.currentPage = 'login';
            this.isAuthenticated = false;
        } else if (this.isAuthenticated) {
            this.currentPage = path.substring(1) || 'dashboard';
        } else {
            this.navigate('/');
            return;
        }
        
        this.render();
    }

    handleLogin() {
        this.isAuthenticated = true;
        this.currentPage = 'dashboard';
        this.navigate('/dashboard');
    }

    handleLogout() {
        this.isAuthenticated = false;
        this.currentPage = 'login';
        localStorage.removeItem('vtop_token');
        localStorage.removeItem('vtop_student');
        this.navigate('/');
    }

    render() {
        const root = document.getElementById('root');
        const pageContent = router[this.currentPage] ? router[this.currentPage]() : router['404']();
        
        root.innerHTML = `
            <div class="App">
                ${this.isAuthenticated && this.currentPage !== 'login' ? this.renderLayout(pageContent) : pageContent}
            </div>
        `;

        this.attachEventListeners();
        
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    renderLayout(content) {
        return `
            <div class="min-h-screen bg-black">
                ${this.renderNavbar()}
                <div class="flex pt-16">
                    ${this.renderSidebar()}
                    <main class="flex-1 p-8" data-testid="main-content">
                        <div class="max-w-7xl mx-auto">${content}</div>
                    </main>
                </div>
            </div>
        `;
    }

    renderNavbar() {
        return `
            <nav class="glass-effect border-b border-white/10 fixed w-full z-50">
                <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div class="flex justify-between items-center h-16">
                        <div class="flex items-center space-x-4">
                            <button data-testid="menu-toggle" class="lg:hidden text-gray-400 hover:text-white p-2">
                                <i data-lucide="menu"></i>
                            </button>
                            <h1 class="text-2xl font-bold gradient-text" data-testid="nav-title">VTOP 2.0</h1>
                        </div>
                        <button data-testid="logout-button" class="text-gray-400 hover:text-white flex items-center p-2">
                            <i data-lucide="log-out" class="w-5 h-5 mr-2"></i>
                            Logout
                        </button>
                    </div>
                </div>
            </nav>
        `;
    }

    renderSidebar() {
        const menuItems = [
            { name: "Dashboard", icon: "home", path: "/dashboard" },
            { name: "Profile", icon: "user", path: "/profile" },
            { name: "Attendance", icon: "calendar", path: "/attendance" },
            { name: "Marks", icon: "bar-chart", path: "/marks" },
            { name: "Grades", icon: "award", path: "/grades" },
            { name: "Grade History", icon: "history", path: "/grade-history" },
            { name: "Time Table", icon: "clock", path: "/timetable" },
            { name: "Curriculum", icon: "graduation-cap", path: "/curriculum" },
            { name: "Exam Schedule", icon: "book-open", path: "/exams" },
            { name: "Payments", icon: "credit-card", path: "/payments" },
            { name: "Messages", icon: "message-square", path: "/messages" },
            { name: "Leave Request", icon: "file-text", path: "/leave" },
            { name: "Hostel", icon: "home", path: "/hostel" },
            { name: "Change Password", icon: "lock", path: "/change-password" }
        ];

        const currentPath = window.location.pathname;

        return `
            <aside class="fixed lg:sticky top-16 h-[calc(100vh-4rem)] w-64 glass-effect border-r border-white/10 z-40 overflow-y-auto" data-testid="sidebar">
                <nav class="p-4 space-y-2">
                    ${menuItems.map(item => `
                        <a href="${item.path}" data-link class="flex items-center w-full p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg ${
                            currentPath === item.path ? 'bg-white/10 text-white' : ''
                        }">
                            <i data-lucide="${item.icon}" class="w-5 h-5 mr-3"></i>
                            ${item.name}
                        </a>
                    `).join('')}
                </nav>
            </aside>
        `;
    }

    attachEventListeners() {
        const logoutBtn = document.querySelector('[data-testid="logout-button"]');
        if (logoutBtn) {
            logoutBtn.onclick = () => this.handleLogout();
        }

        const loginForm = document.querySelector('#login-form');
        if (loginForm) {
            loginForm.onsubmit = (e) => {
                e.preventDefault();
                const studentId = document.querySelector('#student-id').value;
                const password = document.querySelector('#password').value;
                
                if (dataService.verifyLogin(studentId, password)) {
                    this.handleLogin();
                } else {
                    this.showToast('Invalid credentials. Try: 21BCE001 / demo123', 'error');
                }
            };
        }

        const changePasswordForm = document.querySelector('#change-password-form');
        if (changePasswordForm) {
            changePasswordForm.onsubmit = (e) => {
                e.preventDefault();
                const oldPassword = document.querySelector('#old-password').value;
                const newPassword = document.querySelector('#new-password').value;
                const confirmPassword = document.querySelector('#confirm-password').value;
                
                if (newPassword !== confirmPassword) {
                    this.showToast('New passwords do not match', 'error');
                    return;
                }
                
                this.showToast('Password changed successfully!', 'success');
                changePasswordForm.reset();
            };
        }

        const leaveForm = document.querySelector('#leave-form');
        if (leaveForm) {
            leaveForm.onsubmit = (e) => {
                e.preventDefault();
                const formData = new FormData(leaveForm);
                const leaveData = {
                    leave_type: formData.get('leave_type'),
                    from_date: formData.get('from_date'),
                    to_date: formData.get('to_date'),
                    reason: formData.get('reason')
                };
                
                dataService.submitLeaveRequest(leaveData);
                this.showToast('Leave request submitted successfully!', 'success');
                leaveForm.reset();
                this.render();
            };
        }
    }

    showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `fixed top-4 right-4 p-4 rounded-lg ${
            type === 'success' ? 'bg-green-500' : 
            type === 'error' ? 'bg-red-500' : 'bg-blue-500'
        } text-white z-50`;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.remove();
        }, 3000);
    }
}

new App();