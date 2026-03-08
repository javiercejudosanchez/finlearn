"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useLessonStore } from "@/stores/lessonStore";
import confetti from "@/lib/confetti";

export function LessonComplete() {
  const router = useRouter();
  const { currentLesson, mistakes, xpEarned, heartsLeft } = useLessonStore();

  const total = currentLesson?.exercises.length ?? 0;
  const correct = total - mistakes;
  const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
  const failed = heartsLeft <= 0;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      onAnimationComplete={() => { if (!failed) confetti(); }}
      className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center gap-6 px-4"
    >
      <div className="text-6xl">
        {failed ? "💔" : pct === 100 ? "🏆" : pct >= 70 ? "⭐" : "📊"}
      </div>
      <h1 className="text-3xl font-extrabold text-gray-800">
        {failed ? "Sin vidas!" : "Leccion completada!"}
      </h1>
      {!failed && (
        <>
          <p className="text-lg text-gray-600">
            {correct}/{total} respuestas correctas ({pct}%)
          </p>
          <div className="flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-lg font-bold text-amber-600">
            +{xpEarned} XP
          </div>
        </>
      )}
      {failed && (
        <p className="text-lg text-gray-600">Intentalo de nuevo para completar la leccion.</p>
      )}
      <button
        onClick={() => router.push("/learn")}
        className="mt-4 rounded-xl bg-green-500 px-8 py-3 text-lg font-bold text-white shadow-md hover:bg-green-600"
      >
        {failed ? "Volver" : "Continuar"}
      </button>
    </motion.div>
  );
}
