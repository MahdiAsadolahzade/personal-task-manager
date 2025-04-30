// src/stores/dialog.store.ts
import { TDialogContent } from "@/types/dialog.type";
import { create } from "zustand";



interface DialogStoreState {
  isOpen: boolean;
  content: TDialogContent | null;
  openDialog: (content: TDialogContent) => void;
  closeDialog: () => void;
}

export const useDialogStore = create<DialogStoreState>((set) => ({
  isOpen: false,

  content: null,
  openDialog: (content) => set({ isOpen: true, content }),
  closeDialog: () => set({ isOpen: false, content: null }),
}));
