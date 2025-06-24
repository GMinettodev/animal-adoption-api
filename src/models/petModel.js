const db = require('../config/database');

class PetModel {
  static async findAvailable() {
    const [rows] = await db.query(
      "SELECT * FROM pets WHERE LOWER(status) = 'available'"
    );
    return rows;
  }

  static async findAll() {
    const [rows] = await db.query('SELECT * FROM pets');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM pets WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(pet) {
    const { name, age, species, size, status, description } = pet;
    const [rows] = await db.query(
      'INSERT INTO pets (name, age, species, size, status, description) VALUES (?, ?, ?, ?, ?, ?)',
      [name, age, species, size, status, description]
    );
    return rows.insertId;
  }

  static async update(id, pet) {
    const { name, age, species, size, status, description } = pet;
    const [rows] = await db.query(
      'UPDATE pets SET name = ?, age = ?, species = ?, size = ?, status = ?, description = ? WHERE id =  ?',
      [name, age, species, size, status, description, id]
    );
    return rows;
  }

  static async delete(id) {
    const [result] = await db.query('DELETE FROM pets WHERE id = ?', [id]);
    return result;
  }
}

module.exports = PetModel;
