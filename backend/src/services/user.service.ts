import { AppDataSource } from '../utils/database';
import { User } from '../entities/User.entitiy';

export class UserService {

    static async getProfile(userId: number) {
        const user = await AppDataSource.getRepository(User).findOne({
            where: { id: userId },
            select: ['id', 'name', 'email', 'createdAt'], // Only expose necessary fields
        });

        if (!user) {
            throw new Error('User not found');
        }

        return user;
    }

    static async updateProfile(userId: number, updateData: Partial<User>) {
        const userRepository = AppDataSource.getRepository(User);

        // Prevent updating sensitive fields
        if (updateData.password) {
            throw new Error('Use the change password endpoint to update password');
        }

        await userRepository.update(userId, updateData);
        return this.getProfile(userId);
    }

    static async changePassword(userId: number, oldPassword: string, newPassword: string) {
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOneBy({ id: userId });

        if (!user) {
            throw new Error('User not found');
        }

        // Verify old password
        const isPasswordValid = await user.comparePassword(oldPassword);
        if (!isPasswordValid) {
            throw new Error('Invalid old password');
        }

        // Update password
        user.password = newPassword;
        await userRepository.save(user);

        return { message: 'Password updated successfully' };
    }
}