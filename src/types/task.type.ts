export type Task = {
  id: string;
  title: string;
  description?: string;
  status: string;
  type?: string;
  createdAt: string;
  updatedAt?: string;
  dueDate?: string;
  priority?:string
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
