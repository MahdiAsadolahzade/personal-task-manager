import { TDialogKind } from "@/types/dialog.type";
import { IconBaseProps, IconType } from "react-icons";
import type { TAppColors } from "@/lib/config";
import {
  CgAdd,
  CgEditFade,
  CgRemove,
  CgInfo,
  CgTikcode,
  CgSupport,
} from "react-icons/cg";

export const dialogHeaderIcon: Record<
  TDialogKind,
  { Icon: IconType; color?: `text-${TAppColors}` }
> = {
  Add: {
    Icon: CgAdd,
    color: "text-primary",
  },
  Edit: {
    Icon: CgEditFade,
    color:'text-info'
  },
  Delete: {
    Icon: CgRemove,
    color:'text-error'
  },
  Info: {
    Icon: CgInfo,
    color:'text-accent'
  },
  Confirm: {
    Icon: CgTikcode,
    color:'text-secondary'
  },
  Custom: {
    Icon: CgSupport,
    color:'text-primary'
  },
};
