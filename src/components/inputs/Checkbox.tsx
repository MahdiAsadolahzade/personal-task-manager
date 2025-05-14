"use client";
import { FC, useEffect, useId } from "react";
import { Controller, useWatch } from "react-hook-form";
import type { CheckboxProps } from "@/types/inputs.type";

const Checkbox: FC<CheckboxProps> = ({
  name,
  label,
  control,
  errors,
  disabled = false,
  defaultChecked = false,
  className = "",
  kind, // Add kind prop to distinguish between Add/Edit modes
}) => {
  const checkboxId = useId();
  const watchedValue = useWatch({ name, control });

  return (
    <div className={`flex items-center ${className}`}>
      <Controller
        name={name}
        control={control}
        defaultValue={kind === "Add" ? false : defaultChecked} // Default to false in Add mode
        render={({ field: { onChange, value, ref } }) => {
          // Ensure the field is properly initialized
          useEffect(() => {
            if (watchedValue === undefined && kind === "Add") {
              onChange(false); // Explicitly set to false in Add mode if no value exists
            }
          }, [kind, watchedValue, onChange]);

          return (
            <div className="w-full flex-col">
              <input
                id={checkboxId}
                type="checkbox"
                ref={ref}
                checked={value || false} // Fallback to false if undefined
                onChange={(e) => onChange(e.target.checked)}
                disabled={disabled}
                className={`input ${errors?.[name] ? "checkbox-error" : ""}`}
              />
              {label && (
                <label htmlFor={checkboxId} className="label ml-2 cursor-pointer">
                  {label}
                </label>
              )}
            </div>
          );
        }}
      />
      {errors && errors[name] && (
        <p className="mt-1 text-sm text-error">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default Checkbox;