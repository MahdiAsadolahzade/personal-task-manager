"use client";
import Icon from "../utils/Icon";
import { motion } from "framer-motion";
import Link from "next/link";

const AboutProject = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl mx-auto p-6 md:p-8 rounded-xl bg-gradient-to-br from-base2 to-base3 shadow-lg max-h-[65vh] overflow-auto"
    >
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Profile Image */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="shrink-0"
        >
          <Icon
            alt="Mahdi Asadolahzade"
            src="/icons/profile.png"
            className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-primary/20"
          />
        </motion.div>

        {/* Content */}
        <div className="space-y-4 text-center md:text-left">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl md:text-3xl font-bold text-primary"
          >
            About the Creator
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-foreground/90"
          >
            {"Hello! I'm "}
            <span className="font-semibold text-primary">
              Mahdi Asadolahzade
            </span>
            , the developer behind this project. I build interactive web
            applications with modern technologies like Next.js, React, and
            Tailwind CSS.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="pt-2"
          >
            <Link
              href="https://mahdiasadolahzade.ir"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors"
            >
              <span>Visit My Portfolio</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Project Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-8 pt-6 border-t border-base4"
      >
        <h3 className="text-lg font-semibold text-primary mb-3">
          About This Project
        </h3>
        <p className="text-foreground/80">
          This task management application was built with Next.js, TypeScript,
          Tailwind CSS, and Framer Motion. It features responsive design, smooth
          animations, and efficient state management.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default AboutProject;
