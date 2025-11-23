// dashboard.js - Dashboard Page Handler

document.addEventListener('DOMContentLoaded', () => {
    initCommon();
    loadDashboardData();
});

function loadDashboardData() {
    // Load stats
    const gpa = dataService.calculateGPA();
    const attendance = dataService.getAttendance();
    const grades = dataService.getGrades();
    const exams = dataService.getExams();
    
    document.getElementById('gpa-value').textContent = gpa;
    document.getElementById('attendance-value').textContent = attendance.overall + '%';
    document.getElementById('courses-value').textContent = grades.length;
    document.getElementById('exams-value').textContent = exams.length;
    
    // Load recent attendance
    loadRecentAttendance();
    
    // Load upcoming exams
    loadUpcomingExams();
    
    initIcons();
}

function loadRecentAttendance() {
    const attendance = dataService.getAttendance();
    const container = document.getElementById('recent-attendance');
    
    container.innerHTML = attendance.courses.slice(0, 3).map(course => `
        <div class="list-item">
            <div style="flex: 1;">
                <div class="font-medium">${course.name}</div>
                <div class="text-xs text-gray">${course.attended}/${course.total} classes</div>
            </div>
            <div class="text-right">
                <div class="font-medium ${getAttendanceTextColor(course.percentage)}">
                    ${course.percentage.toFixed(1)}%
                </div>
            </div>
        </div>
    `).join('');
}

function loadUpcomingExams() {
    const exams = dataService.getExams();
    const container = document.getElementById('upcoming-exams');
    
    container.innerHTML = exams.slice(0, 3).map(exam => `
        <div class="list-item">
            <div class="list-icon">
                <i data-lucide="calendar"></i>
            </div>
            <div style="flex: 1;">
                <div class="font-medium">${exam.course}</div>
                <div class="text-xs text-gray">${exam.date} at ${exam.time}</div>
            </div>
            <span class="badge badge-info">${exam.type}</span>
        </div>
    `).join('');
    
    initIcons();
}