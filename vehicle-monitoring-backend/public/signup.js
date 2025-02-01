document.getElementById('signupForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log('attempting signup..');

    try {
        const response = await fetch('/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });

        if (!response.ok) {
            throw new Error('Signup failed!');
        }

        alert('Signup successful!');
        window.location.href = '/login.html'; // Redirect to dashbord page
    } catch (error) {
        console.error(error);
        alert('Error: ' + error.message);
    }
});
