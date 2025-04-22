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
    _setHasHydrated
  } = useTaskStore();
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Force hydration if it's taking too long
    const timeout = setTimeout(() => {
      if (!_hasHydrated) {
        _setHasHydrated(true);
      }
    }, 2000); // 2 second timeout

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearTimeout(timeout);
    };
  }, [_hasHydrated, _setHasHydrated]);

  return {
    isLoading,
    error,
    success,
    isHydrated: _hasHydrated,
    isOffline,
    clearState,
  };
};