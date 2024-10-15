import express from "express";
import { login } from "../Controllers/Auth/authController";

const authRoutes = express.Router();

authRoutes.post("/", login);

export { authRoutes };
