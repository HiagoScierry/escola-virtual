import { Courses, PrismaClient } from "@prisma/client";
import { ICourseService } from "./intefaces/ICourseService";
import { z } from "zod";
import {addCourseSchema} from "../Controllers/Courses/coursesSchema";

export class CourseService implements ICourseService {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  public async addCourse(course: z.infer<typeof addCourseSchema>): Promise<number> {
    const addedCourse = await this.prisma.courses.create({
      data: {
        name: course.name,
        code: course.code,
        description: course.description,
        durationTime: course.durationTime,
        courseSyllabus: course.courseSyllabus,
        price: course.price,
        courseImage: course.courseImage,
      },
    });

    return addedCourse.id;
  }

  public async deleteCourse(courseId: number): Promise<void> {
    await this.prisma.courses.delete({
      where: {
        id: courseId,
      },
    });
  }

  public async listingCourses(): Promise<Courses[]> {
    return this.prisma.courses.findMany();
  }

}
