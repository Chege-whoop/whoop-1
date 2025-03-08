const express = require("express");
const { authMiddleware } = require("../middleware/authMiddleware");
const { getUserProfile } = require("../controllers/profileController");

const router = express.Router();

router.get("/profile", authMiddleware, getUserProfile);

module.exports = router;
