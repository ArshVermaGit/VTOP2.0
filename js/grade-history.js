// grade-history.js - Grade History Page Handler

document.addEventListener('DOMContentLoaded', () => {
    initCommon();
    loadGradeHistory();
});

function loadGradeHistory() {
    const groupedGrades = dataService.groupBySemester();
    const container = document.getElementById('grade-history-list');
    
    container.innerHTML = Object.keys(groupedGrades).sort().map(semester => {
        const semesterGrades = groupedGrades[semester];
        const totalCredits = semesterGrades.reduce((sum, grade) => sum + grade.credits, 0);
        
        return `
            <div class="card">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-2xl font-light">Semester ${semester}</h2>
                    <div class="text-cyan font-medium">${totalCredits} Credits</div>
                </div>
                <div class="grid grid-2 gap-3">
                    ${semesterGrades.map(grade => `
                        <div class="card" style="background: rgba(255, 255, 255, 0.02);">
                            <h3 class="text-lg font-light mb-1">${grade.course}</h3>
                            <p class="text-cyan text-sm mb-3">${grade.code}</p>
                            <div class="flex justify-between items-center">
                                <span class="text-2xl font-light" style="background: linear-gradient(135deg, #06b6d4, #8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">${grade.grade}</span>
                                <span class="text-gray text-sm">${grade.credits} Credits</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }).join('');
    
    initIcons();
}