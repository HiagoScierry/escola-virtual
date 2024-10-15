import { Courses } from "@prisma/client";

export interface IUserInCourseService {
    listCoursesByUser(id: number): Promise<Courses[]>
    subscribeInCourse(courseId: number, userId: number): Promise<boolean>;
    unsubscribeInCourse(courseId: number, userId: number): Promise<boolean>;
}