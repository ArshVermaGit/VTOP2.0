// timetable.js - Timetable Page Handler

document.addEventListener('DOMContentLoaded', () => {
    initCommon();
    loadTimetable();
});

function loadTimetable() {
    const timetable = dataService.getTimetable();
    const container = document.getElementById('timetable-list');
    
    container.innerHTML = timetable.map(day => `
        <div class="card">
            <h3 class="text-xl font-light mb-3">${day.day}</h3>
            <div class="grid gap-2">
                ${day.slots.map(slot => {
                    if (slot.subject === 'Break') {
                        return `
                            <div class="flex items-center p-3" style="background: rgba(255, 255, 255, 0.02); border-radius: 0.75rem; border-left: 3px solid #6b7280;">
                                <div class="list-icon" style="background: rgba(107, 114, 128, 0.1);">
                                    <i data-lucide="coffee" style="color: #9ca3af;"></i>
                                </div>
                                <div style="flex: 1; margin-left: 1rem;">
                                    <div class="font-medium text-gray">Break</div>
                                    <div class="text-xs text-gray">${slot.time}</div>
                                </div>
                            </div>
                        `;
                    }
                    
                    return `
                        <div class="list-item" style="background: rgba(255, 255, 255, 0.02); border-radius: 0.75rem; border-left: 3px solid #06b6d4;">
                            <div class="list-icon">
                                <i data-lucide="book-open"></i>
                            </div>
                            <div style="flex: 1;">
                                <div class="font-medium">${slot.subject}</div>
                                <div class="text-xs text-gray">${slot.time} • ${slot.room}</div>
                            </div>
                            <div class="text-sm text-gray">${slot.faculty}</div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `).join('');
    
    initIcons();
}