// src/app/config/page.tsx
"use client";
import TextField from "@/components/inputs/TextField";
import Title from "@/components/typography/Title";
import Icon from "@/components/utils/Icon";
import { useDialogStore } from "@/stores/dialog.store";
import { useTaskStatusStore } from "@/stores/task_status.store";
import { useState } from "react";
import { useForm } from "react-hook-form";

const ConfigPage = () => {
  const { openDialog } = useDialogStore();
  const { addStatus, statuses, hydrated, updateStatus } = useTaskStatusStore();
  const [selectedStatus, setSelectedStatus] = useState<any>();

  const handleAddOpenDialog = () => {
    openDialog({
      title: `Add Dialog`,
      kind: "Add",
      array: [
        {
          name: "name",
          label: "Name",
          Component: TextField,
        },
        {
          name: "color",
          label: "Color",
          Component: TextField,
          type: "color",
        },
      ],
      actions: {
        Add: addStatus,
      },
    });
  };

  const handleEditOpenDialog = () => {
    openDialog({
      title: `Edit Dialog`,
      kind: "Edit",
      array: [
        {
          name: "name",
          label: "Name",
          Component: TextField,
        },
        {
          name: "color",
          label: "Color",
          Component: TextField,
          type: "color",
        },
      ],
      actions: {
        Edit: updateStatus,
      },
      defaultValues: selectedStatus,
    });
  };
  console.log(selectedStatus);

  return (
    <div>
      <Title title="Configuration" />

      <button className="btn btn-primary m-10" onClick={handleAddOpenDialog}>
        Open Add
      </button>

      <button
        className="btn btn-primary m-10"
        onClick={handleEditOpenDialog}
        disabled={!selectedStatus}
      >
        Open Edit
      </button>

      <div>
        {hydrated &&
          statuses.map((status) => (
            <div
              className="hover:bg-base1 cursor-pointer"
              onClick={() => {
                setSelectedStatus(status);
              }}
              key={`${status.id}/${status.name}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className={`text-2xl ${status.color}`}>
                    
                    <Icon alt="" src={status.icon?? "/icons/icon-192x192.png"} />
                  </span>
                  <span>{status.name}</span>
                </div>
                <span
                  style={{ color: status.color ?? "var(--color-foreground)" }}
                  className="border-2 border-muted"
                >
                  {status.color ?? "default"}
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ConfigPage;
