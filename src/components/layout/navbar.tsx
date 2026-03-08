"use client";

import Link from "next/link";
import { XpCounter } from "@/components/gamification/XpCounter";
import { StreakBadge } from "@/components/gamification/StreakBadge";
import { LivesDisplay } from "@/components/gamification/LivesDisplay";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4">
        <Link href="/learn" className="text-xl font-extrabold text-green-600">
          FinLearn
        </Link>
        <div className="flex items-center gap-4">
          <StreakBadge />
          <XpCounter />
          <LivesDisplay />
        </div>
      </div>
    </nav>
  );
}
