const AdoptionModel = require('../models/adoptionModel');
const AdoptionService = require('../services/adoptionService');

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
      const newAdoptionId = await AdoptionService.createAdoption(adoptionData);
      res.json({ id: newAdoptionId });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = AdoptionController;
