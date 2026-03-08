import { create } from "zustand";
import type { GameState, StreakData } from "@/types";

interface GameStoreState extends GameState {
  streakData: StreakData;

  spendHeart: () => void;
  refillHearts: () => void;
  addXP: (amount: number, source: string) => void;
  checkAndUpdateStreak: () => void;
  syncFromAPI: (data: { xp: number; streak: StreakData; hearts: number }) => void;
}

function isSameDay(d1: Date, d2: Date): boolean {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

function isYesterday(date: Date, today: Date): boolean {
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  return isSameDay(date, yesterday);
}

export const useGameStore = create<GameStoreState>()((set, get) => ({
  hearts: 5,
  xp: 0,
  streak: 0,
  level: 1,
  streakData: {
    currentStreak: 0,
    longestStreak: 0,
    lastActiveDate: null,
    isActiveToday: false,
  },

  spendHeart: () =>
    set((s) => ({ hearts: Math.max(0, s.hearts - 1) })),

  refillHearts: () =>
    set({ hearts: 5 }),

  addXP: (amount) =>
    set((s) => {
      const newXp = s.xp + amount;
      return {
        xp: newXp,
        level: Math.floor(newXp / 100) + 1,
      };
    }),

  checkAndUpdateStreak: () => {
    const { streakData } = get();
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    let { currentStreak, longestStreak } = streakData;

    if (streakData.lastActiveDate) {
      const lastActive = new Date(streakData.lastActiveDate);

      if (isSameDay(lastActive, today)) {
        // Already active today — just mark it
        set((s) => ({
          streakData: { ...s.streakData, isActiveToday: true },
        }));
        return;
      }

      if (isYesterday(lastActive, today)) {
        currentStreak += 1;
      } else {
        // Gap of 2+ days — streak broken
        currentStreak = 1;
      }
    } else {
      // First ever activity
      currentStreak = 1;
    }

    longestStreak = Math.max(longestStreak, currentStreak);

    set({
      streak: currentStreak,
      streakData: {
        currentStreak,
        longestStreak,
        lastActiveDate: today.toISOString(),
        isActiveToday: true,
      },
    });
  },

  syncFromAPI: (data) =>
    set({
      xp: data.xp,
      hearts: data.hearts,
      streak: data.streak.currentStreak,
      level: Math.floor(data.xp / 100) + 1,
      streakData: data.streak,
    }),
}));

export default useGameStore;
