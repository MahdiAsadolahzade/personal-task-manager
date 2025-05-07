import { IconItem } from "@/types/icon.type";
import React from "react";
import Icon from "../utils/Icon";

const IconsList = ({
  data,
  selectedValue,
  setSelectedValue,
}: {
  data: IconItem[];
  selectedValue: any;
  setSelectedValue: any;
}) => {
  return (
    <div className="grid grid-cols-2  md:grid-cols-4 gap-4 p-4">
      {data?.map((icon) => (
        <div
          key={icon.name}
          className={`flex flex-col items-center justify-center p-2 border rounded-lg cursor-pointer hover:border-secondary ${
            selectedValue?.id === icon?.id
              ? "border-primary bg-base2"
              : "border-muted"
          }`}
          onClick={() => setSelectedValue(icon)}
        >
          <Icon alt={icon.name} src={icon.src} className="w-12 h-12" />
          <span className="mt-2 text-sm ">{icon.name}</span>
        </div>
      ))}
    </div>
  );
};

export default IconsList;
