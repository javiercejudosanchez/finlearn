"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Star, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { playComplete } from "@/lib/sounds";
import confetti from "@/lib/confetti";

interface LessonCompleteProps {
  xpEarned: number;
  mistakes: number;
  totalExercises: number;
}

export function LessonComplete({
  xpEarned,
  mistakes,
  totalExercises,
}: LessonCompleteProps) {
  const router = useRouter();

  const correct = totalExercises - mistakes;
  const accuracy = totalExercises > 0 ? Math.round((correct / totalExercises) * 100) : 0;
  const starCount = mistakes === 0 ? 3 : mistakes <= 1 ? 2 : 1;

  useEffect(() => {
    playComplete();
    confetti();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      {/* Stars */}
      <div className="flex items-end gap-2">
        {[0, 1, 2].map((i) => {
          const filled = i < starCount;
          const isCenter = i === 1;
          return (
            <motion.div
              key={i}
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 15,
                delay: 0.2 + i * 0.15,
              }}
            >
              <Star
                className={`${isCenter ? "h-16 w-16" : "h-12 w-12"} ${
                  filled
                    ? "fill-accent text-accent drop-shadow-lg"
                    : "fill-none text-gray-300"
                }`}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-6 font-display text-3xl font-extrabold text-gray-800"
      >
        Leccion completada!
      </motion.h1>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-8 grid w-full max-w-xs grid-cols-3 gap-4"
      >
        <div className="flex flex-col items-center rounded-game bg-gray-50 p-3">
          <span className="text-2xl font-bold text-gray-800">{accuracy}%</span>
          <span className="text-xs text-gray-500">Precision</span>
        </div>
        <div className="flex flex-col items-center rounded-game bg-accent/10 p-3">
          <div className="flex items-center gap-1 text-2xl font-bold text-accent">
            <Sparkles className="h-5 w-5" />
            {xpEarned}
          </div>
          <span className="text-xs text-gray-500">XP</span>
        </div>
        <div className="flex flex-col items-center rounded-game bg-gray-50 p-3">
          <span className="text-2xl font-bold text-gray-800">{mistakes}</span>
          <span className="text-xs text-gray-500">{mistakes === 1 ? "Error" : "Errores"}</span>
        </div>
      </motion.div>

      {/* Continue button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="mt-10 w-full max-w-xs"
      >
        <Button
          variant="primary"
          size="lg"
          onClick={() => router.push("/learn")}
          className="w-full"
        >
          Continuar
        </Button>
      </motion.div>
    </div>
  );
}
