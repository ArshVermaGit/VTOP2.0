// curriculum.js - Curriculum Page Handler

document.addEventListener('DOMContentLoaded', () => {
    initCommon();
    loadCurriculum();
});

function loadCurriculum() {
    const curriculum = dataService.getCurriculum();
    const container = document.getElementById('curriculum-list');
    
    container.innerHTML = curriculum.map(sem => `
        <div class="card">
            <div class="flex justify-between items-center mb-4">
                <h3 class="text-xl font-light">Semester ${sem.semester}</h3>
                <span class="badge badge-info">${sem.courses.length} Courses</span>
            </div>
            <div class="grid gap-2">
                ${sem.courses.map((course, index) => `
                    <div class="list-item" style="background: rgba(255, 255, 255, 0.02); border-radius: 0.75rem;">
                        <div class="flex items-center justify-center" style="width: 2rem; height: 2rem; border-radius: 0.5rem; background: rgba(6, 182, 212, 0.1); color: #06b6d4; font-weight: 500; flex-shrink: 0;">
                            ${index + 1}
                        </div>
                        <div style="flex: 1;">
                            <div class="font-medium">${course}</div>
                        </div>
                        <i data-lucide="book-open" class="text-cyan" style="width: 20px; height: 20px;"></i>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
    
    initIcons();
}