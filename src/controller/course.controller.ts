import { Request, Response } from "express";
import { CreateCourseInput } from "../schema/course.schema";
import { createCourse } from "../services/course.service";

export const createCoursectHandler = async (
  req: Request<{}, {}, CreateCourseInput["body"]>,
  res: Response
) => {
  const data = req.body;
  const course = await createCourse({ ...data });
  return course;
};
