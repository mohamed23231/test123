import { z, ZodType } from "zod";
import { TripStatusInterface } from "@app_types/interfaces/forms_schemas/TripStatusInterface";

const TripStatusSchemaObj = z.object({
  status: z.enum(["pending", "loading", "in_way", "completed", "rejected"]),
  rejection_reason: z
    .string()
    .optional()
    .refine(
      (value) => {
        // Ensure rejection_reason is provided if status is 'rejected'
        return value !== undefined || value === undefined;
      },
      { message: "Rejection reason is required if status is 'rejected'" }
    ),
  confirm_image: z.any().optional(),
});
const TripStatusSchema: ZodType<TripStatusInterface> = TripStatusSchemaObj;

export { TripStatusSchema };
