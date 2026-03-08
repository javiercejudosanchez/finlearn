"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface LessonFailedProps {
  mistakes: number;
  totalExercises: number;
  onRetry: () => void;
}

export function LessonFailed({
  mistakes,
  totalExercises,
  onRetry,
}: LessonFailedProps) {
  const router = useRouter();
  const answered = mistakes + (totalExercises - mistakes);
  const correct = totalExercises - mistakes;

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      {/* Broken heart */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <Heart className="h-20 w-20 fill-danger/20 text-danger" />
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-6 font-display text-3xl font-extrabold text-gray-800"
      >
        Te quedaste sin vidas!
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-3 text-center text-gray-500"
      >
        No te rindas! Cada error es una oportunidad de aprender.
      </motion.p>

      {/* Partial stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 grid w-full max-w-xs grid-cols-2 gap-4"
      >
        <div className="flex flex-col items-center rounded-game bg-gray-50 p-3">
          <span className="text-2xl font-bold text-gray-800">
            {correct}/{answered}
          </span>
          <span className="text-xs text-gray-500">Correctas</span>
        </div>
        <div className="flex flex-col items-center rounded-game bg-danger/5 p-3">
          <span className="text-2xl font-bold text-danger">{mistakes}</span>
          <span className="text-xs text-gray-500">Errores</span>
        </div>
      </motion.div>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-10 flex w-full max-w-xs flex-col gap-3"
      >
        <Button variant="primary" size="lg" onClick={onRetry} className="w-full">
          Reintentar
        </Button>
        <Button
          variant="ghost"
          size="lg"
          onClick={() => router.push("/learn")}
          className="w-full"
        >
          Volver al mapa
        </Button>
      </motion.div>
    </div>
  );
}
