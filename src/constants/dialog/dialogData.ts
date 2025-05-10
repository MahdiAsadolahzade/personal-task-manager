import { TDialogKind } from "@/types/dialog.type";
import {  IconType } from "react-icons";
import type { TAppColors } from "@/lib/config";
import { IoIosAddCircle } from "react-icons/io";
import { RiEditCircleFill } from "react-icons/ri";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { IoInformationCircle } from "react-icons/io5";
import { GiConfirmed } from "react-icons/gi";
import { SiCustomink } from "react-icons/si";

export const dialogHeaderIcon: Record<
  TDialogKind,
  { Icon: IconType; color?: `text-${TAppColors}` }
> = {
  Add: {
    Icon: IoIosAddCircle,
    color: "text-primary",
  },
  Edit: {
    Icon: RiEditCircleFill,
    color:'text-info'
  },
  Delete: {
    Icon: RiDeleteBin2Fill,
    color:'text-error'
  },
  Info: {
    Icon: IoInformationCircle,
    color:'text-accent'
  },
  Confirm: {
    Icon: GiConfirmed,
    color:'text-secondary'
  },
  Custom: {
    Icon: SiCustomink,
    color:'text-primary'
  },
};
