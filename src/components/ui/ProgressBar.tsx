"use client";

import { motion } from "framer-motion";
import { clsx } from "clsx";

const colorMap = {
  green: "bg-success",
  blue: "bg-primary",
  amber: "bg-accent",
} as const;

interface ProgressBarProps {
  value: number;
  color?: keyof typeof colorMap;
  showPercentage?: boolean;
  height?: "sm" | "md" | "lg";
}

const heightMap = { sm: "h-2", md: "h-3", lg: "h-4" };

export function ProgressBar({
  value,
  color = "green",
  showPercentage = false,
  height = "md",
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div className="flex items-center gap-2">
      <div className={clsx("w-full overflow-hidden rounded-full bg-gray-200", heightMap[height])}>
        <motion.div
          className={clsx("h-full rounded-full relative", colorMap[color])}
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 overflow-hidden rounded-full">
            <div
              className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite]"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
              }}
            />
          </div>
        </motion.div>
      </div>
      {showPercentage && (
        <span className="min-w-[2.5rem] text-right text-xs font-bold text-gray-500">
          {Math.round(clamped)}%
        </span>
      )}
    </div>
  );
}
