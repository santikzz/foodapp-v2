import { Router } from 'express';
import { StoreController } from '../controllers/store.controller';
import { requireAuth } from '../middleware/auth.middleware';

const router = Router();

router.use(requireAuth);
router.get('/city/:city', StoreController.getStoresByCity);
router.get('/nearby', StoreController.getNearbyStores);
router.get('/:id', StoreController.getStoreDetails);

export default router;