import { Task } from "@/types/task.type";
import { FC, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { convertToStandardDateWithTime } from "@/lib/utils/dateConverts";
import { findStatus } from "@/lib/utils/finders";
import { shortenText } from "@/lib/utils/strings";
import { useAppStore } from "@/stores/app.store";
import PriorityBadge from "../sections/PriorityBadge";
import StatusBadge from "../sections/StatusBadge";

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
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
              (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            if (days > 30) {
              const months = Math.floor(days / 30);
              const remainingDays = days % 30;
              newTimeRemaining[task.id] = isMobile
                ? `${months}m ${remainingDays}d`
                : `${months}m ${remainingDays}d ${hours}h`;
            } else if (days > 0) {
              newTimeRemaining[task.id] = isMobile
                ? `${days}d ${hours}h`
                : `${days}d ${hours}h ${minutes}m`;
            } else {
              newTimeRemaining[task.id] = isMobile
                ? `${hours}h ${minutes}m`
                : `${hours}h ${minutes}m ${seconds}s`;
            }
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
                  findStatus(task?.status ?? "")?.name !== "Completed" &&
                  findStatus(task?.status ?? "")?.name !== "Archived" && (
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
              <StatusBadge status={task.status} />

              <PriorityBadge priority={task?.priority ?? ""} />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TaskShow;
