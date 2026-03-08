"use client";

import { LessonStatus } from "@/types";

interface PathConnectorProps {
  fromStatus: LessonStatus;
  toStatus: LessonStatus;
}

export function PathConnector({ fromStatus }: PathConnectorProps) {
  const isCompleted = fromStatus === LessonStatus.COMPLETED;

  return (
    <div className="flex h-10 items-center justify-center">
      <div
        className={`h-full w-1 rounded-full ${
          isCompleted
            ? "bg-success/40"
            : "border-l-[3px] border-dashed border-gray-300 bg-transparent"
        }`}
        style={
          isCompleted
            ? undefined
            : { width: 0 }
        }
      />
    </div>
  );
}
