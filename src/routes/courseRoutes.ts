import express from "express";
import { createCoursectHandler } from "../controller/course.controller";

export default (router: express.Router) => {
  router.post("/course", createCoursectHandler);
};
