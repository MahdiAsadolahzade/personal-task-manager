import { Component, ComponentType, HTMLInputTypeAttribute } from "react";
import { AutoCompleteOption } from "./inputs.type";

export type TDialogKind =
  | "Add"
  | "Edit"
  | "Delete"
  | "Info"
  | "Confirm"
  | "Custom";

export type TMethod = 'POST' | 'PUT' | 'DELETE' | 'GET';

export type TDialogContent = {
  title: string;
  kind: TDialogKind;
message?:string
  array?: {
    name: string;
    label?:string
    Component: ComponentType<any>;
    type?: HTMLInputTypeAttribute
    suggestions?:AutoCompleteOption[]
  }[];
  actions?: TDialogActions;
  defaultValues?:any
};
export type TDialogActions = Partial<Record<TDialogKind, Function>>;