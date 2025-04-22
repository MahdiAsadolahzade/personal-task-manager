export type Task = {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  type?: TaskType;
  createdAt: string;
  dueDate?: string;
};
export type TaskStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED";
export type TaskType = "PERSONAL" | "WORK" | "SHOPPING" | "HEALTH";
