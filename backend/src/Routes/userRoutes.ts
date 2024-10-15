import express from "express";
import {
  subscribeInCourse,
  unsubscribeInCourse,
} from "../Controllers/User/userInCoursesController";
import { getCoursesByUser, listUsers } from "@/Controllers/User/userController";

const userRoute = express.Router();

userRoute.post("/:userId/course/:courseId/subscribe/", subscribeInCourse);
userRoute.post("/:userId/course/:courseId/unsubscribe", unsubscribeInCourse);

userRoute.get("/", listUsers);
userRoute.get("/:userId/courses", getCoursesByUser);

export { userRoute };
