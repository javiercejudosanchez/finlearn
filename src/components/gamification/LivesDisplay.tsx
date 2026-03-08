"use client";

import { motion } from "framer-motion";
import { useGameStore } from "@/stores/gameStore";

export function LivesDisplay() {
  const hearts = useGameStore((s) => s.hearts);

  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.svg
          key={i}
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill={i < hearts ? "#ef4444" : "none"}
          stroke={i < hearts ? "#ef4444" : "#d1d5db"}
          strokeWidth="2"
          animate={{ scale: i < hearts ? [1, 1.2, 1] : 1 }}
          transition={{ duration: 0.3 }}
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </motion.svg>
      ))}
    </div>
  );
}
