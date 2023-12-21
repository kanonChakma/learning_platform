import { FilterQuery } from "mongoose";
import UserModel, { UserDocument } from "../models/user.model";

export async function findUser(query: FilterQuery<UserDocument>) {
  return UserModel.findOne(query).lean();
}
