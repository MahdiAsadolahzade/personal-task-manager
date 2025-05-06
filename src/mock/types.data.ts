import type { TaskType } from "@/types/task.type";
import { v4 as uuid } from "uuid";
import { findIcon } from "./helpers/findIcon";

export const types: TaskType[] = [
  {
    id: uuid(),
    name: "PERSONAL",
    color: "#FF5733",
    icon: findIcon('5'),
  },
  {
    id: uuid(),
    name: "WORK",
    color: "#FFC300",
    icon: findIcon('6'),
  },
];
