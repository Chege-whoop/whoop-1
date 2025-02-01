require('dotenv').config();
const mongoURI = process.env.MONGO_URI;
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const User = require('./models/User');
const authRoutes = require('./routes/authRoutes');
const Vehicle = require('./models/Vehicle'); // Import Vehicle model
const authMiddleware = require('./middleware/authMiddleware');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'public')));

// Use auth routes
app.use('/api/auth', authRoutes);

mongoose.set('debug', true);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));

app.get('/api/dashboard', authMiddleware, (req, res) => {
    res.json({ message: `Welcome, User ID: ${req.user.userId}` });
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html')); // Ensure 'signup.html' exists
});

// Serve login page (you can create a login page as well)
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));// Ensure 'login.html' exists
});

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

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
