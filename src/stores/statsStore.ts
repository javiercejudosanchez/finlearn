import { create } from "zustand";

function load<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try { const v = localStorage.getItem(key); return v !== null ? (JSON.parse(v) as T) : fallback; }
  catch { return fallback; }
}
function save(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

interface StatsState {
  testsCompleted: number;
  questionsAnswered: number;
  questionsCorrect: number;
  bestAnswerStreak: number;
  currentAnswerStreak: number;
  addTestCompleted: () => void;
  recordAnswers: (correct: number, total: number) => void;
  addCorrectAnswer: () => void;
  addWrongAnswerStat: () => void;
}

export const useStatsStore = create<StatsState>()((set) => ({
  testsCompleted: load("fl_stats_tests", 0),
  questionsAnswered: load("fl_stats_qa", 0),
  questionsCorrect: load("fl_stats_qc", 0),
  bestAnswerStreak: load("fl_stats_best", 0),
  currentAnswerStreak: load("fl_stats_cur", 0),

  addTestCompleted: () => set((s) => {
    const n = s.testsCompleted + 1;
    save("fl_stats_tests", n);
    return { testsCompleted: n };
  }),

  recordAnswers: (correct, total) => set((s) => {
    const qa = s.questionsAnswered + total;
    const qc = s.questionsCorrect + correct;
    save("fl_stats_qa", qa);
    save("fl_stats_qc", qc);
    return { questionsAnswered: qa, questionsCorrect: qc };
  }),

  addCorrectAnswer: () => set((s) => {
    const streak = s.currentAnswerStreak + 1;
    const best = Math.max(s.bestAnswerStreak, streak);
    save("fl_stats_best", best);
    save("fl_stats_cur", streak);
    return { currentAnswerStreak: streak, bestAnswerStreak: best };
  }),

  addWrongAnswerStat: () => set(() => {
    save("fl_stats_cur", 0);
    return { currentAnswerStreak: 0 };
  }),
}));
