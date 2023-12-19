import express from "express";
import courses from "./courseRoutes";
import users from "./userRoutes";

const router = express.Router();

export default (): express.Router => {
  users(router);
  courses(router);
  return router;
};
