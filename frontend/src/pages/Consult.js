import React, { useState, useRef, useEffect } from 'react';
import Header from '../components/Header';
import '../styles/Consult.css';

const Consult = () => {
    const [messages, setMessages] = useState([
        {
            text: '👋 Welcome! I\'m your healthcare assistant. How can I help?',
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [consultationType, setConsultationType] = useState('video');
    const [showConsultationOptions, setShowConsultationOptions] = useState(false);
    const [expandedProfessional, setExpandedProfessional] = useState(null);
    const messagesEndRef = useRef(null);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Healthcare professionals data
    const healthcareProfessionals = [
        {
            id: 1,
            category: 'Doctors',
            icon: '👨‍⚕️',
            description: 'Consult with qualified doctors',
            specialties: ['General Practitioner', 'Cardiologist', 'Neurologist', 'Pediatrician'],
            availability: '24/7',
            rating: 4.8,
            consultations: 2500,
            response: 'Connect with experienced doctors for diagnosis and treatment advice. They can review your medical history and prescribe medications.',
            action: 'Schedule Appointment',
            avgWaitTime: '5-10 mins'
        },
        {
            id: 2,
            category: 'Nurses',
            icon: '👩‍⚕️',
            description: 'Nursing support and care',
            specialties: ['General Nursing', 'Home Care', 'Wound Care', 'Post-operative'],
            availability: '24/7',
            rating: 4.9,
            consultations: 1800,
            response: 'Licensed nurses provide medical support, home care coordination, and patient education for ongoing health management.',
            action: 'Request Nurse Visit',
            avgWaitTime: '2-5 mins'
        },
        {
            id: 3,
            category: 'Therapists',
            icon: '🧠',
            description: 'Mental health and therapy',
            specialties: ['Psychologist', 'Counselor', 'Psychiatrist', 'Life Coach'],
            availability: 'Mon-Sun, 9AM-9PM',
            rating: 4.7,
            consultations: 1200,
            response: 'Professional mental health support for stress, anxiety, depression, and emotional wellbeing consultation.',
            action: 'Book Therapy Session',
            avgWaitTime: '15-30 mins'
        },
        {
            id: 4,
            category: 'Nutritionists',
            icon: '🥗',
            description: 'Dietary and nutrition advice',
            specialties: ['Dietician', 'Sports Nutrition', 'Clinical Nutrition', 'Weight Management'],
            availability: 'Mon-Sat, 10AM-6PM',
            rating: 4.6,
            consultations: 950,
            response: 'Get personalized nutrition plans for health goals, disease management, and lifestyle improvement.',
            action: 'Nutrition Consultation',
            avgWaitTime: '10-20 mins'
        },
        {
            id: 5,
            category: 'Physiotherapists',
            icon: '🏃',
            description: 'Physical therapy and rehab',
            specialties: ['Physical Therapy', 'Sports Medicine', 'Rehabilitation', 'Pain Management'],
            availability: 'Mon-Sat, 8AM-8PM',
            rating: 4.8,
            consultations: 1100,
            response: 'Expert guidance on physical therapy, rehabilitation exercises, and recovery from injuries.',
            action: 'Schedule PT Session',
            avgWaitTime: '20-30 mins'
        },
        {
            id: 6,
            category: 'Specialists',
            icon: '🔬',
            description: 'Specialist consultations',
            specialties: ['Dermatologist', 'ENT', 'Orthopedic', 'Gastroenterologist'],
            availability: 'Appointments Available',
            rating: 4.9,
            consultations: 1650,
            response: 'Get expert opinions from medical specialists for complex conditions and treatment planning.',
            action: 'Consult Specialist',
            avgWaitTime: '30-60 mins'
        }
    ];

    // Quick suggestions
    const suggestions = [
        { text: 'Connect with Doctor', emoji: '👨‍⚕️' },
        { text: 'Find Nurse Support', emoji: '👩‍⚕️' },
        { text: 'Mental Health', emoji: '🧠' },
        { text: 'Emergency Help', emoji: '🚨' }
    ];

    // Consultation types
    const consultationTypes = [
        { id: 'video', label: 'Video Call', icon: '📹', duration: '30 min', price: '$49' },
        { id: 'phone', label: 'Phone Call', icon: '☎️', duration: '30 min', price: '$39' },
        { id: 'in-clinic', label: 'In-Clinic', icon: '🏥', duration: '60 min', price: '$89' },
        { id: 'home', label: 'Home Visit', icon: '🏠', duration: 'Variable', price: '$129+' }
    ];

    const getConsultationResponse = (text) => {
        const lower = text.toLowerCase();
        const matchAny = (str, arr) => arr.some(word => str.includes(word));

        if (matchAny(lower, ['doctor', 'physician', 'consult doctor', 'general practitioner'])) {
            return '👨‍⚕️ **Connect with Doctors:**\n\n**Our Medical Doctors Offer:**\n✓ General Health Consultations\n✓ Symptom Diagnosis\n✓ Prescription Services\n✓ Medical History Review\n✓ Follow-up Care\n\n**Specialties Available:**\n• Cardiologist (Heart & Vascular)\n• Neurologist (Brain & Nervous)\n• Pediatrician (Children)\n• General Practitioner\n\n**Availability:** 24/7 Emergency, Scheduled Appointments Available\n\n💡 Have your symptoms ready and recent medical history handy!';
        } else if (matchAny(lower, ['nurse', 'nursing', 'care support', 'medical assistant'])) {
            return '👩‍⚕️ **Nursing Support & Care:**\n\n**Nursing Services Include:**\n✓ Medical Care Coordination\n✓ Home Care Support\n✓ Wound & Post-operative Care\n✓ Patient Education\n✓ Medication Management\n✓ Health Monitoring\n\n**Types of Nurses Available:**\n• Registered Nurses (RN)\n• Licensed Practical Nurses (LPN)\n• Home Health Nurses\n• Specialized Care Nurses\n\n**24/7 Support Available**\n\n📱 Emergency nursing assistance on-call anytime!';
        } else if (matchAny(lower, ['therapist', 'mental health', 'psychology', 'counselor', 'psychiatrist'])) {
            return '🧠 **Mental Health & Therapy:**\n\n**Professional Services:**\n✓ Psychological Counseling\n✓ Stress & Anxiety Management\n✓ Depression Support\n✓ Behavioral Therapy\n✓ Emotional Wellbeing\n✓ Life Coaching\n\n**Licensed Professionals:**\n• Clinical Psychologists\n• Licensed Counselors\n• Psychiatrists\n• Mental Health Coaches\n\n**Hours:** Monday-Sunday, 9AM-9PM\n\n🤝 Confidential, judgment-free support for your mental wellbeing!';
        } else if (matchAny(lower, ['nutritionist', 'diet', 'nutrition', 'weight', 'food'])) {
            return '🥗 **Nutrition & Dietitian Services:**\n\n**Dietary Services Include:**\n✓ Personalized Nutrition Plans\n✓ Weight Management Programs\n✓ Disease-Specific Diets\n✓ Sports Nutrition\n✓ Food Allergy Guidance\n✓ Lifestyle Counseling\n\n**Expert Nutritionists:**\n• Registered Dieticians\n• Clinical Nutritionists\n• Sports Nutritionists\n• Wellness Coaches\n\n**Hours:** Monday-Saturday, 10AM-6PM\n\n📊 Custom meal plans tailored to your health goals!';
        } else if (matchAny(lower, ['physiotherapist', 'physical therapy', 'pt', 'rehabilitation', 'exercise', 'injury'])) {
            return '🏃 **Physical Therapy & Rehabilitation:**\n\n**PT Services Include:**\n✓ Injury Rehabilitation\n✓ Post-Surgery Recovery\n✓ Pain Management\n✓ Exercise Programs\n✓ Mobility Improvement\n✓ Sports Medicine\n\n**Specialized Areas:**\n• Orthopedic Rehabilitation\n• Neurological Therapy\n• Sports Injury Recovery\n• Post-operative Care\n\n**Hours:** Monday-Saturday, 8AM-8PM\n\n💪 Get back to peak physical condition with expert guidance!';
        } else if (matchAny(lower, ['specialist', 'dermatologist', 'ent', 'orthopedic', 'gastro', 'complex'])) {
            return '🔬 **Medical Specialists:**\n\n**Available Specialties:**\n✓ Dermatologist (Skin & Hair)\n✓ ENT (Ear, Nose, Throat)\n✓ Orthopedic (Bones & Joints)\n✓ Gastroenterologist (Digestive)\n✓ Cardiologist (Heart)\n✓ Neurologist (Brain)\n\n**Specialist Services:**\n• Expert Diagnosis\n• Advanced Treatment Plans\n• Surgical Consultations\n• Complex Case Management\n\n**Appointment Availability:** Check specific specialty\n\n🎯 Advanced care for complex medical conditions!';
        } else if (matchAny(lower, ['sos', 'emergency', 'help', 'urgent', 'alert'])) {
            return '🚨 **SOS Emergency Protocol:**\n\n1. **Press SOS Button** - Instantly alerts emergency contacts\n2. **Share GPS Location** - Your location will be shared\n3. **Send Alerts** - SMS/Email sent to emergency contacts\n4. **Stay Calm** - Help is on the way\n5. **Call Services** - Ring 102 or local emergency number\n\n**Connect with Emergency Doctor:**\n✓ 24/7 Doctor availability\n✓ Immediate consultation\n✓ Emergency instructions\n\nIf in immediate danger, contact emergency services first!';
        } else if (matchAny(lower, ['appointment', 'schedule', 'booking', 'when', 'time'])) {
            return '📅 **Scheduling Appointments:**\n\n**How to Book:**\n1. Select healthcare professional category\n2. Choose specific provider\n3. Pick available time slot\n4. Confirm appointment details\n5. Receive confirmation SMS/Email\n\n**Appointment Types:**\n• Video Consultation (30 min)\n• Phone Consultation (30 min)\n• In-clinic Visit (60 min)\n• Home Visit (varies)\n\n**Cancellation:** 24 hours notice for refund\n\n✅ Easy online booking, professional healthcare at your fingertips!';
        } else if (matchAny(lower, ['professional', 'healthcare', 'doctor', 'medical', 'consult'])) {
            return '🏥 **Connect with Healthcare Professionals:**\n\n**Available Services:**\n👨‍⚕️ **Doctors** - General & Specialty consultations\n👩‍⚕️ **Nurses** - Nursing care & support\n🧠 **Therapists** - Mental health & counseling\n🥗 **Nutritionists** - Dietary guidance\n🏃 **Physiotherapists** - Physical therapy\n🔬 **Specialists** - Expert consultations\n\n**All Services:**\n✓ Licensed professionals\n✓ Quick response time\n✓ Affordable rates\n✓ Confidential care\n\n💬 Click on a professional category to learn more!';
        } else {
            return 'ℹ️ **How Can I Help You?**\n\n**I can help you connect with:**\n👨‍⚕️ Doctors\n👩‍⚕️ Nurses\n🧠 Mental Health Therapists\n🥗 Nutritionists\n🏃 Physiotherapists\n🔬 Medical Specialists\n\n**Other Support:**\n🚨 Emergency Services\n📅 Appointment Booking\n💊 Medical Information\n\nWhich service interests you?';
        }
    };

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { text: input, sender: 'user', timestamp: new Date() };
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
                setMessages(prev => [...prev, { text: data.reply, sender: 'bot', timestamp: new Date() }]);
            } else {
                const botResponse = getConsultationResponse(input);
                setMessages(prev => [...prev, { text: botResponse, sender: 'bot', timestamp: new Date() }]);
            }
        } catch (error) {
            console.error('Chatbot error:', error);
            const botResponse = getConsultationResponse(input);
            setMessages(prev => [...prev, { text: botResponse, sender: 'bot', timestamp: new Date() }]);
        } finally {
            setLoading(false);
        }
    };

    const handleBookAppointment = (professional) => {
        const appointmentMsg = `📅 **Book Appointment with ${professional.category}**\n\n` +
            `⭐ Rating: ${professional.rating}/5 (${professional.consultations} consultations)\n` +
            `⏱️ Average Wait Time: ${professional.avgWaitTime}\n\n` +
            `**Consultation Types:**\n` +
            consultationTypes.map(ct => `• ${ct.icon} ${ct.label} - ${ct.duration} (${ct.price})`).join('\n') +
            `\n\n**Specialties:** ${professional.specialties.join(', ')}\n\n` +
            `📞 Ready to book? Confirm consultation type and we'll proceed!`;

        setMessages(prev => [...prev, {
            text: appointmentMsg,
            sender: 'bot',
            timestamp: new Date(),
            professional: professional
        }]);
    };

    const handleEmergency = () => {
        const emergencyMsg = `🚨 **EMERGENCY RESPONSE MODE ACTIVATED**\n\n` +
            `**Immediate Actions:**\n` +
            `1️⃣ Emergency Hotline: 102 (Ambulance)\n` +
            `2️⃣ Police: 100\n` +
            `3️⃣ Fire: 101\n\n` +
            `**24/7 Emergency Doctors Available:**\n` +
            `✓ Video Consultation: Immediate\n` +
            `✓ Phone Consultation: Within 1 minute\n` +
            `✓ Ambulance Dispatch: On standby\n\n` +
            `**Share Location:** Enable GPS for immediate assistance\n` +
            `**Describe Emergency:** Tell us what's happening\n\n` +
            `👨‍⚕️ Emergency Doctor: Ready to assist immediately!`;

        setMessages(prev => [...prev, {
            text: emergencyMsg,
            sender: 'bot',
            timestamp: new Date(),
            emergency: true
        }]);
    };

    const handleSuggestion = (suggestion) => {
        setInput(suggestion.text);
    };

    return (
        <div className="consult">
            <Header />
            <div className="consult-container">
                <div className="consult-header">
                    <h1>🏥 Medical Consultations</h1>
                    <p>Connect with healthcare professionals for comprehensive medical guidance</p>
                </div>

                <div className="consult-content">
                    <div className="professionals-panel">
                        <div className="professionals-header">
                            <h2>Healthcare Professionals</h2>
                            <p>Connect with qualified professionals</p>
                        </div>
                        <div className="professionals-list">
                            {healthcareProfessionals.map((professional) => (
                                <div
                                    key={professional.id}
                                    className={`professional-card-modern ${selectedService?.id === professional.id ? 'active' : ''} ${expandedProfessional?.id === professional.id ? 'expanded' : ''}`}
                                    onClick={() => {
                                        setSelectedService(professional);
                                        setExpandedProfessional(expandedProfessional?.id === professional.id ? null : professional);
                                    }}
                                >
                                    <div className="card-top">
                                        <span className="pro-icon">{professional.icon}</span>
                                        <div className="pro-header">
                                            <h4>{professional.category}</h4>
                                            <div className="pro-rating">
                                                <span className="stars">{professional.rating}⭐</span>
                                                <span className="count">({professional.consultations})</span>
                                            </div>
                                        </div>
                                    </div>
                                    {expandedProfessional?.id === professional.id && (
                                        <div className="card-body">
                                            <p className="card-desc">{professional.description}</p>
                                            <div className="card-stats">
                                                <span className="stat">⏱️ {professional.avgWaitTime}</span>
                                                <span className="stat">📍 {professional.availability}</span>
                                            </div>
                                            <button
                                                className="btn-book"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleBookAppointment(professional);
                                                }}
                                            >
                                                Book Appointment
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="chat-section">
                        <div className="chat-header">
                            <h2>💬 Chat Assistant</h2>
                            <p>Get instant medical guidance</p>
                        </div>

                        <div className="messages-area">
                            {messages.map((msg, idx) => (
                                <div key={idx} className={`msg-bubble ${msg.sender}`}>
                                    <div className="msg-text">{msg.text}</div>
                                    <div className="msg-time">
                                        {msg.timestamp?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                            ))}
                            {loading && (
                                <div className="msg-bubble bot">
                                    <div className="msg-text">
                                        <span className="typing">
                                            <span></span><span></span><span></span>
                                        </span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {messages.length === 1 && !loading && (
                            <div className="quick-actions">
                                {suggestions.map((sugg, idx) => (
                                    <button
                                        key={idx}
                                        className="quick-btn"
                                        onClick={() => handleSuggestion(sugg)}
                                    >
                                        <span>{sugg.emoji}</span> {sugg.text}
                                    </button>
                                ))}
                            </div>
                        )}

                        <div className="input-box">
                            <div className="input-row">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="Ask me anything...\"></input>
                                <button
                                    onClick={handleSendMessage}
                                    disabled={loading || !input.trim()}
                                    className="btn-send"
                                >
                                    ✉️
                                </button>
                            </div>
                            <button
                                onClick={handleEmergency}
                                className="btn-sos"
                            >
                                🚨 Emergency
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Consult;
