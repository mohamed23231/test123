import { OrderReqSchemaInterface } from "@app_types/interfaces/forms_schemas/OrderReqSchemaInterface";
import { z, ZodType } from "zod";
const today = new Date().toISOString(); // Get today's date in ISO 8601 format
const isNumericString = (value: string) => /^\d+$/.test(value);

export const orderReqSchemaObject = {
  product: z.string().min(1),
  quantity: z.string().min(1).refine(isNumericString, {
    message: "Quantity must contain only numbers",
  }),
  unit: z.string().min(1),
  customer_location: z.string().min(1),
  delivery_start_date: z
    .string()
    .min(1)
    .refine(
      (startDate: string) => {
        const parsedStartDate = new Date(startDate);
        return parsedStartDate >= new Date(today);
      },
      { message: "Delivery start date must be on or after today" }
    ),
  delivery_end_date: z
    .string()
    .min(1)
    .refine(
      (endDate: string) => {
        const parsedStartDate = new Date(endDate);
        return parsedStartDate >= new Date(today);
      },
      { message: "Delivery start date must be on or after today" }
    ),

  note: z.string().optional(),
};

const orderReqSchema: ZodType<OrderReqSchemaInterface> =
  z.object(orderReqSchemaObject);

export { orderReqSchema };
