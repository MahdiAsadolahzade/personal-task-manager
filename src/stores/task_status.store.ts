import { statuses } from "@/mock/statuses.data";
import { createPersistedStore } from "./createPersistedStore";
import { TaskStatusStoreModel } from "@/models/task_status.model";

export const useTaskStatusStore = createPersistedStore<TaskStatusStoreModel>(
  "taskStatus-store",
  (set) => ({
    statuses: statuses,
    addStatus: (status) =>
      set((state) => ({ statuses: [status, ...state.statuses] })),
    deleteStatus: (id) =>
      set((state) => ({ statuses: state.statuses.filter((s) => s.id !== id) })),
    updateStatus(status) {
      set((state) => ({
        statuses: state.statuses.map((s) => (s.id === status.id ? status : s)),
      }));
    },
    clearStatuses: () => set({ statuses: [] }),
    setStatuses: (statuses) => set({ statuses }),
  }),
  (state) => ({ statuses: state.statuses })
);
