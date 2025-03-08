const Location = require('../models/location');
const Vehicle = require('../models/Vehicle');

// Save location from microcontroller
exports.updateLocation = async (req, res) => {
    try {
        const { userId, latitude, longitude } = req.body;

        if (!userId || !latitude || !longitude) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const location = new Location({ userId, latitude, longitude });
        await location.save();

        res.status(200).json({ message: 'Location updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error updating location' });
    }
};

exports.getVehicleLocation = async (req, res) => {
    try {
        const userId = req.user._id; // Get user ID from JWT token
        console.log("User ID from token:", userId);
        
        const vehicle = await Vehicle.findOne({ userId });

        if (!vehicle) {
            return res.status(404).json({ message: "No vehicle found for this user" });
        }

        res.status(200).json({
            latitude: vehicle.latitude || 0, // Default to 0 if not available
            longitude: vehicle.longitude || 0
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error fetching location" });
    }
};


