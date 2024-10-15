import { z } from "zod";

export const addCourseSchema = z.object({
  code: z.string().max(6),
  name: z.string().max(100),
  description: z.string().max(500),
  durationTime: z.number().int().positive(),
  courseSyllabus: z.string().max(500),
  price: z.number().int().positive(),
  courseImage: z.string().max(500),
});


