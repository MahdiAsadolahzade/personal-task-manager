import { HTMLInputTypeAttribute } from "react";
import {
  Control,
  UseFormGetValues,
  UseFormRegister,
  FieldErrors,
  SetFieldValue,
} from "react-hook-form";
import { TDialogKind } from "./dialog.type";

export interface TextFieldProps {
  type?: HTMLInputTypeAttribute;
  label: string;
  placeholder?:string
  register: UseFormRegister<any>;
  getValues?: UseFormGetValues<any>;
  name: string;
  errorMessage?: string;
  errors?: FieldErrors;
  variant?: "defult" | "description";
  rangeConfiguration?: { min?: number; max?: number; step?: number };
  defaultValue?:string

}

export interface AutoCompleteOption {
  id: string|number;
  name: string;
  src?: string;
}

export interface AutoCompleteProps {
  label: string;
  name: string;
  register: UseFormRegister<any>; // Adjust this type based on your form library
  errors: FieldErrors;
  setValue: SetFieldValue<any>;
  getValues: UseFormGetValues<any>;
  suggestions: AutoCompleteOption[];
  control: Control;
  multiSelect?: boolean;
  suggestKey?: string;
}

export interface CheckboxProps {
  name: string;
  label?: string;
  control?: Control<any>;
  errors?: FieldErrors;
  disabled?: boolean;
  defaultChecked?: boolean;
  className?: string;
  kind?: TDialogKind;
  register: UseFormRegister<any>;
  setValue?: SetFieldValue<any>;
}

export interface FileUploadProps {
  name: string;
  label: string;
  control: Control;
  errors: FieldErrors;
  accept?: string;
  kind?: TDialogKind;
}
