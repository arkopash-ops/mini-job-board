import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import userRoutes from './modules/users/user.routes';
import jobRoutes from './modules/jobs/job.routes';
import applicationRoutes from './modules/application/application.routes';

import { errorHandler } from './middleware/error';

const app = express();

app.use(cors({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());

// routes
app.use('/api/user', userRoutes);
app.use('/api/job', jobRoutes);
app.use('/api', applicationRoutes);

app.use(errorHandler);

export default app;
