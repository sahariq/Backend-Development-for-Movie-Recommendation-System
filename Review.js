const mongoose = require('mongoose');

// Define the Movie schema
const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true // Removes whitespace from both ends of the string
    },
    genre: {
        type: [String], // Array of strings for genres
        required: true
    },
    releaseYear: {
        type: Number,
        required: true,
        min: 1888 // The first film was made in 1888
    },
    description: {
        type: String,
        trim: true, // Removes whitespace from both ends of the string
        maxlength: 1000 // Limit description length to 1000 characters
    },
    director: {
        type: String,
        required: true,
        trim: true // Removes whitespace from both ends of the string
    },
    cast: {
        type: [String], // Array of strings for cast members
        required: true
    },
    rating: {
        type: Number,
        min: 0, // Minimum rating
        max: 10 // Maximum rating
    },
    createdAt: {
        type: Date,
        default: Date.now // Automatically set the date when the document is created
    }
});

// Create the Movie model
const Movie = mongoose.model('Movie', movieSchema);

// Export the Movie model
module.exports = Movie;