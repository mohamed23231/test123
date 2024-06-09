import { z, ZodType } from "zod";
import { AddLocationsInterface } from "@app_types/interfaces/forms_schemas/AddLocationsInterface";

const addLocationsSchemaObject = {
  title: z.string().min(1).max(255),
  address: z.string().min(1).max(255),
  phone: z.string().min(1).max(30),
  details: z.string().nullable(),
  gate: z.string(),
  type: z.enum(["loading", "unloading"]), // Added the type field with specific values
};

const addLocationsSchema: ZodType<AddLocationsInterface> = z.object(
  addLocationsSchemaObject
);

export { addLocationsSchema };
