import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { requireAuth } from '../middleware/auth.middleware';

const router = Router();

router.use(requireAuth);
router.get('/me', UserController.getProfile);
router.patch('/me', UserController.updateProfile);
router.post('/me/change-password', UserController.changePassword);

export default router;