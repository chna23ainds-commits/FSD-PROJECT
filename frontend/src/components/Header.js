import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import '../styles/Header.css';

const Header = () => {
    const { auth, setAuth } = useContext(AuthContext);
    const { language, changeLanguage, t } = useLanguage();
    const { isDark, toggleDarkMode } = useTheme();
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await fetch(`${process.env.REACT_APP_API_URL}/auth/sign-out`, {
                method: 'POST',
                credentials: 'include',
            });
            setAuth(null);
            navigate('/auth');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const userInitials = auth?.email?.split('@')[0]?.charAt(0).toUpperCase() || 'U';

    return (
        <header className="header">
            <div className="header-container">
                <div className="header-left">
                    <div className="logo-section">
                        <span className="logo-icon">🏥</span>
                        <h1 className="header-title">MediTrack</h1>
                    </div>
                </div>

                {auth && (
                    <div className="header-actions">
                        <div className="user-info">
                            <div className="user-avatar">{userInitials}</div>
                            <span className="user-email">{auth.email}</span>
                        </div>

                        <div className="header-controls">
                            {/* Language Switcher */}
                            <select
                                className="language-select"
                                value={language}
                                onChange={(e) => changeLanguage(e.target.value)}
                                aria-label="Select language"
                            >
                                <option value="en">🇬🇧 English</option>
                                <option value="kn">🇮🇳 ಕನ್ನಡ</option>
                            </select>

                            {/* Dark Mode Toggle */}
                            <button
                                className="theme-toggle"
                                onClick={toggleDarkMode}
                                title={isDark ? 'Light mode' : 'Dark mode'}
                                aria-label="Toggle dark mode"
                            >
                                {isDark ? '☀️' : '🌙'}
                            </button>

                            <button
                                onClick={handleLogout}
                                className="btn btn-logout"
                                title="Sign out of your account"
                            >
                                <span className="logout-icon">🚪</span>
                                {t('common.logout')}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
