import express from 'express';
import cors from 'cors';

import userRoutes from './modules/users/user.routes';
import jobRoutes from './modules/jobs/job.routes';

import { errorHandler } from './middleware/error';

const app = express();

app.use(cors({ origin: process.env.CLIENT_ORIGIN }));
app.use(express.json());

// routes
app.use('/api/user', userRoutes);
app.use('/api/job', jobRoutes);

app.use(errorHandler);

export default app;
