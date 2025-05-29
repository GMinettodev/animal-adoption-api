function errorMiddleware(err, req, res, next) {
  console.error('[ERRO]:', err.stack);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    error: err.message || 'Internal server error',
    status: statusCode,
  });
}

module.exports = errorMiddleware;
