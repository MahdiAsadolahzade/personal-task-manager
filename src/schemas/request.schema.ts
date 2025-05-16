import { z } from "zod";

export const RequestItemSchema = z.object({
  name: z
    .string()
    .min(1, "Name must be at least 1 characters long")
    .max(200, "Name must not exceed 200 characters")
    .nonempty({ message: "Name is required" }),
  subject: z.string().nonempty({ message: "Subject is required" }),
  description: z
    .string()
    .max(500, { message: "Description must not exceed 500 characters" })
    .nonempty({ message: "Description is required" }),
});
