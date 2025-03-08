// Get vehicle ID from URL
const urlParams = new URLSearchParams(window.location.search);
const vehicleId = urlParams.get("id");

if (!vehicleId) {
    alert("No vehicle selected for editing.");
    window.location.href = "dashbord.html";
}

// Fetch vehicle details
async function fetchVehicleDetails() {
    try {
        const response = await fetch(`http://localhost:5500/api/vehicles/getVehicleById/${vehicleId}`);
        const vehicle = await response.json();

        document.getElementById("editVehicleId").value = vehicle._id;
        document.getElementById("editPlateNumber").value = vehicle.plateNumber;
        document.getElementById("editVehicleName").value = vehicle.vehicleName;
        document.getElementById("editCurrentSpeed").value = vehicle.currentSpeed;
        document.getElementById("editTamperState").value = vehicle.tamperState;
        document.getElementById("editDriverPhone").value = vehicle.driverPhone;
        document.getElementById("editVehicleType").value = vehicle.vehicleType;

        // Show current profile image
        document.getElementById("editProfileImagePreview").src = vehicle.profileImage || "default.jpg";

    } catch (error) {
        console.error("Error fetching vehicle details:", error);
    }
}

// Handle update submission
document.getElementById("editVehicleForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const vehicleName = document.getElementById("editVehicleName").value;
    const currentSpeed = document.getElementById("editCurrentSpeed").value;
    const tamperState = document.getElementById("editTamperState").value;
    const driverPhone = document.getElementById("editDriverPhone").value;
    const vehicleType = document.getElementById("editVehicleType").value;
    const profileImage = document.getElementById("editProfileImage").files[0];

    const formData = new FormData();
    formData.append("id", vehicleId);
    formData.append("vehicleName", vehicleName);
    formData.append("currentSpeed", currentSpeed);
    formData.append("tamperState", tamperState);
    formData.append("driverPhone", driverPhone);
    formData.append("vehicleType", vehicleType);

    if (profileImage) {
        formData.append("profileImage", profileImage);
    }

    try {
        const response = await fetch(`http://localhost:5500/api/vehicles/updateVehicle/${vehicleId}`, {
            method: "PUT",
            body: formData
        });

        const data = await response.json();
        alert(data.message);
        window.location.href = "dashbord.html"; // Redirect after update

    } catch (error) {
        console.error("Error updating vehicle:", error);
    }
});

// Go back to index.html
function goBack() {
    window.location.href = "dashbord.html";
}

// Fetch details on page load
fetchVehicleDetails();
