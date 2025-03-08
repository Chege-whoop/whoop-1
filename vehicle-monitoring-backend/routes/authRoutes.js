const express = require('express');
const { body } = require('express-validator');
const { signup, login, logout } = require('../controllers/authController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

// Signup route
router.post(
    '/signup',
    [
        body('username').notEmpty().withMessage('Username is required'),
        body('email').isEmail().withMessage('Valid email is required'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    ],
    signup
);

// Login route
router.post(
    '/login',
    [
        body('email').notEmpty().withMessage('Email is required'),
        body('password').notEmpty().withMessage('Password is required'),
    ],
    login
);

router.get('/user', authMiddleware, (req, res) => {
    res.json({ user: req.user });
});


router.post('/logout', authMiddleware, logout);

module.exports = router;
