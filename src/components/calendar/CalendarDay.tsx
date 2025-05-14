import { useDialogStore } from "@/stores/dialog.store";
import { Task } from "@/types/task.type";
import clsx from "clsx";
import { format } from "date-fns";
import { isToday } from "date-fns";
import React from "react";
import { FC } from "react";
import TaskShow from "../dialog/TaskShow";
import { findPriority } from "@/mock/priority.data";

interface CalendarDayProps {
  date: Date;
  isCurrentMonth: boolean;
  tasks: Task[];
  isMobile: boolean;
  onClick?: (date: Date) => void;
}

const CalendarDay: FC<CalendarDayProps> = React.memo(
  ({ date, isCurrentMonth, tasks, isMobile }) => {
    const { openDialog } = useDialogStore();
    const maxVisibleTasks = isMobile ? 1 : 2;
    const daySize = isMobile ? "min-h-[40px]" : "min-h-[80px]";
    const padding = isMobile ? "p-0.5 m-0.5" : "p-1.5 m-1";

    const handleClick = () => {
      openDialog({
        kind: "Info",
        title: `${date?.toLocaleDateString()}`,
        customContnet: { tasks: tasks },
        CustomComponent: TaskShow,
      });
    };

    return (
      <div
        onClick={handleClick}
        className={clsx(
          "border rounded flex flex-col transition duration-150 relative",
          daySize,
          padding,
          !isCurrentMonth && "bg-base2 opacity-80",
          isToday(date) && "border-accent ring-1 ring-accent",
          "hover:bg-muted active:scale-[0.98] cursor-pointer",
          isMobile && "text-center" // Center content on mobile
        )}
      >
        {isMobile && tasks.length > 0 && (
          <div className="absolute -top-1 -left-1 bg-accent text-foreground rounded-full w-4 h-4 flex items-center justify-center text-[0.6rem]">
            {tasks.length}
          </div>
        )}
        <div
          className={clsx(
            "font-medium self-end", // Position day number at top-right
            isMobile ? "text-[0.7rem] mb-1" : "text-xs sm:text-sm"
          )}
        >
          {format(date, "d")}
        </div>

        <div
          className={clsx(
            `flex flex-col gap-0.5 flex-grow justify-end`,
            isMobile && "justify-center"
          )}
        >
          {tasks.slice(0, maxVisibleTasks).map((task) => (
            <div
              key={task.id}
              className={clsx(
                "truncate rounded px-1 py-0.5",
                `bg-${findPriority(task?.priority ?? "")?.color}/20`,
                `text-${findPriority(task?.priority ?? "")?.color}`,
                isMobile ? "text-[0.6rem]" : "text-[0.65rem] sm:text-xs"
              )}
              title={`${task.title} (${
                task.priority ? findPriority(task.priority)?.name : ""
              })`}
            >
              {!isMobile && task.title}
            </div>
          ))}

          {tasks.length > maxVisibleTasks && !isMobile && (
            <div
              className={clsx(
                "text-muted-foreground",
                "text-[0.65rem] sm:text-xs"
              )}
            >
              +{tasks.length - maxVisibleTasks} more
            </div>
          )}
        </div>
      </div>
    );
  }
);

CalendarDay.displayName = "CalendarDay";

export default CalendarDay;
