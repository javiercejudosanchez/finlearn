import { describe, it, expect } from "vitest";
import { shouldExtendStreak, getStreakMessage } from "@/utils/streak";

describe("streak utils", () => {
  it("returns false for null", () => {
    expect(shouldExtendStreak(null)).toBe(false);
  });

  it("extends streak for today", () => {
    expect(shouldExtendStreak(new Date().toISOString())).toBe(true);
  });

  it("extends streak for yesterday", () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    expect(shouldExtendStreak(yesterday.toISOString())).toBe(true);
  });

  it("breaks streak after 2+ days", () => {
    const old = new Date();
    old.setDate(old.getDate() - 3);
    expect(shouldExtendStreak(old.toISOString())).toBe(false);
  });

  it("returns appropriate messages", () => {
    expect(getStreakMessage(0)).toContain("Empieza");
    expect(getStreakMessage(5)).toContain("genial");
    expect(getStreakMessage(31)).toContain("leyenda");
  });
});
