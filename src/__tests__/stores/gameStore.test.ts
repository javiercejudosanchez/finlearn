import { describe, it, expect, beforeEach } from "vitest";
import { useGameStore } from "@/stores/gameStore";

describe("gameStore", () => {
  beforeEach(() => {
    // Reset to initial state
    useGameStore.setState({
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
    });
  });

  it("addXP sums correctly and recalculates level", () => {
    useGameStore.getState().addXP(50, "lesson_complete");
    expect(useGameStore.getState().xp).toBe(50);
    expect(useGameStore.getState().level).toBe(1); // 50/100 + 1 = 1

    useGameStore.getState().addXP(60, "lesson_complete");
    expect(useGameStore.getState().xp).toBe(110);
    expect(useGameStore.getState().level).toBe(2); // 110/100 + 1 = 2

    useGameStore.getState().addXP(200, "perfect_lesson");
    expect(useGameStore.getState().xp).toBe(310);
    expect(useGameStore.getState().level).toBe(4); // 310/100 + 1 = 4
  });

  it("spendHeart decrements and does not go below 0", () => {
    expect(useGameStore.getState().hearts).toBe(5);

    useGameStore.getState().spendHeart();
    expect(useGameStore.getState().hearts).toBe(4);

    // Spend all remaining
    for (let i = 0; i < 10; i++) {
      useGameStore.getState().spendHeart();
    }
    expect(useGameStore.getState().hearts).toBe(0);
  });

  it("refillHearts restores to 5", () => {
    useGameStore.getState().spendHeart();
    useGameStore.getState().spendHeart();
    expect(useGameStore.getState().hearts).toBe(3);

    useGameStore.getState().refillHearts();
    expect(useGameStore.getState().hearts).toBe(5);
  });

  it("checkAndUpdateStreak increments if last activity was yesterday", () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    useGameStore.setState({
      streakData: {
        currentStreak: 3,
        longestStreak: 5,
        lastActiveDate: yesterday.toISOString(),
        isActiveToday: false,
      },
    });

    useGameStore.getState().checkAndUpdateStreak();

    const s = useGameStore.getState();
    expect(s.streakData.currentStreak).toBe(4);
    expect(s.streakData.isActiveToday).toBe(true);
    expect(s.streak).toBe(4);
  });

  it("checkAndUpdateStreak resets to 1 if 2+ days passed", () => {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    useGameStore.setState({
      streakData: {
        currentStreak: 10,
        longestStreak: 15,
        lastActiveDate: threeDaysAgo.toISOString(),
        isActiveToday: false,
      },
    });

    useGameStore.getState().checkAndUpdateStreak();

    const s = useGameStore.getState();
    expect(s.streakData.currentStreak).toBe(1);
    expect(s.streakData.longestStreak).toBe(15); // not decreased
    expect(s.streak).toBe(1);
  });

  it("checkAndUpdateStreak does not change streak if already active today", () => {
    const today = new Date();

    useGameStore.setState({
      streak: 5,
      streakData: {
        currentStreak: 5,
        longestStreak: 5,
        lastActiveDate: today.toISOString(),
        isActiveToday: false,
      },
    });

    useGameStore.getState().checkAndUpdateStreak();

    const s = useGameStore.getState();
    expect(s.streakData.currentStreak).toBe(5);
    expect(s.streakData.isActiveToday).toBe(true);
  });

  it("checkAndUpdateStreak updates longestStreak when current exceeds it", () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    useGameStore.setState({
      streakData: {
        currentStreak: 5,
        longestStreak: 5,
        lastActiveDate: yesterday.toISOString(),
        isActiveToday: false,
      },
    });

    useGameStore.getState().checkAndUpdateStreak();

    const s = useGameStore.getState();
    expect(s.streakData.currentStreak).toBe(6);
    expect(s.streakData.longestStreak).toBe(6);
  });

  it("syncFromAPI hydrates state correctly", () => {
    useGameStore.getState().syncFromAPI({
      xp: 500,
      hearts: 3,
      streak: {
        currentStreak: 7,
        longestStreak: 14,
        lastActiveDate: "2026-03-06T00:00:00.000Z",
        isActiveToday: false,
      },
    });

    const s = useGameStore.getState();
    expect(s.xp).toBe(500);
    expect(s.hearts).toBe(3);
    expect(s.streak).toBe(7);
    expect(s.level).toBe(6); // 500/100 + 1
    expect(s.streakData.longestStreak).toBe(14);
  });
});
