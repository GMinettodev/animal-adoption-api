const express = require('express');
const PetController = require('../controllers/petController');
const router = express.Router();

// Public routes
router.get('/pets/available', PetController.getAvailablePets);

// Protected routes
// router.get('/', PetController.getPets);
// router.get('/:id', PetController.getPetByID);
// router.post('/', PetController.addPet);
// router.put('/:id', PetController.updatePet);
// router.delete('/:id', PetController.deletePet);

modules.exports = router;
