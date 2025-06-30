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

    // Fetch the pet data to update status while retaining other required fields
    const pet = await PetModel.findById(pet_id);
    if (!pet) {
      throw createError(404, `Pet with ID ${pet_id} not found`);
    }

    const isPetAdopted = await PetService.isPetAdopted(pet);
    if (isPetAdopted) {
      throw createError(400, `Pet with ID ${pet_id} already adopted`);
    }

    // Create the adoption record
    const id = await AdoptionModel.create(adoptionData);

    // Update the pet status to 'adopted', but keep all other fields intact
    const petDataToUpdate = {
      name: pet.name,
      age: pet.age,
      species: pet.species,
      size: pet.size,
      description: pet.description,
      status: 'adopted',
    };

    await PetModel.update(pet_id, petDataToUpdate);

    return { message: 'Pet adopted successfully', id };
  }
}

module.exports = AdoptionService;
