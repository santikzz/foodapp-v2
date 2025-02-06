import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER, NODE_ENV } from '../config/env';
import { DataSource } from 'typeorm';
import { User } from '../entities/User.entitiy';
import { Store } from '../entities/Store.entity';
import { Order } from '../entities/Order.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: [User, Store, Order],
  synchronize: NODE_ENV === 'development',
  logging: false,
});