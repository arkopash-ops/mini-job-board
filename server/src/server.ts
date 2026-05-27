import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import app from './app';

const PORT = process.env.PORT || 8081;

mongoose
    .connect(process.env.MONGODB_URI as string)
    .then(() => {
        console.log('Connected to MogoDB.');

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}.`);
        });
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB:", err);
    });
