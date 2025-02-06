import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { AppDataSource } from "../utils/database";
import { User } from "../entities/User.entitiy";

export class AuthController {

    static async register(req: Request, res: Response) {
        try {
            const { email, name, password } = req.body;
            const user = await AuthService.register(email, name, password);
            const token = AuthService.generateToken(user);
            res.status(201).json({ token });
        } catch (error) {
            res.status(400).json({ error });
        }
    }

    static async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body;
            const user = await AuthService.login(email, password);
            const token = AuthService.generateToken(user);
            res.status(200).json({ token });
        } catch (error) {
            res.status(400).json({ error });
        }
    }

}