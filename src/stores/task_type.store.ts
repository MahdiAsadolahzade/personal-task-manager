import { createPersistedStore } from "./createPersistedStore";
import { TaskTypeStoreModel } from "@/models/task_type.model";
import { types } from "@/mock/types.data";

export const useTaskTypeStore = createPersistedStore<TaskTypeStoreModel>(
  "taskTypes-store",
  (set) => ({
    types: types,
    addType: (type) => set((state) => ({ types: [type, ...state.types] })),
    deleteType: (id) =>
      set((state) => ({ types: state.types.filter((s) => s.id !== id) })),
    updateType(type) {
      set((state) => ({
        types: state.types.map((s) => (s.id === type.id ? type : s)),
      }));
    },
    clearTypes: () => set({ types: [] }),
    setTypes: (types) => set({ types }),
  }),
  (state) => ({ types: state.types })
);

export const typesList = () => {
  const store = useTaskTypeStore.getState();
  return store.types;
};