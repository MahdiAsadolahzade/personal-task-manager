import { ComponentType, HTMLInputTypeAttribute } from "react";
import { AutoCompleteOption } from "./inputs.type";

export type TDialogKind =
  | "Add"
  | "Edit"
  | "Delete"
  | "Info"
  | "Confirm"
  | "Custom";

export type TMethod = "POST" | "PUT" | "DELETE" | "GET";

export type TFieldArray = {
  name: string;
  label?: string;
  Component: ComponentType<any>;
  type?: HTMLInputTypeAttribute;
  suggestions?: AutoCompleteOption[];
  suggestionKey?: keyof AutoCompleteOption;
  multiSelect?: boolean;
  show?:(form:any)=>boolean
};

export type TDialogContent = {
  title: string;
  kind: TDialogKind;
  message?: string;
  array?: TFieldArray[];
  schema?: any;
  CustomComponent?: any;
  customContnet?: { [key in string]: any };
  customConfig?: { buttonTitle?:string ,headerIcon?:string , headerIconColor?:string };
  actions?: TDialogActions;
  defaultValues?: any;
};
export type TDialogActions = Partial<Record<TDialogKind, any>>;

export type TDialogConfig = {
  [key in string]: Partial<{ [key in TDialogKind]: TDialogContent }>;
};
