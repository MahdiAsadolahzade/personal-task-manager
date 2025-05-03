import { TDialogKind } from "@/types/dialog.type";
import { IconType } from "react-icons";

  import { IoIosAddCircle } from "react-icons/io";
  import { RiEditCircleFill } from "react-icons/ri";
  import { RiDeleteBin2Fill } from "react-icons/ri";
  import { IoInformationCircle } from "react-icons/io5";
  import { GiConfirmed } from "react-icons/gi";
  import { SiCustomink } from "react-icons/si";

export const CardHeaderIcon: Record<
  TDialogKind,
  { Icon: IconType; }
> = {
  Add: {
    Icon: IoIosAddCircle,
  
  },
  Edit: {
    Icon: RiEditCircleFill,

  },
  Delete: {
    Icon: RiDeleteBin2Fill,
   
  },
  Info: {
    Icon: IoInformationCircle,

  },
  Confirm: {
    Icon: GiConfirmed,
  
  },
  Custom: {
    Icon: SiCustomink,
 
  },
};
