import express from "express";
import {
  createCoursectHandler,
  getCoursectHandler,
} from "../controller/course.controller";
import validate from "../middleware/ validateResource";
import { createCourseSchema } from "../schema/course.schema";

export default (router: express.Router) => {
  router.post("/course", validate(createCourseSchema), createCoursectHandler);
  router.get("/course", getCoursectHandler);
};
