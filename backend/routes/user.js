const express = require('express');
const router = express.Router();

// Mock users storage (imported from auth controller context)
const getMockUsers = () => {
    // This is a workaround - we'll access users through the auth controller
    return global.mockUsers || [];
};

// Get current user
router.get('/', async (req, res) => {
    try {
        const userId = req.user.user.id;

        // Find user in mock data
        const users = getMockUsers();
        const user = users.find(u => u.id === userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Return user without password hash
        const { password_hash, ...userWithoutPassword } = user;
        res.json(userWithoutPassword);
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});

module.exports = router;
