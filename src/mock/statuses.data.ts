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
    name: "Pending",
    color: "#2196f3",
    icon: findIcon("1"),
  },
  {
    id: uuid(),
    name: "In Progress",
    color: "#FFC300",
    icon: findIcon("2"),
  },
  {
    id: uuid(),
    name: "Completed",
    color: "#28A745",
    icon: findIcon("3"),
  },
  {
    id: uuid(),
    name: "Archived",
    color: "#6C757D",
    icon: findIcon("4"),
  },
  {
    id: uuid(),
    name: "Unknown",
    color: "#dce775",
    icon: findIcon("9"),
  },

];
