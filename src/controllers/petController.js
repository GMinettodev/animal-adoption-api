const createError = require('http-errors');
const PetModel = require('../models/petModel');

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
}

module.exports = PetController;
