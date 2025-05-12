import { z } from "zod";

export const TaskSchema = z.object({
  id: z.string().optional(),
  title: z
    .string()
    .min(5, { message: "Title must be at least 5 characters long" }),
  description: z
    .string()
    .max(500, { message: "Description must not exceed 500 characters" })
    .optional(),
  status: z.string().nonempty({ message: "Status is required" }),
  type: z.string().nonempty({ message: "Type is required" }),
  dueDate: z.string().nonempty({ message: "Due date is required" }),
  updatedAt: z.string().optional(),
  completedAt: z.string().optional(),
  priority: z.string().optional(),
});

export type Task = z.infer<typeof TaskSchema>;
