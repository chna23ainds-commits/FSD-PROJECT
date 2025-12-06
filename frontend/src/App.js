import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import PrivateRoute from './components/PrivateRoute';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import Consult from './pages/Consult';
import Records from './pages/Records';
import Emergency from './pages/Emergency';
import Pharmacy from './pages/Pharmacy';
import Symptoms from './pages/Symptoms';
import MedicinesManagement from './pages/MedicinesManagement';
import './styles/App.css';

function App() {
    const [auth, setAuth] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/user`, {
                    credentials: 'include',
                });

                if (response.ok) {
                    const user = await response.json();
                    setAuth(user);
                }
            } catch (error) {
                console.error('Auth check failed:', error);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <ThemeProvider>
            <LanguageProvider>
                <AuthContext.Provider value={{ auth, setAuth }}>
                    <Router>
                        <Routes>
                            <Route path="/auth" element={<AuthPage />} />
                            <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                            <Route path="/consult" element={<PrivateRoute><Consult /></PrivateRoute>} />
                            <Route path="/records" element={<PrivateRoute><Records /></PrivateRoute>} />
                            <Route path="/emergency" element={<PrivateRoute><Emergency /></PrivateRoute>} />
                            <Route path="/pharmacy" element={<PrivateRoute><Pharmacy /></PrivateRoute>} />
                            <Route path="/symptoms" element={<PrivateRoute><Symptoms /></PrivateRoute>} />
                            <Route path="/medicines" element={<PrivateRoute><MedicinesManagement /></PrivateRoute>} />
                            <Route path="*" element={<Navigate to={auth ? "/" : "/auth"} replace />} />
                        </Routes>
                    </Router>
                </AuthContext.Provider>
            </LanguageProvider>
        </ThemeProvider>
    );
}

export default App;
