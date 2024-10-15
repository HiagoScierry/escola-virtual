import { UserInCourseService } from "@/Service/UserInCourseService";
import { UserService } from "@/Service/UserService";
import { Request, Response } from "express";

export const listUsers = async (request: Request, response: Response) => {
    const userService = new UserService();
    
    const users = await userService.list();
    
    return response.status(200).json(users);
};

export const getCoursesByUser = async (request: Request, response: Response) => {
    const userInCourseService = new UserInCourseService();

    const { userId } = request.params;

    const courses = await userInCourseService.listCoursesByUser(parseInt(userId));

    return response.status(200).json(courses);
}
