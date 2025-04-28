"use client";
import { useAppStore } from "@/stores/app.store";
import { useEffect } from "react";
import { CiLight, CiDark } from "react-icons/ci";
import { motion } from "framer-motion";


const ThemeToggle = () => {
  const { theme, setTheme, toggleTheme } = useAppStore();
  const handleToggleTheme = () => {
    toggleTheme();
    setTheme(theme === "dark" ? "light" : "dark");
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme === "dark" ? "light" : "dark");
    }
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div>
      <div className="" onClick={handleToggleTheme}>
        <motion.div
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-base2 shadow-md cursor-pointer"
        >
          {theme === "dark" ? (
            <CiLight className="w-6 h-6 text-yellow-500" />
          ) : (
            <CiDark className="w-6 h-6 text-gray-700" />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ThemeToggle;
