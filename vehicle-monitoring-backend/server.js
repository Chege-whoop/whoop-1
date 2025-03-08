require('dotenv').config();
const mongoURI = process.env.MONGO_URI;
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const logsRoutes = require('./routes/logsRoutes')
const userRoutes = require('./routes/userRoutes');
const profileRoutes = require('./routes/profileRoutes');
const communityRoutes = require('./routes/communityRoutes');
const vehicleRoutes = require('./routes/vehicleRoutes');
const locationRoutes = require('./routes/locationRoutes');
const messageRoutes = require('./routes/messageRoutes');
const { authMiddleware, adminMiddleware } = require('./middleware/authMiddleware');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
// Middleware to parse JSON bodies
app.use(express.json());

app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'public')));

// Use auth routes
app.use('/api/auth', authRoutes);
// use admin routes
app.use('/api/admin', adminRoutes);
// user profile routes
app.use('/api/profile', profileRoutes);
// API Routes for vehicle registration
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/user', userRoutes);  
app.use('/api/logs', logsRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/location', locationRoutes);
app.use('/api/messages', messageRoutes);

mongoose.set('debug', true);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error('MongoDB connection error:', error));

    // test api
app.get('/api/auth', (req, res) => {
    res.json({ message: 'API is working' });
});

// Test Route for Admins Only
app.get('/api/admin', authMiddleware, adminMiddleware, (req, res) => {
    res.json({ message: 'Admin access granted!' });
});

app.get('/api/dashbord', authMiddleware, (req, res) => {
    res.json({ message: `Welcome, User ID: ${req.user.userId}` });
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html')); // Ensure 'signup.html' exists
});

app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Serve login page (you can create a login page as well)
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));// Ensure 'login.html' exists
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
