const Vehicle = require('../models/Vehicle');

exports.checkUserVehicle = async (req, res) => {
    try {
        // const userId = req.user.userId; // Extract user ID from auth middleware
        const userId = req.user._id; 
        // Check if the user has a registered vehicle
        const vehicle = await Vehicle.findOne({ ownerId: userId });

        res.json({ hasVehicle: !!vehicle }); // Returns true if a vehicle exists, otherwise false
    } catch (error) {
        console.error("❌ Error checking user vehicle:", error);
        res.status(500).json({ message: "Server error while checking user vehicle" });
    }
};