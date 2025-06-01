const jwt = require('jsonwebtoken');
const createError = require('http-errors');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return next(createError(401, 'Token is required'));
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    return next();
  } catch {
    return next(createError(403, 'Forbidden: Invalid or expired token'));
  }
}

function authorizeRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ message: 'Access denied' });
    }
    return next();
  };
}

module.exports = { authenticateToken, authorizeRole };
