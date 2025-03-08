const Message = require("../models/message"); // Assuming you have a Message model

exports.sendMessage = async (req, res) => {
    try {
        const { vehicleId, driverPhone, message } = req.body;

        if (!vehicleId || !driverPhone || !message) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Store message in the database (Optional)
        const newMessage = new Message({ vehicleId, driverPhone, message });
        await newMessage.save();

        // Send the message using the GSM module logic
        // (Assume GSM logic is handled in another service/module)
        console.log(`Sending SMS to ${driverPhone}: ${message}`);

        res.status(200).json({ message: "Message sent successfully!" });

    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ message: "Failed to send message" });
    }
};
