import express from "express";
import {
  createCourseHandler,
  findCourseHandler,
  getAllCourseHandler,
} from "../controller/course.controller";
import validate from "../middleware/ validateResource";
import { createCourseSchema, getCourseSchema } from "../schema/course.schema";

export default (router: express.Router) => {
  router.post("/course", validate(createCourseSchema), createCourseHandler);
  router.get("/course", getAllCourseHandler);
  router.get("/course/:courseId", validate(getCourseSchema), findCourseHandler);
};
