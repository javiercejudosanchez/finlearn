import { create } from "zustand";
import type { LessonWithExercises, Exercise } from "@/types";

interface LessonStoreState {
  // LessonState fields from types
  currentExerciseIndex: number;
  answers: Map<string, string>;
  mistakes: number;
  xpEarned: number;
  isComplete: boolean;

  // Additional fields
  currentLesson: LessonWithExercises | null;
  heartsLeft: number;
  showExplanation: boolean;
  lastAnswerCorrect: boolean | null;

  // Actions
  startLesson: (lesson: LessonWithExercises) => void;
  submitAnswer: (answer: unknown, isCorrect: boolean) => void;
  nextExercise: () => void;
  resetLesson: () => void;
  getCurrentExercise: () => Exercise | null;
}

const INITIAL_HEARTS = 5;
const XP_PER_CORRECT = 10;

export const useLessonStore = create<LessonStoreState>()((set, get) => ({
  currentExerciseIndex: 0,
  answers: new Map(),
  mistakes: 0,
  xpEarned: 0,
  isComplete: false,
  currentLesson: null,
  heartsLeft: INITIAL_HEARTS,
  showExplanation: false,
  lastAnswerCorrect: null,

  startLesson: (lesson) =>
    set({
      currentLesson: lesson,
      currentExerciseIndex: 0,
      answers: new Map(),
      mistakes: 0,
      xpEarned: 0,
      isComplete: false,
      heartsLeft: INITIAL_HEARTS,
      showExplanation: false,
      lastAnswerCorrect: null,
    }),

  submitAnswer: (answer, isCorrect) => {
    const { currentLesson, currentExerciseIndex, answers } = get();
    if (!currentLesson) return;

    const exercise = currentLesson.exercises[currentExerciseIndex];
    if (!exercise) return;

    const newAnswers = new Map(answers);
    newAnswers.set(exercise.id, String(answer));

    if (isCorrect) {
      set((s) => ({
        answers: newAnswers,
        xpEarned: s.xpEarned + XP_PER_CORRECT,
        showExplanation: true,
        lastAnswerCorrect: true,
      }));
    } else {
      set((s) => {
        const newHearts = s.heartsLeft - 1;
        return {
          answers: newAnswers,
          mistakes: s.mistakes + 1,
          heartsLeft: newHearts,
          showExplanation: true,
          lastAnswerCorrect: false,
          isComplete: newHearts <= 0,
        };
      });
    }
  },

  nextExercise: () => {
    const { currentExerciseIndex, currentLesson } = get();
    if (!currentLesson) return;

    const nextIndex = currentExerciseIndex + 1;
    const isLast = nextIndex >= currentLesson.exercises.length;

    set({
      currentExerciseIndex: isLast ? currentExerciseIndex : nextIndex,
      showExplanation: false,
      lastAnswerCorrect: null,
      isComplete: isLast,
    });
  },

  resetLesson: () => {
    const { currentLesson } = get();
    if (!currentLesson) return;

    set({
      currentExerciseIndex: 0,
      answers: new Map(),
      mistakes: 0,
      xpEarned: 0,
      isComplete: false,
      heartsLeft: INITIAL_HEARTS,
      showExplanation: false,
      lastAnswerCorrect: null,
    });
  },

  getCurrentExercise: () => {
    const { currentLesson, currentExerciseIndex } = get();
    if (!currentLesson) return null;
    return currentLesson.exercises[currentExerciseIndex] ?? null;
  },
}));

export default useLessonStore;
