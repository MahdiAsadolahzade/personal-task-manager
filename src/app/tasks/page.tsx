"use client";
import Card from "@/components/card/Card";
import AutoComplete from "@/components/inputs/AutoComplete";
import Checkbox from "@/components/inputs/Checkbox";
import TextField from "@/components/inputs/TextField";
import TasksList from "@/components/sections/TasksList";
import Title from "@/components/typography/Title";
import { findIcon } from "@/lib/utils/finders";
import { useDialogStore } from "@/stores/dialog.store";
import { useTaskStore } from "@/stores/task.store";
import { useTaskStatusStore } from "@/stores/task_status.store";
import { useTaskTypeStore } from "@/stores/task_type.store";
import { TDialogConfig, TDialogKind } from "@/types/dialog.type";
import React, { useCallback, useState } from "react";
import { TaskSchema } from "@/schemas/task.schema";
import {
  getTasksDialogArray,
  getTasksFilterArray,
} from "@/data/dialogArrays/tasks";
import { findPriority, Priorities } from "@/mock/priority.data";
import { findRecurrencePattern } from "@/mock/recurrence.data";
export type Task = {
  id: string;
  title: string;
  description?: string;
  status: string;
  type?: string;
  createdAt: string;
  dueDate?: string;
};

const page = () => {
  const { openDialog } = useDialogStore();
  const { tasks, addTask, updateTask, deleteTask } = useTaskStore();
  const [selectedTask, setSelectedTask] = useState<any>();

  const dialogConfig: TDialogConfig = {
    task: {
      Add: {
        title: "Add Task",
        schema: TaskSchema,
        array: getTasksDialogArray(),
        actions: { Add: addTask },
        kind: "Add",
      },
      Edit: {
        title: "Edit Task",
        // schema: TaskSchema,
        array: getTasksDialogArray(),
        actions: { Edit: updateTask },
        defaultValues: {
          ...selectedTask,
          priority: findPriority(selectedTask?.priority)?.id,
          recurrencePattern: findRecurrencePattern(
            selectedTask?.recurrencePattern
          )?.id,
        },
        kind: "Edit",
      },
    },
  };

  const handleOpenDialog = useCallback(
    (url: `${TDialogKind}/${string}`) => {
      const [kind, entity] = url.split("/") as [TDialogKind, string];
      const config = dialogConfig[entity][kind];
      if (config) {
        openDialog(config);
      }
    },
    [dialogConfig, openDialog]
  );

  return (
    <div>
      <Title title="Tasks" />

      <Card
        title="Tasks"
        data={tasks}
        actions={{
          Add: () => handleOpenDialog("Add/task"),
          Edit: () => handleOpenDialog("Edit/task"),
          Delete: () => handleOpenDialog("Delete/task"),
        }}
        setSelectedValue={setSelectedTask}
        selectedValue={selectedTask}
        laoding={!useTaskStore().hydrated}
        configuration={{ showColor: true }}
        CustomComponent={TasksList}
        filter={{
          filterArray: getTasksFilterArray(),
        }}
      />
    </div>
  );
};

export default page;
