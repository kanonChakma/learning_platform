import { Request, Response } from "express";
import { CreateCourseInput, UpdateCourseInput } from "../schema/course.schema";
import {
  createCourse,
  findCourseByCourseId,
  getCourse,
} from "../services/course.service";

export const createCourseHandler = async (
  req: Request<{}, {}, CreateCourseInput["body"]>,
  res: Response
) => {
  const data = req.body;
  const course = await createCourse({ ...data });
  return res.status(201).json({ success: true, course });
};

export const getAllCourseHandler = async (req: Request, res: Response) => {
  const courses = await getCourse();
  return res.send(courses);
};

export const findCourseHandler = async (
  req: Request<UpdateCourseInput["params"]>,
  res: Response
) => {
  const courseId = req.params.courseId;
  const course = await findCourseByCourseId({ courseId });

  if (!course) {
    return res.status(404).json({ error: "Course not found" });
  }
  return res.status(200).json(course);
};
