// Define the backend API endpoint
const apiEndpoint = 'http://localhost:5500/api/vehicles';

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
