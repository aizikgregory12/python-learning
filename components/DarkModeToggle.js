import { useState, useEffect } from "react";

export default function DarkModeToggle({ onThemeChange }) {
  const [theme, setTheme] = useState(null); // Start with null to prevent SSR mismatch

  useEffect(() => {
    // Ensure this runs only on the client
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
    onThemeChange(savedTheme);
  }, [onThemeChange]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    onThemeChange(newTheme);
  };

  if (theme === null) return null; // Prevent rendering until the theme is set

  return (
    <button
      onClick={toggleTheme}
      className="absolute top-6 right-6 p-3 rounded-full bg-gray-700 text-white dark:bg-gray-300 dark:text-black transition"
    >
      {theme === "dark" ? "🌞" : "🌙"}
    </button>
  );
}
