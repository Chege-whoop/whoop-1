document.getElementById('vehicleForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const token = localStorage.getItem('token'); // Retrieve JWT token

    console.log("Stored Token:", localStorage.getItem('token'));


    try {
        const response = await fetch('/api/vehicles/register', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}`},
            body : formData
            // body: JSON.stringify(formJSON)
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Vehicle registration failed!');

        alert('🚗 Vehicle registered successfully!');
        window.location.href = '/udash.html';
    } catch (error) {
        console.log(error);
        alert(`Error: ${error.message}`);
    }
});



