"use client";
import { TDialogActions, TDialogKind, TFieldArray } from "@/types/dialog.type";
import { FC, MouseEventHandler, useEffect, useRef, useState } from "react";
import { CardHeaderIcon } from "@/constants/card/cardData";
import Icon from "../utils/Icon";
import Menu from "../menu/Menu";
import { BsFilterCircleFill } from "react-icons/bs";
import FilterCard from "./FilterCard";
import { useForm } from "react-hook-form";

interface CardProps {
  title: string;
  actions?: Partial<Record<TDialogKind, MouseEventHandler<HTMLButtonElement>>>;
  data: any[];
  selectedValue: any;
  setSelectedValue: Function;
  laoding?: boolean;
  configuration?: {
    showColor?: boolean;
  };
  CustomComponent?: any;
  filter?: {  filterArray?: TFieldArray[] };
}

const Card: FC<CardProps> = ({
  title,
  data,
  actions,
  setSelectedValue,
  selectedValue,
  laoding,
  configuration = { showColor: true },
  filter,
  CustomComponent,
}) => {
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const filterMenuEL = useRef<HTMLButtonElement>(null);
  const [filteredData, setFilteredData] = useState(data);
  const { control, register, watch, reset } = useForm();

  // Sync data with external changes
  useEffect(() => {
    setFilteredData(data);
    // Reset filters when data changes
    reset();
  }, [data, reset]);

  // Handle selection sync
  useEffect(() => {
    if (!selectedValue) return;
  
    const freshItem = filteredData.find((item) => item.id === selectedValue.id);
    if (!freshItem) {
      setSelectedValue(null);
    } else if (freshItem !== selectedValue) {
      setSelectedValue(freshItem);
    }
  }, [filteredData, selectedValue, setSelectedValue]);

  // Real-time filtering
  useEffect(() => {
    const subscription = watch((formValues) => {
      let filtered = [...data];
  
      if (!filter?.filterArray) return;
  
      for (const filterItem of filter.filterArray) {
        const { name } = filterItem;
        const filterValue = formValues[name];
  
        if (
          filterValue === undefined ||
          (typeof filterValue === "string" && filterValue.trim() === "") ||
          (Array.isArray(filterValue) && filterValue.length === 0)
        ) {
          continue;
        }
  
        filtered = filtered.filter((item) => {
          const itemValue = item[name];
  
          // Text field (string match)
          if (typeof filterValue === "string") {
            return itemValue?.toLowerCase().includes(filterValue.toLowerCase());
          }
  
          // AutoComplete (single object selection)
          if (typeof filterValue === "object" && !Array.isArray(filterValue) && filterValue?.id) {
            return itemValue?.id === filterValue.id;
          }
  
          // Multi-select (array of selected objects or IDs)
          if (Array.isArray(filterValue)) {
            const selectedIds = filterValue.map((val) => (typeof val === "object" ? val.id : val));
            return selectedIds.includes(itemValue?.id || itemValue);
          }
  
          return true;
        });
      }
  
      setFilteredData(filtered);
    });
  
    return () => subscription.unsubscribe();
  }, [watch, data, filter?.filterArray]);
  
  

  if (laoding) {
    return <div className="card bg-muted animate-pulse w-full h-64"></div>;
  }

  return (
    <div className="card">
      <h2 className="card-header flex justify-between items-center mb-4">
        <div>
          <p>{title}</p>
        </div>

        <div className="flex gap-2">
          {actions &&
            Object.entries(actions).map(([key, value]) => {
              const { Icon } = CardHeaderIcon[key as TDialogKind];
              return (
                <button
                  key={key}
                  className="btn btn-ghost btn-sm p-0"
                  onClick={value}
                  disabled={
                    (key === "Edit" || key === "Delete") &&
                    (!selectedValue || selectedValue?.length === 0)
                  }
                >
                  <Icon className="text-2xl" />
                </button>
              );
            })}
          {filter?.filterArray && (
            <button
              className="btn btn-ghost btn-sm p-0"
              ref={filterMenuEL}
              onClick={() => setOpenFilter((prev) => !prev)}
            >
              <BsFilterCircleFill className={`text-xl ${filteredData.length !== data.length ? 'text-primary' : ''}`} />
            </button>
          )}
        </div>
      </h2>

      <div className="space-y-2">
        {CustomComponent ? (
          <CustomComponent
            data={filteredData}
            setSelectedValue={setSelectedValue}
            selectedValue={selectedValue}
          />
        ) : (
          filteredData.map((item, index) => {
            const isSelected = selectedValue?.id === item?.id;

            return (
              <div
                className={`hover:bg-base2 hover:rounded-md p-2 cursor-pointer transition-colors ${
                  isSelected ? "border-[1px] border-primary rounded-md bg-base2" : ""
                }`}
                onClick={() => setSelectedValue(item)}
                key={`${item?.id}/${index}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span>{item.name}</span>
                  </div>
                  {!!item?.color && configuration.showColor && (
                    <span
                      style={{ backgroundColor: item?.color }}
                      className="w-5 h-5 rounded-full border-2 border-muted"
                    ></span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {filter?.filterArray && (
        <Menu
          anchorEl={filterMenuEL.current}
          onClose={() => setOpenFilter(false)}
          open={openFilter}
        >
          <FilterCard 
            fullData={data} 
            filterArray={filter?.filterArray}
            setFilteredData={setFilteredData}
            onClose={() => setOpenFilter(false)}
            // Pass form control props
            control={control}
            register={register}
          />
        </Menu>
      )}
    </div>
  );
};

export default Card;