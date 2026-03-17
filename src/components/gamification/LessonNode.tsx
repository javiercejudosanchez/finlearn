"use client";

import { motion } from "framer-motion";
import { LessonStatus } from "@/types";

interface LessonNodeProps {
  title: string;
  icon?: string;
  status: LessonStatus;
  index: number;
  onClick?: () => void;
}

export function LessonNode({ title, icon, status, index, onClick }: LessonNodeProps) {
  const isClickable = status !== LessonStatus.LOCKED;
  const isCompleted = status === LessonStatus.COMPLETED;
  const isAvailable = status === LessonStatus.AVAILABLE || status === LessonStatus.IN_PROGRESS;
  const isLocked = status === LessonStatus.LOCKED;

  return (
    <div className="flex flex-col items-center gap-2">
      <motion.button
        onClick={isClickable ? onClick : undefined}
        disabled={!isClickable}
        whileHover={isClickable ? { scale: 1.1 } : undefined}
        whileTap={isClickable ? { scale: 0.93 } : undefined}
        className={[
          "relative flex h-[72px] w-[72px] items-center justify-center rounded-full text-3xl transition-all duration-200 select-none",
          isCompleted
            ? "bg-emerald-500 shadow-[0_4px_0_0_#1a8a4a] border-2 border-emerald-400"
            : isAvailable
            ? "bg-orange-400 shadow-[0_4px_0_0_#c2691a] border-2 border-orange-300 lesson-pulse"
            : "bg-gray-200 border-2 border-gray-300 shadow-[0_4px_0_0_rgba(0,0,0,0.1)] cursor-not-allowed",
        ].join(" ")}
      >
        {isCompleted ? (
          <span className="text-white font-bold text-2xl">✓</span>
        ) : isLocked ? (
          <span>🔒</span>
        ) : (
          <span>{icon ?? String(index + 1)}</span>
        )}
      </motion.button>

      <span
        className={`max-w-[90px] text-center text-xs font-semibold leading-tight ${
          isLocked ? "text-gray-400" : "text-gray-700"
        }`}
      >
        {title}
      </span>
    </div>
  );
}
