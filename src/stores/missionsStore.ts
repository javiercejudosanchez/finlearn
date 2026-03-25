import { create } from "zustand";

function getMonday(): string {
  const now = new Date();
  const day = now.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  const monday = new Date(now);
  monday.setDate(now.getDate() + diff);
  monday.setHours(0, 0, 0, 0);
  return monday.toISOString().split("T")[0];
}

function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

function load<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try { const v = localStorage.getItem(key); return v !== null ? (JSON.parse(v) as T) : fallback; }
  catch { return fallback; }
}
function save(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

interface MissionsData {
  weekStart: string;
  testsThisWeek: number;
  xpThisWeek: number;
  daysThisWeek: string[];
  hasPerfectTest: boolean;
  claimedBonuses: string[];
  testsToday: number;
  todayDate: string;
}

const EMPTY: MissionsData = {
  weekStart: getMonday(),
  testsThisWeek: 0,
  xpThisWeek: 0,
  daysThisWeek: [],
  hasPerfectTest: false,
  claimedBonuses: [],
  testsToday: 0,
  todayDate: getToday(),
};

function getOrReset(): MissionsData {
  const saved = load<MissionsData>("fl_missions", EMPTY);
  const monday = getMonday();
  const today = getToday();
  if (saved.weekStart !== monday) {
    const fresh = { ...EMPTY, weekStart: monday, todayDate: today };
    save("fl_missions", fresh);
    return fresh;
  }
  if (saved.todayDate !== today) {
    const fresh = { ...saved, testsToday: 0, todayDate: today };
    save("fl_missions", fresh);
    return fresh;
  }
  return saved;
}

interface MissionsState extends MissionsData {
  addTestResult: (xpEarned: number, isPerfect: boolean) => void;
  claimBonus: (missionId: string) => void;
  checkReset: () => void;
}

export const useMissionsStore = create<MissionsState>()((set, get) => {
  const initial = getOrReset();
  return {
    ...initial,

    checkReset: () => {
      const current = getOrReset();
      const state = get();
      if (current.weekStart !== state.weekStart || current.todayDate !== state.todayDate) {
        set(current);
      }
    },

    addTestResult: (xpEarned, isPerfect) => {
      const state = get();
      const today = getToday();
      const daysSet = new Set(state.daysThisWeek);
      daysSet.add(today);
      const updated: MissionsData = {
        weekStart: state.weekStart,
        testsThisWeek: state.testsThisWeek + 1,
        xpThisWeek: state.xpThisWeek + xpEarned,
        daysThisWeek: Array.from(daysSet),
        hasPerfectTest: state.hasPerfectTest || isPerfect,
        claimedBonuses: state.claimedBonuses,
        testsToday: state.testsToday + 1,
        todayDate: today,
      };
      save("fl_missions", updated);
      set(updated);
    },

    claimBonus: (missionId) => {
      const state = get();
      if (state.claimedBonuses.includes(missionId)) return;
      const updated = { ...state, claimedBonuses: [...state.claimedBonuses, missionId] };
      save("fl_missions", updated);
      set(updated);
    },
  };
});
