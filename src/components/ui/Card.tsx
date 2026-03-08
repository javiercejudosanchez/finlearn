"use client";

import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const variantStyles = {
  default: "bg-white border-gray-100 shadow-sm",
  highlighted: "bg-white border-primary/30 shadow-md ring-1 ring-primary/10",
  locked: "bg-gray-50 border-gray-200 opacity-70",
} as const;

interface CardProps {
  variant?: keyof typeof variantStyles;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ variant = "default", children, className, onClick }: CardProps) {
  const isClickable = !!onClick && variant !== "locked";

  return (
    <motion.div
      whileHover={isClickable ? { y: -2 } : undefined}
      whileTap={isClickable ? { scale: 0.98 } : undefined}
      onClick={isClickable ? onClick : undefined}
      className={twMerge(
        clsx(
          "relative rounded-game border-2 p-5 transition-colors",
          variantStyles[variant],
          isClickable && "cursor-pointer",
          className,
        ),
      )}
    >
      {children}
      {variant === "locked" && (
        <div className="absolute inset-0 flex items-center justify-center rounded-game bg-gray-100/50">
          <div className="rounded-full bg-gray-200 p-2">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      )}
    </motion.div>
  );
}
