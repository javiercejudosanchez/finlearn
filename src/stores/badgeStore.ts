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

interface BadgeState {
  earnedBadges: string[];
  newlyUnlocked: string | null;
  unlock: (badgeId: string) => void;
  dismissNotification: () => void;
}

export const useBadgeStore = create<BadgeState>()((set, get) => ({
  earnedBadges: load("fl_badges", [] as string[]),
  newlyUnlocked: null,

  unlock: (badgeId) => {
    const { earnedBadges } = get();
    if (earnedBadges.includes(badgeId)) return;
    const updated = [...earnedBadges, badgeId];
    save("fl_badges", updated);
    set({ earnedBadges: updated, newlyUnlocked: badgeId });
  },

  dismissNotification: () => set({ newlyUnlocked: null }),
}));
