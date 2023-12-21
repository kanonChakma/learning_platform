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
