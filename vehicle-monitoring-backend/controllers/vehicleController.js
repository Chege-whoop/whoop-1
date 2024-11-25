// controllers/VehicleController.js

const Vehicle = require('../models/Vehicle');

// Get all vehicles
exports.getAllVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.json(vehicles);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching vehicle data' });
    }
};

// Add a new vehicle
exports.addVehicle = async (req, res) => {
    try {
        const newVehicle = new Vehicle(req.body);
        await newVehicle.save();
        res.status(201).json(newVehicle);
    } catch (error) {
        res.status(500).json({ message: 'Error adding vehicle data' });
    }
};

// Update a vehicle by ID
exports.updateVehicle = async (req, res) => {
    try {
        const updatedVehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedVehicle);
    } catch (error) {
        res.status(500).json({ message: 'Error updating vehicle data' });
    }
};

// Delete a vehicle by ID
exports.deleteVehicle = async (req, res) => {
    try {
        await Vehicle.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting vehicle data' });
    }
};

const Vehicle = require('../models/Vehicle');

// Fetch historical data for a specific vehicle
exports.getHistoricalData = async (req, res) => {
  const { vehicleId } = req.params;

  try {
    const data = await Vehicle.getHistoricalData(vehicleId);
    res.json(data); // Send data as JSON response
  } catch (error) {
    console.error("Error fetching historical data:", error);
    res.status(500).json({ error: 'Error fetching historical data' });
  }
};
