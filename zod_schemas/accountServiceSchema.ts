import { AccountServiceSchemaInterface } from "@app_types/interfaces/forms_schemas/AccountServiceSchemaInterface";
import { z, ZodType } from "zod";

const accountServiceSchemaObject = {
  title: z.string().min(1).max(255),
  description: z.string().min(1),
  unit: z.string(),
  // price: z.string().regex(/^\d+(\.\d{1,2})?$/), // Decimal with up to 2 decimal places
  // available: z.enum(["true", "false"]),
};

const accountServiceSchema: ZodType<AccountServiceSchemaInterface> = z.object(
  accountServiceSchemaObject
);
export { accountServiceSchema };
