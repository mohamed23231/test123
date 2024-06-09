import { z, ZodType } from "zod";
import { VehicleSchemaInterface } from "../app_types/interfaces/forms_schemas/VehicleSchemaInterface";

const vehicleSchemaObject = {
  plate_number: z.string(),
  type: z.enum(["truck", "car"]),
  model: z.string(),
  examination_date: z.string(), // Date format: "YYYY-MM-DD"
  application_date: z.string(), // Date format: "YYYY-MM-DD"
  insurance_date: z.string(), // Date format: "YYYY-MM-DD"
};

const vehicleSchema: ZodType<VehicleSchemaInterface> =
  z.object(vehicleSchemaObject);

export { vehicleSchema };
