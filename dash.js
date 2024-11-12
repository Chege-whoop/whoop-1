// Define the backend API endpoint
const apiEndpoint = 'http://localhost:5000/api/vehicles';

// Fetch vehicle data from the backend and update the dashboard
async function fetchVehicleData() {
    try {
        const response = await fetch(apiEndpoint);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        updateDashboard(data);
    } catch (error) {
        console.error("Error fetching vehicle data:", error);
    }
}

// Update the dashboard with vehicle data
function updateDashboard(vehicleData) {
    const tableBody = document.getElementById("vehicle-data");
    tableBody.innerHTML = "";  // Clear previous data

    vehicleData.forEach(vehicle => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${vehicle.vehicleId}</td>
            <td>${vehicle.speed}</td>
            <td class="${vehicle.tamperStatus ? 'text-danger' : 'text-success'}">
                ${vehicle.tamperStatus ? 'Tampered' : 'Normal'}
            </td>
            <td>${vehicle.driverPhoneNumber}</td>
            <td>${new Date(vehicle.timestamp).toLocaleString()}</td>
        `;

        tableBody.appendChild(row);
    });
}

// Refresh vehicle data every 10 seconds
setInterval(fetchVehicleData, 10000);

// Initial fetch
fetchVehicleData();



// Fetch all vehicles and display in the console
fetch('http://localhost:3000/api/vehicles')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Additional code to display data in the frontend could go here
    });

// Add a new vehicle (for testing purposes)
fetch('http://localhost:3000/api/vehicles', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        vehicleId: '5678',
        speed: 75,
        tamperStatus: false,
        driverPhoneNumber: '+1234567890'
    })
})
    .then(response => response.json())
    .then(data => console.log(data));
