document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const adminkey = document.getElementById('adminkey')?.value.trim(); // Optional admin key

    console.log('Attempting login...');

    try {
        let endpoint = '/api/auth/login'; // Default endpoint for regular users
        let requestBody = { email, password };

        // If admin key is provided, use the admin login API
        if (adminkey) {
            endpoint = '/api/admin/login';
            requestBody.adminkey = adminkey;
        }

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(requestBody),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Login failed!');
        }

        // Store token in localStorage for authentication
        localStorage.setItem('token', data.token);
        alert('Login successful!');

        // Redirect based on role
        if (adminkey) {
            window.location.href = '/dashbord.html'; // Redirect admin users
        } else {
            // Check if user exists in the Vehicle collection
            const vehicleResponse = await fetch('/api/user/has-vehicle', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${data.token}`,
                    'Content-Type': 'application/json'
                }
            });

            const vehicleData = await vehicleResponse.json();
            
            if (vehicleData.hasVehicle) {
                window.location.href = '/udash.html'; // Redirect users with a vehicle
            } else {
                window.location.href = '/profile.html'; // Redirect users without a vehicle
            }
        }
    } catch (error) {
        console.error(error);
        alert('Error: ' + error.message);
    }
});