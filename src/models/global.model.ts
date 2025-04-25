// src/models/global.model.ts
import { StateCreator } from "zustand";

export interface WithGlobal {
  isLoading: boolean;
  setLoading: (value: boolean) => void;
  // optionally: error, setError, etc.
}

export const createGlobalSlice: StateCreator<WithGlobal, [], [], WithGlobal> = (set) => ({
  isLoading: false,
  setLoading: (value) => set({ isLoading: value }),
});
