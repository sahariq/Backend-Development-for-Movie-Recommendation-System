const mongoose = require('mongoose');

// Define the Movie schema
const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        validate: {
            validator: function(v) {
                return v.trim().length > 0; // Ensure title is not just whitespace
            },
            message: props => `${props.value} is not a valid title!`
        },
        index: true // Create an index for this field for faster queries
    },
    genre: {
        type: [String], // Array of strings for genres
        required: true,
        index: true // Create an index for genres
    },
    releaseYear: {
        type: Number,
        required: true,
        min: 1888, // The first film was made in 1888
        max: new Date().getFullYear() // Ensure the year is not in the future
    },
    description: {
        type: String,
        trim: true,
        maxlength: 1000, // Limit description length to 1000 characters
        default: 'No description available.' // Default value
    },
    director: {
        type: String,
        required: true,
        trim: true,
        index: true // Create an index for this field for faster queries
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
}, { timestamps: true }); // Automatically manage createdAt and updatedAt fields

// Create the Movie model
const Movie = mongoose.model('Movie', movieSchema);

// Export the Movie model
module.exports = Movie;