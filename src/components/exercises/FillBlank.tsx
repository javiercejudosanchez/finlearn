"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";
import type { Exercise } from "@/types";
import { sounds } from "@/lib/sounds";
import { Button } from "@/components/ui/Button";

interface ExerciseComponentProps {
  exercise: Exercise;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  isAnswered: boolean;
  showExplanation: boolean;
}

export function FillBlank({
  exercise,
  onAnswer,
  isAnswered,
  showExplanation,
}: ExerciseComponentProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const correctOption = exercise.options.find((o) => o.isCorrect);
  const wasCorrect = selected === correctOption?.id;

  // Split question around ___
  const parts = exercise.question.split("___");
  const filledText = selected
    ? exercise.options.find((o) => o.id === selected)?.text
    : null;

  const handleChipClick = (optionId: string) => {
    if (isAnswered) return;
    setSelected(optionId);
    sounds.click();
  };

  const handleCheck = () => {
    if (!selected) return;
    const correct = selected === correctOption?.id;
    if (correct) sounds.correct();
    else sounds.incorrect();
    onAnswer(selected, correct);
  };

  const getBlankStyle = () => {
    if (!isAnswered) {
      if (filledText) return "bg-primary/10 text-primary border-b-2 border-primary";
      return "bg-gray-100 text-gray-400 border-b-2 border-dashed border-gray-300";
    }
    if (wasCorrect) return "bg-success/10 text-success border-b-2 border-success";
    return "bg-danger/10 text-danger border-b-2 border-danger";
  };

  const getChipStyle = (optionId: string) => {
    if (!isAnswered) {
      if (optionId === selected) {
        return "border-primary bg-primary/10 text-primary ring-2 ring-primary/20";
      }
      return "border-gray-200 bg-white hover:border-primary/40";
    }
    if (optionId === correctOption?.id) {
      return "border-success bg-success/10 text-success";
    }
    if (optionId === selected && !wasCorrect) {
      return "border-danger bg-danger/10 text-danger";
    }
    return "border-gray-100 bg-gray-50 opacity-50";
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Sentence with blank */}
      <div className="rounded-game border-2 border-gray-100 bg-gray-50 p-5">
        <p className="text-lg font-medium leading-relaxed text-gray-800">
          {parts[0]}
          <motion.span
            key={selected || "empty"}
            initial={filledText ? { scale: 0.8, opacity: 0 } : false}
            animate={{ scale: 1, opacity: 1 }}
            className={`mx-1 inline-block rounded-lg px-3 py-0.5 font-bold ${getBlankStyle()}`}
          >
            {filledText || "___"}
          </motion.span>
          {parts[1]}
        </p>
      </div>

      {/* Word chips */}
      <div className="flex flex-wrap gap-3">
        {exercise.options.map((option) => (
          <motion.button
            key={option.id}
            onClick={() => handleChipClick(option.id)}
            disabled={isAnswered}
            animate={
              isAnswered && option.id === selected && !wasCorrect
                ? { x: [-4, 4, -3, 3, 0] }
                : isAnswered && option.id === correctOption?.id
                ? { scale: [1, 1.05, 1] }
                : {}
            }
            transition={{ duration: 0.4 }}
            className={`min-h-[44px] rounded-full border-2 px-5 py-2 text-sm font-semibold transition-colors ${getChipStyle(option.id)}`}
          >
            {isAnswered && option.id === correctOption?.id && (
              <CheckCircle2 className="mr-1.5 inline h-4 w-4" />
            )}
            {isAnswered && option.id === selected && !wasCorrect && (
              <XCircle className="mr-1.5 inline h-4 w-4" />
            )}
            {option.text}
          </motion.button>
        ))}
      </div>

      {/* Check button */}
      {!isAnswered && selected && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Button onClick={handleCheck} className="w-full" size="lg">
            Comprobar
          </Button>
        </motion.div>
      )}

      {/* Explanation */}
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
