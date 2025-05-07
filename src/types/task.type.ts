export type Task = {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  type?: TaskType;
  createdAt: string;
  updatedAt?: string;
  dueDate?: string;
  setAlarm?: boolean;
  //new
  priority?: "LOW" | "MEDIUM" | "HIGH";
  attachments?: string[]; // URLs or file paths
  isRecurring?: boolean;
  recurrencePattern?: string; // e.g., "DAILY", "WEEKLY", "MONTHLY"
  completedAt?: string;
  notes?: string;
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
