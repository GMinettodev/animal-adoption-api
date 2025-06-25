const express = require('express');
const AdoptionController = require('../controllers/adoptionController');
const {
  authenticateToken,
  authorizeRole,
} = require('../middlewares/authMiddleware');
const router = express.Router();

// Protected routes
router.get(
  '/',
  authenticateToken,
  authorizeRole('admin'),
  AdoptionController.getAdoptions
);
router.post(
  '/',
  authenticateToken,
  authorizeRole('adopter'),
  AdoptionController.adopt
);

module.exports = router;
