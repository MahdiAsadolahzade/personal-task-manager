import { z } from "zod";

const RecurrenceRuleSchema = z.object({
  interval: z.number().positive({ message: "Interval must be greater than 0" }),
  frequency: z.enum(['1', '2', '3', '4'], {
    errorMap: () => ({ message: "Please select a valid frequency" })
  }),
  // frequency:z.string(),
  endDate: z.string().optional(),
}).optional();

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
  recurrenceRule: RecurrenceRuleSchema,

});

