import { FC } from "react";
import { motion } from "framer-motion";
import Icon from "../utils/Icon";
import { findIcon, findType } from "@/lib/utils/finders";
import { shortenText } from "@/lib/utils/strings";

interface TypeBadgeProps {
    type: string;
}

const TypeBadge: FC<TypeBadgeProps> = ({ type }) => {
    const typeData = findType(type);

    return (
        <div>
            {type && (
                <motion.div
                    className="flex items-center px-3 py-1 rounded-full text-xs font-medium"
                    style={{
                        backgroundColor: `${typeData?.color}20`,
                        color: typeData?.color,
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <Icon
                        alt={type}
                        src={findIcon(typeData?.icon ?? "")?.src || ""}
                        className="mr-1"
                    />
                    {shortenText(typeData?.name || "", 15)}
                </motion.div>
            )}
        </div>
    );
};

export default TypeBadge;
