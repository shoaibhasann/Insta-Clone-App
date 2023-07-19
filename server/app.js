import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/user.route.js";

const app = express();

// middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Allow requests from 'http://127.0.0.1:5500'
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    credentials: true,
  })
);

// routes
app.use("/", userRoutes);

export default app;
