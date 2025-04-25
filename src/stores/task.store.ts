// src/stores/task.store.ts

import { createPersistedStore } from "./createPersistedStore";
import { TaskStoreModel } from "@/models/task.model";

export const useTaskStore = createPersistedStore<TaskStoreModel>(
  "task-store",
  (set) => ({
    tasks: [],
    addTask: (task) => set((state) => ({ tasks: [task, ...state.tasks] })),
    deleteTask: (id) =>
      set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) })),
    updateTask(task) {
      set((state) => ({
        tasks: state.tasks.map((t) => (t.id === task.id ? task : t)),
      }));
    },
    clearTasks: () => set({ tasks: [] }),
    setTasks: (tasks) => set({ tasks }),
  }),
  (state) => ({ tasks: state.tasks }) // optional: pick what to persist
);
