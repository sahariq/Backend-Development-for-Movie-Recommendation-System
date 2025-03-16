const Review = require('../models/Review');
const Movie = require('../models/Movie');

// Add a Review
exports.addReview = async (req, res) => {
    try {
        const { rating, text } = req.body;
        const movieId = req.params.id;

        // Create a new review
        const review = new Review({
            rating,
            text,
            user: req.user.id, // Assuming req.user is set by the auth middleware
            movie: movieId
        });

        // Save the review to the database
        await review.save();

        // Update the movie's average rating
        await Movie.findByIdAndUpdate(movieId, {
            $push: { reviews: review._id },
            $set: { averageRating: await calculateAverageRating(movieId) }
        });

        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Reviews for a Movie
exports.getReviewsByMovieId = async (req, res) => {
    try {
        const movieId = req.params.id;
        const { page = 1, limit = 10 } = req.query;

        const reviews = await Review.find({ movie: movieId })
            .populate('user', 'username') // Populate user details
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();

        const count = await Review.countDocuments({ movie: movieId });
        res.status(200).json({
            reviews,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a Review
exports.updateReview = async (req, res) => {
    try {
        const reviewId = req.params.id;
        const { rating, text } = req.body;

        const updatedReview = await Review.findByIdAndUpdate(reviewId, { rating, text }, { new: true });

        if (!updatedReview) return res.status(404).json({ message: 'Review not found' });

        res.status(200).json(updatedReview);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a Review
exports.deleteReview = async (req, res) => {
    try {
        const reviewId = req.params.id;

        // Find and delete the review
        const deletedReview = await Review.findByIdAndDelete(reviewId);

        if (!deletedReview) return res.status(404).json({ message: 'Review not found' });

        // Update the movie's average rating
        await Movie.findByIdAndUpdate(deletedReview.movie, {
            $pull: { reviews: reviewId },
            $set: { averageRating: await calculateAverageRating(deletedReview.movie) }
        });

        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Helper function to calculate average rating for a movie
const calculateAverageRating = async (movieId) => {
    const reviews = await Review.find({ movie: movieId });
    if (reviews.length === 0) return 0;

    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1); // Return average rating rounded to 1 decimal
};