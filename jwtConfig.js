// Load environment variables from .env file
require('dotenv').config();

// JWT configuration object
const jwtConfig = {
    // Secret key for signing tokens; defaults to '12345678' if not set in environment variables
    secret: process.env.JWT_SECRET_KEY || '12345678', 
    // Token expiration time set to 1 hour
    expiresIn: '1h', 
};

// Export the JWT configuration for use in other modules
module.exports = jwtConfig;