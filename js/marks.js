// marks.js - Marks Page Handler

document.addEventListener('DOMContentLoaded', () => {
    initCommon();
    loadMarksData();
});

function loadMarksData() {
    const marks = dataService.getMarks();
    
    // Calculate statistics
    let totalAssessments = 0;
    let totalScore = 0;
    let totalMaxScore = 0;
    let highestScore = 0;
    
    marks.forEach(course => {
        course.assessments.forEach(assessment => {
            totalAssessments++;
            totalScore += assessment.score;
            totalMaxScore += assessment.maxScore;
            const percentage = (assessment.score / assessment.maxScore) * 100;
            if (percentage > highestScore) highestScore = percentage;
        });
    });
    
    const averagePercentage = ((totalScore / totalMaxScore) * 100).toFixed(1);
    
    // Update summary
    document.getElementById('total-assessments').textContent = totalAssessments;
    document.getElementById('average-score').textContent = averagePercentage + '%';
    document.getElementById('highest-score').textContent = highestScore.toFixed(0);
    
    // Load course-wise marks
    const container = document.getElementById('marks-list');
    
    container.innerHTML = marks.map(course => {
        const totalObtained = course.assessments.reduce((sum, a) => sum + a.score, 0);
        const totalMax = course.assessments.reduce((sum, a) => sum + a.maxScore, 0);
        const percentage = ((totalObtained / totalMax) * 100).toFixed(1);
        
        return `
            <div class="card">
                <div class="flex justify-between items-start mb-4">
                    <div>
                        <h3 class="text-xl font-light">${course.course}</h3>
                        <p class="text-gray text-sm">${course.code}</p>
                    </div>
                    <div class="text-right">
                        <div class="text-2xl font-light text-cyan">${percentage}%</div>
                        <div class="text-sm text-gray">${totalObtained}/${totalMax}</div>
                    </div>
                </div>
                
                <div class="grid gap-2">
                    ${course.assessments.map(assessment => {
                        const assessmentPercentage = ((assessment.score / assessment.maxScore) * 100).toFixed(1);
                        const color = assessmentPercentage >= 90 ? 'text-green' : 
                                     assessmentPercentage >= 75 ? 'text-cyan' : 
                                     assessmentPercentage >= 60 ? 'text-yellow' : 'text-red';
                        
                        return `
                            <div class="flex justify-between items-center p-3" style="background: rgba(255, 255, 255, 0.02); border-radius: 0.75rem;">
                                <div>
                                    <div class="font-medium">${assessment.name}</div>
                                    <div class="text-xs text-gray">${assessment.weightage}% weightage</div>
                                </div>
                                <div class="text-right">
                                    <div class="font-medium ${color}">${assessment.score}/${assessment.maxScore}</div>
                                    <div class="text-xs text-gray">${assessmentPercentage}%</div>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
    }).join('');
    
    initIcons();
}