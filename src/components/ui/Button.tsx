"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const variantStyles = {
  primary:
    "bg-primary text-white shadow-[0_4px_0_0_#3730A3] active:shadow-[0_1px_0_0_#3730A3] active:translate-y-[3px] hover:brightness-110",
  secondary:
    "bg-secondary text-white shadow-[0_4px_0_0_#e07e1a] active:shadow-[0_1px_0_0_#e07e1a] active:translate-y-[3px] hover:brightness-110",
  danger:
    "bg-danger text-white shadow-[0_4px_0_0_#B91C1C] active:shadow-[0_1px_0_0_#B91C1C] active:translate-y-[3px] hover:brightness-110",
  ghost:
    "bg-transparent text-gray-600 hover:bg-gray-100 shadow-none active:translate-y-0",
  correct:
    "bg-success text-white shadow-[0_4px_0_0_#15803D] active:shadow-[0_1px_0_0_#15803D] active:translate-y-[3px]",
  incorrect:
    "bg-danger text-white shadow-[0_4px_0_0_#B91C1C] active:shadow-[0_1px_0_0_#B91C1C] active:translate-y-[3px]",
} as const;

const sizeStyles = {
  sm: "px-3 py-1.5 text-sm rounded-lg",
  md: "px-5 py-2.5 text-base rounded-game",
  lg: "px-8 py-3.5 text-lg rounded-game",
} as const;

type Variant = keyof typeof variantStyles;
type Size = keyof typeof sizeStyles;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", loading, disabled, className, children, ...props }, ref) => {
    const isDisabled = disabled || loading;

    return (
      <motion.button
        ref={ref}
        whileTap={isDisabled ? undefined : { scale: 0.97 }}
        className={twMerge(
          clsx(
            "relative inline-flex items-center justify-center font-bold transition-all duration-100 select-none",
            variantStyles[variant],
            sizeStyles[size],
            isDisabled && "opacity-50 cursor-not-allowed shadow-none active:translate-y-0",
            className,
          ),
        )}
        disabled={isDisabled}
        {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </motion.button>
    );
  },
);

Button.displayName = "Button";
