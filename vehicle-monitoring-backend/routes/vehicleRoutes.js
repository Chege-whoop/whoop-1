const express = require('express');
// const vehicleController = require('../controllers/vehicleController');
const { upload, registerVehicle, allVehicles, getVehicleById, updateVehicle, deleteVehicle } = require('../controllers/vehicleController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();
// console.log('Authenticated User:', req.user);
// Register vehicle (with authentication & image upload)
router.post('/register', authMiddleware, upload.single("profileImage"), registerVehicle);
router.get('/allVehicles', allVehicles);
router.get('/getVehicleById/:id', getVehicleById);
router.put('/updateVehicle/:id', upload.single("profileImage"), updateVehicle);
router.delete('/:id', deleteVehicle);
// router.post('/deleteVehicle', vehicleController.deleteVehicle);

module.exports = router;