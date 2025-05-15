import type { TaskStatus } from "@/types/task.type";
import { v4 as uuid } from "uuid";
import { IconItems } from "./icon_data";

const findIcon = (id: string) => {
  const foundedIcon = IconItems?.find((icon) => icon.id === id)?.id;
  return foundedIcon;
};
export const statuses: TaskStatus[] = [
  {
    id: uuid(),
    name: "PENDING",
    color: "#2196f3",
    icon: findIcon("1"),
  },
  {
    id: uuid(),
    name: "IN_PROGRESS",
    color: "#FFC300",
    icon: findIcon("2"),
  },
  {
    id: uuid(),
    name: "COMPLETED",
    color: "#28A745",
    icon: findIcon("3"),
  },
  {
    id: uuid(),
    name: "ARCHIVED",
    color: "#6C757D",
    icon: findIcon("4"),
  },

];
