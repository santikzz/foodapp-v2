import { Request, Response } from 'express';
import { StoreService } from '../services/store.service';

export class StoreController {

    static async getStoresByCity(req: Request, res: Response) {
        try {
            const { city } = req.params;
            const stores = await StoreService.getStoresByCity(city);
            res.json(stores);
        } catch (error) {
            res.status(400).json({ error });
        }
    }

    static async getNearbyStores(req: Request, res: Response) {
        try {
            const { lat, lng, radius = '5' } = req.query;
            const stores = await StoreService.getNearbyStores(
                parseFloat(lat as string),
                parseFloat(lng as string),
                parseFloat(radius as string)
            );
            res.json(stores);
        } catch (error) {
            res.status(400).json({ error });
        }
    }

    static async getStoreDetails(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const store = await StoreService.getStoreDetails(parseInt(id));
            res.json(store);
        } catch (error) {
            res.status(400).json({ error });
        }
    }
}