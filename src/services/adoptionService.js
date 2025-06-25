const AdoptionModel = require('../models/adoptionModel');
const createError = require('http-errors');
const UserModel = require('../models/userModel');
const PetModel = require('../models/petModel');
const PetService = require('./petService');

class AdoptionService {
  static async createAdoption(adoptionData) {
    const { user_id, pet_id } = adoptionData;

    // Check if the user exists
    const user = await UserModel.findById(user_id);
    if (!user) {
      throw createError(404, `User with ID ${user_id} not found`);
    }

    const pet = await PetModel.findById(pet_id);
    if (!pet) {
      throw createError(404, `Pet with ID ${pet_id} not found`);
    }

    const isPetAdopted = await PetService.isPetAdopted(pet);
    if (isPetAdopted) {
      throw createError(400, `Pet with ID ${pet_id} already adopted`);
    }

    const id = await AdoptionModel.create(adoptionData);

    await PetModel.update(pet_id, { status: 'adopted' });

    return { message: 'Pet adopted successfully', id };

  }
}

module.exports = AdoptionService;
