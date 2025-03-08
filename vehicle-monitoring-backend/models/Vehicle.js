const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    vehicleName: { type: String, required: true },
    driverPhone: { type: String, required: true },
    vehicleType: { type: String, required: true },
    plateNumber: { type: String, required: true, unique: true },
    currentSpeed: { type: Number, required: true },
    tamperState: { type: String, enum: ['good', 'moderate', 'critical'], required: true },
    profileImage: { type: String } // Stores image path
});

module.exports = mongoose.model('Vehicle', VehicleSchema);
