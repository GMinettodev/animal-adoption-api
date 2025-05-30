const express = require('express');
const UserController = require('../controllers/userController');
const router = express.Router();

// Public routes
// router.post('/users', UserController.addUser)
router.get('/login', UserController.login);

// Protected routes
// router.get('/', UserController.getUsers);
// router.get('/:id', UserController.getUserByID);
// router.put('/:id', UserController.updateUser);
// router.delete('/:id', UserController.deleteUser);

module.exports = router;
