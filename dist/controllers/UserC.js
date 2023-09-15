"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _UserM = require('../models/UserM'); var _UserM2 = _interopRequireDefault(_UserM);

class UserController {
  async store(req, res) {
    try {
      const newUser = await _UserM2.default.create(req.body);
      const { id, name, email } = newUser;

      return res.json({ id, name, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.message,
      });
    }
  }

  async index(req, res) {
    try {
      const users = await _UserM2.default.findAll({ attributes: ['id', 'name', 'email'] });

      return res.json(users);
    } catch (e) {
      return res.json(null);
    }
  }

  async show(req, res) {
    try {
      const user = await _UserM2.default.findByPk(req.userId);

      const { id, name, email } = user;

      return res.json({ id, name, email });
    } catch (e) {
      return res.json(null);
    }
  }

  async update(req, res) {
    try {
      const user = await _UserM2.default.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({
          errors: ['User not found'],
        });
      }

      const userUpdated = await user.update(req.body);
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

      const user = await _UserM2.default.findByPk(req.userId);

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

exports. default = new UserController();
