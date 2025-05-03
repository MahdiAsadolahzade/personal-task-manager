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

export interface TextFieldProps {
  type?: HTMLInputTypeAttribute;
  label: string;
  register: UseFormRegister<any>;
  name: string;
  errors?: FieldErrors;
  variant?: "defult" | "description";
}


export interface AutoCompleteOption {
  id: number;
  name: string;
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
}

export interface FileUploadProps {
  name:string
  label:string
  control:Control
  errors:FieldErrors
  accept?:string
}