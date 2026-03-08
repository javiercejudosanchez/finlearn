import { describe, it, expect } from "vitest";
import { calculateXpGain, getLevelInfo } from "@/utils/xp";

describe("xp utils", () => {
  it("calculates base XP without streak", () => {
    expect(calculateXpGain(10, 0)).toBe(10);
  });

  it("adds streak bonus (+10% per day, max 50%)", () => {
    expect(calculateXpGain(100, 3)).toBe(130); // +30%
    expect(calculateXpGain(100, 10)).toBe(150); // capped at +50%
  });

  it("calculates level info", () => {
    const info = getLevelInfo(250);
    expect(info.level).toBe(3);
    expect(info.currentLevelXp).toBe(50);
    expect(info.progress).toBe(50);
  });
});
