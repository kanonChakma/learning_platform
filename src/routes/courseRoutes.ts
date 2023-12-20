import express from "express";
import {
  createCourseHandler,
  deleteCourseHandler,
  findCourseHandler,
  getAllCourseHandler,
  updateCourseHandler,
} from "../controller/course.controller";
import validate from "../middleware/ validateResource";
import {
  createCourseSchema,
  deleteCourseSchema,
  getCourseSchema,
  updateCourseSchema,
} from "../schema/course.schema";

export default (router: express.Router) => {
  router.post("/course", validate(createCourseSchema), createCourseHandler);
  router.get("/course", getAllCourseHandler);
  router.get("/course/:courseId", validate(getCourseSchema), findCourseHandler);
  router.delete(
    "/course/:courseId",
    validate(deleteCourseSchema),
    deleteCourseHandler
  );
  router.put(
    "/course/:courseId",
    validate(updateCourseSchema),
    updateCourseHandler
  );
};
