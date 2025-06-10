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
}

module.exports = PetModel;
