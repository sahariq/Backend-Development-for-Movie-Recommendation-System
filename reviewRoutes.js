const express = require('express');
const Review = require('../models/Review'); // Import the Review model
const Movie = require('../models/Movie'); // Import the Movie model
const router = express.Router();

// Create a new review for a specific movie
router.post('/:movieId', async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const movieId = req.params.movieId;

        // Check if the movie exists
        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        // Validate input
        if (rating == null || comment == null) {
            return res.status(400).json({ message: 'Rating and comment are required' });
        }

        const newReview = new Review({ rating, comment, movie: movieId });
        await newReview.save();

        res.status(201).json(newReview);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all reviews for a specific movie
router.get('/:movieId', async (req, res) => {
    try {
        const movieId = req.params.movieId;

        // Check if the movie exists
        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        const reviews = await Review.find({ movie: movieId });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a review by ID
router.put('/:reviewId', async (req, res) => {
    try {
        const { rating, comment } = req.body;

        // Validate input
        if (rating == null && comment == null) {
            return res.status(400).json({ message: 'At least one field (rating or comment) is required to update' });
        }

        const updatedReview = await Review.findByIdAndUpdate(
            req.params.reviewId,
            { rating, comment },
            { new: true, runValidators: true } // Return the updated document and run validators
        );

        if (!updatedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }

        res.status(200).json(updatedReview);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a review by ID
router.delete('/:reviewId', async (req, res) => {
    try {
        const deletedReview = await Review.findByIdAndDelete(req.params.reviewId);
        if (!deletedReview) {
            return res.status(404).json({ message: 'Review not found' });
        }

        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;