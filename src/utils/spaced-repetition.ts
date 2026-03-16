/**
 * Simple spaced repetition based on SM-2 algorithm.
 * Determines when a lesson/concept should be reviewed.
 */

interface ReviewItem {
  lessonId: string;
  easeFactor: number;   // starts at 2.5
  interval: number;     // days until next review
  repetitions: number;
  nextReviewAt: Date;
}

/** Quality: 0 = total blackout, 5 = perfect recall */
export function calculateNextReview(
  item: ReviewItem,
  quality: number // 0-5
): ReviewItem {
  const q = Math.max(0, Math.min(5, quality));

  let { easeFactor, interval, repetitions } = item;

  if (q < 3) {
    // Failed recall — restart
    repetitions = 0;
    interval = 1;
  } else {
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions++;
  }

  // Update ease factor (minimum 1.3)
  easeFactor = Math.max(
    1.3,
    easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  );

  const nextReviewAt = new Date();
  nextReviewAt.setDate(nextReviewAt.getDate() + interval);

  return {
    lessonId: item.lessonId,
    easeFactor,
    interval,
    repetitions,
    nextReviewAt,
  };
}

export function createNewReviewItem(lessonId: string): ReviewItem {
  return {
    lessonId,
    easeFactor: 2.5,
    interval: 0,
    repetitions: 0,
    nextReviewAt: new Date(),
  };
}

/** Maps lesson score (0-100%) to SM-2 quality (0-5) */
export function scoreToQuality(scorePercent: number): number {
  if (scorePercent >= 95) return 5;
  if (scorePercent >= 80) return 4;
  if (scorePercent >= 60) return 3;
  if (scorePercent >= 40) return 2;
  if (scorePercent >= 20) return 1;
  return 0;
}

export type WrongAnswerRecord = {
  exerciseId: string;
  count?: number;
};

/**
 * Selects up to `limit` exercises, prioritising those the user has
 * answered wrong before (spaced-repetition boost).
 */
export function selectExercises<T extends { id: string }>(
  exercises: T[],
  wrongs: WrongAnswerRecord[],
  limit: number
): T[] {
  const wrongIds = new Set(wrongs.map((w) => w.exerciseId));
  const priority = exercises.filter((e) => wrongIds.has(e.id));
  const rest = exercises.filter((e) => !wrongIds.has(e.id));
  return [...priority, ...rest].slice(0, limit);
}
