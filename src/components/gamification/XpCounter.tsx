"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useGameStore } from "@/stores/gameStore";

export function XpCounter() {
  const xp = useGameStore((s) => s.xp);

  return (
    <div className="flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-sm font-bold text-amber-600">
      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
      <AnimatePresence mode="popLayout">
        <motion.span
          key={xp}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 10, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {xp}
        </motion.span>
      </AnimatePresence>
      <span>XP</span>
    </div>
  );
}
