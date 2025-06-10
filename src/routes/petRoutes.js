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
// router.post('/', PetController.addPet);
// router.put('/:id', PetController.updatePet);
// router.delete('/:id', PetController.deletePet);

module.exports = router;
