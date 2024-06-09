import { EmailSchemaInterface } from "@app_types/interfaces/forms_schemas/EmailSchemaInterface";
import { PASSWORD_REGEX } from "@configs/regex";
import { z, ZodType } from "zod";

export const emailSchemaObject = {
	email: z.string().email(),
	
};

const emailSchema: ZodType<EmailSchemaInterface> = z.object(emailSchemaObject);

export { emailSchema };
