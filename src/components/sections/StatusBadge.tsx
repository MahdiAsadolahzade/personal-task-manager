import { findIcon, findStatus } from "@/lib/utils/finders";
import { shortenText } from "@/lib/utils/strings";
import { FC } from "react";
import { motion } from "framer-motion";
import Icon from "../utils/Icon";

interface StatusBadgeProps {
    status: string;
}

const StatusBadge: FC<StatusBadgeProps> = ({ status }) => {
    const statusData = findStatus(status);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className={`flex items-center px-3 py-1 rounded-full text-xs font-medium`}
            style={{
                backgroundColor: `${statusData?.color}20`,
                color: statusData?.color,
            }}
        >
            <Icon
                alt={status}
                src={findIcon(statusData?.icon ?? "")?.src || ""}
                className="mr-1"
            />
            {shortenText(statusData?.name || "", 15)}
        </motion.div>
    );
};

export default StatusBadge;
