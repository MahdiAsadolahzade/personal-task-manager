import AutoComplete from "@/components/inputs/AutoComplete";
import FileUploadField from "@/components/inputs/FileUploadField";
import TextField from "@/components/inputs/TextField";
import { useIconStore } from "@/stores/icons.store";
import { TFieldArray } from "@/types/dialog.type";

export const getIconsDialogsArray = (): TFieldArray[] => {
  return [
    { name: "name", label: "Name", Component: TextField },
    {
      name: "src",
      label: "Icon Source",
      Component: FileUploadField,
    },
  ];
};

export const getStatusesDialogsArray = (): TFieldArray[] => {
  const icons = useIconStore.getState().icons;
  return [
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
      suggestions: icons?.map((icon) => ({
        id: icon.id,
        name: icon.name ?? "",
        src: icon?.src,
      })),
      suggestionKey: "src",
    },
  ];
};

export const getTypesDialogsArray = (): TFieldArray[] => {
  const icons = useIconStore.getState().icons;
  return [
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
      suggestions: icons?.map((icon) => ({
        id: icon.id,
        name: icon.name ?? "",
        src: icon?.src,
      })),
      suggestionKey: "src",
    },
  ];
};

export const getNameFilterArray = (): TFieldArray[] => {
  return [{ name: "name", label: "Name", Component: TextField }];
};
