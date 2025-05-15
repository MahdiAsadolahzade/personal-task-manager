import type { TaskType } from "@/types/task.type";
import { v4 as uuid } from "uuid";
import { IconItems } from "./icon_data";

const findIcon = (id: string) => {
  const foundedIcon = IconItems?.find((icon) => icon.id === id)?.id;
  return foundedIcon;
};
export const types: TaskType[] = [
  {
    id: uuid(),
    name: "Personal",
    color: "#cddc39",
    icon: findIcon("5"),
  },
  {
    id: uuid(),
    name: "Work",
    color: "#ab47bc",
    icon: findIcon("6"),
  },
  {
    id: uuid(),
    name: "Health",
    color: "#80deea",
    icon: findIcon("7"),
  },
  {
    id: uuid(),
    name: "Project",
    color: "#f48fb1",
    icon: findIcon("8"),
  },
];
