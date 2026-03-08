"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

interface XPBadgeProps {
  amount: number;
  source?: string;
}

export function XPBadge({ amount }: XPBadgeProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -20 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className="inline-flex items-center gap-1.5 rounded-full bg-accent/20 px-3 py-1.5 font-bold text-accent"
        >
          <Sparkles className="h-4 w-4" />
          <span>+{amount} XP</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
