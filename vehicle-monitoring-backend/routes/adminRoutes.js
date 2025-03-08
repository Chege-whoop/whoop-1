const express = require('express');
const { body } = require('express-validator');
const { adminSignup, adminLogin } = require('../controllers/adminController');

const router = express.Router();

//  Admin Signup Route
router.post(
    '/signup',
    [
        body('username').notEmpty().withMessage('Username is required'),
        body('email').isEmail().withMessage('Valid email is required'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
        body('adminkey').notEmpty().withMessage('Admin key is required'),
    ],
    adminSignup
);

//  Admin Login Route
router.post(
    '/login',
    [
        body('email').notEmpty().withMessage('Email is required'),
        body('password').notEmpty().withMessage('Password is required'),
    ],
    adminLogin
);

// router.get("/adminLogout", adminLogout); // Admin Logout Route

module.exports = router;
