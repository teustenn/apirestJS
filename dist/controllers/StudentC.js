"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _StudentM = require('../models/StudentM'); var _StudentM2 = _interopRequireDefault(_StudentM);
var _PhotoM = require('../models/PhotoM'); var _PhotoM2 = _interopRequireDefault(_PhotoM);

class StudentController {
  async index(req, res) {
    const students = await _StudentM2.default.findAll({
      attributes: ['id', 'name', 'lastname', 'email', 'age', 'weight', 'height'],
      order: [['id', 'DESC'], [_PhotoM2.default, 'id', 'DESC']],
      include: {
        model: _PhotoM2.default,
        attributes: ['url', 'filename'],
      },
    });

    return res.json({ students });
  }

  async store(req, res) {
    try {
      const newStudent = await _StudentM2.default.create(req.body);
      return res.json(newStudent);
    } catch (e) {
      return res.status(400).json({
        errors: e.message,
      });
    }
  }

  async show(req, res) {
    try {
      const student = await _StudentM2.default.findByPk(req.params.id, {
        attributes: ['id', 'name', 'lastname', 'email', 'age', 'weight', 'height'],
        order: [['id', 'DESC'], [_PhotoM2.default, 'id', 'DESC']],
        include: {
          model: _PhotoM2.default,
          attributes: ['url', 'filename'],
        },
      });

      if (!student) {
        return res.status(400).json({
          errors: ['Student not found.'],
        });
      }

      return res.send(student);
    } catch (e) {
      return res.json(null);
    }
  }

  async update(req, res) {
    try {
      const student = await _StudentM2.default.findByPk(req.params.id);

      if (!student) {
        return res.status(400).json({
          errors: ['Student not found.'],
        });
      }

      const studentUpdated = await student.update(req.body);

      return res.json(studentUpdated);
    } catch (e) {
      return res.status(400).json({
        errors: e.message,
      });
    }
  }

  async delete(req, res) {
    try {
      const student = await _StudentM2.default.findByPk(req.params.id);

      if (!student) {
        return res.status(400).json({
          errors: ['Student not found.'],
        });
      }

      await student.destroy(student);

      return res.json(true);
    } catch (e) {
      return res.status(400).json({
        errors: e.message,
      });
    }
  }
}

exports. default = new StudentController();
