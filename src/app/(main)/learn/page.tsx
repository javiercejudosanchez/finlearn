"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { usePhaseStore } from "@/stores/phaseStore";
import { LessonNode } from "@/components/gamification/LessonNode";
import { PathConnector } from "@/components/gamification/PathConnector";
import { WorldSelector } from "@/components/gamification/WorldSelector";
import { LessonStatus } from "@/types";
import world1 from "@/content/worlds/world-1.json";
import world2 from "@/content/worlds/world-2.json";
import type { WorldContent, LessonContent } from "@/types";
import { getSupabase } from "@/lib/supabase";

const worlds = [world1, world2] as unknown as WorldContent[];

const zigzagOffsets = [-50, 0, 50, 0];

function getZigzagOffset(index: number): number {
  return zigzagOffsets[index % zigzagOffsets.length];
}

type ProgressMap = Map<string, { status: LessonStatus; score: number; theoryCompleted: boolean }>;

function buildProgressMap(
  progressData: Array<{ lessonId: string; completed: boolean; score: number; theoryCompleted: boolean }>,
  worldIndex: number
): ProgressMap {
  const statuses: ProgressMap = new Map();
  const allLessons: string[] = [];
  worlds[worldIndex]?.units.forEach((u) =>
    u.lessons.forEach((l) => allLessons.push(l.id))
  );
  const completedIds = new Set(
    progressData.filter((p) => p.completed).map((p) => p.lessonId)
  );
  const progressById = new Map(progressData.map((p) => [p.lessonId, p]));

  allLessons.forEach((id, i) => {
    const p = progressById.get(id);
    let status: LessonStatus;
    if (p?.completed) {
      status = LessonStatus.COMPLETED;
    } else if (i === 0 || completedIds.has(allLessons[i - 1])) {
      status = LessonStatus.AVAILABLE;
    } else {
      status = LessonStatus.LOCKED;
    }
    statuses.set(id, { status, score: p?.score ?? 0, theoryCompleted: p?.theoryCompleted ?? false });
  });

  return statuses;
}

function hasPhases(lesson: LessonContent): boolean {
  return Array.isArray(lesson.phases) && lesson.phases.length > 0;
}

export default function LearnPage() {
  const router = useRouter();
  const phaseStore = usePhaseStore();
  const [activeWorldId, setActiveWorldId] = useState(worlds[0].id);
  const [progressData, setProgressData] = useState<Array<{ lessonId: string; completed: boolean; score: number; theoryCompleted: boolean }>>([]);
  const [userId, setUserId] = useState<string | null>(null);

  const activeWorldIndex = worlds.findIndex((w) => w.id === activeWorldId);
  const activeWorld = worlds[activeWorldIndex];

  useEffect(() => {
    async function loadProgress() {
      const { data: { session } } = await getSupabase().auth.getSession();
      if (!session?.user?.id) return;
      setUserId(session.user.id);
      try {
        const res = await fetch(`/api/progress?userId=${session.user.id}`);
        if (res.ok) {
          const data = await res.json();
          setProgressData(data);
        }
      } catch { /* ignore */ }
    }
    loadProgress();
  }, []);

  // suppress unused warning
  void userId;

  const lessonStatuses = useMemo(
    () => buildProgressMap(progressData, activeWorldIndex),
    [progressData, activeWorldIndex]
  );

  const worldTabs = worlds.map((w) => ({
    id: w.id,
    title: w.title,
    icon: w.icon,
    color: w.color,
    isLocked: false,
  }));

  const handleLessonClick = (lessonId: string) => {
    const statusData = lessonStatuses.get(lessonId);
    if (!statusData || statusData.status === LessonStatus.LOCKED) return;

    let foundLesson: LessonContent | null = null;
    for (const world of worlds) {
      for (const unit of world.units) {
        const l = unit.lessons.find((x) => x.id === lessonId);
        if (l) { foundLesson = l as unknown as LessonContent; break; }
      }
      if (foundLesson) break;
    }

    if (foundLesson && hasPhases(foundLesson)) {
      const currentPhase = phaseStore.lessonPhases[lessonId] ?? 0;
      router.push(`/lesson/${lessonId}/phase/${currentPhase}`);
      return;
    }

    if (!statusData.theoryCompleted) {
      router.push(`/lesson/${lessonId}/theory`);
    } else {
      router.push(`/lesson/${lessonId}`);
    }
  };

  let globalLessonIndex = 0;

  return (
    <div className="pb-24">
      {/* World selector */}
      <div className="mb-6">
        <WorldSelector worlds={worldTabs} activeWorldId={activeWorldId} onSelect={setActiveWorldId} />
      </div>

      {/* World header */}
      <motion.div
        key={activeWorld.id}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm border border-orange-100"
      >
        <span className="text-4xl">{activeWorld.icon}</span>
        <div>
          <h1 className="font-display text-xl font-extrabold text-gray-800">{activeWorld.title}</h1>
          <p className="text-sm text-gray-500">{activeWorld.description}</p>
        </div>
      </motion.div>

      {/* Lesson path */}
      <div className="flex flex-col items-center">
        {activeWorld.units.map((unit, unitIndex) => (
          <motion.section
            key={unit.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: unitIndex * 0.1 }}
            className="w-full"
          >
            {/* Unit label */}
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="shrink-0 rounded-full bg-orange-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-orange-600">
                Unidad {unit.order + 1} · {unit.title}
              </span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <div className="flex flex-col items-center">
              {unit.lessons.map((lesson, lessonIndex) => {
                const currentGlobalIndex = globalLessonIndex++;
                const offset = getZigzagOffset(currentGlobalIndex);
                const statusData = lessonStatuses.get(lesson.id);
                const status = statusData?.status ?? LessonStatus.LOCKED;
                const lessonContent = lesson as unknown as LessonContent;
                const lessonHasPhases = hasPhases(lessonContent);
                const currentPhaseIndex = phaseStore.lessonPhases[lesson.id] ?? 0;

                const isFirst = lessonIndex === 0 && unitIndex === 0;
                let prevStatus = LessonStatus.LOCKED;
                if (!isFirst) {
                  if (lessonIndex > 0) {
                    const prevId = unit.lessons[lessonIndex - 1].id;
                    prevStatus = lessonStatuses.get(prevId)?.status ?? LessonStatus.LOCKED;
                  } else {
                    const prevUnit = activeWorld.units[unitIndex - 1];
                    if (prevUnit) {
                      const prevId = prevUnit.lessons[prevUnit.lessons.length - 1].id;
                      prevStatus = lessonStatuses.get(prevId)?.status ?? LessonStatus.LOCKED;
                    }
                  }
                }

                // Phase badge
                const phaseBadge = lessonHasPhases && status !== LessonStatus.LOCKED && status !== LessonStatus.COMPLETED
                  ? (currentPhaseIndex === 0 ? "📖" : `${currentPhaseIndex + 1}`)
                  : null;

                return (
                  <div key={lesson.id} className="flex w-full flex-col items-center">
                    {!isFirst && (
                      <PathConnector fromStatus={prevStatus} toStatus={status} />
                    )}

                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: currentGlobalIndex * 0.07 }}
                      style={{ transform: `translateX(${offset}px)` }}
                      className="relative"
                    >
                      {phaseBadge && (
                        <div className="absolute -top-2 -right-2 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-xs text-white shadow">
                          {phaseBadge}
                        </div>
                      )}
                      <LessonNode
                        title={lesson.title}
                        icon={lessonContent.icon}
                        status={status}
                        index={currentGlobalIndex}
                        onClick={() => handleLessonClick(lesson.id)}
                      />
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </motion.section>
        ))}

        {/* End marker */}
        <div className="mt-10 flex flex-col items-center gap-2">
          <div className="h-12 w-1.5 rounded-full bg-gray-200" />
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-2xl shadow-sm">
            🏁
          </div>
          <p className="text-xs font-medium text-gray-400">Más contenido pronto</p>
        </div>
      </div>
    </div>
  );
}
