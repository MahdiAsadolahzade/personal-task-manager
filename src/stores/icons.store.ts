import { IconItems } from "@/mock/icon_data";
import { createPersistedStore } from "./createPersistedStore";
import { IconStoreModel } from "@/models/icon.model";

export const useIconStore = createPersistedStore<IconStoreModel>(
  "icon-store",
  (set) => ({
    icons: IconItems,
    addIcon: (icon) => set((state) => ({ icons: [icon, ...state.icons] })),
    deleteIcon: (name) =>
      set((state) => ({
        icons: state.icons.filter((icon) => icon.name !== name),
      })),
    updateIcon: (updatedIcon) =>
      set((state) => ({
        icons: state.icons.map((icon) =>
          icon.id === updatedIcon.id ? updatedIcon : icon
        ),
      })),
    clearAllIcons: () => set({ icons: [] }),
  }),
  (state) => ({ icons: state.icons })
);
