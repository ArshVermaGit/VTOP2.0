// profile.js - Profile Page Handler

document.addEventListener('DOMContentLoaded', () => {
    initCommon();
    loadProfileData();
});

function loadProfileData() {
    const profile = dataService.getProfile();
    const gpa = dataService.calculateGPA();
    const attendance = dataService.getAttendance();
    const grades = dataService.getGrades();
    const totalCredits = dataService.getTotalCredits();
    
    // Update profile information
    document.getElementById('student-name').textContent = profile.name;
    document.getElementById('student-id-display').textContent = profile.id;
    document.getElementById('student-program').textContent = profile.program;
    document.getElementById('student-email').textContent = profile.email;
    document.getElementById('student-phone').textContent = profile.phone;
    document.getElementById('student-dob').textContent = profile.dob;
    
    // Update academic performance
    document.getElementById('profile-gpa').textContent = gpa;
    document.getElementById('gpa-progress').style.width = (gpa * 10) + '%';
    
    document.getElementById('profile-attendance').textContent = attendance.overall + '%';
    document.getElementById('attendance-progress').style.width = attendance.overall + '%';
    document.getElementById('attendance-progress').className = 'progress-fill ' + getAttendanceColor(attendance.overall);
    
    document.getElementById('courses-enrolled').textContent = grades.length;
    document.getElementById('total-credits').textContent = totalCredits;
    
    initIcons();
}