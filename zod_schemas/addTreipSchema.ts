import { z, ZodType } from "zod";
import { TripSchemaInterface } from "../app_types/interfaces/forms_schemas/TripSchemaInterface";

const TripSchemaObject = {
  product: z.string(),
  quantity: z.string(), // Ensure minimum value is 1
  unit: z.string(),
  driver: z.string().transform((val) => parseInt(val, 10)), // Convert string to number
  vehicle: z.string().transform((val) => parseInt(val, 10)), // Convert string to number
  load_location: z.string().transform((val) => parseInt(val, 10)), // Convert string to number
  delivery_date: z.string(), // Consider using z.date() if the format is consistent
  trip_count: z.string().min(1), // Ensure minimum value is 1
};

const tripSchema: ZodType<TripSchemaInterface> = z.object(TripSchemaObject);

export { tripSchema };
