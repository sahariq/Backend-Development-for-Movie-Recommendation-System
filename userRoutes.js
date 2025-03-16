const express = require('express');
const User = require('../models/User'); // Import the User model
const { authenticateJWT } = require('../middleware/authMiddleware'); // Import JWT authentication middleware
const router = express.Router();

// Get user profile
router.get('/profile', authenticateJWT, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // Exclude password from the response
        if (!user) {
            return res.status(404).json({ message: 'User  not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update user profile
router.put('/profile', authenticateJWT, async (req, res) => {
    try {
        const { username, email } = req.body;

        // Validate input
        if (!username && !email) {
            return res.status(400).json({ message: 'At least one field (username or email) is required to update' });
        }

        const updatedUser  = await User.findByIdAndUpdate(
            req.user.id,
            { username, email },
            { new: true, runValidators: true } // Return the updated document and run validation
        ).select('-password'); // Exclude password from the response

        if (!updatedUser ) {
            return res.status(404).json({ message: 'User  not found' });
        }

        res.status(200).json(updatedUser );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete user account
router.delete('/profile', authenticateJWT, async (req, res) => {
    try {
        const deletedUser  = await User.findByIdAndDelete(req.user.id);
        if (!deletedUser ) {
            return res.status(404).json({ message: 'User  not found' });
        }

        res.status(200).json({ message: 'User  account deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;