require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'i love cloud based computing and IOT';
const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY || 'adminsonly';

// Admin Signup
exports.adminSignup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, adminkey } = req.body;

    try {
        console.log('Admin signup request received:', req.body);
        console.log('ADMIN_SECRET_KEY:', ADMIN_SECRET_KEY);

        // Check if adminKey is correct
        if (adminkey !== ADMIN_SECRET_KEY) {
            return res.status(403).json({ message: 'Invalid admin key' });
        }

        // Check if user exists
        const existingAdmin = await User.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save new admin with isAdmin set to true
        const admin = new User({ username, email, password: hashedPassword, isAdmin: true });
        await admin.save();

        res.status(201).json({ message: 'Admin registered successfully', isAdmin: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Admin Login
exports.adminLogin = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Check if admin exists
        const admin = await User.findOne({ email, isAdmin: true });
        if (!admin) {
            return res.status(400).json({ message: 'Admin not found or incorrect email' });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        // Generate token with isAdmin flag
        const token = jwt.sign({ userId: admin.id, isAdmin: true }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, isAdmin: true, message: 'Admin login successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
