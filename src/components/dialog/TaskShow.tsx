import { Task } from "@/types/task.type";
import { FC, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { convertToStandardDateWithTime } from "@/lib/utils/dateConverts";
import Icon from "../utils/Icon";
import { findIcon, findStatus } from "@/lib/utils/finders";
import { shortenText } from "@/lib/utils/strings";
import { findPriority } from "@/mock/priority.data";
import { FiBell } from "react-icons/fi";
import { useAppStore } from "@/stores/app.store";
import clsx from "clsx";

interface TaskShowProps {
  tasks: Task[];
}

const TaskShow: FC<TaskShowProps> = ({ tasks }) => {
  const { isMobile } = useAppStore();
  const [timeRemaining, setTimeRemaining] = useState<Record<string, string>>(
    {}
  );

  useEffect(() => {
    if (tasks.length === 0) return;

    const interval = setInterval(() => {
      const newTimeRemaining: Record<string, string> = {};

      tasks.forEach((task) => {
        if (task.dueDate) {
          const dueDate = new Date(task.dueDate);
          const now = new Date();
          const diff = dueDate.getTime() - now.getTime();

          if (diff > 0) {
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            // Mobile shows shorter format
            newTimeRemaining[task.id] = isMobile
              ? `${hours}h ${minutes}m`
              : `${hours}h ${minutes}m ${seconds}s`;
          } else {
            newTimeRemaining[task.id] = "Overdue!";
          }
        }
      });

      setTimeRemaining(newTimeRemaining);
    }, 1000);

    return () => clearInterval(interval);
  }, [tasks, isMobile]);

 

  return (
    <div>
      <h2
        className={`${
          isMobile ? "text-xl" : "text-2xl"
        } font-bold text-primary mb-4`}
      >
        This Day Tasks
      </h2>
      <div className="space-y-3 max-h-[60vh] overflow-auto">
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex ${
              isMobile ? "flex-col" : "items-center justify-between p-6"
            } p-3 bg-base1 rounded-lg shadow-sm hover:shadow-md`}
          >
            <div className="flex-1">
              <div
                className={`flex ${
                  isMobile
                    ? "flex-col"
                    : " flex-col justify-between items-start"
                }`}
              >
                <h3
                  className={`${
                    isMobile ? "text-md" : "text-lg"
                  } font-semibold text-accent`}
                >
                  {task.title}
                </h3>

                {task.dueDate &&
                  findStatus(task?.status ?? "")?.name !== "COMPLETED" &&
                  findStatus(task?.status ?? "")?.name !== "ARCHIVED" && (
                    <span
                      className={`text-xs px-2 py-1 rounded-md ${
                        timeRemaining[task.id] === "Overdue!"
                          ? "bg-error/20 text-error font-bold"
                          : "bg-primary/20 text-primary"
                      } ${isMobile ? "mt-1 self-start" : "self-start"}`}
                    >
                      {timeRemaining[task.id] || "Calculating..."}
                    </span>
                  )}
              </div>

              {task.description && (
                <p className={`${isMobile ? "text-xs" : "text-sm"}  mt-1`}>
                  {shortenText(task.description, isMobile ? 60 : 100)}
                </p>
              )}

              <p className={`${isMobile ? "text-xxs" : "text-xs"}  mt-1`}>
                Due: {convertToStandardDateWithTime(task.dueDate ?? "")}
              </p>
            </div>

            <div
              className={`flex ${
                isMobile
                  ? "flex-wrap gap-2 mt-2"
                  : "items-center space-x-2 ml-4"
              }`}
            >
              <div
                className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  isMobile ? "mt-1" : ""
                }`}
                style={{
                  backgroundColor: `${findStatus(task.status)?.color}20`,
                  color: findStatus(task.status)?.color,
                }}
              >
                <Icon
                  alt={task.status}
                  src={
                    findIcon(findStatus(task?.status ?? "")?.icon ?? "")?.src ||
                    ""
                  }
                  className={clsx(
                    `mr-1 `,
                    `text-[${findStatus(task?.status ?? "")?.color}]`
                  )}
                />
                {shortenText(
                  findStatus(task.status)?.name || "",
                  isMobile ? 10 : 15
                )}
              </div>

              {task.priority && (
                <div
                  className={`flex items-center ${
                    isMobile ? "gap-1" : "space-x-2"
                  }`}
                >
                  <span
                    className={`flex items-center text-xs px-2 py-1 rounded-full font-medium ${
                      task.priority === "3"
                        ? "bg-error/20 text-error"
                        : task.priority === "2"
                        ? "bg-warning/20 text-warning"
                        : "bg-success/20 text-success"
                    }`}
                  >
                    {isMobile
                      ? findPriority(task.priority)?.name
                      : findPriority(task.priority)?.name}
                  </span>
                  {task.priority === "3" && (
                    <span className="text-error animate-pulse">
                      <FiBell size={isMobile ? 14 : 16} />
                    </span>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TaskShow;
