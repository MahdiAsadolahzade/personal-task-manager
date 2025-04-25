import { themeStatus } from "@/types/app.type";

export interface AppStoreModel {
  theme: themeStatus;
  setTheme: (theme: themeStatus) => void;
  toggleTheme: () => void;
  
  isMobile: boolean;
  setIsMobile: (isMobile: boolean) => void;
  isDesktop: boolean;
  setIsDesktop: (isDesktop: boolean) => void;
  isTablet: boolean;
  setIsTablet: (isTablet: boolean) => void;
}
