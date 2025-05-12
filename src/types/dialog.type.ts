import {  ComponentType, HTMLInputTypeAttribute } from "react";
import { AutoCompleteOption } from "./inputs.type";
import { ZodObject } from "zod";

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
  multiSelect?:boolean
};

export type TDialogContent = {
  title: string;
  kind: TDialogKind;
  message?: string;
  array?: TFieldArray[];
  schema?:ZodObject<any>
CustomComponent?:any,
customContnet?:{[key in string]:any}
  actions?: TDialogActions;
  defaultValues?: any;
};
export type TDialogActions = Partial<Record<TDialogKind, any>>;

export type TDialogConfig = {
  [key in string]: Partial<{ [key in TDialogKind]: TDialogContent }>;
};
