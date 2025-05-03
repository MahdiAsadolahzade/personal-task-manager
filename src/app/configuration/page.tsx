// src/app/config/page.tsx
"use client";
import Card from "@/components/card/Card";
import AutoComplete from "@/components/inputs/AutoComplete";
import FileUploadField from "@/components/inputs/FileUploadField";
import TextField from "@/components/inputs/TextField";
import Title from "@/components/typography/Title";
import Icon from "@/components/utils/Icon";
import { useDialogStore } from "@/stores/dialog.store";
import { useIconStore } from "@/stores/icons.store";
import { useTaskStatusStore } from "@/stores/task_status.store";
import { useState } from "react";
import { useForm } from "react-hook-form";

const ConfigPage = () => {
  const { openDialog } = useDialogStore();
  const { addStatus, statuses, hydrated, updateStatus ,deleteStatus } = useTaskStatusStore();
  const { icons } = useIconStore();
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
        {
          name:'icon',
          label:"Icon",
          Component:AutoComplete,
          suggestions:[{id:1,name:'test'},{id:2,name:'test 2'},{id:3,name:'test 3'}]
        }
        ,
        {
          name:'test',
          label:"Test",
          Component:FileUploadField,
     
        }
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

  const handleDeleteOpenDialog = () => {
    openDialog({
      title: `Delete Dialog`,
      kind: "Delete",
     
      actions: {
        Delete: deleteStatus,
      },
      defaultValues: selectedStatus,
      message: `Are you sure you want to delete ${selectedStatus?.name} ?`,
    });
  };

  return (
    <div>
      <Title title="Configuration" />

      <Card
        title="Statuses"
        data={statuses}
        actions={{ Add: handleAddOpenDialog, Edit: handleEditOpenDialog ,Delete:handleDeleteOpenDialog }}
        setSelectedValue={setSelectedStatus}
        selectedValue={selectedStatus}
        laoding={!hydrated}
      />


      <Icon alt="" src={icons?.[0]?.src ?? "/icons/icon-192x192.png"} />
   
    </div>
  );
};

export default ConfigPage;
