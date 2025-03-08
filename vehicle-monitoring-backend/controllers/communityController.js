const CommunityPost = require('../models/CommunityPost');

// 📩 Post a new message
exports.postMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const userId = req.user._id;  // Get user from auth middleware
        const username = req.user.username; 

        if (!message) {
            return res.status(400).json({ message: "Message cannot be empty" });
        }

        const newPost = new CommunityPost({ userId, username, message });
        await newPost.save();

        res.status(201).json({ message: "Message posted successfully", post: newPost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error while posting message" });
    }
};

// 📜 Fetch all community messages
exports.getMessages = async (req, res) => {
    try {
        const messages = await CommunityPost.find().sort({ timestamp: -1 }).populate('userId', 'username');
        res.json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error while fetching messages" });
    }
};
