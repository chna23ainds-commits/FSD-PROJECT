import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import '../styles/Auth.css';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext);

    const fillTestCredentials = () => {
        setEmail('test@test.com');
        setPassword('admin123');
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (isLogin) {
            // Login
            if (!email || !password) {
                setError('Email and password required');
                return;
            }
        } else {
            // Sign up
            if (!name.trim()) {
                setError('Name is required');
                return;
            }
            if (!email || !password) {
                setError('Email and password required');
                return;
            }
            if (password !== confirmPassword) {
                setError('Passwords do not match');
                return;
            }
            if (password.length < 6) {
                setError('Password must be at least 6 characters');
                return;
            }
        }

        setLoading(true);

        try {
            const endpoint = isLogin ? '/auth/sign-in' : '/auth/sign-up';
            const payload = isLogin
                ? { email, password }
                : { name, email, password };

            const response = await fetch(`${process.env.REACT_APP_API_URL}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const data = await response.json();
                setError(data.error || (isLogin ? 'Login failed' : 'Sign up failed'));
                return;
            }

            const data = await response.json();
            setAuth(data.user);
            navigate('/');
        } catch (err) {
            setError('An error occurred. Please try again.');
            console.error('Auth error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h1>MediTrack</h1>
                <h2>{isLogin ? 'Login' : 'Create Account'}</h2>

                {error && <div className="alert alert-error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name"
                            />
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                    </div>

                    {!isLogin && (
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm your password"
                            />
                        </div>
                    )}

                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? (isLogin ? 'Logging in...' : 'Creating account...') : (isLogin ? 'Login' : 'Sign Up')}
                    </button>
                </form>

                {isLogin && (
                    <div className="test-credentials">
                        <p><strong>Test Credentials:</strong></p>
                        <p>Email: test@test.com</p>
                        <p>Password: admin123</p>
                        <button type="button" onClick={fillTestCredentials} className="btn btn-fill">
                            Fill Test Credentials
                        </button>
                    </div>
                )}

                <div className="auth-toggle">
                    <p>
                        {isLogin ? "Don't have an account? " : 'Already have an account? '}
                        <button
                            type="button"
                            onClick={() => {
                                setIsLogin(!isLogin);
                                setError('');
                                setName('');
                                setEmail('');
                                setPassword('');
                                setConfirmPassword('');
                            }}
                            className="toggle-link"
                        >
                            {isLogin ? 'Sign Up' : 'Login'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
