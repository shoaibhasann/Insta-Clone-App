import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/user.route.js";

const app = express();

// middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// allows cross origin request
app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
  })
);

// routes
app.use("/", userRoutes);

export default app;
