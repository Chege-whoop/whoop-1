// models/Vehicle.js

const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    vehicleId: { type: String, required: true },
    speed: { type: Number, required: true },
    tamperStatus: { type: Boolean, default: false },
    driverPhoneNumber: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});


vehicleSchema.statics.getHistoricalData = async function (vehicleId) {
    return this.find({ vehicleId }).sort({ timestamp: 1 });
  };

module.exports = mongoose.model('Vehicle', vehicleSchema);
