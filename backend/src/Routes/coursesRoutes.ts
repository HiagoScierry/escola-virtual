import express from "express";
import {
  addCourse,
  deleteCourse,
  listingCourses,
} from "../Controllers/Courses/coursesController";

const courseRoute = express.Router();

courseRoute.get("/", listingCourses);
courseRoute.post("/", addCourse);
courseRoute.delete("/:courseId", deleteCourse);

export { courseRoute };
