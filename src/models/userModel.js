const db = require('../config/database');

class UserModel {
  static async create(user) {
    const { name, email, password, phone, role } = user;
    const [result] = await db.query(
      'INSERT INTO users (name, email, password, phone, role) VALUES (?, ?, ?, ?, ?)',
      [name, email, password, phone, role]
    );
    return result.insertId; //returns the ID of the created user
  }

  static async getUsers() {
    const [rows] = await db.query('SELECT * FROM users');
    return rows;
  }

  static async findByEmail(email) {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [
      email,
    ]);
    return rows[0];
  }
}

module.exports = UserModel;
