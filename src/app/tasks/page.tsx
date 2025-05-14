"use client";
import Card from "@/components/card/Card";
import TasksList from "@/components/sections/TasksList";
import Title from "@/components/typography/Title";
import { useDialogStore } from "@/stores/dialog.store";
import { useTaskStore } from "@/stores/task.store";
import { TDialogConfig, TDialogKind } from "@/types/dialog.type";
import React, { useCallback, useState, useMemo } from "react";
import { TaskSchema } from "@/schemas/task.schema";
import {
  getTasksDialogArray,
  getTasksFilterArray,
} from "@/data/dialogArrays/tasks";
import { findPriority } from "@/mock/priority.data";

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: string;
  type?: string;
  createdAt: string;
  dueDate?: string;
};

const TasksPage = () => {
  const { openDialog ,content } = useDialogStore();
  const { tasks, addTask, updateTask,deleteTask, hydrated } = useTaskStore();
  const [selectedTask, setSelectedTask] = useState<any>();

  const dialogConfig: TDialogConfig = useMemo(() => ({
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
        schema: TaskSchema,
        array: getTasksDialogArray(),
        actions: { Edit: updateTask },
        defaultValues: {
          ...selectedTask,
          priority: findPriority(selectedTask?.priority)?.id,
        },
        kind: "Edit",
      },
      Delete:{
        title: "Edit Task",
        schema: TaskSchema,
      message:`are you sure about deleting ${selectedTask?.title}`,
        actions: { Delete: deleteTask },
        defaultValues: {
          ...selectedTask,
          priority: findPriority(selectedTask?.priority)?.id,
        },
        kind: "Delete",
      }
    },
  }), [addTask, updateTask, selectedTask]);

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
        title="Lists"
        data={tasks}
        actions={{
          Add: () => handleOpenDialog("Add/task"),
          Edit: () => handleOpenDialog("Edit/task"),
          Delete: () => handleOpenDialog("Delete/task"),
        }}
        setSelectedValue={setSelectedTask}
        selectedValue={selectedTask}
        laoding={!hydrated}
        configuration={{ showColor: true }}
        CustomComponent={TasksList}
        filter={{
          filterArray: getTasksFilterArray(),
        }}
      />
    </div>
  );
};

export default TasksPage;