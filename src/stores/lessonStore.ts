import { create } from "zustand";
import type { LessonWithExercises, Exercise } from "@/types";

interface LessonStoreState {
  currentExerciseIndex: number;
  answers: Map<string, string>;
  mistakes: number;
  xpEarned: number;   // 2 per correct answer
  isComplete: boolean;
  currentLesson: LessonWithExercises | null;
  showExplanation: boolean;
  lastAnswerCorrect: boolean | null;

  startLesson: (lesson: LessonWithExercises) => void;
  submitAnswer: (answer: unknown, isCorrect: boolean) => void;
  nextExercise: () => void;
  resetLesson: () => void;
  getCurrentExercise: () => Exercise | null;
}

const XP_PER_CORRECT = 2;

export const useLessonStore = create<LessonStoreState>()((set, get) => ({
  currentExerciseIndex: 0,
  answers: new Map(),
  mistakes: 0,
  xpEarned: 0,
  isComplete: false,
  currentLesson: null,
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
      set((s) => ({
        answers: newAnswers,
        mistakes: s.mistakes + 1,
        showExplanation: true,
        lastAnswerCorrect: false,
      }));
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
