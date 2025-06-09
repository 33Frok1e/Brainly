import express from "express";
import dotenv from 'dotenv'
import connectDB from "./config/mongo.config";
import authRoutes from './routes/auth.route'

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use('/api/v1/auth', authRoutes)

app.listen(PORT, () => {
    connectDB();
    console.log('server is running on: ', PORT);
});