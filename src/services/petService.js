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

  static async changePet(id, petData) {
    const currentPet = await PetModel.findById(id);

    if (!currentPet) {
      throw createError(404, 'Pet not found');
    }

    const { name, age, species, size, status, description } = petData;

    const updateData = {
      name,
      age,
      species,
      size,
      status,
      description,
    };

    const result = await PetModel.update(id, updateData);

    if (result.changedRows === 0) {
      return { message: 'No changes made to the pet data', id };
    }

    return { message: 'Pet updated successfully', id };
  }

  static async deletePet(id) {
    const petData = await PetModel.findById(id);

    if (!petData) {
      throw createError(404, 'Pet not found');
    }

    if (this.isPetAdopted(petData)) {
      throw createError(400, 'Cannot delete adopted pet');
    }

    const result = await PetModel.delete(id);

    if (result.affectedRows === 0) {
      throw createError(404, 'User not found');
    }

    return { message: 'Pet deleted successfully', id };
  }
}

module.exports = PetService;
