"use client";

import { LessonStatus } from "@/types";

interface PathConnectorProps {
  fromStatus: LessonStatus;
  toStatus: LessonStatus;
  fromOffset?: number;
  toOffset?: number;
}

export function PathConnector({ fromStatus, fromOffset = 0, toOffset = 0 }: PathConnectorProps) {
  const isCompleted = fromStatus === LessonStatus.COMPLETED;
  const color = isCompleted ? "#34d399" : "#e5e7eb";

  if (fromOffset === toOffset) {
    return (
      <div className="flex h-12 items-center justify-center w-full">
        <div className="w-1.5 h-full rounded-full" style={{ backgroundColor: color }} />
      </div>
    );
  }

  const cx = 150;
  const x1 = cx + fromOffset;
  const x2 = cx + toOffset;
  const h = 48;

  return (
    <div className="flex h-12 justify-center w-full" style={{ overflow: "visible" }}>
      <svg width="300" height={h} style={{ overflow: "visible" }}>
        <path
          d={`M ${x1} 0 C ${x1} ${h / 2} ${x2} ${h / 2} ${x2} ${h}`}
          stroke={color}
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
