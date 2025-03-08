// const Vehicle = require('../models/Vehicle');

// exports.getVehicleLogs = async (req, res) => {
//     try {
//         const vehicles = await Vehicle.find({}, 'plateNumber currentSpeed tamperState');

//         const logs = vehicles.map(vehicle => {
//             let status = 'Good';
//             if (vehicle.currentSpeed > 80 && vehicle.tamperState.toLowerCase() === 'good') {
//                 status = 'Moderate';
//             }
//             if (vehicle.tamperState.toLowerCase() === 'critical') {
//                 status = 'Critical';
//             }

//             return {
//                 plateNumber: vehicle.plateNumber,
//                 currentSpeed: vehicle.currentSpeed,
//                 tamperState: vehicle.tamperState,
//                 status: status
//             };
//         });

//         res.status(200).json(logs);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Server error fetching vehicle logs' });
//     }
// };
const Vehicle = require('../models/Vehicle');

exports.getVehicleLogs = async (req, res) => {
    try {
        const userId = req.user._id; // Extract user ID from the authentication middleware

        // Find the vehicle associated with the user
        const vehicles = await Vehicle.find({ ownerId: userId });

        if (!vehicles) {
            return res.status(404).json({ message: "No vehicle found for this user" });
        }

        const logs = vehicles.map(vehicle => {
            let status = 'Good';
            const tamperState = vehicle.tamperState ? vehicle.tamperState.toLowerCase() : 'unknown';

            if (vehicle.currentSpeed > 80 && tamperState === 'good') {
                status = 'Moderate';
            }
            if (tamperState === 'critical') {
                status = 'Critical';
            }

            return {
                plateNumber: vehicle.plateNumber,
                currentSpeed: vehicle.currentSpeed,
                tamperState: vehicle.tamperState || 'Unknown', // Handle missing tamperState
                status: status
            };
        });

        res.status(200).json(logs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching vehicle logs' });
    }
};
