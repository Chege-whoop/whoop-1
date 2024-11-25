// routes/VehicleRoutes.js

const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController');

// Define routes and map them to controller functions

// GET all vehicles
router.get('/', vehicleController.getAllVehicles);

// POST a new vehicle
router.post('/', vehicleController.addVehicle);

// PUT (update) a vehicle by ID
router.put('/:id', vehicleController.updateVehicle);

// DELETE a vehicle by ID
router.delete('/:id', vehicleController.deleteVehicle);

// Route to fetch historical data for a specific vehicle
router.get('/vehicle-history/:vehicleId', vehicleController.getHistoricalData);

module.exports = router;
