

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
    // Get the token from the Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    // If no token, return an unauthorized response
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the user ID to the request object
        req.user = await User.findById(decoded.id).select('-password'); // Exclude password from user object

        // If user is not found, return an unauthorized response
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authMiddleware;