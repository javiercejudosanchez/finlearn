"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

interface HeartDisplayProps {
  current: number;
  max?: number;
}

export function HeartDisplay({ current, max = 5 }: HeartDisplayProps) {
  const prevRef = useRef(current);
  const justLost = prevRef.current > current;

  useEffect(() => {
    prevRef.current = current;
  }, [current]);

  return (
    <motion.div
      className="flex items-center gap-0.5"
      animate={justLost ? { x: [-4, 4, -3, 3, 0] } : {}}
      transition={{ duration: 0.4 }}
    >
      {Array.from({ length: max }).map((_, i) => {
        const filled = i < current;
        return (
          <motion.div
            key={i}
            animate={
              filled
                ? { scale: [1, 1.25, 1] }
                : justLost && i === current
                ? { scale: [1, 0.6, 1], opacity: [1, 0.3, 0.5] }
                : {}
            }
            transition={{ duration: 0.3 }}
          >
            <Heart
              className={`h-5 w-5 ${
                filled
                  ? "fill-danger text-danger"
                  : "fill-none text-gray-300"
              }`}
            />
          </motion.div>
        );
      })}
    </motion.div>
  );
}
