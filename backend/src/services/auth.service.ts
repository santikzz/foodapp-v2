import jwt from 'jsonwebtoken';
import { AppDataSource } from "../utils/database";
import { User } from "../entities/User.entitiy";
import { JWT_SECRET } from '../config/env';

export class AuthService {

    static async register(email: string, name: string, password: string) {
        const userRepository = AppDataSource.getRepository(User);
        const existingUser = await userRepository.findOneBy({ email });
        if (existingUser) throw new Error('User already exists');
        const user = userRepository.create({ email, name, password });
        return userRepository.save(user);
    }

    static async login(email: string, password: string) {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({ email });
        if (!user || !(await user.comparePassword(password))) {
            throw new Error('Invalid login credentials');
        }
        return user;
    }

    static generateToken(user: User): string {
        return jwt.sign({ id: user.id }, JWT_SECRET!, { expiresIn: '1d' });
    }

    static verifyToken(token: string): { id: number } {
        return jwt.verify(token, JWT_SECRET!) as { id: number };
    }

}