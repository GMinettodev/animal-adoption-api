const PetModel = require('../models/petModel');

class PetService {
  static async createPet(petData) {
    const id = await PetModel.create(petData);

    return { message: 'User created successfully', id };
  }
}

module.exports = PetService;
