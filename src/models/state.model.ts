export interface StateModel {
    isLoading: boolean;
    error: string | null;
    success: string | null;
    _hasHydrated: boolean;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    setSuccess: (success: string | null) => void;
    clearState: () => void;
    resetState: () => void;
    setState: (state: Partial<StateModel>) => void;
    _setHasHydrated: (state: boolean) => void;
}