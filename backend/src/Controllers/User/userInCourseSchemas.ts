import { z } from "zod";

export const subscribeOrUnsubscribeInCourseSchema = z.object({
    courseId: z.string(),
    userId: z.string(),
  });