/**
 * Returns true if the streak should be extended (last activity was yesterday or today).
 * Returns false if the streak is broken (more than 1 day gap).
 */
export function shouldExtendStreak(lastCompletedAt: string | null): boolean {
  if (!lastCompletedAt) return false;

  const last = new Date(lastCompletedAt);
  const now = new Date();

  // Reset hours to compare dates only
  const lastDay = new Date(last.getFullYear(), last.getMonth(), last.getDate());
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  const diffMs = today.getTime() - lastDay.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  // Streak continues if last completed was yesterday (1) or today (0)
  return diffDays <= 1;
}

export function getStreakMessage(streak: number): string {
  if (streak === 0) return "Empieza tu racha hoy!";
  if (streak < 3) return `${streak} dias seguidos!`;
  if (streak < 7) return `${streak} dias — vas genial!`;
  if (streak < 30) return `${streak} dias — imparable!`;
  return `${streak} dias — leyenda!`;
}
