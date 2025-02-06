/// <reference path="../types/express.d.ts" />

import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

export class UserController {

    static async getProfile(req: Request, res: Response) {
        try {
            if (req.user) {
                const user = await UserService.getProfile(req.user.id);
                res.json(user);
            }
        } catch (error) {
            res.status(404).json({ error });
        }
    }

    static async updateProfile(req: Request, res: Response) {
        try {
            if (req.user) {
                const { name, email } = req.body;
                const updatedUser = await UserService.updateProfile(req.user.id, { name, email });
                res.json(updatedUser);
            }
        } catch (error) {
            res.status(400).json({ error });
        }
    }

    static async changePassword(req: Request, res: Response) {
        try {
            if (req.user) {
                const { oldPassword, newPassword } = req.body;
                const result = await UserService.changePassword(
                    req.user.id,
                    oldPassword,
                    newPassword
                );
                res.json(result);
            }
        } catch (error) {
            res.status(400).json({ error });
        }
    }

}