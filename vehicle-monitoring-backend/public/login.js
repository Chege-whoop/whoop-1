document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log('attempting login..');

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username:email, password }),
        });

        if (!response.ok) {
            throw new Error('Login failed!');
        }

        const data = await response.json();
        alert('Login successful!');
        localStorage.setItem('token', data.token); // Store JWT token for authentication
        window.location.href = '/dashboard.html'; // Redirect to dashboard
    } catch (error) {
        console.error(error);
        alert('Error: ' + error.message);
    }
});
