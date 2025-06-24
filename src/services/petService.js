const PetModel = require('../models/petModel');

class PetService {
  static async createPet(petData) {
    const id = await PetModel.create(petData);

    return { message: 'User created successfully', id };
  }

  static async changePet(id, pet) {
    const { name, age, species, size, status, description } = pet;

    const result = await PetModel.update(id, {
      name,
      age,
      species,
      size,
      status,
      description,
    });

    if (result.affectedRows === 0) {
      throw createError(404, 'Pet not found');
    }

    return { message: 'Pet updated successfully', id };
  }

  static async deletePet(petData) {
    const id = await PetModel.delete(petData);

    return { message: 'Pet deleted successfully', id };
  }
}

module.exports = PetService;
