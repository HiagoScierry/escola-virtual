import { describe, it, beforeAll, beforeEach, afterAll, expect } from "@jest/globals";

import { PrismaClient } from "@prisma/client";
import { CourseService } from "../../../src/Service/CourseService";

describe("testing CourseService", () => {
  let prisma: PrismaClient;
  let courseService: CourseService;

  beforeAll(() => {
    prisma = new PrismaClient();
    courseService = new CourseService();
  });

  beforeEach(async () => {
    await prisma.usersCourses.deleteMany();
    await prisma.courses.deleteMany();
  });

  afterAll(async () => {
    await prisma.usersCourses.deleteMany();
    await prisma.courses.deleteMany();
    await prisma.$disconnect();
  })


  describe("AddCourse Method", () => {
    beforeEach(async () => {
      await prisma.courses.deleteMany();
    });

    it("should add a course", async () => {
      const course = {
        name: "Course 1",
        code: "C1",
        description: "This is a course",
        durationTime: 10,
        courseSyllabus: "Syllabus",
        price: 100,
        courseImage: "image",
      };

      const courseId = await courseService.addCourse(course);

      const courseAdded = await prisma.courses.findFirst({
        where: {
          id: courseId,
        },
      });

      expect(courseAdded).not.toBeNull();
    });
  });

  describe("DeleteCourse Method", () => {
    beforeEach(async () => {
      await prisma.courses.deleteMany();
    });

    it("should delete a course", async () => {
      const course = {
        name: "Course 1",
        code: "C1",
        description: "This is a course",
        durationTime: 10,
        courseSyllabus: "Syllabus",
        price: 100,
        courseImage: "image",
      };

      const courseId = await courseService.addCourse(course);

      await courseService.deleteCourse(courseId);

      const courseDeleted = await prisma.courses.findFirst({
        where: {
          id: courseId,
        },
      });

      expect(courseDeleted).toBeNull();
    });
  });

  describe("ListingCourses Method", () => {
    beforeEach(async () => {
      await prisma.courses.deleteMany();
    });

    it("should list courses", async () => {
      const course1 = {
        name: "Course 1",
        code: "C1",
        description: "This is a course",
        durationTime: 10,
        courseSyllabus: "Syllabus",
        price: 100,
        courseImage: "image",
      };

      const course2 = {
        name: "Course 2",
        code: "C2",
        description: "This is a course",
        durationTime: 10,
        courseSyllabus: "Syllabus",
        price: 100,
        courseImage: "image",
      };

      await courseService.addCourse(course1);
      await courseService.addCourse(course2);

      const courses = await courseService.listingCourses();

      expect(courses.length).toBe(2);
    });
  });

});
