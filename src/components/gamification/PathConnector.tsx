"use client";

import { LessonStatus } from "@/types";

interface PathConnectorProps {
  fromStatus: LessonStatus;
  toStatus: LessonStatus;
}

export function PathConnector({ fromStatus }: PathConnectorProps) {
  const isCompleted = fromStatus === LessonStatus.COMPLETED;

  return (
    <div className="flex h-12 items-center justify-center w-full">
      <div
        className={`w-1.5 h-full rounded-full ${
          isCompleted ? "bg-emerald-400" : "bg-gray-200"
        }`}
      />
    </div>
  );
}
