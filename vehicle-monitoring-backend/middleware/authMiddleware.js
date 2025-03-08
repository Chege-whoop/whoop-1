const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'i love cloud based computing and IOT';

exports.authMiddleware = async (req, res, next) => {
    try {
        // Extract token from "Authorization: Bearer <token>"
        const authHeader = req.header('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Access denied. No token provided.' });
        }

        // Get the token value
        const token = authHeader.split(' ')[1]; 

        console.log("🔑 Token:", token);

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Fetch user details (optional)
        const user = await User.findById(decoded.userId).select('-password');
        if (!user) return res.status(401).json({ message: 'User not found' });

        // Attach user to request
        req.user = user;

        console.log("Middleware extracted user:", req.user);

        next();
    } catch (error) {
        return res.status(403).json({ message: 'Invalid or expired token' });
    }
};

// Admin-only middleware
exports.adminMiddleware = async (req, res, next) => {
    try {
        console.log('Full token payload:', req.user);
        const user = await User.findById(req.user.userId);
        if (!req.user.isAdmin) {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }
        next();
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

