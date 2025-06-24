const AdoptionModel = require('../models/adoptionModel');
const createError = require('http-errors');

class AdoptionService {
  static async createAdoption(adoptionData) {
    const id = await AdoptionModel.create(adoptionData);

    return { message: 'Pet adopted successfully', id };
  }
}

module.exports = AdoptionService;
