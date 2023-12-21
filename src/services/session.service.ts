import config from "config";
import { NextFunction } from "express";
import { get } from "lodash";
import { FilterQuery, UpdateQuery } from "mongoose";
import SessionModel, { SessionDocument } from "../models/session.model";
import AppError from "../utils/appError";
import { signJwt, verifyJwt } from "../utils/jwt";
import { findUser } from "./user.service";

export const createSession = async (userId: string, userAgent: string) => {
  try {
    const session = await SessionModel.create({ user: userId, userAgent });
    return session.toJSON();
  } catch (error: any) {
    throw new Error(error);
  }
};

export const findSessions = async (query: FilterQuery<SessionDocument>) => {
  try {
    const sessions = await SessionModel.find(query).lean();
    return sessions;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const updateSession = async (
  query: FilterQuery<SessionDocument>,
  update: UpdateQuery<SessionDocument>
) => {
  try {
    const response = await SessionModel.updateOne(query, update);
    return response;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const reIssueAccessToken = async ({
  refreshToken,
  next,
}: {
  refreshToken: string;
  next: NextFunction;
}) => {
  const { decoded } = verifyJwt(refreshToken, "refreshTokenPublicKey");
  const message = "Could not refresh access token";
  if (!decoded || !get(decoded, "session")) {
    return next(new AppError(message, 403));
  }

  const session = await SessionModel.findById(get(decoded, "session"));
  if (!session || !session.valid) {
    return next(new AppError(message, 403));
  }

  const user = await findUser({ _id: session.user });
  if (!user) {
    return next(new AppError(message, 403));
  }

  const accessToken = signJwt(
    { ...user, session: session._id },
    "accessTokenPrivateKey",
    { expiresIn: `${config.get<number>("accessTokenExpiresIn")}m` }
  );

  return accessToken;
};
