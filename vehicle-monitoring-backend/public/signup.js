document.getElementById('signupForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const adminkey = document.getElementById('adminkey')?.value.trim(); // Optional admin key

    console.log('Attempting signup..');

    try {
        let endpoint = '/api/auth/signup'; // Default endpoint for regular users
        let requestBody = { username, email, password };

        // If admin key is provided, use the admin signup API
        if (adminkey) {
            endpoint = '/api/admin/signup';
            requestBody.adminkey = adminkey;
        }

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Signup failed!');
        }

        alert('Signup successful!');

        // Redirect based on API response
        if (adminkey) {
            window.location.href = '/dashbord.html'; // Redirect admin users
        } else {
            window.location.href = '/profile.html'; // Redirect regular users
        }
    } catch (error) {
        console.error(error);
        alert('Error: ' + error.message);
    }
});
