const createError = require('http-errors');

function errorMiddleware(err, req, res) {
  // console.error('[ERROR]:', err.stack || err);

  // If the error is an instance of http-errors, use its statusCode and message
  if (err instanceof createError.HttpError) {
    return res.status(err.status || 500).json({
      error: err.message || 'Internal server error',
      status: err.status || 500,
    });
  }

  // Fallback for generic errors
  const statusCode = err.statusCode || 500;
  const errorMessage = err.message || 'Internal server error';

  // In production, we should hide detailed stack trace, but log it internally
  const responseMessage =
    process.env.NODE_ENV === 'production'
      ? errorMessage
      : `${errorMessage}\n${err.stack}`;

  // Send the error response
  return res.status(statusCode).json({
    error: responseMessage,
    status: statusCode,
  });
}

module.exports = errorMiddleware;
