const express = require('express');
const router = express.Router();
const communityController = require('../controllers/communityController');
const { authMiddleware } = require('../middleware/authMiddleware');

// POST a message (Requires Authentication)
router.post('/post', authMiddleware, communityController.postMessage);

// GET all messages
router.get('/messages', communityController.getMessages);

module.exports = router;
