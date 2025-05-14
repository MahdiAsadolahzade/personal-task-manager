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
  setValue
}) => {
  const checkboxId = useId();
  const watchedValue = useWatch({ name, control });

  useEffect(() => {
    if (watchedValue === undefined || watchedValue === null) {
      // Clear or reset logic for the first time
   if(setValue){
    setValue(name, defaultChecked);
   }
    
    }
  }, [watchedValue, control, name, defaultChecked]);

  return (
    <div className={`flex items-center ${className}`}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultChecked}
        render={({ field: { onChange, value, ref } }) => (
          <div className="w-full flex-col">
            <input
              id={checkboxId}
              type="checkbox"
              ref={ref}
              checked={value}
              onChange={(e) => onChange(e.target.checked)}
              disabled={disabled}
              className={`input  ${errors?.[name] ? "checkbox-error" : ""}`}
            />
            {label && (
              <label htmlFor={checkboxId} className="label ml-2 cursor-pointer">
                {label}
              </label>
            )}
          </div>
        )}
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
