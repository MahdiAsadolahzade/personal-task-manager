// src/stores/task.store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { TaskStoreModel } from "@/models/task.model";
import { indexedDBStorage } from "@/lib/storage/indexedDBStorage";

type PersistedTaskStore = Omit<
  TaskStoreModel,
  | "addTask"
  | "updateTask"
  | "deleteTask"
  | "clearAll"
  | "setLoading"
  | "setError"
  | "setSuccess"
  | "clearState"
  | "resetState"
  | "setState"
>;

const useTaskStore = create<TaskStoreModel>()(
  persist(
    (set, get) => ({
      tasks: [],
      isLoading: false,
      error: null,
      success: null,

      // Add task
      addTask: (task) => {
        set((state) => ({ 
          tasks: [task, ...state.tasks],
          success: "Task added successfully"
        }));
      },

      // Update task
      updateTask: (updated) => {
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === updated.id ? updated : t)),
          success: "Task updated successfully"
        }));
      },

      // Delete task
      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
          success: "Task deleted successfully"
        }));
      },

      // Clear all tasks
      clearAll: () => {
        set({ tasks: [], success: "All tasks cleared" });
      },

      // State management methods
      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      setSuccess: (success) => set({ success }),
      clearState: () => set({ error: null, success: null }),
      resetState: () => set({ 
        isLoading: false, 
        error: null, 
        success: null 
      }),
      setState: (state) => set(state),
    }),
    {
      name: "task-storage",
      storage: {
        getItem: async (name) => {
          const data = await indexedDBStorage.getItem<PersistedTaskStore>(name);
          return data ? { state: data } : null;
        },
        setItem: (name, value) => indexedDBStorage.setItem(name, value.state),
        removeItem: (name) => indexedDBStorage.removeItem(name),
      },
      partialize: (state) => ({
        tasks: state.tasks,
        error: state.error,
        isLoading: state.isLoading,
        success: state.success,
      }),
      version: 1, // Important for future migrations
      migrate: (persistedState, version) => {
        // Add migration logic if you change the store structure in future
        return persistedState as PersistedTaskStore;
      },
    }
  )
);

export default useTaskStore;