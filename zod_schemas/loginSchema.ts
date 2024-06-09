import { LoginSchemaInterface } from "@app_types/interfaces/forms_schemas/LoginSchemaInterface";
import { PASSWORD_REGEX } from "@configs/regex";
import { z, ZodType } from "zod";

export const loginSchemaObject = {
  email: z.string().email(),
  password: z.string().min(5),
};

const loginSchema: ZodType<LoginSchemaInterface> = z.object(loginSchemaObject);

export { loginSchema };
// .min(8).regex(PASSWORD_REGEX, {
//   message:
//     "Password must contain at least one lowercase letter, one uppercase letter, and one special character",
// }),
