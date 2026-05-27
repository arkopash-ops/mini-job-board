import express from 'express';
import cors from 'cors';
import userRoutes from './modules/users/user.routes';
import { errorHandler } from './middleware/error';

const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN }));
app.use(express.json());

// routes
app.use('/api/user', userRoutes);

app.use(errorHandler);

export default app;
