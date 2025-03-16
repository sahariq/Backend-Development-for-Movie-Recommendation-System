const paginate = (model) => {
    return async (req, res, next) => {
        try {
            // Parse page and limit from query parameters
            const page = parseInt(req.query.page) || 1; // Default to page 1
            const limit = parseInt(req.query.limit) || 10; // Default to limit of 10
            const skip = (page - 1) * limit; // Calculate the number of documents to skip

            // Get total documents in the collection
            const totalDocuments = await model.countDocuments();
            const totalPages = Math.ceil(totalDocuments / limit); // Calculate total pages

            // Fetch the paginated results
            const results = await model.find().skip(skip).limit(limit);

            // Attach paginated results to the response object
            res.paginatedResults = {
                totalDocuments,
                totalPages,
                currentPage: page,
                results,
            };

            next(); // Call the next middleware
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
};

module.exports = paginate;