import User from '../models/UserM';

class UserController {
  async store(req, res) {
    try {
      const newUser = await User.create(req.body);
      const { id, name, email } = newUser;

      return res.json({ id, name, email });
    } catch (e) {
      return res.status(400).json({ errors: e.errors[0].message });
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll({ attributes: ['id', 'name', 'email'] });

      return res.json(users);
    } catch (e) {
      return res.json(null);
    }
  }

  async show(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      const { id, name, email } = user;

      return res.json({ id, name, email });
    } catch (e) {
      return res.json(null);
    }
  }

  async update(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({
          errors: ['User not found'],
        });
      }

      const reqName = req.body.name;
      const reqEmail = req.body.email;
      const reqPassword = req.body.password;

      let userUpdated = '';

      if (reqName) {
        userUpdated = await user.update(req.body);
      }

      if (reqEmail && !reqPassword) {
        return res.status(400).json({
          errors: ['Missing password'],
        });
      }

      if (reqEmail && reqPassword) {
        if (!(await user.isPasswordValid(reqPassword))) {
          return res.status(401).json({
            errors: ['Invalid password.'],
          });
        }

        userUpdated = await user.update({ email: reqEmail });
      }

      const { id, name, email } = userUpdated;

      return res.json({ id, name, email });
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

      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({
          errors: ['User not found'],
        });
      }

      await user.destroy(req.body);

      return res.json(true);
    } catch (e) {
      return res.status(400).json({
        errors: e.message,
      });
    }
  }
}

export default new UserController();
