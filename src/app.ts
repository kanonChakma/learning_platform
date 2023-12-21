import config from "config";
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import authRouter from "./routes/auth.routes";
import courseRouter from "./routes/course.routes";
import dbConnect from "./utils/connect";
import logger from "./utils/logger";

const port = config.get<number>("port");

const app = express();
app.use(express.json());

app.use(cookieParser());

app.use(
  cors({
    origin: config.get<string>("origin"),
    credentials: true,
  })
);

// helthCheck
app.get(
  "/api/healthChecker",
  (req: Request, res: Response, next: NextFunction) => {
    res.status(200).json({
      status: "success",
      message: "Welcome to Learning Platform",
    });
  }
);

app.use("/api/auth", authRouter);
app.use("/api/course", courseRouter);

app.listen(port, async () => {
  logger.info(`App is listening!! ${port}!!`);
  await dbConnect();
});
