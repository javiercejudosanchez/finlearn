"use client";

import { motion } from "framer-motion";
import { useGameStore } from "@/stores/gameStore";
import { getLevelInfo } from "@/utils/xp";

export function LevelProgress() {
  const xp = useGameStore((s) => s.xp);
  const { level, currentLevelXp, xpForNextLevel, progress } = getLevelInfo(xp);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between text-xs font-medium text-gray-500">
        <span>Nivel {level}</span>
        <span>{currentLevelXp}/{xpForNextLevel} XP</span>
      </div>
      <div className="mt-1 h-3 w-full overflow-hidden rounded-full bg-gray-200">
        <motion.div
          className="h-full rounded-full bg-orange-400"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
