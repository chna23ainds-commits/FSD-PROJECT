const express = require('express');
const router = express.Router();

// Chatbot route
router.post('/', (req, res) => {
    try {
        const { text, history } = req.body;

        if (!text) {
            return res.status(400).json({ error: 'Text is required' });
        }

        // Fuzzy matching and synonyms
        const lower = text.toLowerCase();
        let reply = '';

        const matchAny = (str, arr) => arr.some(word => str.includes(word));

        if (matchAny(lower, ['sos', 'panic', 'alert', 'emergency button'])) {
            reply = 'To activate SOS, press the big red button at the top.';
        } else if (matchAny(lower, ['gps', 'location', 'share location', 'track me', 'send my position'])) {
            reply = 'To share your GPS location, use the "Share GPS" button below the SOS.';
        } else if (matchAny(lower, ['volunteer', 'driver', 'helper', 'ride', 'contact person'])) {
            reply = 'You can call or message a volunteer from the list below.';
        } else if (matchAny(lower, ['instruction', 'steps', 'guide', 'how to', 'procedure'])) {
            reply = 'Emergency instructions: 1) Press SOS, 2) Share GPS, 3) Call volunteer, 4) Move to safety.';
        } else if (matchAny(lower, ['help', 'human', 'support', 'operator', 'real person'])) {
            reply = 'If you need human support, call 102 or use the emergency contacts.';
        } else if (history && Array.isArray(history) && history.length > 0) {
            // Multi-turn: reference last bot reply
            const lastBot = history.slice().reverse().find(m => m.sender === 'bot');
            if (lastBot) {
                reply = `Earlier you asked: "${lastBot.text}". Can you clarify your question?`;
            } else {
                reply = 'I can help with SOS, GPS, volunteers, and instructions. What do you need?';
            }
        } else {
            reply = 'I can help with SOS, GPS, volunteers, and instructions. What do you need?';
        }

        res.json({ reply });
    } catch (error) {
        console.error('Chatbot error:', error);
        res.status(500).json({ error: 'Chatbot service failed' });
    }
});

module.exports = router;
