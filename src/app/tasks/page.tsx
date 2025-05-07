"use client";
import Card from "@/components/card/Card";
import AutoComplete from "@/components/inputs/AutoComplete";
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
  const { statuses } = useTaskStatusStore();
  const { types } = useTaskTypeStore();

  const [selectedTask, setSelectedTask] = useState<any>();

  const dialogConfig: TDialogConfig = {
    task: {
      Add: {
        title: "Add Task",
        array: [
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
        ],
        actions: { Add: addTask },
        kind: "Add",
      },
      // Edit: {
      //   title: "Edit Status",
      //   array: [
      //     { name: "name", label: "Name", Component: TextField },
      //     {
      //       name: "color",
      //       label: "Color",
      //       Component: TextField,
      //       type: "color",
      //     },
      //     {
      //       name: "icon",
      //       label: "Icon",
      //       Component: AutoComplete,
      //       suggestions: icons?.map((icon) => ({
      //         id: icon.id,
      //         name: icon.name ?? "",
      //         src: icon?.src,
      //       })),
      //       suggestionKey: "src",
      //     },
      //   ],
      //   actions: { Edit: updateStatus },
      //   defaultValues: selectedStatus,
      //   kind: "Edit",
      // },
      // Delete: {
      //   title: "Delete Status",
      //   message: `Are you sure you want to delete ${selectedStatus?.name} ?`,
      //   actions: { Delete: deleteStatus },
      //   defaultValues: selectedStatus,
      //   kind: "Delete",
      // },
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
          Edit: () => handleOpenDialog("Edit/status"),
          Delete: () => handleOpenDialog("Delete/status"),
        }}
        setSelectedValue={setSelectedTask}
        selectedValue={selectedTask}
        laoding={!useTaskStore().hydrated}
        configuration={{ showIcon: false, showColor: true }}
        CustomComponent={TasksList}
      />
    </div>
  );
};

export default page;
