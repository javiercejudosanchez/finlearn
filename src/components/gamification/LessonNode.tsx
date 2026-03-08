"use client";

import { motion } from "framer-motion";
import { Lock, Check, Star } from "lucide-react";
import { LessonStatus } from "@/types";

interface LessonNodeProps {
  title: string;
  status: LessonStatus;
  index: number;
  onClick?: () => void;
}

const statusConfig = {
  [LessonStatus.LOCKED]: {
    bg: "bg-gray-200",
    border: "border-gray-300",
    shadow: "shadow-[0_4px_0_0_rgba(156,163,175,0.6)]",
    text: "text-gray-400",
  },
  [LessonStatus.AVAILABLE]: {
    bg: "bg-primary",
    border: "border-primary",
    shadow: "shadow-[0_4px_0_0_#3730A3]",
    text: "text-white",
  },
  [LessonStatus.IN_PROGRESS]: {
    bg: "bg-primary",
    border: "border-primary",
    shadow: "shadow-[0_4px_0_0_#3730A3]",
    text: "text-white",
  },
  [LessonStatus.COMPLETED]: {
    bg: "bg-success",
    border: "border-success",
    shadow: "shadow-[0_4px_0_0_#15803D]",
    text: "text-white",
  },
};

export function LessonNode({ title, status, index, onClick }: LessonNodeProps) {
  const config = statusConfig[status];
  const isClickable = status !== LessonStatus.LOCKED;
  const isPerfect = status === LessonStatus.COMPLETED && index === 0; // Mock: first completed = perfect

  return (
    <div className="flex flex-col items-center gap-2">
      <motion.button
        onClick={isClickable ? onClick : undefined}
        disabled={!isClickable}
        whileHover={isClickable ? { scale: 1.08 } : undefined}
        whileTap={isClickable ? { scale: 0.95 } : undefined}
        animate={
          status === LessonStatus.AVAILABLE
            ? { scale: [1, 1.05, 1] }
            : status === LessonStatus.IN_PROGRESS
            ? { boxShadow: ["0 0 0 0 rgba(79,70,229,0.4)", "0 0 0 10px rgba(79,70,229,0)", "0 0 0 0 rgba(79,70,229,0)"] }
            : {}
        }
        transition={
          status === LessonStatus.AVAILABLE
            ? { duration: 2, repeat: Infinity, repeatDelay: 1 }
            : status === LessonStatus.IN_PROGRESS
            ? { duration: 1.5, repeat: Infinity }
            : {}
        }
        className={`relative flex h-16 w-16 items-center justify-center rounded-full border-2 ${config.bg} ${config.border} ${config.shadow} ${config.text} transition-colors ${
          isClickable ? "cursor-pointer" : "cursor-not-allowed"
        }`}
      >
        {status === LessonStatus.LOCKED && (
          <Lock className="h-6 w-6" />
        )}
        {status === LessonStatus.AVAILABLE && (
          <span className="text-lg font-bold">{index + 1}</span>
        )}
        {status === LessonStatus.IN_PROGRESS && (
          <span className="text-lg font-bold">{index + 1}</span>
        )}
        {status === LessonStatus.COMPLETED && (
          <Check className="h-7 w-7 stroke-[3]" />
        )}

        {/* Perfect star badge */}
        {isPerfect && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-accent shadow-sm"
          >
            <Star className="h-3.5 w-3.5 fill-white text-white" />
          </motion.div>
        )}
      </motion.button>

      <span
        className={`max-w-[100px] text-center text-xs font-medium leading-tight ${
          status === LessonStatus.LOCKED ? "text-gray-400" : "text-gray-600"
        }`}
      >
        {title}
      </span>
    </div>
  );
}
