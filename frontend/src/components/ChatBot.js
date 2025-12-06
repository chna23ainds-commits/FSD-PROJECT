import React, { useState, useRef, useEffect } from 'react';
import '../styles/ChatBot.css';

const ChatBot = ({ onClose, context = 'medicines' }) => {
    const [messages, setMessages] = useState([
        {
            text: context === 'medicines'
                ? 'Hi! I can help you with medicine-related questions, reminders, dosage information, and more. What would you like to know?'
                : 'Hi! I can help you with SOS, GPS, volunteers, emergency procedures, and more. What do you need?',
            sender: 'bot'
        }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const getMedicineResponse = (text) => {
        const lower = text.toLowerCase();

        const matchAny = (str, arr) => arr.some(word => str.includes(word));

        if (matchAny(lower, ['dosage', 'how much', 'dose', 'amount'])) {
            return 'For dosage information, please check your medicine bottle or consult your doctor. The app will remind you of the correct dosage you set.';
        } else if (matchAny(lower, ['reminder', 'notify', 'notification', 'alarm', 'time'])) {
            return 'You can set reminders in the Reminders tab. Choose your medicine, set the time, and frequency. You\'ll get notifications via SMS or email.';
        } else if (matchAny(lower, ['side effect', 'allergy', 'reaction', 'interact'])) {
            return 'If you experience side effects or allergies, stop taking the medicine and consult your doctor immediately. For drug interactions, always consult with a healthcare professional.';
        } else if (matchAny(lower, ['add', 'new', 'medicine', 'medication', 'drug'])) {
            return 'To add a new medicine: 1) Click "Add New Medicine", 2) Enter medicine name and dosage, 3) Set frequency and timing, 4) Click Save. That\'s it!';
        } else if (matchAny(lower, ['delete', 'remove', 'stop', 'discontinue'])) {
            return 'To remove a medicine, click the delete button on the medicine card. Confirm when prompted. Always consult your doctor before stopping medication.';
        } else if (matchAny(lower, ['frequency', 'how often', 'daily', 'weekly'])) {
            return 'You can set frequency as: Daily, Twice Daily, Weekly, or As Needed. Choose what fits your prescription.';
        } else if (matchAny(lower, ['timing', 'morning', 'evening', 'night', 'afternoon'])) {
            return 'You can set timing as: Morning, Afternoon, Evening, or Night. Select the times that match your medicine schedule.';
        } else if (matchAny(lower, ['stats', 'statistics', 'compliance', 'taken'])) {
            return 'Your statistics show total medicines, reminders, completed reminders, and compliance rate. Mark reminders as taken to track your compliance.';
        } else if (matchAny(lower, ['notification', 'sms', 'email', 'contact'])) {
            return 'You can receive notifications via SMS or Email. Enter your phone number and email in the settings for reminders.';
        } else if (matchAny(lower, ['help', 'how to', 'guide', 'support', 'tutorial'])) {
            return 'I can help with: adding medicines, setting reminders, managing dosage, setting frequency/timing, tracking compliance, and more. What specific help do you need?';
        } else {
            return 'I can help with medicines, reminders, dosage, frequency, timing, notifications, and compliance tracking. What would you like to know?';
        }
    };

    const getEmergencyResponse = (text) => {
        const lower = text.toLowerCase();

        const matchAny = (str, arr) => arr.some(word => str.includes(word));

        if (matchAny(lower, ['sos', 'panic', 'alert', 'emergency button'])) {
            return 'To activate SOS, press the big red button at the top.';
        } else if (matchAny(lower, ['gps', 'location', 'share location', 'track me', 'send my position'])) {
            return 'To share your GPS location, use the "Share GPS" button below the SOS.';
        } else if (matchAny(lower, ['volunteer', 'driver', 'helper', 'ride', 'contact person'])) {
            return 'You can call or message a volunteer from the list below.';
        } else if (matchAny(lower, ['instruction', 'steps', 'guide', 'how to', 'procedure'])) {
            return 'Emergency instructions: 1) Press SOS, 2) Share GPS, 3) Call volunteer, 4) Move to safety.';
        } else if (matchAny(lower, ['help', 'human', 'support', 'operator', 'real person'])) {
            return 'If you need human support, call 102 or use the emergency contacts.';
        } else {
            return 'I can help with SOS, GPS, volunteers, and instructions. What do you need?';
        }
    };

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { text: input, sender: 'user' };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput('');
        setLoading(true);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/chatbot`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: input, history: newMessages }),
            });

            if (response.ok) {
                const data = await response.json();
                setMessages(prev => [...prev, { text: data.reply, sender: 'bot' }]);
            } else {
                // Fallback to local responses if API fails
                const localReply = context === 'medicines'
                    ? getMedicineResponse(input)
                    : getEmergencyResponse(input);
                setMessages(prev => [...prev, { text: localReply, sender: 'bot' }]);
            }
        } catch (error) {
            console.error('Chatbot error:', error);
            // Fallback to local responses
            const localReply = context === 'medicines'
                ? getMedicineResponse(input)
                : getEmergencyResponse(input);
            setMessages(prev => [...prev, { text: localReply, sender: 'bot' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="chatbot-container">
            <div className="chatbot-header">
                <h3>Help Assistant</h3>
                <button className="close-btn" onClick={onClose}>&times;</button>
            </div>
            <div className="chatbot-messages">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`message ${msg.sender}`}>
                        <div className="message-content">
                            {msg.text}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="message bot">
                        <div className="message-content">
                            <span className="typing-indicator">
                                <span></span>
                                <span></span>
                                <span></span>
                            </span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            <div className="chatbot-input-area">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask a question..."
                    disabled={loading}
                    className="chatbot-input"
                />
                <button
                    onClick={handleSendMessage}
                    disabled={loading}
                    className="chatbot-send-btn"
                >
                    {loading ? '...' : '→'}
                </button>
            </div>
        </div>
    );
};

export default ChatBot;
