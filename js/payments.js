// payments.js - Payments Page Handler

document.addEventListener('DOMContentLoaded', () => {
    initCommon();
    loadPayments();
});

function loadPayments() {
    const payments = dataService.getPayments();
    
    // Calculate total paid
    const totalPaid = payments.reduce((sum, payment) => sum + payment.amount, 0);
    document.getElementById('total-paid').textContent = formatCurrency(totalPaid);
    
    // Load payments table
    const tableBody = document.getElementById('payments-table');
    
    if (payments.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="4" class="text-center text-gray">No payment records found</td>
            </tr>
        `;
        return;
    }
    
    tableBody.innerHTML = payments.map(payment => `
        <tr>
            <td>
                <div class="font-medium">${payment.type}</div>
                <div class="text-xs text-gray">${payment.transactionId}</div>
            </td>
            <td>
                <div class="font-medium">${formatCurrency(payment.amount)}</div>
            </td>
            <td>
                <div>${formatDate(payment.date)}</div>
            </td>
            <td>
                <span class="badge ${getStatusBadgeClass(payment.status)}">${payment.status}</span>
            </td>
        </tr>
    `).join('');
    
    initIcons();
}