import express from 'express';
import { AppDataSource } from './utils/database';
import { PORT } from './config/env';

import authRoutes from './routes/auth.routes';
import storeRoutes from './routes/store.routes';
import orderRoutes from './routes/order.routes';
import userRoutes from './routes/user.routes';

const app = express();
app.use(express.json());

AppDataSource.initialize()
  .then(() => console.log('Database connected'))
  .catch(console.error);

app.use('/api/auth', authRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);

app.use((err: Error, req: express.Request, res: express.Response) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});