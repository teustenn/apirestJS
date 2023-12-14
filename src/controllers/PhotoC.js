import multer from 'multer';
import { resolve } from 'path';
import fs from 'fs';

import multerConfig from '../config/multer';
import Photo from '../models/PhotoM';

const upload = multer(multerConfig).single('file');

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

        const photo = await Photo.findAll({ where: { student_id } });

        if (photo.length !== 0) {
          const path = resolve(__dirname, '..', '..', 'uploads', 'images', photo[0].filename);

          fs.unlink(path, async (err) => {
            if (err) {
              return res.status(400).json({
                errors: [err.message],
              });
            }

            await Photo.destroy({ where: { student_id } });
            return true;
          });
        }

        const newPhoto = await Photo.create({ originalname, filename, student_id });

        return res.json(newPhoto);
      } catch (e) {
        return res.status(400).json({
          errors: ['Student not found.'],
        });
      }
    });
  }
}

export default new PhotoController();
