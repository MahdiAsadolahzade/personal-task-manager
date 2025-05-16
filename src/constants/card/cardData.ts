import { TDialogKind } from "@/types/dialog.type";

export const CardHeaderIcon: Record<TDialogKind, { Icon: string }> = {
  Add: {
    Icon: "/icons/add.svg",
  },
  Edit: {
    Icon: "/icons/edit.svg",
  },
  Delete: {
    Icon: "/icons/delete.svg",
  },
  Info: {
    Icon: "/icons/info.svg",
  },
  Confirm: {
    Icon: "/icons/confirm.svg",
  },
  Custom: {
    Icon: "/icons/custom.svg",
  },
};
