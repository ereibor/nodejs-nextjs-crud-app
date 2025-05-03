import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { connectDB } from "../src/config/db";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

export default app;
