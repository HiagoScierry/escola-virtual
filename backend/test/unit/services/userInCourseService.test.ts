import { describe, it, beforeAll, expect , beforeEach} from "@jest/globals";
import { PrismaClient } from "@prisma/client";
import { UserInCourseService } from "../../../src/Service/UserInCourseService";


describe("", () => {
    let prisma: PrismaClient;
    let userInCourseService: UserInCourseService;

    beforeAll(() => {
        prisma = new PrismaClient();
        userInCourseService = new UserInCourseService();
    });

    beforeEach(async () => {
        await prisma.usersCourses.deleteMany();
        await prisma.courses.deleteMany();
    });

    describe("SubscribeInCourse Method", () => {
        beforeEach(async () => {
            await prisma.usersCourses.deleteMany();
        });

        it("should subscribe in a course", async () => {
            const course = {
                name: "Course 1",
                code: "C1",
                description: "This is a course",
                durationTime: 10,
                courseSyllabus: "Syllabus",
                price: 100,
                courseImage: "image",
            };

            const { id: courseId } = await prisma.courses.create({
                data: course,
            })

            const userId = 1;

            await userInCourseService.subscribeInCourse(courseId, userId);

            const userCourse = await prisma.usersCourses.findFirst({
                where: {
                    userId,
                    courseId,
                },
            });

            expect(userCourse).not.toBeNull();
        });

        it("should not subscribe in a course if already subscribed", async () => {
            const course = {
                name: "Course 1",
                code: "C1",
                description: "This is a course",
                durationTime: 10,
                courseSyllabus: "Syllabus",
                price: 100,
                courseImage: "image",
            };

            const { id: courseId } = await prisma.courses.create({
                data: course,
            })

            const userId = 1;

            await userInCourseService.subscribeInCourse(courseId, userId);

            const isNotSubscribed = await userInCourseService.subscribeInCourse(courseId, userId);

            expect(!isNotSubscribed).toBeTruthy();
        });
    });

    describe("UnsubscribeInCourse Method", () => {
        beforeEach(async () => {
            await prisma.usersCourses.deleteMany();
        });

        it("should unsubscribe in a course", async () => {
            const course = {
                name: "Course 1",
                code: "C1",
                description: "This is a course",
                durationTime: 10,
                courseSyllabus: "Syllabus",
                price: 100,
                courseImage: "image",
            };

            const { id: courseId } = await prisma.courses.create({
                data: course,
            })


            const userId = 1;

            await userInCourseService.subscribeInCourse(courseId, userId);

            await userInCourseService.unsubscribeInCourse(courseId, userId);

            const userCourse = await prisma.usersCourses.findFirst({
                where: {
                    userId,
                    courseId,
                },
            });

            expect(userCourse).toBeNull();
        });

        it("should not unsubscribe in a course if not subscribed", async () => {
            const course = {
                name: "Course 1",
                code: "C1",
                description: "This is a course",
                durationTime: 10,
                courseSyllabus: "Syllabus",
                price: 100,
                courseImage: "image",
            };

            const { id: courseId } = await prisma.courses.create({
                data: course,
            })


            const userId = 1;

            const isNotUnsubscribed = await userInCourseService.unsubscribeInCourse(courseId, userId);

            expect(!isNotUnsubscribed).toBeTruthy();
        });
    });
})