class UserController {
  static login(req, res) {
    try {
      return res.status(200).send('Welcome to the public API!');
    } catch (error) {
      return res.status(500).json({
        message: 'Error accessing public route',
        error: error.message,
      });
    }
  }
}

module.exports = UserController;
