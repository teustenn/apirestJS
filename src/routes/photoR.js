import { Router } from 'express';
import multer from 'multer';

import photoController from '../controllers/PhotoC';
import multerConfig from '../config/multer';

import loginRequired from '../middlewares/loginRequired';

const upload = multer(multerConfig);

const router = new Router();

router.post('/', upload.single('file'), loginRequired, photoController.store);

export default router;
