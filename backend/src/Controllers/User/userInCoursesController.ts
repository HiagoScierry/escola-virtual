import { UserInCourseService } from "@/Service/UserInCourseService";
import { subscribeOrUnsubscribeInCourseSchema } from "./userInCourseSchemas";
import { Request, Response } from "express";

export const subscribeInCourse = async (
    request: Request,
    response: Response,
  ) => {

    const { courseId, userId } = subscribeOrUnsubscribeInCourseSchema.parse(
      request.params,
    );

    const userInCourseService = new UserInCourseService();

    const isSubscribed = await userInCourseService.subscribeInCourse(parseInt(courseId), parseInt(userId));

    if(!isSubscribed){
        return response.status(400).json({
            message: "User already subscribed in this course",
            isSubscribed
        });
    }

    return response.status(200).json({
      message: "Subscribed successfully",
      isSubscribed
    });
  };

  export const unsubscribeInCourse = async (
    request: Request,
    response: Response,
  ) => {
    const { courseId, userId } = subscribeOrUnsubscribeInCourseSchema.parse(
      request.params,
    );

    const userInCourseService = new UserInCourseService();

    const isUnsubscribed = await userInCourseService.unsubscribeInCourse(parseInt(courseId), parseInt(userId));

    if(!isUnsubscribed){
        return response.status(400).json({
            message: "User not subscribed in this course",
            isUnsubscribed
        });
    }

    return response.status(200).json({
      message: "Unsubscribed successfully",
      isUnsubscribed
    });
  };
