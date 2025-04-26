// src/hooks/useScreenSizeDetector.ts
import { useEffect } from "react";
import { useAppStore } from "@/stores/app.store";

export const useScreenSizeDetector = () => {
  const setIsMobile = useAppStore((s) => s.setIsMobile);
  const setIsTablet = useAppStore((s) => s.setIsTablet);
  const setIsDesktop = useAppStore((s) => s.setIsDesktop);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 640); // Tailwind sm
      setIsTablet(width > 640 && width <= 1024); // Tailwind md to lg
      setIsDesktop(width > 1024); // Tailwind xl+
    };

    handleResize(); // run on mount
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [setIsMobile, setIsTablet, setIsDesktop]);
};
