import { useAppStore } from "@/stores/app.store";
import { useEffect } from "react";
import { CiLight, CiDark } from "react-icons/ci";

const ThemeToggle = () => {
  const { theme, setTheme, toggleTheme } = useAppStore();
  const handleToggleTheme = () => {
    toggleTheme();
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {

    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div>
      <button className="btn btn-outline" onClick={handleToggleTheme}>
        {theme === "dark" ? <CiLight /> : <CiDark />}
      </button>
    </div>
  );
};

export default ThemeToggle;
