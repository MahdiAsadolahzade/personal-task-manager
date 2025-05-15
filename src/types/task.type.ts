export type Task = {
  id: string;
  title: string;
  description?: string;
  status: string;
  type?: string;
  createdAt: string;
  updatedAt?: string;
  dueDate?: string;
  priority?: string;
  //
  startTime?: string; // Optional separate time if needed
  endTime?: string; // Optional separate time if needed
  isRecurring?: boolean;
  originalTaskId?: string; // For recurring instances, points to original
  isInstance?: boolean; // Whether this is a generated instance
  recurrenceRule?: {
    frequency: string;
    interval: number; // Every X days/weeks/months/years
    endDate?: string; // When the recurrence should stop
  };

  isRecurringParent?: boolean;
  isModifiedInstance?: boolean;
  instanceDate?: string;
  instanceIndex?: number;
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
