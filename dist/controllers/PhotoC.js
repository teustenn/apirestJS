"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);

var _multer3 = require('../config/multer'); var _multer4 = _interopRequireDefault(_multer3);
var _PhotoM = require('../models/PhotoM'); var _PhotoM2 = _interopRequireDefault(_PhotoM);

const upload = _multer2.default.call(void 0, _multer4.default).single('file');

class PhotoController {
  store(req, res) {
    return upload(req, res, async (error) => {
      if (error) {
        return res.status(400).json({
          errors: [error.code],
        });
      }

      try {
        const { originalname, filename } = req.file;
        const { student_id } = req.body;

        const photo = await _PhotoM2.default.findOne({ where: { student_id } });

        if (photo.length !== 0) {
          await _PhotoM2.default.destroy({ where: { id: student_id } });
        }

        const newPhoto = await _PhotoM2.default.create({ originalname, filename, student_id });

        return res.json(newPhoto);
      } catch (e) {
        return res.status(400).json({
          errors: ['Student not found.'],
        });
      }
    });
  }
}

exports. default = new PhotoController();
