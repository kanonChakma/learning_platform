import { Request, Response } from "express";
import { CreateCourseInput } from "../schema/course.schema";
import { createCourse, getCourse } from "../services/course.service";

export const createCoursectHandler = async (
  req: Request<{}, {}, CreateCourseInput["body"]>,
  res: Response
) => {
  const data = req.body;
  const course = await createCourse({ ...data });
  return res.status(201).json({ success: true, course });
};

export const getCoursectHandler = async (req: Request, res: Response) => {
  const courses = await getCourse();
  return res.send(courses);
};
