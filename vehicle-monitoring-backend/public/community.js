document.addEventListener("DOMContentLoaded", () => {
    const chatBox = document.getElementById("chat-box");
    const sendBtn = document.getElementById("sendBtn");
    const messageInput = document.getElementById("message");

    // Fetch and display messages
    async function fetchMessages() {
        try {
            const response = await fetch('/api/community/messages');
            const messages = await response.json();
            
            chatBox.innerHTML = messages.map(msg => `
                <div class="message">
                    <strong>${msg.username}</strong>: ${msg.message}
                    <span class="timestamp">${new Date(msg.timestamp).toLocaleTimeString()}</span>
                </div>
            `).join('');
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    }

    // Post new message
    async function postMessage() {
        const message = messageInput.value.trim();
        if (!message) return alert("Message cannot be empty!");

        const token = localStorage.getItem("token");
        if (!token) return alert("Please log in first!");

        try {
            const response = await fetch('/api/community/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ message })
            });

            if (!response.ok) throw new Error("Failed to post message");

            messageInput.value = "";
            fetchMessages(); // Refresh messages
        } catch (error) {
            console.error("Error posting message:", error);
        }
    }

    sendBtn.addEventListener("click", postMessage);
    fetchMessages();
    setInterval(fetchMessages, 5000); // Auto-refresh every 5 seconds
});
