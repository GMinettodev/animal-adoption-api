const express = require('express');
const PetController = require('../controllers/petController');
const {
  authenticateToken,
  authorizeRole,
} = require('../middlewares/authMiddleware');
const router = express.Router();

// Public routes
router.get('/available', PetController.getAvailablePets);

// Protected routes
router.get(
  '/',
  authenticateToken,
  authorizeRole('admin'),
  PetController.getPets
);

router.get(
  '/:id',
  authenticateToken,
  authorizeRole('admin'),
  PetController.getPetById
);

router.post(
  '/',
  authenticateToken,
  authorizeRole('admin'),
  PetController.addPet
);

router.put(
  '/:id',
  authenticateToken,
  authorizeRole('admin'),
  PetController.editPet
);

router.delete(
  '/:id',
  authenticateToken,
  authorizeRole('admin'),
  PetController.removePet
);

module.exports = router;
