import { Task } from "@/types/task.type";

export interface TaskStoreModel {
  tasks: Task[];
  addTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  updateTask: (task: Task) => void;
  setTasks: (tasks: Task[]) => void;
  clearTasks: () => void;
}