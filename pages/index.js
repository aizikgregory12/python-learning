import { useState, useEffect } from "react";
import Link from "next/link";
import DarkModeToggle from "../components/DarkModeToggle";
import Roadmap from "../components/Roadmap";
import MapIcon from "../components/MapIcon";

export default function Home() {
  const [theme, setTheme] = useState(null); // Prevents hydration mismatch
  const [mapOpen, setMapOpen] = useState(false);
  const [buttonPosition, setButtonPosition] = useState(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
  }, []);

  if (theme === null) return null; // Prevents rendering until the theme is ready

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center transition-all relative ${
      theme === "light" ? "bg-gray-100 text-black" : "bg-gray-900 text-white"
    }`}>
      {/* Lesson Progress Bar */}
      <div className="w-full h-2 bg-gray-700 fixed top-0 left-0">
        <div className="h-full bg-blue-500 w-1/4"></div>
      </div>

      {/* Welcome Section */}
      <h1 className="text-4xl font-bold mt-10">Welcome to Learn Python</h1>
      <p className="text-gray-400 mt-2">Interactive lessons and exercises to master Python.</p>

      {/* Start Learning Button */}
      <Link href="/lesson1">
        <button className="mt-6 px-6 py-3 bg-blue-600 hover:bg-blue-700 transition rounded-md text-white">
          Start Learning
        </button>
      </Link>

      {/* Dark Mode Toggle */}
      <DarkModeToggle onThemeChange={setTheme} />

      {/* Map Icon (Expands Roadmap) */}
      <MapIcon
        onClick={(pos) => {
          setButtonPosition(pos);
          setMapOpen(true);
        }}
      />

      {/* Full-Screen Roadmap Overlay */}
      {mapOpen && <Roadmap isOpen={mapOpen} onClose={() => setMapOpen(false)} buttonPosition={buttonPosition} theme={theme} />}
    </div>
  );
}
