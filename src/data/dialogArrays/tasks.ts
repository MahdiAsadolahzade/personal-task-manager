// tasks-dialog-array.ts
import AutoComplete from "@/components/inputs/AutoComplete";
import Checkbox from "@/components/inputs/Checkbox";
import TextField from "@/components/inputs/TextField";
import { findIcon } from "@/lib/utils/finders";
import { Priorities } from "@/mock/priority.data";
import { recurrencePattern } from "@/mock/recurrence.data";
import { useTaskStatusStore } from "@/stores/task_status.store";
import { useTaskTypeStore } from "@/stores/task_type.store";
import { TFieldArray } from "@/types/dialog.type";

export const getTasksDialogArray = (): TFieldArray[] => {
  const statuses = useTaskStatusStore.getState().statuses;
  const types = useTaskTypeStore.getState().types;

  return [
    { name: "title", label: "Title", Component: TextField },
    {
      name: "description",
      label: "Description",
      Component: TextField,
      type: "text",
    },
    {
      name: "status",
      label: "Status",
      Component: AutoComplete,
      suggestions: statuses?.map((status) => ({
        id: status.id,
        name: status.name ?? "",
        src: findIcon(status?.icon!)?.src,
      })),
      suggestionKey: "src",
    },
    {
      name: "type",
      label: "Type",
      Component: AutoComplete,
      suggestions: types?.map((type) => ({
        id: type.id,
        name: type.name ?? "",
        src: findIcon(type?.icon!)?.src,
      })),
      suggestionKey: "src",
    },
    {
      name: "dueDate",
      label: "Due Date",
      Component: TextField,
      type: "datetime-local",
    },
    {
      name: "setAlarm",
      label: "Set Alarm",
      Component: Checkbox,
    },
    {
      name: "isRecurring",
      label: "Is Recurring",
      Component: Checkbox,
    },
    {
      name: "priority",
      label: "Priority",
      Component: AutoComplete,
      suggestions: Priorities,
      suggestionKey: "name",
    },
    {
      name: "recurrencePattern",
      label: "Recurrence Pattern",
      Component: AutoComplete,
      suggestions: recurrencePattern,
      suggestionKey: "name",
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
        src: findIcon(status?.icon!)?.src,
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
        src: findIcon(type?.icon!)?.src,
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
        name: "recurrencePattern",
        label: "Recurrence Pattern",
        Component: AutoComplete,
        suggestions: recurrencePattern,
        multiSelect: true,
        suggestionKey: "name",
      },
  ];
};
