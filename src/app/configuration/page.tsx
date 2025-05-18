"use client";
import Card from "@/components/card/Card";
import Title from "@/components/typography/Title";
import { useDialogStore } from "@/stores/dialog.store";
import { useIconStore } from "@/stores/icons.store";
import { useTaskStatusStore } from "@/stores/task_status.store";
import { useCallback, useMemo, useState } from "react";
import { TDialogConfig, TDialogKind } from "@/types/dialog.type";
import { useTaskTypeStore } from "@/stores/task_type.store";
import IconsList from "@/components/sections/IconsList";
import {
  getIconsDialogsArray,
  getNameFilterArray,
  getStatusesDialogsArray,
  getTypesDialogsArray,
} from "@/data/dialogArrays/configuration";
import { IconItemSchema } from "@/schemas/icon.schema";
import { TaskStatusSchema } from "@/schemas/status.schema";
import { TaskTypeSchema } from "@/schemas/type.schema";

const ConfigPage = () => {
  const { openDialog } = useDialogStore();
  const { addStatus, statuses, updateStatus, deleteStatus } =
    useTaskStatusStore();
  const { icons, addIcon, updateIcon, deleteIcon } = useIconStore();
  const { types, addType, deleteType, updateType } = useTaskTypeStore();
  const [selectedStatus, setSelectedStatus] = useState<any>();
  const [selectedType, setSelectedType] = useState<any>();
  const [selectedIcon, setSelectedIcon] = useState<any>();

  

  const dialogConfig: TDialogConfig = useMemo(() => {
    return {
      status: {
        Add: {
          title: "Add Status",
          schema: TaskStatusSchema,
          array: getStatusesDialogsArray(),
          actions: { Add: addStatus },
          kind: "Add",
        },
        Edit: {
          title: "Edit Status",
          schema: TaskStatusSchema,
          array: getStatusesDialogsArray(),
          actions: { Edit: updateStatus },
          defaultValues: selectedStatus,
          kind: "Edit",
        },
        Delete: {
          title: "Delete Status",
          message: `Are you sure you want to delete ${selectedStatus?.name} ?`,
          actions: { Delete: deleteStatus },
          defaultValues: selectedStatus,
          kind: "Delete",
        },
      },

      type: {
        Add: {
          title: "Add Type",
          schema: TaskTypeSchema,
          array: getTypesDialogsArray(),
          actions: { Add: addType },
          kind: "Add",
        },
        Edit: {
          title: "Edit Type",
          schema: TaskTypeSchema,
          array: getTypesDialogsArray(),
          actions: { Edit: updateType },
          defaultValues: selectedType,
          kind: "Edit",
        },
        Delete: {
          title: "Delete Type",
          message: `Are you sure you want to delete ${selectedType?.name} ?`,
          actions: { Delete: deleteType },
          defaultValues: selectedType,
          kind: "Delete",
        },
      },

      icon: {
        Add: {
          title: "Add Icon",
          schema: IconItemSchema,
          array: getIconsDialogsArray(),
          actions: { Add: addIcon },
          kind: "Add",
        },
        Edit: {
          title: "Edit Icon",
          schema: IconItemSchema,
          array: getIconsDialogsArray(),
          actions: { Edit: updateIcon },
          kind: "Edit",
          defaultValues: selectedIcon,
        },
        Delete: {
          title: "Delete Icon",
          message: `Are you sure you want to delete ${selectedIcon?.name} ?`,
          actions: { Delete: deleteIcon },
          defaultValues: selectedIcon,
          kind: "Delete",
        },
      },
    };
  }, [
    addStatus,
    updateStatus,
    deleteStatus,
    addType,
    updateType,
    deleteType,
    addIcon,
    updateIcon,
    deleteIcon,
    selectedIcon,
    selectedType,
    selectedStatus,
  ]);

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
      <Title title="Configuration" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <Card
          title="Statuses"
          data={statuses}
          actions={{
            Add: () => handleOpenDialog("Add/status"),
            Edit: () => handleOpenDialog("Edit/status"),
            Delete: () => handleOpenDialog("Delete/status"),
          }}
          setSelectedValue={setSelectedStatus}
          selectedValue={selectedStatus}
          laoding={!useTaskStatusStore().hydrated}
          configuration={{ showColor: true }}
          filter={{
            filterArray: getNameFilterArray(),
          }}
        />

        <Card
          title="Types"
          data={types}
          actions={{
            Add: () => handleOpenDialog("Add/type"),
            Edit: () => handleOpenDialog("Edit/type"),
            Delete: () => handleOpenDialog("Delete/type"),
          }}
          setSelectedValue={setSelectedType}
          selectedValue={selectedType}
          laoding={!useTaskTypeStore().hydrated}
          configuration={{ showColor: true }}
          filter={{
            filterArray: getNameFilterArray(),
          }}
        />

        <Card
          title="Icons"
          data={icons}
          actions={{
            Add: () => handleOpenDialog("Add/icon"),
            Edit: () => handleOpenDialog("Edit/icon"),
            Delete: () => handleOpenDialog("Delete/icon"),
          }}
          setSelectedValue={setSelectedIcon}
          selectedValue={selectedIcon}
          laoding={!useIconStore().hydrated}
          filter={{
            filterArray: getNameFilterArray(),
          }}
          CustomComponent={IconsList}
        />
      </div>
    </div>
  );
};

export default ConfigPage;
