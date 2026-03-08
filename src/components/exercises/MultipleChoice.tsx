"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import type { Exercise } from "@/types";
import { sounds } from "@/lib/sounds";

interface ExerciseComponentProps {
  exercise: Exercise;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  isAnswered: boolean;
  showExplanation: boolean;
}

export function MultipleChoice({
  exercise,
  onAnswer,
  isAnswered,
  showExplanation,
}: ExerciseComponentProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const correctOption = exercise.options.find((o) => o.isCorrect);
  const wasCorrect = selected === correctOption?.id;

  const handleSelect = (optionId: string) => {
    if (isAnswered) return;
    setSelected(optionId);
    const correct = correctOption?.id === optionId;
    if (correct) sounds.correct();
    else sounds.incorrect();
    onAnswer(optionId, correct);
  };

  const getStyle = (optionId: string) => {
    if (!isAnswered) {
      return "border-gray-200 bg-white hover:border-primary/40 hover:bg-primary/5";
    }
    if (optionId === correctOption?.id) {
      return "border-success bg-success/10";
    }
    if (optionId === selected && !wasCorrect) {
      return "border-danger bg-danger/10";
    }
    return "border-gray-100 bg-gray-50 opacity-50";
  };

  const getAnimation = (optionId: string) => {
    if (!isAnswered) return {};
    if (optionId === selected && wasCorrect) {
      return { scale: [1, 1.04, 1] };
    }
    if (optionId === selected && !wasCorrect) {
      return { x: [-6, 6, -4, 4, 0] };
    }
    return {};
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold text-gray-800 sm:text-2xl">
        {exercise.question}
      </h2>

      <div className="grid gap-3">
        {exercise.options.map((option) => (
          <motion.button
            key={option.id}
            onClick={() => handleSelect(option.id)}
            disabled={isAnswered}
            animate={getAnimation(option.id)}
            transition={{ duration: 0.4 }}
            className={`flex min-h-[48px] items-center gap-3 rounded-game border-2 px-4 py-3 text-left font-medium transition-colors ${getStyle(option.id)}`}
          >
            {isAnswered && option.id === correctOption?.id && (
              <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
            )}
            {isAnswered && option.id === selected && !wasCorrect && (
              <XCircle className="h-5 w-5 shrink-0 text-danger" />
            )}
            <span>{option.text}</span>
          </motion.button>
        ))}
      </div>

      {showExplanation && exercise.explanation && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`rounded-game border-2 p-4 ${
            wasCorrect
              ? "border-success/30 bg-success/5"
              : "border-danger/30 bg-danger/5"
          }`}
        >
          <p className={`text-sm font-bold ${wasCorrect ? "text-success" : "text-danger"}`}>
            {wasCorrect ? "Correcto!" : "Incorrecto"}
          </p>
          <p className="mt-1 text-sm text-gray-600">{exercise.explanation}</p>
        </motion.div>
      )}
    </div>
  );
}
