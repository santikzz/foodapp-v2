import { Request, Response } from 'express';
import { OrderService } from '../services/order.service';

export class OrderController {

    static async createOrder(req: Request, res: Response) {
        try {
            const { storeId, quantity } = req.body;
            const order = await OrderService.createOrder(
                req.user.id,
                storeId,
                quantity
            );
            res.status(201).json(order);
        } catch (error) {
            res.status(400).json({ error });
        }
    }

    static async getUserOrders(req: Request, res: Response) {
        try {
            const orders = await OrderService.getUserOrders(req.user.id);
            res.json(orders);
        } catch (error) {
            res.status(400).json({ error });
        }
    }
}