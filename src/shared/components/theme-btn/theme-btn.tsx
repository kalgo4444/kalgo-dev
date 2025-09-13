import { MoonIcon, SunIcon } from "lucide-react";
import { memo, useEffect, useState } from "react";

const ThemeBtn = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme"));
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  if (theme === "dark") {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.removeItem("theme");
  }

  const toggleTheme = (): void => {
    setTheme((p) => (p === "dark" ? null : "dark"));
  };

  return (
    <button onClick={toggleTheme} className="btn p-2 fixed bottom-5 right-5">
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
};

export default memo(ThemeBtn);
