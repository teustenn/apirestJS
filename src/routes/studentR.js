import { Router } from 'express';
import studentController from '../controllers/StudentC';

import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', loginRequired, studentController.index);
router.get('/:id', loginRequired, studentController.show);

router.post('/', loginRequired, studentController.store);
router.put('/:id', loginRequired, studentController.update);
router.delete('/:id', loginRequired, studentController.delete);

export default router;
