import { Router } from 'express';
import userController from '../controllers/UserC';

const router = new Router();

router.post('/', userController.create);

export default router;
