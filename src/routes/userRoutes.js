const express = require('express');
const UserController = require('../controllers/userController');
const router = express.Router();
const {
  authenticateToken,
  authorizeRole,
} = require('../middlewares/authMiddleware');

// Public routes
router.post('/login', UserController.login);
router.post('/users/', UserController.register);

// Protected routes
router.get(
  '/users/',
  authenticateToken,
  authorizeRole('admin'),
  UserController.getUsers
);
router.get('/users/:id', authenticateToken, UserController.getUserById);
router.put('/users/:id', authenticateToken, UserController.editUser);
router.delete(
  '/users/:id',
  authenticateToken,
  authorizeRole('admin'),
  UserController.removeUser
);

module.exports = router;
