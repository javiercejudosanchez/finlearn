"use client";

import { useState, useMemo } from "react";
import { motion, Reorder } from "framer-motion";
import { GripVertical, CheckCircle2, XCircle } from "lucide-react";
import type { Exercise, ExerciseOption } from "@/types";
import { sounds } from "@/lib/sounds";
import { Button } from "@/components/ui/Button";

interface ExerciseComponentProps {
  exercise: Exercise;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  isAnswered: boolean;
  showExplanation: boolean;
}

/**
 * OrderSteps exercise component.
 *
 * Uses exercise.options where each option is a step.
 * The `order` field represents the correct position (0-based).
 * Items are presented in random order; the user drags to reorder.
 */
export function OrderSteps({
  exercise,
  onAnswer,
  isAnswered,
  showExplanation,
}: ExerciseComponentProps) {
  // Shuffle options once for initial display
  const shuffled = useMemo(
    () => [...exercise.options].sort(() => Math.random() - 0.5),
    [exercise.options]
  );

  const [items, setItems] = useState<ExerciseOption[]>(shuffled);
  const [results, setResults] = useState<Map<string, boolean>>(new Map());

  const wasCorrect = isAnswered && items.every((item, idx) => item.order === idx);

  const handleCheck = () => {
    const positionResults = new Map<string, boolean>();
    let allCorrect = true;
    items.forEach((item, idx) => {
      const correct = item.order === idx;
      positionResults.set(item.id, correct);
      if (!correct) allCorrect = false;
    });
    setResults(positionResults);

    if (allCorrect) sounds.correct();
    else sounds.incorrect();

    onAnswer(items.map((i) => i.id).join(","), allCorrect);
  };

  const getItemStyle = (itemId: string) => {
    if (!isAnswered) {
      return "border-gray-200 bg-white cursor-grab active:cursor-grabbing hover:border-primary/30 hover:shadow-sm";
    }
    if (results.get(itemId)) {
      return "border-success bg-success/10";
    }
    return "border-danger bg-danger/10";
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold text-gray-800 sm:text-2xl">
        {exercise.question}
      </h2>
      <p className="text-sm text-gray-500">
        Arrastra los elementos para ordenarlos correctamente
      </p>

      <Reorder.Group
        axis="y"
        values={items}
        onReorder={(newItems) => {
          if (!isAnswered) {
            setItems(newItems);
            sounds.click();
          }
        }}
        className="flex flex-col gap-2.5"
      >
        {items.map((item, idx) => (
          <Reorder.Item
            key={item.id}
            value={item}
            dragListener={!isAnswered}
          >
            <motion.div
              layout
              animate={
                isAnswered && !results.get(item.id)
                  ? { x: [-4, 4, -3, 3, 0] }
                  : {}
              }
              transition={{ duration: 0.4 }}
              className={`flex min-h-[48px] items-center gap-3 rounded-game border-2 px-4 py-3 transition-colors ${getItemStyle(item.id)}`}
            >
              {!isAnswered && (
                <GripVertical className="h-5 w-5 shrink-0 text-gray-400" />
              )}
              {isAnswered && results.get(item.id) && (
                <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
              )}
              {isAnswered && !results.get(item.id) && (
                <XCircle className="h-5 w-5 shrink-0 text-danger" />
              )}
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-bold text-gray-500">
                {idx + 1}
              </span>
              <span className="font-medium">{item.text}</span>
            </motion.div>
          </Reorder.Item>
        ))}
      </Reorder.Group>

      {/* Check button */}
      {!isAnswered && (
        <Button onClick={handleCheck} className="w-full" size="lg">
          Comprobar orden
        </Button>
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
            {wasCorrect ? "Orden correcto!" : "Orden incorrecto"}
          </p>
          <p className="mt-1 text-sm text-gray-600">{exercise.explanation}</p>
        </motion.div>
      )}
    </div>
  );
}
