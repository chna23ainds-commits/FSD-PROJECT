const express = require('express');
const router = express.Router();
const { signUp, signIn, signOut, updatePassword, updateAccount, deleteAccount } = require('../controllers/authController');

// Auth routes
router.post('/sign-up', signUp);
router.post('/sign-in', signIn);
router.post('/sign-out', signOut);
router.post('/update-password', updatePassword);
router.put('/update-account', updateAccount);
router.delete('/delete-account', deleteAccount);

module.exports = router;
