import { omit } from "lodash";
import UserModel from "../models/user.model";
import { UserCreateInput } from "../utils/type";

export const createUser = async (input: UserCreateInput) => {
  try {
    const user = await UserModel.create(input);
    return omit(user.toJSON(), "password");
  } catch (error: any) {
    throw new Error(error);
  }
};

export const validPassword = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = await UserModel.findOne({ email });
  if (!user) {
    return false;
  }

  const isValid = user.comparePassword(password);

  if (!isValid) return false;
  return omit(user.toJSON(), "password");
};
