import express from "express";
import { authRoutes } from "./authRoutes";
import { courseRoute } from "./coursesRoutes";
import { userRoute } from "./userRoutes";

const router = express.Router();

router.use("/users", userRoute);
router.use("/auth", authRoutes);
router.use("/courses", courseRoute);

export { router };
