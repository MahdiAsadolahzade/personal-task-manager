import { Component, ComponentType, HTMLInputTypeAttribute } from "react";
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
  multiSelect?:boolean
};

export type TDialogContent = {
  title: string;
  kind: TDialogKind;
  message?: string;
  array?: TFieldArray[];

  actions?: TDialogActions;
  defaultValues?: any;
};
export type TDialogActions = Partial<Record<TDialogKind, Function>>;

export type TDialogConfig = {
  [key in string]: Partial<{ [key in TDialogKind]: TDialogContent }>;
};
