// exams.js - Exams Page Handler

document.addEventListener('DOMContentLoaded', () => {
    initCommon();
    loadExams();
});

function loadExams() {
    const exams = dataService.getExams();
    const container = document.getElementById('exams-list');
    
    container.innerHTML = exams.map(exam => {
        const daysLeft = daysUntil(exam.date);
        const urgencyClass = daysLeft <= 3 ? 'text-red' : daysLeft <= 7 ? 'text-yellow' : 'text-cyan';
        
        return `
            <div class="card">
                <div class="flex justify-between items-start">
                    <div style="flex: 1;">
                        <h3 class="text-xl font-light mb-2">${exam.course}</h3>
                        <p class="text-gray text-sm mb-3">${exam.code}</p>
                        <div class="grid gap-2">
                            <div class="flex items-center gap-2 text-gray">
                                <i data-lucide="calendar" style="width: 18px; height: 18px;"></i>
                                <span>${formatDate(exam.date)}</span>
                                <span class="${urgencyClass} text-sm font-medium">
                                    ${daysLeft > 0 ? `(${daysLeft} days)` : daysLeft === 0 ? '(Today!)' : '(Completed)'}
                                </span>
                            </div>
                            <div class="flex items-center gap-2 text-gray">
                                <i data-lucide="clock" style="width: 18px; height: 18px;"></i>
                                <span>${exam.time} • ${exam.duration}</span>
                            </div>
                            <div class="flex items-center gap-2 text-gray">
                                <i data-lucide="map-pin" style="width: 18px; height: 18px;"></i>
                                <span>${exam.venue}</span>
                            </div>
                        </div>
                    </div>
                    <div class="text-right">
                        <span class="badge badge-info">${exam.type}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    initIcons();
}