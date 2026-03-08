"use client";

import { X } from "lucide-react";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { HeartDisplay } from "@/components/ui/HeartDisplay";

interface LessonHeaderProps {
  progress: number;
  hearts: number;
  onExit: () => void;
}

export function LessonHeader({ progress, hearts, onExit }: LessonHeaderProps) {
  return (
    <div className="fixed left-0 right-0 top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-2xl items-center gap-3 px-4">
        <button
          onClick={onExit}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex-1">
          <ProgressBar value={progress} />
        </div>

        <HeartDisplay current={hearts} />
      </div>
    </div>
  );
}
