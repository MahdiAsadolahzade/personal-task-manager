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
