export type Task = {
  id: string;
  title: string;
  description?: string;
  status: string;
  type?: string;
  createdAt: string;
  updatedAt?: string;
  dueDate?: string;
  priority?:string;
  // 
  startTime?: string; // Optional separate time if needed
  endTime?: string; // Optional separate time if needed
  isRecurring?: boolean;
  originalTaskId?: string; // For recurring instances, points to original
  isInstance?: boolean; // Whether this is a generated instance
  recurrenceRule?: {
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
    interval: number; // Every X days/weeks/months/years
    endDate?: string; // When the recurrence should stop
    exceptions?: string[]; // Dates where the task shouldn't appear
    byWeekDay?: number[]; // For weekly - days of week (0-6, Sun-Sat)
    byMonthDay?: number[]; // For monthly - specific days
  };
};

export type TaskStatusName =
  | "PENDING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "ARCHIVED";

export type TaskTypeName = "PERSONAL" | "WORK" | "SHOPPING" | "HEALTH";

export type TaskStatus = {
  id: string;
  name: string | TaskStatusName;
  color?: string;
  icon?: string;
};

export type TaskType = {
  id: string;
  name: string | TaskTypeName;
  color?: string;
  icon?: string;
};
