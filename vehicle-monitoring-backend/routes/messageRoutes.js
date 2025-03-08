const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");

// Route to send a message
router.post("/send", messageController.sendMessage);

module.exports = router;
