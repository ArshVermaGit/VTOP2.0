document.addEventListener('DOMContentLoaded', () => {
    if (!checkAuth()) return;
    
    initSidebar();
    initMobileMenu();
    initLogout();
    
    const currentPage = window.location.pathname.split('/').pop();
    
    if (currentPage === 'dashboard.html') {
        initDashboard();
    }
    
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

function initDashboard() {
    const student = dataService.getProfile();
    const welcomeMessage = document.getElementById('welcome-message');
    const studentInfo = document.getElementById('student-info');
    
    if (welcomeMessage) {
        welcomeMessage.textContent = `Welcome back, ${student.name}`;
    }
    
    if (studentInfo) {
        studentInfo.textContent = `${student.student_id} | ${student.branch}`;
    }
    
    const quickLinks = [
        { name: "Profile", icon: "user", path: "profile.html", color: "from-cyan-500 to-blue-500" },
        { name: "Attendance", icon: "calendar", path: "attendance.html", color: "from-blue-500 to-purple-500" },
        { name: "Marks", icon: "bar-chart", path: "marks.html", color: "from-purple-500 to-pink-500" },
        { name: "Grades", icon: "award", path: "grades.html", color: "from-pink-500 to-red-500" },
        { name: "Time Table", icon: "clock", path: "timetable.html", color: "from-red-500 to-orange-500" },
        { name: "Exam Schedule", icon: "book-open", path: "exams.html", color: "from-orange-500 to-yellow-500" },
        { name: "Payments", icon: "credit-card", path: "payments.html", color: "from-yellow-500 to-green-500" },
        { name: "Messages", icon: "message-square", path: "messages.html", color: "from-green-500 to-teal-500" },
        { name: "Leave Request", icon: "file-text", path: "leave.html", color: "from-teal-500 to-cyan-500" },
        { name: "Hostel", icon: "home", path: "hostel.html", color: "from-cyan-500 to-blue-500" }
    ];
    
    const quickLinksContainer = document.getElementById('quick-links');
    
    quickLinks.forEach(link => {
        const card = document.createElement('a');
        card.href = link.path;
        card.className = 'glass-effect p-6 cursor-pointer hover:scale-105 transition-all duration-300 border-white/10 rounded-lg group block';
        card.setAttribute('data-testid', `quick-link-${link.name.toLowerCase().replace(/ /g, '-')}`);
        card.innerHTML = `
            <div class="w-14 h-14 rounded-2xl bg-gradient-to-br ${link.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <i data-lucide="${link.icon}" class="w-7 h-7 text-white"></i>
            </div>
            <h3 class="text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors">
                ${link.name}
            </h3>
        `;
        quickLinksContainer.appendChild(card);
    });
    
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}