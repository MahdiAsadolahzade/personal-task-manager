import { FC, useId, useState } from "react";
import type { TextFieldProps } from "@/types/inputs.type";
import { getNestedError } from "@/lib/utils/fieldErrors";

const TextField: FC<TextFieldProps> = ({
  type = "text",
  label,
  register,
  name,
  errors,
  rangeConfiguration,
  defaultValue,
  getValues,
}) => {
  const inputUniqueID = useId();

  // Optional: local state for range display
  const [rangeValue, setRangeValue] = useState<number | string>(
    !!getValues ? getValues(name) : rangeConfiguration?.min || 0
  );

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRangeValue(e.target.value);
  };

  return (
    <div className="w-full">
      <label htmlFor={inputUniqueID} className="label">
        {label}
        {type === "range" && (
          <span className="ml-2 text-sm text-primary">{rangeValue}</span>
        )}
      </label>

      <div className="w-full">
        <input
          autoComplete="off"
          id={inputUniqueID}
          {...register(name, {
            setValueAs: (value) => {
              if (type === "number" || type === "range")
                return value === "" ? undefined : Number(value);
              if (type === "date") return value || undefined;
              return value;
            },
          })}
          onChange={type === "range" ? handleRangeChange : undefined}
          className={`input ${getNestedError(errors, name) && "input-error"}`}
          type={type}
          name={name}
          min={rangeConfiguration?.min || 0}
          max={rangeConfiguration?.max || 100}
          step={rangeConfiguration?.step || 1}
          defaultValue={defaultValue}
        />
      </div>

      {getNestedError(errors, name) && (
        <p className="mt-1 text-sm text-error">
          {getNestedError(errors, name)?.message as string}
        </p>
      )}
    </div>
  );
};

export default TextField;
