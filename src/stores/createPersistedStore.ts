// src/stores/createPersistedStore.ts
import { create, StateCreator } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";
import { indexedDBStorage } from "@/lib/storage/indexedDBStorage";
import { WithGlobal, createGlobalSlice } from "@/models/global.model";
import { CURRENT_APP_VERSION } from "@/lib/config";

type StoreInitializer<T> = StateCreator<T, [], [], T>;

export function createPersistedStore<
  T extends object,
  EnableGlobal extends boolean = true
>(
  key: string,
  initializer: StoreInitializer<T>,
  partialize?: (
    state: EnableGlobal extends true ? T & WithGlobal : T
  ) => Partial<EnableGlobal extends true ? T & WithGlobal : T>,
  withGlobal: EnableGlobal = true as EnableGlobal
) {
  type Combined = EnableGlobal extends true ? T & WithGlobal : T;
  type WithHydration = Combined & {
    hydrated: boolean;
    appVersion: string;
    setHydrated: (value: boolean) => void;
  };

  const combinedInitializer: StoreInitializer<WithHydration> = (
    set,
    get,
    api
  ) => {
    const base = withGlobal
      ? {
          ...(initializer as StoreInitializer<T>)(set as any, get as any, api as any),
          ...createGlobalSlice(set as any, get as any, api as any),
        }
      : (initializer as StoreInitializer<T>)(set as any, get as any, api as any);

    return {
      ...(base as Combined),
      hydrated: false,
      setHydrated: (value: boolean) => set({ hydrated: value } as Partial<WithHydration>),
    } as WithHydration;
  };

  const customStorage = {
    getItem: async (name: string) => {
      const data = await indexedDBStorage.getItem<Combined & { appVersion?: string }>(name);
      if (data?.appVersion !== CURRENT_APP_VERSION) {
        console.warn(`[Store] Version mismatch for "${name}". Clearing old data.`);
        await indexedDBStorage.removeItem(name); // Clear old store
        return null; // Do not rehydrate
      }
      return data ? { state: data } : null;
    },
    
    setItem: (name: string, value: any) => {
      return indexedDBStorage.setItem(name, {
        ...value.state,
        appVersion: CURRENT_APP_VERSION,
      });
    }
,    
    removeItem: (name: string) => indexedDBStorage.removeItem(name),
  };

  const store = create<WithHydration>()(
    persist(combinedInitializer, {
      name: key,
      appVersion: CURRENT_APP_VERSION,
      storage: customStorage,
      partialize: partialize ?? ((state) => state),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true); // ✅ Set hydrated to true once rehydration finishes
      },
    } as PersistOptions<WithHydration>)
  );

  return store;
}
