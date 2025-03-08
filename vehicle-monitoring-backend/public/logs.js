document.addEventListener('DOMContentLoaded', async () => {
    const logsTable = document.getElementById('logsTable');
    const token = localStorage.getItem('token');

    if (!token) {
        alert('Unauthorized. Please log in.');
        window.location.href = 'login.html';
        return;
    }

    try {
        const response = await fetch('/api/logs/user', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch logs');
        }

        const logs = await response.json();
        logsTable.innerHTML = '';

        logs.forEach(log => {
            const row = document.createElement('tr');
            
            // Determine status color
            let statusColor = 'green';
            if (log.status === 'Moderate') statusColor = 'orange';
            if (log.status === 'Critical') statusColor = 'red';

            row.innerHTML = `
                <td>${log.plateNumber}</td>
                <td>${log.currentSpeed} km/h</td>
                <td>${log.tamperState}</td>
                <td style="color: ${statusColor}; font-weight: bold;">${log.status}</td>
                <td>
                    <div class="progress-bar">
                        <div class="progress" style="width: ${Math.min(log.currentSpeed, 100)}%; background: ${statusColor};"></div>
                    </div>
                </td>
            `;

            logsTable.appendChild(row);
        });
    } catch (error) {
        console.error(error);
        alert('Error fetching logs');
    }
});
