import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

import logger from "./utils/logger.js";
import reqMiddleware from "./middleware/req.middleware.js";
import errorHandler from "./middleware/error-handler.js";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import eventRoutes from "./routes/event.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true, // Required for httpOnly cookie to be sent cross-origin
  }),
);
app.use(reqMiddleware);

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/event", eventRoutes);

// Health check
app.get("/health", (req, res) =>
  res.json({ status: "ok", service: "glimpse-api" }),
);

// Error handling
app.use(errorHandler);

// Start
app.listen(PORT, () => {
  logger.info(`Glimpse API running on port ${PORT}`);
});
