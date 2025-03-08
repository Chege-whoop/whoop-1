const Vehicle = require('../models/Vehicle');
const path = require('path');
const fs = require('fs');

// Multer for image upload
const multer = require('multer');
const Module = require('module');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, '../public/images');

        console.log('__dirname:', __dirname);
        console.log('Upload Directory Path:', uploadDir);
        console.log('Directory Exists:', fs.existsSync(uploadDir));

        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage });

// 🚀 Register a new vehicle
const registerVehicle = async (req, res) => {

    try {
        console.log("✅ Authenticated User:", req.user);
        console.log("👤 Extracted Owner ID:", req.user ? req.user._id : 'No user attached');


        const ownerId = req.user._id;  // Getting user ID from token
        console.log("👤 Owner ID:", ownerId);

         console.log("🚀 Incoming request body:", req.body);
        console.log("📂 Incoming file:", req.file);

        const { vehicleName, driverPhone, vehicleType, plateNumber, currentSpeed, tamperState } = req.body;
        const profileImage = req.file ? `/images/${req.file.filename}` : null;

        const newVehicle = new Vehicle({
            ownerId,
            vehicleName,
            driverPhone,
            vehicleType,
            plateNumber,
            currentSpeed,
            tamperState,
            profileImage
        });

        await newVehicle.save();
        res.status(201).json({ message: 'Vehicle registered successfully!', vehicle: newVehicle });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error during vehicle registration' });
    }
};

// Export multer middleware
exports.upload = upload.single('profileImage');

const allVehicles = async(req,res)=>{
    try {
        const vehicles = await Vehicle.find();
        res.status(200).json(vehicles);
       } catch (error) {
           res.status(500).json({ message: 'Error fetching vehicle data at backend' });
       } 
};

const getVehicleById = async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }
        res.status(200).json(vehicle);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error fetching vehicle details' });
    }
};

// update a vehicle
const updateVehicle = async (req, res) => {
    try {
        const { vehicleName, driverPhone, vehicleType, plateNumber, currentSpeed, tamperState } = req.body;
        const profileImage = req.file ? `/images/${req.file.filename}` : undefined;

        const updatedVehicle = await Vehicle.findByIdAndUpdate(
            req.params.id,
            { vehicleName, driverPhone, vehicleType, plateNumber, currentSpeed, tamperState, profileImage },
            { new: true, omitUndefined: true }
        );

        if (!updatedVehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }

        res.status(200).json({ message: 'Vehicle updated successfully!', vehicle: updatedVehicle });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating vehicle' });
    }
};

const deleteVehicle = async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id);
        if (!vehicle) {
            return res.status(404).json({ message: 'Vehicle not found' });
        }

        if (vehicle.profileImage) {
            const imagePath = path.join(__dirname, '../public', vehicle.profileImage);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath); // Delete image file from server
            }
        }

        await Vehicle.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Vehicle deleted successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting vehicle' });
    }
};

module.exports = { upload, registerVehicle, allVehicles, getVehicleById, updateVehicle, deleteVehicle };