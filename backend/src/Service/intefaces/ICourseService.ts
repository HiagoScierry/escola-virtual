import { Courses } from "@prisma/client";
import { addCourseSchema } from "../../Controllers/Courses/coursesSchema";
import { z } from "zod";

export interface ICourseService {
  addCourse(course: z.infer<typeof addCourseSchema>): Promise<number>;
  deleteCourse(courseId: number): Promise<void>;
  listingCourses(): Promise<Courses[]>;
}
