import User from '../models/UserM';

class UserController {
  async create(req, res) {
    try {
      const newUser = await User.create(req.body);

      res.json(newUser);
    } catch (e) {
      res.status(400).json({
        errors: e.message,
      });
    }
  }
}

export default new UserController();
