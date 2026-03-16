import { create } from "zustand";
import type { GameState, StreakData } from "@/types";

// ── localStorage helpers ──────────────────────────────────
function load<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const v = localStorage.getItem(key);
    return v !== null ? (JSON.parse(v) as T) : fallback;
  } catch {
    return fallback;
  }
}
function save(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

const LS = { hearts: "fl_hearts", xp: "fl_xp", mistakes: "fl_mistakes" };
const initHearts = load(LS.hearts, 5);
const initXP     = load(LS.xp, 0);
const initMist   = load(LS.mistakes, 0);

// ── Types ─────────────────────────────────────────────────
interface GameStoreState extends GameState {
  globalMistakeCount: number;
  streakData: StreakData;

  addXP: (amount: number, source?: string) => void;
  deductXP: (amount: number) => void;
  addWrongAnswer: (userId?: string | null) => void;
  spendHeart: () => void;
  refillHearts: () => void;
  checkAndUpdateStreak: () => void;
  syncFromAPI: (data: { xp: number; streak: StreakData; hearts: number }) => void;
}

function isSameDay(d1: Date, d2: Date) {
  return d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
}
function isYesterday(date: Date, today: Date) {
  const y = new Date(today); y.setDate(y.getDate() - 1); return isSameDay(date, y);
}

export const useGameStore = create<GameStoreState>()((set, get) => ({
  hearts: initHearts,
  xp: initXP,
  streak: 0,
  level: Math.floor(initXP / 100) + 1,
  globalMistakeCount: initMist,
  streakData: { currentStreak: 0, longestStreak: 0, lastActiveDate: null, isActiveToday: false },

  addXP: (amount) =>
    set((s) => {
      const newXp = s.xp + amount;
      save(LS.xp, newXp);
      return { xp: newXp, level: Math.floor(newXp / 100) + 1 };
    }),

  deductXP: (amount) =>
    set((s) => {
      const newXp = Math.max(0, s.xp - amount);
      save(LS.xp, newXp);
      return { xp: newXp };
    }),

  addWrongAnswer: (userId) => {
    const { globalMistakeCount, hearts } = get();
    const newCount = globalMistakeCount + 1;
    if (newCount >= 70) {
      const newHearts = Math.max(0, hearts - 1);
      save(LS.hearts, newHearts);
      save(LS.mistakes, 0);
      set({ hearts: newHearts, globalMistakeCount: 0 });
      if (userId) {
        fetch("/api/user", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, lives: newHearts }),
        }).catch(() => {});
      }
    } else {
      save(LS.mistakes, newCount);
      set({ globalMistakeCount: newCount });
    }
  },

  spendHeart: () =>
    set((s) => { const h = Math.max(0, s.hearts - 1); save(LS.hearts, h); return { hearts: h }; }),

  refillHearts: () => { save(LS.hearts, 5); set({ hearts: 5 }); },

  checkAndUpdateStreak: () => {
    const { streakData } = get();
    const today = new Date(); today.setHours(0, 0, 0, 0);
    let { currentStreak, longestStreak } = streakData;
    if (streakData.lastActiveDate) {
      const last = new Date(streakData.lastActiveDate);
      if (isSameDay(last, today)) {
        set((s) => ({ streakData: { ...s.streakData, isActiveToday: true } })); return;
      }
      currentStreak = isYesterday(last, today) ? currentStreak + 1 : 1;
    } else { currentStreak = 1; }
    longestStreak = Math.max(longestStreak, currentStreak);
    set({ streak: currentStreak, streakData: { currentStreak, longestStreak, lastActiveDate: today.toISOString(), isActiveToday: true } });
  },

  syncFromAPI: (data) => {
    save(LS.hearts, data.hearts);
    save(LS.xp, data.xp);
    set({
      xp: data.xp,
      hearts: data.hearts,
      streak: data.streak.currentStreak,
      level: Math.floor(data.xp / 100) + 1,
      streakData: data.streak,
    });
  },
}));

export default useGameStore;
