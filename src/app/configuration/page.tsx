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
import { TDialogConfig, TDialogKind } from "@/types/dialog.type";

const ConfigPage = () => {
  const { openDialog } = useDialogStore();
  const { addStatus, statuses, updateStatus, deleteStatus } =
    useTaskStatusStore();
  const { icons ,addIcon } = useIconStore();
  const [selectedStatus, setSelectedStatus] = useState<any>();
  const [selectedIcon, setSelectedIcon] = useState<any>();


  const dialogConfig: TDialogConfig = {
    status: {
      Add: {
        title: "Add Status",
        array: [
          { name: "name", label: "Name", Component: TextField },
          {
            name: "color",
            label: "Color",
            Component: TextField,
            type: "color",
          },
          {
            name: "icon",
            label: "Icon",
            Component: AutoComplete,
            suggestions: icons?.map((icon) => ({ id: icon.id, name: icon.name??'' }))
          },
        ],
        actions: { Add: addStatus },
        kind: "Add",
      },
      Edit: {
        title: "Edit Status",
        array: [
          { name: "name", label: "Name", Component: TextField },
          {
            name: "color",
            label: "Color",
            Component: TextField,
            type: "color",
          },
        ],
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

    icon:{
      Add:{
        title: "Add Icon",
        array: [
          { name: "name", label: "Name", Component: TextField },
          {
            name: "src",
            label: "Icon Source",
            Component: FileUploadField,
          },
        ],
        actions: { Add: addIcon }, 
        kind: "Add",
      }
    }
  };

  const handleOpenDialog = (url: `${TDialogKind}/${string}`) => {
    const [kind, entity] = url.split("/") as [TDialogKind, string];
    const config = dialogConfig[entity][kind];
    if (config) {
      openDialog(config);
    }
  };

  return (
    <div>
      <Title title="Configuration" />

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
        configuration={{showIcon:false ,showColor:true}}
      />

      <Card
        title="Icons"
        data={icons}
        actions={{
          Add: () => handleOpenDialog("Add/icon"),
          Edit: () => handleOpenDialog("Edit/status"),
          Delete: () => handleOpenDialog("Delete/status"),
        }}
        setSelectedValue={setSelectedIcon}
        selectedValue={selectedIcon}
        laoding={!useIconStore().hydrated}
        configuration={{showIcon:true ,iconKey:'src' ,showColor:false}}
      />

      {/* <Icon alt="" src={icons?.[0]?.src ?? "/icons/icon-192x192.png"} /> */}
    </div>
  );
};

export default ConfigPage;
