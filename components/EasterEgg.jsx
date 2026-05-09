"use client";

import { useState } from "react";
import { motion } from "framer-motion";

/**
 * A near-invisible heart hidden in the railing — easter egg.
 */
export default function EasterEgg({ onFound }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onFound}
      className="fixed z-30 top-[58%] left-[14%] w-6 h-6 grid place-items-center"
      whileHover={{ scale: 1.4 }}
      aria-label="hidden heart"
    >
      <span
        className="block transition-opacity"
        style={{
          opacity: hovered ? 1 : 0.06,
          filter: "drop-shadow(0 0 8px rgba(255,141,161,0.7))",
          color: "#ff8da1",
          fontSize: 14,
        }}
      >
        ❤
      </span>
    </motion.button>
  );
}
