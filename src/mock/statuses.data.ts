import type { TaskStatus } from "@/types/task.type";
import { v4 as uuid } from "uuid";

export const statuses: TaskStatus[] = [
  {
    id: uuid(),
    name: "PENDING",
    color: "#FF5733",
    icon: "🕒",
  },
  {
    id: uuid(),
    name: "IN_PROGRESS",
    color: "#FFC300",
    icon: "🔄",
  },
  {
    id: uuid(),
    name: "COMPLETED",
    color: "#28A745",
    icon: "✅",
  },
  {
    id: uuid(),
    name: "ARCHIVED",
    color: "#6C757D",
    icon: "📦",
  },
];