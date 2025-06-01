const express = require('express');
const UserController = require('../controllers/userController');
const router = express.Router();
const {
  authenticateToken,
  authorizeRole,
} = require('../middlewares/authMiddleware');

// Public routes
router.post('/login', UserController.login);
router.post('/register', UserController.register);

// Protected routes
router.get(
  '/',
  authenticateToken,
  authorizeRole('admin'),
  UserController.getUsers
);
router.get('/:id', authenticateToken, UserController.getUserById);
router.put('/:id', authenticateToken, UserController.editUser);
router.delete(
  '/:id',
  authenticateToken,
  authorizeRole('admin'),
  UserController.removeUser
);

module.exports = router;
