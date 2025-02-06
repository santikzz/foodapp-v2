import { AppDataSource } from '../utils/database';
import { Store } from '../entities/Store.entity';
import { Order } from '../entities/Order.entity';

export class OrderService {

  static async createOrder(userId: number, storeId: number, quantity: number) {

    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const store = await queryRunner.manager.findOne(Store, {
        where: { id: storeId },
        lock: { mode: 'pessimistic_write' }
      });

      if (!store || store.availableMeals < quantity) {
        throw new Error('Not enough meals available');
      }

      // Update store inventory
      store.availableMeals -= quantity;
      await queryRunner.manager.save(store);

      // Create order
      const order = queryRunner.manager.create(Order, {
        user: { id: userId },
        store: { id: storeId },
        quantity,
        totalPrice: store.mealPrice * quantity
      });

      const savedOrder = await queryRunner.manager.save(order);
      await queryRunner.commitTransaction();
      return savedOrder;

    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  static async getUserOrders(userId: number) {
    return AppDataSource.getRepository(Order).find({
      where: { user: { id: userId } },
      relations: ['store'],
      order: { createdAt: 'DESC' },
    });
  }

}