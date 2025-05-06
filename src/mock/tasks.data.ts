import type { Task } from "@/types/task.type";
import { v4 as uuid } from "uuid";
import { statuses } from "./statuses.data";

const findStatusByName = (name: string) => {
  const status = statuses.find((status) => status.name === name);
  return status
    ? status
    : { id: uuid(), name: "UNKNOWN", color: "#000000", icon: "❓" };
};

export const tasks: Task[] = [
  {
    id: uuid(),
    title: "Task 1",
    description: "Description for task 1",
    status: findStatusByName("PENDING"),
    createdAt: new Date().toISOString(),
  },
  {
    id: uuid(),
    title: "Task 2",
    description: "Description for task 2",
    status: findStatusByName("PENDING"),
    createdAt: new Date().toISOString(),
  },
  {
    id: uuid(),
    title: "Task 3",
    description: "Description for task 3",
    status: findStatusByName("PENDING"),
    createdAt: new Date().toISOString(),
  },
];
