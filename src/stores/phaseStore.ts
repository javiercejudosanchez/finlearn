import { create } from "zustand";

interface PhaseStoreState {
  lessonPhases: Record<string, number>;   // lessonId -> next phase index to complete
  totalXp: Record<string, number>;        // lessonId -> XP accumulated across phases
  totalMistakes: Record<string, number>;  // lessonId -> mistakes accumulated across phases
  setPhase: (lessonId: string, index: number) => void;
  accumulate: (lessonId: string, xp: number, mistakes: number) => void;
  resetLesson: (lessonId: string) => void;
}

// Use localStorage manually to avoid zustand/middleware import issues
function loadState(): Partial<PhaseStoreState> {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem("finlearn-phase-store");
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveState(state: PhaseStoreState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("finlearn-phase-store", JSON.stringify({
      lessonPhases: state.lessonPhases,
      totalXp: state.totalXp,
      totalMistakes: state.totalMistakes,
    }));
  } catch {
    // ignore
  }
}

const saved = loadState();

export const usePhaseStore = create<PhaseStoreState>()((set) => ({
  lessonPhases: (saved as PhaseStoreState).lessonPhases ?? {},
  totalXp: (saved as PhaseStoreState).totalXp ?? {},
  totalMistakes: (saved as PhaseStoreState).totalMistakes ?? {},

  setPhase: (lessonId, index) => {
    set((s) => {
      const next = { ...s, lessonPhases: { ...s.lessonPhases, [lessonId]: index } };
      saveState(next);
      return next;
    });
  },

  accumulate: (lessonId, xp, mistakes) => {
    set((s) => {
      const next = {
        ...s,
        totalXp: { ...s.totalXp, [lessonId]: (s.totalXp[lessonId] ?? 0) + xp },
        totalMistakes: { ...s.totalMistakes, [lessonId]: (s.totalMistakes[lessonId] ?? 0) + mistakes },
      };
      saveState(next);
      return next;
    });
  },

  resetLesson: (lessonId) => {
    set((s) => {
      const lessonPhases = { ...s.lessonPhases };
      const totalXp = { ...s.totalXp };
      const totalMistakes = { ...s.totalMistakes };
      delete lessonPhases[lessonId];
      delete totalXp[lessonId];
      delete totalMistakes[lessonId];
      const next = { ...s, lessonPhases, totalXp, totalMistakes };
      saveState(next);
      return next;
    });
  },
}));
