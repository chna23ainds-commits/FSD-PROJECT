const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// In-memory mock database (for demo purposes without PostgreSQL)
let mockUsers = [
    {
        id: 1,
        name: 'Test User',
        email: 'test@test.com',
        password_hash: '$2a$10$SlS.lsAVxYmx3YVjCt3wG.KxRXQV3UXLvhS6vOD/4JLNPvzueyBcy' // admin123 (bcrypt hash)
    }
];

let mockActivityLogs = [];
let nextUserId = 2;

const SALT_ROUNDS = 10;

const hashPassword = async (password) => {
    return await bcrypt.hash(password, SALT_ROUNDS);
};

const comparePasswords = async (plainTextPassword, hashedPassword) => {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
};

const generateToken = (userId) => {
    const expiresInOneDay = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const payload = {
        user: { id: userId },
        expires: expiresInOneDay.toISOString(),
    };

    return jwt.sign(payload, process.env.AUTH_SECRET, {
        algorithm: 'HS256',
        expiresIn: '1 day',
    });
};

const logActivity = async (userId, action, ipAddress = '', metadata = null) => {
    try {
        mockActivityLogs.push({
            id: mockActivityLogs.length + 1,
            user_id: userId,
            action,
            timestamp: new Date().toISOString(),
            ip_address: ipAddress,
            metadata
        });
    } catch (error) {
        console.error('Failed to log activity:', error);
    }
};

const signUp = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password required' });
        }

        // Check if user exists
        if (mockUsers.find(u => u.email === email)) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // Hash password
        const passwordHash = await hashPassword(password);

        // Create user
        const user = {
            id: nextUserId++,
            email,
            password_hash: passwordHash,
            name: name || 'User'
        };

        mockUsers.push(user);

        // Log activity
        await logActivity(user.id, 'SIGN_UP', req.ip);

        // Generate token
        const token = generateToken(user.id);

        // Set cookie
        res.cookie('session', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(201).json({ user: { id: user.id, email: user.email, name: user.name }, token });
    } catch (error) {
        console.error('Sign up error:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
};

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password required' });
        }

        // Find user
        const user = mockUsers.find(u => u.email === email);

        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Compare passwords
        const isPasswordValid = await comparePasswords(password, user.password_hash);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Log activity
        await logActivity(user.id, 'SIGN_IN', req.ip);

        // Generate token
        const token = generateToken(user.id);

        // Set cookie
        res.cookie('session', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.json({ user: { id: user.id, email: user.email, name: user.name }, token });
    } catch (error) {
        console.error('Sign in error:', error);
        res.status(500).json({ error: 'Authentication failed' });
    }
};

const signOut = async (req, res) => {
    try {
        const userId = req.user.user.id;

        // Log activity
        await logActivity(userId, 'SIGN_OUT', req.ip);

        // Clear cookie
        res.clearCookie('session');
        res.json({ message: 'Signed out successfully' });
    } catch (error) {
        console.error('Sign out error:', error);
        res.status(500).json({ error: 'Failed to sign out' });
    }
};

const updatePassword = async (req, res) => {
    try {
        const userId = req.user.user.id;
        const { currentPassword, newPassword, confirmPassword } = req.body;

        if (!currentPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({ error: 'All password fields required' });
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json({ error: 'New passwords do not match' });
        }

        if (currentPassword === newPassword) {
            return res.status(400).json({ error: 'New password must be different' });
        }

        // Get user
        const user = mockUsers.find(u => u.id === userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Compare passwords
        const isPasswordValid = await comparePasswords(currentPassword, user.password_hash);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Current password is incorrect' });
        }

        // Hash new password
        const newPasswordHash = await hashPassword(newPassword);

        // Update password
        user.password_hash = newPasswordHash;

        // Log activity
        await logActivity(userId, 'UPDATE_PASSWORD', req.ip);

        res.json({ message: 'Password updated successfully' });
    } catch (error) {
        console.error('Update password error:', error);
        res.status(500).json({ error: 'Failed to update password' });
    }
};

const updateAccount = async (req, res) => {
    try {
        const userId = req.user.user.id;
        const { name, email } = req.body;

        if (!name || !email) {
            return res.status(400).json({ error: 'Name and email required' });
        }

        // Check if email is already in use
        if (mockUsers.find(u => u.email === email && u.id !== userId)) {
            return res.status(400).json({ error: 'Email is already in use' });
        }

        // Update user
        const user = mockUsers.find(u => u.id === userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.name = name;
        user.email = email;

        // Log activity
        await logActivity(userId, 'UPDATE_ACCOUNT', req.ip);

        res.json({ message: 'Account updated successfully' });
    } catch (error) {
        console.error('Update account error:', error);
        res.status(500).json({ error: 'Failed to update account' });
    }
};

const deleteAccount = async (req, res) => {
    try {
        const userId = req.user.user.id;
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ error: 'Password required' });
        }

        // Get user
        const user = mockUsers.find(u => u.id === userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Compare passwords
        const isPasswordValid = await comparePasswords(password, user.password_hash);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Incorrect password' });
        }

        // Delete user from array
        mockUsers = mockUsers.filter(u => u.id !== userId);

        // Log activity
        await logActivity(userId, 'DELETE_ACCOUNT', req.ip);

        // Clear cookie
        res.clearCookie('session');
        res.json({ message: 'Account deleted successfully' });
    } catch (error) {
        console.error('Delete account error:', error);
        res.status(500).json({ error: 'Failed to delete account' });
    }
};

module.exports = {
    signUp,
    signIn,
    signOut,
    updatePassword,
    updateAccount,
    deleteAccount,
    getMockUsers: () => mockUsers,
    setMockUsers: (users) => { mockUsers = users; }
};

// Make mock users globally accessible
global.mockUsers = mockUsers;
