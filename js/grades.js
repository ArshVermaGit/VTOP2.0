// grades.js - Grades Page Handler

document.addEventListener('DOMContentLoaded', () => {
    initCommon();
    loadGradesData();
});

function loadGradesData() {
    const grades = dataService.getGrades();
    const gpa = dataService.calculateGPA();
    
    // Update current GPA
    document.getElementById('current-gpa').textContent = gpa;
    
    // Load grades list
    const container = document.getElementById('grades-list');
    
    container.innerHTML = grades.map(grade => `
        <div class="card">
            <div class="flex justify-between items-center">
                <div style="flex: 1;">
                    <h3 class="text-xl font-light mb-1">${grade.course}</h3>
                    <p class="text-gray">${grade.code}</p>
                    <p class="text-sm text-gray mt-2">Semester ${grade.semester} • ${grade.credits} Credits</p>
                </div>
                <div class="text-right">
                    <div class="stat-value" style="background: linear-gradient(135deg, #06b6d4, #8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">${grade.grade}</div>
                    <a href="marks.html" class="text-sm text-cyan mt-2" style="display: inline-block;">View Marks</a>
                </div>
            </div>
        </div>
    `).join('');
    
    initIcons();
}