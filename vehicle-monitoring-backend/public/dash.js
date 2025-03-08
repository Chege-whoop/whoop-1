// Define the backend API endpoint
const apiEndpoint = 'http://localhost:5500/api/vehicles/allVehicles';

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
    tableBody.innerHTML = ""; // Clear previous data

    vehicleData.forEach((vehicle, index) => {
        console.log(`🔍 Checking vehicle ${index}:`, vehicle); // Debugging log

        // Ensure vehicle properties are defined before using them
        const plateNumber = vehicle.plateNumber || "N/A";
        const vehicleName = vehicle.vehicleName || "Unknown";
        const profileImage = vehicle.profileImage 
            ? `http://localhost:5500${vehicle.profileImage}` 
            : "/default-image.png";
        const currentSpeed = vehicle.currentSpeed || "0";
        const tamperState = vehicle.tamperState || "N/A";
        const driverPhone = vehicle.driverPhone || "N/A";
        const vehicleType = vehicle.vehicleType || "Unknown";

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${plateNumber}</td>
            <td>${vehicleName}</td>
            <td><img src="${profileImage}" alt="Profile" class="profile-img"></td>
            <td>${currentSpeed} km/h</td>
            <td class="${tamperState === 'critical' ? 'text-danger' : 'text-success'}">
                ${tamperState}
            </td>
            <td>${driverPhone}</td>
            <td>${vehicleType}</td>
            <td>
            <button onclick="redirectToaedit('${vehicle._id}')">✏ Edit</button>
            <button onclick="deleteVehicle('${vehicle._id}')">🗑 Delete</button>
            <button onclick="openMessageModal('${vehicle._id}', '${driverPhone}')">📩 Message</button>
        </td>
        `;


        tableBody.appendChild(row);
    });
}

function redirectToaedit(vehicleId) {
    window.location.href = `/aedit.html?id=${vehicleId}`;
}

function logoutAdmin() {
    localStorage.removeItem("adminLoggedIn"); // Remove stored admin session (if used)
    sessionStorage.removeItem("adminSession"); // Clear session storage (if used)
    document.cookie = "adminSession=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    
    window.location.href = "/login.html"; // Redirect to login page

    setTimeout(() => {
        window.history.pushState(null, null, "/admin-login");
    }, 100);
}

async function deleteVehicle(vehicleId) {
    if (!confirm("Are you sure you want to delete this vehicle?")) return;

    try {
        const response = await fetch(`http://localhost:5500/api/vehicles/${vehicleId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            // body: JSON.stringify({ id: vehicleId })
        });

        const data = await response.json();
        alert(data.message);
        fetchVehicleData(); // Refresh the table

    } catch (error) {
        console.error("Error deleting vehicle:", error);
    }
}

function openMessageModal(vehicleId, driverPhone) {
    document.getElementById("messageVehicleId").value = vehicleId;
    document.getElementById("messageDriverPhone").value = driverPhone;
    document.getElementById("messageText").value = ""; // Clear previous text

    var messageModal = new bootstrap.Modal(document.getElementById("messageModal"));
    messageModal.show();
}

async function sendMessage() {
    const vehicleId = document.getElementById("messageVehicleId").value;
    const driverPhone = document.getElementById("messageDriverPhone").value;
    const messageText = document.getElementById("messageText").value;

    if (!messageText.trim()) {
        alert("Message cannot be empty!");
        return;
    }

    try {
        const response = await fetch(`http://localhost:5500/api/messages/send`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                vehicleId,
                driverPhone,
                message: messageText
            })
        });

        const data = await response.json();
        alert(data.message); // Show success/failure message

        var messageModal = bootstrap.Modal.getInstance(document.getElementById("messageModal"));
        messageModal.hide(); // Close the modal after sending

    } catch (error) {
        console.error("Error sending message:", error);
        alert("Failed to send message. Please try again.");
    }
}



// Refresh vehicle data every 500 milliseconds
setInterval(fetchVehicleData, 500);

// Initial fetch
fetchVehicleData();



// // Fetch all vehicles and display in the console
// fetch('http://localhost:5000/api/vehicles')
//     .then(response => response.json())
//     .then(data => {
//         console.log(data);
//         // Additional code to display data in the frontend could go here
//     });

//     // Function to fetch vehicle data from the backend API
// async function fetchVehicleData() {
//   try {
//     const response = await fetch('http://localhost:5500/vehicle-history/ABC123'); // Replace with your backend API
//     const data = await response.json();

//     // Extract timestamps and speeds for the chart
//     const timestamps = data.map(item => item.timestamp);
//     const speeds = data.map(item => item.speed);

//     return { timestamps, speeds };
//   } catch (error) {
//     console.error("Error fetching vehicle data:", error);
//   }
// }

// // Function to create the chart
// async function createChart() {
//   const { timestamps, speeds } = await fetchVehicleData();

//   const ctx = document.getElementById('speedChart').getContext('2d');
//   new Chart(ctx, {
//     type: 'line', // Line chart
//     data: {
//       labels: timestamps, // X-axis labels
//       datasets: [
//         {
//           label: 'Vehicle Speed (km/h)', // Chart label
//           data: speeds, // Y-axis data
//           borderColor: 'rgba(75, 192, 192, 1)',
//           backgroundColor: 'rgba(75, 192, 192, 0.2)',
//           borderWidth: 2,
//           tension: 0.3, // Smooth curve
//         }
//       ]
//     },
//     options: {
//       responsive: true,
//       plugins: {
//         legend: {
//           display: true,
//           position: 'top'
//         }
//       },
//       scales: {
//         x: {
//           title: {
//             display: true,
//             text: 'Timestamp',
//           }
//         },
//         y: {
//           title: {
//             display: true,
//             text: 'Speed (km/h)',
//           },
//           min: 0 // Ensure Y-axis starts at 0
//         }
//       }
//     }
//   });
// }

// // Call the function to fetch data and create the chart
// createChart();




// // Add a new vehicle (for testing purposes)
// fetch('http://localhost:3000/api/vehicles', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//         vehicleId: '5678',
//         speed: 75,
//         tamperStatus: false,
//         driverPhoneNumber: '+1234567890'
//     })
// })
//     .then(response => response.json())
//     .then(data => console.log(data));
