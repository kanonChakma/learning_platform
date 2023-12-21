import { NextFunction, Request, Response } from "express";
import { get } from "lodash";
import { reIssueAccessToken } from "../services/session.service";
import AppError from "../utils/appError";
import { verifyJwt } from "../utils/jwt";
import { accessTokenCookieOptions } from "../utils/tokenOpitons";

export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let accessToken;
  if (req.cookies.access_token) {
    accessToken = req.cookies.access_token;
  } else {
    accessToken = get(req, "headers.authorization", "").replace(
      /^Bearer\s/,
      ""
    );
  }

  if (!accessToken) {
    return next(new AppError("You are not logged in", 401));
  }

  const refreshToken =
    (req.cookies.refresh_token as string) ||
    (get(req, "headers.x-refresh") as string);

  const { decoded, expired } = verifyJwt(accessToken, "accessTokenPublicKey");
  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  if (expired && refreshToken) {
    const newAccesToken = await reIssueAccessToken({ refreshToken, next });
    if (newAccesToken) {
      res.cookie("access_token", accessToken, accessTokenCookieOptions);
      res.cookie("logged_in", true, {
        ...accessTokenCookieOptions,
        httpOnly: false,
      });
      res.setHeader("x-access-token", newAccesToken);
    }
    const result = verifyJwt(newAccesToken as string, "accessTokenPublicKey");
    res.locals.user = result.decoded;
    return next();
  }
  next();
};
