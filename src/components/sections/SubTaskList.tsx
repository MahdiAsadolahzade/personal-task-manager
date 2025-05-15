"use client";
import React from "react";
import Icon from "../utils/Icon";
import { convertToStandardDateWithTime } from "@/lib/utils/dateConverts";
import { Task } from "@/types/task.type";
import StatusBadge from "./StatusBadge";
import PriorityBadge from "./PriorityBadge";

const SubTasksList = ({
  data,
  selectedValue,
  setSelectedValue,
}: {
  data: Task[];
  selectedValue?: any;
  setSelectedValue?: any;
}) => {
  return (
    <div className=" space-y-4 p-4 max-h-[60vh] overflow-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((task) => (
          <div
            key={task.id}
            onClick={() => {
              if (setSelectedValue) {
                setSelectedValue(task);
              }
            }}
            className={`relative rounded-xl p-5 shadow-sm transition-all duration-200 cursor-pointer 
              border border-muted hover:border-secondary hover:shadow-md
              ${
                selectedValue?.id === task.id
                  ? "ring-2 ring-primary bg-base2"
                  : "bg-background"
              }`}
          >
            {/* Task title with priority indicator */}
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-semibold line-clamp-1">
                {task.title}
              </h3>
              <PriorityBadge priority={task.priority ?? ""} />
            </div>

            {/* Task description */}
            <div className="h-20 max-h-20">
              <p className="text-sm mb-4 line-clamp-2">
                {task.description || "No description provided"}
              </p>
            </div>

            {/* Metadata row */}
            <div className="flex flex-wrap gap-2 mb-3">
              {/* Due date */}
              {task.dueDate && (
                <div className="flex items-center text-sm space-x-1">
                  <Icon src="/icons/calendar.svg" alt="Due date" />
                  <span>{convertToStandardDateWithTime(task.dueDate)}</span>
                </div>
              )}
            </div>

            {/* Status and type badges */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-muted">
              <div className="flex items-center space-x-2">
                {/* Status badge */}
                <StatusBadge status={task.status} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubTasksList;
