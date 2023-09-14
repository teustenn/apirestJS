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
        const id = req.body.student_id;

        const photo = await Photo.findAll({ where: { student_id: id } });

        if (!photo.length === 0) {
          return res.status(400).json({
            errors: ['Student already has a photo.'],
          });
        }

        const newPhoto = await Photo.create({ originalname, filename, id });

        return res.json(newPhoto);
      } catch (e) {
        return res.status(400).json({
          errors: e.message,
        });
      }
    });
  }
}

export default new PhotoController();
