import { Task } from "@/types/task.type";
import { StateModel } from "./state.model";

export interface TaskStoreModel extends StateModel {
  tasks: Task[];
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  clearAll: () => void;
}
