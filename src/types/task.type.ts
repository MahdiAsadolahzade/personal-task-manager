export type Task = {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  type?: TaskType;
  createdAt: string;
  dueDate?: string;
};

export type TaskStatusName =
  | "PENDING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "ARCHIVED";

export type TaskStatus = {
  id: string;
  name: string | TaskStatusName;
  color?: string;
  icon?: string;
};

export type TaskType = "PERSONAL" | "WORK" | "SHOPPING" | "HEALTH";
