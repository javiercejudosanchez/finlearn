"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";
import { usePhaseStore } from "@/stores/phaseStore";
import { LessonNode } from "@/components/gamification/LessonNode";
import { PathConnector } from "@/components/gamification/PathConnector";
import { LessonStatus } from "@/types";
import world1 from "@/content/worlds/world-1.json";
import world2 from "@/content/worlds/world-2.json";
import world3 from "@/content/worlds/world-3.json";
import type { WorldContent, LessonContent } from "@/types";
import { getSupabase } from "@/lib/supabase";

const worlds = [world1, world2, world3] as unknown as WorldContent[];
const zigzagOffsets = [-50, 0, 50, 0];

function getZigzagOffset(index: number): number {
  return zigzagOffsets[index % zigzagOffsets.length];
}

type ProgressEntry = { lessonId: string; completed: boolean; score: number; theoryCompleted: boolean };
type ProgressMap = Map<string, { status: LessonStatus; score: number; theoryCompleted: boolean }>;

function buildGlobalProgressMap(progressData: ProgressEntry[]): ProgressMap {
  const statuses: ProgressMap = new Map();
  const allLessonIds: string[] = [];
  worlds.forEach((w) => w.units.forEach((u) => u.lessons.forEach((l) => allLessonIds.push(l.id))));
  const completedIds = new Set(progressData.filter((p) => p.completed).map((p) => p.lessonId));
  const progressById = new Map(progressData.map((p) => [p.lessonId, p]));
  allLessonIds.forEach((id, i) => {
    const p = progressById.get(id);
    let status: LessonStatus;
    if (p?.completed) {
      status = LessonStatus.COMPLETED;
    } else if (i === 0 || completedIds.has(allLessonIds[i - 1])) {
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

const WORLD_GRADIENTS = [
  "from-orange-500 to-amber-400",
  "from-blue-500 to-cyan-400",
  "from-emerald-500 to-teal-400",
];

export default function LearnPage() {
  const router = useRouter();
  const phaseStore = usePhaseStore();
  const [progressData, setProgressData] = useState<ProgressEntry[]>([]);

  useEffect(() => {
    async function loadProgress() {
      const { data: { session } } = await getSupabase().auth.getSession();
      if (!session?.user?.id) return;
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

  const lessonStatuses = useMemo(() => buildGlobalProgressMap(progressData), [progressData]);

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

  const flatLessons = worlds.flatMap((w) => w.units.flatMap((u) => u.lessons));
  let globalLessonIndex = 0;

  return (
    <div className="pb-24">
      <div className="flex flex-col items-center">
        {worlds.map((world, worldIndex) => {
          const firstLessonId = world.units[0]?.lessons[0]?.id ?? "";
          const isWorldLocked = firstLessonId
            ? lessonStatuses.get(firstLessonId)?.status === LessonStatus.LOCKED
            : worldIndex > 0;

          const prevWorldLessons = worldIndex > 0
            ? worlds[worldIndex - 1].units.flatMap((u) => u.lessons)
            : [];
          const lastPrevLesson = prevWorldLessons[prevWorldLessons.length - 1];
          const lastPrevStatus = lastPrevLesson
            ? lessonStatuses.get(lastPrevLesson.id)?.status ?? LessonStatus.LOCKED
            : LessonStatus.LOCKED;
          const lastPrevGlobalIdx = lastPrevLesson
            ? flatLessons.findIndex((l) => l.id === lastPrevLesson.id)
            : -1;
          const lastPrevOffset = lastPrevGlobalIdx >= 0 ? getZigzagOffset(lastPrevGlobalIdx) : 0;

          // First lesson global index for this world
          const firstLessonGlobalIdx = firstLessonId
            ? flatLessons.findIndex((l) => l.id === firstLessonId)
            : globalLessonIndex;
          const firstLessonOffset = firstLessonGlobalIdx >= 0 ? getZigzagOffset(firstLessonGlobalIdx) : 0;

          const gradientClass = WORLD_GRADIENTS[worldIndex] ?? WORLD_GRADIENTS[0];

          return (
            <div key={world.id} className="w-full flex flex-col items-center">
              {/* Connector: last lesson of prev world → this banner */}
              {worldIndex > 0 && (
                <PathConnector
                  fromStatus={lastPrevStatus}
                  toStatus={isWorldLocked ? LessonStatus.LOCKED : LessonStatus.AVAILABLE}
                  fromOffset={lastPrevOffset}
                  toOffset={0}
                />
              )}

              {/* World level banner */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: worldIndex * 0.1 }}
                className={`relative w-full max-w-sm rounded-2xl bg-gradient-to-r ${gradientClass} p-4 shadow-md ${isWorldLocked ? "opacity-50 grayscale" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-4xl">{world.icon}</span>
                  <div className="flex-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-white/80">Nivel {worldIndex + 1}</p>
                    <h2 className="text-lg font-extrabold text-white leading-tight">{world.title}</h2>
                    <p className="text-xs text-white/70 mt-0.5">{world.description}</p>
                  </div>
                  {isWorldLocked && (
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/20">
                      <Lock className="h-5 w-5 text-white" />
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Connector: banner → first lesson */}
              <PathConnector
                fromStatus={isWorldLocked ? LessonStatus.LOCKED : LessonStatus.COMPLETED}
                toStatus={isWorldLocked ? LessonStatus.LOCKED : LessonStatus.AVAILABLE}
                fromOffset={0}
                toOffset={firstLessonOffset}
              />

              {/* Units and lessons */}
              {world.units.map((unit, unitIndex) => (
                <div key={unit.id} className="w-full flex flex-col items-center">
                  {world.units.length > 1 && (
                    <div className="mb-4 mt-2 flex items-center gap-3 w-full">
                      <div className="h-px flex-1 bg-gray-200" />
                      <span className="shrink-0 rounded-full bg-orange-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-orange-600">
                        {unit.title}
                      </span>
                      <div className="h-px flex-1 bg-gray-200" />
                    </div>
                  )}

                  {unit.lessons.map((lesson, lessonIndex) => {
                    const currentGlobalIndex = globalLessonIndex++;
                    const offset = getZigzagOffset(currentGlobalIndex);
                    const statusData = lessonStatuses.get(lesson.id);
                    const status = statusData?.status ?? LessonStatus.LOCKED;
                    const lessonContent = lesson as unknown as LessonContent;
                    const lessonHasPhases = hasPhases(lessonContent);
                    const currentPhaseIndex = phaseStore.lessonPhases[lesson.id] ?? 0;
                    const isFirstOfWorld = unitIndex === 0 && lessonIndex === 0;
                    const isFirstOfUnit = lessonIndex === 0;

                    let connFromOffset = 0;
                    let connFromStatus = LessonStatus.LOCKED;
                    if (!isFirstOfWorld) {
                      if (!isFirstOfUnit) {
                        connFromStatus = lessonStatuses.get(unit.lessons[lessonIndex - 1].id)?.status ?? LessonStatus.LOCKED;
                        connFromOffset = getZigzagOffset(currentGlobalIndex - 1);
                      } else {
                        const prevUnit = world.units[unitIndex - 1];
                        const prevLesson = prevUnit.lessons[prevUnit.lessons.length - 1];
                        connFromStatus = lessonStatuses.get(prevLesson.id)?.status ?? LessonStatus.LOCKED;
                        connFromOffset = getZigzagOffset(currentGlobalIndex - 1);
                      }
                    }

                    const phaseBadge = lessonHasPhases && status !== LessonStatus.LOCKED && status !== LessonStatus.COMPLETED
                      ? (currentPhaseIndex === 0 ? "📖" : `${currentPhaseIndex + 1}`)
                      : null;

                    const globalIdx = flatLessons.findIndex((l) => l.id === lesson.id);
                    const isLastLesson = globalIdx === flatLessons.length - 1;

                    return (
                      <div key={lesson.id} className="flex w-full flex-col items-center">
                        {!isFirstOfWorld && (
                          <PathConnector
                            fromStatus={connFromStatus}
                            toStatus={status}
                            fromOffset={connFromOffset}
                            toOffset={offset}
                          />
                        )}

                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: currentGlobalIndex * 0.04 }}
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

                        {isLastLesson && (
                          <div className="mt-8 flex flex-col items-center gap-2">
                            <div className="h-12 w-1.5 rounded-full bg-gray-200" />
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-2xl shadow-sm">🏁</div>
                            <p className="text-xs font-medium text-gray-400">Más contenido pronto</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
