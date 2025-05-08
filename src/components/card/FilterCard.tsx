"use client";
import { FC } from "react";
import TextField from "../inputs/TextField";
import { TFieldArray } from "@/types/dialog.type";
import { UseFormRegister, Control } from "react-hook-form";

interface FilterCardProps {
  fullData: any[];
  setFilteredData: (data: any[]) => void;
  onClose?: () => void;
  filterArray?: TFieldArray[];
  control: Control<any>;
  register: UseFormRegister<any>;
}

const FilterCard: FC<FilterCardProps> = ({
  fullData,
  setFilteredData,
  onClose,
  filterArray,
  control,
  register,
}) => {
  return (
    <div className="p-4 w-full max-h-64 overflow-auto  md:w-128 space-y-4">
      {filterArray?.map((item, index) => (
        <item.Component
          name={item.name}
          label={item?.label}
          type={item?.type}
          register={register}
          control={control}
          suggestions={item?.suggestions}
          suggestionKey={item?.suggestionKey}
          multiSelect={item?.multiSelect}
          key={`${item.name}/${index}`}
        />
      ))}
    </div>
  );
};

export default FilterCard;