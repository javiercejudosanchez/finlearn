"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export type TigerMood = "home" | "start" | "correct" | "wrong" | "complete";

const messages: Record<TigerMood, string[]> = {
  home: [
    "¡Hola! ¿Seguimos aprendiendo? 🐯",
    "¡Cada dia cuenta! Vamos a por ello 💪",
  ],
  start: [
    "¡Vamos, tu puedes! 🐯",
    "¡A por todas! 💪",
    "¡Concentrado y a ganar! 🔥",
  ],
  correct: [
    "¡Genial, sigue asi! 💪",
    "¡Eres un crack! 🔥",
    "¡Imparable! ⭐",
    "¡Perfecto! 🎯",
    "¡Eso es! 🏆",
  ],
  wrong: [
    "¡No pasa nada, a la siguiente! 🐯",
    "¡Animo, tu puedes! 💪",
    "¡Error = aprendizaje! 📚",
  ],
  complete: [
    "¡Test completado! ¡Eres increible! 🏆",
    "¡Fantástico! ¡Sigue asi! 🌟",
  ],
};

function pick(mood: TigerMood): string {
  const list = messages[mood];
  return list[Math.floor(Math.random() * list.length)];
}

interface TigerProps {
  mood: TigerMood;
  className?: string;
}

export function Tiger({ mood, className = "" }: TigerProps) {
  const [message, setMessage] = useState(() => pick(mood));

  useEffect(() => {
    setMessage(pick(mood));
  }, [mood]);

  return (
    <div className={`flex items-end gap-3 ${className}`}>
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="shrink-0 text-5xl select-none"
      >
        🐯
      </motion.div>
      <AnimatePresence mode="wait">
        <motion.div
          key={message}
          initial={{ opacity: 0, scale: 0.85, x: -8 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.2 }}
          className="relative max-w-[220px] rounded-2xl rounded-bl-sm bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-md"
        >
          {message}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
