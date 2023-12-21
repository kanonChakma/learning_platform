import express from "express";
import {
  createUserHandler,
  loginUserHandler,
  logoutUserHandler,
} from "../controller/auth.controller";
import validate from "../middleware/ validateResource";
import { deserializeUser } from "../middleware/deserializeUser";
import { requireUser } from "../middleware/requireUser";
import { createUserSchema, loginUserSchema } from "../schema/user.schema";

const router = express.Router();

router.post("/register", validate(createUserSchema), createUserHandler);
router.post("/login", validate(loginUserSchema), loginUserHandler);
router.use(deserializeUser, requireUser);
router.get("/logout", logoutUserHandler);

export default router;
