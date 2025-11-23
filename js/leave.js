// leave.js - Leave Management Page Handler

document.addEventListener('DOMContentLoaded', () => {
    initCommon();
    loadLeaveHistory();
    setupLeaveForm();
});

function setupLeaveForm() {
    const form = document.getElementById('leave-form');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const leaveType = document.getElementById('leave-type').value;
        const fromDate = document.getElementById('from-date').value;
        const toDate = document.getElementById('to-date').value;
        const reason = document.getElementById('reason').value.trim();
        
        // Validate dates
        if (new Date(fromDate) > new Date(toDate)) {
            showToast('From date cannot be after To date', 'error');
            return;
        }
        
        // Create leave object
        const leave = {
            type: leaveType,
            from: fromDate,
            to: toDate,
            reason: reason,
            status: 'Pending'
        };
        
        // Add to data
        dataService.addLeave(leave);
        
        // Show success message
        showToast('Leave application submitted successfully!', 'success');
        
        // Reset form
        form.reset();
        
        // Reload history
        loadLeaveHistory();
    });
}

function loadLeaveHistory() {
    const leaves = dataService.getLeaves();
    const container = document.getElementById('leave-history');
    
    if (leaves.length === 0) {
        container.innerHTML = `
            <div class="text-center text-gray p-4">
                No leave applications found
            </div>
        `;
        return;
    }
    
    container.innerHTML = leaves.map(leave => `
        <div class="list-item">
            <div class="list-icon">
                <i data-lucide="file-text"></i>
            </div>
            <div style="flex: 1;">
                <div class="font-medium">${leave.type}</div>
                <div class="text-xs text-gray">${formatDate(leave.from)} to ${formatDate(leave.to)}</div>
                <div class="text-xs text-gray mt-1">${leave.reason}</div>
            </div>
            <span class="badge ${getStatusBadgeClass(leave.status)}">${leave.status}</span>
        </div>
    `).join('');
    
    initIcons();
}