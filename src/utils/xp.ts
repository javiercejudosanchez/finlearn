const XP_PER_LEVEL = 100;
const STREAK_BONUS_MULTIPLIER = 0.1; // +10% per streak day, max +50%

export function calculateXpGain(baseXp: number, streak: number): number {
  const bonus = Math.min(streak * STREAK_BONUS_MULTIPLIER, 0.5);
  return Math.round(baseXp * (1 + bonus));
}

export function getLevelInfo(totalXp: number) {
  const level = Math.floor(totalXp / XP_PER_LEVEL) + 1;
  const currentLevelXp = totalXp % XP_PER_LEVEL;
  return {
    level,
    currentLevelXp,
    xpForNextLevel: XP_PER_LEVEL,
    progress: (currentLevelXp / XP_PER_LEVEL) * 100,
  };
}
