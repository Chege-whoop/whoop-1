const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/update', locationController.updateLocation);
router.get('/:userId', authMiddleware, locationController.getVehicleLocation);
// router.get('/:id', authMiddleware, locationController.getUserLocation);

module.exports = router;
