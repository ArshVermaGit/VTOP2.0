function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    const colors = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        info: 'bg-blue-500'
    };
    
    toast.className = `${colors[type]} text-white px-6 py-3 rounded-lg mb-2 animate-fade-in shadow-lg`;
    toast.textContent = message;
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-10px)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function checkAuth() {
    const token = localStorage.getItem('vtop_token');
    const currentPath = window.location.pathname;
    const isLoginPage = currentPath.endsWith('index.html') || currentPath === '/' || currentPath === '';
    
    if (!token && !isLoginPage) {
        window.location.href = 'index.html';
        return false;
    }
    
    if (token && isLoginPage) {
        window.location.href = 'dashboard.html';
        return false;
    }
    
    return true;
}

function logout() {
    localStorage.removeItem('vtop_token');
    localStorage.removeItem('vtop_student');
    window.location.href = 'index.html';
}

function initSidebar() {
    const menuItems = [
        { name: "Dashboard", icon: "home", path: "dashboard.html" },
        { name: "Profile", icon: "user", path: "profile.html" },
        { name: "Attendance", icon: "calendar", path: "attendance.html" },
        { name: "Marks", icon: "bar-chart", path: "marks.html" },
        { name: "Grades", icon: "award", path: "grades.html" },
        { name: "Grade History", icon: "history", path: "grade-history.html" },
        { name: "Time Table", icon: "clock", path: "timetable.html" },
        { name: "Curriculum", icon: "graduation-cap", path: "curriculum.html" },
        { name: "Exam Schedule", icon: "book-open", path: "exams.html" },
        { name: "Payments", icon: "credit-card", path: "payments.html" },
        { name: "Messages", icon: "message-square", path: "messages.html" },
        { name: "Leave Request", icon: "file-text", path: "leave.html" },
        { name: "Hostel", icon: "home", path: "hostel.html" },
        { name: "Change Password", icon: "lock", path: "change-password.html" }
    ];

    const sidebarNav = document.getElementById('sidebar-nav');
    if (!sidebarNav) return;
    
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    sidebarNav.innerHTML = '';
    
    menuItems.forEach(item => {
        const link = document.createElement('a');
        link.href = item.path;
        link.className = `flex items-center w-full p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors ${
            currentPage === item.path ? 'bg-white/10 text-white' : ''
        }`;
        link.setAttribute('data-testid', `nav-item-${item.name.toLowerCase().replace(/ /g, '-')}`);
        link.innerHTML = `
            <i data-lucide="${item.icon}" class="w-5 h-5 mr-3"></i>
            ${item.name}
        `;
        sidebarNav.appendChild(link);
    });
    
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

function initMobileMenu() {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    
    if (menuToggle && sidebar && overlay) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('-translate-x-full');
            overlay.classList.toggle('hidden');
        });
        
        overlay.addEventListener('click', () => {
            sidebar.classList.add('-translate-x-full');
            overlay.classList.add('hidden');
        });
        
        const sidebarLinks = sidebar.querySelectorAll('a');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth < 1024) {
                    sidebar.classList.add('-translate-x-full');
                    overlay.classList.add('hidden');
                }
            });
        });
    }
}

function initLogout() {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            logout();
        });
    }
}