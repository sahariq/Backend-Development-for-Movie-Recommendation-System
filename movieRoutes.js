const express = require('express');
const Movie = require('../models/Movie'); // Import the Movie model
const router = express.Router();

// Create a new movie
router.post('/', async (req, res) => {
    try {
        const { title, description, releaseDate, genre } = req.body;

        // Validate input
        if (!title || !description || !releaseDate || !genre) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const newMovie = new Movie({ title, description, releaseDate, genre });
        await newMovie.save();

        res.status(201).json(newMovie);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all movies
router.get('/', async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a movie by ID
router.get('/:id', async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.status(200).json(movie);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a movie by ID
router.put('/:id', async (req, res) => {
    try {
        const { title, description, releaseDate, genre } = req.body;

        // Validate input
        if (!title || !description || !releaseDate || !genre) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const updatedMovie = await Movie.findByIdAndUpdate(
            req.params.id,
            { title, description, releaseDate, genre },
            { new: true, runValidators: true } // Return the updated document and run validators
        );

        if (!updatedMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        res.status(200).json(updatedMovie);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a movie by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
        if (!deletedMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        res.status(200).json({ message: 'Movie deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;