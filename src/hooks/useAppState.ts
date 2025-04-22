// src/hooks/useAppState.ts
import { useEffect, useState } from "react";
import useTaskStore from "@/stores/task.store";

export const useAppState = () => {
  const { isLoading, error, success, clearState } = useTaskStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const unsubscribe = useTaskStore.persist.onFinishHydration(() => {
      setIsHydrated(true);
    });
    setIsHydrated(useTaskStore.persist.hasHydrated());
    return () => unsubscribe();
  }, []);

  return {
    isLoading,
    error,
    success,
    isHydrated,
    clearState,
  };
};