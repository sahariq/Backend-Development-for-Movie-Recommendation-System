const Movie = require('../models/Movie');

// Add a new movie (Admin only)
exports.addMovie = async (req, res) => {
    const newMovie = new Movie(req.body);
    try {
        // Save the new movie to the database
        await newMovie.save();
        res.status(201).json(newMovie);
    } catch (error) {
        res.status(500).json({ message: 'Error adding movie', error });
    }
};

// Get all movies with pagination
exports.getAllMovies = async (req, res) => {
    const { page = 1, limit = 10 } = req.query;
    try {
        // Fetch movies with pagination
        const movies = await Movie.find()
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        const count = await Movie.countDocuments();
        res.json({ total: count, page, movies });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching movies', error });
    }
};

// Get movie details by ID
exports.getMovieById = async (req, res) => {
    try {
        // Find the movie by ID
        const movie = await Movie.findById(req.params.id);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.json(movie);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching movie', error });
    }
};

// Update a movie (Admin only)
exports.updateMovie = async (req, res) => {
    try {
        // Update the movie by ID
        const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.json(updatedMovie);
    } catch (error) {
        res.status(500).json({ message: 'Error updating movie', error });
    }
};

// Delete a movie (Admin only)
exports.deleteMovie = async (req, res) => {
    try {
        // Delete the movie by ID
        const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
        if (!deletedMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        res.json({ message: 'Movie deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting movie', error });
    }
};