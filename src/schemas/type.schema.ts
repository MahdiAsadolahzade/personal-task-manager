import { z } from "zod";

export const TaskTypeSchema = z.object({
    id: z.string().optional(),
    name: z
        .string()
        .min(1, "Name must be at least 1 characters long")
        .max(200, "Name must not exceed 200 characters"),
    color: z.string().optional(),
    icon: z.string().optional(),
});

export type TaskTypeType = z.infer<typeof TaskTypeSchema>;
