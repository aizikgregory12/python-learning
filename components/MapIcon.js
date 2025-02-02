import { motion } from "framer-motion";
import { useRef } from "react";

export default function MapIcon({ onClick }) {
  const buttonRef = useRef(null);

  const handleClick = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      onClick({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    }
  };

  return (
    <motion.div
      className="absolute bottom-10 left-10 cursor-pointer"
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
    >
      <button ref={buttonRef} className="w-16 h-16 bg-gray-700 text-white rounded-full flex items-center justify-center">
        🌍
      </button>
    </motion.div>
  );
}
