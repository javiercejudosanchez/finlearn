import { create } from "zustand";
import type { User, StreakData } from "@/types";

interface UserStoreState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  setUser: (user: User) => void;
  clearUser: () => void;
  updateXP: (amount: number) => void;
  updateStreak: (streak: Partial<StreakData>) => void;
}

export const useUserStore = create<UserStoreState>()((set) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,

  setUser: (user) =>
    set({ user, isLoading: false, isAuthenticated: true }),

  clearUser: () =>
    set({ user: null, isLoading: false, isAuthenticated: false }),

  updateXP: (amount) =>
    set((s) => {
      if (!s.user) return s;
      const newXp = s.user.xp + amount;
      return {
        user: {
          ...s.user,
          xp: newXp,
          level: Math.floor(newXp / 100) + 1,
        },
      };
    }),

  updateStreak: (streak) =>
    set((s) => {
      if (!s.user) return s;
      return {
        user: {
          ...s.user,
          streak: streak.currentStreak ?? s.user.streak,
          lastActiveAt: streak.lastActiveDate ?? s.user.lastActiveAt,
        },
      };
    }),
}));

export default useUserStore;
