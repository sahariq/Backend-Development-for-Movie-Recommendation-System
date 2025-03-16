const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User Registration
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if user already exists
        const existingUser  = await User.findOne({ email });
        if (existingUser ) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser  = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser .save();
        res.status(201).json({ message: 'User  registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// User Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get User Profile
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // Exclude password from response
        if (!user) {
            return res.status(404).json({ message: 'User  not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update User Profile
exports.updateProfile = async (req, res) => {
    try {
        const { username, preferences } = req.body;

        // Update user details
        const updatedUser  = await User.findByIdAndUpdate(
            req.user.id,
            { username, preferences },
            { new: true, runValidators: true }
        ).select('-password'); // Exclude password from response

        if (!updatedUser ) {
            return res.status(404).json({ message: 'User  not found' });
        }

        res.status(200).json(updatedUser );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get User Wishlist
exports.getWishlist = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('wishlist'); // Populate wishlist with movie details
        if (!user) {
            return res.status(404).json({ message: 'User  not found' });
        }
        res.status(200).json(user.wishlist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add to Wishlist
exports.addToWishlist = async (req, res) => {
    try {
        const { movieId } = req.body;

        // Check if the movie is already in the wishlist
        const user = await User.findById(req.user.id);
        if (user.wishlist.includes(movieId)) {
            return res.status(400).json({ message: 'Movie already in wishlist' });
        }

        // Add movie to wishlist
        user.wishlist.push(movieId);
        await user.save();
        res.status(200).json({ message: 'Movie added to wishlist' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Remove from Wishlist
exports.removeFromWishlist = async (req, res) => {
    try {
        const { movieId } = req.body;

        // Remove movie from wishlist
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User  not found' });
        }

        user.wishlist = user.wishlist.filter(id => id.toString() !== movieId);
        await user.save();

        res.status(200).json({ message: 'Movie removed from wishlist' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};