require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');
//bodyparser required

const JWT_SECRET = process.env.JWT_SECRET || 'i love cloud based computing and IOT'; // Store securely in .env
const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY || 'adminsonly';


// User signup controller
exports.signup = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password, adminKey } = req.body;

    try {
        // Check if user exists
        console.log('Signup request received:', req.body);
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash password
        console.log('Hashing password...');
        const hashedPassword = await bcrypt.hash(password, 10);

        const isAdmin = adminkey === ADMIN_SECRET_KEY;

        // Save new user
        console.log('Saving new user...');
        const user = new User({ username, email, password: hashedPassword, isAdmin: isAdmin || false });
        await user.save();

        res.status(201).json({ message: 'User registered successfully', isAdmin });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// User login controller
exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Generate token


        const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, message: 'Login successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
