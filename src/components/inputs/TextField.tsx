"use client";
import { FC, useId } from "react";
import type { TextFieldProps } from "@/types/inputs.type";

const TextField: FC<TextFieldProps> = ({
  type = "text",
  label,
  register,
  name,
  errors,
  defaultValue
}) => {
  const inputUniqueID = useId();
  return (
    <div className="w-full">
      <label htmlFor={inputUniqueID} className="label">
        {label}
      </label>
      <div className="w-full">
        <input
          autoComplete="off"
          value={defaultValue}
          id={inputUniqueID}
          {...register(name, {
            setValueAs: (value) =>
              type === "number" ? parseFloat(value) : value,
          })}
          className="input"
          type={type}
          name={name}
        />
      </div>
      {errors && errors[name] && (
        <p className="mt-1 text-sm text-error">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default TextField;
