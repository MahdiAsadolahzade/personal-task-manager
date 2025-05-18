import { CURRENT_UPDATE_NOTES } from "@/constants/version";
import { motion } from "framer-motion";


const UpdateNote = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6 bg-base1 shadow-lg rounded-lg max-w-md mx-auto mt-10"
        >
            <h2 className="text-2xl font-bold text-accent mb-4">
                v{CURRENT_UPDATE_NOTES.version}
            </h2>
            <ul className="list-disc list-inside space-y-2">
                {CURRENT_UPDATE_NOTES.notes.map((note, index) => (
                    <li key={index} className="">
                        {note}
                    </li>
                ))}
            </ul>
        </motion.div>
    );
};

export default UpdateNote
