"use client";

import { motion } from "framer-motion";
import { useGameStore } from "@/stores/gameStore";

export function StreakBadge() {
  const streak = useGameStore((s) => s.streak);

  if (streak === 0) return null;

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1 text-sm font-bold text-orange-600"
    >
      <span className="text-base">🔥</span>
      <span>{streak}</span>
    </motion.div>
  );
}
