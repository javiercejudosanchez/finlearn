"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import type { Exercise } from "@/types";
import { sounds } from "@/lib/sounds";

interface ExerciseComponentProps {
  exercise: Exercise;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  isAnswered: boolean;
  showExplanation: boolean;
}

export function TrueFalse({
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
      return { scale: [1, 1.06, 1] };
    }
    if (optionId === selected && !wasCorrect) {
      return { x: [-6, 6, -4, 4, 0] };
    }
    return {};
  };

  // Determine which option is "Verdadero" vs "Falso"
  const trueOption = exercise.options.find(
    (o) => o.text.toLowerCase() === "verdadero"
  );
  const falseOption = exercise.options.find(
    (o) => o.text.toLowerCase() === "falso"
  );
  const orderedOptions = [trueOption, falseOption].filter(Boolean) as typeof exercise.options;

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold text-gray-800 sm:text-2xl">
        {exercise.question}
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {orderedOptions.map((option) => {
          const isTrue = option.text.toLowerCase() === "verdadero";
          return (
            <motion.button
              key={option.id}
              onClick={() => handleSelect(option.id)}
              disabled={isAnswered}
              animate={getAnimation(option.id)}
              transition={{ duration: 0.4 }}
              className={`flex min-h-[64px] flex-col items-center justify-center gap-2 rounded-game border-2 p-4 font-bold text-lg transition-colors ${getStyle(option.id)}`}
            >
              <span className={`flex h-10 w-10 items-center justify-center rounded-full ${
                isAnswered && option.id === correctOption?.id
                  ? "bg-success/20"
                  : isAnswered && option.id === selected && !wasCorrect
                  ? "bg-danger/20"
                  : isTrue
                  ? "bg-success/10"
                  : "bg-danger/10"
              }`}>
                {isTrue ? (
                  <Check className={`h-5 w-5 ${
                    isAnswered && option.id === correctOption?.id ? "text-success" :
                    isAnswered && option.id === selected && !wasCorrect ? "text-danger" :
                    "text-success"
                  }`} />
                ) : (
                  <X className={`h-5 w-5 ${
                    isAnswered && option.id === correctOption?.id ? "text-success" :
                    isAnswered && option.id === selected && !wasCorrect ? "text-danger" :
                    "text-danger"
                  }`} />
                )}
              </span>
              <span>{option.text}</span>
            </motion.button>
          );
        })}
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
