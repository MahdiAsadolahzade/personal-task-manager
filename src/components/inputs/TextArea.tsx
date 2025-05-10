"use client";
import { FC, useId } from "react";
import type { TextFieldProps } from "@/types/inputs.type";

const TextArea: FC<Omit<TextFieldProps, "type">> = ({
  label,
  name,
  errors,
  register,
}) => {
  const inputUniqueID = useId();
  return (
    <div className="w-full ">
      <label htmlFor={inputUniqueID} className="label">
        {label}
      </label>
      <textarea
        autoComplete="off"
        id={inputUniqueID}
        {...register(name)}
        className="textarea  max-h-24 min-h-12"
        name={name}
      />
      {errors && errors[name] && (
        <p className="mt-1 text-sm text-error">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default TextArea;
