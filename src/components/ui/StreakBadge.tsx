"use client";

import { motion } from "framer-motion";
import { Flame } from "lucide-react";

interface StreakBadgeProps {
  days: number;
  isActiveToday?: boolean;
}

export function StreakBadge({ days, isActiveToday = false }: StreakBadgeProps) {
  if (days === 0) return null;

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="inline-flex items-center gap-1.5 rounded-full bg-orange-100 px-3 py-1 text-sm font-bold text-orange-600"
    >
      <motion.div
        animate={isActiveToday ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
      >
        <Flame className="h-4 w-4 fill-orange-500 text-orange-500" />
      </motion.div>
      <span>{days}</span>
    </motion.div>
  );
}
