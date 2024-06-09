import { z, ZodType } from "zod";

interface Status {
  status: "accepted" | "rejected" | "cancelled";
  rejection_reason?: string;
}

const statusSchemaObject = z.object({
  status: z.enum(["accepted", "rejected", "cancelled"]),
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
});

const statusSchema: ZodType<Status> = statusSchemaObject;

export { statusSchema };
