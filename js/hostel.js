// hostel.js - Hostel Page Handler

document.addEventListener('DOMContentLoaded', () => {
    initCommon();
    loadHostelDetails();
});

function loadHostelDetails() {
    const hostel = dataService.getHostel();
    const container = document.getElementById('hostel-details');
    
    const details = [
        { 
            label: 'Block', 
            value: hostel.block, 
            icon: 'building' 
        },
        { 
            label: 'Room Number', 
            value: hostel.room, 
            icon: 'door-open' 
        },
        { 
            label: 'Bed Number', 
            value: hostel.bed, 
            icon: 'bed' 
        },
        { 
            label: 'Allotment Date', 
            value: hostel.allotmentDate, 
            icon: 'calendar' 
        },
        { 
            label: 'Warden', 
            value: hostel.warden, 
            icon: 'user' 
        },
        { 
            label: 'Contact', 
            value: hostel.contactNumber, 
            icon: 'phone' 
        }
    ];
    
    container.innerHTML = details.map(detail => `
        <div class="dashboard-stat" style="text-align: center;">
            <i data-lucide="${detail.icon}" class="text-cyan" style="width: 40px; height: 40px; margin: 0 auto 0.75rem;"></i>
            <div class="text-sm text-gray mb-2">${detail.label}</div>
            <div class="text-xl font-light">${detail.value}</div>
        </div>
    `).join('');
    
    initIcons();
}