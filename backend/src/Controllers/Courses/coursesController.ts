import { Request, Response } from "express";
import {
  addCourseSchema,
} from "./coursesSchema";
import { CourseService } from "../../Service/CourseService";

export const addCourse = async (request: Request, response: Response) => {
  const {
    name,
    code,
    description,
    durationTime,
    courseSyllabus,
    price,
    courseImage,
  } = addCourseSchema.parse(request.body);

  const courseService = new CourseService();

  const addedCourseId = await courseService.addCourse({
    name,
    code,
    description,
    durationTime,
    courseSyllabus,
    price,
    courseImage,
  });

  return response.status(201).json({
    message: `"Course added successfully with id: ${addedCourseId}`,
  });
};

export const deleteCourse = async (request: Request, response: Response) => {
  const { courseId } = request.params;

  const courseService = new CourseService();

  await courseService.deleteCourse(Number(courseId));

  return response.status(200).json({
    message: "Course deleted successfully",
  });
};

export const listingCourses = async (request: Request, response: Response) => {
  const courseService = new CourseService();

  const courses = await courseService.listingCourses();

  return response.status(200).json(courses);
};
