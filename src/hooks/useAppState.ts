// src/hooks/useAppState.ts
import { useEffect, useState } from "react";
import useTaskStore from "@/stores/task.store";

export const useAppState = () => {
  const {
    isLoading,
    error,
    success,
    clearState,
    _hasHydrated,
    _setHasHydrated,
  } = useTaskStore();

  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Optional: debounce hydration check (if hydration is async delayed)
  useEffect(() => {
    if (_hasHydrated) return;

    const timeout = setTimeout(() => {
      _setHasHydrated(true); // fallback if Zustand's `onRehydrateStorage` doesn't fire
    }, 3000);

    return () => clearTimeout(timeout);
  }, [_hasHydrated, _setHasHydrated]);

  return {
    isLoading,
    error,
    success,
    clearState,
    isOffline,
    isHydrated: _hasHydrated,
  };
};
