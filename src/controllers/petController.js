const createError = require('http-errors');
const PetModel = require('../models/petModel');
const PetService = require('../services/petService');

class PetController {
  static async getAvailablePets(req, res, next) {
    try {
      const pets = await PetModel.findAvailable();
      if (!pets || pets.length === 0) {
        return next(createError(409, 'No available pets'));
      }
      return res.json(pets);
    } catch (err) {
      return next(err);
    }
  }

  static async getPets(req, res, next) {
    try {
      const pets = await PetModel.findAll();
      return res.json(pets);
    } catch (err) {
      return next(err);
    }
  }

  static async getPetById(req, res, next) {
    try {
      const id = req.params.id;
      const pet = await PetModel.findById(id);
      if (!pet) {
        return next(createError(404, 'Pet not found'));
      }
      return res.json(pet);
    } catch (err) {
      return next(err);
    }
  }

  static async addPet(req, res, next) {
    try {
      const petData = req.body;
      const newPetId = await PetService.createPet(petData);
      res.json({ id: newPetId });
    } catch (err) {
      next(err);
    }
  }

  static async editPet(req, res, next) {
    try {
      const result = await PetService.changePet(req.params.id, req.body);
      return res.json(result);
    } catch (err) {
      return next(err);
    }
  }

  static async removePet(req, res, next) {
    const { id } = req.params;

    try {
      const result = await PetService.deletePet(id);

      if (result.affectedRows === 0) {
        return next(createError(404, 'Pet not found'));
      }

      return res.status(200).json({ message: 'Pet deleted successfully' });
    } catch {
      return next(createError(500, 'Error deleting pet'));
    }
  }
}

module.exports = PetController;
