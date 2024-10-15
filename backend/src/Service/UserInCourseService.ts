import { IUserInCourseService } from "./intefaces/IUserInCourseService";
import { Courses, PrismaClient } from "@prisma/client";

export class UserInCourseService implements IUserInCourseService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    public async listCoursesByUser(id: number): Promise<Courses[]> {
        const courses = await this.prisma.usersCourses.findMany({
            where: {
                userId: id
            },
            include: {
                Courses: true
            }
        })

        return courses.map(item => item.Courses)
    }

    public async subscribeInCourse(
        courseId: number,
        userId: number,
    ): Promise<boolean> {
        const userCourse = await this.prisma.usersCourses.findFirst({
            where: {
                userId,
                courseId,
            },
        });

        if (userCourse) {
            return false;
        }

        await this.prisma.usersCourses.create({
            data: {
                userId,
                courseId,
            },
        });

        return true;
    }

    public async unsubscribeInCourse(
        courseId: number,
        userId: number,
    ): Promise<boolean> {
        const userCourse = await this.prisma.usersCourses.findFirst({
            where: {
                userId,
                courseId,
            },
        });

        if (!userCourse) {
            return false;
        }

        await this.prisma.usersCourses.delete({
            where: {
                id: userCourse.id,
            },
        });

        return true;
    }

}