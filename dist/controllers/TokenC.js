"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _UserM = require('../models/UserM'); var _UserM2 = _interopRequireDefault(_UserM);

class TokenController {
  async store(req, res) {
    const { email = '', password = '' } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        errors: ['Invalid credentials'],
      });
    }

    const user = await _UserM2.default.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        errors: ['User not found.'],
      });
    }

    if (!(await user.isPasswordValid(password))) {
      return res.status(401).json({
        errors: ['Invalid password.'],
      });
    }

    const { id, name } = user;
    const token = _jsonwebtoken2.default.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return res.send({ user: { id, name, email }, token });
  }
}

exports. default = new TokenController();
