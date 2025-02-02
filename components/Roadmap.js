import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSchool, faBook, faCode, faDiagramProject, faBrain } from "@fortawesome/free-solid-svg-icons";

export default function Roadmap({ isOpen, onClose, buttonPosition, theme }) {
  const [currentTheme, setCurrentTheme] = useState(null);
  const [isClosing, setIsClosing] = useState(false); // Track if closing animation is running

  // Ensure theme updates when it changes
  useEffect(() => {
    setCurrentTheme(theme);
  }, [theme]);

  if (currentTheme === null) return null; // Prevent hydration error

  // Define subjects and lessons
  const roadmap = {
    "Introduction": { icon: faSchool, lessons: ["Variables"] },
    "Variables": { icon: faBook, lessons: ["If Statements", "Loops", "Data Structures"] },
    "If Statements": { icon: faCode, lessons: ["Functions"] },
    "Loops": { icon: faBrain, lessons: ["Functions"] },
    "Data Structures": { icon: faDiagramProject, lessons: ["OOP Basics"] },
  };

  // Handle closing with animation delay
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 400); // Matches exit animation duration
  };

  return (
    <AnimatePresence>
      {isOpen && !isClosing && (
        <motion.div
          key="roadmap-overlay"
          className={`fixed inset-0 flex items-center justify-center p-4 transition-colors duration-300 ${
            currentTheme === "light" ? "bg-white text-black" : "bg-gray-900 text-white"
          }`}
          initial={{
            opacity: 0,
            scale: 0,
            x: buttonPosition.x - window.innerWidth / 2,
            y: buttonPosition.y - window.innerHeight / 2,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            x: 0,
            y: 0,
          }}
          exit={{
            opacity: 0,
            scale: 0,
            x: buttonPosition.x - window.innerWidth / 2,
            y: buttonPosition.y - window.innerHeight / 2,
          }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        >
          {/* Close Button */}
          <button
            className={`absolute top-6 right-6 p-3 transition-colors ${
              currentTheme === "light" ? "bg-red-400 text-black" : "bg-red-500 text-white"
            } rounded-md`}
            onClick={handleClose} // Uses delayed close to ensure animation plays
          >
            ✖
          </button>

          {/* Roadmap Content */}
          <motion.div
            className={`w-full max-w-5xl p-8 rounded-lg relative overflow-hidden transition-colors duration-300 ${
              currentTheme === "light" ? "bg-gray-200 text-black" : "bg-gray-800 text-white"
            }`}
          >
            <h2 className="text-2xl font-bold text-center mb-6">Python Learning Roadmap</h2>

            {/* Display Subjects */}
            <motion.div className="flex items-center justify-between w-[85%] mx-auto">
              {Object.keys(roadmap).map((subject, index, array) => (
                <div key={index} className="relative flex flex-col items-center">
                  {/* Subject Icon */}
                  <motion.div
                    className={`cursor-pointer flex flex-col items-center px-6 py-3 rounded-md transition-all duration-150 ease-out shadow-md hover:shadow-lg hover:scale-105 ${
                      currentTheme === "light" ? "bg-gray-300 text-black" : "bg-gray-700 text-white"
                    }`}
                  >
                    <FontAwesomeIcon icon={roadmap[subject].icon} size="3x" className="text-blue-500" />
                    <span className="mt-2 text-lg">{subject}</span>
                  </motion.div>

                  {/* Spacer Lines */}
                  {index < array.length - 1 && (
                    <div
                      className={`absolute top-1/2 left-full translate-y-1/2 w-16 h-1 ${
                        currentTheme === "light" ? "bg-gray-400" : "bg-gray-500"
                      }`}
                    ></div>
                  )}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
