import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import '../styles/Login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [focusedField, setFocusedField] = useState(null);
    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/sign-in`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const data = await response.json();
                setError(data.error || 'Login failed');
                return;
            }

            const data = await response.json();
            setAuth(data.user);
            navigate('/');
        } catch (err) {
            setError('An error occurred. Please try again.');
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };

    const fillTestCredentials = () => {
        setEmail('test@test.com');
        setPassword('admin123');
        setError('');
    };

    return (
        <div className="login-container">
            <div className="login-wrapper">
                <div className="login-box">
                    <div className="auth-header">
                        <div className="logo-icon">🏥</div>
                        <h1>Welcome Back</h1>
                        <p className="subtitle">Sign in to your MediTrack account</p>
                    </div>

                    {error && (
                        <div className="alert alert-error" role="alert">
                            <span className="alert-icon">⚠️</span>
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label htmlFor="email">Email Address</label>
                            <div className="input-wrapper">
                                <span className="input-icon">✉️</span>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onFocus={() => setFocusedField('email')}
                                    onBlur={() => setFocusedField(null)}
                                    required
                                    className={focusedField === 'email' ? 'focused' : ''}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <div className="input-wrapper">
                                <span className="input-icon">🔐</span>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onFocus={() => setFocusedField('password')}
                                    onBlur={() => setFocusedField(null)}
                                    required
                                    className={focusedField === 'password' ? 'focused' : ''}
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary btn-large" disabled={loading}>
                            {loading ? (
                                <>
                                    <span className="spinner"></span>
                                    Signing in...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    <div className="test-credentials-hint">
                        <div className="hint-header">
                            <span className="hint-icon">🧪</span>
                            <strong>Demo Account</strong>
                        </div>
                        <button
                            type="button"
                            className="btn-fill-test"
                            onClick={fillTestCredentials}
                        >
                            Use Demo Credentials
                        </button>
                        <p className="hint-text">Email: <code>test@test.com</code> | Password: <code>admin123</code></p>
                    </div>

                    <div className="auth-divider">or</div>

                    <p className="auth-footer">
                        Don't have an account? <Link to="/sign-up">Create one now</Link>
                    </p>
                </div>

                <div className="auth-illustration">
                    <div className="illustration-card">
                        <span className="illustration-emoji">👨‍⚕️</span>
                        <h3>Professional Care</h3>
                        <p>Connect with healthcare experts</p>
                    </div>
                    <div className="illustration-card">
                        <span className="illustration-emoji">💊</span>
                        <h3>Medication Management</h3>
                        <p>Track and manage your medicines</p>
                    </div>
                    <div className="illustration-card">
                        <span className="illustration-emoji">📋</span>
                        <h3>Medical Records</h3>
                        <p>Secure storage for your health data</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
