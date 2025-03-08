const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');
const { checkUserVehicle } = require('../controllers/userController');

router.get('/has-vehicle', authMiddleware, checkUserVehicle);

module.exports = router;
