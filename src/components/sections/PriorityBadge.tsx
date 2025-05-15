import { findPriority } from "@/mock/priority.data";
import { FC } from "react";
import { motion } from "framer-motion";
import Icon from "../utils/Icon";

interface PriorityBadgeProps {
  priority: string;
}

const PriorityBadge: FC<PriorityBadgeProps> = ({ priority }) => {
  const priorityData = findPriority(priority);
  const priorityStyle = (id: string) => {
    switch (id) {
      case "1":
        return "text-primary bg-primary/20";
      case "2":
        return "text-accent bg-accent/20";
      case "3":
        return "text-error bg-error/20";
      default:
        return "text-gray-500 bg-gray-100";
    }
  };
  if (!priorityData) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex items-center space-x-2"
    >
      <span
        className={`flex items-center text-xs px-3 py-1 rounded-full font-medium transition-all duration-200  ${priorityStyle(
          priorityData?.id
        )}`}
      >
        <Icon alt="" src={priorityData?.icon} />
      </span>
    </motion.div>
  );
};

export default PriorityBadge;
