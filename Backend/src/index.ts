import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import config from "./config/env";
import connectDB from "./config/db";
import routes from './routes'

const app = express();

// Database connection
connectDB();

// Middlewares
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/api', routes)

// error handling

const server = app.listen(config.port, () => {
  console.log(`Server running in ${config.env} mode on port ${config.port}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err: Error) => {
  console.error(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
