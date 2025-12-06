import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import '../styles/SignUp.css';

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [focusedField, setFocusedField] = useState(null);
    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!name.trim()) {
            setError('Name is required');
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

        setLoading(true);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/sign-up`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ name, email, password }),
            });

            if (!response.ok) {
                const data = await response.json();
                setError(data.error || 'Sign up failed');
                return;
            }

            const data = await response.json();
            setAuth(data.user);
            navigate('/');
        } catch (err) {
            setError('An error occurred. Please try again.');
            console.error('Sign up error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-wrapper">
                <div className="signup-box">
                    <div className="auth-header">
                        <div className="logo-icon">🏥</div>
                        <h1>Create Account</h1>
                        <p className="subtitle">Join MediTrack and manage your health</p>
                    </div>

                    {error && (
                        <div className="alert alert-error" role="alert">
                            <span className="alert-icon">⚠️</span>
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="auth-form">
                        <div className="form-group">
                            <label htmlFor="name">Full Name</label>
                            <div className="input-wrapper">
                                <span className="input-icon">👤</span>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Enter your full name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    onFocus={() => setFocusedField('name')}
                                    onBlur={() => setFocusedField(null)}
                                    required
                                    className={focusedField === 'name' ? 'focused' : ''}
                                />
                            </div>
                        </div>

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
                                    placeholder="At least 6 characters"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onFocus={() => setFocusedField('password')}
                                    onBlur={() => setFocusedField(null)}
                                    required
                                    className={focusedField === 'password' ? 'focused' : ''}
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <div className="input-wrapper">
                                <span className="input-icon">🔐</span>
                                <input
                                    type="password"
                                    id="confirmPassword"
                                    placeholder="Re-enter your password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    onFocus={() => setFocusedField('confirm')}
                                    onBlur={() => setFocusedField(null)}
                                    required
                                    className={focusedField === 'confirm' ? 'focused' : ''}
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary btn-large" disabled={loading}>
                            {loading ? (
                                <>
                                    <span className="spinner"></span>
                                    Creating account...
                                </>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>

                    <div className="auth-divider">or</div>

                    <p className="auth-footer">
                        Already have an account? <Link to="/login">Sign in instead</Link>
                    </p>
                </div>

                <div className="auth-benefits">
                    <h2>Why Join MediTrack?</h2>
                    <ul>
                        <li><span>✓</span> Manage medications with reminders</li>
                        <li><span>✓</span> Store medical records securely</li>
                        <li><span>✓</span> Consult with healthcare professionals</li>
                        <li><span>✓</span> Access emergency services instantly</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
