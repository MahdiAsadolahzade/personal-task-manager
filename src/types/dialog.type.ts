import { Component, ComponentType, HTMLInputTypeAttribute } from "react";

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
  kind?: TDialogKind;

  array?: {
    name: string;
    label?:string
    Component: ComponentType<any>;
    type?: HTMLInputTypeAttribute
  }[];
  actions?: TDialogActions;
  defaultValues?:any
};
export type TDialogActions = Partial<Record<TDialogKind, Function>>;