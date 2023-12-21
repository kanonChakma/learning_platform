import config from "config";
import { NextFunction, Request, Response } from "express";
import { CreateUserInput, LoginUserInput } from "../schema/user.schema";
import { createUser, validPassword } from "../services/auth.service";
import { createSession } from "../services/session.service";
import { signJwt } from "../utils/jwt";
import {
  accessTokenCookieOptions,
  refreshTokenCookieOptions,
} from "../utils/tokenOpitons";

export const createUserHandler = async (
  req: Request<{}, {}, CreateUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await createUser(req.body);
    return res.status(201).json({ status: "success", data: { user } });
  } catch (err: any) {
    if (err.code === 11000) {
      return res.status(409).json({
        status: "fail",
        message: "Email already exist",
      });
    }
    next(err);
  }
};

export const loginUserHandler = async (
  req: Request<{}, {}, LoginUserInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await validPassword(req.body);
    if (!user) {
      return res.status(401).send("Invalid email or password!!");
    }

    const session = await createSession(user._id, req.get("user-agent") || "");

    const accessToken = signJwt(
      { ...user, session: session._id },
      "accessTokenPrivateKey",
      { expiresIn: `${config.get<number>("accessTokenExpiresIn")}m` }
    );

    const refreshToken = signJwt(
      { ...user, session: session._id },
      "refreshTokenPrivateKey",
      { expiresIn: `${config.get<number>("accessTokenExpiresIn")}m` }
    );

    res.cookie("access_token", accessToken, accessTokenCookieOptions);
    res.cookie("refresh_token", refreshToken, refreshTokenCookieOptions);
    res.cookie("logged_in", true, {
      ...accessTokenCookieOptions,
      httpOnly: false,
    });

    res.status(200).json({
      status: "success",
      accessToken,
    });
  } catch (error: any) {
    next(error);
  }
};

export const logoutUserHandler = (res: Response) => {
  res.cookie("access_token", "", { maxAge: 1 });
  res.cookie("refresh_token", "", { maxAge: 1 });
  res.cookie("logged_in", "", {
    maxAge: 1,
  });
};
