"use client";
import { IconType } from "react-icons";
import {
  CiSettings,
  CiHome,
  CiPen,
  CiDesktop,
  CiCircleChevLeft,
} from "react-icons/ci";
import { usePathname } from "next/navigation";
import { useAppStore } from "@/stores/app.store";
import { motion } from "framer-motion";
import Icon from "../utils/Icon";
import NavLink from "../NavLink";

interface NavItem {
  name: string;
  Icon?: IconType;
  href: string;
  isDisabled?: boolean;
  onClick?: () => void;
}

const navItems: NavItem[] = [
  { name: "Home", href: "/", Icon: CiHome },
  { name: "Tasks", href: "/tasks", Icon: CiPen },
  { name: "Config", href: "/configuration", Icon: CiDesktop },
  { name: "Settings", href: "/settings", Icon: CiSettings },
];

const Header = () => {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;
  const { isMobile, isTablet } = useAppStore();

  // Check if we're on a task detail page
  const isTaskDetailPage =
    pathname.startsWith("/tasks/") && pathname !== "/tasks";

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 70 }}
      className="bg-base1 shadow-md"
    >
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Show back button on task detail pages */}
        {isTaskDetailPage ? (
          <div className="w-full flex items-center">
            <NavLink
              href={"/tasks"}
              className="flex items-center gap-2 text-primary"
            >
              <CiCircleChevLeft className="w-6 h-6" />
              {!isMobile && <span className="font-medium">Back to Tasks</span>}
            </NavLink>
          </div>
        ) : (
          <>
            {/* Desktop / Tablet Menu */}
            {!isMobile && (
              <>
                <h1 className="text-2xl font-bold flex justify-center items-center space-x-2 text-primary">
                  <Icon
                    src="/icons/Logo.svg"
                    alt="logo"
                    className={`w-8 h-8`}
                  />
                  {!isTablet && (
                    <span className="hidden md:block">Task Manager</span>
                  )}
                </h1>

                <ul className="flex space-x-6">
                  {navItems.map((item) => (
                    <motion.li
                      key={item.name}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <NavLink
                        href={item.href}
                        className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
                          isActive(item.href)
                            ? "bg-primary/10 text-primary"
                            : "text-foreground hover:text-primary"
                        }`}
                      >
                        {item.Icon && <item.Icon className="w-5 h-5" />}
                        <span className="font-medium">{item.name}</span>
                      </NavLink>
                    </motion.li>
                  ))}
                </ul>
              </>
            )}

            {/* Mobile Menu (Simple version) */}
            {isMobile && (
              <div className="w-full flex justify-between space-x-4">
                {navItems.map((item) => (
                  <motion.div
                    key={item.name}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <NavLink href={item.href}>
                      {item.Icon && (
                        <item.Icon
                          className={`w-6 h-6 ${
                            isActive(item.href)
                              ? "text-primary"
                              : "text-foreground hover:text-primary"
                          }`}
                        />
                      )}
                    </NavLink>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </motion.nav>
  );
};

export default Header;
