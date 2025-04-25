// src/stores/helpers/withLoading.ts
export interface WithLoading {
    isLoading: boolean;
    setLoading: (loading: boolean) => void;
  }
  
  export function withLoading<T extends object>(
    initializer: (set: any, get: any) => T
  ): (set: any, get: any) => T & WithLoading {
    return (set, get) => ({
      ...initializer(set, get),
      isLoading: false,
      setLoading: (loading: boolean) => set({ isLoading: loading }),
    });
  }
  