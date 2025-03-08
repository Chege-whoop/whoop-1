document.addEventListener("DOMContentLoaded", async () => {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Unauthorized access. Please log in.");
        window.location.href = "/login.html";
        return;
    }

    try {
        const response = await fetch("/api/profile/profile", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error("Failed to fetch profile data");
        }

        const data = await response.json();

        document.getElementById("profileImage").src = data.profileImage || "/default-image.png";
        document.getElementById("userName").textContent = data.username;
        document.getElementById("driverPhone").textContent = data.driverPhone;
        document.getElementById("vehicleName").textContent = data.vehicleName;
        document.getElementById("vehicleType").textContent = data.vehicleType;
        document.getElementById("plateNumber").textContent = data.plateNumber;

    } catch (error) {
        console.error(error);
        alert("Error fetching profile data");
    }
});
