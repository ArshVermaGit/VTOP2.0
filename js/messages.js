// messages.js - Messages Page Handler

document.addEventListener('DOMContentLoaded', () => {
    initCommon();
    loadMessages();
});

function loadMessages() {
    const messages = dataService.getMessages();
    const container = document.getElementById('messages-list');
    
    if (messages.length === 0) {
        container.innerHTML = `
            <div class="card text-center text-gray">
                <i data-lucide="inbox" style="width: 48px; height: 48px; margin: 0 auto 1rem;"></i>
                <p>No messages found</p>
            </div>
        `;
        initIcons();
        return;
    }
    
    container.innerHTML = messages.map((msg, index) => `
        <div class="card ${!msg.read ? 'border-cyan' : ''}" style="border-width: ${!msg.read ? '2px' : '1px'}; cursor: pointer;" onclick="readMessage(${index})">
            <div class="flex justify-between items-start mb-3">
                <div class="flex items-start gap-3" style="flex: 1;">
                    <div class="list-icon" style="background: ${!msg.read ? 'rgba(6, 182, 212, 0.15)' : 'rgba(107, 114, 128, 0.1)'};">
                        <i data-lucide="mail" style="color: ${!msg.read ? '#06b6d4' : '#9ca3af'};"></i>
                    </div>
                    <div style="flex: 1;">
                        <h3 class="text-xl font-light ${!msg.read ? 'text-cyan' : ''}">${msg.subject}</h3>
                        <p class="text-sm text-gray">From: ${msg.from}</p>
                    </div>
                </div>
                <div class="flex flex-col items-end gap-2">
                    <span class="text-sm text-gray">${formatDate(msg.date)}</span>
                    ${!msg.read ? '<span class="badge badge-info">New</span>' : ''}
                </div>
            </div>
            <p class="text-gray">${msg.preview}</p>
            <button class="btn btn-secondary mt-3" onclick="event.stopPropagation(); viewFullMessage(${index})">
                <i data-lucide="eye" style="width: 16px; height: 16px; margin-right: 0.5rem;"></i>
                Read More
            </button>
        </div>
    `).join('');
    
    initIcons();
}

function readMessage(index) {
    const messages = dataService.getMessages();
    if (messages[index]) {
        messages[index].read = true;
        loadMessages();
    }
}

function viewFullMessage(index) {
    const messages = dataService.getMessages();
    const msg = messages[index];
    
    if (msg) {
        msg.read = true;
        showToast(`Opening message: ${msg.subject}`, 'info');
        loadMessages();
    }
}