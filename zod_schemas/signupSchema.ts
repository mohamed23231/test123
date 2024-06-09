import { z, ZodType } from "zod";
import { SignupSchemaInterface } from "../app_types/interfaces/forms_schemas/SingupSchemaInterface";
import { loginSchemaObject } from "./loginSchema";
import { PASSWORD_REGEX } from "@configs/regex";

const signupSchemaObject = {
  email: z.string().email(),
  password: z.string().min(8).regex(PASSWORD_REGEX, {
    message:
      "Password must contain at least one lowercase letter, one uppercase letter, and one special character",
  }),
  confirmPassword: z.string(),
  role: z.enum(["company", "manager", "driver"]),
};

const signupSchema: ZodType<SignupSchemaInterface> = z
  .object(signupSchemaObject)
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export { signupSchema };
