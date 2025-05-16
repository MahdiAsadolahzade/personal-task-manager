import { TDialogKind } from "@/types/dialog.type";
import type { TAppColors } from "@/lib/config";

export const dialogHeaderIcon: Record<
  TDialogKind,
  { Icon: string; color?: `text-${TAppColors}` }
> = {
  Add: {
    Icon: '/icons/add.svg',
    color: "text-primary",
  },
  Edit: {
    Icon: '/icons/edit.svg',
    color:'text-info'
  },
  Delete: {
    Icon: '/icons/delete.svg',
    color:'text-error'
  },
  Info: {
    Icon: '/icons/info.svg',
    color:'text-accent'
  },
  Confirm: {
    Icon: '/icons/confirm.svg',
    color:'text-secondary'
  },
  Custom: {
    Icon: '/icons/custom.svg',
    color:'text-primary'
  },
};
