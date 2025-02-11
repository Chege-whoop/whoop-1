const express = require('express');
const { body } = require('express-validator');
const { signup, login} = require('../controllers/authController');

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

module.exports = router;
