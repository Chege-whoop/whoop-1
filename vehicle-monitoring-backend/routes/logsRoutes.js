const express = require('express');
const { getVehicleLogs } = require('../controllers/logsController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/user', authMiddleware, getVehicleLogs);

module.exports = router;
