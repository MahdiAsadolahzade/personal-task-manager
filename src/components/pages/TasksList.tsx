import { Task } from "@/app/tasks/page";
import React from "react";
import { motion } from "framer-motion";
import Icon from "../utils/Icon";
import { findIcon, findStatus } from "@/lib/utils/finders";

const TasksList = ({
  data,
  selectedValue,
  setSelectedValue,
}: {
  data: Task[];
  selectedValue: any;
  setSelectedValue: any;
}) => {
  return (
    <div className="tasks-list-container p-4">
      <div className="tasks-list grid grid-cols-2">
        {data.map((task) => (
          <motion.div
            key={task.id}
            className="task-card col-span-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedValue(task)}
          >
            <h3 className="task-title">{task.title}</h3>
            <p className="task-description">
              {task.description || "No description"}
            </p>
            <span className={`task-status ${task.status.toLowerCase()}`}>
              {task.status}

              <div className="p-1 rounded-full bg-foreground/50 w-fit" style={{backgroundColor: findStatus(task.status)?.color}}>
                <Icon
                  alt=""
                  src={
                    findIcon(findStatus(task.status)?.icon!)?.src ||
                    "/default-icon-path.svg"
                  }
                />
              </div>
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TasksList;
