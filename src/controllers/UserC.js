import User from '../models/UserM';

class UserController {
  async create(req, res) {
    try {
      const newUser = await User.create(req.body);

      return res.json(newUser);
    } catch (e) {
      return res.status(400).json({
        errors: e.message,
      });
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll();

      return res.json(users);
    } catch (e) {
      return res.json(null);
    }
  }

  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.id);

      return res.json(user);
    } catch (e) {
      return res.json(null);
    }
  }

  async update(req, res) {
    try {
      if (!req.params) {
        return res.status(400).json({
          errors: ['Missing id'],
        });
      }

      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(400).json({
          errors: ['User not found'],
        });
      }

      const userUpdated = await user.update(req.body);
      return res.json(userUpdated);
    } catch (e) {
      return res.status(400).json({
        errors: e.message,
      });
    }
  }

  async delete(req, res) {
    try {
      if (!req.params) {
        return res.status(400).json({
          errors: ['Missing id'],
        });
      }

      const user = await User.findByPk(req.params.id);

      if (!user) {
        return res.status(400).json({
          errors: ['User not found'],
        });
      }

      const userDeleted = await user.destroy(req.body);
      return res.json(userDeleted);
    } catch (e) {
      return res.status(400).json({
        errors: e.message,
      });
    }
  }
}

export default new UserController();
