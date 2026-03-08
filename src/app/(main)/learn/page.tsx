"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useGameStore } from "@/stores/gameStore";
import { StreakBadge } from "@/components/ui/StreakBadge";
import { LessonNode } from "@/components/gamification/LessonNode";
import { PathConnector } from "@/components/gamification/PathConnector";
import { WorldSelector } from "@/components/gamification/WorldSelector";
import { LessonStatus } from "@/types";
import world1 from "@/content/worlds/world-1.json";
import world2 from "@/content/worlds/world-2.json";
import type { WorldContent } from "@/types";

const worlds = [world1, world2] as WorldContent[];

// Decorative icons sprinkled between nodes
const decoIcons = ["🪙", "💰", "📊", "📈", "💡", "🏦", "💳", "📉"];

// Zigzag pattern: positions as percentage offset from center
// left, center, right, center, left ...
const zigzagOffsets = [-35, 0, 35, 0];

function getZigzagOffset(index: number): number {
  return zigzagOffsets[index % zigzagOffsets.length];
}

/**
 * Mock progress: first lesson available, rest locked.
 * In production this would come from the user's UserProgress data.
 */
function getMockLessonStatuses(worldIndex: number) {
  const statuses = new Map<string, { status: LessonStatus; score: number }>();

  if (worldIndex === 0) {
    // World 1: first 2 lessons completed, 3rd available, rest locked
    const allLessons: string[] = [];
    worlds[0].units.forEach((u) =>
      u.lessons.forEach((l) => allLessons.push(l.id))
    );

    allLessons.forEach((id, i) => {
      if (i === 0) statuses.set(id, { status: LessonStatus.COMPLETED, score: 100 });
      else if (i === 1) statuses.set(id, { status: LessonStatus.COMPLETED, score: 80 });
      else if (i === 2) statuses.set(id, { status: LessonStatus.AVAILABLE, score: 0 });
      else statuses.set(id, { status: LessonStatus.LOCKED, score: 0 });
    });
  } else {
    // Other worlds: first lesson available, rest locked
    const allLessons: string[] = [];
    worlds[worldIndex]?.units.forEach((u) =>
      u.lessons.forEach((l) => allLessons.push(l.id))
    );

    allLessons.forEach((id, i) => {
      if (i === 0) statuses.set(id, { status: LessonStatus.AVAILABLE, score: 0 });
      else statuses.set(id, { status: LessonStatus.LOCKED, score: 0 });
    });
  }

  return statuses;
}

export default function LearnPage() {
  const router = useRouter();
  const { xp, streak, streakData } = useGameStore();
  const [activeWorldId, setActiveWorldId] = useState(worlds[0].id);

  const activeWorldIndex = worlds.findIndex((w) => w.id === activeWorldId);
  const activeWorld = worlds[activeWorldIndex];

  const lessonStatuses = useMemo(
    () => getMockLessonStatuses(activeWorldIndex),
    [activeWorldIndex]
  );

  const worldTabs = worlds.map((w, i) => ({
    id: w.id,
    title: w.title,
    icon: w.icon,
    color: w.color,
    isLocked: i > 1, // Lock worlds beyond the first two
  }));

  // Flatten all lessons in order for the zigzag layout
  let globalLessonIndex = 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
      {/* Sticky header */}
      <div className="sticky top-0 z-40 border-b border-gray-100 bg-white/90 backdrop-blur-sm">
        <div className="mx-auto max-w-2xl px-4 py-3">
          {/* Stats row */}
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary">
                <Sparkles className="h-4 w-4" />
                <span>{xp} XP</span>
              </div>
              <StreakBadge
                days={streak}
                isActiveToday={streakData.isActiveToday}
              />
            </div>
          </div>

          {/* World selector */}
          <WorldSelector
            worlds={worldTabs}
            activeWorldId={activeWorldId}
            onSelect={setActiveWorldId}
          />
        </div>
      </div>

      {/* World header */}
      <div className="mx-auto max-w-2xl px-4 pt-6 pb-2">
        <motion.div
          key={activeWorld.id}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3"
        >
          <span className="text-4xl">{activeWorld.icon}</span>
          <div>
            <h1 className="font-display text-xl font-extrabold text-gray-800">
              {activeWorld.title}
            </h1>
            <p className="text-sm text-gray-500">{activeWorld.description}</p>
          </div>
        </motion.div>
      </div>

      {/* Map */}
      <div className="mx-auto max-w-2xl px-4 pb-24">
        {activeWorld.units.map((unit, unitIndex) => (
          <motion.section
            key={unit.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: unitIndex * 0.1 }}
            className="mt-8"
          >
            {/* Unit title banner */}
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="shrink-0 rounded-full bg-gray-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-gray-500">
                Unidad {unit.order + 1} &middot; {unit.title}
              </span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            {/* Lesson nodes with zigzag path */}
            <div className="flex flex-col items-center">
              {unit.lessons.map((lesson, lessonIndex) => {
                const currentGlobalIndex = globalLessonIndex++;
                const offset = getZigzagOffset(currentGlobalIndex);
                const statusData = lessonStatuses.get(lesson.id);
                const status = statusData?.status ?? LessonStatus.LOCKED;

                // Previous lesson status for connector
                const isFirst = lessonIndex === 0 && unitIndex === 0;
                let prevStatus = LessonStatus.LOCKED;
                if (!isFirst) {
                  if (lessonIndex > 0) {
                    const prevId = unit.lessons[lessonIndex - 1].id;
                    prevStatus = lessonStatuses.get(prevId)?.status ?? LessonStatus.LOCKED;
                  } else {
                    // First lesson of this unit — previous is last lesson of prev unit
                    const prevUnit = activeWorld.units[unitIndex - 1];
                    if (prevUnit) {
                      const prevId = prevUnit.lessons[prevUnit.lessons.length - 1].id;
                      prevStatus = lessonStatuses.get(prevId)?.status ?? LessonStatus.LOCKED;
                    }
                  }
                }

                // Decorative icon between some nodes
                const showDeco = currentGlobalIndex > 0 && currentGlobalIndex % 3 === 0;
                const decoIcon = decoIcons[currentGlobalIndex % decoIcons.length];

                return (
                  <div key={lesson.id} className="flex w-full flex-col items-center">
                    {/* Connector from previous node */}
                    {!isFirst && (
                      <PathConnector
                        fromStatus={prevStatus}
                        toStatus={status}
                      />
                    )}

                    {/* Decorative icon */}
                    {showDeco && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mb-2 text-2xl"
                      >
                        {decoIcon}
                      </motion.div>
                    )}

                    {/* Node with zigzag offset */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: currentGlobalIndex * 0.06 }}
                      style={{
                        transform: `translateX(${offset}px)`,
                      }}
                    >
                      <LessonNode
                        title={lesson.title}
                        status={status}
                        index={currentGlobalIndex}
                        onClick={() => router.push(`/lesson/${lesson.id}`)}
                      />
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </motion.section>
        ))}

        {/* End of path marker */}
        <div className="mt-8 flex flex-col items-center gap-2">
          <div className="flex h-10 items-center justify-center">
            <div className="h-full border-l-[3px] border-dashed border-gray-300" />
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-xl">
            🏁
          </div>
          <p className="text-xs font-medium text-gray-400">Mas contenido pronto</p>
        </div>
      </div>
    </div>
  );
}
