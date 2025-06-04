const UserModel = require('../models/userModel');
const UserService = require('../services/userService');
const createError = require('http-errors');

class UserController {
  static async register(req, res, next) {
    try {
      const result = await UserService.registerUser(req.body);
      return res.json(result);
    } catch (err) {
      return next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const result = await UserService.loginUser(req.body);
      return res.status(200).json(result);
    } catch (err) {
      return next(err);
    }
  }

  static async getUsers(req, res, next) {
    try {
      const users = await UserModel.findAll();
      return res.json(users);
    } catch (err) {
      return next(err);
    }
  }

  static async getUserById(req, res, next) {
    try {
      const id = req.params.id;
      const user = await UserModel.findById(id);
      if (!user) {
        return next(createError(404, 'User not found'));
      }
      return res.json(user);
    } catch (err) {
      return next(err);
    }
  }

  static async editUser(req, res, next) {
    try {
      const result = await UserService.changeUser(req.params.id, req.body);
      return res.json(result);
    } catch (err) {
      return next(err);
    }
  }

  static async removeUser(req, res, next) {
    const { id } = req.params;

    try {
      const result = await UserModel.delete(id);

      if (result.affectedRows === 0) {
        return next(createError(404, 'User not found'));
      }

      return res.status(200).json({ message: 'User deleted successfully' });
    } catch {
      return next(createError(500, 'Error deleting user'));
    }
  }
}

module.exports = UserController;
