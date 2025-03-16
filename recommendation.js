const Movie = require('../models/Movie'); // Import the Movie model

const recommendMovies = async (req, res) => {
    try {
        const { movieId } = req.params;

        // Find the movie by ID
        const movie = await Movie.findById(movieId);
        if (!movie) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        // Find other movies that share the same genre(s)
        const recommendedMovies = await Movie.find({
            _id: { $ne: movieId }, // Exclude the current movie
            genres: { $in: movie.genres }, // Find movies with matching genres
        }).limit(5); // Limit the number of recommendations

        res.status(200).json({
            message: 'Recommendations based on your selection',
            recommendedMovies,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = recommendMovies;