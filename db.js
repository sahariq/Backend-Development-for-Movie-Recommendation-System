const mongoose = require('mongoose');

// Function to connect to MongoDB
const connectDB = async () => {
    try {
        // Attempt to connect to the MongoDB database using the URI from environment variables
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true, // Use the new URL parser to avoid deprecation warnings
            useUnifiedTopology: true, // Use the new Server Discover and Monitoring engine
        });
        console.log('MongoDB connected successfully'); // Log success message
    } catch (error) {
        // Log the error message if the connection fails
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = connectDB; // Export the connectDB function for use in other files