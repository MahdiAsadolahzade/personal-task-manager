// tasks-dialog-array.ts
import AutoComplete from "@/components/inputs/AutoComplete";
import Checkbox from "@/components/inputs/Checkbox";
import RecurrenceRule from "@/components/inputs/customs/RecurrenceRule";
import TextArea from "@/components/inputs/TextArea";
import TextField from "@/components/inputs/TextField";
import { findIcon } from "@/lib/utils/finders";
import { Priorities } from "@/mock/priority.data";
import { useTaskStatusStore } from "@/stores/task_status.store";
import { useTaskTypeStore } from "@/stores/task_type.store";
import { TFieldArray } from "@/types/dialog.type";

export const getTasksDialogArray = (): TFieldArray[] => {
  const statuses = useTaskStatusStore.getState().statuses;
  const types = useTaskTypeStore.getState().types;

  return [
    { name: "title", label: "Title", Component: TextField },

    {
      name: "status",
      label: "Status",
      Component: AutoComplete,
      suggestions: statuses?.map((status) => ({
        id: status.id,
        name: status.name ?? "",
        src: findIcon(status?.icon ?? "")?.src,
      })),
    },
    {
      name: "type",
      label: "Type",
      Component: AutoComplete,
      suggestions: types?.map((type) => ({
        id: type.id,
        name: type.name ?? "",
        src: findIcon(type?.icon ?? "")?.src,
      })),
      suggestionKey: "src",
      show: (watch: any) => {
        return !watch("isInstance");
      },
    },
    {
      name: "dueDate",
      label: "Due Date",
      Component: TextField,
      type: "datetime-local",
    },
    {
      name: "priority",
      label: "Priority",
      Component: AutoComplete,
      suggestions: Priorities,
      suggestionKey: "name",
    },
    {
      name: "isRecurring",
      label: "Is Recurring",
      Component: Checkbox,
      show: (watch: any) => {
        return !watch("isInstance");
      },
    },
    {
      name: "recurrenceRule",
      label: "Recurrence Rule",
      Component: RecurrenceRule,
      show: (watch: any) => {
        return !watch("isInstance") && watch("isRecurring");
      },
   
    },
    {
      name: "description",
      label: "Description",
      Component: TextArea,
      type: "text",
    },
  ];
};

export const getTasksFilterArray = (): TFieldArray[] => {
  const statuses = useTaskStatusStore.getState().statuses;
  const types = useTaskTypeStore.getState().types;
  return [
    { name: "title", label: "Title", Component: TextField },

    {
      name: "status",
      label: "Status",
      Component: AutoComplete,
      suggestions: statuses?.map((status) => ({
        id: status.id,
        name: status.name ?? "",
        src: findIcon(status?.icon ?? "")?.src,
      })),
      multiSelect: true,
      suggestionKey: "src",
    },
    {
      name: "type",
      label: "Type",
      Component: AutoComplete,
      multiSelect: true,
      suggestions: types?.map((type) => ({
        id: type.id,
        name: type.name ?? "",
        src: findIcon(type?.icon ?? "")?.src,
      })),

      suggestionKey: "src",
    },
    {
      name: "priority",
      label: "Priority",
      Component: AutoComplete,
      suggestions: Priorities,
      multiSelect: true,
      suggestionKey: "name",
    },
    {
      name: "isInstance",
      label: "Is Instance",
      Component: Checkbox,
    },
  ];
};
