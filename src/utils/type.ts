export type UserCreateInput = {
  email: string;
  name: string;
  password: string;
  role: "admin" | "user" | "editor";
};

export type UserLoginInput = {
  email: string;
  password: string;
};

export type RolesType = {
  Admin: string;
  Editor: string;
  User: string;
};

export const ROLES_LIST: RolesType = {
  Admin: "admin",
  Editor: "editor",
  User: "user",
};
