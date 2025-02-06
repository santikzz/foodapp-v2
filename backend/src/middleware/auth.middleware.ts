/// <reference path="../types/express.d.ts" />

import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { AppDataSource } from '../utils/database';
import { User } from '../entities/User.entitiy';

export const requireAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            res.status(401).json({ error: 'Authorization token required' });
            return;
        }

        const payload = AuthService.verifyToken(token);
        const user = await AppDataSource.getRepository(User).findOneBy({ id: payload.id });

        if (!user) {
            res.status(401).json({ error: 'User not found' });
            return;
        }

        req.user = user;
        next();

    } catch (error) {
        res.status(401).json({ error: 'Invalid or expired token' });
    }
};