const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
const createError = require('http-errors');

class UserService {
  static async registerUser(user) {
    const { email, password } = user;

    const existing = await UserModel.findByEmail(email);
    if (existing) {
      throw createError(400, 'User already exists');
    }

    const hashed = await bcrypt.hash(password, 10);

    user.password = hashed;

    const id = await UserModel.create(user);

    return { message: 'User created successfully', id };
  }

  static async loginUser({ email, password }) {
    const user = await UserModel.findByEmail(email);
    if (!user) {
      throw createError(404, 'User not found');
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw createError(400, 'Invalid password');
    }

    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );
    return { token };
  }
}

module.exports = UserService;
