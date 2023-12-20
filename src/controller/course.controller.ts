import { Request, Response } from "express";
import {
  CreateCourseInput,
  DeleteCourseInput,
  UpdateCourseInput,
} from "../schema/course.schema";
import {
  createCourse,
  deleteCourseByCourseId,
  findCourseByCourseId,
  getAllCourse,
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
  const courses = await getAllCourse();
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

export const deleteCourseHandler = async (
  req: Request<DeleteCourseInput["params"]>,
  res: Response
) => {
  const userId = res.locals.user;
  const courseId = req.params.courseId;
  const course = await findCourseByCourseId({ courseId });

  if (!course) {
    return res.status(404).json({ error: "Course not found" });
  }

  await deleteCourseByCourseId({ courseId });
  return res.status(200).json({ message: "course deleted successfully!!!" });
};
