import { z } from "zod";

export const IconItemSchema = z.object({
  id: z.string().optional(),
  src: z.any().optional(),
  name: z
    .string()
    .min(1, "Name must be at least 1 characters long")
    .max(200, "Name must not exceed 200 characters"),
  color: z.string().optional(),
});

export type IconItem = z.infer<typeof IconItemSchema>;
