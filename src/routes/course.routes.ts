import express from "express";
import {
  createCourseHandler,
  deleteCourseHandler,
  findCourseHandler,
  getAllCourseHandler,
  updateCourseHandler,
} from "../controller/course.controller";
import validate from "../middleware/ validateResource";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import {
  createCourseSchema,
  deleteCourseSchema,
  getCourseSchema,
  updateCourseSchema,
} from "../schema/course.schema";

const router = express.Router();

router.use(deserializeUser, requireUser);
router.post("", validate(createCourseSchema), createCourseHandler);
router.get("", getAllCourseHandler);
router.get("/:courseId", validate(getCourseSchema), findCourseHandler);
router.delete("/:courseId", validate(deleteCourseSchema), deleteCourseHandler);
router.put("/:courseId", validate(updateCourseSchema), updateCourseHandler);

export default router;
