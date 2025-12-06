import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import ChatBot from '../components/ChatBot';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/Dashboard.css';

const Dashboard = () => {
    const { t } = useLanguage();
    const [showChatBot, setShowChatBot] = useState(false);

    return (
        <>
            <div className="dashboard">
                <Header />
                <div className="dashboard-container">
                    <div className="welcome-section">
                        <h1 className="dashboard-title">{t('dashboard.welcome')}</h1>
                        <p className="dashboard-subtitle">Manage your health, medicines and emergency services in one place</p>
                    </div>
                    <div className="feature-grid">
                        <Link to="/consult" className="feature-card">
                            <h2>{t('dashboard.consultations')}</h2>
                            <p>{t('dashboard.consultationsDesc')}</p>
                        </Link>
                        <Link to="/records" className="feature-card">
                            <h2>{t('dashboard.medicalRecords')}</h2>
                            <p>{t('dashboard.medicalRecordsDesc')}</p>
                        </Link>
                        <Link to="/emergency" className="feature-card">
                            <h2>{t('dashboard.emergency')}</h2>
                            <p>{t('dashboard.emergencyDesc')}</p>
                        </Link>
                        <Link to="/pharmacy" className="feature-card">
                            <h2>{t('dashboard.pharmacy')}</h2>
                            <p>{t('dashboard.pharmacyDesc')}</p>
                        </Link>
                        <Link to="/symptoms" className="feature-card">
                            <h2>{t('dashboard.symptoms')}</h2>
                            <p>{t('dashboard.symptomsDesc')}</p>
                        </Link>
                        <Link to="/medicines" className="feature-card">
                            <h2>💊 Medicines & Reminders</h2>
                            <p>Manage your medications and set reminders for timely intake</p>
                        </Link>
                    </div>
                </div>
            </div>

            {/* ChatBot Toggle Button */}
            {!showChatBot && (
                <button
                    className="chatbot-toggle-btn"
                    onClick={() => setShowChatBot(true)}
                    title="Open Help Assistant"
                >
                    💬
                </button>
            )}

            {/* ChatBot Component */}
            {showChatBot && (
                <ChatBot
                    onClose={() => setShowChatBot(false)}
                    context="general"
                />
            )}
        </>
    );
};

export default Dashboard;
