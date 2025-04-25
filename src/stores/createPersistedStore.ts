// src/stores/createPersistedStore.ts
import { create, StateCreator, StoreApi } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";
import { indexedDBStorage } from "@/lib/storage/indexedDBStorage";
import { WithGlobal, createGlobalSlice } from "@/models/global.model";

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

  const combinedInitializer: StoreInitializer<Combined> = withGlobal
    ? (((set: (partial: Partial<Combined> | ((state: Combined) => Partial<Combined>)) => void, get: () => Combined, api: StoreApi<Combined>) => {
        return {
          ...(initializer as StoreInitializer<T>)(set as any, get as any, api as any),
          ...createGlobalSlice(set as any, get as any, api as any),
        };
      }) as unknown as StoreInitializer<Combined>)
    : (initializer as unknown as StoreInitializer<Combined>);

  const customStorage = {
    getItem: async (name: string) => {
      const tempStore = create<Combined>()(combinedInitializer);
      if (withGlobal) tempStore.setState({ isLoading: true } as unknown as Partial<Combined>);
      const data = await indexedDBStorage.getItem<Combined>(name);
      if (withGlobal) tempStore.setState({ isLoading: false } as unknown as Partial<Combined>);
      return data ? { state: data } : null;
    },
    setItem: (name: string, value: any) => indexedDBStorage.setItem(name, value.state),
    removeItem: (name: string) => indexedDBStorage.removeItem(name),
  };

  return create<Combined>()(
    persist(combinedInitializer, {
      name: key,
      storage: customStorage,
      partialize: partialize ?? ((state) => state),
      
    } as PersistOptions<Combined>)
  );
}
