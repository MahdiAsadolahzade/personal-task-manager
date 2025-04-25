import type { TaskStatus } from "@/types/task.type";

export interface TaskStatusStoreModel  {
    statuses: TaskStatus[];
    addStatus: (status: TaskStatus) => void;
    deleteStatus: (id: string) => void;
    updateStatus: (status: TaskStatus) => void;
    setStatuses: (statuses: TaskStatus[]) => void;
    clearStatuses: () => void;
}