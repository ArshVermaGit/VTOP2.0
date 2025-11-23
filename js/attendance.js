// attendance.js - Attendance Page Handler

document.addEventListener('DOMContentLoaded', () => {
    initCommon();
    loadAttendanceData();
});

function loadAttendanceData() {
    const attendance = dataService.getAttendance();
    
    // Update overall attendance
    document.getElementById('overall-attendance').textContent = attendance.overall + '%';
    
    // Load course-wise attendance
    const container = document.getElementById('attendance-list');
    
    container.innerHTML = attendance.courses.map(course => `
        <div class="card">
            <div class="flex justify-between items-start mb-3">
                <div style="flex: 1;">
                    <h3 class="text-xl font-light">${course.name}</h3>
                    <p class="text-gray text-sm">${course.code}</p>
                </div>
                <div class="text-right">
                    <div class="text-3xl font-light ${getAttendanceTextColor(course.percentage)}">
                        ${course.percentage.toFixed(1)}%
                    </div>
                </div>
            </div>
            <div class="flex justify-between text-sm text-gray mb-2">
                <span>Classes Attended: ${course.attended}</span>
                <span>Total Classes: ${course.total}</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill ${getAttendanceColor(course.percentage)}" style="width: ${course.percentage}%"></div>
            </div>
            ${course.percentage < 75 ? `
                <div class="mt-2 text-sm text-red flex items-center gap-2">
                    <i data-lucide="alert-triangle" style="width: 16px; height: 16px;"></i>
                    <span>Below minimum attendance requirement (75%)</span>
                </div>
            ` : ''}
            ${course.percentage >= 75 && course.percentage < 85 ? `
                <div class="mt-2 text-sm text-yellow flex items-center gap-2">
                    <i data-lucide="info" style="width: 16px; height: 16px;"></i>
                    <span>Close to minimum requirement. Attend ${Math.ceil((0.75 * (course.total + 10) - course.attended))} more classes to be safe</span>
                </div>
            ` : ''}
        </div>
    `).join('');
    
    initIcons();
}