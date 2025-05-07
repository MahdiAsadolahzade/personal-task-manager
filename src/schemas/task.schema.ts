import { z } from "zod";

export const TaskSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    status: z.string(), // Replace with actual TaskStatus values
    type: z.string().optional(), // Replace with actual TaskType if it's an enum
    createdAt: z.string(),
    updatedAt: z.string().optional(),
    dueDate: z.string().optional(),
    setAlarm: z.boolean().optional(),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
    attachments: z.array(z.string()).optional(),
    isRecurring: z.boolean().optional(),
    recurrencePattern: z.string().optional(),
    completedAt: z.string().optional(),
    notes: z.string().optional(),
});

export type Task = z.infer<typeof TaskSchema>;