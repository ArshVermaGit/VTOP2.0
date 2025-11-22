// Main application initialization
document.addEventListener('DOMContentLoaded', () => {
    if (!checkAuth()) return;
    
    initializeApp();
});

function initializeApp() {
    initSession();
    initNavigation();
    initMobileMenu();
    initLogout();
    updateUserInfo();
    initPageSpecificFeatures();
    
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Add smooth animations
    initAnimations();
}

function initNavigation() {
    const currentPage = window.location.pathname.split('/').pop();
    const navItems = document.querySelectorAll('nav a');
    
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPage) {
            item.classList.add('text-white');
            item.classList.remove('text-gray-400', 'hover:text-white');
        } else {
            item.classList.remove('text-white');
            item.classList.add('text-gray-400', 'hover:text-white');
        }
    });
}

function initMobileMenu() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const overlay = document.getElementById('mobile-overlay');
    
    if (toggle) {
        toggle.addEventListener('click', () => {
            const sidebar = document.getElementById('sidebar');
            if (sidebar) {
                sidebar.classList.toggle('mobile-open');
            }
            if (overlay) {
                overlay.classList.toggle('active');
            }
        });
    }
    
    if (overlay) {
        overlay.addEventListener('click', () => {
            const sidebar = document.getElementById('sidebar');
            if (sidebar) {
                sidebar.classList.remove('mobile-open');
            }
            overlay.classList.remove('active');
        });
    }
}

function initLogout() {
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Show confirmation dialog
            if (confirm('Are you sure you want to logout?')) {
                showToast('Logging out...', 'info');
                setTimeout(() => {
                    logout();
                }, 1000);
            }
        });
    }
}

function updateUserInfo() {
    const student = dataService.getProfile();
    const welcomeElements = document.querySelectorAll('[data-testid="welcome-message"]');
    const studentIdElements = document.querySelectorAll('[data-testid="student-id-display"]');
    const profileNameElements = document.querySelectorAll('[data-testid="profile-name"]');
    const profileIdElements = document.querySelectorAll('[data-testid="profile-student-id"]');
    
    welcomeElements.forEach(el => {
        if (el) el.textContent = `Welcome back, ${student.name.split(' ')[0]}`;
    });
    
    studentIdElements.forEach(el => {
        if (el) el.textContent = `${student.student_id} | ${student.branch}`;
    });
    
    profileNameElements.forEach(el => {
        if (el) el.textContent = student.name;
    });
    
    profileIdElements.forEach(el => {
        if (el) el.textContent = student.student_id;
    });
}

function initPageSpecificFeatures() {
    const currentPage = window.location.pathname.split('/').pop();
    
    switch (currentPage) {
        case 'dashboard.html':
            initDashboard();
            break;
        case 'attendance.html':
            initAttendancePage();
            break;
        case 'grades.html':
            initGradesPage();
            break;
        case 'timetable.html':
            initTimetablePage();
            break;
        case 'messages.html':
            initMessagesPage();
            break;
        case 'leave.html':
            initLeavePage();
            break;
        case 'profile.html':
            initProfilePage();
            break;
        default:
            // Generic page initialization
            initGenericPage();
    }
}

function initDashboard() {
    // Update stats with real data
    updateDashboardStats();
    
    // Load upcoming classes
    loadUpcomingClasses();
    
    // Load recent activity
    loadRecentActivity();
    
    // Initialize quick links
    initQuickLinks();
}

function updateDashboardStats() {
    const stats = {
        attendance: dataService.getOverallAttendance(),
        gpa: dataService.calculateGPA(),
        courses: dataService.getGrades().length,
        daysToExam: getDaysToNextExam()
    };
    
    // Update stat cards if they exist
    const attendanceStat = document.querySelector('[data-stat="attendance"]');
    const gpaStat = document.querySelector('[data-stat="gpa"]');
    const coursesStat = document.querySelector('[data-stat="courses"]');
    const examsStat = document.querySelector('[data-stat="exams"]');
    
    if (attendanceStat) attendanceStat.textContent = `${stats.attendance}%`;
    if (gpaStat) gpaStat.textContent = stats.gpa;
    if (coursesStat) coursesStat.textContent = stats.courses;
    if (examsStat) examsStat.textContent = stats.daysToExam;
}

function loadUpcomingClasses() {
    const upcomingClasses = dataService.getUpcomingClasses();
    const container = document.getElementById('upcoming-classes');
    
    if (!container) return;
    
    if (upcomingClasses.length === 0) {
        container.innerHTML = `
            <div class="text-center py-8">
                <i data-lucide="calendar" class="w-12 h-12 text-gray-400 mx-auto mb-4"></i>
                <p class="text-gray-400">No classes scheduled for today</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = upcomingClasses.map(cls => `
        <div class="flex items-center justify-between py-3 border-b border-white/5">
            <div>
                <div class="text-white font-medium">${cls.course_name}</div>
                <div class="text-gray-400 text-sm">${cls.slot} • ${cls.venue}</div>
            </div>
            <div class="text-cyan-400 text-sm">${cls.faculty.split(' ')[0]}</div>
        </div>
    `).join('');
}

function loadRecentActivity() {
    const activities = dataService.getRecentActivity();
    const container = document.getElementById('recent-activity');
    
    if (!container) return;
    
    container.innerHTML = activities.map(activity => `
        <div class="py-3 border-b border-white/5">
            <div class="text-white font-medium mb-1">${activity.course}</div>
            <div class="text-gray-400 text-sm">${activity.content}</div>
            <div class="text-cyan-400 text-xs mt-1">${formatRelativeTime(activity.time)}</div>
        </div>
    `).join('');
}

function initQuickLinks() {
    // Add hover effects to quick links
    const quickLinks = document.querySelectorAll('[data-testid^="quick-link-"]');
    quickLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-2px)';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0)';
        });
    });
}

function initAttendancePage() {
    // Add attendance progress animations
    const progressBars = document.querySelectorAll('.progress-bar');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
            bar.style.transition = 'width 1s ease-in-out';
        }, 100);
    });
}

function initGradesPage() {
    // Add grade animations
    const gradeCards = document.querySelectorAll('[data-testid^="grade-card-"]');
    gradeCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            card.style.transition = 'all 0.5s ease';
        }, index * 100);
    });
}

function initTimetablePage() {
    // Highlight current day
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });
    const dayCards = document.querySelectorAll('[data-testid^="day-card-"]');
    
    dayCards.forEach(card => {
        const dayTitle = card.querySelector('[data-testid^="day-title-"]');
        if (dayTitle && dayTitle.textContent === today) {
            card.classList.add('border-cyan-400', 'bg-cyan-500/5');
        }
    });
}

function initMessagesPage() {
    // Add message priority indicators
    const messages = dataService.getMessages();
    const messageCards = document.querySelectorAll('[data-testid^="message-card-"]');
    
    messageCards.forEach((card, index) => {
        const message = messages[index];
        if (message.priority === 'high') {
            card.classList.add('border-red-400/30');
            const icon = card.querySelector('[data-lucide="message-square"]');
            if (icon) {
                icon.parentElement.classList.add('bg-red-500');
            }
        }
    });
}

function initLeavePage() {
    // Initialize date inputs with current date
    const fromDateInput = document.getElementById('from-date');
    const toDateInput = document.getElementById('to-date');
    
    if (fromDateInput && toDateInput) {
        const today = new Date().toISOString().split('T')[0];
        fromDateInput.value = today;
        toDateInput.value = today;
        
        // Set min dates
        fromDateInput.min = today;
        toDateInput.min = today;
        
        // Update min date of to-date when from-date changes
        fromDateInput.addEventListener('change', () => {
            toDateInput.min = fromDateInput.value;
        });
    }
}

function initProfilePage() {
    // Initialize profile editing functionality
    const editButton = document.getElementById('edit-profile-btn');
    if (editButton) {
        editButton.addEventListener('click', () => {
            showToast('Profile editing feature coming soon!', 'info');
        });
    }
}

function initGenericPage() {
    // Add fade-in animations to all cards
    const cards = document.querySelectorAll('.bg-white\\/5');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
            card.style.transition = 'all 0.6s ease';
        }, index * 100);
    });
}

function initAnimations() {
    // Add intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    const animatedElements = document.querySelectorAll('.bg-white\\/5, .page-header');
    animatedElements.forEach(el => observer.observe(el));
}

// Utility functions
function getDaysToNextExam() {
    const exams = dataService.getExams();
    if (exams.length === 0) return 'N/A';
    
    const nextExam = exams[0]; // Assuming sorted by date
    const examDate = new Date(nextExam.date);
    const today = new Date();
    const diffTime = examDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays > 0 ? diffDays : '0';
}

function formatRelativeTime(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return date.toLocaleDateString();
}

// Export functions for global access
window.dataService = dataService;
window.checkAuth = checkAuth;
window.logout = logout;
window.initSession = initSession;