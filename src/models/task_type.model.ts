import type { TaskType } from "@/types/task.type";

export interface TaskTypeStoreModel  {
    types: TaskType[];
    addType: (type: TaskType) => void;
    deleteType: (id: string) => void;
    updateType: (type: TaskType) => void;
    setTypes: (types: TaskType[]) => void;
    clearTypes: () => void;
}