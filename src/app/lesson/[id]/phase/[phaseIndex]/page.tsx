"use client";

import { useMemo, useState, useEffect, useCallback, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, BookOpen, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LessonHeader } from "@/components/lesson/LessonHeader";
import { LessonFooter } from "@/components/lesson/LessonFooter";
import { LessonComplete } from "@/components/lesson/LessonComplete";
import { MultipleChoice } from "@/components/exercises/MultipleChoice";
import { Modal } from "@/components/ui/Modal";
import { playClick } from "@/lib/sounds";
import { useLessonStore } from "@/stores/lessonStore";
import { usePhaseStore } from "@/stores/phaseStore";
import { useGameStore } from "@/stores/gameStore";
import { getSupabase } from "@/lib/supabase";
import { Tiger, type TigerMood } from "@/components/mascot/Tiger";
import world1 from "@/content/worlds/world-1.json";
import world2 from "@/content/worlds/world-2.json";
import type {
  WorldContent,
  LessonContent,
  LessonWithExercises,
  Exercise,
  LessonPhase,
  TheoryCard,
} from "@/types";

const worlds = [world1, world2] as unknown as WorldContent[];

function findLessonWithPhases(id: string): (LessonContent & { phases: LessonPhase[] }) | null {
  for (const world of worlds) {
    for (const unit of world.units) {
      const lesson = unit.lessons.find((l) => l.id === id);
      if (lesson && lesson.phases && lesson.phases.length > 0) {
        return lesson as LessonContent & { phases: LessonPhase[] };
      }
    }
  }
  return null;
}

// ─── Theory Phase ─────────────────────────────────────────
function TheoryPhaseView({
  lessonTitle,
  cards,
  onFinish,
}: {
  lessonTitle: string;
  cards: TheoryCard[];
  onFinish: () => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const router = useRouter();
  const currentCard = cards[currentIndex];
  const isLast = currentIndex === cards.length - 1;
  const progress = cards.length > 0 ? ((currentIndex + 1) / cards.length) * 100 : 0;

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-blue-50 to-white">
      <div className="sticky top-0 z-10 border-b bg-white/90 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-2xl items-center gap-4 px-4">
          <button onClick={() => router.push("/learn")} className="rounded-lg p-2 text-gray-500 hover:bg-gray-100">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div className="flex flex-1 items-center gap-2">
            <BookOpen className="h-4 w-4 text-blue-500" />
            <span className="text-sm font-medium text-gray-600 truncate">{lessonTitle}</span>
          </div>
          <span className="text-sm font-bold text-blue-600">{currentIndex + 1} / {cards.length}</span>
        </div>
        <div className="h-1 bg-gray-100">
          <motion.div className="h-full bg-blue-500" animate={{ width: `${progress}%` }} transition={{ duration: 0.3 }} />
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center px-4 py-8">
        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait" custom={direction}>
            {currentCard && (
              <motion.div
                key={currentCard.id}
                custom={direction}
                initial={{ opacity: 0, x: direction * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * 60 }}
                transition={{ duration: 0.25 }}
                className="rounded-2xl border-2 border-blue-100 bg-white p-6 shadow-sm sm:p-8"
              >
                <h2 className="mb-4 text-xl font-extrabold text-gray-800">{currentCard.title}</h2>
                <div className="prose prose-gray max-w-none">
                  {currentCard.content.split("\n\n").map((p, i) => (
                    <p key={i} className="mb-4 text-sm leading-relaxed text-gray-700 sm:text-base">{p}</p>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-6 flex items-center justify-between gap-3">
            <Button variant="ghost" onClick={() => { setDirection(-1); setCurrentIndex((i) => Math.max(i - 1, 0)); }} disabled={currentIndex === 0} className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Anterior
            </Button>
            <div className="flex gap-1.5">
              {cards.map((_, i) => (
                <button key={i} onClick={() => { setDirection(i > currentIndex ? 1 : -1); setCurrentIndex(i); }}
                  className={`h-2 rounded-full transition-all ${i === currentIndex ? "w-6 bg-blue-500" : i < currentIndex ? "w-2 bg-blue-300" : "w-2 bg-gray-200"}`} />
              ))}
            </div>
            {isLast ? (
              <Button onClick={onFinish} className="flex items-center gap-2 bg-orange-400 hover:bg-orange-500">
                <CheckCircle className="h-4 w-4" /> Continuar
              </Button>
            ) : (
              <Button onClick={() => { setDirection(1); setCurrentIndex((i) => Math.min(i + 1, cards.length - 1)); }} className="flex items-center gap-2">
                Siguiente <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Test Phase ───────────────────────────────────────────
function TestPhaseView({
  lessonId, lessonTitle, phaseIndex, exercises, isLastPhase, nextPhaseIndex, totalTestPhases,
}: {
  lessonId: string; lessonTitle: string; phaseIndex: number;
  exercises: Exercise[]; isLastPhase: boolean; nextPhaseIndex: number; totalTestPhases: number;
}) {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [showExitModal, setShowExitModal] = useState(false);
  const [ready, setReady] = useState(false);
  const handledRef = useRef(false);

  const {
    currentExerciseIndex, mistakes, xpEarned, isComplete,
    showExplanation, lastAnswerCorrect,
    startLesson, submitAnswer, nextExercise, getCurrentExercise, currentLesson,
  } = useLessonStore();

  const { accumulate, setPhase, resetLesson: resetPhaseLesson, totalXp, totalMistakes } = usePhaseStore();
  const { hearts, addXP, deductXP, addWrongAnswer, checkAndUpdateStreak } = useGameStore();

  useEffect(() => {
    async function init() {
      const { data: { session } } = await getSupabase().auth.getSession();
      setUserId(session?.user?.id ?? null);
      const lessonForStore: LessonWithExercises = {
        id: `${lessonId}-phase-${phaseIndex}`,
        unitId: "", title: lessonTitle, order: phaseIndex, xpReward: 10, exercises,
      };
      startLesson(lessonForStore);
      setReady(true);
    }
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lessonId, phaseIndex]);

  useEffect(() => {
    if (!isComplete || !ready || handledRef.current) return;
    handledRef.current = true;
    accumulate(lessonId, xpEarned, mistakes);
    checkAndUpdateStreak();
    setPhase(lessonId, nextPhaseIndex);
    if (isLastPhase) {
      const totalXpForLesson = (totalXp[lessonId] ?? 0) + xpEarned;
      const totalMistakesForLesson = (totalMistakes[lessonId] ?? 0) + mistakes;
      if (userId) {
        fetch("/api/progress", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, lessonId, xpEarned: totalXpForLesson, mistakes: totalMistakesForLesson }),
        }).catch(() => {});
      }
      resetPhaseLesson(lessonId);
    } else {
      router.push(`/lesson/${lessonId}/phase/${nextPhaseIndex}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isComplete, ready]);

  const exercise = getCurrentExercise();
  const totalExercises = currentLesson?.exercises.length ?? 0;
  const progress = totalExercises > 0 ? ((currentExerciseIndex + (showExplanation ? 1 : 0)) / totalExercises) * 100 : 0;

  const handleAnswer = useCallback(
    (answer: string, isCorrect: boolean) => {
      submitAnswer(answer, isCorrect);
      if (isCorrect) {
        addXP(2);
      } else {
        deductXP(1);
        addWrongAnswer(userId);
        if (userId && exercise) {
          fetch("/api/wrong-answers", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, exerciseId: exercise.id, lessonId }),
          }).catch(() => {});
        }
      }
    },
    [submitAnswer, addXP, deductXP, addWrongAnswer, userId, exercise, lessonId]
  );

  const handleContinue = useCallback(() => { playClick(); nextExercise(); }, [nextExercise]);

  const tigerMood: TigerMood = showExplanation
    ? (lastAnswerCorrect ? "correct" : "wrong")
    : (currentExerciseIndex === 0 ? "start" : "start");

  if (!ready) {
    return <div className="flex min-h-screen items-center justify-center"><p className="text-6xl">📚</p></div>;
  }

  if (isComplete && isLastPhase) {
    return (
      <LessonComplete
        xpEarned={totalXp[lessonId] ?? xpEarned}
        mistakes={totalMistakes[lessonId] ?? mistakes}
        totalExercises={totalTestPhases * 10}
      />
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <LessonHeader progress={progress} hearts={hearts} onExit={() => setShowExitModal(true)} />
      <div className="flex flex-1 flex-col pt-14 pb-20">
        <div className="mx-auto w-full max-w-2xl flex-1 px-4 py-6 sm:py-8">
          <p className="mb-4 text-center text-xs font-medium text-gray-400">
            {lessonTitle} · Fase {phaseIndex + 1} de {totalTestPhases}
          </p>
          <div className="mb-4">
            <Tiger mood={tigerMood} />
          </div>
          <AnimatePresence mode="wait">
            {exercise && (
              <motion.div key={exercise.id} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.25 }}>
                <MultipleChoice exercise={exercise} onAnswer={handleAnswer} isAnswered={showExplanation} showExplanation={showExplanation} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <LessonFooter showContinue={showExplanation} wasCorrect={lastAnswerCorrect} onContinue={handleContinue} />
      <Modal isOpen={showExitModal} onClose={() => setShowExitModal(false)} title="Salir de la leccion?">
        <p className="text-gray-600">Tu posicion en la leccion se guardara.</p>
        <div className="mt-6 flex gap-3">
          <Button variant="ghost" className="flex-1" onClick={() => setShowExitModal(false)}>Seguir</Button>
          <Button variant="danger" className="flex-1" onClick={() => router.push("/learn")}>Salir</Button>
        </div>
      </Modal>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────
export default function PhasePage() {
  const params = useParams();
  const router = useRouter();
  const lessonId = params.id as string;
  const phaseIndex = parseInt(params.phaseIndex as string, 10);
  const lesson = useMemo(() => findLessonWithPhases(lessonId), [lessonId]);
  const { setPhase } = usePhaseStore();

  if (!lesson) return <div className="flex min-h-screen items-center justify-center"><p className="text-gray-500">Leccion no encontrada</p></div>;
  const phases = lesson.phases;
  const phase = phases[phaseIndex];
  if (!phase) { router.push("/learn"); return null; }

  const isLastPhase = phaseIndex === phases.length - 1;
  const nextPhaseIndex = phaseIndex + 1;
  const totalTestPhases = phases.filter((p) => p.type === "test").length;

  if (phase.type === "theory") {
    return (
      <TheoryPhaseView
        lessonTitle={lesson.title}
        cards={phase.cards}
        onFinish={() => { setPhase(lessonId, nextPhaseIndex); router.push(`/lesson/${lessonId}/phase/${nextPhaseIndex}`); }}
      />
    );
  }

  const exercises: Exercise[] = phase.exercises.map((ex) => ({
    ...ex, lessonId,
    explanation: ex.explanation ?? "",
    options: ex.options.map((opt) => ({ ...opt, exerciseId: ex.id })),
  }));

  return (
    <TestPhaseView
      lessonId={lessonId} lessonTitle={lesson.title}
      phaseIndex={phaseIndex} exercises={exercises}
      isLastPhase={isLastPhase} nextPhaseIndex={nextPhaseIndex}
      totalTestPhases={totalTestPhases}
    />
  );
}
