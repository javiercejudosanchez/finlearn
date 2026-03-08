import { describe, it, expect, beforeEach } from "vitest";
import { useLessonStore } from "@/stores/lessonStore";
import type { LessonWithExercises } from "@/types";

const mockLesson: LessonWithExercises = {
  id: "lesson-1",
  unitId: "unit-1",
  title: "Test Lesson",
  order: 0,
  xpReward: 10,
  exercises: [
    {
      id: "ex-1",
      lessonId: "lesson-1",
      type: "MULTIPLE_CHOICE",
      question: "Question 1?",
      explanation: "Explanation 1",
      order: 0,
      options: [
        { id: "opt-1a", exerciseId: "ex-1", text: "Wrong", isCorrect: false, order: 0 },
        { id: "opt-1b", exerciseId: "ex-1", text: "Correct", isCorrect: true, order: 1 },
      ],
    },
    {
      id: "ex-2",
      lessonId: "lesson-1",
      type: "TRUE_FALSE",
      question: "Question 2?",
      explanation: "Explanation 2",
      order: 1,
      options: [
        { id: "opt-2a", exerciseId: "ex-2", text: "True", isCorrect: true, order: 0 },
        { id: "opt-2b", exerciseId: "ex-2", text: "False", isCorrect: false, order: 1 },
      ],
    },
    {
      id: "ex-3",
      lessonId: "lesson-1",
      type: "FILL_BLANK",
      question: "Question 3?",
      explanation: "Explanation 3",
      order: 2,
      options: [
        { id: "opt-3a", exerciseId: "ex-3", text: "Right", isCorrect: true, order: 0 },
        { id: "opt-3b", exerciseId: "ex-3", text: "Wrong", isCorrect: false, order: 1 },
      ],
    },
  ],
};

describe("lessonStore", () => {
  beforeEach(() => {
    useLessonStore.getState().startLesson(mockLesson);
  });

  it("startLesson loads exercises and resets state", () => {
    const s = useLessonStore.getState();
    expect(s.currentLesson).toBe(mockLesson);
    expect(s.currentExerciseIndex).toBe(0);
    expect(s.mistakes).toBe(0);
    expect(s.xpEarned).toBe(0);
    expect(s.heartsLeft).toBe(5);
    expect(s.isComplete).toBe(false);
    expect(s.showExplanation).toBe(false);
    expect(s.lastAnswerCorrect).toBeNull();
    expect(s.answers.size).toBe(0);
  });

  it("submitAnswer correct adds 10 XP and does not lose hearts", () => {
    useLessonStore.getState().submitAnswer("opt-1b", true);
    const s = useLessonStore.getState();
    expect(s.xpEarned).toBe(10);
    expect(s.heartsLeft).toBe(5);
    expect(s.mistakes).toBe(0);
    expect(s.showExplanation).toBe(true);
    expect(s.lastAnswerCorrect).toBe(true);
    expect(s.answers.get("ex-1")).toBe("opt-1b");
  });

  it("submitAnswer incorrect loses 1 heart and adds 1 mistake", () => {
    useLessonStore.getState().submitAnswer("opt-1a", false);
    const s = useLessonStore.getState();
    expect(s.xpEarned).toBe(0);
    expect(s.heartsLeft).toBe(4);
    expect(s.mistakes).toBe(1);
    expect(s.showExplanation).toBe(true);
    expect(s.lastAnswerCorrect).toBe(false);
  });

  it("heartsLeft === 0 marks isComplete", () => {
    // Lose all 5 hearts
    for (let i = 0; i < 5; i++) {
      useLessonStore.getState().submitAnswer("wrong", false);
      if (i < 4) useLessonStore.getState().nextExercise();
    }
    const s = useLessonStore.getState();
    expect(s.heartsLeft).toBe(0);
    expect(s.isComplete).toBe(true);
  });

  it("nextExercise advances the index and clears explanation", () => {
    useLessonStore.getState().submitAnswer("opt-1b", true);
    expect(useLessonStore.getState().showExplanation).toBe(true);

    useLessonStore.getState().nextExercise();
    const s = useLessonStore.getState();
    expect(s.currentExerciseIndex).toBe(1);
    expect(s.showExplanation).toBe(false);
    expect(s.lastAnswerCorrect).toBeNull();
    expect(s.isComplete).toBe(false);
  });

  it("completing last exercise marks isComplete", () => {
    // Answer all 3 correctly
    useLessonStore.getState().submitAnswer("opt-1b", true);
    useLessonStore.getState().nextExercise();
    useLessonStore.getState().submitAnswer("opt-2a", true);
    useLessonStore.getState().nextExercise();
    useLessonStore.getState().submitAnswer("opt-3a", true);
    useLessonStore.getState().nextExercise();

    const s = useLessonStore.getState();
    expect(s.isComplete).toBe(true);
    expect(s.xpEarned).toBe(30);
    expect(s.mistakes).toBe(0);
  });

  it("score = ((total - mistakes) / total) * 100", () => {
    // 1 correct, 1 wrong, 1 correct
    useLessonStore.getState().submitAnswer("opt-1b", true);
    useLessonStore.getState().nextExercise();
    useLessonStore.getState().submitAnswer("opt-2b", false);
    useLessonStore.getState().nextExercise();
    useLessonStore.getState().submitAnswer("opt-3a", true);
    useLessonStore.getState().nextExercise();

    const s = useLessonStore.getState();
    const total = mockLesson.exercises.length;
    const score = Math.round(((total - s.mistakes) / total) * 100);
    expect(score).toBe(67); // (3-1)/3 * 100 = 66.67 → 67
    expect(s.isComplete).toBe(true);
  });

  it("getCurrentExercise returns the current exercise", () => {
    const ex = useLessonStore.getState().getCurrentExercise();
    expect(ex?.id).toBe("ex-1");

    useLessonStore.getState().submitAnswer("opt-1b", true);
    useLessonStore.getState().nextExercise();

    const ex2 = useLessonStore.getState().getCurrentExercise();
    expect(ex2?.id).toBe("ex-2");
  });

  it("resetLesson resets to initial state keeping currentLesson", () => {
    useLessonStore.getState().submitAnswer("opt-1b", true);
    useLessonStore.getState().nextExercise();
    useLessonStore.getState().resetLesson();

    const s = useLessonStore.getState();
    expect(s.currentExerciseIndex).toBe(0);
    expect(s.mistakes).toBe(0);
    expect(s.xpEarned).toBe(0);
    expect(s.heartsLeft).toBe(5);
    expect(s.isComplete).toBe(false);
    expect(s.currentLesson).toBe(mockLesson); // lesson kept
  });
});
