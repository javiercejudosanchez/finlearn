"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import type { Exercise } from "@/types";
import { sounds } from "@/lib/sounds";

interface ExerciseComponentProps {
  exercise: Exercise;
  onAnswer: (answer: string, isCorrect: boolean) => void;
  isAnswered: boolean;
  showExplanation: boolean;
}

// Colors assigned to matched pairs for visual connection
const pairColors = [
  { bg: "bg-blue-100", border: "border-blue-400", text: "text-blue-700" },
  { bg: "bg-emerald-100", border: "border-emerald-400", text: "text-emerald-700" },
  { bg: "bg-violet-100", border: "border-violet-400", text: "text-violet-700" },
  { bg: "bg-amber-100", border: "border-amber-400", text: "text-amber-700" },
  { bg: "bg-rose-100", border: "border-rose-400", text: "text-rose-700" },
  { bg: "bg-cyan-100", border: "border-cyan-400", text: "text-cyan-700" },
];

/**
 * MatchPairs exercise component.
 *
 * Options encode pairs with "left|right" in the text field.
 * Each option represents one pair; the left side is the concept,
 * the right side is the definition.
 */
export function MatchPairs({
  exercise,
  onAnswer,
  isAnswered,
  showExplanation,
}: ExerciseComponentProps) {
  // Parse pairs from options: text = "left|right"
  const pairs = useMemo(
    () =>
      exercise.options.map((opt) => {
        const [left, right] = opt.text.split("|");
        return { id: opt.id, left: left.trim(), right: right.trim() };
      }),
    [exercise.options]
  );

  // Shuffle right column once
  const shuffledRight = useMemo(
    () => [...pairs].sort(() => Math.random() - 0.5),
    [pairs]
  );

  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matched, setMatched] = useState<Map<string, number>>(new Map()); // pairId → colorIndex
  const [wrongPair, setWrongPair] = useState<{ left: string; right: string } | null>(null);
  const [mistakes, setMistakes] = useState(0);

  const handleLeftClick = (pairId: string) => {
    if (isAnswered || matched.has(pairId)) return;
    setSelectedLeft(pairId);
    sounds.click();
  };

  const handleRightClick = (rightPairId: string) => {
    if (!selectedLeft || isAnswered || matched.has(rightPairId)) return;

    if (selectedLeft === rightPairId) {
      // Correct match
      const colorIndex = matched.size % pairColors.length;
      const newMatched = new Map(matched);
      newMatched.set(rightPairId, colorIndex);
      setMatched(newMatched);
      setSelectedLeft(null);
      sounds.correct();

      // All pairs matched
      if (newMatched.size === pairs.length) {
        onAnswer("matched", mistakes === 0);
      }
    } else {
      // Wrong match
      setMistakes((m) => m + 1);
      setWrongPair({ left: selectedLeft, right: rightPairId });
      sounds.incorrect();
      setTimeout(() => {
        setWrongPair(null);
        setSelectedLeft(null);
      }, 700);
    }
  };

  const getLeftStyle = (pairId: string) => {
    if (matched.has(pairId)) {
      const c = pairColors[matched.get(pairId)!];
      return `${c.border} ${c.bg} ${c.text}`;
    }
    if (wrongPair?.left === pairId) return "border-danger bg-danger/10";
    if (selectedLeft === pairId) return "border-primary bg-primary/10 ring-2 ring-primary/20";
    return "border-gray-200 bg-white hover:border-primary/30";
  };

  const getRightStyle = (pairId: string) => {
    if (matched.has(pairId)) {
      const c = pairColors[matched.get(pairId)!];
      return `${c.border} ${c.bg} ${c.text}`;
    }
    if (wrongPair?.right === pairId) return "border-danger bg-danger/10";
    return "border-gray-200 bg-white hover:border-primary/30";
  };

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-xl font-bold text-gray-800 sm:text-2xl">
        {exercise.question}
      </h2>
      <p className="text-sm text-gray-500">
        Selecciona un concepto y luego su definicion
      </p>

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {/* Left column — concepts */}
        <div className="flex flex-col gap-2.5">
          {pairs.map((pair) => (
            <motion.button
              key={`l-${pair.id}`}
              onClick={() => handleLeftClick(pair.id)}
              animate={
                wrongPair?.left === pair.id
                  ? { x: [-5, 5, -3, 3, 0] }
                  : {}
              }
              transition={{ duration: 0.4 }}
              disabled={isAnswered || matched.has(pair.id)}
              className={`relative min-h-[48px] rounded-game border-2 px-3 py-2.5 text-left text-sm font-medium transition-colors ${getLeftStyle(pair.id)}`}
            >
              <AnimatePresence>
                {matched.has(pair.id) && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-success text-white"
                  >
                    <Check className="h-3 w-3" />
                  </motion.span>
                )}
              </AnimatePresence>
              {pair.left}
            </motion.button>
          ))}
        </div>

        {/* Right column — definitions (shuffled) */}
        <div className="flex flex-col gap-2.5">
          {shuffledRight.map((pair) => (
            <motion.button
              key={`r-${pair.id}`}
              onClick={() => handleRightClick(pair.id)}
              animate={
                wrongPair?.right === pair.id
                  ? { x: [-5, 5, -3, 3, 0] }
                  : {}
              }
              transition={{ duration: 0.4 }}
              disabled={isAnswered || matched.has(pair.id) || !selectedLeft}
              className={`relative min-h-[48px] rounded-game border-2 px-3 py-2.5 text-left text-sm font-medium transition-colors ${getRightStyle(pair.id)}`}
            >
              <AnimatePresence>
                {matched.has(pair.id) && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-success text-white"
                  >
                    <Check className="h-3 w-3" />
                  </motion.span>
                )}
              </AnimatePresence>
              {pair.right}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Explanation */}
      {showExplanation && exercise.explanation && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className={`rounded-game border-2 p-4 ${
            mistakes === 0
              ? "border-success/30 bg-success/5"
              : "border-danger/30 bg-danger/5"
          }`}
        >
          <p className={`text-sm font-bold ${mistakes === 0 ? "text-success" : "text-danger"}`}>
            {mistakes === 0 ? "Perfecto!" : `Completado con ${mistakes} ${mistakes === 1 ? "error" : "errores"}`}
          </p>
          <p className="mt-1 text-sm text-gray-600">{exercise.explanation}</p>
        </motion.div>
      )}
    </div>
  );
}
