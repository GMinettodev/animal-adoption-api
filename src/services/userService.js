const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
const createError = require('http-errors');

class UserService {
  static validRoles = ['adopter', 'admin'];

  static isRoleValid(role) {
    return UserService.validRoles.includes(role);
  }

  static async registerUser(user) {
    const { email, password, role = 'adopter' } = user;

    const existing = await UserModel.findByEmail(email);
    if (existing) {
      throw createError(400, 'User already exists');
    }
    
    // Validates the role only if it's provided
    if (user.role && !UserService.isRoleValid(user.role)) {
      throw createError(400, `Invalid role: ${role}`);
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
        id: user.id,
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

  static async changeUser(id, user) {
    const { name, email, password, phone, role } = user;

    const hashed = await bcrypt.hash(password, 10);

    const result = await UserModel.update(id, {
      name,
      email,
      password: hashed,
      phone,
      role,
    });

    if (result.affectedRows === 0) {
      throw createError(404, 'User not found');
    }

    return { message: 'User updated successfully', id };
  }
}

module.exports = UserService;
