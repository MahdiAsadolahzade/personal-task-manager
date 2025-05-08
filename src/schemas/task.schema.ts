import { z } from "zod";

export const TaskSchema = z.object({
    title: z.string(),
    description: z.string().optional().default(''),
    status: z.string(),
    type: z.string().optional().default(''),
    updatedAt: z.string().optional().default(''),
    dueDate: z.string().optional().default(''),
    setAlarm: z.boolean().optional().default(false),
    priority: z.string().optional().default(''),
    attachments: z.array(z.string()).optional().default([]),
    isRecurring: z.boolean().optional().default(false),
    recurrencePattern: z.string().optional().default(''),
    completedAt: z.string().optional().default(''),
    notes: z.string().optional().default(''),
});

export type Task = z.infer<typeof TaskSchema>;