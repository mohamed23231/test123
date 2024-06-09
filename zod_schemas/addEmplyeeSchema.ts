import { z, ZodType } from "zod";
import { AddEmployees } from "../app_types/interfaces/forms_schemas/AccountInfoSchemaInterface";

const signupSchemaObject = {
  email: z.string().email(),
  role: z.enum(["manager", "driver"]),
};

const addEmplyeeSchema: ZodType<AddEmployees> = z.object(signupSchemaObject);

export { addEmplyeeSchema };
