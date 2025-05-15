import { z } from "zod";

export const TaskSchema = z.object({
  id: z.string().optional(),
  title: z
    .string()
    .min(1, { message: "Title must be at least 1 characters long" }),
  description: z
    .string()
    .max(500, { message: "Description must not exceed 500 characters" })
    .optional(),
  status: z.string().nonempty({ message: "Status is required" }),
  type: z.string().optional(),
  dueDate: z.string().optional(),
  updatedAt: z.string().optional(),
  completedAt: z.string().optional(),
  priority: z.string().optional(),

  startTime: z.string().optional(),
  endTime: z.string().optional(),
  isRecurring: z.boolean().optional(),
  originalTaskId: z.string().optional(),
  isInstance: z.boolean().optional(),
  recurrenceRule: z
    .object({
      interval: z
        .number()
        .positive({ message: "interval must be greater than 0" })
        .optional(),
      frequency: z.string().optional(),
      endDate: z.string().optional(),
    })
    .optional(),
});
