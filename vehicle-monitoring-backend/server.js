require('dotenv').config();
const mongoURI = process.env.MONGO_URI;
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));

// Vehicle model schema
const vehicleSchema = new mongoose.Schema({
    vehicleId: String,
    speed: Number,
    //"location": { "latitude": 12.9716, "longitude": 77.5946 },
    tamperStatus: Boolean,
    driverPhoneNumber: String,
    timestamp: { type: Date, default: Date.now }
});
const Vehicle = mongoose.model('Vehicle', vehicleSchema);

// API Endpoints

// 1. Get all vehicles
app.get('/api/vehicles', async (req, res) => {
    try {
        const vehicles = await Vehicle.find();
        res.json(vehicles);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching vehicle data' });
    }
});

// 2. Add a new vehicle record
app.post('/api/vehicles', async (req, res) => {
    try {
        const newVehicle = new Vehicle(req.body);
        await newVehicle.save();
        res.status(201).json(newVehicle);
    } catch (error) {
        res.status(500).json({ message: 'Error adding vehicle data' });
    }
});

// 3. Update a vehicle record by ID
app.put('/api/vehicles/:id', async (req, res) => {
    try {
        const updatedVehicle = await Vehicle.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedVehicle);
    } catch (error) {
        res.status(500).json({ message: 'Error updating vehicle data' });
    }
});

// 4. Delete a vehicle record by ID
app.delete('/api/vehicles/:id', async (req, res) => {
    try {
        await Vehicle.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting vehicle data' });
    }
});

app.get('/api/vehicles/:id', async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id); // findById uses req.params.id
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        res.json(vehicle);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching vehicle data' });
    }
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashbord.html'));
});

const VehicleData = mongoose.model('VehicleData', vehicleSchema);

// API to fetch historical data for a vehicle
app.get('/vehicle-history/:vehicleId', async (req, res) => {
  const { vehicleId } = req.params;

  try {
    const data = await VehicleData.find({ vehicleId }).sort({ timestamp: 1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching vehicle data' });
  }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
