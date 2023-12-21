import { object, string, TypeOf, z } from "zod";

const roles = ["admin", "user", "editor"] as const;

export const createUserSchema = object({
  body: object({
    name: string({
      required_error: "Name is required!!",
    }),

    password: string({
      required_error: "Password is required!!",
    }).min(6, "Password too short - should be 6 chars minimum"),

    passwordConfirmation: string({
      required_error: "Password Confirmation is required!!",
    }),
    role: z.enum(roles),
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email!"),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  }),
});

export const loginUserSchema = object({
  body: object({
    email: string({
      required_error: "Email is required",
    }),
    password: string({
      required_error: "Password is required",
    }),
  }),
});

export type LoginUserInput = TypeOf<typeof loginUserSchema>["body"];
// export type CreateUserInput = TypeOf<typeof createUserSchema>;
export type CreateUserInput = Omit<
  TypeOf<typeof createUserSchema>,
  "body.passwordConfirmation"
>["body"];
