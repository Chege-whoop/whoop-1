const User = require("../models/User");
const Vehicle = require("../models/Vehicle");

exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.user._id;

        const user = await User.findById(userId).select("username");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const vehicle = await Vehicle.findOne({ ownerId: userId }).select("driverPhone vehicleName vehicleType plateNumber profileImage");
        
        // let profileImage = "/default-profile.png"; // Default image
        // if (vehicle && vehicle.profileImage) {
        //     profileImage = `/images/${vehicle.profileImage}`;
        // }
        let profileImage = vehicle && vehicle.profileImage
            ? `${req.protocol}://${req.get('host')}${vehicle.profileImage}`
            : `${req.protocol}://${req.get('host')}/images/default-profile.png`;

        res.json({
            username: user.username,
            driverPhone: vehicle ? vehicle.driverPhone : "N/A",
            vehicleName: vehicle ? vehicle.vehicleName : "N/A",
            vehicleType: vehicle ? vehicle.vehicleType : "N/A",
            plateNumber: vehicle ? vehicle.plateNumber : "N/A",
            profileImage
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
