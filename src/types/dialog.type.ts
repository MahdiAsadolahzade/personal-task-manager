export type TDialogKind =
  | "Add"
  | "Edit"
  | "Delete"
  | "Info"
  | "Confirm"
  | "Custom";

export type TDialogContent = {
  title: string;
  kind: TDialogKind;
 
};
 