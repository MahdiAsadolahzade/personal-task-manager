import { HTMLInputTypeAttribute } from "react";
import {
  Control,
  FieldValues,
  FormState,
  UseFormClearErrors,
  UseFormGetFieldState,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
  UseFormResetField,
  UseFormSetError,
  UseFormSetFocus,
  UseFormSetValue,
  UseFormTrigger,
  UseFormUnregister,
  UseFormWatch,
  FieldErrors,
  SetFieldValue,
} from "react-hook-form";
import { TDialogKind } from "./dialog.type";

export interface TextFieldProps {
  type?: HTMLInputTypeAttribute;
  label: string;
  register: UseFormRegister<any>;
  name: string;
  errors?: FieldErrors;
  variant?: "defult" | "description";
}


export interface AutoCompleteOption {
  id: string;
  name: string;
  src?:string
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
  suggestKey?:string
}

export interface CheckboxProps {
  name: string;
  label?: string;
  control?: Control<any>;
  errors?: FieldErrors;
  disabled?: boolean;
  defaultChecked?: boolean;
  className?: string;
}

export interface FileUploadProps {
  name:string
  label:string
  control:Control
  errors:FieldErrors
  accept?:string
  kind?:TDialogKind
}