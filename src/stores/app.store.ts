import { createPersistedStore } from "./createPersistedStore";
import { AppStoreModel } from "@/models/app.model";

export const useAppStore = createPersistedStore<AppStoreModel>(
  "app-store",
  (set) => ({
    theme: "dark",
    version: "0.0.0",
    setVersion(v) {
      set({ version: v });
    },
    setTheme: (theme) => set({ theme }),
    toggleTheme: () =>
      set((state) => ({
        theme: state.theme === "dark" ? "light" : "dark",
      })),
    isMobile: false,
    setIsMobile: (isMobile) => set({ isMobile }),
    isDesktop: false,
    setIsDesktop: (isDesktop) => set({ isDesktop }),
    isTablet: false,
    setIsTablet: (isTablet) => set({ isTablet }),
  }),
  (state) => ({
    theme: state.theme,
    isMobile: state.isMobile,
    isDesktop: state.isDesktop,
    isTablet: state.isTablet,
  })
);
