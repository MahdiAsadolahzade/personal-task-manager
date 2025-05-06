import { iconsList } from "@/stores/icons.store";
import { statusList } from "@/stores/task_status.store";


export const findIcon = (id: string) => {
  return iconsList()?.find((item) => item?.id === id);
};

export const findStatus = (id: string) => {
  return statusList()?.find((item) => item?.id === id);
};
