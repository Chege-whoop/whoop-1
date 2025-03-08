const token = localStorage.getItem('token'); // Get JWT token from localStorage

if (!token) {
    alert("Authentication required! Please log in again.");
    window.location.href = "/login.html"; // Redirect to login page
}

let userId = null; // Variable to store user ID

// Initialize Map
const map = L.map('map').setView([0, 0], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);
let marker = L.marker([0, 0]).addTo(map);


// Function to fetch user ID
async function getUserId() {
    try {
        const response = await fetch('/api/auth/user', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        if (response.ok) {
            userId = data.user._id; // Get user ID from the response
            console.log("User ID:", userId);

            fetchLocation(); // Fetch vehicle location after getting user ID
            setInterval(fetchLocation, 5000); // Update every 5 seconds
        } else {
            alert("Failed to authenticate. Please log in again.");
            localStorage.removeItem('token');
            window.location.href = "/login.html"; // Redirect to login
        }
    } catch (error) {
        console.error("Error fetching user ID:", error);
    }
}

getUserId();

// Function to fetch vehicle location
async function fetchLocation() {
    if (!userId) return;

    try {
        const response = await fetch(`/api/location/${userId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();

        if (data.latitude && data.longitude) {
            const { latitude, longitude } = data;
            map.setView([latitude, longitude], 13);
            marker.setLatLng([latitude, longitude]);
        } else {
            console.warn("Location not found.");
        }
    } catch (error) {
        console.error("Error fetching location:", error);
        alert("GPS not available. Showing default location.");
        map.setView([0, 0]);
    }
}

