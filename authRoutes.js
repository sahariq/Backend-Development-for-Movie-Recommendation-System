const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Import the User model
const router = express.Router();

// Environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Replace with your actual secret

// Register a new user
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if the user already exists
        const existingUser  = await User.findOne({ email });
        if (existingUser ) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser  = new User({ username, email, password: hashedPassword });
        await newUser .save();

        res.status(201).json({ message: 'User  registered successfully!' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Login a user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Create a JWT token
        const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Export the router
module.exports = router;