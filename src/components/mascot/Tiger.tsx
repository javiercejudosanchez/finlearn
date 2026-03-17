"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export type TigerMood = "home" | "start" | "correct" | "wrong" | "complete";

const messages: Record<TigerMood, string[]> = {
  home: [
    "¡Hola! ¿Seguimos aprendiendo? 🐯",
    "¡Cada dia cuenta! Vamos a por ello 💪",
    "¡Tu futuro financiero te espera! 🌟",
  ],
  start: [
    "¡Vamos, tu puedes! 🐯",
    "¡A por todas! 💪",
    "¡Concentrado y a ganar! 🔥",
    "¡Tú lo tienes! ⭐",
  ],
  correct: [
    "¡Genial, sigue asi! 💪",
    "¡Eres un crack! 🔥",
    "¡Imparable! ⭐",
    "¡Perfecto! 🎯",
    "¡Asi se hace! 🏆",
  ],
  wrong: [
    "¡No pasa nada, a la siguiente! 🐯",
    "¡Animo, de los errores se aprende! 📚",
    "¡Tu puedes, sigue! 💪",
  ],
  complete: [
    "¡Test completado! ¡Increible! 🏆",
    "¡Otro test superado! 🌟",
    "¡Eres increible! ¡Sigue asi! 🎉",
  ],
};

function pick(mood: TigerMood): string {
  const list = messages[mood];
  return list[Math.floor(Math.random() * list.length)];
}

interface TigerProps {
  mood: TigerMood;
  className?: string;
  size?: "small" | "medium" | "large";
}

export function Tiger({ mood, className = "", size = "medium" }: TigerProps) {
  const [message, setMessage] = useState(() => pick(mood));

  useEffect(() => {
    setMessage(pick(mood));
  }, [mood]);

  const emojiSize = size === "large" ? "text-6xl" : size === "medium" ? "text-4xl" : "text-3xl";
  const bubbleMax = size === "large" ? "max-w-[200px]" : "max-w-[180px]";

  return (
    <div className={`flex items-end gap-3 ${className}`}>
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
        className={`shrink-0 select-none ${emojiSize}`}
      >
        🐯
      </motion.div>
      <AnimatePresence mode="wait">
        <motion.div
          key={message}
          initial={{ opacity: 0, scale: 0.85, x: -6 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          exit={{ opacity: 0, scale: 0.85 }}
          transition={{ duration: 0.2 }}
          className={`relative ${bubbleMax} rounded-2xl rounded-bl-sm bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-md border border-orange-100`}
        >
          {message}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
