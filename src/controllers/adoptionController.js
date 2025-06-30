const AdoptionModel = require('../models/adoptionModel');
const AdoptionService = require('../services/adoptionService');
const createError = require('http-errors');

class AdoptionController {
  static async getAdoptions(req, res, next) {
    try {
      const adoptions = await AdoptionModel.findAll();
      return res.json(adoptions);
    } catch (err) {
      return next(err);
    }
  }

  static async adopt(req, res, next) {
    try {
      const adoptionData = req.body;

      // Validate the adoption data
      if (!adoptionData.user_id || !adoptionData.pet_id) {
        return next(createError(400, 'User ID and Pet ID are required'));
      }

      const newAdoptionId = await AdoptionService.createAdoption(adoptionData);
      return res.json({ id: newAdoptionId });
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = AdoptionController;
