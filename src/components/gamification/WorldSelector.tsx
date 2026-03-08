"use client";

import { motion } from "framer-motion";
import { Lock } from "lucide-react";

interface WorldTab {
  id: string;
  title: string;
  icon: string;
  color: string;
  isLocked: boolean;
}

interface WorldSelectorProps {
  worlds: WorldTab[];
  activeWorldId: string;
  onSelect: (worldId: string) => void;
}

export function WorldSelector({
  worlds,
  activeWorldId,
  onSelect,
}: WorldSelectorProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
      {worlds.map((world) => {
        const isActive = world.id === activeWorldId;
        return (
          <motion.button
            key={world.id}
            whileTap={world.isLocked ? undefined : { scale: 0.95 }}
            onClick={() => !world.isLocked && onSelect(world.id)}
            disabled={world.isLocked}
            className={`relative flex shrink-0 items-center gap-2 rounded-full border-2 px-4 py-2 text-sm font-bold transition-colors ${
              isActive
                ? "border-primary bg-primary/10 text-primary"
                : world.isLocked
                ? "border-gray-200 bg-gray-50 text-gray-400"
                : "border-gray-200 bg-white text-gray-600 hover:border-gray-300"
            }`}
          >
            <span className="text-lg">{world.icon}</span>
            <span className="hidden sm:inline">{world.title}</span>
            {world.isLocked && (
              <Lock className="h-3.5 w-3.5 text-gray-400" />
            )}
            {isActive && (
              <motion.div
                layoutId="world-indicator"
                className="absolute -bottom-0.5 left-1/2 h-1 w-6 -translate-x-1/2 rounded-full bg-primary"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
