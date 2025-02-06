import { Router } from 'express';
import { requireAuth } from '../middleware/auth.middleware';
import { OrderController } from '../controllers/order.controller';

const router = Router();

router.use(requireAuth);
router.post('/', OrderController.createOrder);
router.get('/', OrderController.getUserOrders);

export default router;