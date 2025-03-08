document.getElementById('logoutBtn').addEventListener('click', async () => {
    try {
        const response = await fetch('/api/auth/logout', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        const data = await response.json();
        console.log("🔴 Logout Response:", data);

        // Clear token from local storage
        localStorage.removeItem('token');
        sessionStorage.removeItem('token'); 

        alert('Logout successful!');
        window.location.href = '/login.html'; // Redirect to login page
    } catch (error) {
        console.error('Logout failed:', error);
        alert('Logout failed. Please try again.');
    }
});