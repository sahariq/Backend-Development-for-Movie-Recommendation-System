const errorMiddleware = (err, req, res, next) => {
    // Log the error (consider using a logging library for production)
    console.error(err.stack);

    // Set the response status code based on the error type
    const statusCode = err.statusCode || 500;

    // Create a structured error response
    const response = {
        status: 'error',
        statusCode,
        message: err.message || 'Internal Server Error',
    };

    // If the error has additional details, add them to the response
    if (process.env.NODE_ENV === 'development') {
        response.stack = err.stack; // Include stack trace in development mode
    }

    // Send the error response
    res.status(statusCode).json(response);
};

module.exports = errorMiddleware;