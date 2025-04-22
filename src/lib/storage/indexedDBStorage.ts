// src/lib/storage/indexedDBStorage.ts
import localforage from "localforage";

// Configure localforage to use IndexedDB
const store = localforage.createInstance({
  name: "task-manager-db",
  storeName: "tasks",
  driver: [
    localforage.INDEXEDDB,
    localforage.WEBSQL,
    localforage.LOCALSTORAGE
  ],
});

export const indexedDBStorage = {
  getItem: async <T>(key: string): Promise<T | null> => {
    try {
      const value = await store.getItem<T>(key);
      return value;
    } catch (error) {
      console.error("Error reading from IndexedDB:", error);
      return null;
    }
  },
  setItem: async <T>(key: string, value: T): Promise<void> => {
    try {
      await store.setItem(key, value);
    } catch (error) {
      console.error("Error writing to IndexedDB:", error);
    }
  },
  removeItem: async (key: string): Promise<void> => {
    try {
      await store.removeItem(key);
    } catch (error) {
      console.error("Error removing from IndexedDB:", error);
    }
  },
  clear: async (): Promise<void> => {
    try {
      await store.clear();
    } catch (error) {
      console.error("Error clearing IndexedDB:", error);
    }
  },
};