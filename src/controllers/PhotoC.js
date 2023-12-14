import multer from 'multer';

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

      try {
        const { originalname, filename } = req.file;
        const { student_id } = req.body;

        const photo = await Photo.findAll({ where: { student_id } });

        if (photo.length !== 0) {
          await Photo.destroy({ where: { student_id } });
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
