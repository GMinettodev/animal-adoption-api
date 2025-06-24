const db = require('../config/database');

class AdoptionModel {
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM adoptions');
    return rows;
  }

  static async create(adoption) {
    const { user_id, pet_id, adoption_date } = adoption;
    const [rows] = await db.query(
      'INSERT INTO adoptions (user_id, pet_id, adoption_date) VALUES (?, ?, ?)',
      [user_id, pet_id, adoption_date]
    );
    return rows.insertId;
  }
}

module.exports = AdoptionModel;
