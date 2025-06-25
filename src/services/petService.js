const PetModel = require('../models/petModel');
const createError = require('http-errors');

class PetService {
  static validStatus = ['available', 'adopted'];

  static isStatusValid(status) {
    return PetService.validStatus.includes(status);
  }

  static isPetAdopted(petData) {
    return petData.status === 'adopted';
  }

  static async createPet(petData) {
    // Validates the status only if it's provided
    if (petData.status && !PetService.isStatusValid(petData.status)) {
      throw createError(400, `Invalid status: ${petData.status}`);
    }
    
    const id = await PetModel.create(petData);

    return { message: 'Pet created successfully', id };
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

    if (this.isPetAdopted) {
      throw createError(400, `Cannot delete adopted pet`);
    }

    return { message: 'Pet deleted successfully', id };
  }
}

module.exports = PetService;
