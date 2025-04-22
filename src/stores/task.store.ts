// src/stores/task.store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Task } from "@/types/task.type";
import { indexedDBStorage } from "@/lib/storage/indexedDBStorage";

interface TaskStoreState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  success: string | null;
  _hasHydrated: boolean; // Track hydration status explicitly
}

interface TaskStoreActions {
  addTask: (task: Task) => void;
  updateTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  clearAll: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSuccess: (success: string | null) => void;
  clearState: () => void;
  _setHasHydrated: (state: boolean) => void; // Hydration control
}

type TaskStore = TaskStoreState & TaskStoreActions;

const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      isLoading: false,
      error: null,
      success: null,
      _hasHydrated: false, // Initial state

      // Actions
      addTask: (task) => set((state) => ({ 
        tasks: [task, ...state.tasks],
        success: "Task added successfully"
      })),

      updateTask: (updated) => set((state) => ({
        tasks: state.tasks.map((t) => (t.id === updated.id ? updated : t)),
        success: "Task updated successfully"
      })),

      deleteTask: (id) => set((state) => ({
        tasks: state.tasks.filter((t) => t.id !== id),
        success: "Task deleted successfully"
      })),

      clearAll: () => set({ 
        tasks: [],
        success: "All tasks cleared"
      }),

      setLoading: (loading) => set({ isLoading: loading }),
      setError: (error) => set({ error }),
      setSuccess: (success) => set({ success }),
      clearState: () => set({ error: null, success: null }),
      _setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: "task-storage",
      storage: {
        getItem: async (name) => {
          try {
            const data = await indexedDBStorage.getItem<TaskStoreState>(name);
            return data ? { state: data } : null;
          } catch (error) {
            console.error("IndexedDB access error:", error);
            return null;
          }
        },
        setItem: (name, value) => {
          return indexedDBStorage.setItem(name, value.state);
        },
        removeItem: (name) => indexedDBStorage.removeItem(name),
      },
      partialize: (state) => ({
        tasks: state.tasks,
        isLoading: state.isLoading,
        error: state.error,
        success: state.success,
        _hasHydrated: state._hasHydrated,
      }),
      onRehydrateStorage: () => (state) => {
        // This will be called when rehydration starts
        state?._setHasHydrated(true);
      },
    }
  )
);

export default useTaskStore;