"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLessonStore } from "@/stores/lessonStore";
import { useGameStore } from "@/stores/gameStore";
import { sounds } from "@/lib/sounds";
import { ProgressBar } from "@/components/ui/ProgressBar";

export function ChallengeCard() {
  const {
    currentLesson,
    currentExerciseIndex,
    showExplanation,
    lastAnswerCorrect,
    submitAnswer,
    nextExercise,
    getCurrentExercise,
  } = useLessonStore();

  const hearts = useGameStore((s) => s.hearts);

  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const exercise = getCurrentExercise();
  if (!exercise || !currentLesson) return null;

  const total = currentLesson.exercises.length;
  const progress = ((currentExerciseIndex + (showExplanation ? 1 : 0)) / total) * 100;

  const handleCheck = () => {
    if (!selectedOption) return;
    const correct = exercise.options.find((o) => o.isCorrect);
    const isCorrect = correct?.id === selectedOption;
    submitAnswer(selectedOption, isCorrect);
    if (isCorrect) sounds.correct();
    else sounds.incorrect();
  };

  const handleNext = () => {
    nextExercise();
    setSelectedOption(null);
    const state = useLessonStore.getState();
    if (state.isComplete) sounds.complete();
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-2xl flex-col px-4 py-8">
      <div className="flex items-center gap-3">
        <div className="flex-1">
          <ProgressBar value={progress} />
        </div>
        <span className="text-sm font-bold text-red-500">{hearts} ❤️</span>
      </div>

      <motion.div
        key={exercise.id}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        className="mt-8 flex-1"
      >
        <h2 className="text-xl font-bold text-gray-800">{exercise.question}</h2>

        <div className="mt-6 grid gap-3">
          {exercise.options.map((option) => {
            let borderColor = "border-gray-200 hover:border-green-300";
            if (selectedOption === option.id && !showExplanation) {
              borderColor = "border-green-500 bg-green-50";
            } else if (showExplanation && option.isCorrect) {
              borderColor = "border-green-500 bg-green-100";
            } else if (showExplanation && !lastAnswerCorrect && selectedOption === option.id) {
              borderColor = "border-red-500 bg-red-50";
            }

            return (
              <motion.button
                key={option.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if (!showExplanation) {
                    setSelectedOption(option.id);
                    sounds.click();
                  }
                }}
                disabled={showExplanation}
                className={`rounded-xl border-2 p-4 text-left text-base font-medium transition-colors ${borderColor}`}
              >
                {option.text}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      <div className="mt-auto pt-6">
        {!showExplanation ? (
          <button
            onClick={handleCheck}
            disabled={!selectedOption}
            className="w-full rounded-xl bg-green-500 py-3 text-lg font-bold text-white shadow-md transition-colors hover:bg-green-600 disabled:bg-gray-300"
          >
            Comprobar
          </button>
        ) : (
          <div
            className={`rounded-xl p-4 ${
              lastAnswerCorrect ? "bg-green-100" : "bg-red-100"
            }`}
          >
            <p className={`font-bold ${lastAnswerCorrect ? "text-green-700" : "text-red-700"}`}>
              {lastAnswerCorrect ? "Correcto!" : "Incorrecto"}
            </p>
            {exercise.explanation && (
              <p className="mt-1 text-sm text-gray-600">{exercise.explanation}</p>
            )}
            <button
              onClick={handleNext}
              className={`mt-3 w-full rounded-xl py-3 text-lg font-bold text-white ${
                lastAnswerCorrect
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-red-500 hover:bg-red-600"
              }`}
            >
              Continuar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
