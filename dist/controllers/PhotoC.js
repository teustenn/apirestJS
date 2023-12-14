"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _path = require('path');
var _fs = require('fs'); var _fs2 = _interopRequireDefault(_fs);

var _multer3 = require('../config/multer'); var _multer4 = _interopRequireDefault(_multer3);
var _PhotoM = require('../models/PhotoM'); var _PhotoM2 = _interopRequireDefault(_PhotoM);
var _StudentM = require('../models/StudentM'); var _StudentM2 = _interopRequireDefault(_StudentM);

const upload = _multer2.default.call(void 0, _multer4.default).single('file');

class PhotoController {
  store(req, res) {
    return upload(req, res, async (error) => {
      if (error) {
        return res.status(400).json({
          errors: [error.code],
        });
      }

      if (!req.file) {
        return res.status(400).json({
          errors: ['Missing file.'],
        });
      }

      try {
        const { originalname, filename } = req.file;
        const { student_id } = req.body;

        const photo = await _PhotoM2.default.findAll({ where: { student_id } });

        if (photo.length !== 0) {
          const path = _path.resolve.call(void 0, __dirname, '..', '..', 'uploads', 'images', photo[0].filename);

          _fs2.default.unlink(path, async (err) => {
            if (err) {
              return res.status(400).json({
                errors: [err.message],
              });
            }

            await _PhotoM2.default.destroy({ where: { student_id } });
            return true;
          });
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
