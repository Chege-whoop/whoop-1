const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'i love cloud based vehicle monitoring, cloud computing and IOT';

module.exports = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // Attach user info to request
        next();
    } catch (error) {
        res.status(403).json({ message: 'Invalid token.' });
    }
};
